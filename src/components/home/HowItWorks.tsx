import { useState } from "react";
import stepsPhone from "@/assets/home/steps-phone.png";

const steps = [
  {
    number: ".1",
    title: "Выберите сумму",
    description:
      "Укажите, сколько готовы инвестировать. Минимальная сумма: от 100 000 ₽. Можно выбрать из готовых вариантов с предварительным расчетом.",
  },
  {
    number: ".2",
    title: "Подтвердите расчёт",
    description:
      "Проверьте расчёт доходности и условия. Убедитесь, что всё понятно, и подтвердите выбор.",
  },
  {
    number: ".3",
    title: "Пройдите верификацию",
    description:
      "Загрузите документы для проверки. Процесс занимает несколько минут и полностью онлайн.",
  },
  {
    number: ".4",
    title: "Получайте доход",
    description:
      "После покупки пая вы начнёте получать доход от аренды объекта. Выплаты приходят ежеквартально.",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-[60px] md:py-[120px] bg-bg-main">
      <div className="content-container">
        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[100px]">
          {/* Left side - Title and Steps */}
          <div className="flex flex-col gap-[40px] lg:w-[625px]">
            <h2 className="font-semibold text-[36px] md:text-[56px] lg:text-[68px] leading-[1.05] tracking-[-1px] md:tracking-[-2px] text-black">
              Всё просто.<br />
              С первого шага
            </h2>

            <div className="flex flex-col">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`text-left transition-all duration-300 ${
                    index === 0 ? "" : "mt-[30px]"
                  }`}
                >
                  <div className="flex items-start gap-[8px]">
                    <span
                      className={`font-semibold text-[28px] md:text-[40px] leading-[1] transition-colors ${
                        activeStep === index ? "text-black" : "text-grey-71"
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3
                      className={`font-semibold text-[24px] md:text-[40px] leading-[1] transition-colors ${
                        activeStep === index ? "text-black" : "text-grey-71"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      activeStep === index
                        ? "max-h-[200px] opacity-100 mt-[16px]"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-grey-44 text-[14px] md:text-[18px] leading-[24px] max-w-[519px]">
                      {step.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Phone image */}
          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] lg:max-w-[625px]">
              {/* Background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-p-blue/30 to-blue-second/20 rounded-[40px] transform rotate-3" />
              <div className="relative">
                <img
                  src={stepsPhone}
                  alt="Приложение Пайстартер"
                  className="w-full h-auto rounded-[24px] md:rounded-[40px] shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
