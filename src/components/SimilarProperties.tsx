import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SimilarProperty {
  slug: string;
  title: string;
  image: string;
  city: string;
  area: string;
  term: string;
  price: string;
  shares: string;
  yield: string;
  ratingText: string;
}

interface SimilarPropertiesProps {
  currentSlug?: string;
}

const SimilarProperties = ({ currentSlug }: SimilarPropertiesProps) => {
  const [properties, setProperties] = useState<SimilarProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      // Get published pages excluding current
      let query = supabase
        .from("pages")
        .select("id, slug, title")
        .eq("status", "published")
        .limit(10);

      if (currentSlug) {
        query = query.neq("slug", currentSlug);
      }

      const { data: pages } = await query;
      if (!pages || pages.length === 0) {
        setLoading(false);
        return;
      }

      // Shuffle and take 3
      const shuffled = pages.sort(() => Math.random() - 0.5).slice(0, 3);
      const pageIds = shuffled.map((p) => p.id);

      // Get blocks for these pages
      const { data: blocks } = await supabase
        .from("page_blocks")
        .select("page_id, block_type, content")
        .in("page_id", pageIds)
        .in("block_type", ["PropertyHero", "PhotoGallery", "PropertyStats"])
        .eq("enabled", true);

      const result: SimilarProperty[] = shuffled.map((page) => {
        const pageBlocks = (blocks || []).filter((b) => b.page_id === page.id);
        const heroContent = pageBlocks.find((b) => b.block_type === "PropertyHero")?.content as Record<string, any> | undefined;
        const galleryContent = pageBlocks.find((b) => b.block_type === "PhotoGallery")?.content as Record<string, any> | undefined;
        const statsContent = pageBlocks.find((b) => b.block_type === "PropertyStats")?.content as Record<string, any> | undefined;

        const stats = statsContent?.stats || [];
        const findStat = (label: string) => stats.find((s: any) => s.label?.toLowerCase().includes(label))?.value || "";

        return {
          slug: page.slug,
          title: heroContent?.title || page.title,
          image: (() => { const img = galleryContent?.images?.[0]; return img ? (typeof img === "string" ? img : img?.url || "") : ""; })(),
          city: findStat("город") || findStat("локац"),
          area: findStat("площ"),
          term: findStat("срок"),
          price: findStat("стоим"),
          shares: findStat("паев") || findStat("пай"),
          yield: findStat("доход"),
          ratingText: heroContent?.rating || statsContent?.rating || "",
        };
      });

      setProperties(result);
      setLoading(false);
    };

    fetchSimilar();
  }, [currentSlug]);

  if (loading || properties.length === 0) return null;

  const getRatingStyle = (rating: string) => {
    if (rating.startsWith("A")) return { bg: "bg-p-blue", color: "text-black" };
    return { bg: "bg-blue-second", color: "text-white" };
  };

  return (
    <section className="flex flex-col gap-[30px] md:gap-[60px] items-center pt-[60px] md:pt-[120px]">
      <h2 className="font-semibold text-[36px] md:text-[72px] leading-[1.05] tracking-[-1px] md:tracking-[-2.16px] text-black text-center m-0">
        Похожие объекты
      </h2>
      <div className="flex flex-col md:flex-row gap-[24px] md:gap-[30px] items-start w-full">
        {properties.map((p) => {
          const style = getRatingStyle(p.ratingText);
          return (
            <a
              key={p.slug}
              href={`/objects/${p.slug}`}
              className="flex flex-col gap-[16px] md:gap-[24px] items-start w-full md:flex-1 md:min-w-0 cursor-pointer group no-underline"
            >
              <div className="h-[200px] sm:h-[240px] md:h-[292px] overflow-hidden rounded-[24px] md:rounded-[40px] w-full relative bg-grey-96">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-grey-44 text-sm">Нет фото</div>
                )}
                {p.ratingText && (
                  <div className={`absolute right-[12px] top-[12px] md:right-[16px] md:top-[16px] ${style.bg} px-[8px] py-[3px] rounded-[15px]`}>
                    <span className={`font-semibold text-[14.9px] ${style.color}`}>{p.ratingText}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-[12px] w-full">
                <div className="flex flex-col gap-[6px]">
                  <h3 className="font-semibold text-[20px] md:text-[24px] leading-[24px] text-cyan-2 m-0 group-hover:text-blue-second transition-colors">{p.title}</h3>
                  <div className="flex flex-wrap gap-x-[6px] items-center text-[14px] md:text-[18px] text-grey-44">
                    {[p.city, p.area, p.term].filter(Boolean).map((v, i, arr) => (
                      <span key={i}>
                        <span className="whitespace-nowrap">{v}</span>
                        {i < arr.length - 1 && <span className="mx-[3px]">•</span>}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[6px] text-[14px] md:text-[18px]">
                  {p.price && (
                    <div className="flex gap-[8px]">
                      <span className="text-grey-44">Стоимость:</span>
                      <span className="text-black">{p.price}</span>
                    </div>
                  )}
                  {p.shares && (
                    <div className="flex gap-[8px]">
                      <span className="text-grey-44">Количество паев:</span>
                      <span className="text-black">{p.shares}</span>
                    </div>
                  )}
                  {p.yield && (
                    <div className="flex gap-[8px]">
                      <span className="text-grey-44">Общая доходность:</span>
                      <span className="text-black">{p.yield}</span>
                    </div>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default SimilarProperties;
