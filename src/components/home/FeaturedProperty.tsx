import featuredImg from "@/assets/home/featured-property.png";

const FeaturedProperty = () => {
  return (
    <section className="pb-[40px] md:pb-[60px]">
      {/* Header with title and link */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[16px] mb-[24px] md:mb-[36px]">
        <h2 className="font-semibold text-[24px] md:text-[30px] leading-[1.2] text-black">
          «Пайстартер Флиппинг»<br className="md:hidden" /> Москва
        </h2>
        <a href="#" className="text-grey-44 text-[14px] md:text-[18px] hover:text-black transition-colors">
          Смотреть все →
        </a>
      </div>

      {/* Main card */}
      <div className="relative rounded-[24px] md:rounded-[40px] overflow-hidden">
        {/* Background image */}
        <div className="relative h-[400px] md:h-[692px]">
          <img
            src={featuredImg}
            alt="Пайстартер Флиппинг"
            className="w-full h-full object-cover"
          />

          {/* Title overlay */}
          <div className="absolute top-[20px] left-[20px] md:top-0 md:left-0 md:w-1/2 md:p-[20px]">
            <h3 className="font-semibold text-[28px] md:text-[48px] lg:text-[68px] leading-[1.05] tracking-[-0.5px] md:tracking-[-2px] text-white">
              ЗПИФН «Активо Флиппинг»
            </h3>
          </div>

          {/* Rating badge */}
          <div className="absolute top-[20px] right-[20px] md:top-[20px] md:right-[20px] bg-p-blue px-[12px] py-[4px] rounded-[20px]">
            <span className="font-semibold text-[14px] md:text-[16px] text-black">A</span>
          </div>

          {/* Stats overlay */}
          <div className="absolute bottom-[20px] left-[20px] right-[20px] md:bottom-[20px] md:left-[20px] md:right-auto">
            <div className="grid grid-cols-2 gap-[10px] max-w-[530px]">
              <div className="bg-white/90 backdrop-blur-sm rounded-[16px] p-[16px] md:p-[20px]">
                <p className="text-grey-44 text-[12px] md:text-[16px] mb-[4px]">Стоимость</p>
                <p className="font-semibold text-[16px] md:text-[24px] text-black">1 531 529 489₽</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-[16px] p-[16px] md:p-[20px]">
                <p className="text-grey-44 text-[12px] md:text-[16px] mb-[4px]">Количество паев</p>
                <p className="font-semibold text-[16px] md:text-[24px] text-black">8 459</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-[16px] p-[16px] md:p-[20px]">
                <p className="text-grey-44 text-[12px] md:text-[16px] mb-[4px]">Общая доходность</p>
                <p className="font-semibold text-[16px] md:text-[24px] text-black">25%</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-[16px] p-[16px] md:p-[20px]">
                <p className="text-grey-44 text-[12px] md:text-[16px] mb-[4px]">Среднегодовая доходность</p>
                <p className="font-semibold text-[16px] md:text-[24px] text-black">9,25%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="flex flex-col md:flex-row md:items-center gap-[16px] md:gap-[40px] mt-[24px] md:mt-[36px]">
        <a
          href="/objects/activo-flipping"
          className="inline-flex items-center justify-center px-[32px] py-[18px] border border-grey-88 rounded-[30px] text-[14px] md:text-[16px] font-medium text-black hover:bg-grey-96 transition-colors"
        >
          Подробнее
        </a>
        <p className="text-grey-44 text-[14px] md:text-[16px] leading-[24px] max-w-[642px]">
          Первый в России ЗПИФН по флиппингу квартир премиум-класса. Вторичный оборот паев будет организован на Московской Бирже.
        </p>
      </div>
    </section>
  );
};

export default FeaturedProperty;
