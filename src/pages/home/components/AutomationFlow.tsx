import { Sparkles, FileText, Search, LucideIcon } from "lucide-react";

// WordPress SVG icon
const WordPressIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor">
    <path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.051-.18 2.986-.517-.024-.038-.046-.078-.066-.12l-2.762-7.568zM3.009 12c0 3.559 2.068 6.634 5.067 8.092L4.144 8.756A8.953 8.953 0 003.009 12zm15.614-1.608c0-1.109-.398-1.877-.74-2.474-.455-.74-.882-1.365-.882-2.105 0-.825.626-1.593 1.509-1.593.04 0 .078.005.116.007A8.963 8.963 0 0012 3.009a8.987 8.987 0 00-7.524 4.078c.211.007.41.011.579.011.94 0 2.396-.114 2.396-.114.485-.028.542.684.057.74 0 0-.487.057-1.029.085l3.274 9.739 1.968-5.901-1.401-3.838c-.485-.028-.944-.085-.944-.085-.485-.029-.428-.768.057-.741 0 0 1.484.114 2.368.114.94 0 2.397-.114 2.397-.114.485-.028.543.684.057.74 0 0-.488.057-1.029.085l3.249 9.665.897-2.996c.388-1.242.684-2.133.684-2.902zm.643 10.521A8.963 8.963 0 0020.991 12c0-1.052-.181-2.062-.514-3.001l-3.211 9.314zM12 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
  </svg>
);

// AdSense SVG icon
const AdSenseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H15v-.93zM15 6h3.24c.35.42.67.87.95 1.35L15 11.43V6zm0 7.57l5.11-5.11c.23.59.4 1.2.52 1.83L15 15.99v-2.42zm0 4.42l5.63-5.62c-.04.55-.12 1.09-.25 1.61L15 19.23v-1.24zm0 3.01v-.93h.92c-.3.35-.6.66-.92.93zm2.89-.93H15v-1.24l3.72-3.72c-.2.52-.45 1.02-.74 1.49l-3.83 3.47h.65c.38 0 .75-.03 1.12-.09l2.47-2.22c-.45.85-1.03 1.61-1.72 2.26l.22.05z"/>
  </svg>
);

interface Step {
  icon: LucideIcon | React.FC;
  label: string;
  subtext: string;
  color: string;
  borderColor: string;
}

const steps: Step[] = [
  { 
    icon: Sparkles, 
    label: "IA",
    subtext: "Geração",
    color: "bg-violet-600",
    borderColor: "border-violet-400",
  },
  { 
    icon: FileText, 
    label: "Conteúdo",
    subtext: "Artigos",
    color: "bg-primary",
    borderColor: "border-primary/60",
  },
  { 
    icon: WordPressIcon, 
    label: "WordPress",
    subtext: "Publicação",
    color: "bg-blue-600",
    borderColor: "border-blue-400",
  },
  { 
    icon: Search, 
    label: "Google",
    subtext: "SEO",
    color: "bg-emerald-600",
    borderColor: "border-emerald-400",
  },
  { 
    icon: AdSenseIcon, 
    label: "AdSense",
    subtext: "Receita",
    color: "bg-amber-500",
    borderColor: "border-amber-400",
  },
];

const AutomationFlow = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      
      {/* Main container */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-16 left-[10%] right-[10%] h-1 bg-gradient-to-r from-violet-500 via-primary to-amber-500 rounded-full opacity-30" />
        <div className="absolute top-16 left-[10%] right-[10%] h-1 overflow-hidden rounded-full">
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent animate-flow opacity-60" />
        </div>
        
        {/* Cards grid */}
        <div className="relative flex items-start justify-between gap-2 sm:gap-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index} 
                className="group flex flex-col items-center animate-card-appear"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Brutalist Card */}
                <div 
                  className={`
                    relative flex flex-col items-center justify-center
                    w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28
                    ${step.color} ${step.borderColor}
                    border-2 sm:border-[3px] rounded-xl
                    shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]
                    cursor-pointer overflow-hidden
                    transition-all duration-300 ease-out
                    hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rotate-1
                    hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8),12px_12px_20px_0px_rgba(99,102,241,0.15)]
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
                    before:translate-x-[-100%] before:skew-x-12
                    hover:before:translate-x-[200%] before:transition-transform before:duration-700
                  `}
                >
                  {/* Icon */}
                  <div className="text-white transition-all duration-300 group-hover:scale-90 group-hover:-translate-y-1">
                    {'displayName' in IconComponent || IconComponent.toString().includes('lucide') ? (
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8" />
                    ) : (
                      <IconComponent />
                    )}
                  </div>
                  
                  {/* Reveal text on hover */}
                  <div className="absolute bottom-1 sm:bottom-2 opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-10">
                    <span className="text-[10px] sm:text-xs font-medium text-white/90">{step.subtext}</span>
                  </div>
                </div>
                
                {/* Label below */}
                <span className="mt-2 sm:mt-3 text-[10px] sm:text-xs font-semibold text-foreground whitespace-nowrap transition-all duration-300 group-hover:text-primary">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* 24/7 indicator */}
        <div className="mt-8 sm:mt-12 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full border-2 border-primary/30 bg-primary/5 px-4 sm:px-6 py-2 sm:py-3 shadow-lg shadow-primary/5 transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-full w-full rounded-full bg-green-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-foreground">Loop infinito 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationFlow;
