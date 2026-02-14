import shareAlt from "@/assets/share-alt.svg";

const PropertyHero = () => {
  return (
    <section className="flex items-start justify-center pt-[60px] md:pt-[90px] lg:pt-[120px] pb-[24px] md:pb-[36px] w-full">
      <div className="flex flex-col gap-[6px] items-start flex-1">
        {/* Breadcrumbs */}
        <div className="flex gap-[8px] md:gap-[12px] items-center flex-wrap">
          <div className="flex gap-[8px] md:gap-[12px] items-start font-medium text-[14px] md:text-[18px] text-grey-44">
            <span className="hover:text-cyan-2 cursor-pointer transition-colors">ЗПИФН «Пайстартер двадцать один»</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Рейтинг: А</span>
            <span className="hidden sm:inline">•</span>
          </div>
          <button className="flex gap-[8px] md:gap-[12px] items-center group hover:opacity-80 transition-opacity">
            <span className="font-medium text-[14px] md:text-[18px] text-cyan-2 cursor-pointer">Поделиться</span>
            <img src={shareAlt} alt="" className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
          </button>
        </div>
        {/* Main Title */}
        <h1 className="font-semibold text-[32px] sm:text-[48px] lg:text-[72px] leading-[1.05] tracking-[-1px] lg:tracking-[-2.16px] text-azure-4">
          Терминал Чкаловский, Екатеринбург
        </h1>
      </div>
    </section>
  );
};

export default PropertyHero;
