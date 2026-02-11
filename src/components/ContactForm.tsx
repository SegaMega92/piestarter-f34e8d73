import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const ContactForm = () => {
  return (
    <section className="container py-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Остались вопросы? Напишите нам</h2>
        <p className="text-muted-foreground mb-8">
          Наши менеджеры ответят в течение рабочего дня
        </p>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" placeholder="Иван Иванов" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="ivan@mail.ru" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Сообщение</Label>
            <Textarea id="message" placeholder="Ваш вопрос..." rows={4} />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="consent" />
            <Label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
              Я согласен на обработку персональных данных в соответствии с политикой конфиденциальности
            </Label>
          </div>
          <Button type="submit" className="h-12 px-8 text-base font-semibold">
            Отправить сообщение
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
