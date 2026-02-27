import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import logoPie from "@/assets/logo_pie.svg";
import svgSearch from "@/assets/svg-search.svg";
import svgUser from "@/assets/svg-user.svg";

interface Suggestion {
  title: string;
  slug: string;
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync query from URL on catalog page
  useEffect(() => {
    if (location.pathname === "/catalog") {
      const params = new URLSearchParams(location.search);
      setQuery(params.get("q") || "");
    }
  }, [location]);

  // Fetch suggestions on query change
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from("pages")
        .select("title, slug")
        .eq("status", "published")
        .ilike("title", `%${trimmed}%`)
        .limit(5);

      if (data && data.length > 0) {
        setSuggestions(data);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const doSearch = () => {
    const trimmed = query.trim();
    navigate(trimmed ? `/catalog?q=${encodeURIComponent(trimmed)}` : "/catalog");
    setSearchOpen(false);
    setMenuOpen(false);
    setShowSuggestions(false);
  };

  const goToObject = (slug: string) => {
    navigate(`/objects/${slug}`);
    setShowSuggestions(false);
    setSearchOpen(false);
    setMenuOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") doSearch();
    if (e.key === "Escape") { setSearchOpen(false); setQuery(""); setShowSuggestions(false); }
  };

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
      mobileInputRef.current?.focus();
    }
  }, [searchOpen]);

  const highlightMatch = (text: string) => {
    const trimmed = query.trim();
    if (!trimmed) return text;
    const idx = text.toLowerCase().indexOf(trimmed.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-cyan-2 font-semibold">{text.slice(idx, idx + trimmed.length)}</span>
        {text.slice(idx + trimmed.length)}
      </>
    );
  };

  const SuggestionsList = () => {
    if (!showSuggestions || suggestions.length === 0) return null;
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-grey-88 rounded-[16px] shadow-[0px_4px_16px_rgba(0,0,0,0.12)] overflow-hidden z-[60]">
        {suggestions.map((s) => (
          <button
            key={s.slug}
            onClick={() => goToObject(s.slug)}
            className="w-full text-left px-4 py-3 hover:bg-grey-88/20 transition-colors flex items-center gap-2"
          >
            <img src={svgSearch} alt="" className="w-[16px] h-[16px] opacity-40 shrink-0" />
            <span className="text-[14px] text-grey-44 truncate">{highlightMatch(s.title)}</span>
          </button>
        ))}
        <button
          onClick={doSearch}
          className="w-full text-left px-4 py-3 border-t border-grey-88/50 hover:bg-grey-88/20 transition-colors"
        >
          <span className="text-[13px] text-p-gray">Показать все результаты по «{query.trim()}»</span>
        </button>
      </div>
    );
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-8 lg:px-[70px] py-[14px] md:py-[20px] w-full sticky top-0 bg-transparent backdrop-blur-sm z-50">
      {/* Logo */}
      <a href="/" className="flex items-center gap-[10px] md:gap-[14px] cursor-pointer hover:opacity-80 transition-opacity shrink-0">
        <img src={logoPie} alt="Пайстартер" className="w-[44px] h-[44px] md:w-[60px] md:h-[60px]" />
        <div className="logo-text text-[18px] md:text-[22px] leading-[18px] md:leading-[21px] tracking-[0.66px] text-black">
          <p className="m-0">пай</p>
          <p className="m-0">стартер</p>
        </div>
      </a>

      {/* Desktop Search */}
      <div className="hidden lg:flex relative flex-1 max-w-[600px] mx-4 xl:mx-8" ref={suggestionsRef}>
        <div className="bg-white border border-grey-88 flex items-center px-[20px] py-[14px] rounded-[40px] w-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)] hover:border-grey-71 hover:shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)] transition-all gap-[10px]">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Поиск по объектам"
            className="flex-1 bg-transparent outline-none text-cyan-2 font-medium text-[15px] placeholder:text-p-gray"
          />
          <button onClick={doSearch} className="shrink-0 hover:opacity-70 transition-opacity">
            <img src={svgSearch} alt="Поиск" className="w-[22px] h-[22px]" />
          </button>
        </div>
        <SuggestionsList />
      </div>

      {/* Tablet Search (md but not lg) */}
      <div className="hidden md:flex lg:hidden flex-1 mx-4">
        {searchOpen ? (
          <div className="relative flex-1" ref={suggestionsRef}>
            <div className="flex bg-white border border-grey-88 items-center px-[16px] py-[12px] rounded-[30px] w-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)] gap-[8px]">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Поиск по объектам"
                autoFocus
                className="flex-1 bg-transparent outline-none text-cyan-2 font-medium text-[14px] placeholder:text-p-gray"
              />
              <button onClick={doSearch} className="shrink-0">
                <img src={svgSearch} alt="Поиск" className="w-[20px] h-[20px]" />
              </button>
              <button onClick={() => { setSearchOpen(false); setQuery(""); setShowSuggestions(false); }} className="text-grey-44 text-[13px] font-medium ml-1">
                ✕
              </button>
            </div>
            <SuggestionsList />
          </div>
        ) : (
          <div />
        )}
      </div>

      {/* CTA - hidden on mobile */}
      <div className="hidden md:flex items-center gap-[10px] shrink-0">
        {!searchOpen && (
          <button
            onClick={() => setSearchOpen(true)}
            className="lg:hidden w-[50px] h-[50px] rounded-full bg-white border border-grey-88 flex items-center justify-center hover:border-grey-71 hover:shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)] transition-all"
            aria-label="Поиск"
          >
            <img src={svgSearch} alt="Поиск" className="w-[20px] h-[20px]" />
          </button>
        )}
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
        <button
          onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }}
          className="w-[44px] h-[44px] rounded-full bg-white border border-grey-88 flex items-center justify-center"
        >
          <img src={svgSearch} alt="Поиск" className="w-[20px] h-[20px]" />
        </button>
        <button
          onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
          className="w-[44px] h-[44px] rounded-full bg-white border border-grey-88 flex flex-col items-center justify-center gap-[5px]"
        >
          <span className={`block w-[18px] h-[2px] bg-cyan-2 transition-all ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-[18px] h-[2px] bg-cyan-2 transition-all ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile search dropdown */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-bg-main/95 backdrop-blur-sm border-b border-grey-88 p-4 md:hidden z-[60]">
          <div className="flex bg-white border border-grey-88 items-center px-4 py-3 rounded-[20px] gap-[8px]">
            <input
              ref={mobileInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Поиск по объектам"
              className="flex-1 bg-transparent outline-none text-cyan-2 font-medium text-[15px] placeholder:text-p-gray"
            />
            <button onClick={doSearch} className="shrink-0">
              <img src={svgSearch} alt="Поиск" className="w-[20px] h-[20px]" />
            </button>
          </div>
          {/* Mobile suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="mt-2 bg-white border border-grey-88 rounded-[16px] overflow-hidden">
              {suggestions.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => goToObject(s.slug)}
                  className="w-full text-left px-4 py-3 hover:bg-grey-88/20 transition-colors flex items-center gap-2"
                >
                  <img src={svgSearch} alt="" className="w-[16px] h-[16px] opacity-40 shrink-0" />
                  <span className="text-[14px] text-grey-44 truncate">{highlightMatch(s.title)}</span>
                </button>
              ))}
              <button
                onClick={doSearch}
                className="w-full text-left px-4 py-3 border-t border-grey-88/50 hover:bg-grey-88/20 transition-colors"
              >
                <span className="text-[13px] text-p-gray">Показать все результаты</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-bg-main/95 backdrop-blur-sm border-b border-grey-88 p-4 flex flex-col gap-3 md:hidden">
          <a href="/catalog" className="font-medium text-[15px] text-cyan-2 px-4 py-3" onClick={() => setMenuOpen(false)}>
            Каталог
          </a>
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
