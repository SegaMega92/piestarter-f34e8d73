import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import propertyCard1 from "@/assets/home/property-card-1.png";
import propertyCard2 from "@/assets/home/property-card-2.png";
import propertyCard3 from "@/assets/home/property-card-3.png";

const defaultImages = [propertyCard1, propertyCard2, propertyCard3];

interface PropertyCard {
  id: string;
  title: string;
  slug: string;
  status: string;
  image?: string;
  city?: string;
  area?: string;
  term?: string;
  price?: string;
  shares?: string;
  yield?: string;
  rating?: string;
}

const getRatingStyles = (rating?: string) => {
  if (!rating) return { bg: "bg-p-blue", color: "text-black" };
  return rating.startsWith("A")
    ? { bg: "bg-p-blue", color: "text-black" }
    : { bg: "bg-blue-second", color: "text-white" };
};

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";
  const [properties, setProperties] = useState<PropertyCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      // Fetch all published pages
      const { data: pages } = await supabase
        .from("pages")
        .select("id, title, slug, status")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (!pages?.length) {
        setLoading(false);
        return;
      }

      // For each page, get the first block content for extra info
      const enriched = await Promise.all(
        pages.map(async (page) => {
          const { data: blocks } = await supabase
            .from("page_blocks")
            .select("block_type, content")
            .eq("page_id", page.id)
            .eq("enabled", true)
            .order("sort_order", { ascending: true })
            .limit(5);

          // Try to extract hero/main block data
          let extra: Partial<PropertyCard> = {};
          if (blocks?.length) {
            // First pass: extract metadata from all blocks
            for (const block of blocks) {
              const c = block.content as any;
              // Use PropertyHero image as fallback
              if (!extra.image && block.block_type === "PropertyHero" && c?.image) extra.image = c.image;
              if (c?.city) extra.city = c.city;
              if (c?.area) extra.area = c.area;
              if (c?.term) extra.term = c.term;
              if (c?.price) extra.price = c.price;
              if (c?.shares) extra.shares = c.shares;
              if (c?.yield) extra.yield = c.yield;
              if (c?.rating) extra.rating = c.rating;
            }
            // Second pass: prefer first image from PhotoGallery
            const galleryBlock = blocks.find((b) => b.block_type === "PhotoGallery");
            if (galleryBlock) {
              const c = galleryBlock.content as any;
              const imgs = c?.images;
              if (Array.isArray(imgs) && imgs.length > 0) {
                const first = imgs[0];
                extra.image = typeof first === "string" ? first : first?.url;
              }
            }
          }

          return { ...page, ...extra };
        })
      );

      setProperties(enriched);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  const filtered = searchQuery
    ? properties.filter((p) =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.city?.toLowerCase().includes(searchQuery) ||
        p.area?.toLowerCase().includes(searchQuery)
      )
    : properties;

  return (
    <div className="min-h-screen bg-bg-main overflow-x-hidden relative">
      <div className="aurora-glow" aria-hidden="true" />
      <Header />
      <main>
        <div className="content-container py-[48px] md:py-[72px]">
          <h1 className="font-semibold text-[40px] md:text-[68px] lg:text-[85px] leading-[1.05] tracking-[-1px] md:tracking-[-2.55px] text-black w-full mb-[24px] md:mb-[48px]">
            Каталог недвижимости
          </h1>

          {searchQuery && !loading && (
            <p className="text-[16px] md:text-[18px] text-grey-44 mb-[24px] md:mb-[48px]">
              Результаты поиска по запросу «<span className="text-cyan-2 font-medium">{searchQuery}</span>»: {filtered.length}
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[30px]">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col gap-[16px] animate-pulse">
                  <div className="h-[260px] md:h-[320px] rounded-[24px] md:rounded-[40px] bg-grey-88/40" />
                  <div className="flex flex-col gap-[8px]">
                    <div className="h-6 bg-grey-88/40 rounded-lg w-3/4" />
                    <div className="h-4 bg-grey-88/40 rounded-lg w-1/2" />
                    <div className="h-4 bg-grey-88/40 rounded-lg w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-[120px] gap-[16px]">
              <p className="text-[24px] font-semibold text-grey-44">{searchQuery ? "Ничего не найдено" : "Объектов пока нет"}</p>
              <p className="text-[16px] text-grey-71">{searchQuery ? "Попробуйте изменить запрос" : "Объекты появятся здесь после публикации через админ-панель"}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[30px]">
              {filtered.map((property, idx) => {
                const styles = getRatingStyles(property.rating);
                const img = property.image || defaultImages[idx % defaultImages.length];
                return (
                  <a
                    key={property.id}
                    href={`/objects/${property.slug}`}
                    className="flex flex-col gap-[16px] md:gap-[24px] group"
                  >
                    <div className="relative h-[220px] sm:h-[260px] md:h-[300px] rounded-[24px] md:rounded-[40px] overflow-hidden">
                      <img
                        src={img}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {property.rating && (
                        <div className={`absolute top-[12px] right-[12px] md:top-[16px] md:right-[16px] ${styles.bg} px-[10px] py-[4px] rounded-[15px]`}>
                          <span className={`font-semibold text-[14px] ${styles.color}`}>{property.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-[12px]">
                      <div className="flex flex-col gap-[6px]">
                        <h3 className="font-semibold text-[18px] md:text-[22px] leading-[1.2] text-cyan-2 group-hover:text-blue-second transition-colors">
                          {property.title}
                        </h3>
                        {(property.city || property.area || property.term) && (
                          <div className="flex flex-wrap gap-x-[6px] items-center text-[14px] md:text-[16px] text-grey-44">
                            {property.city && <span>{property.city}</span>}
                            {property.city && property.area && <span>•</span>}
                            {property.area && <span>{property.area}</span>}
                            {property.area && property.term && <span>•</span>}
                            {property.term && <span>{property.term}</span>}
                          </div>
                        )}
                      </div>
                      {(property.price || property.shares || property.yield) && (
                        <div className="flex flex-col gap-[4px] text-[14px] md:text-[16px]">
                          {property.price && (
                            <div className="flex gap-[8px]">
                              <span className="text-grey-44">Стоимость:</span>
                              <span className="text-black">{property.price}</span>
                            </div>
                          )}
                          {property.shares && (
                            <div className="flex gap-[8px]">
                              <span className="text-grey-44">Количество паев:</span>
                              <span className="text-black">{property.shares}</span>
                            </div>
                          )}
                          {property.yield && (
                            <div className="flex gap-[8px]">
                              <span className="text-grey-44">Общая доходность:</span>
                              <span className="text-black">{property.yield}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
