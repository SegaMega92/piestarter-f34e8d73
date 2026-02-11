import { Share2 } from "lucide-react";

const PropertyHero = () => {
  return (
    <section className="flex items-start justify-center pt-[120px] pb-[36px] px-[70px] w-full">
      <div className="flex flex-col gap-[6px] items-start flex-1">
        {/* Breadcrumbs */}
        <div className="flex gap-[12px] items-center flex-wrap">
          <div className="flex gap-[12px] items-start font-medium text-[18px] text-grey-44">
            <span>ЗПИФН «Пайстартер двадцать один»</span>
            <span>•</span>
            <span>Рейтинг: А</span>
            <span>•</span>
          </div>
          <div className="flex gap-[12px] items-center">
            <span className="font-medium text-[18px] text-cyan-2 cursor-pointer">Поделиться</span>
            <Share2 className="w-[18px] h-[18px] text-cyan-2" />
          </div>
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
