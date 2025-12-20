import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import AutomationFlow from "./AutomationFlow";

const bulletPoints = [
  "Postagens automáticas e recorrentes",
  "Conteúdo focado em SEO e AdSense",
  "Ideal para quem quer escalar blogs",
  "Sem trabalho manual repetitivo",
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col items-center justify-center py-20 lg:flex-row lg:gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Automatização inteligente para WordPress
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in-up">
              Automatize conteúdos, publique todos os dias e{" "}
              <span className="text-gradient">monetize com AdSense</span>{" "}
              no piloto automático
            </h1>

            {/* Subheadline */}
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl animate-fade-in-up animation-delay-100">
              A AutomaticPress cria, agenda e publica artigos otimizados para 
              monetização em blogs WordPress, de forma rápida, segura e escalável.
            </p>

            {/* Bullet points */}
            <ul className="mb-10 space-y-3 animate-fade-in-up animation-delay-200">
              {bulletPoints.map((point, index) => (
                <li 
                  key={index} 
                  className="flex items-center justify-center gap-3 text-muted-foreground lg:justify-start"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start animate-fade-in-up animation-delay-300">
              <Button variant="hero" size="lg" className="group">
                Quero automatizar meu blog
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="heroOutline" size="lg">
                Ver como funciona
              </Button>
            </div>
          </div>

          {/* Right content - Flow visualization */}
          <div className="mt-16 flex-1 lg:mt-0 animate-fade-in-up animation-delay-400">
            <AutomationFlow />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
