import imageHub from "@/assets/image-hub.png";
import imageWarehouse from "@/assets/image-warehouse.png";
import bxsCopyAlt1 from "@/assets/bxs-copy-alt1.svg";

const LocationSection = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row gap-[20px] md:gap-[30px] items-start pb-[60px] md:pb-[120px]">
        {/* Map */}
        <div className="h-[240px] sm:h-[340px] md:h-[480px] overflow-hidden rounded-[20px] md:rounded-[40px] w-full md:flex-1 md:min-w-0 relative">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=60.752964,56.757702&z=15&l=map&pt=60.752964,56.757702,pm2blm&lang=ru_RU"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen={false}
            style={{ border: 0, borderRadius: 'inherit' }}
            title="Карта расположения объекта"
          />
          {/* Overlay to hide top search/traffic controls only */}
          <div className="absolute top-0 left-0 right-0 h-[48px] bg-card pointer-events-none z-10" style={{ borderRadius: 'inherit' }} />
        </div>
        {/* Location Details */}
        <div className="flex flex-col gap-[24px] md:gap-[36px] items-start w-full md:flex-1 md:min-w-0">
          <div className="flex flex-col gap-[12px]">
            <h2 className="font-semibold text-[32px] md:text-[48px] leading-[1.1] tracking-[-0.96px] text-azure-4 m-0">Расположение</h2>
            <button className="flex gap-[6px] items-center group hover:opacity-70 transition-opacity">
              <span className="font-normal text-[16px] md:text-[18px] text-grey-44">г. Екатеринбург, ул. Черняховского, 86к7</span>
              <img src={bxsCopyAlt1} alt="Копировать" className="w-[15px] h-[15px]" />
            </button>
          </div>
          <ul className="font-normal text-[16px] md:text-[18px] text-cyan-2 leading-[24px] space-y-3 md:space-y-4 list-disc ml-[20px] md:ml-[27px] m-0 p-0">
            <li>Екатеринбург является важной точкой на маршруте транспортного коридора «Восток-Запад»</li>
            <li>Объект расположен в черте города в 15 км от центра Екатеринбурга</li>
            <li>Находится рядом с выездом на ЕКАД — кольцевую автодорогу, которую пересекают три федеральные и три областные трассы</li>
            <li>В 5 км от склада находится международный аэропорт, обслуживающий прямые рейсы в Китай</li>
          </ul>
        </div>
      </section>

      {/* Advantages Cards */}
      <section className="flex flex-col md:flex-row gap-[16px] md:gap-[30px] items-stretch pb-[60px] md:pb-[120px]">
        <div className="bg-grey-96 flex flex-col gap-[20px] md:gap-[24px] items-start p-[24px] md:p-[36px] rounded-[24px] md:rounded-[40px] flex-1 min-w-0 hover:shadow-lg transition-shadow">
          <div className="flex flex-col gap-[12px]">
            <h3 className="font-semibold text-[22px] md:text-[30px] leading-[1.3] text-black m-0">Будущий транспортно-торговый хаб</h3>
            <p className="font-normal text-[16px] md:text-[18px] text-grey-44 leading-[24px] m-0">
              В 2027 планируется строительство транспортно-пересадочного узла, что значительно увеличит пешеходный и транспортный поток
            </p>
          </div>
          <div className="h-[200px] md:h-[300px] overflow-hidden rounded-[16px] md:rounded-[20px] w-full">
            <img src={imageHub} alt="Хаб" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="bg-grey-96 flex flex-col gap-[20px] md:gap-[24px] items-start justify-between p-[24px] md:p-[36px] rounded-[24px] md:rounded-[40px] flex-1 min-w-0 hover:shadow-lg transition-shadow">
          <div className="flex flex-col gap-[12px]">
            <h3 className="font-semibold text-[22px] md:text-[30px] leading-[1.3] text-black m-0">Стабильный спрос на складские площади</h3>
            <p className="font-normal text-[16px] md:text-[18px] text-grey-44 leading-[24px] m-0">
              Екатеринбургская агломерация традиционно испытывает высокий спрос на современные логистические объекты
            </p>
          </div>
          <div className="h-[200px] md:h-[300px] overflow-hidden rounded-[16px] md:rounded-[20px] w-full">
            <img src={imageWarehouse} alt="Склад" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationSection;
