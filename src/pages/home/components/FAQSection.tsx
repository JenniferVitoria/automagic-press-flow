import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Preciso saber SEO para usar?",
    answer: "Não! A AutomaticPress já aplica automaticamente as melhores práticas de SEO em todos os artigos gerados. Títulos otimizados, meta descriptions, headings estruturadas e densidade de palavras-chave são configurados automaticamente."
  },
  {
    question: "Funciona em qualquer WordPress?",
    answer: "Sim, funciona em qualquer instalação WordPress com acesso à API REST, que é o padrão na maioria das hospedagens. Basta conectar suas credenciais e começar a automatizar."
  },
  {
    question: "Isso garante aprovação no AdSense?",
    answer: "A plataforma foca em criar conteúdo de alta qualidade que aumenta significativamente suas chances de aprovação, mas a decisão final depende das políticas do Google. Nossos artigos seguem todas as diretrizes de conteúdo recomendadas."
  },
  {
    question: "Posso usar em mais de um site?",
    answer: "Sim! Dependendo do seu plano, você pode gerenciar múltiplos sites WordPress a partir de uma única conta. Os planos Pro e Enterprise oferecem suporte a vários domínios."
  }
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            ❓ FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Perguntas Frequentes
          </h2>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30 transition-colors duration-200 hover:border-primary/20"
            >
              <AccordionTrigger className="text-left text-foreground hover:no-underline py-5 text-base md:text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 text-sm md:text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
