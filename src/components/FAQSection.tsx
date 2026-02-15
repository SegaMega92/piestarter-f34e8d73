import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import svgPlus from "@/assets/svg-plus.svg";
import svgMinus from "@/assets/svg-minus.svg";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQItemComponent = ({ faq, index, isOpen, onToggle, isLast }: {
  faq: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`flex items-start justify-between py-[20px] md:py-[40px] w-full cursor-pointer select-none gap-[12px] md:gap-[16px] ${!isLast ? "border-b border-grey-71" : ""}`}
      onClick={onToggle}
    >
      <span className={`font-semibold text-[20px] md:text-[30px] leading-[1.3] shrink-0 w-[36px] md:w-[60px] transition-colors duration-300 ${isOpen ? "text-black" : "text-grey-71"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-0 items-start flex-1 min-w-0">
        <h3 className="font-semibold text-[18px] md:text-[30px] text-black leading-[1.3] m-0">{faq.question}</h3>
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-400 ease-in-out"
          style={{ maxHeight: height, opacity: isOpen ? 1 : 0, marginTop: isOpen ? 12 : 0, transition: 'max-height 0.4s ease, opacity 0.3s ease, margin-top 0.3s ease' }}
        >
          <p className="font-normal text-[14px] md:text-[16px] text-grey-30 leading-[22px] md:leading-[24px] m-0">{faq.answer}</p>
        </div>
      </div>
      <button
        className={`rounded-[22px] w-[36px] h-[36px] md:w-[44px] md:h-[44px] flex items-center justify-center shrink-0 border transition-all duration-300 hover:scale-110 ${
          isOpen
            ? "bg-azure-13 border-azure-13"
            : "bg-white border-grey-71 hover:border-cyan-2"
        }`}
      >
        <img
          src={isOpen ? svgMinus : svgPlus}
          alt=""
          className="w-[10px] h-[10px]"
        />
      </button>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [items, setItems] = useState<FAQItem[]>([]);
  const [title, setTitle] = useState("Вопросы и ответы");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .in("key", ["faq_items", "faq_settings"]);
      if (data) {
        const itemsRow = data.find((r) => r.key === "faq_items");
        const settingsRow = data.find((r) => r.key === "faq_settings");
        if (itemsRow) setItems(itemsRow.value as unknown as FAQItem[]);
        if (settingsRow) {
          const s = settingsRow.value as any;
          setTitle(s.title || "Вопросы и ответы");
          setDescription(s.description || "");
        }
      }
    };
    load();
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-[30px] md:gap-[60px] items-center py-[60px] md:py-[120px]">
      <h2 className="font-semibold text-[36px] md:text-[72px] leading-[1.05] tracking-[-1px] md:tracking-[-2.16px] text-black text-center m-0">
        {title}
      </h2>
      <div className="flex flex-col gap-[16px] md:gap-[24px] items-center w-full">
        {description && (
          <p className="font-normal text-[16px] md:text-[18px] text-grey-44 text-center max-w-[625px] leading-[24px] m-0">
            {description}
          </p>
        )}
        <div className="flex flex-col items-center w-full">
          {items.map((faq, i) => (
            <FAQItemComponent
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              isLast={i === items.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
