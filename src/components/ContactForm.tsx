import { useState } from "react";

const ContactForm = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <section className="bg-grey-96 rounded-t-[24px] md:rounded-t-[40px] w-full py-[60px] md:py-[120px]">
      <div className="content-container flex flex-col md:flex-row gap-[24px] md:gap-[30px] items-start">
      {/* Left */}
      <div className="flex flex-col gap-[16px] md:gap-[24px] items-start w-full md:flex-1 md:min-w-0">
        <h2 className="font-semibold text-[28px] md:text-[48px] leading-[1.1] tracking-[-0.96px] text-black m-0">
          Остались вопросы? Напишите нам
        </h2>
        <p className="font-normal text-[16px] md:text-[18px] text-grey-44 leading-[24px] m-0">
          Вы также можете написать менеджеру в{" "}
          <span className="text-cyan-2 cursor-pointer hover:underline transition-all">телеграм</span> или на электронную почту:{" "}
          <span className="text-cyan-2 cursor-pointer hover:underline transition-all">hi@piestarter.ru</span>
        </p>
      </div>
      {/* Right: Form */}
      <div className="flex flex-col gap-[20px] md:gap-[30px] items-start w-full md:flex-1 md:min-w-0">
        <div className="flex flex-col sm:flex-row gap-[16px] md:gap-[31px] items-center w-full">
          <div className="flex flex-col gap-[8px] md:gap-[12px] items-start w-full sm:flex-1 sm:min-w-0">
            <label className="font-semibold text-[16px] md:text-[18px] text-cyan-2 leading-[24px]">Как вас зовут?</label>
            <input
              type="text"
              className="bg-white border border-grey-71 h-[44px] rounded-[10px] w-full px-[12px] outline-none focus:border-blue-second focus:ring-1 focus:ring-blue-second transition-all"
            />
          </div>
          <div className="flex flex-col gap-[8px] md:gap-[12px] items-start w-full sm:flex-1 sm:min-w-0">
            <label className="font-semibold text-[16px] md:text-[18px] text-cyan-2 leading-[24px]">Электронная почта</label>
            <input
              type="email"
              className="bg-white border border-grey-71 h-[44px] rounded-[10px] w-full px-[12px] outline-none focus:border-blue-second focus:ring-1 focus:ring-blue-second transition-all"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[8px] md:gap-[12px] items-start w-full">
          <label className="font-semibold text-[16px] md:text-[18px] text-cyan-2 leading-[24px]">Телефон</label>
          <input
            type="tel"
            className="bg-white border border-grey-71 h-[44px] rounded-[10px] w-full px-[12px] outline-none focus:border-blue-second focus:ring-1 focus:ring-blue-second transition-all"
          />
        </div>
        <div className="flex flex-col gap-[8px] md:gap-[12px] items-start w-full">
          <label className="font-semibold text-[16px] md:text-[18px] text-cyan-2 leading-[24px]">Сообщение</label>
          <textarea
            className="bg-white border border-grey-71 rounded-[10px] w-full p-[10px] text-[16px] font-normal leading-[24px] text-grey-71 resize-none outline-none focus:border-blue-second focus:ring-1 focus:ring-blue-second transition-all"
            rows={3}
            placeholder="Можете указать как и во сколько с вами лучше связаться"
          />
        </div>
        <div className="flex gap-[12px] items-center">
          <button
            onClick={() => setAgreed(!agreed)}
            className={`rounded-[4px] w-[18px] h-[18px] shrink-0 cursor-pointer border transition-colors flex items-center justify-center ${
              agreed ? "bg-blue-second border-blue-second" : "bg-white border-grey-71 hover:border-grey-44"
            }`}
          >
            {agreed && (
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <span className="text-[14px] md:text-[18px] text-grey-44 leading-[22px] md:leading-[24px] cursor-pointer select-none" onClick={() => setAgreed(!agreed)}>
            Соглашаюсь с <span className="hover:underline">политикой обработки данных</span>
          </span>
        </div>
        <button className="bg-azure-13 flex items-center justify-center px-[30px] py-[14px] md:py-[18px] rounded-[30px] w-full cursor-pointer hover:bg-[#2a3040] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled={!agreed}>
          <span className="font-semibold text-[16px] md:text-[18px] text-white">Отправить сообщение</span>
        </button>
      </div>
      </div>
    </section>
  );
};

export default ContactForm;
