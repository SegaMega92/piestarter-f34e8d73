import shareAlt from "@/assets/share-alt.svg";

const PropertyHero = () => {
  return (
    <section className="flex items-start justify-center pt-[120px] pb-[36px] w-full">
      <div className="flex flex-col gap-[6px] items-start flex-1">
        {/* Breadcrumbs */}
        <div className="flex gap-[12px] items-center flex-wrap">
          <div className="flex gap-[12px] items-start font-medium text-[18px] text-grey-44">
            <span className="hover:text-cyan-2 cursor-pointer transition-colors">ЗПИФН «Пайстартер двадцать один»</span>
            <span>•</span>
            <span>Рейтинг: А</span>
            <span>•</span>
          </div>
          <button className="flex gap-[12px] items-center group hover:opacity-80 transition-opacity">
            <span className="font-medium text-[18px] text-cyan-2 cursor-pointer">Поделиться</span>
            <img src={shareAlt} alt="" className="w-[18px] h-[18px]" />
          </button>
        </div>
        {/* Main Title */}
        <h1 className="font-semibold text-[72px] leading-[68px] tracking-[-2.16px] text-azure-4">
          Терминал Чкаловский, Екатеринбург
        </h1>
      </div>
    </section>
  );
};

export default PropertyHero;
