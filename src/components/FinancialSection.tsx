import { useState } from "react";
import arrowRight from "@/assets/arrow-right.svg";
import graph from "@/assets/graph.svg";
import graph1 from "@/assets/graph1.svg";
import ellipse12 from "@/assets/ellipse12.svg";

const tabs = [
  { key: "income", label: "Доход на пай", desc: "Это прибыль, приходящаяся на один инвестиционный пай фонда. Начисляется ежемесячно." },
  { key: "value", label: "Стоимость пая", desc: "Текущая рыночная стоимость одного инвестиционного пая фонда." },
  { key: "turnover", label: "Оборот паев", desc: "Объём торгов паями за выбранный период." },
];

const FinancialSection = () => {
  const [period, setPeriod] = useState<"12m" | "all">("all");
  const [activeTab, setActiveTab] = useState("income");

  return (
    <section className="bg-azure-13 rounded-[24px] md:rounded-[40px] w-full py-[60px] md:py-[120px]">
      <div className="content-container flex flex-col lg:flex-row gap-[30px] items-start">
      {/* Left */}
      <div className="flex flex-col gap-[30px] md:gap-[48px] items-start w-full lg:w-[408px] lg:shrink-0">
        <h2 className="font-semibold text-[32px] md:text-[48px] leading-[1.1] tracking-[-0.96px] text-white m-0">
          Финансовые показатели
        </h2>
        <div className="flex flex-col gap-[24px] md:gap-[30px] w-full">
          {tabs.map((tab) => (
            <div key={tab.key} className="flex flex-col gap-[16px] md:gap-[24px]">
              <button
                onClick={() => setActiveTab(tab.key)}
                className={`flex gap-[12px] items-center text-left transition-colors ${activeTab === tab.key ? "" : "group"}`}
              >
                {activeTab === tab.key && (
                  <img src={arrowRight} alt="" className="w-[14px] h-[16px] md:w-[16px] md:h-[18px]" />
                )}
                <span className={`font-semibold text-[24px] md:text-[36px] tracking-[-1px] leading-[1.1] transition-colors ${
                  activeTab === tab.key ? "text-p-blue" : "text-grey-44 group-hover:text-grey-71"
                }`}>
                  {tab.label}
                </span>
              </button>
              {activeTab === tab.key && (
                <p className="font-normal text-[16px] md:text-[18px] text-grey-71 leading-[24px] m-0">
                  {tab.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Right: Chart */}
      <div className="bg-[#222936] min-h-[360px] md:min-h-[530px] overflow-hidden rounded-[24px] md:rounded-[40px] w-full lg:flex-1 lg:min-w-0 relative">
        <div className="relative md:absolute md:left-1/2 md:-translate-x-1/2 md:top-[6px] bg-white min-h-[280px] md:h-[420px] rounded-[20px] md:rounded-[40px] w-full md:w-[816px] overflow-hidden p-[16px] md:p-[24px]">
          {/* Chart Tabs */}
          <div className="flex flex-wrap gap-[8px] items-center">
            <button
              onClick={() => setPeriod("12m")}
              className={`border border-grey-88 flex items-center justify-center p-[8px] md:p-[10px] rounded-[12px] transition-colors ${period === "12m" ? "bg-blue-second text-white border-blue-second" : "text-grey-44 hover:border-grey-44"}`}
            >
              <span className="font-semibold text-[12px] md:text-[14px]">12 месяцев</span>
            </button>
            <button
              onClick={() => setPeriod("all")}
              className={`border border-grey-88 flex items-center justify-center p-[8px] md:p-[10px] rounded-[12px] transition-colors ${period === "all" ? "bg-blue-second text-white border-blue-second" : "text-grey-44 hover:border-grey-44"}`}
            >
              <span className="font-semibold text-[12px] md:text-[14px]">Всё время</span>
            </button>
            <div className="ml-auto flex flex-col items-end">
              <span className="font-medium text-grey-44 text-[14px] md:text-[18px] leading-[20px] md:leading-[24px]">Итого доход</span>
              <span className="font-semibold text-cyan-2 text-[14px] md:text-[18px] leading-[20px] md:leading-[24px]">8 560₽</span>
            </div>
          </div>
          {/* Graph SVGs */}
          <div className="mt-[16px] md:mt-[20px] h-[180px] md:h-[300px] w-full relative">
            <img src={graph} alt="" className="absolute bottom-0 left-0 w-full h-[70%] md:h-[262px]" />
            <img src={graph1} alt="" className="absolute bottom-0 left-0 w-full h-[60%] md:h-[221px]" />
            <img src={ellipse12} alt="" className="absolute top-[0px] right-[60px] md:right-[140px] w-[10px] h-[10px] md:w-[12px] md:h-[12px]" />
          </div>
        </div>
        {/* Bottom buttons */}
        <div className="flex flex-wrap gap-[8px] md:gap-[12px] items-center p-[16px] md:absolute md:left-[35px] md:top-[450px]">
          <button className="bg-p-blue flex items-center justify-center px-[20px] md:px-[30px] py-[12px] md:py-[18px] rounded-[30px] cursor-pointer hover:bg-[#96d9ec] active:scale-[0.98] transition-all">
            <span className="font-medium text-[13px] md:text-[14.9px] text-black">Купить паи</span>
          </button>
          <button className="border border-grey-96 flex gap-[10px] items-center justify-center px-[20px] md:px-[30px] py-[12px] md:py-[18px] rounded-[30px] cursor-pointer hover:bg-white/10 transition-colors">
            <span className="font-medium text-[13px] md:text-[14.9px] text-white">Связаться с менеджером</span>
          </button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default FinancialSection;
