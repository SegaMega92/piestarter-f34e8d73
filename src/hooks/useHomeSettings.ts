import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface HomeSettings {
  [key: string]: any;
}

export const useHomeSettings = () => {
  const [settings, setSettings] = useState<HomeSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .like("key", "home_%");

      if (data) {
        const map: HomeSettings = {};
        data.forEach((row) => {
          map[row.key] = row.value;
        });
        setSettings(map);
      }
      setLoading(false);
    };
    load();
  }, []);

  return { settings, loading };
};

export const saveHomeSettings = async (allSettings: Record<string, any>) => {
  const promises = Object.entries(allSettings).map(([key, value]) =>
    supabase
      .from("site_settings")
      .upsert({ key, value: value as any, updated_at: new Date().toISOString() }, { onConflict: "key" })
  );
  await Promise.all(promises);
};
