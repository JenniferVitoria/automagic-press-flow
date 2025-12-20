import { useEffect, useRef, useState } from "react";
import { RefreshCw, Clock, FolderOpen, Layers, Activity, LucideIcon } from "lucide-react";
import "./BenefitsCard.css";

const benefits = [
  {
    icon: RefreshCw,
    title: "Publicação automática",
    description: "Artigos publicados automaticamente no horário ideal"
  },
  {
    icon: Clock,
    title: "Economia de tempo",
    description: "Libere horas da sua rotina para focar no que importa"
  },
  {
    icon: FolderOpen,
    title: "Conteúdo organizado",
    description: "Artigos estruturados e distribuídos por nicho"
  },
  {
    icon: Layers,
    title: "Múltiplos sites",
    description: "Gerencie vários blogs a partir de um único painel"
  },
  {
    icon: Activity,
    title: "Processo previsível",
    description: "Fluxo constante de conteúdo, sem surpresas"
  }
];

interface BenefitCardProps {
  benefit: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
  isVisible: boolean;
  inverted?: boolean;
}

const BenefitCard = ({ benefit, index, isVisible, inverted = false }: BenefitCardProps) => {
  const Icon = benefit.icon;
  
  return (
    <div 
      className={`benefit-parent ${inverted ? 'inverted' : ''} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
    >
      <div className="benefit-card">
        {/* Logo circles */}
          <div className="benefit-logo">
            <span className="benefit-circle benefit-circle1" />
            <span className="benefit-circle benefit-circle2" />
            <span className="benefit-circle benefit-circle3" />
            <span className="benefit-circle benefit-circle4" />
            <span className="benefit-circle benefit-circle5">
              <Icon className="benefit-icon w-5 h-5" />
            </span>
          </div>
        
        {/* Glass effect */}
        <div className="benefit-glass" />
        
        {/* Content */}
        <div className="benefit-content">
          <span className="benefit-title">{benefit.title}</span>
          <span className="benefit-text">{benefit.description}</span>
        </div>
      </div>
    </div>
  );
};

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-24 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary/10 text-primary mb-4 sm:mb-6">
            Benefícios
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Automação real para quem quer{" "}
            <span className="block sm:inline text-primary">escalar</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para transformar seu blog em uma máquina de conteúdo
          </p>
        </div>

        {/* Benefits grid */}
        <div className="max-w-4xl mx-auto">
          {/* First row - 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-4 sm:mb-5 justify-items-center">
            {benefits.slice(0, 3).map((benefit, index) => (
              <BenefitCard 
                key={benefit.title} 
                benefit={benefit} 
                index={index}
                isVisible={isVisible}
                inverted={false}
              />
            ))}
          </div>
          
          {/* Second row - 2 cards centered and inverted */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 max-w-xl sm:max-w-2xl mx-auto justify-items-center">
            {benefits.slice(3).map((benefit, index) => (
              <BenefitCard 
                key={benefit.title} 
                benefit={benefit} 
                index={index + 3}
                isVisible={isVisible}
                inverted={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
