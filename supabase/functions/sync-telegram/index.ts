import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Verify caller is authenticated
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const anonClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data: { user } } = await anonClient.auth.getUser(token || "");
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Load telegram config
  const { data: tgData } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "telegram_notifications")
    .maybeSingle();

  if (!tgData?.value) {
    return new Response(JSON.stringify({ error: "Настройки Telegram не найдены" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const config = tgData.value as { bot_token?: string; usernames?: string[] };

  if (!config.bot_token) {
    return new Response(JSON.stringify({ error: "Токен бота не настроен" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Load current subscribers + last offset
  const { data: subsData } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "telegram_subscribers")
    .maybeSingle();

  const current = (subsData?.value as any) || { subscribers: {}, offset: 0 };
  const subscribers: Record<string, string> = { ...current.subscribers };
  const allowedUsernames = (config.usernames || [])
    .map((u) => u.replace("@", "").trim().toLowerCase())
    .filter(Boolean);

  // Fetch updates from Telegram
  const tgRes = await fetch(
    `https://api.telegram.org/bot${config.bot_token}/getUpdates?offset=${current.offset}&limit=100&timeout=0`
  );
  const tgJson = await tgRes.json();

  if (!tgJson.ok) {
    return new Response(
      JSON.stringify({ error: "Ошибка Telegram API", details: tgJson.description }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const updates: any[] = tgJson.result || [];
  let newOffset = current.offset;
  const newlyLinked: string[] = [];

  for (const update of updates) {
    if (update.update_id >= newOffset) newOffset = update.update_id + 1;

    const from = update.message?.from ?? update.callback_query?.from;
    if (!from?.username) continue;

    const username = from.username.toLowerCase();
    const chatId = String(from.id);

    if (!allowedUsernames.includes(username)) continue;

    if (subscribers[username] !== chatId) {
      subscribers[username] = chatId;
      newlyLinked.push(username);

      // Welcome message
      await fetch(`https://api.telegram.org/bot${config.bot_token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "✅ Вы подключены к уведомлениям Пайстартер. Теперь вы будете получать сообщения о новых заявках с сайта.",
        }),
      });
    }
  }

  // Persist
  await supabase.from("site_settings").upsert(
    {
      key: "telegram_subscribers",
      value: { subscribers, offset: newOffset } as any,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" }
  );

  // Return status for each allowed username
  const status = Object.fromEntries(
    allowedUsernames.map((u) => [u, !!subscribers[u]])
  );

  return new Response(
    JSON.stringify({ success: true, newly_linked: newlyLinked, subscribers: status }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
