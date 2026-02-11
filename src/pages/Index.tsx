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
    <div className="min-h-screen bg-bg-main overflow-x-hidden">
      <Header />
      <main>
        <div className="content-container">
          <PropertyHero />
          <PropertyStats />
          <PhotoGallery />
          <PropertyDetails />
          <LocationSection />
        </div>
        <FinancialSection />
        <div className="content-container">
          <SimilarProperties />
          <FAQSection />
        </div>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
