import { Share2, Lock, Building2, Ruler, TrendingUp, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Стоимость объекта", value: "651 000 000 ₽", icon: DollarSign },
  { label: "Стоимость за м²", value: "47 000 ₽", icon: Building2 },
  { label: "Площадь", value: "13 850 м²", icon: Ruler },
  { label: "Доходность", value: "24,13%", icon: TrendingUp, locked: true },
];

const PropertyHero = () => {
  return (
    <section className="container py-6">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Каталог</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ЗПИФН «Пайстартер двадцать один»</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Badge variant="outline" className="ml-2 text-xs font-semibold">
          Рейтинг: A
        </Badge>
        <Button variant="ghost" size="sm" className="ml-auto gap-1.5 text-muted-foreground">
          <Share2 className="h-4 w-4" />
          Поделиться
        </Button>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl mb-8">
        Терминал Чкаловский, Екатеринбург
      </h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-secondary p-4 flex flex-col gap-1"
          >
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              {s.label}
              {s.locked && <Lock className="h-3 w-3" />}
            </span>
            <span className="text-lg font-bold">{s.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyHero;
