import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Plus, Trash2, GripVertical, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ImageUploader from "@/components/admin/ImageUploader";

// Default data for each section
const defaultHero = { title: "Коллективные инвестиции в\u00a0коммерческую недвижимость", enabled: true };

const defaultCategories = {
  enabled: true,
  items: [
    { id: "all", label: "Все объекты", icon: "◼︎" },
    { id: "malls", label: "Торговые центры", icon: "🏪" },
    { id: "hotels", label: "Отели", icon: "🏨" },
    { id: "supermarkets", label: "Супермаркеты", icon: "🛒" },
    { id: "apartments", label: "Квартиры", icon: "🏢" },
  ],
};

const defaultFeatured = {
  enabled: true,
  sectionTitle: "«Пайстартер Флиппинг» Москва",
  linkText: "Смотреть все →",
  image: "",
  overlayTitle: "ЗПИФН «Активо Флиппинг»",
  rating: "A",
  stats: [
    { label: "Стоимость", value: "1 531 529 489₽" },
    { label: "Количество паев", value: "8 459" },
    { label: "Общая доходность", value: "25%" },
    { label: "Среднегодовая доходность", value: "9,25%" },
  ],
  buttonText: "Подробнее",
  buttonLink: "/objects/activo-flipping",
  description: "Первый в России ЗПИФН по флиппингу квартир премиум-класса. Вторичный оборот паев будет организован на Московской Бирже.",
};

const defaultProperties = {
  enabled: true,
  items: [
    { title: "ТЦ «Зеленый берег»", city: "Тюмень", area: "19 560 м²", term: "2 года 1 мес", price: "1 126 959 346 ₽", shares: "200", yield: "25,9%", rating: "A+", image: "", slug: "tc-zeleniy-bereg" },
    { title: "Пай девятнадцать", city: "Ульяновск", area: "18 226 м²", term: "3 года 2 мес", price: "1 531 529 489 ₽", shares: "500", yield: "25,9%", rating: "B+", image: "", slug: "pai-19" },
    { title: "ТРК «Малина»", city: "Рязань", area: "27 184 м²", term: "2 года 10 мес", price: "840 376 659 ₽", shares: "500", yield: "37.1%", rating: "B+", image: "", slug: "trk-malina" },
  ],
};

const defaultPropertiesSecond = {
  enabled: true,
  items: [
    { title: "БЦ «Москва-Сити»", city: "Москва", area: "45 000 м²", term: "5 лет", price: "2 500 000 000 ₽", shares: "1000", yield: "18,5%", rating: "A", image: "", slug: "bc-moscow-city" },
    { title: "Склад «Логистика+»", city: "Екатеринбург", area: "32 000 м²", term: "4 года", price: "980 000 000 ₽", shares: "400", yield: "22,3%", rating: "A-", image: "", slug: "sklad-logistika" },
    { title: "ТЦ «Галерея»", city: "Казань", area: "28 500 м²", term: "3 года 6 мес", price: "1 200 000 000 ₽", shares: "600", yield: "24,8%", rating: "B+", image: "", slug: "tc-galereya" },
  ],
};

const defaultTelegram = {
  enabled: true,
  label: "Телеграм-канал",
  title: "Рассказываем о\u00a0новых объектах каждую неделю",
  buttonText: "Перейти в телеграм",
  buttonLink: "https://t.me/piestarer",
  cards: [
    { image: "", tag: "Обзор", title: "ЗПИФ «ЖК Симфония 34» (Symphony): обзор фонда недвижимости, доходность, стоимость пая и СЧА", date: "9 октября 2025" },
    { image: "", tag: "Обзор", title: "ЗПИФ «Альфа. Промышленные парки-2» от Альфа-Капитал: обзор фонда недвижимости от Альфа-Банка", date: "1 октября 2025" },
  ],
};

const defaultHowItWorks = {
  enabled: true,
  title: "Всё просто.\nС первого шага",
  image: "",
  steps: [
    { number: ".1", title: "Выберите сумму", description: "Укажите, сколько готовы инвестировать. Минимальная сумма: от 100 000 ₽. Можно выбрать из готовых вариантов с предварительным расчетом." },
    { number: ".2", title: "Подтвердите расчёт", description: "Проверьте расчёт доходности и условия. Убедитесь, что всё понятно, и подтвердите выбор." },
    { number: ".3", title: "Пройдите верификацию", description: "Загрузите документы для проверки. Процесс занимает несколько минут и полностью онлайн." },
    { number: ".4", title: "Получайте доход", description: "После покупки пая вы начнёте получать доход от аренды объекта. Выплаты приходят ежеквартально." },
  ],
};

