import logoPie from "@/assets/logo_pie.svg";
import telegram from "@/assets/telegram.svg";

const Footer = () => {
  return (
    <footer className="bg-azure-13 py-[60px] md:py-[120px] w-full">
      <div className="content-container flex flex-col gap-[24px] items-start">
      <div className="flex flex-col md:flex-row gap-[30px] items-start w-full">
        {/* Logo & Info */}
        <div className="flex flex-col gap-[24px] items-start w-full md:w-[640px]">
          <a href="/" className="flex items-center gap-[14px] hover:opacity-80 transition-opacity">
            <img src={logoPie} alt="Пайстартер" className="w-[44px] h-[44px] md:w-[60px] md:h-[60px]" />
            <div className="logo-text text-[18px] md:text-[22px] leading-[18px] md:leading-[21px] tracking-[0.66px] text-white">
              <p className="m-0">пай</p>
              <p className="m-0">стартер</p>
            </div>
          </a>
          <p className="text-[14px] md:text-[16px] text-grey-96 leading-[22px] md:leading-[24px] font-normal m-0">
            Общество с ограниченной ответственностью «ПАЙСТАРТЕР»<br />
            ОГРН: 1187746382941, ИНН: 7731456723
          </p>
          <a href="https://t.me/piestarer" target="_blank" rel="noopener noreferrer" className="flex gap-[12px] items-start hover:opacity-80 transition-opacity">
            <img src={telegram} alt="Telegram" className="w-[40px] h-[40px] md:w-[45px] md:h-[45px]" />
            <div className="text-[14px] md:text-[16px] text-grey-96 leading-[22px] md:leading-[24px] font-normal">
              <p className="m-0">Подпишитесь</p>
              <p className="m-0">на телеграм-канал <span className="underline">@piestarer</span></p>
            </div>
          </a>
        </div>
        {/* Footer Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-[24px] md:gap-[30px] w-full md:w-auto">
          <div className="flex flex-col gap-[20px] md:gap-[30px] items-start">
            <h4 className="font-semibold text-[16px] md:text-[18px] text-grey-96 leading-[24px] m-0">Категории</h4>
            <div className="flex flex-col gap-[12px] md:gap-[15px] text-[14px] md:text-[16px] text-grey-71 leading-[22px] md:leading-[24px] font-normal">
              <a href="#" className="cursor-pointer hover:text-white transition-colors">Все объекты</a>
              <a href="#" className="cursor-pointer hover:text-white transition-colors">Торговые центры</a>
              <a href="#" className="cursor-pointer hover:text-white transition-colors">Отели</a>
              <a href="#" className="cursor-pointer hover:text-white transition-colors">Супермаркеты</a>
              <a href="#" className="cursor-pointer hover:text-white transition-colors">Квартиры</a>
            </div>
          </div>
          <div className="flex flex-col gap-[20px] md:gap-[30px] items-start">
            <h4 className="font-semibold text-[16px] md:text-[18px] text-grey-96 leading-[24px] m-0">О компании</h4>
            <div className="flex flex-col gap-[12px] md:gap-[15px] text-[14px] md:text-[16px] text-grey-71 leading-[22px] md:leading-[24px] font-normal">
              <a href="#" className="cursor-pointer hover:text-white transition-colors">Пайстартер сегодня</a>
              <a href="#" className="cursor-pointer hover:text-white transition-colors">О команде</a>
              <a href="#" className="cursor-pointer hover:text-white transition-colors">Блог</a>
            </div>
          </div>
          <div className="flex flex-col gap-[20px] md:gap-[30px] items-start col-span-2 sm:col-span-1">
            <h4 className="font-semibold text-[16px] md:text-[18px] text-grey-96 leading-[24px] m-0">Контакты</h4>
            <div className="flex flex-col gap-[12px] md:gap-[15px] text-[14px] md:text-[16px] text-grey-71 leading-[22px] md:leading-[24px] font-normal">
              <a href="mailto:hi@piestarter.ru" className="underline hover:text-white transition-colors">hi@piestarter.ru</a>
              <a href="tel:+79001234567" className="hover:text-white transition-colors">+7 900 123-45-67</a>
              <span>Адрес: пер. Большой Афанасьевский, д. 41, стр. 2, этаж 5, Россия, Москва, 119019</span>
            </div>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="w-full h-[1px] bg-grey-71 opacity-30" />
      {/* Bottom */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[12px] w-full text-[12px] md:text-[16px] text-grey-96 leading-[20px] md:leading-[24px] font-normal">
        <span>© 2025 ООО «Пайстартер». Все права защищены</span>
        <div className="flex flex-col sm:flex-row gap-[8px] sm:gap-[24px] items-start sm:items-center">
          <a href="#" className="hover:text-white transition-colors">Политика обработки персональных данных</a>
          <a href="#" className="hover:text-white transition-colors">Политика видов деятельности</a>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
