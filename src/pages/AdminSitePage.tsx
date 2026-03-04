import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

interface MenuItem {
  text: string;
  url: string;
}

interface FooterLink {
  text: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterData {
  companyText: string;
  telegramUrl: string;
  telegramHandle: string;
  columns: FooterColumn[];
  copyright: string;
  bottomLinks: FooterLink[];
}

const defaultMenu: MenuItem[] = [
  { text: "Каталог", url: "/catalog" },
  { text: "О Пайстартер", url: "/about" },
];

const defaultFooter: FooterData = {
  companyText: "Общество с ограниченной ответственностью «ПАЙСТАРТЕР»\nОГРН: 1187746382941, ИНН: 7731456723",
  telegramUrl: "https://t.me/piestarter",
  telegramHandle: "@piestarter",
  columns: [
    {
      title: "Каталог",
      links: [{ text: "Все объекты", url: "/catalog" }],
    },
    {
      title: "О компании",
      links: [
        { text: "Пайстартер сегодня", url: "/about" },
        { text: "О команде", url: "/about" },
      ],
    },
    {
      title: "Контакты",
      links: [
        { text: "hi@piestarter.ru", url: "mailto:hi@piestarter.ru" },
        { text: "+7 900 123-45-67", url: "tel:+79001234567" },
        { text: "Адрес: пер. Большой Афанасьевский, д. 41, стр. 2, этаж 5, Россия, Москва, 119019", url: "" },
      ],
    },
  ],
  copyright: "© 2025 ООО «Пайстартер». Все права защищены",
  bottomLinks: [
    { text: "Политика конфиденциальности", url: "/privacy" },
    { text: "Согласие на обработку персональных данных", url: "/consent" },
  ],
};

const inp = "px-3 py-2 text-sm border border-input rounded-md bg-background outline-none focus:ring-1 focus:ring-ring";

const AdminSitePage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenu);
  const [footer, setFooter] = useState<FooterData>(defaultFooter);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["menu_settings", "footer_settings"])
      .then(({ data }) => {
        if (!data) return;
        const menuRow = data.find((r) => r.key === "menu_settings");
        const footerRow = data.find((r) => r.key === "footer_settings");
        if (menuRow?.value && (menuRow.value as any).items) {
          setMenuItems((menuRow.value as any).items);
        }
        if (footerRow?.value) {
          setFooter({ ...defaultFooter, ...(footerRow.value as any) });
        }
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await Promise.all([
      supabase.from("site_settings").upsert(
        { key: "menu_settings", value: { items: menuItems } as any, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      ),
      supabase.from("site_settings").upsert(
        { key: "footer_settings", value: footer as any, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      ),
    ]);
    setSaving(false);
    toast.success("Сохранено");
  };

  // Menu helpers
  const updateMenuItem = (i: number, field: keyof MenuItem, val: string) => {
    const updated = [...menuItems];
    updated[i] = { ...updated[i], [field]: val };
    setMenuItems(updated);
  };
  const addMenuItem = () => setMenuItems([...menuItems, { text: "", url: "" }]);
  const removeMenuItem = (i: number) => setMenuItems(menuItems.filter((_, idx) => idx !== i));

  // Footer helpers
  const setF = (field: keyof FooterData, val: any) => setFooter((prev) => ({ ...prev, [field]: val }));

  const updateColumn = (ci: number, field: keyof FooterColumn, val: any) => {
    const cols = [...footer.columns];
    cols[ci] = { ...cols[ci], [field]: val };
    setF("columns", cols);
  };
  const addColumn = () => setF("columns", [...footer.columns, { title: "", links: [] }]);
  const removeColumn = (ci: number) => setF("columns", footer.columns.filter((_, i) => i !== ci));

  const updateColLink = (ci: number, li: number, field: keyof FooterLink, val: string) => {
    const cols = [...footer.columns];
    const links = [...cols[ci].links];
    links[li] = { ...links[li], [field]: val };
    cols[ci] = { ...cols[ci], links };
    setF("columns", cols);
  };
  const addColLink = (ci: number) => {
    const cols = [...footer.columns];
    cols[ci] = { ...cols[ci], links: [...cols[ci].links, { text: "", url: "" }] };
    setF("columns", cols);
  };
  const removeColLink = (ci: number, li: number) => {
    const cols = [...footer.columns];
    cols[ci] = { ...cols[ci], links: cols[ci].links.filter((_, i) => i !== li) };
    setF("columns", cols);
  };

  const updateBottomLink = (i: number, field: keyof FooterLink, val: string) => {
    const links = [...footer.bottomLinks];
    links[i] = { ...links[i], [field]: val };
    setF("bottomLinks", links);
  };
  const addBottomLink = () => setF("bottomLinks", [...footer.bottomLinks, { text: "", url: "" }]);
  const removeBottomLink = (i: number) => setF("bottomLinks", footer.bottomLinks.filter((_, idx) => idx !== i));

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Меню и футер</h1>
        <Button onClick={save} disabled={saving}>
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>

      {/* Menu Section */}
      <div className="border rounded-lg p-5 space-y-4">
        <div>
          <h2 className="font-semibold text-base">Навигационное меню</h2>
          <p className="text-sm text-muted-foreground mt-1">Пункты отображаются в мобильном меню сайта</p>
        </div>
        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                value={item.text}
                onChange={(e) => updateMenuItem(i, "text", e.target.value)}
                placeholder="Название пункта"
                className={`${inp} flex-1`}
              />
              <input
                value={item.url}
                onChange={(e) => updateMenuItem(i, "url", e.target.value)}
                placeholder="/catalog"
                className={`${inp} w-40`}
              />
              <button
                onClick={() => removeMenuItem(i)}
                className="text-muted-foreground hover:text-destructive transition-colors p-1 shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={addMenuItem}>
          <Plus className="h-4 w-4 mr-1" /> Добавить пункт
        </Button>
      </div>

      {/* Footer Section */}
      <div className="border rounded-lg p-5 space-y-6">
        <h2 className="font-semibold text-base">Футер</h2>

        {/* Basic info */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Основная информация</h3>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Текст о компании (ОГРН, ИНН)</label>
            <textarea
              value={footer.companyText}
              onChange={(e) => setF("companyText", e.target.value)}
              rows={3}
              className={`${inp} w-full resize-none`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Telegram URL</label>
              <input
                value={footer.telegramUrl}
                onChange={(e) => setF("telegramUrl", e.target.value)}
                placeholder="https://t.me/..."
                className={`${inp} w-full`}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Telegram handle</label>
              <input
                value={footer.telegramHandle}
                onChange={(e) => setF("telegramHandle", e.target.value)}
                placeholder="@piestarter"
                className={`${inp} w-full`}
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Текст копирайта</label>
            <input
              value={footer.copyright}
              onChange={(e) => setF("copyright", e.target.value)}
              className={`${inp} w-full`}
            />
          </div>
        </div>

        {/* Columns */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Колонки ссылок</h3>
          <div className="space-y-3">
            {footer.columns.map((col, ci) => (
              <div key={ci} className="border rounded-md p-4 space-y-3 bg-muted/20">
                <div className="flex gap-2 items-center">
                  <input
                    value={col.title}
                    onChange={(e) => updateColumn(ci, "title", e.target.value)}
                    placeholder="Заголовок колонки"
                    className={`${inp} flex-1 font-medium`}
                  />
                  <button
                    onClick={() => removeColumn(ci)}
                    className="text-muted-foreground hover:text-destructive p-1 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2 pl-2 border-l border-border">
                  {col.links.map((link, li) => (
                    <div key={li} className="flex gap-2 items-center">
                      <input
                        value={link.text}
                        onChange={(e) => updateColLink(ci, li, "text", e.target.value)}
                        placeholder="Текст ссылки"
                        className={`${inp} flex-1`}
                      />
                      <input
                        value={link.url}
                        onChange={(e) => updateColLink(ci, li, "url", e.target.value)}
                        placeholder="/about или mailto:..."
                        className={`${inp} w-44`}
                      />
                      <button
                        onClick={() => removeColLink(ci, li)}
                        className="text-muted-foreground hover:text-destructive p-1 shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => addColLink(ci)} className="h-7 text-xs">
                    <Plus className="h-3 w-3 mr-1" /> Добавить ссылку
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={addColumn}>
            <Plus className="h-4 w-4 mr-1" /> Добавить колонку
          </Button>
        </div>

        {/* Bottom links */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Нижние ссылки (политики)</h3>
          <div className="space-y-2">
            {footer.bottomLinks.map((link, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  value={link.text}
                  onChange={(e) => updateBottomLink(i, "text", e.target.value)}
                  placeholder="Текст"
                  className={`${inp} flex-1`}
                />
                <input
                  value={link.url}
                  onChange={(e) => updateBottomLink(i, "url", e.target.value)}
                  placeholder="/privacy"
                  className={`${inp} w-44`}
                />
                <button
                  onClick={() => removeBottomLink(i)}
                  className="text-muted-foreground hover:text-destructive p-1 shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={addBottomLink}>
            <Plus className="h-4 w-4 mr-1" /> Добавить ссылку
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSitePage;