const defaultMap = {
  enabled: true,
  title: "Инвестиционная температура",
  description: "Карта показывает, где растёт цена на коммерческую недвижимость — и куда уже сейчас стоит присмотреться. Точками отмечены объекты, в которых можно приобрести паи.",
};

const defaultNews = {
  enabled: true,
  items: [
    { tag: "Рост спроса", title: "В Рязани растет спрос на коммерческую недвижимость", description: "Спрос поддерживают промышленные проекты и логистика, цены растут умеренно, аренда оживает последовательно каждый квартал.", date: "12 октября" },
    { tag: "Рост спроса", title: "В Ульяновске открылось три новых торговых центра", description: "Цены ниже соседей по Поволжью, корпоративный спрос поддерживает аренду и ликвидность, сейчас устойчиво.", date: "9 октября" },
    { tag: "Замедление", title: "Казань: аккуратно с новостройками", description: "Сильный фундаментальный спрос, но пик цен по ряду проектов уже пройден", date: "1 октября" },
  ],
};

const defaultBlog = {
  enabled: true,
  title: "События и\u00a0аналитика",
  description: "Свежие материалы из нашего Telegram-канала. Делимся новостями, аналитикой и тем, что влияет на рынок и решения инвесторов.",
  posts: [
    { image: "", category: "Недвижимость", title: "Нехватка офисов: спрос растёт быстрее, чем предложение", date: "12 Октября" },
    { image: "", category: "Аналитика", title: "Где «выстрелит» коммерческая недвижимость: регионы на старте роста", date: "9 Октября" },
    { image: "", category: "Инвестиции", title: "Что будет с доходностью ЗПИФов в 2026 году", date: "12 Октября" },
  ],
};

const defaultTestimonials = {
  enabled: true,
  title: "Ключевые люди индустрии\u00a0— о\u00a0нас",
  items: [
    { quote: "Пайстартер помог мне диверсифицировать портфель без необходимости вникать в тонкости управления недвижимостью.", name: "Алексей Петров", role: "Управляющий партнер инвестиционной компании", avatar: "" },
    { quote: "Как эксперт по ЗПИФам, могу сказать: платформа соответствует лучшим практикам рынка.", name: "Мария Иванова", role: "Эксперт по работе с ЗПИФами", avatar: "" },
    { quote: "Рынок коммерческой недвижимости сейчас на подъёме. Пайстартер даёт доступ к объектам, которые раньше были закрыты для частных инвесторов.", name: "Дмитрий Сидоров", role: "Аналитик рынка недвижимости", avatar: "" },
    { quote: "Мы работаем с Пайстартер как партнёры. Профессиональный подход к отбору объектов и чёткое понимание потребностей инвесторов.", name: "Елена Козлова", role: "Руководитель проектов в девелоперской компании", avatar: "" },
  ],
};

