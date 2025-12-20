import { useEffect, useRef, useState } from "react";
import { 
  Clock, 
  ListTodo, 
  AlertCircle, 
  Zap, 
  TrendingUp, 
  CheckCircle,
  FileText,
  Brain,
  Sparkles
} from "lucide-react";

const PainSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
      className="py-24 bg-gradient-to-b from-muted/40 via-muted/20 to-background relative overflow-hidden"
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Criar conteúdo manualmente é lento.
            <br />
            <span className="text-muted-foreground">Blog sem consistência não monetiza.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Produzir artigos com frequência, otimizar SEO e ainda pensar em monetização 
            exige tempo e processo. Sem consistência, o blog não cresce — e o AdSense 
            demora ou nem chega.
          </p>
        </div>

        {/* Comparative Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Left Card - Situação Atual */}
          <div 
            className={`bg-background rounded-2xl p-8 border border-destructive/20 shadow-lg relative overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Subtle red gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/[0.03] to-transparent rounded-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Situação Atual</h3>
              </div>

              {/* Animated Problem Items */}
              <div className="space-y-4">
                <ProblemItem 
                  icon={Clock} 
                  text="Horas criando um único artigo" 
                  delay={0.3}
                  isVisible={isVisible}
                />
                <ProblemItem 
                  icon={ListTodo} 
                  text="Lista de tarefas infinita" 
                  delay={0.4}
                  isVisible={isVisible}
                />
                <ProblemItem 
                  icon={FileText} 
                  text="Publicação inconsistente" 
                  delay={0.5}
                  isVisible={isVisible}
                />
              </div>

              {/* Animated Metrics */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard 
                    label="Posts/mês" 
                    value="2-4" 
                    trend="down" 
                    isVisible={isVisible}
                    delay={0.6}
                  />
                  <MetricCard 
                    label="Tempo gasto" 
                    value="+20h" 
                    trend="down" 
                    isVisible={isVisible}
                    delay={0.7}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Com AutomaticPress */}
          <div 
            className={`bg-background rounded-2xl p-8 border border-primary/30 shadow-lg relative overflow-hidden transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Subtle primary gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent rounded-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Com AutomaticPress</h3>
              </div>

              {/* Animated Solution Items */}
              <div className="space-y-4">
                <SolutionItem 
                  icon={Brain} 
                  text="IA cria artigos otimizados" 
                  delay={0.4}
                  isVisible={isVisible}
                />
                <SolutionItem 
                  icon={Zap} 
                  text="Publicação automática diária" 
                  delay={0.5}
                  isVisible={isVisible}
                />
                <SolutionItem 
                  icon={TrendingUp} 
                  text="Crescimento consistente" 
                  delay={0.6}
                  isVisible={isVisible}
                />
              </div>

              {/* Animated Metrics */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard 
                    label="Posts/mês" 
                    value="30+" 
                    trend="up" 
                    isVisible={isVisible}
                    delay={0.7}
                  />
                  <MetricCard 
                    label="Tempo gasto" 
                    value="~2h" 
                    trend="up" 
                    isVisible={isVisible}
                    delay={0.8}
                  />
                </div>
              </div>
            </div>

            {/* Flowing animation indicator */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-arrow-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Problem Item Component
const ProblemItem = ({ 
  icon: Icon, 
  text, 
  delay, 
  isVisible 
}: { 
  icon: React.ElementType; 
  text: string; 
  delay: number;
  isVisible: boolean;
}) => (
  <div 
    className={`flex items-center gap-3 transition-all duration-500`}
    style={{ 
      transitionDelay: `${delay}s`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
    }}
  >
    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-destructive" />
    </div>
    <span className="text-muted-foreground">{text}</span>
  </div>
);

// Solution Item Component
const SolutionItem = ({ 
  icon: Icon, 
  text, 
  delay, 
  isVisible 
}: { 
  icon: React.ElementType; 
  text: string; 
  delay: number;
  isVisible: boolean;
}) => (
  <div 
    className={`flex items-center gap-3 transition-all duration-500`}
    style={{ 
      transitionDelay: `${delay}s`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
    }}
  >
    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <div className="flex items-center gap-2">
      <CheckCircle className="w-4 h-4 text-primary" />
      <span className="text-foreground">{text}</span>
    </div>
  </div>
);

// Metric Card Component
const MetricCard = ({ 
  label, 
  value, 
  trend, 
  isVisible,
  delay 
}: { 
  label: string; 
  value: string; 
  trend: 'up' | 'down';
  isVisible: boolean;
  delay: number;
}) => (
  <div 
    className={`p-3 rounded-lg transition-all duration-500 ${
      trend === 'up' 
        ? 'bg-primary/5 border border-primary/10' 
        : 'bg-destructive/5 border border-destructive/10'
    }`}
    style={{ 
      transitionDelay: `${delay}s`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.9)'
    }}
  >
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className={`text-xl font-bold ${trend === 'up' ? 'text-primary' : 'text-destructive'}`}>
      {value}
    </p>
  </div>
);

export default PainSection;
