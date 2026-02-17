import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import propertyCard1 from "@/assets/home/property-card-1.png";
import propertyCard2 from "@/assets/home/property-card-2.png";
import propertyCard3 from "@/assets/home/property-card-3.png";

const defaultImages = [propertyCard1, propertyCard2, propertyCard3];

const defaultFirst = [
  { title: "ТЦ «Зеленый берег»", city: "Тюмень", area: "19 560 м²", term: "2 года 1 мес", price: "1 126 959 346 ₽", shares: "200", yield: "25,9%", rating: "A+", ratingBg: "bg-p-blue", ratingColor: "text-black", image: "", slug: "tc-zeleniy-bereg" },
  { title: "Пай девятнадцать", city: "Ульяновск", area: "18 226 м²", term: "3 года 2 мес", price: "1 531 529 489 ₽", shares: "500", yield: "25,9%", rating: "B+", ratingBg: "bg-blue-second", ratingColor: "text-white", image: "", slug: "pai-19" },
  { title: "ТРК «Малина»", city: "Рязань", area: "27 184 м²", term: "2 года 10 мес", price: "840 376 659 ₽", shares: "500", yield: "37.1%", rating: "B+", ratingBg: "bg-blue-second", ratingColor: "text-white", image: "", slug: "trk-malina" },
];

const defaultSecond = [
  { title: "БЦ «Москва-Сити»", city: "Москва", area: "45 000 м²", term: "5 лет", price: "2 500 000 000 ₽", shares: "1000", yield: "18,5%", rating: "A", ratingBg: "bg-p-blue", ratingColor: "text-black", image: "", slug: "bc-moscow-city" },
  { title: "Склад «Логистика+»", city: "Екатеринбург", area: "32 000 м²", term: "4 года", price: "980 000 000 ₽", shares: "400", yield: "22,3%", rating: "A-", ratingBg: "bg-p-blue", ratingColor: "text-black", image: "", slug: "sklad-logistika" },
  { title: "ТЦ «Галерея»", city: "Казань", area: "28 500 м²", term: "3 года 6 мес", price: "1 200 000 000 ₽", shares: "600", yield: "24,8%", rating: "B+", ratingBg: "bg-blue-second", ratingColor: "text-white", image: "", slug: "tc-galereya" },
];

const getRatingStyles = (rating: string) => {
  const isHigh = rating.startsWith("A");
  return {
    bg: isHigh ? "bg-p-blue" : "bg-blue-second",
    color: isHigh ? "text-black" : "text-white",
  };
};

interface PropertyGridProps {
  variant?: "first" | "second";
}

const PropertyGrid = ({ variant = "first" }: PropertyGridProps) => {
  const settingsKey = variant === "first" ? "home_properties_first" : "home_properties_second";
  const defaults = variant === "first" ? defaultFirst : defaultSecond;
  const [properties, setProperties] = useState(defaults);

  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", settingsKey).maybeSingle().then(({ data }) => {
      if (data?.value && (data.value as any).items?.length) setProperties((data.value as any).items);
    });
  }, [settingsKey]);

  return (
    <section className="py-[30px] md:py-[60px]">
      <div className="flex flex-col md:flex-row gap-[24px] md:gap-[30px]">
        {properties.map((property, idx) => {
          const styles = getRatingStyles(property.rating);
          const img = property.image || defaultImages[idx % defaultImages.length];
          return (
            <a
              key={idx}
              href={`/objects/${property.slug}`}
              className="flex flex-col gap-[16px] md:gap-[24px] w-full md:flex-1 group"
            >
              <div className="relative h-[200px] sm:h-[260px] md:h-[320px] rounded-[24px] md:rounded-[40px] overflow-hidden">
                <img src={img} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute top-[12px] right-[12px] md:top-[16px] md:right-[16px] ${property.ratingBg || styles.bg} px-[10px] py-[4px] rounded-[15px]`}>
                  <span className={`font-semibold text-[14px] ${property.ratingColor || styles.color}`}>{property.rating}</span>
                </div>
              </div>
              <div className="flex flex-col gap-[12px]">
                <div className="flex flex-col gap-[6px]">
                  <h3 className="font-semibold text-[18px] md:text-[24px] leading-[1.2] text-cyan-2 group-hover:text-blue-second transition-colors">{property.title}</h3>
                  <div className="flex flex-wrap gap-x-[6px] items-center text-[14px] md:text-[18px] text-grey-44">
                    <span>{property.city}</span><span>•</span><span>{property.area}</span><span>•</span><span>{property.term}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-[4px] text-[14px] md:text-[16px]">
                  <div className="flex gap-[8px]"><span className="text-grey-44">Стоимость:</span><span className="text-black">{property.price}</span></div>
                  <div className="flex gap-[8px]"><span className="text-grey-44">Количество паев:</span><span className="text-black">{property.shares}</span></div>
                  <div className="flex gap-[8px]"><span className="text-grey-44">Общая доходность:</span><span className="text-black">{property.yield}</span></div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default PropertyGrid;
