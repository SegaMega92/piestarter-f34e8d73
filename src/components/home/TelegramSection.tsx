import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import blogCard1Default from "@/assets/home/blog-card-1.png";
import blogCard2Default from "@/assets/home/blog-card-2.png";

const defaultCardImages = [blogCard1Default, blogCard2Default];

const defaultData = {
  label: "Телеграм-канал",
  title: "Рассказываем о\u00a0новых объектах каждую неделю",
  buttonText: "Перейти в телеграм",
  buttonLink: "https://t.me/piestarer",
  cards: [
    { image: "", tag: "Обзор", title: "ЗПИФ «ЖК Симфония 34» (Symphony): обзор фонда недвижимости, доходность, стоимость пая и СЧА", date: "9 октября 2025" },
    { image: "", tag: "Обзор", title: "ЗПИФ «Альфа. Промышленные парки-2» от Альфа-Капитал: обзор фонда недвижимости от Альфа-Банка", date: "1 октября 2025" },
  ],
};

const TelegramSection = () => {
  const [d, setD] = useState(defaultData);

  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "home_telegram").maybeSingle().then(({ data }) => {
      if (data?.value) setD({ ...defaultData, ...(data.value as any) });
    });
  }, []);

  return (
    <section className="py-[40px] md:py-[60px] bg-bg-main">
      <div className="content-container">
        <div className="flex flex-col lg:flex-row gap-[24px] md:gap-[30px]">
          <div className="flex flex-col gap-[24px] w-full lg:w-[410px]">
            <span className="text-grey-44 text-[14px] md:text-[16px]">{d.label}</span>
            <h2 className="font-semibold text-[32px] md:text-[48px] lg:text-[53px] leading-[1.1] tracking-[-1px] text-black">
              {d.title}
            </h2>
            <a
              href={d.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-fit px-[30px] py-[18px] bg-azure-13 rounded-[30px] text-white text-[14px] md:text-[16px] font-medium hover:bg-cyan-2 transition-colors"
            >
              {d.buttonText}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-[24px] md:gap-[30px] flex-1">
            {d.cards.map((card, idx) => (
              <a key={idx} href="#" className="flex flex-col gap-[24px] flex-1 group">
                <div className="h-[280px] md:h-[544px] rounded-[24px] md:rounded-[40px] overflow-hidden">
                  <img
                    src={card.image || defaultCardImages[idx % defaultCardImages.length]}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-[12px]">
                  <div className="flex flex-col gap-[8px]">
                    <span className="inline-flex w-fit px-[10px] py-[2px] bg-grey-96 rounded-[13px] text-[12px] md:text-[14px] text-grey-44">
                      {card.tag}
                    </span>
                    <h3 className="font-medium text-[16px] md:text-[20px] lg:text-[24px] leading-[1.3] text-black group-hover:text-blue-second transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <span className="text-grey-44 text-[14px] md:text-[16px]">{card.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramSection;
