import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import logoPie from "@/assets/logo_pie.svg";
import telegram from "@/assets/telegram.svg";

interface FooterLink {
  text: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterData {
  companyText: string;
  telegramUrl: string;
  telegramHandle: string;
  columns: FooterColumn[];
  copyright: string;
  bottomLinks: FooterLink[];
}

const defaultData: FooterData = {
  companyText: "Общество с ограниченной ответственностью «ПАЙСТАРТЕР»\nОГРН: 1187746382941, ИНН: 7731456723",
  telegramUrl: "https://t.me/piestarter",
  telegramHandle: "@piestarter",
  columns: [
    {
      title: "Каталог",
      links: [{ text: "Все объекты", url: "/catalog" }],
    },
    {
      title: "О компании",
      links: [
        { text: "Пайстартер сегодня", url: "/about" },
        { text: "О команде", url: "/about" },
      ],
    },
    {
      title: "Контакты",
      links: [
        { text: "hi@piestarter.ru", url: "mailto:hi@piestarter.ru" },
        { text: "+7 900 123-45-67", url: "tel:+79001234567" },
        { text: "Адрес: пер. Большой Афанасьевский, д. 41, стр. 2, этаж 5, Россия, Москва, 119019", url: "" },
      ],
    },
  ],
  copyright: "© 2025 ООО «Пайстартер». Все права защищены",
  bottomLinks: [
    { text: "Политика конфиденциальности", url: "/privacy" },
    { text: "Согласие на обработку персональных данных", url: "/consent" },
  ],
};

const linkClass = "cursor-pointer hover:text-white transition-colors";

const NavLink = ({ url, text, className }: { url: string; text: string; className?: string }) => {
  const cls = `${linkClass}${className ? " " + className : ""}`;
  if (!url) return <span className={cls}>{text}</span>;
  if (url.startsWith("/") || url.startsWith("#")) return <Link to={url} className={cls}>{text}</Link>;
  if (url.startsWith("http")) return <a href={url} target="_blank" rel="noopener noreferrer" className={cls}>{text}</a>;
  return <a href={url} className={cls}>{text}</a>;
};

const Footer = () => {
  const [d, setD] = useState<FooterData>(defaultData);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "footer_settings")
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) setD({ ...defaultData, ...(data.value as any) });
      });
  }, []);

  return (
    <footer className="bg-azure-13 py-[60px] md:py-[120px] w-full">
      <div className="content-container flex flex-col gap-[24px] items-start">
        <div className="flex flex-col md:flex-row gap-[30px] items-start w-full">
          {/* Logo & Info */}
          <div className="flex flex-col gap-[24px] items-start w-full md:w-[640px]">
            <Link to="/" className="flex items-center gap-[14px] hover:opacity-80 transition-opacity">
              <img src={logoPie} alt="Пайстартер" className="w-[44px] h-[44px] md:w-[60px] md:h-[60px]" />
              <div className="logo-text text-[18px] md:text-[22px] leading-[18px] md:leading-[21px] tracking-[0.66px] text-white">
                <p className="m-0">пай</p>
                <p className="m-0">стартер</p>
              </div>
            </Link>
            <p className="text-[14px] md:text-[16px] text-grey-96 leading-[22px] md:leading-[24px] font-normal m-0 whitespace-pre-line">
              {d.companyText}
            </p>
            <a
              href={d.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-[12px] items-start hover:opacity-80 transition-opacity"
            >
              <img src={telegram} alt="Telegram" className="w-[40px] h-[40px] md:w-[45px] md:h-[45px]" />
              <div className="text-[14px] md:text-[16px] text-grey-96 leading-[22px] md:leading-[24px] font-normal">
                <p className="m-0">Подпишитесь</p>
                <p className="m-0">на телеграм-канал <span className="underline">{d.telegramHandle}</span></p>
              </div>
            </a>
          </div>

          {/* Footer Columns */}
          <div className={`grid grid-cols-2 sm:grid-cols-${Math.min(d.columns.length, 3)} gap-[24px] md:gap-[30px] w-full md:w-auto`}>
            {d.columns.map((col, ci) => (
              <div
                key={ci}
                className={`flex flex-col gap-[20px] md:gap-[30px] items-start${ci === d.columns.length - 1 && d.columns.length % 2 !== 0 ? " col-span-2 sm:col-span-1" : ""}`}
              >
                <h4 className="font-semibold text-[16px] md:text-[18px] text-grey-96 leading-[24px] m-0">{col.title}</h4>
                <div className="flex flex-col gap-[12px] md:gap-[15px] text-[14px] md:text-[16px] text-grey-71 leading-[22px] md:leading-[24px] font-normal">
                  {col.links.map((link, li) => (
                    <NavLink key={li} url={link.url} text={link.text} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-grey-71 opacity-30" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[12px] w-full text-[12px] md:text-[16px] text-grey-96 leading-[20px] md:leading-[24px] font-normal">
          <span>{d.copyright}</span>
          <div className="flex flex-col sm:flex-row gap-[8px] sm:gap-[24px] items-start sm:items-center">
            {d.bottomLinks.map((link, i) => (
              <NavLink key={i} url={link.url} text={link.text} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
