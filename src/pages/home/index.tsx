import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "./components/HeroSection";

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
      </main>
    </>
  );
};

export default HomePage;
