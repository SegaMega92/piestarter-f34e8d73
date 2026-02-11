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

const Index = () => {
  return (
    <div className="min-h-screen bg-bg-main">
      <Header />
      <main>
        <PropertyHero />
        <PropertyStats />
        <PhotoGallery />
        <PropertyDetails />
        <LocationSection />
        <FinancialSection />
        <SimilarProperties />
        <FAQSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
