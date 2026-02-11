import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, Coins } from "lucide-react";

const properties = [
  {
    title: "Склад «Южный»",
    city: "Краснодар",
    rating: "A+",
    area: "8 200 м²",
    term: "5 лет",
    price: "320 000 000 ₽",
    shares: "2 660",
    yield: "22,5%",
    isin: "RU000A106K43",
  },
  {
    title: "ТЦ «Меридиан»",
    city: "Новосибирск",
    rating: "A",
    area: "15 400 м²",
    term: "7 лет",
    price: "890 000 000 ₽",
    shares: "7 400",
    yield: "19,8%",
    isin: "RU000A107B21",
  },
  {
    title: "Офис-центр «Высота»",
    city: "Казань",
    rating: "B+",
    area: "6 100 м²",
    term: "4 года",
    price: "245 000 000 ₽",
    shares: "2 040",
    yield: "26,1%",
    isin: "RU000A108C55",
  },
];

const SimilarProperties = () => {
  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold mb-8">Похожие объекты</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {properties.map((p) => (
          <div
            key={p.isin}
            className="rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          >
            {/* Image placeholder */}
            <div className="relative h-48 bg-muted flex items-center justify-center">
              <Building2 className="h-10 w-10 text-muted-foreground" />
              <Badge className="absolute top-3 left-3 bg-foreground text-background font-bold">
                {p.rating}
              </Badge>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <h3 className="font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.city}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  {p.area}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {p.term}
                </div>
              </div>

              <div className="pt-2 border-t space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Стоимость</span>
                  <span className="font-semibold">{p.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Паёв</span>
                  <span className="font-medium">{p.shares}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доходность</span>
                  <span className="font-bold text-primary">{p.yield}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground pt-1">ISIN: {p.isin}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProperties;
