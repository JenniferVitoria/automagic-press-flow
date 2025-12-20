import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import PainSection from "./components/PainSection";
import HowItWorksSection from "./components/HowItWorksSection";
import BenefitsSection from "./components/BenefitsSection";
import AdSenseSection from "./components/AdSenseSection";
import PricingSection from "./components/PricingSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import CTAFinalSection from "./components/CTAFinalSection";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>AutomaticPress - Automatize seu blog WordPress com IA</title>
        <meta 
          name="description" 
          content="A AutomaticPress cria, agenda e publica artigos otimizados para monetização em blogs WordPress, de forma rápida, segura e escalável." 
        />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background pt-16">
        <section id="inicio">
          <HeroSection />
        </section>
        <PainSection />
        <section id="como-funciona">
          <HowItWorksSection />
        </section>
        <section id="beneficios">
          <BenefitsSection />
        </section>
        <AdSenseSection />
        <section id="precos">
          <PricingSection />
        </section>
        <TestimonialsSection />
        <section id="faq">
          <FAQSection />
        </section>
        <CTAFinalSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
