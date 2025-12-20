import { useRef, useState, useEffect } from "react";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Plano Básico",
    icon: Zap,
    price: "49",
    cents: "90",
    period: "/mês",
    description: "Ideal para começar",
    features: [
      "50 artigos por mês",
      "Suporte por email",
      "1 site conectado",
      "Relatórios básicos"
    ],
    cta: "Começar agora",
    popular: false,
    highlighted: false
  },
  {
    name: "Plano Pro",
    icon: Sparkles,
    price: "79",
    cents: "90",
    period: "/mês",
    description: "O mais escolhido",
    features: [
      "100 artigos por mês",
      "Suporte prioritário",
      "5 sites conectados",
      "Agendamento automático",
      "Relatórios avançados"
    ],
    cta: "Testar 7 dias grátis",
    popular: true,
    highlighted: true
  },
  {
    name: "Plano Enterprise",
    icon: Crown,
    price: "197",
    cents: "00",
    period: "/mês",
    description: "Para grandes operações",
    features: [
      "Artigos ilimitados",
      "Suporte 24/7 dedicado",
      "Sites ilimitados",
      "Agendamento automático",
      "API de integração",
      "Gerente de conta"
    ],
    cta: "Falar com vendas",
    popular: false,
    highlighted: false
  }
];

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Planos flexíveis
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Planos simples e{" "}
            <span className="bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
              transparentes
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha o plano ideal para o seu crescimento. Todos incluem acesso à nossa IA avançada.
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isHighlighted = plan.highlighted;
            
            return (
              <div 
                key={plan.name}
                className={`
                  group relative rounded-3xl p-6 sm:p-8
                  transition-all duration-700 ease-out
                  ${isHighlighted 
                    ? 'bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white md:scale-105 shadow-2xl shadow-primary/30 z-10' 
                    : 'bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5'
                  }
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
                  hover:-translate-y-2
                `}
                style={{ transitionDelay: `${150 + index * 150}ms` }}
              >
                {/* Glow effect for highlighted */}
                {isHighlighted && (
                  <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl -z-10 animate-pulse" />
                )}
                
                {/* Popular badge */}
                {plan.popular && (
                  <div 
                    className={`
                      absolute -top-4 left-1/2 -translate-x-1/2 
                      px-4 py-1.5 
                      bg-white/20 backdrop-blur-md 
                      rounded-full border border-white/30
                      transition-all duration-500
                      ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                    `}
                    style={{ transitionDelay: '600ms' }}
                  >
                    <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      Mais Popular
                    </span>
                  </div>
                )}
                
                {/* Plan icon and name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center
                    transition-all duration-300 group-hover:rotate-6 group-hover:scale-110
                    ${isHighlighted 
                      ? 'bg-white/20' 
                      : 'bg-primary/10'
                    }
                  `}>
                    <Icon className={`w-5 h-5 ${isHighlighted ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${isHighlighted ? 'text-white' : 'text-foreground'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${isHighlighted ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {plan.description}
                    </p>
                  </div>
                </div>
                
                {/* Price */}
                <div className="mb-6 flex items-baseline gap-1">
                  <span className={`text-sm ${isHighlighted ? 'text-white/70' : 'text-muted-foreground'}`}>
                    R$
                  </span>
                  <span className={`text-5xl sm:text-6xl font-bold tracking-tight ${isHighlighted ? 'text-white' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-2xl font-bold ${isHighlighted ? 'text-white/90' : 'text-foreground'}`}>
                    ,{plan.cents}
                  </span>
                  <span className={`text-sm ml-1 ${isHighlighted ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {plan.period}
                  </span>
                </div>
                
                {/* Divider */}
                <div className={`h-px mb-6 ${isHighlighted ? 'bg-white/20' : 'bg-border'}`} />
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li 
                      key={i} 
                      className={`
                        flex items-center gap-3
                        transition-all duration-500
                        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                      `}
                      style={{ transitionDelay: `${400 + index * 100 + i * 50}ms` }}
                    >
                      <div className={`
                        w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                        ${isHighlighted 
                          ? 'bg-white/20' 
                          : 'bg-green-500/10'
                        }
                      `}>
                        <Check 
                          className={`w-3 h-3 ${isHighlighted ? 'text-white' : 'text-green-500'}`} 
                          strokeWidth={3} 
                        />
                      </div>
                      <span className={`text-sm ${isHighlighted ? 'text-white/90' : 'text-muted-foreground'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Button 
                  className={`
                    w-full transition-all duration-300
                    ${isHighlighted 
                      ? 'bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl' 
                      : 'hover:shadow-lg'
                    }
                  `}
                  variant={isHighlighted ? 'default' : 'outline'}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>
        
        {/* Bottom note */}
        <p 
          className={`
            text-center text-sm text-muted-foreground mt-10 
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ transitionDelay: '800ms' }}
        >
          Todos os planos incluem suporte técnico e atualizações gratuitas. Cancele quando quiser.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
