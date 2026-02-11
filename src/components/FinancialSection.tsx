import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "июн. 25", income: 500 },
  { month: "июл. 25", income: 1200 },
  { month: "авг. 25", income: 650 },
  { month: "сен. 25", income: 2200 },
];

const FinancialSection = () => {
  const [period, setPeriod] = useState<"12m" | "all">("all");

  return (
    <section className="bg-azure-13 flex gap-[30px] items-start px-[70px] py-[120px] rounded-[40px] w-full">
      {/* Left */}
      <div className="flex flex-col gap-[48px] items-start w-[408px]">
        <h2 className="font-semibold text-[48px] leading-[1.1] tracking-[-0.96px] text-white m-0">
          Финансовые показатели
        </h2>
        <div className="flex flex-col gap-[30px] w-full">
          <div className="flex flex-col gap-[24px]">
            <div className="flex gap-[12px] items-center">
              <ArrowRight className="w-[16px] h-[18px] text-p-blue" />
              <span className="font-semibold text-[36px] text-p-blue tracking-[-1px] leading-[1.1]">Доход на пай</span>
            </div>
            <p className="font-medium text-[18px] text-grey-71 leading-[24px] m-0">
              Это прибыль, приходящаяся на один инвестиционный пай фонда. Начисляется ежемесячно.
            </p>
          </div>
          <span className="font-semibold text-[36px] text-grey-44 tracking-[-1px] leading-[1.1] cursor-pointer">Стоимость пая</span>
          <span className="font-semibold text-[36px] text-grey-44 tracking-[-1px] leading-[1.1] cursor-pointer">Оборот паев</span>
        </div>
      </div>
      {/* Right: Chart */}
      <div className="bg-[#222936] h-[530px] overflow-hidden rounded-[40px] w-[828px] relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-[6px] bg-white h-[420px] rounded-[40px] w-[816px] overflow-hidden p-[24px]">
          {/* Chart Tabs */}
          <div className="flex gap-[8px] items-center">
            <button
              onClick={() => setPeriod("12m")}
              className={`border border-grey-88 flex items-center justify-center p-[10px] rounded-[12px] ${period === "12m" ? "bg-blue-second text-white" : "text-grey-44"}`}
            >
              <span className="font-semibold text-[14px]">12 месяцев</span>
            </button>
            <button
              onClick={() => setPeriod("all")}
              className={`border border-grey-88 flex items-center justify-center p-[10px] rounded-[12px] ${period === "all" ? "bg-blue-second text-white" : "text-grey-44"}`}
            >
              <span className="font-semibold text-[14px]">Всё время</span>
            </button>
            <div className="ml-auto flex flex-col items-end">
              <span className="font-medium text-grey-44 text-[18px] leading-[24px]">Итого доход</span>
              <span className="font-semibold text-cyan-2 text-[18px] leading-[24px]">8 560₽</span>
            </div>
          </div>
          {/* Chart */}
          <div className="mt-[20px] h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#397fff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#397fff" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#707070" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#707070" }} />
                <Tooltip
                  contentStyle={{
                    background: "#000709",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: 12,
                  }}
                  formatter={(value: number) => [`${value}₽`, "Доход на паи"]}
                />
                <Area type="monotone" dataKey="income" stroke="#397fff" strokeWidth={2} fill="url(#incomeGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Bottom buttons */}
        <div className="absolute flex gap-[12px] items-center left-[35px] top-[450px]">
          <div className="bg-p-blue flex items-center justify-center px-[30px] py-[18px] rounded-[30px] cursor-pointer">
            <span className="font-medium text-[14.9px] text-black">Купить паи</span>
          </div>
          <div className="border border-grey-96 flex gap-[10px] items-center justify-center px-[30px] py-[18px] rounded-[30px] cursor-pointer">
            <span className="font-medium text-[14.9px] text-white">Связаться с менеджером</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialSection;
