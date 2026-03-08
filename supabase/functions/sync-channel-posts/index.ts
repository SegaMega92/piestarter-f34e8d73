import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CHANNEL_USERNAME = "piestarter";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Auth check
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const anonClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data: { user } } = await anonClient.auth.getUser(token || "");
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  if (!botToken) {
    return new Response(JSON.stringify({ error: "Токен бота не настроен" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Load current state (posts + offset)
  const { data: channelData } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "telegram_channel_posts")
    .maybeSingle();

  const current = (channelData?.value as any) || { posts: [], offset: 0 };
  const posts: any[] = [...(current.posts || [])];
  let newOffset = current.offset || 0;

  // Fetch updates from Telegram
  const tgRes = await fetch(
    `https://api.telegram.org/bot${botToken}/getUpdates?offset=${newOffset}&limit=100&timeout=0&allowed_updates=${encodeURIComponent('["channel_post"]')}`
  );
  const tgJson = await tgRes.json();

  if (!tgJson.ok) {
    return new Response(
      JSON.stringify({ error: "Ошибка Telegram API", details: tgJson.description }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const updates: any[] = tgJson.result || [];
  let newPostsCount = 0;

  for (const update of updates) {
    if (update.update_id >= newOffset) newOffset = update.update_id + 1;

    const post = update.channel_post;
    if (!post) continue;
    if (post.chat?.username?.toLowerCase() !== CHANNEL_USERNAME.toLowerCase()) continue;

    const text = post.text || post.caption || "";
    if (!text.trim()) continue;

    const date = new Date(post.date * 1000).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const link = `https://t.me/${CHANNEL_USERNAME}/${post.message_id}`;

    // Update existing or add new
    const existingIdx = posts.findIndex((p) => p.message_id === post.message_id);
    const entry = { message_id: post.message_id, text: text.slice(0, 300), date, link };
    if (existingIdx !== -1) {
      posts[existingIdx] = entry;
    } else {
      posts.unshift(entry);
      newPostsCount++;
    }
  }

  // Sort by message_id desc, keep last 10
  posts.sort((a, b) => b.message_id - a.message_id);
  const trimmed = posts.slice(0, 10);

  await supabase.from("site_settings").upsert(
    { key: "telegram_channel_posts", value: { posts: trimmed, offset: newOffset } as any },
    { onConflict: "key" }
  );

  return new Response(
    JSON.stringify({ success: true, new_posts: newPostsCount, total: trimmed.length }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
