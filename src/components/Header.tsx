import { Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-[70px] py-[20px] w-full">
      {/* Logo */}
      <div className="flex items-center gap-[14px]">
        <div className="bg-black rounded-[20px] w-[60px] h-[60px] flex items-center justify-center">
          <span className="text-white font-bold text-[28px]">п</span>
        </div>
        <div className="logo-text text-[22px] leading-[21px] tracking-[0.66px] text-black">
          <p className="m-0">пай</p>
          <p className="m-0">стартер</p>
        </div>
      </div>
      {/* Search */}
      <div className="bg-white border border-grey-88 flex items-center justify-between px-[20px] py-[18px] rounded-[40px] w-[600px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)]">
        <span className="text-p-gray font-medium text-[15px]">Поиск по объектам</span>
        <Search className="w-[22px] h-[22px] text-p-gray" />
      </div>
      {/* CTA */}
      <div className="bg-p-blue flex items-center gap-[10px] px-[30px] py-[18px] rounded-[30px] cursor-pointer">
        <span className="font-medium text-[14.9px] text-black">Личный кабинет</span>
        <User className="w-[22px] h-[22px] text-black" />
      </div>
    </header>
  );
};

export default Header;
