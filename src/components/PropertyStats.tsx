import lockIcon from "@/assets/lock.svg";

const PropertyStats = () => {
  return (
    <section className="flex gap-[31px] items-center pb-[60px] px-[70px] w-full">
      <div className="flex flex-col gap-[12px] w-[295px]">
        <span className="font-semibold text-[18px] text-grey-44 leading-[24px]">Стоимость объекта</span>
        <span className="font-semibold text-[36px] text-cyan-2 tracking-[-0.72px] leading-[1.1]">1 126 959 346 ₽</span>
      </div>
      <div className="flex flex-col gap-[12px] w-[295px]">
        <span className="font-semibold text-[18px] text-grey-44 leading-[24px]">Стоимость 1 м2 без учета НДС</span>
        <span className="font-semibold text-[36px] text-cyan-2 tracking-[-0.72px] leading-[1.1]">2 314 500 ₽</span>
      </div>
      <div className="flex flex-col gap-[12px] w-[295px]">
        <span className="font-semibold text-[18px] text-grey-44 leading-[24px]">Площадь</span>
        <span className="font-semibold text-cyan-2 tracking-[-0.72px] leading-[1.1]">
          <span className="text-[36px]">19 560 м</span>
          <span className="text-[23px]">2</span>
        </span>
      </div>
      <div className="flex flex-col gap-[12px] w-[295px]">
        <span className="font-semibold text-[18px] text-grey-44 leading-[24px]">Доходность</span>
        <div className="w-[40px] h-[40px]">
          <img src={lockIcon} alt="Скрыто" className="w-[26px] h-[30px] mx-auto mt-[5px]" />
        </div>
      </div>
    </section>
  );
};

export default PropertyStats;
