import { useState } from "react";
import logoPie from "@/assets/logo_pie.svg";
import svgSearch from "@/assets/svg-search.svg";
import svgUser from "@/assets/svg-user.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 md:px-8 lg:px-[70px] py-[14px] md:py-[20px] w-full sticky top-0 bg-transparent backdrop-blur-sm z-50">
      {/* Logo */}
      <a href="/" className="flex items-center gap-[10px] md:gap-[14px] cursor-pointer hover:opacity-80 transition-opacity">
        <img src={logoPie} alt="Пайстартер" className="w-[44px] h-[44px] md:w-[60px] md:h-[60px]" />
        <div className="logo-text text-[18px] md:text-[22px] leading-[18px] md:leading-[21px] tracking-[0.66px] text-black">
          <p className="m-0">пай</p>
          <p className="m-0">стартер</p>
        </div>
      </a>
      {/* Search */}
      <div className="hidden lg:flex bg-white border border-grey-88 items-center justify-between px-[20px] py-[18px] rounded-[40px] flex-1 max-w-[600px] mx-4 xl:mx-8 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)] cursor-pointer hover:border-grey-71 hover:shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)] transition-all">
        <span className="text-p-gray font-medium text-[15px]">Поиск по объектам</span>
        <img src={svgSearch} alt="Поиск" className="w-[22px] h-[22px]" />
      </div>
      {/* CTA - hidden on mobile */}
      <div className="hidden md:flex items-center gap-[10px] shrink-0">
        <a href="/catalog" className="w-[50px] h-[50px] rounded-full bg-white border border-grey-88 flex items-center justify-center hover:border-grey-71 hover:shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)] transition-all" aria-label="Каталог">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="2" rx="1" fill="#1A1A2E"/>
            <rect y="6" width="20" height="2" rx="1" fill="#1A1A2E"/>
            <rect y="12" width="20" height="2" rx="1" fill="#1A1A2E"/>
          </svg>
        </a>
        <button className="flex bg-p-blue items-center gap-[10px] px-[20px] lg:px-[30px] py-[14px] lg:py-[18px] rounded-[30px] cursor-pointer hover:bg-[#96d9ec] active:scale-[0.98] transition-all whitespace-nowrap">
          <span className="font-medium text-[14px] lg:text-[14.9px] text-black">Личный кабинет</span>
          <img src={svgUser} alt="" className="w-[22px] h-[22px]" />
        </button>
      </div>
      {/* Mobile buttons */}
      <div className="flex md:hidden items-center gap-3">
        <button className="w-[44px] h-[44px] rounded-full bg-white border border-grey-88 flex items-center justify-center">
          <img src={svgSearch} alt="Поиск" className="w-[20px] h-[20px]" />
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-[44px] h-[44px] rounded-full bg-white border border-grey-88 flex flex-col items-center justify-center gap-[5px]"
        >
          <span className={`block w-[18px] h-[2px] bg-cyan-2 transition-all ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-[18px] h-[2px] bg-cyan-2 transition-all ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-bg-main/95 backdrop-blur-sm border-b border-grey-88 p-4 flex flex-col gap-3 md:hidden">
          <a href="/catalog" className="font-medium text-[15px] text-cyan-2 px-4 py-3" onClick={() => setMenuOpen(false)}>
            Каталог
          </a>
          <div className="bg-white border border-grey-88 flex items-center justify-between px-4 py-3 rounded-[20px]">
            <span className="text-p-gray font-medium text-[15px]">Поиск по объектам</span>
            <img src={svgSearch} alt="Поиск" className="w-[20px] h-[20px]" />
          </div>
          <button className="bg-p-blue flex items-center justify-center gap-[10px] px-[20px] py-[14px] rounded-[30px]">
            <span className="font-medium text-[14.9px] text-black">Личный кабинет</span>
            <img src={svgUser} alt="" className="w-[22px] h-[22px]" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
