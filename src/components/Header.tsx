import image107 from "@/assets/image107.png";
import group33 from "@/assets/group33.svg";
import svgSearch from "@/assets/svg-search.svg";
import svgUser from "@/assets/svg-user.svg";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-[70px] py-[20px] w-full">
      {/* Logo */}
      <div className="flex items-center gap-[14px]">
        <div className="relative w-[60px] h-[60px] rounded-[20px] overflow-hidden">
          <img src={image107} alt="" className="w-full h-full object-cover" />
          <img src={group33} alt="" className="absolute top-[14px] left-[11px] w-[38px] h-[33px]" />
        </div>
        <div className="logo-text text-[22px] leading-[21px] tracking-[0.66px] text-black">
          <p className="m-0">пай</p>
          <p className="m-0">стартер</p>
        </div>
      </div>
      {/* Search */}
      <div className="bg-white border border-grey-88 flex items-center justify-between px-[20px] py-[18px] rounded-[40px] w-[600px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)]">
        <span className="text-p-gray font-medium text-[15px]">Поиск по объектам</span>
        <img src={svgSearch} alt="Поиск" className="w-[22px] h-[22px]" />
      </div>
      {/* CTA */}
      <div className="bg-p-blue flex items-center gap-[10px] px-[30px] py-[18px] rounded-[30px] cursor-pointer">
        <span className="font-medium text-[14.9px] text-black">Личный кабинет</span>
        <img src={svgUser} alt="" className="w-[22px] h-[22px]" />
      </div>
    </header>
  );
};

export default Header;
