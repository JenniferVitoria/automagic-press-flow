import { useRef, useState, useEffect } from "react";
import { Globe, FileText, CalendarCheck, Search, CheckCircle, DollarSign, TrendingUp } from "lucide-react";
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
          {/* Left column - Text */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '200ms' }}>
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
                    className={`flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-border/30 transition-all duration-500 hover:bg-muted/50 hover:border-green-500/30 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-foreground font-medium">{highlight.text}</span>
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right column - Illustration */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '400ms' }}>
            <AdSenseIllustration isVisible={isVisible} />
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
