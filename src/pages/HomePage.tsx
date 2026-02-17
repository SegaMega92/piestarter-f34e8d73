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

const HomePage = () => {
  return (
    <div className="min-h-screen bg-bg-main overflow-x-hidden">
      <Header />
      <main>
        <CategoriesFilter />
        <div className="content-container">
          <HeroSection />
          <FeaturedProperty />
          <PropertyGrid />
        </div>
        <TelegramSection />
        <div className="content-container">
          <PropertyGrid variant="second" />
        </div>
        <HowItWorks />
        <InvestmentMap />
        <NewsSection />
        <BlogSection />
        <TestimonialsSection />
        <div className="content-container">
          <FAQSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
