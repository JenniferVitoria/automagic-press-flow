import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import AnimatedDemo from "./AnimatedDemo";

const bulletPoints = [
  "100% automatizado",
  "SEO + AdSense",
  "Escalável",
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
              Automatize conteúdos e{" "}
              <span className="text-gradient">monetize com AdSense</span>
            </h1>

            {/* Subheadline */}
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl animate-fade-in-up animation-delay-100">
              Automação inteligente para blogs WordPress focados em SEO e monetização.
            </p>

            {/* Bullet points - micro labels */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start animate-fade-in-up animation-delay-200">
              {bulletPoints.map((point, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground"
                >
                  <Check className="h-3.5 w-3.5 text-primary" />
                  {point}
                </span>
              ))}
            </div>

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

          {/* Right content - Animated Demo */}
          <div className="mt-16 flex-1 lg:mt-0 animate-fade-in-up animation-delay-400">
            <AnimatedDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
