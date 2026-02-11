import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Что такое пай и как он работает?",
    a: "Пай — это ценная бумага, удостоверяющая долю владельца в имуществе фонда. Покупая пай, вы становитесь совладельцем недвижимости и получаете доход от аренды пропорционально количеству паёв.",
  },
  {
    q: "Какие риски связаны с инвестициями в паи?",
    a: "Как и любые инвестиции, паи несут риски: изменение рыночной стоимости недвижимости, риск невыплаты аренды, инфляционные риски. Однако диверсификация по объектам и профессиональное управление снижают эти риски.",
  },
  {
    q: "Как получать доход от паёв?",
    a: "Доход выплачивается ежеквартально на ваш банковский счёт. Размер дохода зависит от арендных поступлений за период. Историю выплат можно посмотреть в личном кабинете.",
  },
  {
    q: "Как продать паи?",
    a: "Паи можно продать на вторичном рынке через нашу платформу или через брокера. Также возможен выкуп паёв управляющей компанией по текущей стоимости.",
  },
];

const FAQSection = () => {
  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold mb-8">Вопросы и ответы</h2>
      <div className="max-w-3xl">
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left gap-4">
                <span className="text-muted-foreground font-mono text-sm mr-3 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pl-10 text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
