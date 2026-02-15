import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface ContactField {
  name: string;
  label: string;
  type: string;
  enabled: boolean;
}

interface ContactSettings {
  title: string;
  subtitle: string;
  telegram_url: string;
  email: string;
  fields: ContactField[];
}

const AdminContactForm = () => {
  const [settings, setSettings] = useState<ContactSettings>({
    title: "",
    subtitle: "",
    telegram_url: "",
    email: "",
    fields: [],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("key", "contact_form")
      .single();
    if (data) setSettings(data.value as unknown as ContactSettings);
  };

  const save = async () => {
    setSaving(true);
    await supabase
      .from("site_settings")
      .update({ value: settings as any, updated_at: new Date().toISOString() })
      .eq("key", "contact_form");
    setSaving(false);
    toast.success("Сохранено");
  };

  const updateField = (idx: number, updates: Partial<ContactField>) => {
    setSettings({
      ...settings,
      fields: settings.fields.map((f, i) => (i === idx ? { ...f, ...updates } : f)),
    });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-20">
      <h1 className="text-2xl font-bold text-foreground">Контактная форма</h1>

      <div className="space-y-3 border rounded-lg p-4">
        <div className="space-y-1">
          <Label className="text-xs">Заголовок</Label>
          <Input value={settings.title} onChange={(e) => setSettings({ ...settings, title: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Подзаголовок</Label>
          <Input value={settings.subtitle} onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Ссылка на Telegram</Label>
            <Input value={settings.telegram_url} onChange={(e) => setSettings({ ...settings, telegram_url: e.target.value })} placeholder="https://t.me/..." />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Email</Label>
            <Input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Поля формы</h2>
        {settings.fields.map((field, idx) => (
          <div key={field.name} className="flex items-center gap-3 border rounded-lg p-3">
            <Switch checked={field.enabled} onCheckedChange={(checked) => updateField(idx, { enabled: checked })} />
            <div className="flex-1 space-y-1">
              <Input value={field.label} onChange={(e) => updateField(idx, { label: e.target.value })} className="text-sm" />
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{field.type}</span>
          </div>
        ))}
      </div>

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

export default AdminContactForm;
