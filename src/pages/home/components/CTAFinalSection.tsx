import AnimatedCtaButton from "@/components/ui/animated-cta-button";

const CTAFinalSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/10" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-56 md:w-80 h-56 md:h-80 bg-purple-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-[500px] h-72 md:h-[500px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-in" style={{ animationDelay: '0ms' }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              🚀 Comece Agora
            </span>
          </div>

          {/* Title */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-in"
            style={{ animationDelay: '100ms' }}
          >
            Transforme seu WordPress em uma{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              máquina de monetização
            </span>
          </h2>

          {/* Text */}
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            Pare de depender do manual. Ative a automação, publique com consistência e construa ativos digitais escaláveis.
          </p>

          {/* CTA Button */}
          <div 
            className="animate-fade-in flex justify-center"
            style={{ animationDelay: '300ms' }}
          >
            <AnimatedCtaButton className="text-sm md:text-lg px-5 md:px-8 py-3 md:py-4">
              Começar agora com AutomaticPress
            </AnimatedCtaButton>
          </div>

          {/* Trust indicators */}
          <p 
            className="mt-6 text-sm text-muted-foreground/70 animate-fade-in"
            style={{ animationDelay: '400ms' }}
          >
            ✓ Setup em 5 minutos &nbsp;•&nbsp; ✓ Sem cartão de crédito &nbsp;•&nbsp; ✓ Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTAFinalSection;
