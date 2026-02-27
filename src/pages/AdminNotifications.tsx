import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";

interface TelegramConfig {
  enabled: boolean;
  bot_token: string;
  chat_ids: string[];
}

const DEFAULT_CONFIG: TelegramConfig = {
  enabled: false,
  bot_token: "",
  chat_ids: [""],
};

const AdminNotifications = () => {
  const [config, setConfig] = useState<TelegramConfig>(DEFAULT_CONFIG);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "telegram_notifications")
        .single();
      if (data?.value) {
        const val = data.value as unknown as TelegramConfig;
        setConfig({
          enabled: val.enabled ?? false,
          bot_token: val.bot_token ?? "",
          chat_ids: val.chat_ids?.length ? val.chat_ids : [""],
        });
      }
      setLoading(false);
    };
    load();
  }, []);

  const save = async () => {
    setSaving(true);
    const cleanIds = config.chat_ids.filter((id) => id.trim());
    const payload = { ...config, chat_ids: cleanIds };

    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "telegram_notifications", value: payload as any }, { onConflict: "key" });

    if (error) toast.error("Ошибка сохранения");
    else toast.success("Настройки сохранены");
    setSaving(false);
  };

  const addChatId = () => setConfig((c) => ({ ...c, chat_ids: [...c.chat_ids, ""] }));
  const removeChatId = (i: number) => setConfig((c) => ({ ...c, chat_ids: c.chat_ids.filter((_, idx) => idx !== i) }));
  const updateChatId = (i: number, val: string) =>
    setConfig((c) => ({ ...c, chat_ids: c.chat_ids.map((id, idx) => (idx === i ? val : id)) }));

  if (loading) return <p className="text-muted-foreground">Загрузка...</p>;

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">Уведомления</h1>

      <div className="border rounded-lg p-5 space-y-5 bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-base">Telegram-уведомления</h2>
            <p className="text-sm text-muted-foreground">Заявки с сайта будут отправляться в Telegram</p>
          </div>
          <Switch checked={config.enabled} onCheckedChange={(v) => setConfig((c) => ({ ...c, enabled: v }))} />
        </div>

        {config.enabled && (
          <>
            <div className="space-y-2">
              <Label className="text-sm">Токен бота</Label>
              <Input
                value={config.bot_token}
                onChange={(e) => setConfig((c) => ({ ...c, bot_token: e.target.value }))}
                placeholder="123456:ABC-DEF..."
                type="password"
              />
              <p className="text-xs text-muted-foreground">
                Создайте бота через{" "}
                <a href="https://t.me/BotFather" target="_blank" rel="noopener" className="underline">
                  @BotFather
                </a>{" "}
                и вставьте сюда токен
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Chat ID получателей</Label>
              {config.chat_ids.map((id, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={id}
                    onChange={(e) => updateChatId(i, e.target.value)}
                    placeholder="-1001234567890 или 123456789"
                  />
                  {config.chat_ids.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeChatId(i)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addChatId}>
                <Plus className="h-3 w-3 mr-1" /> Добавить получателя
              </Button>
              <p className="text-xs text-muted-foreground">
                Для личных сообщений используйте свой Chat ID (узнать через{" "}
                <a href="https://t.me/userinfobot" target="_blank" rel="noopener" className="underline">
                  @userinfobot
                </a>
                ). Для группы — ID группы (начинается с -100...)
              </p>
            </div>
          </>
        )}
      </div>

      <Button onClick={save} disabled={saving}>
        <Save className="h-4 w-4 mr-1" />
        {saving ? "Сохранение..." : "Сохранить"}
      </Button>
    </div>
  );
};

export default AdminNotifications;
