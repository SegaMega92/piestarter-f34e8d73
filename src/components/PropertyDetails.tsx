import { Building, ShieldCheck, TrendingUp, Users, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const advantages = [
  { icon: ShieldCheck, title: "Надёжный арендатор", desc: "Федеральная логистическая компания с долгосрочным контрактом" },
  { icon: TrendingUp, title: "Высокая доходность", desc: "Ежеквартальные выплаты с доходностью выше рынка" },
  { icon: Building, title: "Качественный актив", desc: "Современный складской комплекс класса А" },
  { icon: Users, title: "Профессиональное управление", desc: "Объектом управляет лицензированная УК" },
];

const PropertyDetails = () => {
  return (
    <section className="container pb-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left: Description */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Об объекте</h2>
            <p className="text-muted-foreground leading-relaxed">
              Терминал Чкаловский — современный логистический комплекс площадью 13 850 м², 
              расположенный в промышленной зоне Екатеринбурга. Объект введён в эксплуатацию в 2021 году 
              и полностью сдан в аренду крупной федеральной логистической компании. 
              Договор аренды заключён на 7 лет с ежегодной индексацией арендной ставки.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Арендатор
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              ООО «ЛогистикПро» — федеральный оператор складской логистики, входит в ТОП-20 
              логистических компаний России. Выручка за 2024 год — более 12 млрд ₽. 
              Рейтинг кредитоспособности — A (стабильный).
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-bold mb-4">Преимущества объекта</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {advantages.map((a) => (
                <div key={a.title} className="flex gap-3 rounded-xl bg-secondary p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <a.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sticky panel */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border bg-card p-6 space-y-5 shadow-lg">
            <div>
              <span className="text-sm text-muted-foreground">Стоимость 1 пая</span>
              <p className="text-3xl font-extrabold mt-1">120 364 ₽</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Паёв в обращении</span>
                <span className="font-medium">5 408</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Мин. инвестиция</span>
                <span className="font-medium">120 364 ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Выплаты</span>
                <span className="font-medium">Ежеквартально</span>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <Button className="w-full h-12 text-base font-semibold">
                Купить пай
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <FileText className="h-4 w-4" />
                Презентация
              </Button>
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-secondary p-3">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <p className="text-xs text-muted-foreground">
                Покупка паёв доступна для квалифицированных инвесторов. Подробности — в презентации.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
