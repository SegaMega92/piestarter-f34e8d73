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
    <section className="flex flex-col gap-[60px] items-center pt-[120px] px-[70px] max-w-[1425px] mx-auto">
      <h2 className="font-semibold text-[72px] leading-[68px] tracking-[-2.16px] text-black text-center m-0">
        Похожие объекты
      </h2>
      <div className="flex gap-[30px] items-start">
        {properties.map((p) => (
          <div key={p.title} className="flex flex-col gap-[24px] items-start w-[408px] cursor-pointer">
            <div className="h-[292px] overflow-hidden rounded-[40px] w-[408px] relative">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              <div className={`absolute right-[16px] top-[16px] ${p.ratingBg} px-[8px] py-[3px] rounded-[15px]`}>
                <span className={`font-semibold text-[14.9px] ${p.ratingColor}`}>{p.ratingText}</span>
              </div>
            </div>
            <div className="flex flex-col gap-[12px] w-full">
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-inter font-semibold text-[24px] leading-[24px] text-cyan-2 m-0">{p.title}</h3>
                <div className="flex gap-[6px] items-start text-[18px] text-grey-44 font-inter">
                  <span>{p.city}</span><span>•</span><span>{p.area}</span><span>•</span><span>{p.term}</span>
                </div>
              </div>
              <div className="flex flex-col gap-[6px] text-[18px] font-inter">
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
                    <img src={bxsCopyAlt1} alt="Копировать" className="w-[18px] h-[18px] cursor-pointer" />
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
