import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoriesFilter from "@/components/home/CategoriesFilter";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProperty from "@/components/home/FeaturedProperty";
import PropertyGrid from "@/components/home/PropertyGrid";
import TelegramSection from "@/components/home/TelegramSection";
import HowItWorks from "@/components/home/HowItWorks";
import InvestmentMap from "@/components/home/InvestmentMap";
import NewsSection from "@/components/home/NewsSection";
import BlogSection from "@/components/home/BlogSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useHomeSettings } from "@/hooks/useHomeSettings";

const HomePage = () => {
  const { settings } = useHomeSettings();

  const isEnabled = (key: string) => {
    const val = settings[key];
    return !val || val.enabled !== false;
  };

  return (
    <div className="min-h-screen bg-bg-main overflow-x-hidden relative">
      <div className="aurora-glow" aria-hidden="true" />
      <Header />
      <main>
        {isEnabled("home_categories") && <CategoriesFilter />}
        <div className="content-container">
          {isEnabled("home_hero") && <HeroSection />}
          {isEnabled("home_featured") && <FeaturedProperty />}
          {isEnabled("home_properties_first") && <PropertyGrid />}
        </div>
        {isEnabled("home_telegram") && <TelegramSection />}
        {isEnabled("home_properties_second") && (
          <div className="content-container">
            <PropertyGrid variant="second" />
          </div>
        )}
        {isEnabled("home_how_it_works") && <HowItWorks />}
        {isEnabled("home_map") && <InvestmentMap />}
        {isEnabled("home_news") && <NewsSection />}
        {isEnabled("home_blog") && <BlogSection />}
        {isEnabled("home_testimonials") && <TestimonialsSection />}
        <div className="content-container">
          <FAQSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
