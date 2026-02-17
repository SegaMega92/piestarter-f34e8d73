import testimonialAvatar from "@/assets/home/testimonial-avatar.png";

const testimonials = [
  {
    id: 1,
    quote:
      "Пайстартер помог мне диверсифицировать портфель без необходимости вникать в тонкости управления недвижимостью. Прозрачная отчётность и стабильный доход.",
    name: "Алексей Петров",
    role: "Управляющий партнер инвестиционной компании",
    avatar: testimonialAvatar,
  },
  {
    id: 2,
    quote:
      "Как эксперт по ЗПИФам, могу сказать: платформа соответствует лучшим практикам рынка. Удобный интерфейс и полная юридическая прозрачность.",
    name: "Мария Иванова",
    role: "Эксперт по работе с ЗПИФами",
    avatar: testimonialAvatar,
  },
  {
    id: 3,
    quote:
      "Рынок коммерческой недвижимости сейчас на подъёме. Пайстартер даёт доступ к объектам, которые раньше были закрыты для частных инвесторов.",
    name: "Дмитрий Сидоров",
    role: "Аналитик рынка недвижимости",
    avatar: testimonialAvatar,
  },
  {
    id: 4,
    quote:
      "Мы работаем с Пайстартер как партнёры. Профессиональный подход к отбору объектов и чёткое понимание потребностей инвесторов.",
    name: "Елена Козлова",
    role: "Руководитель проектов в девелоперской компании",
    avatar: testimonialAvatar,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-[60px] md:py-[120px] bg-bg-main">
      <div className="content-container">
        {/* Header */}
        <h2 className="font-semibold text-[36px] md:text-[56px] lg:text-[68px] leading-[1.05] tracking-[-1px] md:tracking-[-2px] text-black text-center mb-[40px] md:mb-[60px] max-w-[868px] mx-auto">
          Ключевые люди индустрии&nbsp;— о&nbsp;нас
        </h2>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] md:gap-[30px]">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col justify-between p-[24px] md:p-[28px] bg-white border border-grey-88 rounded-[24px] min-h-[400px] md:min-h-[506px]"
            >
              <p className="text-[16px] md:text-[18px] leading-[1.5] text-black italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-end justify-between gap-[16px] mt-[24px]">
                <div className="flex flex-col gap-[4px]">
                  <span className="font-semibold text-[16px] md:text-[18px] text-black">
                    {testimonial.name}
                  </span>
                  <span className="text-grey-44 text-[14px] leading-[1.4]">
                    {testimonial.role}
                  </span>
                </div>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-[50px] h-[50px] md:w-[65px] md:h-[65px] rounded-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
