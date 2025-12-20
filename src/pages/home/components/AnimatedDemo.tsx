import { useState, useEffect } from "react";
import adsenseIcon from "@/assets/adsense-icon.png";

const AnimatedDemo = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 6);
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto">
      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" />
      
      {/* Main container - Browser mockup with floating animation */}
      <div className="relative h-full w-full rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl overflow-hidden animate-float-card">
        {/* Browser header */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="h-6 rounded-md bg-background/60 flex items-center px-3">
              <span className="text-[10px] text-muted-foreground">automaticpress.com/dashboard</span>
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="relative h-[calc(100%-48px)] p-6 flex flex-col">
          {/* Step 0-1: Generate Article */}
          <div className={`absolute inset-6 flex flex-col items-center justify-center transition-all duration-700 ${step <= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {/* Generate button */}
            <div className={`relative transition-all duration-500 ${step === 1 ? 'scale-95' : 'scale-100'}`}>
              <button 
                className={`
                  relative px-8 py-4 rounded-xl font-bold text-lg
                  bg-gradient-to-r from-primary to-violet-500 text-white
                  shadow-lg shadow-primary/30
                  transition-all duration-300
                  ${step === 1 ? 'shadow-xl shadow-primary/50' : ''}
                `}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Gerar Artigo
                </span>
                
                {/* Click ripple effect */}
                {step === 1 && (
                  <span className="absolute inset-0 rounded-xl animate-ping bg-white/30" />
                )}
              </button>
              
              {/* Mouse cursor - larger and more animated */}
              <div 
                className={`
                  absolute z-50 transition-all ease-out
                  ${step === 0 ? 'right-[-60px] bottom-[-50px] opacity-100 duration-1000' : ''}
                  ${step === 1 ? 'right-[15px] bottom-[5px] opacity-100 duration-500 scale-90' : ''}
                  ${step >= 2 ? 'right-[15px] bottom-[5px] opacity-0 duration-300' : ''}
                `}
              >
                <svg className="w-14 h-14 drop-shadow-2xl" viewBox="0 0 24 24" fill="none">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-5.02h7.29c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 00-.85.35z" fill="#1a1a1a" stroke="#fff" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
            
            <p className="mt-6 text-sm text-muted-foreground text-center">
              Clique para gerar conteúdo com IA
            </p>
          </div>
          
          {/* Step 2: Article Generated */}
          <div className={`absolute inset-6 flex flex-col transition-all duration-700 ${step === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {/* Article preview */}
            <div className="flex-1 rounded-xl border border-border/50 bg-background/60 p-4 overflow-hidden">
              <div className="animate-typing">
                <div className="h-6 w-3/4 bg-foreground/80 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-muted-foreground/30 rounded animate-fade-line-1" />
                  <div className="h-3 w-full bg-muted-foreground/30 rounded animate-fade-line-2" />
                  <div className="h-3 w-5/6 bg-muted-foreground/30 rounded animate-fade-line-3" />
                  <div className="h-3 w-full bg-muted-foreground/30 rounded animate-fade-line-4" />
                  <div className="h-3 w-4/5 bg-muted-foreground/30 rounded animate-fade-line-5" />
                </div>
              </div>
              
              {/* Quality badge */}
              <div className="absolute top-10 right-10 flex items-center gap-1 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 animate-bounce-in">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-medium text-green-600">Alta Qualidade</span>
              </div>
            </div>
            
            <p className="mt-4 text-center text-sm text-muted-foreground">
              ✨ Artigo SEO otimizado gerado!
            </p>
          </div>
          
          {/* Step 3: Publish to WordPress */}
          <div className={`absolute inset-6 flex flex-col items-center justify-center transition-all duration-700 ${step === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="relative">
              {/* Publish button */}
              <button className="px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 text-white shadow-lg shadow-blue-500/30 animate-pulse">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Publicar
                </span>
                <span className="absolute inset-0 rounded-xl animate-ping bg-blue-400/30" />
              </button>
              
              {/* Mouse cursor clicking - larger */}
              <div className="absolute right-[10px] bottom-[0px] z-50 animate-cursor-click">
                <svg className="w-14 h-14 drop-shadow-2xl" viewBox="0 0 24 24" fill="none">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-5.02h7.29c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 00-.85.35z" fill="#1a1a1a" stroke="#fff" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
            
            <p className="mt-6 text-sm text-muted-foreground text-center">
              Enviando para WordPress...
            </p>
          </div>
          
          {/* Step 4: WordPress Published */}
          <div className={`absolute inset-6 flex flex-col items-center justify-center transition-all duration-700 ${step === 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {/* WordPress logo with success */}
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30 animate-scale-in">
                <svg viewBox="0 0 24 24" className="w-16 h-16" fill="white">
                  <path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.051-.18 2.986-.517-.024-.038-.046-.078-.066-.12l-2.762-7.568zM3.009 12c0 3.559 2.068 6.634 5.067 8.092L4.144 8.756A8.953 8.953 0 003.009 12zm15.614-1.608c0-1.109-.398-1.877-.74-2.474-.455-.74-.882-1.365-.882-2.105 0-.825.626-1.593 1.509-1.593.04 0 .078.005.116.007A8.963 8.963 0 0012 3.009a8.987 8.987 0 00-7.524 4.078c.211.007.41.011.579.011.94 0 2.396-.114 2.396-.114.485-.028.542.684.057.74 0 0-.487.057-1.029.085l3.274 9.739 1.968-5.901-1.401-3.838c-.485-.028-.944-.085-.944-.085-.485-.029-.428-.768.057-.741 0 0 1.484.114 2.368.114.94 0 2.397-.114 2.397-.114.485-.028.543.684.057.74 0 0-.488.057-1.029.085l3.249 9.665.897-2.996c.388-1.242.684-2.133.684-2.902zm.643 10.521A8.963 8.963 0 0020.991 12c0-1.052-.181-2.062-.514-3.001l-3.211 9.314zM12 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
              </div>
              
              {/* Success checkmark */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <p className="mt-6 text-lg font-semibold text-foreground">Publicado!</p>
            <p className="text-sm text-muted-foreground">Artigo live no seu blog</p>
          </div>
          
          {/* Step 5: AdSense Monetization */}
          <div className={`absolute inset-6 flex flex-col items-center justify-center transition-all duration-700 ${step === 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {/* AdSense with money */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-white flex items-center justify-center shadow-xl shadow-amber-500/20 animate-scale-in border-2 border-amber-200">
                <img src={adsenseIcon} alt="Google AdSense" className="w-24 h-24 object-contain" />
              </div>
              
              {/* Floating money symbols */}
              <div className="absolute -top-4 -left-4 text-2xl animate-float-money-1">💰</div>
              <div className="absolute -top-2 -right-6 text-xl animate-float-money-2">💵</div>
              <div className="absolute -bottom-4 -left-6 text-xl animate-float-money-3">💰</div>
              <div className="absolute -bottom-2 -right-4 text-2xl animate-float-money-4">💵</div>
              
              {/* Active badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce-in whitespace-nowrap">
                ATIVO
              </div>
            </div>
            
            <p className="mt-6 text-lg font-semibold text-gradient">Monetização Ativa!</p>
            <p className="text-sm text-muted-foreground">AdSense gerando receita 24/7</p>
            
            {/* Revenue counter */}
            <div className="mt-4 flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
              <span className="text-green-600 font-mono font-bold animate-pulse">+ R$ 0,47</span>
              <span className="text-xs text-green-600/70">agora</span>
            </div>
          </div>
          
          {/* Progress dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === i ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'
                }`} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedDemo;
