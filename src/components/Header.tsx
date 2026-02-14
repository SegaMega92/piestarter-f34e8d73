import logoPie from "@/assets/logo_pie.svg";
import svgSearch from "@/assets/svg-search.svg";
import svgUser from "@/assets/svg-user.svg";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-[70px] py-[20px] w-full sticky top-0 bg-bg-main/95 backdrop-blur-sm z-50">
      {/* Logo */}
      <a href="/" className="flex items-center gap-[14px] cursor-pointer hover:opacity-80 transition-opacity">
        <img src={logoPie} alt="Пайстартер" className="w-[60px] h-[60px]" />
        <div className="logo-text text-[22px] leading-[21px] tracking-[0.66px] text-black">
          <p className="m-0">пай</p>
          <p className="m-0">стартер</p>
        </div>
      </a>
      {/* Search */}
      <div className="bg-white border border-grey-88 flex items-center justify-between px-[20px] py-[18px] rounded-[40px] w-[600px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)] cursor-pointer hover:border-grey-71 hover:shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)] transition-all">
        <span className="text-p-gray font-medium text-[15px]">Поиск по объектам</span>
        <img src={svgSearch} alt="Поиск" className="w-[22px] h-[22px]" />
      </div>
      {/* CTA */}
      <button className="bg-p-blue flex items-center gap-[10px] px-[30px] py-[18px] rounded-[30px] cursor-pointer hover:bg-[#96d9ec] active:scale-[0.98] transition-all">
        <span className="font-medium text-[14.9px] text-black">Личный кабинет</span>
        <img src={svgUser} alt="" className="w-[22px] h-[22px]" />
      </button>
    </header>
  );
};

export default Header;
