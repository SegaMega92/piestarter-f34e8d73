import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const [title, setTitle] = useState("Коллективные инвестиции в\u00a0коммерческую недвижимость");

  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "home_hero").maybeSingle().then(({ data }) => {
      if (data?.value && (data.value as any).title) setTitle((data.value as any).title);
    });
  }, []);

  return (
    <section className="py-[48px] md:py-[72px]">
      <h1 className="font-semibold text-[40px] md:text-[68px] lg:text-[85px] leading-[1.05] tracking-[-1px] md:tracking-[-2.55px] text-black max-w-[935px]">
        {title}
      </h1>
    </section>
  );
};

export default HeroSection;
