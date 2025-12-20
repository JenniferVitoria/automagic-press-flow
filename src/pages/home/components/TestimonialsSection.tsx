import { useRef, useState, useEffect } from "react";
import { User, Star, Quote, BadgeCheck } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Lucas Andrade",
    text: "Eu sempre travava na parte de manter consistência no blog. Com a AutomaticPress, os posts simplesmente começaram a sair sozinhos. Hoje meu site está sempre ativo e finalmente consegui focar em escalar, não em escrever."
  },
  {
    name: "Mariana Lopes",
    text: "O que mais me chamou atenção foi a organização. Tudo é automático, mas ao mesmo tempo muito bem estruturado. Dá uma sensação real de produto profissional rodando sozinho."
  },
  {
    name: "Rafael Monteiro",
    text: "Antes eu publicava quando dava tempo. Agora meu WordPress posta todos os dias sem eu precisar entrar no painel. É literalmente deixar a automação trabalhar."
  },
  {
    name: "Thiago Nunes",
    text: "A AutomaticPress mudou minha visão sobre criação de conteúdo. Não é só gerar texto, é manter o site vivo, atualizado e pronto para monetizar. Isso faz muita diferença."
  },
  {
    name: "Camila Ferreira",
    text: "Eu não tenho tempo para escrever artigos toda semana. Com a plataforma, meu blog nunca mais ficou parado. A constância que eu não tinha veio automaticamente."
  },
  {
    name: "Bruno Almeida",
    text: "Já testei outras ferramentas, mas nenhuma focava tanto em SEO e monetização. Aqui você sente que o objetivo é realmente ajudar o blog a crescer, não só gerar conteúdo."
  },
  {
    name: "Patrícia Souza",
    text: "O melhor ponto é a tranquilidade. Eu sei que, mesmo se eu não mexer no site, ele continua publicando. Isso tira um peso enorme das costas."
  },
  {
    name: "Felipe Rocha",
    text: "Uso a AutomaticPress em mais de um site e a escalabilidade é absurda. O que antes levaria horas por semana hoje acontece automaticamente."
  },
  {
    name: "Juliana Martins",
    text: "Gostei muito da proposta simples e direta. Conectei meu WordPress, configurei as categorias e pronto. O resto acontece sem esforço."
  },
  {
    name: "Eduardo Pacheco",
    text: "Para quem trabalha com blogs e AdSense, essa plataforma é um atalho gigante. Automatiza o operacional e deixa você pensar só na estratégia."
  }
];

interface TestimonialCardProps {
  testimonial: {
    name: string;
    text: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="h-[240px] w-full perspective-[800px] group cursor-pointer">
      <div 
        className="
          relative w-full h-full transition-transform duration-[1200ms]
          [transform-style:preserve-3d]
          group-hover:[transform:rotateX(180deg)_rotateZ(-180deg)]
        "
      >
        {/* Front */}
        <div 
          className="
            absolute w-full h-full rounded-xl p-5
            bg-card/95 backdrop-blur-sm
            border border-primary/20
            shadow-[0_0_20px_0_hsl(var(--primary)/0.15),inset_0_1px_0_0_hsl(var(--primary)/0.1)]
            [backface-visibility:hidden]
            flex flex-col
            hover:border-primary/40
            transition-colors duration-300
          "
        >
          {/* Badge top center */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary rounded-full shadow-lg shadow-primary/30">
            <p className="text-[10px] font-semibold text-primary-foreground tracking-wide">Depoimento</p>
          </div>
          
          {/* Quote icon top right */}
          <Quote className="absolute top-3 right-3 w-5 h-5 text-primary/30" />
          
          {/* Avatar + Name + Stars */}
          <div className="flex items-center gap-3 mt-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-foreground text-sm truncate">{testimonial.name}</h4>
              <div className="flex gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
          
          {/* Testimonial text */}
          <p className="text-muted-foreground text-[13px] leading-relaxed mt-4 line-clamp-5">
            "{testimonial.text}"
          </p>
        </div>
        
        {/* Back */}
        <div 
          className="
            absolute w-full h-full rounded-xl p-5
            bg-gradient-to-br from-primary/10 via-card to-primary/5
            border border-primary/30
            shadow-[0_0_25px_0_hsl(var(--primary)/0.2)]
            [backface-visibility:hidden]
            [transform:rotateX(180deg)_rotateZ(-180deg)]
            flex flex-col items-center justify-center gap-3
          "
        >
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <BadgeCheck className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-foreground">Usuário Verificado</p>
            <p className="text-primary font-semibold text-sm">no AdSense</p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20 mt-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[11px] text-green-400 font-medium">Monetização Ativa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  
  const autoplayPlugin = useRef(
    Autoplay({ 
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div 
          className={`
            text-center mb-12 sm:mb-16
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-primary" />
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            O que nossos clientes estão dizendo
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Veja como a AutomaticPress está transformando a forma de criar conteúdo
          </p>
        </div>
        
        {/* Carousel */}
        <div 
          className={`
            transition-all duration-700 delay-200
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <Carousel
            opts={{ 
              align: "start", 
              loop: true,
            }}
            plugins={[autoplayPlugin.current]}
            setApi={setApi}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-12 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card hover:border-primary/30" />
            <CarouselNext className="hidden sm:flex -right-4 lg:-right-12 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card hover:border-primary/30" />
          </Carousel>
          
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`
                  w-2.5 h-2.5 rounded-full transition-all duration-300
                  ${current === index 
                    ? 'bg-primary w-8 shadow-lg shadow-primary/30' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }
                `}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
