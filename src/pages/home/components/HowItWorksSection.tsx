import { useEffect, useRef, useState } from "react";
import { 
  Link2, 
  Settings2, 
  Brain, 
  Rocket, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import {
  WordPressIllustration,
  CategoriesIllustration,
  AIWritingIllustration,
  PublishIllustration,
  ScaleIllustration
} from "./StepIllustrations";

const steps = [
  {
    number: "01",
    title: "Conecte seu WordPress",
    description: "Integração simples e segura com seu site.",
    icon: Link2,
    illustration: WordPressIllustration,
  },
  {
    number: "02",
    title: "Defina categorias e frequência",
    description: "Você escolhe os temas e o ritmo de publicação.",
    icon: Settings2,
    illustration: CategoriesIllustration,
  },
  {
    number: "03",
    title: "A IA cria os artigos",
    description: "Conteúdo estruturado, informativo e otimizado.",
    icon: Brain,
    illustration: AIWritingIllustration,
  },
  {
    number: "04",
    title: "Publicação automática",
    description: "Os posts entram no ar sozinhos, no horário certo.",
    icon: Rocket,
    illustration: PublishIllustration,
  },
  {
    number: "05",
    title: "Escala e monetização",
    description: "Seu site cresce com consistência e SEO.",
    icon: TrendingUp,
    illustration: ScaleIllustration,
  },
];

const HowItWorksSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate steps sequentially
          steps.forEach((_, index) => {
            setTimeout(() => {
              setActiveStep(prev => Math.max(prev, index));
            }, 400 + index * 300);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Como Funciona
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Como a AutomaticPress funciona
            <br />
            <span className="text-gradient">na prática</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Do setup inicial à monetização, tudo automatizado em 5 passos simples.
          </p>
        </div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line */}
            <div className="absolute top-[140px] left-0 right-0 h-0.5 bg-border">
              <div 
                className="h-full bg-gradient-to-r from-primary via-primary to-primary/50 transition-all duration-1000 ease-out"
                style={{ 
                  width: activeStep >= 4 ? '100%' : activeStep >= 0 ? `${(activeStep + 1) * 20}%` : '0%'
                }}
              />
              {/* Traveling particle */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg transition-all duration-700 ease-out"
                style={{ 
                  left: activeStep >= 4 ? '100%' : activeStep >= 0 ? `${(activeStep + 1) * 20}%` : '0%',
                  boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)',
                  opacity: activeStep >= 0 ? 1 : 0
                }}
              />
            </div>

            {/* Steps */}
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <StepCard 
                  key={index}
                  step={step}
                  index={index}
                  isActive={index <= activeStep}
                  isCurrentlyAnimating={index === activeStep}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Timeline - Vertical */}
        <div className="lg:hidden">
          <div className="relative max-w-md mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border">
              <div 
                className="w-full bg-gradient-to-b from-primary via-primary to-primary/50 transition-all duration-1000 ease-out"
                style={{ 
                  height: activeStep >= 4 ? '100%' : activeStep >= 0 ? `${(activeStep + 1) * 20}%` : '0%'
                }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <MobileStepCard 
                  key={index}
                  step={step}
                  index={index}
                  isActive={index <= activeStep}
                  isCurrentlyAnimating={index === activeStep}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-muted-foreground mb-4">
            Pronto para automatizar seu blog?
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors group">
            Começar Agora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Desktop Step Card with Illustration
const StepCard = ({ 
  step, 
  index, 
  isActive,
  isCurrentlyAnimating,
  isVisible 
}: { 
  step: typeof steps[0]; 
  index: number;
  isActive: boolean;
  isCurrentlyAnimating: boolean;
  isVisible: boolean;
}) => {
  const Icon = step.icon;
  const Illustration = step.illustration;
  
  return (
    <div 
      className={`relative pt-8 transition-all duration-500`}
      style={{ 
        transitionDelay: `${300 + index * 100}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      {/* Illustration Area */}
      <div 
        className={`mb-4 h-20 rounded-xl overflow-hidden relative transition-all duration-500 ${
          isActive 
            ? 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20' 
            : 'bg-muted/50 border border-border/50'
        }`}
      >
        <Illustration isActive={isCurrentlyAnimating || isActive} />
      </div>

      {/* Node */}
      <div className="flex justify-center mb-4">
        <div 
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            isActive 
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
              : 'bg-muted text-muted-foreground'
          }`}
        >
          <Icon className="w-6 h-6" />
          
          {/* Number badge */}
          <span 
            className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 ${
              isActive 
                ? 'bg-background text-primary border-2 border-primary' 
                : 'bg-muted-foreground/20 text-muted-foreground'
            }`}
          >
            {index + 1}
          </span>

          {/* Glow effect when active */}
          {isCurrentlyAnimating && (
            <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" style={{ animationDuration: '1.5s' }} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="text-center px-2">
        <h3 className={`font-semibold mb-2 transition-colors duration-300 text-sm ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
          {step.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
};

// Mobile Step Card with Illustration
const MobileStepCard = ({ 
  step, 
  index, 
  isActive,
  isCurrentlyAnimating,
  isVisible 
}: { 
  step: typeof steps[0]; 
  index: number;
  isActive: boolean;
  isCurrentlyAnimating: boolean;
  isVisible: boolean;
}) => {
  const Icon = step.icon;
  const Illustration = step.illustration;
  
  return (
    <div 
      className={`relative pl-20 transition-all duration-500`}
      style={{ 
        transitionDelay: `${300 + index * 100}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
      }}
    >
      {/* Node */}
      <div 
        className={`absolute left-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
          isActive 
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
            : 'bg-muted text-muted-foreground'
        }`}
      >
        <Icon className="w-7 h-7" />
        
        {/* Number badge */}
        <span 
          className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 ${
            isActive 
              ? 'bg-background text-primary border-2 border-primary' 
              : 'bg-muted-foreground/20 text-muted-foreground'
          }`}
        >
          {index + 1}
        </span>

        {/* Glow effect when active */}
        {isCurrentlyAnimating && (
          <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" style={{ animationDuration: '1.5s' }} />
        )}
      </div>

      {/* Content with Illustration */}
      <div className="py-2">
        {/* Illustration Area */}
        <div 
          className={`mb-3 h-20 rounded-xl overflow-hidden relative transition-all duration-500 ${
            isActive 
              ? 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20' 
              : 'bg-muted/50 border border-border/50'
          }`}
        >
          <Illustration isActive={isCurrentlyAnimating || isActive} />
        </div>

        <h3 className={`font-semibold mb-1 transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default HowItWorksSection;
