import { Sparkles, FileText, Globe, Search, DollarSign } from "lucide-react";

const steps = [
  { icon: Sparkles, label: "IA" },
  { icon: FileText, label: "Conteúdo" },
  { icon: Globe, label: "WordPress" },
  { icon: Search, label: "Google" },
  { icon: DollarSign, label: "Receita" },
];

const AutomationFlow = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[80px]" />
      
      {/* Main container */}
      <div className="relative rounded-3xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm">
        {/* Pipeline track */}
        <div className="relative">
          {/* Animated track line */}
          <div className="absolute top-8 left-8 right-8 h-0.5 bg-border/30 rounded-full overflow-hidden">
            {/* Flowing animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-flow" />
          </div>
          
          {/* Steps */}
          <div className="relative flex items-start justify-between">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative flex flex-col items-center gap-3"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon node */}
                <div className="relative">
                  {/* Pulse ring */}
                  <div 
                    className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring"
                    style={{ animationDelay: `${index * 300}ms` }}
                  />
                  
                  {/* Icon container */}
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-background shadow-lg shadow-primary/10 transition-all duration-300 hover:border-primary hover:shadow-primary/20 hover:scale-110">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  {/* Connection dot */}
                  {index < steps.length - 1 && (
                    <div 
                      className="absolute top-1/2 -right-2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary animate-dot-pulse"
                      style={{ animationDelay: `${index * 200}ms` }}
                    />
                  )}
                </div>
                
                {/* Label */}
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 24/7 indicator */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-foreground">Rodando 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationFlow;
