import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Save, RefreshCw, CheckCircle, Circle } from "lucide-react";

interface TelegramConfig {
  enabled: boolean;
  bot_token: string;
  usernames: string[];
}

const DEFAULT_CONFIG: TelegramConfig = {
  enabled: false,
  bot_token: "",
  usernames: [""],
};

const AdminNotifications = () => {
  const [config, setConfig] = useState<TelegramConfig>(DEFAULT_CONFIG);
  const [linkedMap, setLinkedMap] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [{ data: tgData }, { data: subsData }] = await Promise.all([
        supabase.from("site_settings").select("value").eq("key", "telegram_notifications").maybeSingle(),
        supabase.from("site_settings").select("value").eq("key", "telegram_subscribers").maybeSingle(),
      ]);

      if (tgData?.value) {
        const val = tgData.value as any;
        setConfig({
          enabled: val.enabled ?? false,
          bot_token: val.bot_token ?? "",
          usernames: val.usernames?.length ? val.usernames : [""],
        });
      }

      if (subsData?.value) {
        const subs = (subsData.value as any).subscribers || {};
        setLinkedMap(Object.fromEntries(Object.keys(subs).map((u) => [u, true])));
      }

      setLoading(false);
    };
    load();
  }, []);

  const save = async () => {
    setSaving(true);
    const cleanUsernames = config.usernames
      .map((u) => u.replace("@", "").trim().toLowerCase())
      .filter(Boolean);
    const payload = { ...config, usernames: cleanUsernames };

    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "telegram_notifications", value: payload as any }, { onConflict: "key" });

    if (error) toast.error("Ошибка сохранения");
    else toast.success("Настройки сохранены");
    setSaving(false);
  };

  const sync = async () => {
    setSyncing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-telegram`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`,
          },
        }
      );
      const data = await res.json();

      if (data.success) {
        const newMap: Record<string, boolean> = {};
        for (const [u, linked] of Object.entries(data.subscribers || {})) {
          newMap[u] = linked as boolean;
        }
        setLinkedMap(newMap);

        if (data.newly_linked?.length) {
          toast.success(`Подключено новых: ${data.newly_linked.map((u: string) => "@" + u).join(", ")}`);
        } else {
          toast.info("Новых подключений нет");
        }
      } else {
        toast.error(data.error || "Ошибка синхронизации");
      }
    } catch {
      toast.error("Ошибка связи с сервером");
    }
    setSyncing(false);
  };

  const addUsername = () => setConfig((c) => ({ ...c, usernames: [...c.usernames, ""] }));
  const removeUsername = (i: number) =>
    setConfig((c) => ({ ...c, usernames: c.usernames.filter((_, idx) => idx !== i) }));
  const updateUsername = (i: number, val: string) =>
    setConfig((c) => ({ ...c, usernames: c.usernames.map((u, idx) => (idx === i ? val : u)) }));

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
          <Switch
            checked={config.enabled}
            onCheckedChange={(v) => setConfig((c) => ({ ...c, enabled: v }))}
          />
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

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Получатели</Label>
                <Button variant="outline" size="sm" onClick={sync} disabled={syncing}>
                  <RefreshCw className={`h-3 w-3 mr-1.5 ${syncing ? "animate-spin" : ""}`} />
                  {syncing ? "Синхронизация..." : "Синхронизировать"}
                </Button>
              </div>

              <div className="space-y-2">
                {config.usernames.map((username, i) => {
                  const clean = username.replace("@", "").trim().toLowerCase();
                  const isLinked = !!linkedMap[clean];
                  return (
                    <div key={i} className="flex gap-2 items-center">
                      <div
                        title={isLinked ? "Подключён — будет получать уведомления" : "Ожидает: пользователь должен написать боту"}
                        className="shrink-0"
                      >
                        {isLinked
                          ? <CheckCircle className="h-4 w-4 text-green-500" />
                          : <Circle className="h-4 w-4 text-muted-foreground/30" />
                        }
                      </div>
                      <Input
                        value={username}
                        onChange={(e) => updateUsername(i, e.target.value)}
                        placeholder="username (без @)"
                      />
                      {config.usernames.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeUsername(i)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>

              <Button variant="outline" size="sm" onClick={addUsername}>
                <Plus className="h-3 w-3 mr-1" /> Добавить получателя
              </Button>

              <div className="rounded-md bg-muted p-3 space-y-1">
                <p className="text-xs font-medium">Как подключить получателя:</p>
                <p className="text-xs text-muted-foreground">1. Добавьте username и нажмите «Сохранить»</p>
                <p className="text-xs text-muted-foreground">2. Пользователь пишет любое сообщение вашему боту</p>
                <p className="text-xs text-muted-foreground">3. Нажмите «Синхронизировать» — иконка станет зелёной ✓</p>
              </div>
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
