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
  content: Json;
}

const BLOCK_COMPONENTS: Record<string, React.ComponentType<any>> = {
  PropertyHero,
  PropertyStats,
  PhotoGallery,
  PropertyDetails,
  LocationSection,
  FinancialSection,
  SimilarProperties,
  FAQSection,
  ContactForm,
};

const PropertyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      const { data: page, error: pageError } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug!)
        .eq("status", "published")
        .maybeSingle();

      if (pageError || !page) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data: blocksData } = await supabase
        .from("page_blocks")
        .select("*")
        .eq("page_id", page.id)
        .order("sort_order", { ascending: true });

      setBlocks((blocksData || []).filter((b) => b.enabled));
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

  const renderBlock = (block: Block) => {
    const Component = BLOCK_COMPONENTS[block.block_type];
    if (!Component) return null;

    // For now, render the component as-is (static).
    // Content from block.content can be passed as props later when components support it.
    const needsContainer = !["FinancialSection", "ContactForm"].includes(block.block_type);

    if (needsContainer) {
      return <Component key={block.id} />;
    }
    return <Component key={block.id} />;
  };

  // Group blocks: some need content-container wrapper, some don't
  const containerBlocks = ["PropertyHero", "PropertyStats", "PhotoGallery", "PropertyDetails", "LocationSection", "SimilarProperties", "FAQSection"];
  const fullWidthBlocks = ["FinancialSection", "ContactForm"];

  return (
    <div className="min-h-screen bg-bg-main overflow-x-hidden">
      <Header />
      <main>
        <div className="content-container">
          {blocks
            .filter((b) => containerBlocks.includes(b.block_type))
            .map((block) => {
              const Component = BLOCK_COMPONENTS[block.block_type];
              return Component ? <Component key={block.id} /> : null;
            })}
        </div>
        {blocks
          .filter((b) => fullWidthBlocks.includes(b.block_type))
          .map((block) => {
            const Component = BLOCK_COMPONENTS[block.block_type];
            return Component ? <Component key={block.id} /> : null;
          })}
      </main>
      <Footer />
    </div>
  );
};

export default PropertyPage;
