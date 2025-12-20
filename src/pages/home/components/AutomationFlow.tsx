import { Sparkles, FileText, Globe, TrendingUp, DollarSign } from "lucide-react";

const steps = [
  {
    icon: Sparkles,
    label: "IA",
    description: "Geração inteligente",
    color: "from-violet-500 to-primary",
  },
  {
    icon: FileText,
    label: "Conteúdo",
    description: "Artigos otimizados",
    color: "from-primary to-blue-500",
  },
  {
    icon: Globe,
    label: "WordPress",
    description: "Publicação automática",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    label: "Google",
    description: "Indexação e SEO",
    color: "from-cyan-500 to-emerald-500",
  },
  {
    icon: DollarSign,
    label: "Receita",
    description: "Monetização AdSense",
    color: "from-emerald-500 to-green-500",
  },
];

const AutomationFlow = () => {
  return (
    <div className="relative">
      {/* Glow effect behind */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
      
      {/* Main container */}
      <div className="relative rounded-3xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm shadow-xl">
        {/* Flow steps */}
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="absolute left-7 top-14 h-8 w-0.5 bg-gradient-to-b from-primary/50 to-primary/20" />
              )}
              
              {/* Step card */}
              <div 
                className="flex items-center gap-4 rounded-2xl border border-border/50 bg-background/80 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon container */}
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                
                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{step.label}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Arrow indicator */}
                {index < steps.length - 1 && (
                  <div className="text-muted-foreground/50">
                    <svg className="h-5 w-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}

                {/* Success indicator for last step */}
                {index === steps.length - 1 && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border/50 pt-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gradient">24/7</p>
            <p className="text-xs text-muted-foreground">Funcionamento</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gradient">100%</p>
            <p className="text-xs text-muted-foreground">Automatizado</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gradient">∞</p>
            <p className="text-xs text-muted-foreground">Escalável</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationFlow;
