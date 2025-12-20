import { useEffect, useRef, useState } from "react";
import { 
  Link2, 
  Settings2, 
  Brain, 
  Rocket, 
  TrendingUp,
  ArrowRight
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Conecte seu WordPress",
    description: "Integração simples e segura com seu site.",
    icon: Link2,
  },
  {
    number: "02",
    title: "Defina categorias e frequência",
    description: "Você escolhe os temas e o ritmo de publicação.",
    icon: Settings2,
  },
  {
    number: "03",
    title: "A IA cria os artigos",
    description: "Conteúdo estruturado, informativo e otimizado.",
    icon: Brain,
  },
  {
    number: "04",
    title: "Publicação automática",
    description: "Os posts entram no ar sozinhos, no horário certo.",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Escala e monetização",
    description: "Seu site cresce com consistência e SEO.",
    icon: TrendingUp,
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
            }, 300 + index * 200);
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
      className="py-12 sm:py-16 md:py-24 bg-background relative overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 px-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Como Funciona
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="block sm:inline">Como a AutomaticPress funciona</span>{" "}
            <span className="block sm:inline text-gradient">na prática</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Do setup inicial à monetização, tudo automatizado em 5 passos simples.
          </p>
        </div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-border">
              <div 
                className="h-full bg-gradient-to-r from-primary via-primary to-primary/50 transition-all duration-1000 ease-out"
                style={{ 
                  width: activeStep >= 4 ? '100%' : activeStep >= 0 ? `${(activeStep + 1) * 20}%` : '0%'
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
            <div className="space-y-8">
              {steps.map((step, index) => (
                <MobileStepCard 
                  key={index}
                  step={step}
                  index={index}
                  isActive={index <= activeStep}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 md:mt-16 px-4 transition-all duration-700 delay-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            Pronto para automatizar seu blog?
          </p>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors group">
            Começar Agora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Desktop Step Card
const StepCard = ({ 
  step, 
  index, 
  isActive,
  isVisible 
}: { 
  step: typeof steps[0]; 
  index: number;
  isActive: boolean;
  isVisible: boolean;
}) => {
  const Icon = step.icon;
  
  return (
    <div 
      className={`relative pt-8 transition-all duration-500`}
      style={{ 
        transitionDelay: `${300 + index * 100}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      {/* Node */}
      <div className="flex justify-center mb-6">
        <div 
          className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
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
          {isActive && (
            <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="text-center px-2">
        <h3 className={`font-semibold mb-2 transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
};

// Mobile Step Card
const MobileStepCard = ({ 
  step, 
  index, 
  isActive,
  isVisible 
}: { 
  step: typeof steps[0]; 
  index: number;
  isActive: boolean;
  isVisible: boolean;
}) => {
  const Icon = step.icon;
  
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
        {isActive && (
          <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
        )}
      </div>

      {/* Content */}
      <div className="py-2">
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
