import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import arrowRight from "@/assets/arrow-right.svg";

const tabs = [
  { key: "income", label: "Доход на пай", desc: "Это прибыль, приходящаяся на один инвестиционный пай фонда. Начисляется ежемесячно." },
  { key: "value", label: "Стоимость пая", desc: "Текущая рыночная стоимость одного инвестиционного пая фонда." },
  { key: "turnover", label: "Оборот паев", desc: "Объём торгов паями за выбранный период." },
];

const chartDataAll = [
  { month: "янв. 25", value: 200 },
  { month: "фев. 25", value: 800 },
  { month: "мар. 25", value: 1700 },
  { month: "апр. 25", value: 1400 },
  { month: "май. 25", value: 650 },
  { month: "июн. 25", value: 400 },
  { month: "июл. 25", value: 650 },
  { month: "авг. 25", value: 2100 },
  { month: "сен. 25", value: 2500 },
  { month: "окт. 25", value: 1800 },
  { month: "ноя. 25", value: 800 },
  { month: "дек. 25", value: 560 },
];

const chartData12m = chartDataAll.slice(-6);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-cyan-2 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
        <p className="m-0">Доход на паи</p>
        <p className="m-0 text-base font-semibold">{payload[0].value}₽</p>
      </div>
    );
  }
  return null;
};

const FinancialSection = () => {
  const [period, setPeriod] = useState<"12m" | "all">("all");
  const [activeTab, setActiveTab] = useState("income");

  const data = period === "all" ? chartDataAll : chartData12m;
  const total = period === "all" ? "8 560₽" : "5 310₽";

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
      <div className="bg-[#222936] overflow-hidden rounded-[24px] md:rounded-[40px] w-full lg:flex-1 lg:min-w-0 flex flex-col">
        <div className="bg-white rounded-[20px] md:rounded-[40px] w-full overflow-hidden p-[16px] md:p-[24px] m-[4px] md:m-[6px]" style={{ width: 'calc(100% - 8px)', maxWidth: 'calc(100% - 12px)' }}>
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
              <span className="font-semibold text-cyan-2 text-[14px] md:text-[18px] leading-[20px] md:leading-[24px]">{total}</span>
            </div>
          </div>
          {/* Recharts Graph */}
          <div className="mt-[16px] md:mt-[20px] h-[200px] md:h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#397fff" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#397fff" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#828485' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#828485' }}
                  dx={-5}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Area
                  type="natural"
                  dataKey="value"
                  stroke="#397fff"
                  strokeWidth={2.5}
                  fill="url(#colorValue)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#fff', stroke: '#397fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Bottom buttons */}
        <div className="flex flex-wrap gap-[8px] md:gap-[12px] items-center px-[16px] md:px-[30px] py-[16px] md:py-[24px]">
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
