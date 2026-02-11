import { Copy } from "lucide-react";
import imageMap from "@/assets/image-map.png";
import imageHub from "@/assets/image-hub.png";
import imageWarehouse from "@/assets/image-warehouse.png";
import bxsCopyAlt1 from "@/assets/bxs-copy-alt1.svg";

const LocationSection = () => {
  return (
    <>
      <section className="flex gap-[30px] items-start pb-[120px] px-[70px]">
        {/* Map */}
        <div className="h-[480px] overflow-hidden rounded-[40px] w-[625px] shrink-0">
          <img src={imageMap} alt="Карта" className="w-full h-full object-cover" />
        </div>
        {/* Location Details */}
        <div className="flex flex-col gap-[36px] items-start w-[625px]">
          <div className="flex flex-col gap-[12px]">
            <h2 className="font-semibold text-[48px] leading-[1.1] tracking-[-0.96px] text-azure-4 m-0">Расположение</h2>
            <div className="flex gap-[6px] items-center">
              <span className="font-medium text-[18px] text-grey-44">г. Екатеринбург, ул. Черняховского, 86к7</span>
              <img src={bxsCopyAlt1} alt="Копировать" className="w-[15px] h-[15px] cursor-pointer" />
            </div>
          </div>
          <ul className="font-medium text-[18px] text-cyan-2 leading-[24px] space-y-4 list-disc ml-[27px] m-0 p-0">
            <li>Екатеринбург является важной точкой на маршруте транспортного коридора «Восток-Запад»</li>
            <li>Объект расположен в черте города в 15 км от центра Екатеринбурга</li>
            <li>Находится рядом с выездом на ЕКАД — кольцевую автодорогу, которую пересекают три федеральные и три областные трассы</li>
            <li>В 5 км от склада находится международный аэропорт, обслуживающий прямые рейсы в Китай</li>
          </ul>
        </div>
      </section>

      {/* Advantages Cards */}
      <section className="flex gap-[30px] items-stretch pb-[120px] px-[70px]">
        <div className="bg-grey-96 flex flex-col gap-[24px] items-start p-[36px] rounded-[40px] w-[625px]">
          <div className="flex flex-col gap-[12px]">
            <h3 className="font-semibold text-[30px] leading-[39px] text-black m-0 w-[400px]">Будущий транспортно-торговый хаб</h3>
            <p className="font-medium text-[18px] text-grey-44 leading-[24px] m-0">
              В 2027 планируется строительство транспортно-пересадочного узла, что значительно увеличит пешеходный и транспортный поток
            </p>
          </div>
          <div className="h-[300px] overflow-hidden rounded-[20px] w-full">
            <img src={imageHub} alt="Хаб" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="bg-grey-96 flex flex-col gap-[24px] items-start justify-between p-[36px] rounded-[40px] w-[625px]">
          <div className="flex flex-col gap-[12px]">
            <h3 className="font-semibold text-[30px] leading-[39px] text-black m-0 w-[400px]">Стабильный спрос на складские площади</h3>
            <p className="font-medium text-[18px] text-grey-44 leading-[24px] m-0">
              Екатеринбургская агломерация традиционно испытывает высокий спрос на современные логистические объекты
            </p>
          </div>
          <div className="h-[300px] overflow-hidden rounded-[20px] w-full">
            <img src={imageWarehouse} alt="Склад" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationSection;