// Section wrapper component
const Section = ({
  title,
  children,
  enabled,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  enabled?: boolean;
  onToggle?: (v: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className={`border rounded-lg transition-colors ${enabled === false ? "opacity-60" : ""}`}>
        <div className="flex items-center gap-2 px-4 py-3">
          {onToggle !== undefined && (
            <Switch
              checked={enabled !== false}
              onCheckedChange={onToggle}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <CollapsibleTrigger className="flex-1 flex items-center justify-between text-left">
            <span className="font-semibold text-sm">{title}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="px-4 pb-4 pt-1 border-t space-y-4">
          {children}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

// Draggable list item
const DragItem = ({ index, children, onDragStart, onDragOver, onDragEnd, draggedIdx, onRemove }: any) => (
  <div
    draggable
    onDragStart={() => onDragStart(index)}
    onDragOver={(e: React.DragEvent) => { e.preventDefault(); onDragOver(index); }}
    onDragEnd={onDragEnd}
    className={`border rounded-lg p-3 space-y-2 transition-colors ${draggedIdx === index ? "border-primary" : "border-border"}`}
  >
    <div className="flex items-center gap-2">
      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
      <span className="text-xs text-muted-foreground font-medium">#{index + 1}</span>
      <Button variant="ghost" size="icon" className="ml-auto h-7 w-7" onClick={() => onRemove(index)}>
        <Trash2 className="h-3.5 w-3.5 text-destructive" />
      </Button>
    </div>
    {children}
  </div>
);

const useDrag = (items: any[], setItems: (items: any[]) => void) => {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const onDragStart = (idx: number) => setDraggedIdx(idx);
  const onDragOver = (idx: number) => {
    if (draggedIdx === null || draggedIdx === idx) return;
    const updated = [...items];
    const [moved] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, moved);
    setItems(updated);
    setDraggedIdx(idx);
  };
  const onDragEnd = () => setDraggedIdx(null);
  return { draggedIdx, onDragStart, onDragOver, onDragEnd };
};

const AdminHomePage = () => {
  const [saving, setSaving] = useState(false);
  const [hero, setHero] = useState(defaultHero);
  const [categories, setCategories] = useState(defaultCategories);
  const [featured, setFeatured] = useState(defaultFeatured);
  const [propertiesFirst, setPropertiesFirst] = useState(defaultProperties);
  const [propertiesSecond, setPropertiesSecond] = useState(defaultPropertiesSecond);
  const [telegram, setTelegram] = useState(defaultTelegram);
  const [howItWorks, setHowItWorks] = useState(defaultHowItWorks);
  const [map, setMap] = useState(defaultMap);
  const [news, setNews] = useState(defaultNews);
  const [blog, setBlog] = useState(defaultBlog);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  // Drag hooks for lists
  const catDrag = useDrag(categories.items, (items) => setCategories({ ...categories, items }));
  const featStatsDrag = useDrag(featured.stats, (stats) => setFeatured({ ...featured, stats }));
  const prop1Drag = useDrag(propertiesFirst.items, (items) => setPropertiesFirst({ ...propertiesFirst, items }));
  const prop2Drag = useDrag(propertiesSecond.items, (items) => setPropertiesSecond({ ...propertiesSecond, items }));
  const telCardsDrag = useDrag(telegram.cards, (cards) => setTelegram({ ...telegram, cards }));
  const stepsDrag = useDrag(howItWorks.steps, (steps) => setHowItWorks({ ...howItWorks, steps }));
  const newsDrag = useDrag(news.items, (items) => setNews({ ...news, items }));
  const blogDrag = useDrag(blog.posts, (posts) => setBlog({ ...blog, posts }));
  const testDrag = useDrag(testimonials.items, (items) => setTestimonials({ ...testimonials, items }));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data } = await supabase.from("site_settings").select("*").like("key", "home_%");
    if (!data) return;
    const get = (key: string) => data.find((r) => r.key === key)?.value as any;
    if (get("home_hero")) setHero(get("home_hero"));
    if (get("home_categories")) setCategories(get("home_categories"));
    if (get("home_featured")) setFeatured(get("home_featured"));
    if (get("home_properties_first")) setPropertiesFirst(get("home_properties_first"));
    if (get("home_properties_second")) setPropertiesSecond(get("home_properties_second"));
    if (get("home_telegram")) setTelegram(get("home_telegram"));
    if (get("home_how_it_works")) setHowItWorks(get("home_how_it_works"));
    if (get("home_map")) setMap(get("home_map"));
    if (get("home_news")) setNews(get("home_news"));
    if (get("home_blog")) setBlog(get("home_blog"));
    if (get("home_testimonials")) setTestimonials(get("home_testimonials"));
  };

  const save = async () => {
    setSaving(true);
    const entries: Record<string, any> = {
      home_hero: hero,
      home_categories: categories,
      home_featured: featured,
      home_properties_first: propertiesFirst,
      home_properties_second: propertiesSecond,
      home_telegram: telegram,
      home_how_it_works: howItWorks,
      home_map: map,
      home_news: news,
      home_blog: blog,
      home_testimonials: testimonials,
    };
    const promises = Object.entries(entries).map(([key, value]) =>
      supabase.from("site_settings").upsert(
        { key, value: value as any, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      )
    );
    await Promise.all(promises);
    setSaving(false);
    toast.success("Главная страница сохранена");
  };

  // Helper to update array item
  const updateArrayItem = <T extends Record<string, any>>(arr: T[], idx: number, field: string, value: any): T[] =>
    arr.map((item, i) => (i === idx ? { ...item, [field]: value } : item));

  return (
    <div className="space-y-4 max-w-3xl mx-auto pb-20">
      <h1 className="text-2xl font-bold text-foreground">Главная страница</h1>

      {/* Hero */}
      <Section title="🏠 Hero — Заголовок" enabled={hero.enabled !== false} onToggle={(v) => setHero({ ...hero, enabled: v })}>
        <div className="space-y-1">
          <Label className="text-xs">Заголовок</Label>
          <Textarea value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} rows={2} />
        </div>
      </Section>

      {/* Categories */}
      <Section title="📂 Категории" enabled={categories.enabled !== false} onToggle={(v) => setCategories({ ...categories, enabled: v })}>
        {categories.items.map((cat, idx) => (
          <DragItem key={idx} index={idx} {...catDrag} onRemove={(i: number) => setCategories({ ...categories, items: categories.items.filter((_, j) => j !== i) })}>
            <div className="grid grid-cols-3 gap-2">
              <div><Label className="text-xs">ID</Label><Input value={cat.id} onChange={(e) => setCategories({ ...categories, items: updateArrayItem(categories.items, idx, "id", e.target.value) })} /></div>
              <div><Label className="text-xs">Название</Label><Input value={cat.label} onChange={(e) => setCategories({ ...categories, items: updateArrayItem(categories.items, idx, "label", e.target.value) })} /></div>
              <div><Label className="text-xs">Иконка</Label><Input value={cat.icon} onChange={(e) => setCategories({ ...categories, items: updateArrayItem(categories.items, idx, "icon", e.target.value) })} /></div>
            </div>
          </DragItem>
        ))}
        <Button variant="outline" size="sm" onClick={() => setCategories({ ...categories, items: [...categories.items, { id: "", label: "", icon: "" }] })}>
          <Plus className="h-4 w-4 mr-1" /> Добавить
        </Button>
      </Section>

      {/* Featured Property */}
      <Section title="⭐ Избранный объект" enabled={featured.enabled !== false} onToggle={(v) => setFeatured({ ...featured, enabled: v })}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><Label className="text-xs">Заголовок секции</Label><Input value={featured.sectionTitle} onChange={(e) => setFeatured({ ...featured, sectionTitle: e.target.value })} /></div>
          <div><Label className="text-xs">Текст ссылки</Label><Input value={featured.linkText} onChange={(e) => setFeatured({ ...featured, linkText: e.target.value })} /></div>
          <div><Label className="text-xs">Рейтинг</Label><Input value={featured.rating} onChange={(e) => setFeatured({ ...featured, rating: e.target.value })} /></div>
          <div className="col-span-2"><Label className="text-xs">Заголовок на изображении</Label><Input value={featured.overlayTitle} onChange={(e) => setFeatured({ ...featured, overlayTitle: e.target.value })} /></div>
          <div className="col-span-2"><Label className="text-xs">Изображение</Label><ImageUploader value={featured.image} onChange={(url) => setFeatured({ ...featured, image: url })} bucket="page-images" /></div>
          <div><Label className="text-xs">Текст кнопки</Label><Input value={featured.buttonText} onChange={(e) => setFeatured({ ...featured, buttonText: e.target.value })} /></div>
          <div><Label className="text-xs">Ссылка кнопки</Label><Input value={featured.buttonLink} onChange={(e) => setFeatured({ ...featured, buttonLink: e.target.value })} /></div>
          <div className="col-span-2"><Label className="text-xs">Описание</Label><Textarea value={featured.description} onChange={(e) => setFeatured({ ...featured, description: e.target.value })} rows={2} /></div>
        </div>
        <p className="text-xs text-muted-foreground font-medium mt-3">Статистика</p>
        {featured.stats.map((stat, idx) => (
          <DragItem key={idx} index={idx} {...featStatsDrag} onRemove={(i: number) => setFeatured({ ...featured, stats: featured.stats.filter((_, j) => j !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <div><Label className="text-xs">Название</Label><Input value={stat.label} onChange={(e) => setFeatured({ ...featured, stats: updateArrayItem(featured.stats, idx, "label", e.target.value) })} /></div>
              <div><Label className="text-xs">Значение</Label><Input value={stat.value} onChange={(e) => setFeatured({ ...featured, stats: updateArrayItem(featured.stats, idx, "value", e.target.value) })} /></div>
            </div>
          </DragItem>
        ))}
        <Button variant="outline" size="sm" onClick={() => setFeatured({ ...featured, stats: [...featured.stats, { label: "", value: "" }] })}>
          <Plus className="h-4 w-4 mr-1" /> Добавить стат
        </Button>
      </Section>

      {/* Properties Grid 1 */}
      <Section title="🏢 Карточки объектов (блок 1)" enabled={propertiesFirst.enabled !== false} onToggle={(v) => setPropertiesFirst({ ...propertiesFirst, enabled: v })}>
        {propertiesFirst.items.map((prop, idx) => (
          <DragItem key={idx} index={idx} {...prop1Drag} onRemove={(i: number) => setPropertiesFirst({ ...propertiesFirst, items: propertiesFirst.items.filter((_, j) => j !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <div><Label className="text-xs">Название</Label><Input value={prop.title} onChange={(e) => setPropertiesFirst({ ...propertiesFirst, items: updateArrayItem(propertiesFirst.items, idx, "title", e.target.value) })} /></div>
              <div><Label className="text-xs">Город</Label><Input value={prop.city} onChange={(e) => setPropertiesFirst({ ...propertiesFirst, items: updateArrayItem(propertiesFirst.items, idx, "city", e.target.value) })} /></div>
              <div><Label className="text-xs">Площадь</Label><Input value={prop.area} onChange={(e) => setPropertiesFirst({ ...propertiesFirst, items: updateArrayItem(propertiesFirst.items, idx, "area", e.target.value) })} /></div>
              <div><Label className="text-xs">Срок</Label><Input value={prop.term} onChange={(e) => setPropertiesFirst({ ...propertiesFirst, items: updateArrayItem(propertiesFirst.items, idx, "term", e.target.value) })} /></div>
              <div><Label className="text-xs">Стоимость</Label><Input value={prop.price} onChange={(e) => setPropertiesFirst({ ...propertiesFirst, items: updateArrayItem(propertiesFirst.items, idx, "price", e.target.value) })} /></div>
              <div><Label className="text-xs">Паи</Label><Input value={prop.shares} onChange={(e) => setPropertiesFirst({ ...propertiesFirst, items: updateArrayItem(propertiesFirst.items, idx, "shares", e.target.value) })} /></div>
              <div><Label className="text-xs">Доходность</Label><Input value={prop.yield} onChange={(e) => setPropertiesFirst({ ...propertiesFirst, items: updateArrayItem(propertiesFirst.items, idx, "yield", e.target.value) })} /></div>
              <div><Label className="text-xs">Рейтинг</Label><Input value={prop.rating} onChange={(e) => setPropertiesFirst({ ...propertiesFirst, items: updateArrayItem(propertiesFirst.items, idx, "rating", e.target.value) })} /></div>
              <div><Label className="text-xs">Slug</Label><Input value={prop.slug} onChange={(e) => setPropertiesFirst({ ...propertiesFirst, items: updateArrayItem(propertiesFirst.items, idx, "slug", e.target.value) })} /></div>
            </div>
            <div><Label className="text-xs">Изображение</Label><ImageUploader value={prop.image} onChange={(url) => setPropertiesFirst({ ...propertiesFirst, items: updateArrayItem(propertiesFirst.items, idx, "image", url) })} bucket="page-images" /></div>
          </DragItem>
        ))}
        <Button variant="outline" size="sm" onClick={() => setPropertiesFirst({ ...propertiesFirst, items: [...propertiesFirst.items, { title: "", city: "", area: "", term: "", price: "", shares: "", yield: "", rating: "", image: "", slug: "" }] })}>
          <Plus className="h-4 w-4 mr-1" /> Добавить объект
        </Button>
      </Section>

      {/* Properties Grid 2 */}
      <Section title="🏢 Карточки объектов (блок 2)" enabled={propertiesSecond.enabled !== false} onToggle={(v) => setPropertiesSecond({ ...propertiesSecond, enabled: v })}>
        {propertiesSecond.items.map((prop, idx) => (
          <DragItem key={idx} index={idx} {...prop2Drag} onRemove={(i: number) => setPropertiesSecond({ ...propertiesSecond, items: propertiesSecond.items.filter((_, j) => j !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <div><Label className="text-xs">Название</Label><Input value={prop.title} onChange={(e) => setPropertiesSecond({ ...propertiesSecond, items: updateArrayItem(propertiesSecond.items, idx, "title", e.target.value) })} /></div>
              <div><Label className="text-xs">Город</Label><Input value={prop.city} onChange={(e) => setPropertiesSecond({ ...propertiesSecond, items: updateArrayItem(propertiesSecond.items, idx, "city", e.target.value) })} /></div>
              <div><Label className="text-xs">Площадь</Label><Input value={prop.area} onChange={(e) => setPropertiesSecond({ ...propertiesSecond, items: updateArrayItem(propertiesSecond.items, idx, "area", e.target.value) })} /></div>
              <div><Label className="text-xs">Срок</Label><Input value={prop.term} onChange={(e) => setPropertiesSecond({ ...propertiesSecond, items: updateArrayItem(propertiesSecond.items, idx, "term", e.target.value) })} /></div>
              <div><Label className="text-xs">Стоимость</Label><Input value={prop.price} onChange={(e) => setPropertiesSecond({ ...propertiesSecond, items: updateArrayItem(propertiesSecond.items, idx, "price", e.target.value) })} /></div>
              <div><Label className="text-xs">Паи</Label><Input value={prop.shares} onChange={(e) => setPropertiesSecond({ ...propertiesSecond, items: updateArrayItem(propertiesSecond.items, idx, "shares", e.target.value) })} /></div>
              <div><Label className="text-xs">Доходность</Label><Input value={prop.yield} onChange={(e) => setPropertiesSecond({ ...propertiesSecond, items: updateArrayItem(propertiesSecond.items, idx, "yield", e.target.value) })} /></div>
              <div><Label className="text-xs">Рейтинг</Label><Input value={prop.rating} onChange={(e) => setPropertiesSecond({ ...propertiesSecond, items: updateArrayItem(propertiesSecond.items, idx, "rating", e.target.value) })} /></div>
              <div><Label className="text-xs">Slug</Label><Input value={prop.slug} onChange={(e) => setPropertiesSecond({ ...propertiesSecond, items: updateArrayItem(propertiesSecond.items, idx, "slug", e.target.value) })} /></div>
            </div>
            <div><Label className="text-xs">Изображение</Label><ImageUploader value={prop.image} onChange={(url) => setPropertiesSecond({ ...propertiesSecond, items: updateArrayItem(propertiesSecond.items, idx, "image", url) })} bucket="page-images" /></div>
          </DragItem>
        ))}
        <Button variant="outline" size="sm" onClick={() => setPropertiesSecond({ ...propertiesSecond, items: [...propertiesSecond.items, { title: "", city: "", area: "", term: "", price: "", shares: "", yield: "", rating: "", image: "", slug: "" }] })}>
          <Plus className="h-4 w-4 mr-1" /> Добавить объект
        </Button>
      </Section>

      {/* Telegram */}
      <Section title="📱 Telegram-блок" enabled={telegram.enabled !== false} onToggle={(v) => setTelegram({ ...telegram, enabled: v })}>
        <div className="grid grid-cols-2 gap-3">
          <div><Label className="text-xs">Надпись</Label><Input value={telegram.label} onChange={(e) => setTelegram({ ...telegram, label: e.target.value })} /></div>
          <div><Label className="text-xs">Ссылка кнопки</Label><Input value={telegram.buttonLink} onChange={(e) => setTelegram({ ...telegram, buttonLink: e.target.value })} /></div>
          <div className="col-span-2"><Label className="text-xs">Заголовок</Label><Textarea value={telegram.title} onChange={(e) => setTelegram({ ...telegram, title: e.target.value })} rows={2} /></div>
          <div><Label className="text-xs">Текст кнопки</Label><Input value={telegram.buttonText} onChange={(e) => setTelegram({ ...telegram, buttonText: e.target.value })} /></div>
        </div>
        <p className="text-xs text-muted-foreground font-medium mt-3">Карточки</p>
        {telegram.cards.map((card, idx) => (
          <DragItem key={idx} index={idx} {...telCardsDrag} onRemove={(i: number) => setTelegram({ ...telegram, cards: telegram.cards.filter((_, j) => j !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <div><Label className="text-xs">Тег</Label><Input value={card.tag} onChange={(e) => setTelegram({ ...telegram, cards: updateArrayItem(telegram.cards, idx, "tag", e.target.value) })} /></div>
              <div><Label className="text-xs">Дата</Label><Input value={card.date} onChange={(e) => setTelegram({ ...telegram, cards: updateArrayItem(telegram.cards, idx, "date", e.target.value) })} /></div>
              <div className="col-span-2"><Label className="text-xs">Заголовок</Label><Textarea value={card.title} onChange={(e) => setTelegram({ ...telegram, cards: updateArrayItem(telegram.cards, idx, "title", e.target.value) })} rows={2} /></div>
              <div className="col-span-2"><Label className="text-xs">Ссылка</Label><Input value={(card as any).link || ""} onChange={(e) => setTelegram({ ...telegram, cards: updateArrayItem(telegram.cards, idx, "link", e.target.value) })} placeholder="https://..." /></div>
            </div>
            <div><Label className="text-xs">Изображение</Label><ImageUploader value={card.image} onChange={(url) => setTelegram({ ...telegram, cards: updateArrayItem(telegram.cards, idx, "image", url) })} bucket="page-images" /></div>
          </DragItem>
        ))}
        <Button variant="outline" size="sm" onClick={() => setTelegram({ ...telegram, cards: [...telegram.cards, { image: "", tag: "", title: "", date: "" }] })}>
          <Plus className="h-4 w-4 mr-1" /> Добавить карточку
        </Button>
      </Section>

      {/* How It Works */}
      <Section title="📋 Как это работает" enabled={howItWorks.enabled !== false} onToggle={(v) => setHowItWorks({ ...howItWorks, enabled: v })}>
        <div className="space-y-3">
          <div><Label className="text-xs">Заголовок</Label><Textarea value={howItWorks.title} onChange={(e) => setHowItWorks({ ...howItWorks, title: e.target.value })} rows={2} /></div>
          <div><Label className="text-xs">Изображение</Label><ImageUploader value={howItWorks.image} onChange={(url) => setHowItWorks({ ...howItWorks, image: url })} bucket="page-images" /></div>
        </div>
        <p className="text-xs text-muted-foreground font-medium mt-3">Шаги</p>
        {howItWorks.steps.map((step, idx) => (
          <DragItem key={idx} index={idx} {...stepsDrag} onRemove={(i: number) => setHowItWorks({ ...howItWorks, steps: howItWorks.steps.filter((_, j) => j !== i) })}>
            <div className="grid grid-cols-3 gap-2">
              <div><Label className="text-xs">Номер</Label><Input value={step.number} onChange={(e) => setHowItWorks({ ...howItWorks, steps: updateArrayItem(howItWorks.steps, idx, "number", e.target.value) })} /></div>
              <div className="col-span-2"><Label className="text-xs">Заголовок</Label><Input value={step.title} onChange={(e) => setHowItWorks({ ...howItWorks, steps: updateArrayItem(howItWorks.steps, idx, "title", e.target.value) })} /></div>
            </div>
            <div><Label className="text-xs">Описание</Label><Textarea value={step.description} onChange={(e) => setHowItWorks({ ...howItWorks, steps: updateArrayItem(howItWorks.steps, idx, "description", e.target.value) })} rows={2} /></div>
          </DragItem>
        ))}
        <Button variant="outline" size="sm" onClick={() => setHowItWorks({ ...howItWorks, steps: [...howItWorks.steps, { number: "", title: "", description: "" }] })}>
          <Plus className="h-4 w-4 mr-1" /> Добавить шаг
        </Button>
      </Section>

      {/* Map */}
      <Section title="🗺️ Карта инвестиций" enabled={map.enabled !== false} onToggle={(v) => setMap({ ...map, enabled: v })}>
        <div><Label className="text-xs">Заголовок</Label><Input value={map.title} onChange={(e) => setMap({ ...map, title: e.target.value })} /></div>
        <div><Label className="text-xs">Описание</Label><Textarea value={map.description} onChange={(e) => setMap({ ...map, description: e.target.value })} rows={3} /></div>
      </Section>

      {/* News */}
      <Section title="📰 Новости" enabled={news.enabled !== false} onToggle={(v) => setNews({ ...news, enabled: v })}>
        {news.items.map((item, idx) => (
          <DragItem key={idx} index={idx} {...newsDrag} onRemove={(i: number) => setNews({ ...news, items: news.items.filter((_, j) => j !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <div><Label className="text-xs">Тег</Label><Input value={item.tag} onChange={(e) => setNews({ ...news, items: updateArrayItem(news.items, idx, "tag", e.target.value) })} /></div>
              <div><Label className="text-xs">Дата</Label><Input value={item.date} onChange={(e) => setNews({ ...news, items: updateArrayItem(news.items, idx, "date", e.target.value) })} /></div>
              <div className="col-span-2"><Label className="text-xs">Заголовок</Label><Input value={item.title} onChange={(e) => setNews({ ...news, items: updateArrayItem(news.items, idx, "title", e.target.value) })} /></div>
              <div className="col-span-2"><Label className="text-xs">Описание</Label><Textarea value={item.description} onChange={(e) => setNews({ ...news, items: updateArrayItem(news.items, idx, "description", e.target.value) })} rows={2} /></div>
              <div className="col-span-2"><Label className="text-xs">Ссылка</Label><Input value={(item as any).link || ""} onChange={(e) => setNews({ ...news, items: updateArrayItem(news.items, idx, "link", e.target.value) })} placeholder="https://..." /></div>
            </div>
          </DragItem>
        ))}
        <Button variant="outline" size="sm" onClick={() => setNews({ ...news, items: [...news.items, { tag: "", title: "", description: "", date: "" }] })}>
          <Plus className="h-4 w-4 mr-1" /> Добавить новость
        </Button>
      </Section>

      {/* Blog */}
      <Section title="📝 События и аналитика" enabled={blog.enabled !== false} onToggle={(v) => setBlog({ ...blog, enabled: v })}>
        <div><Label className="text-xs">Заголовок</Label><Input value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} /></div>
        <div><Label className="text-xs">Описание</Label><Textarea value={blog.description} onChange={(e) => setBlog({ ...blog, description: e.target.value })} rows={2} /></div>
        <p className="text-xs text-muted-foreground font-medium mt-3">Посты</p>
        {blog.posts.map((post, idx) => (
          <DragItem key={idx} index={idx} {...blogDrag} onRemove={(i: number) => setBlog({ ...blog, posts: blog.posts.filter((_, j) => j !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <div><Label className="text-xs">Категория</Label><Input value={post.category} onChange={(e) => setBlog({ ...blog, posts: updateArrayItem(blog.posts, idx, "category", e.target.value) })} /></div>
              <div><Label className="text-xs">Дата</Label><Input value={post.date} onChange={(e) => setBlog({ ...blog, posts: updateArrayItem(blog.posts, idx, "date", e.target.value) })} /></div>
              <div className="col-span-2"><Label className="text-xs">Заголовок</Label><Input value={post.title} onChange={(e) => setBlog({ ...blog, posts: updateArrayItem(blog.posts, idx, "title", e.target.value) })} /></div>
              <div className="col-span-2"><Label className="text-xs">Ссылка</Label><Input value={(post as any).link || ""} onChange={(e) => setBlog({ ...blog, posts: updateArrayItem(blog.posts, idx, "link", e.target.value) })} placeholder="https://..." /></div>
            </div>
            <div><Label className="text-xs">Изображение</Label><ImageUploader value={post.image} onChange={(url) => setBlog({ ...blog, posts: updateArrayItem(blog.posts, idx, "image", url) })} bucket="page-images" /></div>
          </DragItem>
        ))}
        <Button variant="outline" size="sm" onClick={() => setBlog({ ...blog, posts: [...blog.posts, { image: "", category: "", title: "", date: "" }] })}>
          <Plus className="h-4 w-4 mr-1" /> Добавить пост
        </Button>
      </Section>

      {/* Testimonials */}
      <Section title="💬 Отзывы" enabled={testimonials.enabled !== false} onToggle={(v) => setTestimonials({ ...testimonials, enabled: v })}>
        <div><Label className="text-xs">Заголовок</Label><Input value={testimonials.title} onChange={(e) => setTestimonials({ ...testimonials, title: e.target.value })} /></div>
        {testimonials.items.map((item, idx) => (
          <DragItem key={idx} index={idx} {...testDrag} onRemove={(i: number) => setTestimonials({ ...testimonials, items: testimonials.items.filter((_, j) => j !== i) })}>
            <div className="space-y-2">
              <div><Label className="text-xs">Цитата</Label><Textarea value={item.quote} onChange={(e) => setTestimonials({ ...testimonials, items: updateArrayItem(testimonials.items, idx, "quote", e.target.value) })} rows={2} /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label className="text-xs">Имя</Label><Input value={item.name} onChange={(e) => setTestimonials({ ...testimonials, items: updateArrayItem(testimonials.items, idx, "name", e.target.value) })} /></div>
                <div><Label className="text-xs">Должность</Label><Input value={item.role} onChange={(e) => setTestimonials({ ...testimonials, items: updateArrayItem(testimonials.items, idx, "role", e.target.value) })} /></div>
              </div>
              <div><Label className="text-xs">Аватар</Label><ImageUploader value={item.avatar} onChange={(url) => setTestimonials({ ...testimonials, items: updateArrayItem(testimonials.items, idx, "avatar", url) })} bucket="page-images" /></div>
            </div>
          </DragItem>
        ))}
        <Button variant="outline" size="sm" onClick={() => setTestimonials({ ...testimonials, items: [...testimonials.items, { quote: "", name: "", role: "", avatar: "" }] })}>
          <Plus className="h-4 w-4 mr-1" /> Добавить отзыв
        </Button>
      </Section>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-3xl mx-auto flex items-center justify-end px-4 py-3">
          <Button onClick={save} disabled={saving} size="sm">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
