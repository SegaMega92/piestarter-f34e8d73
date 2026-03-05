import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, message, source, page_slug } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Save lead to database
    const { error: insertError } = await supabase.from("leads").insert({
      name: name || null,
      phone: phone || null,
      email: email || null,
      message: message || null,
      source: source || "contact_form",
      page_slug: page_slug || null,
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Try to send Telegram notification
    const [{ data: tgSettings }, { data: subsData }] = await Promise.all([
      supabase.from("site_settings").select("value").eq("key", "telegram_notifications").maybeSingle(),
      supabase.from("site_settings").select("value").eq("key", "telegram_subscribers").maybeSingle(),
    ]);

    if (tgSettings?.value) {
      const config = tgSettings.value as {
        bot_token?: string;
        usernames?: string[];
        enabled?: boolean;
      };

      if (config.enabled && config.bot_token && config.usernames?.length) {
        const subscribers: Record<string, string> =
          (subsData?.value as any)?.subscribers || {};

        const allowedUsernames = config.usernames
          .map((u) => u.replace("@", "").trim().toLowerCase())
          .filter(Boolean);

        const chatIds = allowedUsernames
          .map((u) => subscribers[u])
          .filter(Boolean);

        if (chatIds.length) {
          const lines = [
            "📩 *Новая заявка с сайта*",
            "",
            name ? `👤 *Имя:* ${escapeMarkdown(name)}` : "",
            phone ? `📞 *Телефон:* ${escapeMarkdown(phone)}` : "",
            email ? `📧 *Email:* ${escapeMarkdown(email)}` : "",
            message ? `💬 *Сообщение:* ${escapeMarkdown(message)}` : "",
            "",
            `📋 *Источник:* ${escapeMarkdown(source || "contact_form")}`,
            page_slug ? `🔗 *Страница:* ${escapeMarkdown(page_slug)}` : "",
          ].filter(Boolean).join("\n");

          for (const chatId of chatIds) {
            try {
              await fetch(
                `https://api.telegram.org/bot${config.bot_token}/sendMessage`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    chat_id: chatId,
                    text: lines,
                    parse_mode: "Markdown",
                  }),
                }
              );
            } catch (tgErr) {
              console.error("Telegram send error for chat", chatId, tgErr);
            }
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}
