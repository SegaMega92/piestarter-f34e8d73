import { useState } from "react";
import calendarAlt from "@/assets/calendar-alt.svg";
import briefcase from "@/assets/briefcase.svg";
import fileDownload from "@/assets/file-download.svg";
import priceBg from "@/assets/price-bg.svg";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface PropertyDetailsProps {
  content?: Record<string, any>;
}

const PropertyDetails = ({ content }: PropertyDetailsProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const price = content?.price || "120 364₽";
  const presentationUrl = content?.presentation_url || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Необходимо согласие на обработку данных");
      return;
    }
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error("Заполните все поля");
      return;
    }
    setSubmitting(true);
    // For now just show success
    setTimeout(() => {
      toast.success("Заявка отправлена!");
      setDrawerOpen(false);
      setForm({ name: "", phone: "", email: "" });
      setAgreed(false);
      setSubmitting(false);
    }, 500);
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row gap-[24px] lg:gap-[30px] items-start pt-[40px] md:pt-[60px] pb-[60px] md:pb-[120px] w-full">
        {/* Left: Description */}
        <div className="flex flex-col gap-[24px] items-start flex-1 min-w-0 order-2 lg:order-1">
          <div className="flex flex-col gap-[12px] text-[16px] md:text-[18px] text-cyan-2">
            <h3 className="font-semibold leading-[24px] m-0">Характеристики</h3>
            <p className="font-normal leading-[24px] m-0">
              Находится в черте Екатеринбурга — города-миллионника и крупного логистического хаба, обслуживающего Урал, Западную Сибирь и Китай.
            </p>
            <p className="font-normal leading-[24px] m-0">
              Здание введено в эксплуатацию в 2015 г. Электрическая мощность — 380 кВт, высота потолка — 11 м, в зоне разгрузки — 29 доков.
            </p>
          </div>
          <div className="flex flex-col gap-[12px] text-[16px] md:text-[18px] text-cyan-2">
            <h3 className="font-semibold leading-[24px] m-0">Арендатор</h3>
            <p className="font-normal leading-[24px] m-0">
              С 2017 г. арендатором является федеральная компания «Деловые линии». Это один из ведущих транспортно-логистических операторов России. «Деловые линии» отправляют грузы в 66 стран мира. Данный склад стратегически важен для компании в связи с удачным расположением и подходящей инфраструктурой.
            </p>
          </div>
          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] md:gap-[24px] w-full">
            <div className="border border-grey-71 flex flex-1 gap-[11px] items-start p-[12px] rounded-[20px] hover:border-cyan-2 hover:shadow-sm transition-all cursor-default">
              <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center">
                <img src={calendarAlt} alt="" className="w-[24px] h-[27px]" />
              </div>
              <p className="font-normal text-[14px] md:text-[16px] text-cyan-2 leading-[20px] m-0">
                Ежемесячные выплаты дохода на счет в вашем банке
              </p>
            </div>
            <div className="border border-grey-71 flex flex-1 gap-[11px] items-start p-[12px] rounded-[20px] hover:border-cyan-2 hover:shadow-sm transition-all cursor-default">
              <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center">
                <img src={briefcase} alt="" className="w-[27px] h-[27px]" />
              </div>
              <p className="font-normal text-[14px] md:text-[16px] text-cyan-2 leading-[20px] m-0">
                Доступно для неквалифицированных инвесторов
              </p>
            </div>
          </div>
        </div>
        {/* Right: Price Card */}
        <div
          className="flex flex-col gap-[12px] items-center px-[16px] md:px-[20px] py-[20px] md:py-[24px] rounded-[30px] md:rounded-[40px] w-full lg:w-[380px] shrink-0 lg:sticky lg:top-[120px] order-1 lg:order-2"
          style={{
            backgroundImage: `url(${priceBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white/50 flex flex-col gap-[4px] items-center py-[12px] rounded-[20px] w-full text-cyan-2">
            <span className="font-semibold text-[14px] leading-[18px]">Цена за 1 пай</span>
            <span className="font-semibold text-[30px] md:text-[36px] leading-[1.1] tracking-[-1px]">{price}</span>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            {presentationUrl ? (
              <a
                href={presentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-[6px] px-[30px] py-[14px] md:py-[18px] rounded-[30px] cursor-pointer hover:bg-white/40 transition-colors no-underline"
              >
                <span className="font-semibold text-[16px] md:text-[18px] text-cyan-2">Презентация</span>
                <img src={fileDownload} alt="" className="w-[14px] h-[18px]" />
              </a>
            ) : (
              <button className="flex items-center justify-center gap-[6px] px-[30px] py-[14px] md:py-[18px] rounded-[30px] cursor-pointer hover:bg-white/40 transition-colors">
                <span className="font-semibold text-[16px] md:text-[18px] text-cyan-2">Презентация</span>
                <img src={fileDownload} alt="" className="w-[14px] h-[18px]" />
              </button>
            )}
            <button
              onClick={() => setDrawerOpen(true)}
              className="bg-azure-13 flex items-center justify-center px-[30px] py-[14px] md:py-[18px] rounded-[30px] w-full cursor-pointer hover:bg-[#2a3040] active:scale-[0.98] transition-all"
            >
              <span className="font-semibold text-[16px] md:text-[18px] text-white">Купить паи</span>
            </button>
          </div>
        </div>
      </section>

      {/* Buy drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[420px]">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold">Оставить заявку</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
            <div className="space-y-2">
              <Label htmlFor="buy-name">Имя</Label>
              <Input
                id="buy-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ваше имя"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buy-phone">Телефон</Label>
              <Input
                id="buy-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+7 (___) ___-__-__"
                maxLength={20}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buy-email">Почта</Label>
              <Input
                id="buy-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
                maxLength={255}
              />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="buy-agree"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="mt-0.5"
              />
              <Label htmlFor="buy-agree" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                Согласен на обработку персональных данных
              </Label>
            </div>
            <Button type="submit" disabled={submitting} className="w-full rounded-full py-5">
              {submitting ? "Отправка..." : "Отправить"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PropertyDetails;
