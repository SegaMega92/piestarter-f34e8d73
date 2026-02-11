const ContactForm = () => {
  return (
    <section className="bg-grey-96 flex gap-[30px] items-start px-[70px] py-[120px] rounded-t-[40px] w-full">
      {/* Left */}
      <div className="flex flex-col gap-[24px] items-start w-[625px]">
        <h2 className="font-semibold text-[48px] leading-[1.1] tracking-[-0.96px] text-black m-0">
          Остались вопросы? Напишите нам
        </h2>
        <p className="font-medium text-[18px] text-grey-44 leading-[24px] m-0">
          Вы также можете написать менеджеру в{" "}
          <span className="text-cyan-2 cursor-pointer">телеграм</span> или на электронную почту:{" "}
          <span className="text-cyan-2 cursor-pointer">hi@piestarter.ru</span>
        </p>
      </div>
      {/* Right: Form */}
      <div className="flex flex-col gap-[30px] items-start w-[625px]">
        <div className="flex gap-[31px] items-center w-full">
          <div className="flex flex-col gap-[12px] items-start w-[297px]">
            <label className="font-semibold text-[18px] text-cyan-2 leading-[24px]">Как вас зовут?</label>
            <input
              type="text"
              className="bg-white border border-grey-71 h-[44px] rounded-[10px] w-full px-[12px] outline-none"
            />
          </div>
          <div className="flex flex-col gap-[12px] items-start w-[297px]">
            <label className="font-semibold text-[18px] text-cyan-2 leading-[24px]">Электронная почта</label>
            <input
              type="email"
              className="bg-white border border-grey-71 h-[44px] rounded-[10px] w-full px-[12px] outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[12px] items-start w-full">
          <label className="font-semibold text-[18px] text-cyan-2 leading-[24px]">Телефон</label>
          <input
            type="tel"
            className="bg-white border border-grey-71 h-[44px] rounded-[10px] w-full px-[12px] outline-none"
          />
        </div>
        <div className="flex flex-col gap-[12px] items-start w-full">
          <label className="font-semibold text-[18px] text-cyan-2 leading-[24px]">Сообщение</label>
          <textarea
            className="bg-white border border-grey-71 rounded-[10px] w-full p-[10px] text-[16px] font-normal leading-[24px] text-grey-71 resize-none outline-none"
            rows={3}
            placeholder="Можете указать как и во сколько с вами лучше связаться"
          />
        </div>
        <div className="flex gap-[12px] items-end">
          <div className="bg-white border border-grey-71 rounded-[4px] w-[18px] h-[18px] shrink-0 cursor-pointer" />
          <span className="font-inter text-[18px] text-grey-44 leading-[24px]">Соглашаюсь с политикой обработки данных</span>
        </div>
        <button className="bg-azure-13 flex items-center justify-center px-[30px] py-[18px] rounded-[30px] w-full cursor-pointer">
          <span className="font-semibold text-[18px] text-white">Отправить сообщение</span>
        </button>
      </div>
    </section>
  );
};

export default ContactForm;
