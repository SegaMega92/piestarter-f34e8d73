import propertyCard1 from "@/assets/home/property-card-1.png";
import propertyCard2 from "@/assets/home/property-card-2.png";
import propertyCard3 from "@/assets/home/property-card-3.png";

const propertiesFirst = [
  {
    id: 1,
    title: "ТЦ «Зеленый берег»",
    city: "Тюмень",
    area: "19 560 м²",
    term: "2 года 1 мес",
    price: "1 126 959 346 ₽",
    shares: "200",
    yield: "25,9%",
    rating: "A+",
    ratingBg: "bg-p-blue",
    ratingColor: "text-black",
    image: propertyCard1,
    slug: "tc-zeleniy-bereg",
  },
  {
    id: 2,
    title: "Пай девятнадцать",
    city: "Ульяновск",
    area: "18 226 м²",
    term: "3 года 2 мес",
    price: "1 531 529 489 ₽",
    shares: "500",
    yield: "25,9%",
    rating: "B+",
    ratingBg: "bg-blue-second",
    ratingColor: "text-white",
    image: propertyCard2,
    slug: "pai-19",
  },
  {
    id: 3,
    title: "ТРК «Малина»",
    city: "Рязань",
    area: "27 184 м²",
    term: "2 года 10 мес",
    price: "840 376 659 ₽",
    shares: "500",
    yield: "37.1%",
    rating: "B+",
    ratingBg: "bg-blue-second",
    ratingColor: "text-white",
    image: propertyCard3,
    slug: "trk-malina",
  },
];

const propertiesSecond = [
  {
    id: 4,
    title: "БЦ «Москва-Сити»",
    city: "Москва",
    area: "45 000 м²",
    term: "5 лет",
    price: "2 500 000 000 ₽",
    shares: "1000",
    yield: "18,5%",
    rating: "A",
    ratingBg: "bg-p-blue",
    ratingColor: "text-black",
    image: propertyCard1,
    slug: "bc-moscow-city",
  },
  {
    id: 5,
    title: "Склад «Логистика+»",
    city: "Екатеринбург",
    area: "32 000 м²",
    term: "4 года",
    price: "980 000 000 ₽",
    shares: "400",
    yield: "22,3%",
    rating: "A-",
    ratingBg: "bg-p-blue",
    ratingColor: "text-black",
    image: propertyCard2,
    slug: "sklad-logistika",
  },
  {
    id: 6,
    title: "ТЦ «Галерея»",
    city: "Казань",
    area: "28 500 м²",
    term: "3 года 6 мес",
    price: "1 200 000 000 ₽",
    shares: "600",
    yield: "24,8%",
    rating: "B+",
    ratingBg: "bg-blue-second",
    ratingColor: "text-white",
    image: propertyCard3,
    slug: "tc-galereya",
  },
];

interface PropertyGridProps {
  variant?: "first" | "second";
}

const PropertyGrid = ({ variant = "first" }: PropertyGridProps) => {
  const properties = variant === "first" ? propertiesFirst : propertiesSecond;

  return (
    <section className="py-[30px] md:py-[60px]">
      <div className="flex flex-col md:flex-row gap-[24px] md:gap-[30px]">
        {properties.map((property) => (
          <a
            key={property.id}
            href={`/objects/${property.slug}`}
            className="flex flex-col gap-[16px] md:gap-[24px] w-full md:flex-1 group"
          >
            {/* Image */}
            <div className="relative h-[200px] sm:h-[260px] md:h-[320px] rounded-[24px] md:rounded-[40px] overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className={`absolute top-[12px] right-[12px] md:top-[16px] md:right-[16px] ${property.ratingBg} px-[10px] py-[4px] rounded-[15px]`}
              >
                <span className={`font-semibold text-[14px] ${property.ratingColor}`}>
                  {property.rating}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-semibold text-[18px] md:text-[24px] leading-[1.2] text-cyan-2 group-hover:text-blue-second transition-colors">
                  {property.title}
                </h3>
                <div className="flex flex-wrap gap-x-[6px] items-center text-[14px] md:text-[18px] text-grey-44">
                  <span>{property.city}</span>
                  <span>•</span>
                  <span>{property.area}</span>
                  <span>•</span>
                  <span>{property.term}</span>
                </div>
              </div>

              <div className="flex flex-col gap-[4px] text-[14px] md:text-[16px]">
                <div className="flex gap-[8px]">
                  <span className="text-grey-44">Стоимость:</span>
                  <span className="text-black">{property.price}</span>
                </div>
                <div className="flex gap-[8px]">
                  <span className="text-grey-44">Количество паев:</span>
                  <span className="text-black">{property.shares}</span>
                </div>
                <div className="flex gap-[8px]">
                  <span className="text-grey-44">Общая доходность:</span>
                  <span className="text-black">{property.yield}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PropertyGrid;
