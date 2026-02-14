import lockIcon from "@/assets/lock.svg";

const DEFAULT_STATS = [
  { label: "Стоимость объекта", value: "1 126 959 346 ₽" },
  { label: "Стоимость 1 м2 без учета НДС", value: "2 314 500 ₽" },
  { label: "Площадь", value: "19 560 м²" },
  { label: "Доходность", value: "" },
];

interface PropertyStatsProps {
  content?: Record<string, any>;
}

const PropertyStats = ({ content }: PropertyStatsProps) => {
  const stats = [0, 1, 2, 3].map((i) => ({
    label: content?.[`stat_label_${i}`] || DEFAULT_STATS[i]?.label || "",
    value: content?.[`stat_value_${i}`] || DEFAULT_STATS[i]?.value || "",
  }));

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[31px] pb-[40px] md:pb-[60px] w-full">
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col gap-[8px] md:gap-[12px]">
          <span className="font-semibold text-[14px] md:text-[18px] text-grey-44 leading-[20px] md:leading-[24px]">{stat.label}</span>
          {stat.value ? (
            <span className="font-semibold text-[24px] md:text-[36px] text-cyan-2 tracking-[-0.72px] leading-[1.1]">{stat.value}</span>
          ) : (
            <div className="w-[40px] h-[40px]">
              <img src={lockIcon} alt="Скрыто" className="w-[26px] h-[30px] mx-auto mt-[5px]" />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default PropertyStats;
