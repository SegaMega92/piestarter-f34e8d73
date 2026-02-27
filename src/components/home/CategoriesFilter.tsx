import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const defaultCategories = [
  { id: "all", label: "Все объекты", icon: "◼︎" },
  { id: "malls", label: "Торговые центры", icon: "🏪" },
  { id: "hotels", label: "Отели", icon: "🏨" },
  { id: "supermarkets", label: "Супермаркеты", icon: "🛒" },
  { id: "apartments", label: "Квартиры", icon: "🏢" },
];

const CategoriesFilter = () => {
  const [active, setActive] = useState("all");
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "home_categories").maybeSingle().then(({ data }) => {
      if (data?.value && (data.value as any).items) setCategories((data.value as any).items);
    });
  }, []);

  return (
    <div className="border-b border-grey-88 sticky top-[78px] md:top-[100px] bg-transparent backdrop-blur-sm z-40">
      <div className="content-container">
        <div className="flex items-center gap-[16px] md:gap-[24px] py-[12px] overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center gap-[6px] whitespace-nowrap text-[14px] md:text-[16px] leading-[24px] transition-colors ${
                active === cat.id
                  ? "text-black font-medium"
                  : "text-grey-44 hover:text-black"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
          <a
            href="/about"
            className="flex items-center gap-[6px] whitespace-nowrap text-[14px] md:text-[16px] leading-[24px] text-grey-44 hover:text-black transition-colors ml-auto"
          >
            <span>ℹ️</span>
            <span>О Пайстартер</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoriesFilter;
