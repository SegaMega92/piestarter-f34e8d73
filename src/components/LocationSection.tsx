import { MapPin, Train, Truck, Building2, TrendingUp } from "lucide-react";

const locationFeatures = [
  { icon: Train, text: "5 км до ж/д станции Кольцово" },
  { icon: Truck, text: "Прямой выезд на ЕКАД" },
  { icon: Building2, text: "Промышленная зона с развитой инфраструктурой" },
  { icon: MapPin, text: "12 км от центра Екатеринбурга" },
];

const infoBlocks = [
  {
    title: "Будущий транспортно-торговый хаб",
    desc: "Район активно развивается как логистический центр Урала. Планируется строительство нового транспортного узла, что повысит привлекательность объекта.",
    icon: TrendingUp,
  },
  {
    title: "Стабильный спрос на складские площади",
    desc: "Дефицит качественных складских площадей класса А в Екатеринбурге составляет более 200 000 м², что обеспечивает высокую заполняемость.",
    icon: Building2,
  },
];

const LocationSection = () => {
  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold mb-8">Расположение</h2>

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* Map placeholder */}
        <div className="rounded-2xl bg-muted h-[340px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-10 w-10 mx-auto mb-2" />
            <p className="text-sm">Карта</p>
            <p className="text-xs mt-1">Екатеринбург, ул. Чкалова, 2А</p>
          </div>
        </div>

        {/* Location info */}
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-1">Адрес</h3>
            <p className="text-muted-foreground">
              620901, Свердловская обл., г. Екатеринбург, ул. Чкалова, 2А
            </p>
          </div>
          <div className="space-y-3">
            {locationFeatures.map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info blocks */}
      <div className="grid gap-6 mt-10 md:grid-cols-2">
        {infoBlocks.map((b) => (
          <div key={b.title} className="rounded-2xl bg-secondary p-6 flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <b.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold mb-1">{b.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LocationSection;
