import { Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-azure-13 flex flex-col gap-[24px] items-start px-[70px] py-[120px] w-full">
      <div className="flex gap-[30px] items-start w-full">
        {/* Logo & Info */}
        <div className="flex flex-col gap-[24px] items-start w-[640px]">
          <div className="flex items-center gap-[14px]">
            <div className="bg-black rounded-[20px] w-[60px] h-[60px] flex items-center justify-center">
              <span className="text-white font-bold text-[28px]">п</span>
            </div>
            <div className="logo-text text-[22px] leading-[21px] tracking-[0.66px] text-white">
              <p className="m-0">пай</p>
              <p className="m-0">стартер</p>
            </div>
          </div>
          <p className="text-[16px] text-grey-96 leading-[24px] font-normal m-0">
            Общество с ограниченной ответственностью «ПАЙСТАРТЕР»<br />
            ОГРН: 1187746382941, ИНН: 7731456723
          </p>
          <div className="flex gap-[12px] items-start">
            <div className="w-[45px] h-[45px] rounded-full bg-[#0088cc] flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <div className="text-[16px] text-grey-96 leading-[24px] font-normal">
              <p className="m-0">Подпишитесь</p>
              <p className="m-0">на телеграм-канал <span className="underline cursor-pointer">@piestarer</span></p>
            </div>
          </div>
        </div>
        {/* Footer Columns */}
        <div className="flex gap-[30px] items-start">
          <div className="flex flex-col gap-[30px] items-start w-[190px]">
            <h4 className="font-semibold text-[18px] text-grey-96 leading-[24px] m-0">Категории</h4>
            <div className="flex flex-col gap-[15px] text-[16px] text-grey-71 leading-[24px] font-normal">
              <span className="cursor-pointer hover:text-white transition-colors">Все объекты</span>
              <span className="cursor-pointer hover:text-white transition-colors">Торговые центры</span>
              <span className="cursor-pointer hover:text-white transition-colors">Отели</span>
              <span className="cursor-pointer hover:text-white transition-colors">Супермаркеты</span>
              <span className="cursor-pointer hover:text-white transition-colors">Квартиры</span>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] items-start w-[190px]">
            <h4 className="font-semibold text-[18px] text-grey-96 leading-[24px] m-0">О компании</h4>
            <div className="flex flex-col gap-[15px] text-[16px] text-grey-71 leading-[24px] font-normal">
              <span className="cursor-pointer hover:text-white transition-colors">Пайстартер сегодня</span>
              <span className="cursor-pointer hover:text-white transition-colors">О команде</span>
              <span className="cursor-pointer hover:text-white transition-colors">Блог</span>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] items-start w-[190px]">
            <h4 className="font-semibold text-[18px] text-grey-96 leading-[24px] m-0">Контакты</h4>
            <div className="flex flex-col gap-[15px] text-[16px] text-grey-71 leading-[24px] font-normal">
              <span className="underline cursor-pointer">hi@piestarter.ru</span>
              <span>+7 900 123-45-67</span>
              <span>Адрес: пер. Большой Афанасьевский, д. 41, стр. 2, этаж 5, Россия, Москва, 119019</span>
            </div>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="w-full h-[1px] bg-grey-71 opacity-30" />
      {/* Bottom */}
      <div className="flex items-center justify-between w-full text-[16px] text-grey-96 leading-[24px] font-normal">
        <span>© 2025 ООО «Пайстартер». Все права защищены</span>
        <div className="flex gap-[24px] items-center">
          <span className="cursor-pointer">Политика обработки персональных данных</span>
          <span className="cursor-pointer">Политика видов деятельности</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
