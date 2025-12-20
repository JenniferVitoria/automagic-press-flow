import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Zap, Coins, Banknote, CircleDollarSign, Sparkles, Star } from "lucide-react";
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
    <div className="relative w-full max-w-[600px] aspect-square mx-auto">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 rounded-full bg-primary/20 animate-particle-1 top-[10%] left-[15%]" />
        <div className="absolute w-3 h-3 rounded-full bg-violet-500/15 animate-particle-2 top-[20%] right-[20%]" />
        <div className="absolute w-2 h-2 rounded-full bg-primary/15 animate-particle-3 bottom-[30%] left-[10%]" />
        <div className="absolute w-2 h-2 rounded-full bg-amber-500/20 animate-particle-4 bottom-[20%] right-[15%]" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500/20 animate-particle-5 top-[50%] left-[5%]" />
        <div className="absolute w-2 h-2 rounded-full bg-primary/10 animate-particle-6 top-[40%] right-[8%]" />
      </div>

      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" />
      
      {/* Only 2 floating cards - smaller and positioned to the sides */}
      {/* Left side - Mais Tráfego */}
      <div className="absolute left-[-8%] top-[40%] -translate-y-1/2 z-10 animate-float-card-side-1">
        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/90 backdrop-blur-sm px-3 py-2 shadow-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/10">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Mais <span className="text-emerald-500">Tráfego</span></p>
            <span className="text-[10px] font-medium text-emerald-600">+384%</span>
          </div>
        </div>
      </div>
      
      {/* Right side - Receita */}
      <div className="absolute right-[-8%] top-[50%] -translate-y-1/2 z-10 animate-float-card-side-2">
        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/90 backdrop-blur-sm px-3 py-2 shadow-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500/10">
            <DollarSign className="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Mais <span className="text-amber-500">Receita</span></p>
            <p className="text-sm font-bold text-amber-500">R$ 2.8k</p>
          </div>
        </div>
      </div>
      
      {/* Main container - Browser mockup with floating animation */}
      <div className="relative h-[85%] w-[85%] mx-auto mt-[7.5%] rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl overflow-hidden animate-float-card">
        {/* Progress bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted/30">
          <div 
            className="h-full bg-gradient-to-r from-primary to-violet-500 transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / 6) * 100}%` }}
          />
        </div>

        {/* Browser header */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3 mt-1">
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
        <div className="relative h-[calc(100%-56px)] p-6 flex flex-col">
          {/* Step 0-1: Generate Article */}
          <div className={`absolute inset-6 flex flex-col items-center justify-center transition-all duration-700 ${step <= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'}`}>
            {/* Generate button */}
            <div className={`relative transition-all duration-500 ${step === 1 ? 'scale-95' : 'scale-100'}`}>
              <button 
                className={`
                  relative px-8 py-4 rounded-xl font-bold text-lg
                  bg-gradient-to-r from-primary to-violet-500 text-primary-foreground
                  shadow-lg shadow-primary/30
                  transition-all duration-300
                  ${step === 1 ? 'shadow-xl shadow-primary/50' : ''}
                `}
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Gerar Artigo
                </span>
                
                {/* Click ripple effect */}
                {step === 1 && (
                  <span className="absolute inset-0 rounded-xl animate-ping bg-primary-foreground/30" />
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
                <svg className="w-12 h-12 drop-shadow-2xl animate-cursor-hover" viewBox="0 0 24 24" fill="none">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-5.02h7.29c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 00-.85.35z" fill="hsl(var(--foreground))" stroke="hsl(var(--background))" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
            
            <p className="mt-6 text-sm text-muted-foreground text-center">
              Clique para gerar conteúdo com IA
            </p>
          </div>
          
          {/* Step 2: Article Generated */}
          <div className={`absolute inset-6 flex flex-col transition-all duration-700 ${step === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'}`}>
            {/* Article preview */}
            <div className="flex-1 rounded-xl border border-border/50 bg-background/60 p-4 overflow-hidden">
              {/* Title with typing cursor */}
              <div className="flex items-center gap-1 mb-4">
                <div className="h-6 w-3/4 bg-foreground/80 rounded" />
                <div className="w-0.5 h-6 bg-primary animate-blink" />
              </div>
              
              {/* Lines appearing one by one */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-muted-foreground/30 rounded animate-type-line-1" />
                <div className="h-3 w-full bg-muted-foreground/30 rounded animate-type-line-2" />
                <div className="h-3 w-5/6 bg-muted-foreground/30 rounded animate-type-line-3" />
                <div className="h-3 w-full bg-muted-foreground/30 rounded animate-type-line-4" />
                <div className="h-3 w-4/5 bg-muted-foreground/30 rounded animate-type-line-5" />
              </div>
              
              {/* Quality badge */}
              <div className="absolute top-10 right-10 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 animate-bounce-in">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-medium text-emerald-600">Alta Qualidade</span>
              </div>
            </div>
            
            <p className="mt-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-primary" />
              Artigo SEO otimizado gerado!
            </p>
          </div>
          
          {/* Step 3: Publish to WordPress */}
          <div className={`absolute inset-6 flex flex-col items-center justify-center transition-all duration-700 ${step === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'}`}>
            <div className="relative">
              {/* Publish button */}
              <button className="px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 text-primary-foreground shadow-lg shadow-blue-500/30 animate-pulse">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Publicar
                </span>
                <span className="absolute inset-0 rounded-xl animate-ping bg-blue-400/30" />
              </button>
              
              {/* Mouse cursor clicking */}
              <div className="absolute right-[10px] bottom-[0px] z-50 animate-cursor-click">
                <svg className="w-12 h-12 drop-shadow-2xl" viewBox="0 0 24 24" fill="none">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-5.02h7.29c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 00-.85.35z" fill="hsl(var(--foreground))" stroke="hsl(var(--background))" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
            
            <p className="mt-6 text-sm text-muted-foreground text-center">
              Enviando para WordPress...
            </p>
          </div>
          
          {/* Step 4: WordPress Published */}
          <div className={`absolute inset-6 flex flex-col items-center justify-center transition-all duration-700 ${step === 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'}`}>
            {/* WordPress logo with success */}
            <div className="relative animate-wp-rotate">
              <div className="w-28 h-28 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30 animate-scale-in">
                <svg viewBox="0 0 24 24" className="w-16 h-16" fill="white">
                  <path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.051-.18 2.986-.517-.024-.038-.046-.078-.066-.12l-2.762-7.568zM3.009 12c0 3.559 2.068 6.634 5.067 8.092L4.144 8.756A8.953 8.953 0 003.009 12zm15.614-1.608c0-1.109-.398-1.877-.74-2.474-.455-.74-.882-1.365-.882-2.105 0-.825.626-1.593 1.509-1.593.04 0 .078.005.116.007A8.963 8.963 0 0012 3.009a8.987 8.987 0 00-7.524 4.078c.211.007.41.011.579.011.94 0 2.396-.114 2.396-.114.485-.028.542.684.057.74 0 0-.487.057-1.029.085l3.274 9.739 1.968-5.901-1.401-3.838c-.485-.028-.944-.085-.944-.085-.485-.029-.428-.768.057-.741 0 0 1.484.114 2.368.114.94 0 2.397-.114 2.397-.114.485-.028.543.684.057.74 0 0-.488.057-1.029.085l3.249 9.665.897-2.996c.388-1.242.684-2.133.684-2.902zm.643 10.521A8.963 8.963 0 0020.991 12c0-1.052-.181-2.062-.514-3.001l-3.211 9.314zM12 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
              </div>
              
              {/* Success checkmark */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <p className="mt-6 text-lg font-semibold text-foreground">Publicado!</p>
            <p className="text-sm text-muted-foreground">Artigo live no seu blog</p>
          </div>
          
          {/* Step 5: AdSense Monetization */}
          <div className={`absolute inset-6 flex flex-col items-center justify-center transition-all duration-700 ${step === 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'}`}>
            {/* AdSense with money */}
            <div className="relative">
              {/* Glow effect behind AdSense */}
              <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-xl animate-glow-pulse" />
              
              <div className="relative w-32 h-32 rounded-2xl bg-card flex items-center justify-center shadow-xl shadow-amber-500/20 animate-scale-in border-2 border-amber-200">
                <img src={adsenseIcon} alt="Google AdSense" className="w-24 h-24 object-contain" />
                
                {/* Sparkle effects */}
                <Star className="absolute -top-2 -right-2 w-4 h-4 text-amber-400 animate-sparkle-1" />
                <Star className="absolute top-4 -left-3 w-3 h-3 text-amber-500 animate-sparkle-2" />
                <Star className="absolute -bottom-1 right-4 w-3 h-3 text-amber-400 animate-sparkle-3" />
              </div>
              
              {/* Floating money icons - modern icons */}
              <div className="absolute -top-4 -left-4 animate-float-money-1">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center backdrop-blur-sm">
                  <Coins className="w-4 h-4 text-amber-500" />
                </div>
              </div>
              <div className="absolute -top-2 -right-6 animate-float-money-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
                  <Banknote className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-6 animate-float-money-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
                  <CircleDollarSign className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-4 animate-float-money-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center backdrop-blur-sm">
                  <DollarSign className="w-4 h-4 text-amber-500" />
                </div>
              </div>
              
              {/* Confetti particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-400 animate-confetti-1" />
                <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-emerald-400 animate-confetti-2" />
                <div className="absolute top-0 right-1/4 w-1.5 h-1.5 rounded-full bg-primary animate-confetti-3" />
                <div className="absolute top-0 left-1/3 w-1 h-1 rounded-full bg-violet-400 animate-confetti-4" />
                <div className="absolute top-0 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-500 animate-confetti-5" />
              </div>
              
              {/* Active badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full animate-bounce-in whitespace-nowrap shadow-lg shadow-emerald-500/30">
                ATIVO
              </div>
            </div>
            
            <p className="mt-6 text-lg font-semibold text-gradient">Monetização Ativa!</p>
            <p className="text-sm text-muted-foreground">AdSense gerando receita 24/7</p>
            
            {/* Revenue counter */}
            <div className="mt-4 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2">
              <span className="text-emerald-600 font-mono font-bold animate-pulse">+ R$ 0,47</span>
              <span className="text-xs text-emerald-600/70">agora</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedDemo;