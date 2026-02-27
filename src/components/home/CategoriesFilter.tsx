import { useLocation } from "react-router-dom";

const navLinks = [
  { href: "/", label: "Все объекты" },
  { href: "/about", label: "О Пайстартер" },
];

const CategoriesFilter = () => {
  const location = useLocation();

  return (
    <div className="border-b border-grey-88 sticky top-[78px] md:top-[100px] bg-transparent backdrop-blur-sm z-40">
      <div className="content-container">
        <div className="flex items-center gap-[16px] md:gap-[24px] py-[12px] overflow-x-auto scrollbar-hide">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? location.pathname === "/" || location.pathname === "/catalog"
                : location.pathname === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap text-[14px] md:text-[16px] leading-[24px] transition-colors ${
                  isActive
                    ? "text-black font-medium"
                    : "text-grey-44 hover:text-black"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesFilter;
