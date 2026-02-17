import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import mapImage from "@/assets/home/map.png";

const markers = [
  { id: 1, x: "36%", y: "48%", count: 3, title: "Москва" },
  { id: 2, x: "35%", y: "55%", count: 2, title: "Рязань" },
  { id: 3, x: "41%", y: "52%", count: 4, title: "Казань" },
  { id: 4, x: "52%", y: "62%", count: 2, title: "Екатеринбург" },
  { id: 5, x: "70%", y: "40%", count: 2, title: "Новосибирск" },
  { id: 6, x: "77%", y: "45%", count: 2, title: "Иркутск" },
];

const defaultData = {
  title: "Инвестиционная температура",
  description: "Карта показывает, где растёт цена на коммерческую недвижимость — и куда уже сейчас стоит присмотреться. Точками отмечены объекты, в которых можно приобрести паи.",
};

const InvestmentMap = () => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [filterType, setFilterType] = useState("all");
  const [d, setD] = useState(defaultData);

  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "home_map").maybeSingle().then(({ data }) => {
      if (data?.value) setD({ ...defaultData, ...(data.value as any) });
    });
  }, []);

  return (
    <section className="py-[60px] md:py-[120px] bg-azure-13">
      <div className="content-container mb-[40px] md:mb-[60px]">
        <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[100px]">
          <h2 className="font-semibold text-[36px] md:text-[56px] lg:text-[68px] leading-[1.05] tracking-[-1px] md:tracking-[-2px] text-white lg:w-[625px]">
            {d.title}
          </h2>
          <p className="text-grey-71 text-[16px] md:text-[18px] leading-[24px] lg:flex-1 lg:pt-[16px]">
            {d.description}
          </p>
        </div>
      </div>

      <div className="content-container">
        <div className="relative rounded-[24px] md:rounded-[40px] overflow-hidden">
          <div className="relative aspect-[16/10] md:aspect-[1284/692]">
            <img src={mapImage} alt="Карта инвестиций" className="w-full h-full object-cover" />

            {markers.map((marker) => (
              <button
                key={marker.id}
                onClick={() => setActiveMarker(activeMarker === marker.id ? null : marker.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 w-[28px] h-[28px] md:w-[36px] md:h-[36px] bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                style={{ left: marker.x, top: marker.y }}
              >
                <span className="font-semibold text-[12px] md:text-[14px] text-black">{marker.count}</span>
              </button>
            ))}

            {activeMarker && (
              <div
                className="absolute z-10 bg-white rounded-[20px] p-[16px] md:p-[20px] shadow-xl min-w-[280px] md:min-w-[380px]"
                style={{
                  left: markers.find((m) => m.id === activeMarker)?.x,
                  top: `calc(${markers.find((m) => m.id === activeMarker)?.y} + 30px)`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="flex items-center justify-between mb-[12px]">
                  <h4 className="font-semibold text-[16px] md:text-[20px] text-black">
                    ЗПИФН «Активо Флиппинг»
                  </h4>
                  <button onClick={() => setActiveMarker(null)} className="w-[24px] h-[24px] flex items-center justify-center text-grey-44 hover:text-black">✕</button>
                </div>
                <div className="flex flex-col gap-[8px] mb-[16px]">
                  <div className="flex gap-[8px] text-[14px]"><span className="text-grey-44">Стоимость:</span><span className="text-black">1 531 529 489 ₽</span></div>
                  <div className="flex gap-[8px] text-[14px]"><span className="text-grey-44">Доходность:</span><span className="text-black">25%</span></div>
                </div>
                <a href="#" className="block w-full text-center py-[14px] border border-grey-88 rounded-[30px] text-[14px] font-medium text-black hover:bg-grey-96 transition-colors">Подробнее</a>
              </div>
            )}

            <div className="absolute top-[16px] right-[16px] md:top-[20px] md:right-[20px]">
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-[16px] py-[8px] bg-white rounded-[20px] text-[14px] text-black border-none outline-none cursor-pointer">
                <option value="all">Все типы недвижимости</option>
                <option value="office">Офисы</option>
                <option value="retail">Торговые центры</option>
                <option value="warehouse">Склады</option>
              </select>
            </div>

            <div className="absolute bottom-[16px] right-[16px] md:bottom-[20px] md:right-[20px] bg-white/90 backdrop-blur-sm rounded-[16px] p-[12px] md:p-[16px]">
              <p className="text-[10px] md:text-[12px] text-grey-44 mb-[8px]">Динамика изменения цен</p>
              <div className="flex items-center gap-[4px]">
                <span className="text-[10px] text-grey-44">-30%</span>
                <div className="w-[200px] md:w-[300px] h-[12px] rounded-full bg-gradient-to-r from-blue-500 via-green-400 via-yellow-400 to-red-500" />
                <span className="text-[10px] text-grey-44">+30%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentMap;
