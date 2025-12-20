import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "./components/HeroSection";
import PainSection from "./components/PainSection";
import HowItWorksSection from "./components/HowItWorksSection";
import BenefitsSection from "./components/BenefitsSection";
import AdSenseSection from "./components/AdSenseSection";

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
        <HeroSection />
        <PainSection />
        <HowItWorksSection />
        <BenefitsSection />
        <AdSenseSection />
      </main>
    </>
  );
};

export default HomePage;
