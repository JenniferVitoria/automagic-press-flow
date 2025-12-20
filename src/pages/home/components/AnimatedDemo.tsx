import { useState, useEffect } from "react";
import { 
  Zap, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  BarChart3, 
  MousePointer2,
  Check,
  FileText,
  Clock,
  Eye,
  Medal,
  DollarSign,
  Coins,
  Banknote
} from "lucide-react";
import adsenseIcon from "@/assets/adsense-icon.png";

const AnimatedDemo = () => {
  const [step, setStep] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [seoScore, setSeoScore] = useState(0);
  const [visitors, setVisitors] = useState(0);
  const [revenue, setRevenue] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 6);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Word count animation for step 1
  useEffect(() => {
    if (step === 1) {
      setWordCount(0);
      setSeoScore(0);
      const wordInterval = setInterval(() => {
        setWordCount(prev => prev < 1247 ? prev + Math.floor(Math.random() * 50) + 20 : 1247);
      }, 100);
      const seoInterval = setTimeout(() => {
        const scoreInterval = setInterval(() => {
          setSeoScore(prev => prev < 94 ? prev + 2 : 94);
        }, 50);
        return () => clearInterval(scoreInterval);
      }, 1000);
      return () => {
        clearInterval(wordInterval);
        clearTimeout(seoInterval);
      };
    }
  }, [step]);
  
  // Visitors counter for step 4
  useEffect(() => {
    if (step === 4) {
      setVisitors(0);
      const visitorInterval = setInterval(() => {
        setVisitors(prev => prev < 1847 ? prev + Math.floor(Math.random() * 80) + 30 : 1847);
      }, 80);
      return () => clearInterval(visitorInterval);
    }
  }, [step]);
  
  // Revenue counter for step 5
  useEffect(() => {
    if (step === 5) {
      setRevenue(0);
      const revenueInterval = setInterval(() => {
        setRevenue(prev => prev < 287.50 ? prev + 5.75 : 287.50);
      }, 100);
      return () => clearInterval(revenueInterval);
    }
  }, [step]);

  const niches = [
    { name: "Tecnologia", icon: "💻", selected: false },
    { name: "Finanças", icon: "💰", selected: true },
    { name: "Saúde", icon: "🏥", selected: false },
  ];

  const keywords = ["Marketing", "SEO", "Vendas", "Conversão"];

  return (
    <div className="relative w-full max-w-[700px] aspect-[4/3] mx-auto">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-primary/20 animate-particle-${(i % 6) + 1}`}
            style={{
              top: `${10 + (i * 12)}%`,
              left: `${5 + (i * 11)}%`,
            }}
          />
        ))}
      </div>

      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      
      {/* Main container - Browser mockup */}
      <div className="relative h-full w-full rounded-2xl border-2 border-border/50 bg-card/90 backdrop-blur-sm shadow-2xl overflow-hidden animate-float-card">
        {/* Progress bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-muted/30 z-20">
          <div 
            className="h-full bg-gradient-to-r from-primary via-violet-500 to-amber-500 transition-all duration-700 ease-out"
            style={{ width: `${((step + 1) / 6) * 100}%` }}
          />
        </div>

        {/* Browser header */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3 mt-1.5">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="h-7 rounded-md bg-background/60 flex items-center px-3">
              <span className="text-xs text-muted-foreground">automaticpress.com/dashboard</span>
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="relative h-[calc(100%-60px)] overflow-hidden">
          
          {/* ========== STEP 0: Seleção de Nicho ========== */}
          <div className={`absolute inset-0 p-6 flex flex-col transition-all duration-700 ${step === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-foreground mb-1">Escolha seu Nicho</h3>
              <p className="text-sm text-muted-foreground">Selecione o tema do seu blog</p>
            </div>
            
            <div className="flex justify-center gap-4 flex-wrap relative">
              {niches.map((niche, i) => (
                <div 
                  key={niche.name}
                  className={`
                    relative px-6 py-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                    ${niche.selected 
                      ? 'border-primary bg-primary/10 scale-105 shadow-lg shadow-primary/20' 
                      : 'border-border/50 bg-card/50 hover:border-primary/50'}
                    animate-fade-in
                  `}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="text-3xl mb-2 text-center">{niche.icon}</div>
                  <p className="text-sm font-medium text-foreground">{niche.name}</p>
                  {niche.selected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce-in">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Animated mouse cursor moving to Finanças card */}
              <div className="absolute z-50 animate-cursor-move-click" style={{ top: '50%', left: '30%' }}>
                <svg className="w-10 h-10 drop-shadow-xl" viewBox="0 0 24 24" fill="none">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-5.02h7.29c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 00-.85.35z" fill="hsl(var(--foreground))" stroke="hsl(var(--background))" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
            
            <div className="mt-auto text-center">
              <span className="inline-flex items-center gap-2 text-sm text-primary font-medium animate-pulse">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Nicho selecionado!
              </span>
            </div>
          </div>
          
          {/* ========== STEP 1: Geração com IA ========== */}
          <div className={`absolute inset-0 p-6 flex flex-col transition-all duration-700 ${step === 1 ? 'opacity-100 translate-x-0' : step < 1 ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-foreground flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                Gerando com IA
              </h3>
            </div>
            
            {/* Progress Circle */}
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <circle 
                    cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                    strokeDasharray={`${(seoScore / 100) * 251.2} 251.2`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{Math.min(seoScore, 94)}%</span>
                </div>
              </div>
            </div>
            
            {/* Word count */}
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">Palavras geradas</p>
              <p className="text-2xl font-mono font-bold text-foreground">{Math.min(wordCount, 1247).toLocaleString()}</p>
            </div>
            
            {/* Keywords floating in */}
            <div className="flex justify-center gap-2 flex-wrap mb-4">
              {keywords.map((keyword, i) => (
                <span 
                  key={keyword}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium animate-bounce-in"
                  style={{ animationDelay: `${i * 200 + 500}ms` }}
                >
                  #{keyword}
                </span>
              ))}
            </div>
            
            {/* Title appearing */}
            <div className="bg-background/60 rounded-lg p-3 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Título gerado:</p>
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold text-foreground animate-type-title">
                  Como Aumentar Suas Vendas em 2024
                </p>
                <div className="w-0.5 h-4 bg-primary animate-blink" />
              </div>
            </div>
            
            {/* SEO Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 animate-bounce-in">
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-medium text-emerald-600">SEO: {Math.min(seoScore, 94)}/100</span>
            </div>
          </div>
          
          {/* ========== STEP 2: Preview do Artigo ========== */}
          <div className={`absolute inset-0 p-6 flex flex-col transition-all duration-700 ${step === 2 ? 'opacity-100 translate-x-0' : step < 2 ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
            <div className="flex-1 rounded-xl border border-border/50 bg-background/60 p-4 overflow-hidden">
              {/* Article Card */}
              <div className="flex gap-4 animate-fade-in">
                {/* Thumbnail */}
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center shrink-0">
                  <FileText className="w-10 h-10 text-primary/60" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-foreground mb-2 line-clamp-2">
                    Como Aumentar Suas Vendas em 2024: Estratégias Comprovadas
                  </h4>
                  
                  {/* Tags */}
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {["#Marketing", "#Vendas", "#Estratégia"].map((tag, i) => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs animate-bounce-in"
                        style={{ animationDelay: `${i * 100 + 300}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Metrics */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      1.500 palavras
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      7 min leitura
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Preview lines */}
              <div className="mt-4 space-y-2">
                <div className="h-2 bg-muted-foreground/20 rounded w-full animate-type-line-1" />
                <div className="h-2 bg-muted-foreground/20 rounded w-11/12 animate-type-line-2" />
                <div className="h-2 bg-muted-foreground/20 rounded w-full animate-type-line-3" />
                <div className="h-2 bg-muted-foreground/20 rounded w-4/5 animate-type-line-4" />
              </div>
            </div>
            
            {/* Publish button with cursor */}
            <div className="mt-4 flex justify-center relative">
              <button className="relative px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-primary-foreground shadow-lg shadow-blue-500/30 animate-pulse">
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Publicar Agora
                </span>
                <span className="absolute inset-0 rounded-xl animate-ping bg-blue-400/30" />
              </button>
              
              {/* Animated mouse cursor moving to button */}
              <div className="absolute z-50 animate-cursor-move-click" style={{ right: '-20px', bottom: '-15px' }}>
                <svg className="w-10 h-10 drop-shadow-xl" viewBox="0 0 24 24" fill="none">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-5.02h7.29c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 00-.85.35z" fill="hsl(var(--foreground))" stroke="hsl(var(--background))" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* ========== STEP 3: Publicando no WordPress ========== */}
          <div className={`absolute inset-0 p-6 flex flex-col items-center justify-center transition-all duration-700 ${step === 3 ? 'opacity-100 translate-x-0' : step < 3 ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
            {/* WordPress logo */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30 animate-wp-rotate">
                <svg viewBox="0 0 24 24" className="w-12 h-12" fill="white">
                  <path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.051-.18 2.986-.517-.024-.038-.046-.078-.066-.12l-2.762-7.568zM3.009 12c0 3.559 2.068 6.634 5.067 8.092L4.144 8.756A8.953 8.953 0 003.009 12zm15.614-1.608c0-1.109-.398-1.877-.74-2.474-.455-.74-.882-1.365-.882-2.105 0-.825.626-1.593 1.509-1.593.04 0 .078.005.116.007A8.963 8.963 0 0012 3.009a8.987 8.987 0 00-7.524 4.078c.211.007.41.011.579.011.94 0 2.396-.114 2.396-.114.485-.028.542.684.057.74 0 0-.487.057-1.029.085l3.274 9.739 1.968-5.901-1.401-3.838c-.485-.028-.944-.085-.944-.085-.485-.029-.428-.768.057-.741 0 0 1.484.114 2.368.114.94 0 2.397-.114 2.397-.114.485-.028.543.684.057.74 0 0-.488.057-1.029.085l3.249 9.665.897-2.996c.388-1.242.684-2.133.684-2.902zm.643 10.521A8.963 8.963 0 0020.991 12c0-1.052-.181-2.062-.514-3.001l-3.211 9.314zM12 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
              </div>
            </div>
            
            {/* Progress steps */}
            <div className="space-y-3 text-left w-full max-w-xs">
              {[
                { text: "Formatando artigo...", delay: 0 },
                { text: "Otimizando imagens...", delay: 400 },
                { text: "Configurando SEO...", delay: 800 },
                { text: "Publicando...", delay: 1200 },
              ].map((item, i) => (
                <div 
                  key={item.text}
                  className="flex items-center gap-3 animate-fade-in"
                  style={{ animationDelay: `${item.delay}ms` }}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${i < 3 ? 'bg-emerald-500' : 'bg-primary animate-pulse'}`}>
                    {i < 3 ? (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className={`text-sm ${i < 3 ? 'text-muted-foreground line-through' : 'text-foreground font-medium'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Article counter */}
            <div className="mt-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
              <span className="text-sm text-blue-600 font-medium">128 artigos publicados</span>
            </div>
          </div>
          
          {/* ========== STEP 4: Tráfego Chegando ========== */}
          <div className={`absolute inset-0 p-6 flex flex-col transition-all duration-700 ${step === 4 ? 'opacity-100 translate-x-0' : step < 4 ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-foreground flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Tráfego Chegando!
              </h3>
            </div>
            
            {/* Mini chart */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-sm">
                {/* Simple animated bar chart */}
                <div className="flex items-end justify-between gap-2 h-32 px-4">
                  {[20, 35, 45, 60, 75, 85, 100].map((height, i) => (
                    <div 
                      key={i}
                      className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-sm animate-grow-bar"
                      style={{ 
                        height: `${height}%`,
                        animationDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </div>
                
                {/* Visitors counter */}
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">Visitantes hoje</p>
                  <p className="text-3xl font-mono font-bold text-emerald-500">
                    {visitors.toLocaleString()}
                  </p>
                </div>
                
                {/* Country flags and ranking */}
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇧🇷</span>
                    <span className="text-xs text-muted-foreground">52%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇺🇸</span>
                    <span className="text-xs text-muted-foreground">28%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇵🇹</span>
                    <span className="text-xs text-muted-foreground">20%</span>
                  </div>
                </div>
                
                {/* Google ranking badge */}
                <div className="flex justify-center mt-4">
                  <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 animate-bounce-in">
                    <Medal className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-amber-600">Top 3 Google</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* ========== STEP 5: Monetização AdSense ========== */}
          <div className={`absolute inset-0 p-6 flex flex-col items-center justify-center transition-all duration-700 ${step === 5 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
            {/* AdSense with glow */}
            <div className="relative mb-4">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-amber-500/30 rounded-2xl blur-2xl animate-glow-pulse" />
              
              <div className="relative w-24 h-24 rounded-2xl bg-card flex items-center justify-center shadow-xl shadow-amber-500/20 border-2 border-amber-200 animate-scale-in">
                <img src={adsenseIcon} alt="Google AdSense" className="w-16 h-16 object-contain" />
              </div>
              
              {/* Floating money icons */}
              <div className="absolute -top-3 -left-4 animate-float-money-1">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center backdrop-blur-sm">
                  <Coins className="w-4 h-4 text-amber-500" />
                </div>
              </div>
              <div className="absolute -top-2 -right-5 animate-float-money-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
                  <Banknote className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
              <div className="absolute -bottom-3 -right-4 animate-float-money-3">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center backdrop-blur-sm">
                  <DollarSign className="w-4 h-4 text-amber-500" />
                </div>
              </div>
              
              {/* Confetti */}
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className={`absolute w-1.5 h-1.5 rounded-full animate-confetti-${(i % 5) + 1}`}
                    style={{
                      left: `${20 + (i * 10)}%`,
                      top: '-10px',
                      backgroundColor: ['#f59e0b', '#10b981', '#8b5cf6', '#3b82f6', '#ef4444'][i % 5]
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Revenue metrics */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-4">
              {[
                { label: "Impressões", value: "24.5K", icon: Eye },
                { label: "Cliques", value: "847", icon: MousePointer2 },
                { label: "CTR", value: "3.45%", icon: BarChart3 },
              ].map((metric, i) => (
                <div 
                  key={metric.label}
                  className="text-center p-3 rounded-lg bg-background/60 border border-border/50 animate-bounce-in"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <metric.icon className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
            
            {/* Main revenue display */}
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-1">Receita do Mês</p>
              <p className="text-4xl font-mono font-bold text-gradient">
                R$ {revenue.toFixed(2).replace('.', ',')}
              </p>
            </div>
            
            {/* Active badge */}
            <div className="flex items-center gap-2 bg-emerald-500 text-primary-foreground text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-emerald-500/30 animate-bounce-in">
              <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
              MONETIZAÇÃO ATIVA
            </div>
            
            {/* Real-time indicator */}
            <div className="mt-3 flex items-center gap-2 text-emerald-500 text-sm">
              <Globe className="w-4 h-4 animate-pulse" />
              <span>Gerando receita 24/7</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AnimatedDemo;
