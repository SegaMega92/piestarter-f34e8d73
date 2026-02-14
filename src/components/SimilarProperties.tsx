import bxsCopyAlt1 from "@/assets/bxs-copy-alt1.svg";
import imageCard1 from "@/assets/image-card1.png";
import imageCard2 from "@/assets/image-card2.png";
import imageCard3 from "@/assets/image-card3.png";

const properties = [
  {
    title: "ТЦ «Зеленый берег»",
    city: "Тюмень",
    area: "19 560 м2",
    term: "2 года 1 мес",
    price: "1 126 959 346 ₽",
    shares: "200",
    yield: "25,9%",
    isin: "RU000A10CLY1",
    ratingText: "A+",
    ratingBg: "bg-p-blue",
    ratingColor: "text-black",
    image: imageCard1,
  },
  {
    title: "Пай девятнадцать",
    city: "г. Ульяновск",
    area: "18 226 м2",
    term: "3 года 2 мес",
    price: "1 531 529 489 ₽",
    shares: "500",
    yield: "25,9%",
    isin: "1 531 529 489 ₽",
    ratingText: "B+",
    ratingBg: "bg-blue-second",
    ratingColor: "text-white",
    image: imageCard2,
  },
  {
    title: "ТРК «Малина»",
    city: "Рязань",
    area: "27 184 м2",
    term: "2 года 10 мес",
    price: "840 376 659 ₽",
    shares: "500",
    yield: "37.1%",
    isin: "",
    ratingText: "B+",
    ratingBg: "bg-blue-second",
    ratingColor: "text-white",
    image: imageCard3,
  },
];

const SimilarProperties = () => {
  return (
    <section className="flex flex-col gap-[30px] md:gap-[60px] items-center pt-[60px] md:pt-[120px]">
      <h2 className="font-semibold text-[36px] md:text-[72px] leading-[1.05] tracking-[-1px] md:tracking-[-2.16px] text-black text-center m-0">
        Похожие объекты
      </h2>
      <div className="flex flex-col md:flex-row gap-[24px] md:gap-[30px] items-start w-full">
        {properties.map((p) => (
          <div key={p.title} className="flex flex-col gap-[16px] md:gap-[24px] items-start w-full md:flex-1 md:min-w-0 cursor-pointer group">
            <div className="h-[200px] sm:h-[240px] md:h-[292px] overflow-hidden rounded-[24px] md:rounded-[40px] w-full relative">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className={`absolute right-[12px] top-[12px] md:right-[16px] md:top-[16px] ${p.ratingBg} px-[8px] py-[3px] rounded-[15px]`}>
                <span className={`font-semibold text-[14.9px] ${p.ratingColor}`}>{p.ratingText}</span>
              </div>
            </div>
            <div className="flex flex-col gap-[12px] w-full">
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-semibold text-[20px] md:text-[24px] leading-[24px] text-cyan-2 m-0 group-hover:text-blue-second transition-colors">{p.title}</h3>
                <div className="flex flex-wrap gap-x-[6px] items-center text-[14px] md:text-[18px] text-grey-44">
                  <span className="whitespace-nowrap">{p.city}</span><span>•</span><span className="whitespace-nowrap">{p.area}</span><span>•</span><span className="whitespace-nowrap">{p.term}</span>
                </div>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] md:text-[18px]">
                <div className="flex gap-[8px]">
                  <span className="text-grey-44">Стоимость:</span>
                  <span className="text-black">{p.price}</span>
                </div>
                <div className="flex gap-[8px]">
                  <span className="text-grey-44">Количество паев:</span>
                  <span className="text-black">{p.shares}</span>
                </div>
                <div className="flex gap-[8px]">
                  <span className="text-grey-44">Общая доходность:</span>
                  <span className="text-black">{p.yield}</span>
                </div>
                {p.isin && (
                  <div className="flex gap-[8px] items-center">
                    <span className="text-grey-44">ISIN:</span>
                    <span className="text-black">{p.isin}</span>
                    <button className="hover:opacity-60 transition-opacity" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(p.isin); }}>
                      <img src={bxsCopyAlt1} alt="Копировать" className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProperties;
