import imageHub from "@/assets/image-hub.png";
import imageWarehouse from "@/assets/image-warehouse.png";

interface LocationAdvantagesProps {
  content?: Record<string, any>;
}

const LocationAdvantages = ({ content }: LocationAdvantagesProps) => {
  const card1Enabled = content?.card1_enabled !== false;
  const card2Enabled = content?.card2_enabled !== false;
  const card1Image = content?.card1_image || imageHub;
  const card2Image = content?.card2_image || imageWarehouse;
  const card1Title = content?.card1_title || "Будущий транспортно-торговый хаб";
  const card1Description = content?.card1_description || "В 2027 планируется строительство транспортно-пересадочного узла, что значительно увеличит пешеходный и транспортный поток";
  const card2Title = content?.card2_title || "Стабильный спрос на складские площади";
  const card2Description = content?.card2_description || "Екатеринбургская агломерация традиционно испытывает высокий спрос на современные логистические объекты";

  if (!card1Enabled && !card2Enabled) return null;

  return (
    <section className="flex flex-col md:flex-row gap-[16px] md:gap-[30px] items-stretch pb-[60px] md:pb-[120px]">
      {card1Enabled && (
        <div className="bg-grey-96 flex flex-col gap-[20px] md:gap-[24px] items-start p-[24px] md:p-[36px] rounded-[24px] md:rounded-[40px] flex-1 min-w-0 hover:shadow-lg transition-shadow">
          <div className="flex flex-col gap-[12px]">
            <h3 className="font-semibold text-[22px] md:text-[30px] leading-[1.3] text-black m-0">{card1Title}</h3>
            <p className="font-normal text-[16px] md:text-[18px] text-grey-44 leading-[24px] m-0">{card1Description}</p>
          </div>
          <div className="h-[200px] md:h-[300px] overflow-hidden rounded-[16px] md:rounded-[20px] w-full">
            <img src={card1Image} alt={card1Title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      {card2Enabled && (
        <div className="bg-grey-96 flex flex-col gap-[20px] md:gap-[24px] items-start justify-between p-[24px] md:p-[36px] rounded-[24px] md:rounded-[40px] flex-1 min-w-0 hover:shadow-lg transition-shadow">
          <div className="flex flex-col gap-[12px]">
            <h3 className="font-semibold text-[22px] md:text-[30px] leading-[1.3] text-black m-0">{card2Title}</h3>
            <p className="font-normal text-[16px] md:text-[18px] text-grey-44 leading-[24px] m-0">{card2Description}</p>
          </div>
          <div className="h-[200px] md:h-[300px] overflow-hidden rounded-[16px] md:rounded-[20px] w-full">
            <img src={card2Image} alt={card2Title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </section>
  );
};

export default LocationAdvantages;
