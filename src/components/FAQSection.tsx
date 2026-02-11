import { useState } from "react";
import svgPlus from "@/assets/svg-plus.svg";
import svgMinus from "@/assets/svg-minus.svg";

const faqs = [
  {
    q: "Что вообще такое пай и зачем он мне?",
    a: "Пай — это доля в объекте недвижимости, который сдают в аренду. Вы получаете часть дохода от аренды, пропорционально своему вкладу.",
  },
  {
    q: "Как я буду получать доход?",
    a: "Доход выплачивается ежемесячно на ваш банковский счёт. Размер дохода зависит от арендных поступлений за период.",
  },
  {
    q: "Могу ли я вывести деньги досрочно?",
    a: "Паи можно продать на вторичном рынке через нашу платформу или через брокера.",
  },
  {
    q: "Какие риски есть у таких инвестиций?",
    a: "Как и любые инвестиции, паи несут риски: изменение рыночной стоимости недвижимости, риск невыплаты аренды, инфляционные риски.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="flex flex-col gap-[60px] items-center py-[120px]">
      <h2 className="font-semibold text-[72px] leading-[68px] tracking-[-2.16px] text-black text-center m-0">
        Вопросы и ответы
      </h2>
      <div className="flex flex-col gap-[24px] items-center w-full">
        <p className="font-medium text-[18px] text-grey-44 text-center max-w-[625px] leading-[24px] m-0">
          Разобраться в инвестициях можно без экономического образования. Ниже — ответы на вопросы, которые мы чаще всего получаем.
        </p>
        <div className="flex flex-col items-center w-full">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`flex items-start justify-between py-[40px] w-full cursor-pointer select-none ${i < faqs.length - 1 ? "border-b border-grey-71" : ""}`}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            >
              <span className={`font-semibold text-[30px] leading-[39px] shrink-0 w-[60px] transition-colors ${openIndex === i ? "text-black" : "text-grey-71"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-[24px] items-start flex-1">
                <h3 className="font-semibold text-[30px] text-black leading-[39px] m-0">{faq.q}</h3>
                {openIndex === i && (
                  <p className="font-normal text-[16px] text-grey-30 leading-[24px] m-0">{faq.a}</p>
                )}
              </div>
              <button
                className={`rounded-[22px] w-[44px] h-[44px] flex items-center justify-center shrink-0 border transition-all hover:scale-110 ${
                  openIndex === i
                    ? "bg-azure-13 border-azure-13"
                    : "bg-white border-grey-71 hover:border-cyan-2"
                }`}
              >
                <img
                  src={openIndex === i ? svgMinus : svgPlus}
                  alt=""
                  className="w-[10px] h-[10px]"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
