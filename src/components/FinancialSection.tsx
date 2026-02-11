import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const monthlyData = [
  { month: "Янв", income: 2800 },
  { month: "Фев", income: 2900 },
  { month: "Мар", income: 3100 },
  { month: "Апр", income: 3000 },
  { month: "Май", income: 3200 },
  { month: "Июн", income: 3400 },
  { month: "Июл", income: 3300 },
  { month: "Авг", income: 3500 },
  { month: "Сен", income: 3600 },
  { month: "Окт", income: 3700 },
  { month: "Ноя", income: 3800 },
  { month: "Дек", income: 4000 },
];

const FinancialSection = () => {
  const [period, setPeriod] = useState<"12m" | "all">("12m");

  return (
    <section className="bg-[hsl(235,30%,14%)] text-white py-16">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Left tabs */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Финансовые показатели</h2>
            <Tabs defaultValue="income" orientation="vertical" className="w-full">
              <TabsList className="flex flex-col h-auto bg-white/10 p-1 w-full">
                <TabsTrigger
                  value="income"
                  className="w-full justify-start data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                >
                  Доход на пай
                </TabsTrigger>
                <TabsTrigger
                  value="price"
                  className="w-full justify-start data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                >
                  Стоимость пая
                </TabsTrigger>
                <TabsTrigger
                  value="turnover"
                  className="w-full justify-start data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                >
                  Оборот паёв
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2">
              <p className="text-white/60 text-sm">Итого доход на 1 пай</p>
              <p className="text-3xl font-extrabold">40 200 ₽</p>
              <p className="text-sm text-green-400">+24,13% годовых</p>
            </div>
          </div>

          {/* Right chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={period === "12m" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPeriod("12m")}
                  className={period !== "12m" ? "text-white/60 hover:text-white hover:bg-white/10" : ""}
                >
                  12 месяцев
                </Button>
                <Button
                  variant={period === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPeriod("all")}
                  className={period !== "all" ? "text-white/60 hover:text-white hover:bg-white/10" : ""}
                >
                  Всё время
                </Button>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(213, 80%, 55%)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(213, 80%, 55%)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(235, 30%, 20%)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value: number) => [`${value.toLocaleString()} ₽`, "Доход"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="hsl(213, 80%, 55%)"
                    strokeWidth={2}
                    fill="url(#incomeGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button className="h-12 px-8 text-base font-semibold">
                Купить паи
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                Связаться с менеджером
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialSection;
