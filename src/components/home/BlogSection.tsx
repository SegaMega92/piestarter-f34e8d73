import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import eventsCard1 from "@/assets/home/events-card-1.png";
import eventsCard2 from "@/assets/home/events-card-2.png";
import eventsCard3 from "@/assets/home/events-card-3.png";

const defaultImages = [eventsCard1, eventsCard2, eventsCard3];

const defaultData = {
  title: "События и\u00a0аналитика",
  description: "Свежие материалы из нашего Telegram-канала. Делимся новостями, аналитикой и тем, что влияет на рынок и решения инвесторов. Если хотите следить за трендами и понимать, что происходит — присоединяйтесь",
  posts: [
    { image: "", category: "Недвижимость", title: "Нехватка офисов: спрос растёт быстрее, чем предложение", date: "12 Октября" },
    { image: "", category: "Аналитика", title: "Где «выстрелит» коммерческая недвижимость: регионы на старте роста", date: "9 Октября" },
    { image: "", category: "Инвестиции", title: "Что будет с доходностью ЗПИФов в 2026 году", date: "12 Октября" },
  ],
};

const BlogSection = () => {
  const [d, setD] = useState(defaultData);

  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "home_blog").maybeSingle().then(({ data }) => {
      if (data?.value) setD({ ...defaultData, ...(data.value as any) });
    });
  }, []);

  return (
    <section className="py-[60px] md:py-[120px] bg-bg-main">
      <div className="content-container">
        <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[60px] mb-[40px] md:mb-[60px]">
          <h2 className="font-semibold text-[36px] md:text-[56px] lg:text-[68px] leading-[1.05] tracking-[-1px] md:tracking-[-2px] text-black lg:w-[625px]">
            {d.title}
          </h2>
          <p className="text-grey-44 text-[16px] md:text-[18px] leading-[24px] lg:flex-1 lg:pt-[16px]">
            {d.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] md:gap-[30px]">
          {d.posts.map((post, index) => (
            <a
              key={index}
              href="#"
              className={`flex flex-col gap-[20px] group ${index === 1 ? "md:row-span-1" : ""}`}
            >
              <div className={`rounded-[24px] md:rounded-[40px] overflow-hidden ${index === 1 ? "h-[250px] md:h-[410px]" : "h-[200px] md:h-[300px]"}`}>
                <img
                  src={post.image || defaultImages[index % defaultImages.length]}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <span className="text-grey-44 text-[14px] md:text-[16px]">{post.category}</span>
                <h3 className="font-medium text-[18px] md:text-[22px] leading-[1.3] text-black group-hover:text-blue-second transition-colors">
                  {post.title}
                </h3>
                <span className="text-grey-44 text-[14px]">{post.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
