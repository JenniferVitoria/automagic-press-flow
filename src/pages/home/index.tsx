import { Helmet } from "react-helmet-async";
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
      <main className="min-h-screen bg-background">
        <HeroSection />
      </main>
    </>
  );
};

export default HomePage;
