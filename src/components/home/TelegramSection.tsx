import blogCard1 from "@/assets/home/blog-card-1.png";
import blogCard2 from "@/assets/home/blog-card-2.png";

const TelegramSection = () => {
  return (
    <section className="py-[40px] md:py-[60px] bg-bg-main">
      <div className="content-container">
        <div className="flex flex-col lg:flex-row gap-[24px] md:gap-[30px]">
          {/* Telegram promo */}
          <div className="flex flex-col gap-[24px] w-full lg:w-[410px]">
            <span className="text-grey-44 text-[14px] md:text-[16px]">Телеграм-канал</span>
            <h2 className="font-semibold text-[32px] md:text-[48px] lg:text-[53px] leading-[1.1] tracking-[-1px] text-black">
              Рассказываем о&nbsp;новых объектах каждую неделю
            </h2>
            <a
              href="https://t.me/piestarer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-fit px-[30px] py-[18px] bg-azure-13 rounded-[30px] text-white text-[14px] md:text-[16px] font-medium hover:bg-cyan-2 transition-colors"
            >
              Перейти в телеграм
            </a>
          </div>

          {/* Blog cards */}
          <div className="flex flex-col sm:flex-row gap-[24px] md:gap-[30px] flex-1">
            {/* Card 1 */}
            <a href="#" className="flex flex-col gap-[24px] flex-1 group">
              <div className="h-[280px] md:h-[544px] rounded-[24px] md:rounded-[40px] overflow-hidden">
                <img
                  src={blogCard1}
                  alt="ЗПИФ ЖК Симфония 34"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-[12px]">
                <div className="flex flex-col gap-[8px]">
                  <span className="inline-flex w-fit px-[10px] py-[2px] bg-grey-96 rounded-[13px] text-[12px] md:text-[14px] text-grey-44">
                    Обзор
                  </span>
                  <h3 className="font-medium text-[16px] md:text-[20px] lg:text-[24px] leading-[1.3] text-black group-hover:text-blue-second transition-colors">
                    ЗПИФ «ЖК Симфония 34» (Symphony): обзор фонда недвижимости, доходность, стоимость пая и СЧА
                  </h3>
                </div>
                <span className="text-grey-44 text-[14px] md:text-[16px]">9 октября 2025</span>
              </div>
            </a>

            {/* Card 2 */}
            <a href="#" className="flex flex-col gap-[24px] flex-1 group">
              <div className="h-[280px] md:h-[544px] rounded-[24px] md:rounded-[40px] overflow-hidden">
                <img
                  src={blogCard2}
                  alt="ЗПИФ Альфа Промышленные парки"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-[12px]">
                <div className="flex flex-col gap-[8px]">
                  <span className="inline-flex w-fit px-[10px] py-[2px] bg-grey-96 rounded-[13px] text-[12px] md:text-[14px] text-grey-44">
                    Обзор
                  </span>
                  <h3 className="font-medium text-[16px] md:text-[20px] lg:text-[24px] leading-[1.3] text-black group-hover:text-blue-second transition-colors">
                    ЗПИФ «Альфа. Промышленные парки-2» от Альфа-Капитал: обзор фонда недвижимости от Альфа-Банка
                  </h3>
                </div>
                <span className="text-grey-44 text-[14px] md:text-[16px]">1 октября 2025</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramSection;
