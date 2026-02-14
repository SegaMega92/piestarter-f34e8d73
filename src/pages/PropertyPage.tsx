import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import PropertyHero from "@/components/PropertyHero";
import PropertyStats from "@/components/PropertyStats";
import PhotoGallery from "@/components/PhotoGallery";
import PropertyDetails from "@/components/PropertyDetails";
import LocationSection from "@/components/LocationSection";
import FinancialSection from "@/components/FinancialSection";
import SimilarProperties from "@/components/SimilarProperties";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import type { Json } from "@/integrations/supabase/types";

interface Block {
  id: string;
  block_type: string;
  sort_order: number;
  enabled: boolean;
  content: Record<string, any>;
}

const PropertyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      const { data: page } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug!)
        .eq("status", "published")
        .maybeSingle();

      if (!page) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data: blocksData } = await supabase
        .from("page_blocks")
        .select("*")
        .eq("page_id", page.id)
        .order("sort_order", { ascending: true });

      setBlocks(
        ((blocksData || []) as unknown as Block[]).filter((b) => b.enabled)
      );
      setLoading(false);
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-muted-foreground mb-4">Страница не найдена</p>
          <a href="/" className="text-primary underline">На главную</a>
        </div>
      </div>
    );
  }

  const getContent = (blockType: string): Record<string, any> => {
    const block = blocks.find((b) => b.block_type === blockType);
    return (block?.content as Record<string, any>) || {};
  };

  const isEnabled = (blockType: string) => blocks.some((b) => b.block_type === blockType);

  return (
    <div className="min-h-screen bg-bg-main overflow-x-hidden">
      <Header />
      <main>
        <div className="content-container">
          {isEnabled("PropertyHero") && <PropertyHero content={getContent("PropertyHero")} />}
          {isEnabled("PropertyStats") && <PropertyStats content={getContent("PropertyStats")} />}
          {isEnabled("PhotoGallery") && <PhotoGallery />}
          {isEnabled("PropertyDetails") && <PropertyDetails />}
          {isEnabled("LocationSection") && <LocationSection />}
        </div>
        {isEnabled("FinancialSection") && <FinancialSection />}
        <div className="content-container">
          {isEnabled("SimilarProperties") && <SimilarProperties />}
          {isEnabled("FAQSection") && <FAQSection content={getContent("FAQSection")} />}
        </div>
        {isEnabled("ContactForm") && <ContactForm />}
      </main>
      <Footer />
    </div>
  );
};

export default PropertyPage;
