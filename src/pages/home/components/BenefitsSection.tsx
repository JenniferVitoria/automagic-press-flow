import { useEffect, useRef, useState } from "react";
import { RefreshCw, Clock, FolderOpen, Layers, Activity } from "lucide-react";

const benefits = [
  {
    icon: RefreshCw,
    title: "Publicação automática e recorrente",
    description: "Artigos publicados automaticamente no horário ideal"
  },
  {
    icon: Clock,
    title: "Economia de tempo e esforço",
    description: "Libere horas da sua rotina para focar no que importa"
  },
  {
    icon: FolderOpen,
    title: "Conteúdo organizado por categoria",
    description: "Artigos estruturados e distribuídos por nicho"
  },
  {
    icon: Layers,
    title: "Ideal para múltiplos sites",
    description: "Gerencie vários blogs a partir de um único painel"
  },
  {
    icon: Activity,
    title: "Processo contínuo e previsível",
    description: "Fluxo constante de conteúdo, sem surpresas"
  }
];

const BenefitCard = ({ 
  benefit, 
  index, 
  isVisible 
}: { 
  benefit: typeof benefits[0]; 
  index: number; 
  isVisible: boolean;
}) => {
  const Icon = benefit.icon;
  
  return (
    <div
      className={`
        group relative bg-background/80 backdrop-blur-sm border border-border/50 
        rounded-2xl p-5 sm:p-6 transition-all duration-500
        hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
        }
      `}
      style={{ 
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
      }}
    >
      {/* Icon container */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
      </div>
      
      {/* Content */}
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
        {benefit.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {benefit.description}
      </p>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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

        {/* Benefits grid - 3 cards on top, 2 centered below */}
        <div className="max-w-5xl mx-auto">
          {/* First row - 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {benefits.slice(0, 3).map((benefit, index) => (
              <BenefitCard 
                key={benefit.title} 
                benefit={benefit} 
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
          
          {/* Second row - 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {benefits.slice(3).map((benefit, index) => (
              <BenefitCard 
                key={benefit.title} 
                benefit={benefit} 
                index={index + 3}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
