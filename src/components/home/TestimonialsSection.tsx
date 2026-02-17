import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import testimonialAvatarDefault from "@/assets/home/testimonial-avatar.png";

const defaultData = {
  title: "Ключевые люди индустрии\u00a0— о\u00a0нас",
  items: [
    { quote: "Пайстартер помог мне диверсифицировать портфель без необходимости вникать в тонкости управления недвижимостью. Прозрачная отчётность и стабильный доход.", name: "Алексей Петров", role: "Управляющий партнер инвестиционной компании", avatar: "" },
    { quote: "Как эксперт по ЗПИФам, могу сказать: платформа соответствует лучшим практикам рынка. Удобный интерфейс и полная юридическая прозрачность.", name: "Мария Иванова", role: "Эксперт по работе с ЗПИФами", avatar: "" },
    { quote: "Рынок коммерческой недвижимости сейчас на подъёме. Пайстартер даёт доступ к объектам, которые раньше были закрыты для частных инвесторов.", name: "Дмитрий Сидоров", role: "Аналитик рынка недвижимости", avatar: "" },
    { quote: "Мы работаем с Пайстартер как партнёры. Профессиональный подход к отбору объектов и чёткое понимание потребностей инвесторов.", name: "Елена Козлова", role: "Руководитель проектов в девелоперской компании", avatar: "" },
  ],
};

const TestimonialsSection = () => {
  const [d, setD] = useState(defaultData);

  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "home_testimonials").maybeSingle().then(({ data }) => {
      if (data?.value) setD({ ...defaultData, ...(data.value as any) });
    });
  }, []);

  return (
    <section className="py-[60px] md:py-[120px] bg-bg-main">
      <div className="content-container">
        <h2 className="font-semibold text-[36px] md:text-[56px] lg:text-[68px] leading-[1.05] tracking-[-1px] md:tracking-[-2px] text-black text-center mb-[40px] md:mb-[60px] max-w-[868px] mx-auto">
          {d.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] md:gap-[30px]">
          {d.items.map((testimonial, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-[24px] md:p-[28px] bg-white border border-grey-88 rounded-[24px] min-h-[400px] md:min-h-[506px]"
            >
              <p className="text-[16px] md:text-[18px] leading-[1.5] text-black italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-end justify-between gap-[16px] mt-[24px]">
                <div className="flex flex-col gap-[4px]">
                  <span className="font-semibold text-[16px] md:text-[18px] text-black">{testimonial.name}</span>
                  <span className="text-grey-44 text-[14px] leading-[1.4]">{testimonial.role}</span>
                </div>
                <img
                  src={testimonial.avatar || testimonialAvatarDefault}
                  alt={testimonial.name}
                  className="w-[50px] h-[50px] md:w-[65px] md:h-[65px] rounded-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
