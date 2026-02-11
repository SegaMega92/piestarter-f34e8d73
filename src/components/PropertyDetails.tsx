import { Calendar, Briefcase, Download } from "lucide-react";

const PropertyDetails = () => {
  return (
    <section className="flex gap-[30px] items-start pt-[60px] pb-[120px] px-[70px] w-full">
      {/* Left: Description */}
      <div className="flex flex-col gap-[24px] items-start w-[828px]">
        <div className="flex flex-col gap-[12px] text-[18px] text-cyan-2">
          <h3 className="font-semibold leading-[24px] m-0">Характеристики</h3>
          <p className="font-medium leading-[24px] m-0">
            Находится в черте Екатеринбурга — города-миллионника и крупного логистического хаба, обслуживающего Урал, Западную Сибирь и Китай.
          </p>
          <p className="font-medium leading-[24px] m-0">
            Здание введено в эксплуатацию в 2015 г. Электрическая мощность — 380 кВт, высота потолка — 11 м, в зоне разгрузки — 29 доков.
          </p>
        </div>
        <div className="flex flex-col gap-[12px] text-[18px] text-cyan-2">
          <h3 className="font-semibold leading-[24px] m-0">Арендатор</h3>
          <p className="font-medium leading-[24px] m-0">
            С 2017 г. арендатором является федеральная компания «Деловые линии». Это один из ведущих транспортно-логистических операторов России. «Деловые линии» отправляют грузы в 66 стран мира. Данный склад стратегически важен для компании в связи с удачным расположением и подходящей инфраструктурой.
          </p>
        </div>
        {/* Feature Cards */}
        <div className="flex gap-[24px] w-full">
          <div className="border border-grey-71 flex flex-1 gap-[11px] items-start p-[12px] rounded-[20px]">
            <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center">
              <Calendar className="w-[24px] h-[27px] text-cyan-2" />
            </div>
            <p className="font-medium text-[18px] text-cyan-2 leading-[24px] m-0">
              Ежемесячные выплаты дохода<br />на счет в вашем банке
            </p>
          </div>
          <div className="border border-grey-71 flex flex-1 gap-[11px] items-start p-[12px] rounded-[20px]">
            <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center">
              <Briefcase className="w-[27px] h-[27px] text-cyan-2" />
            </div>
            <p className="font-medium text-[18px] text-cyan-2 leading-[24px] m-0">
              Доступно для неквалифицированных<br />инвесторов
            </p>
          </div>
        </div>
      </div>
      {/* Right: Price Card */}
      <div
        className="flex flex-col gap-[12px] items-center px-[20px] py-[24px] rounded-[40px] w-[427px]"
        style={{
          background: "linear-gradient(90deg, rgba(254,255,255,0.5), rgba(254,255,255,0.5)), linear-gradient(90deg, #abe4f5, #abe4f5)",
        }}
      >
        <div className="bg-white/50 flex flex-col gap-[4px] items-center py-[12px] rounded-[20px] w-full text-cyan-2">
          <span className="font-semibold text-[14px] leading-[18px]">Цена за 1 пай</span>
          <span className="font-semibold text-[36px] leading-[1.1] tracking-[-1px]">120 364₽</span>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center gap-[6px] px-[30px] py-[18px] rounded-[30px] cursor-pointer">
            <span className="font-semibold text-[18px] text-cyan-2">Презентация</span>
            <Download className="w-[16px] h-[18px] text-cyan-2" />
          </div>
          <div className="bg-azure-13 flex items-center justify-center px-[30px] py-[18px] rounded-[30px] w-full cursor-pointer">
            <span className="font-semibold text-[18px] text-white">Купить паи</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
