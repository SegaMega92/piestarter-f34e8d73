import { useState } from "react";
import imageHub from "@/assets/image-hub.png";
import imageWarehouse from "@/assets/image-warehouse.png";
import bxsCopyAlt1 from "@/assets/bxs-copy-alt1.svg";
import { copyWithTooltip } from "@/lib/copyToClipboard";

interface LocationSectionProps {
  content?: Record<string, any>;
}

const LocationSection = ({ content }: LocationSectionProps) => {
  const [mapActive, setMapActive] = useState(false);

  const title = content?.title || "Расположение";
  const address = content?.address || "г. Екатеринбург, ул. Черняховского, 86к7";
  const coords = content?.coordinates || "56.757702, 60.752964";
  const [lat, lon] = coords.split(",").map((s: string) => s.trim());
  const descriptionHtml = content?.description_html;

  return (
    <section className="flex flex-col md:flex-row gap-[20px] md:gap-[30px] items-start pb-[60px] md:pb-[120px]">
      {/* Map */}
      <div
        className="h-[240px] sm:h-[340px] md:h-[480px] overflow-hidden rounded-[20px] md:rounded-[40px] w-full md:flex-1 md:min-w-0 relative"
        onMouseLeave={() => setMapActive(false)}
      >
        <iframe
          src={`https://yandex.ru/map-widget/v1/?ll=${lon},${lat}&z=15&l=map&pt=${lon},${lat},pm2blm&lang=ru_RU`}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen={false}
          style={{ border: 0, borderRadius: 'inherit' }}
          title="Карта расположения объекта"
        />
        {!mapActive && (
          <div className="absolute inset-0 z-10 cursor-pointer" onClick={() => setMapActive(true)} />
        )}
      </div>
      {/* Location Details */}
      <div className="flex flex-col gap-[24px] md:gap-[36px] items-start w-full md:flex-1 md:min-w-0">
        <div className="flex flex-col gap-[12px]">
          <h2 className="font-semibold text-[32px] md:text-[48px] leading-[1.1] tracking-[-0.96px] text-azure-4 m-0">{title}</h2>
          <button
            className="flex gap-[6px] items-center group hover:opacity-70 transition-opacity"
            onClick={(e) => copyWithTooltip(address, e)}
          >
            <span className="font-normal text-[16px] md:text-[18px] text-grey-44">{address}</span>
            <img src={bxsCopyAlt1} alt="Копировать" className="w-[15px] h-[15px]" />
          </button>
        </div>
        {descriptionHtml ? (
          <div
            className="font-normal text-[16px] md:text-[18px] text-cyan-2 leading-[24px] space-y-3 md:space-y-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        ) : (
          <ul className="font-normal text-[16px] md:text-[18px] text-cyan-2 leading-[24px] space-y-3 md:space-y-4 list-disc ml-[20px] md:ml-[27px] m-0 p-0">
            <li>Екатеринбург является важной точкой на маршруте транспортного коридора «Восток-Запад»</li>
            <li>Объект расположен в черте города в 15 км от центра Екатеринбурга</li>
            <li>Находится рядом с выездом на ЕКАД — кольцевую автодорогу, которую пересекают три федеральные и три областные трассы</li>
            <li>В 5 км от склада находится международный аэропорт, обслуживающий прямые рейсы в Китай</li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default LocationSection;
