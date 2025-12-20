import { useRef, useState, useEffect } from "react";
import { Globe, FileText, CalendarCheck, Search, Check, DollarSign, TrendingUp, CheckCircle } from "lucide-react";
import adsenseIcon from "@/assets/adsense-icon.png";

const highlights = [
  { icon: Globe, text: "Estrutura amigável ao Google" },
  { icon: FileText, text: "Conteúdo informativo e útil" },
  { icon: CalendarCheck, text: "Consistência de publicações" },
  { icon: Search, text: "SEO aplicado automaticamente" },
];

const barHeights = [40, 55, 45, 70, 90];

const AdSenseIllustration = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Main card */}
      <div className="relative bg-gradient-to-br from-background to-muted/30 border border-border/50 rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        
        {/* Chart container */}
        <div className="relative z-10">
          {/* AdSense icon centered */}
          <div className="flex justify-center mb-6">
            <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <img 
                src={adsenseIcon} 
                alt="Google AdSense"
                className="relative w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
            </div>
          </div>
          
          {/* Bar chart */}
          <div className="flex items-end justify-center gap-2 sm:gap-3 h-32 sm:h-40 mb-4">
            {barHeights.map((height, i) => (
              <div 
                key={i}
                className="w-8 sm:w-10 bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-700 ease-out shadow-lg"
                style={{ 
                  height: isVisible ? `${height}%` : '0%',
                  transitionDelay: `${i * 100 + 300}ms`
                }}
              />
            ))}
          </div>
          
          {/* Trend line indicator */}
          <div className={`flex items-center justify-center gap-2 text-green-500 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-semibold">+127% crescimento</span>
          </div>
        </div>
        
        {/* Floating checks */}
        <div className={`absolute top-4 right-4 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} style={{ transitionDelay: '600ms' }}>
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
        <div className={`absolute top-12 left-4 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} style={{ transitionDelay: '700ms' }}>
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
        <div className={`absolute bottom-16 right-6 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} style={{ transitionDelay: '800ms' }}>
          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
        
        {/* Floating money cards */}
        <div 
          className={`absolute top-8 left-8 bg-green-500/10 border border-green-500/20 rounded-lg px-2 py-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '900ms', animation: isVisible ? 'float 3s ease-in-out infinite' : 'none' }}
        >
          <DollarSign className="w-4 h-4 text-green-500" />
        </div>
        <div 
          className={`absolute bottom-24 left-6 bg-green-500/10 border border-green-500/20 rounded-lg px-2 py-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1000ms', animation: isVisible ? 'float 3s ease-in-out infinite 0.5s' : 'none' }}
        >
          <span className="text-xs font-bold text-green-500">$$$</span>
        </div>
        <div 
          className={`absolute top-20 right-8 bg-green-500/10 border border-green-500/20 rounded-lg px-2 py-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1100ms', animation: isVisible ? 'float 3s ease-in-out infinite 1s' : 'none' }}
        >
          <span className="text-xs font-bold text-green-500">+$</span>
        </div>
      </div>
    </div>
  );
};

const AdSenseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      className="py-12 sm:py-16 md:py-24 overflow-hidden relative"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Monetização</span>
          </div>
          
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
            Conteúdo pensado para monetização com{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">AdSense</span>
          </h2>
        </div>

        {/* Two columns layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Illustration - appears first on mobile */}
          <div className={`order-first lg:order-last transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '200ms' }}>
            <AdSenseIllustration isVisible={isVisible} />
          </div>
          
          {/* Text column */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '300ms' }}>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
              A AutomaticPress não gera textos aleatórios. O conteúdo é estruturado para{" "}
              <span className="text-foreground font-medium">informar, reter leitores</span> e atender boas práticas que facilitam a monetização via Google AdSense.
            </p>
            
            {/* Highlights list */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div 
                    key={highlight.text}
                    className={`
                      group relative flex items-center gap-4 p-4 rounded-2xl 
                      bg-gradient-to-r from-muted/50 to-muted/20
                      backdrop-blur-sm
                      border border-border/40
                      transition-all duration-500 ease-out
                      hover:border-green-500/50 
                      hover:shadow-lg hover:shadow-green-500/10
                      hover:-translate-y-1
                      ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-8 scale-95'}
                    `}
                    style={{ transitionDelay: `${400 + index * 150}ms` }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon container with glow */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-green-500/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl flex items-center justify-center border border-green-500/20 group-hover:border-green-500/40 transition-all duration-300 group-hover:rotate-6">
                        <Icon className="w-6 h-6 text-green-500 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>
                    
                    {/* Text */}
                    <span className="relative text-foreground font-medium text-base sm:text-lg">
                      {highlight.text}
                    </span>
                    
                    {/* Animated check with glow */}
                    <div 
                      className={`
                        relative ml-auto flex-shrink-0
                        transition-all duration-500
                        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                      `}
                      style={{ transitionDelay: `${700 + index * 150}ms` }}
                    >
                      <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-50 animate-pulse" />
                      <div className="relative w-7 h-7 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
};

export default AdSenseSection;
