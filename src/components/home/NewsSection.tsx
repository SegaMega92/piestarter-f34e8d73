const newsItems = [
  {
    id: 1,
    tag: "Рост спроса",
    tagColor: "bg-green-100 text-green-700",
    title: "В Рязани растет спрос на коммерческую недвижимость",
    description:
      "Спрос поддерживают промышленные проекты и логистика, цены растут умеренно, аренда оживает последовательно каждый квартал.",
    date: "12 октября",
  },
  {
    id: 2,
    tag: "Рост спроса",
    tagColor: "bg-green-100 text-green-700",
    title: "В Ульяновске открылось три новых торговых центра",
    description:
      "Цены ниже соседей по Поволжью, корпоративный спрос поддерживает аренду и ликвидность, сейчас устойчиво.",
    date: "9 октября",
  },
  {
    id: 3,
    tag: "Замедление",
    tagColor: "bg-yellow-100 text-yellow-700",
    title: "Казань: аккуратно с новостройками",
    description:
      "Сильный фундаментальный спрос, но пик цен по ряду проектов уже пройден",
    date: "1 октября",
  },
];

const NewsSection = () => {
  return (
    <section className="py-[40px] md:py-[60px] bg-bg-main">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] md:gap-[30px]">
          {newsItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className="flex flex-col gap-[16px] p-[20px] bg-white rounded-[20px] border border-grey-88 hover:border-grey-71 hover:shadow-lg transition-all group"
            >
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-start justify-between gap-[12px]">
                  <span
                    className={`inline-flex px-[10px] py-[2px] rounded-[12px] text-[12px] md:text-[14px] font-medium ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-[16px] md:text-[18px] leading-[1.3] text-black group-hover:text-blue-second transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-grey-44 text-[14px] md:text-[16px] leading-[24px] flex-1">
                {item.description}
              </p>
              <span className="text-grey-44 text-[14px]">{item.date}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
