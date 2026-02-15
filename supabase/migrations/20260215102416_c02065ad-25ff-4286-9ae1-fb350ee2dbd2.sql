
-- Global site settings table (key-value with JSONB)
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read
CREATE POLICY "Anyone can read site_settings"
  ON public.site_settings FOR SELECT
  USING (true);

-- Admins can manage
CREATE POLICY "Admins can manage site_settings"
  ON public.site_settings FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Seed default FAQ items
INSERT INTO public.site_settings (key, value) VALUES
('faq_items', '[
  {"question": "Что вообще такое пай и зачем он мне?", "answer": "Пай — это доля в объекте недвижимости, который сдают в аренду. Вы получаете часть дохода от аренды, пропорционально своему вкладу."},
  {"question": "Как я буду получать доход?", "answer": "Доход выплачивается ежемесячно на ваш банковский счёт. Размер дохода зависит от арендных поступлений за период."},
  {"question": "Могу ли я вывести деньги досрочно?", "answer": "Паи можно продать на вторичном рынке через нашу платформу или через брокера."},
  {"question": "Какие риски есть у таких инвестиций?", "answer": "Как и любые инвестиции, паи несут риски: изменение рыночной стоимости недвижимости, риск невыплаты аренды, инфляционные риски."}
]'::jsonb),
('faq_settings', '{"title": "Вопросы и ответы", "description": "Разобраться в инвестициях можно без экономического образования. Ниже — ответы на вопросы, которые мы чаще всего получаем."}'::jsonb),
('contact_form', '{
  "title": "Остались вопросы? Напишите нам",
  "subtitle": "Вы также можете написать менеджеру в телеграм или на электронную почту",
  "telegram_url": "",
  "email": "hi@piestarter.ru",
  "fields": [
    {"name": "name", "label": "Как вас зовут?", "type": "text", "enabled": true},
    {"name": "email", "label": "Электронная почта", "type": "email", "enabled": true},
    {"name": "phone", "label": "Телефон", "type": "tel", "enabled": true},
    {"name": "message", "label": "Сообщение", "type": "textarea", "enabled": true}
  ]
}'::jsonb);
