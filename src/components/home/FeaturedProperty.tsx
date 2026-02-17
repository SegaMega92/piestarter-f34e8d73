import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import featuredImgDefault from "@/assets/home/featured-property.png";

const defaultData = {
  sectionTitle: "«Пайстартер Флиппинг» Москва",
  linkText: "Смотреть все →",
  image: "",
  overlayTitle: "ЗПИФН «Активо Флиппинг»",
  rating: "A",
  stats: [
    { label: "Стоимость", value: "1 531 529 489₽" },
    { label: "Количество паев", value: "8 459" },
    { label: "Общая доходность", value: "25%" },
    { label: "Среднегодовая доходность", value: "9,25%" },
  ],
  buttonText: "Подробнее",
  buttonLink: "/objects/activo-flipping",
  description: "Первый в России ЗПИФН по флиппингу квартир премиум-класса. Вторичный оборот паев будет организован на Московской Бирже.",
};

const FeaturedProperty = () => {
  const [d, setD] = useState(defaultData);

  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "home_featured").maybeSingle().then(({ data }) => {
      if (data?.value) setD({ ...defaultData, ...(data.value as any) });
    });
  }, []);

  const img = d.image || featuredImgDefault;

  return (
    <section className="pb-[40px] md:pb-[60px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[16px] mb-[24px] md:mb-[36px]">
        <h2 className="font-semibold text-[24px] md:text-[30px] leading-[1.2] text-black">
          {d.sectionTitle}
        </h2>
        <a href="#" className="text-grey-44 text-[14px] md:text-[18px] hover:text-black transition-colors">
          {d.linkText}
        </a>
      </div>

      <div className="relative rounded-[24px] md:rounded-[40px] overflow-hidden">
        <div className="relative h-[400px] md:h-[692px]">
          <img src={img} alt={d.sectionTitle} className="w-full h-full object-cover" />
          <div className="absolute top-[20px] left-[20px] md:top-0 md:left-0 md:w-1/2 md:p-[20px]">
            <h3 className="font-semibold text-[28px] md:text-[48px] lg:text-[68px] leading-[1.05] tracking-[-0.5px] md:tracking-[-2px] text-white">
              {d.overlayTitle}
            </h3>
          </div>
          <div className="absolute top-[20px] right-[20px] md:top-[20px] md:right-[20px] bg-p-blue px-[12px] py-[4px] rounded-[20px]">
            <span className="font-semibold text-[14px] md:text-[16px] text-black">{d.rating}</span>
          </div>
          <div className="absolute bottom-[20px] left-[20px] right-[20px] md:bottom-[20px] md:left-[20px] md:right-auto">
            <div className="grid grid-cols-2 gap-[10px] max-w-[530px]">
              {d.stats.map((stat, i) => (
                <div key={i} className="bg-white/90 backdrop-blur-sm rounded-[16px] p-[16px] md:p-[20px]">
                  <p className="text-grey-44 text-[12px] md:text-[16px] mb-[4px]">{stat.label}</p>
                  <p className="font-semibold text-[16px] md:text-[24px] text-black">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-[16px] md:gap-[40px] mt-[24px] md:mt-[36px]">
        <a
          href={d.buttonLink}
          className="inline-flex items-center justify-center px-[32px] py-[18px] border border-grey-88 rounded-[30px] text-[14px] md:text-[16px] font-medium text-black hover:bg-grey-96 transition-colors"
        >
          {d.buttonText}
        </a>
        <p className="text-grey-44 text-[14px] md:text-[16px] leading-[24px] max-w-[642px]">
          {d.description}
        </p>
      </div>
    </section>
  );
};

export default FeaturedProperty;
