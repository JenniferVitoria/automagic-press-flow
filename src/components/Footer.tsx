import { Mail, MapPin, Phone, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import APLogo from "@/components/APLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Preços", href: "#precos" },
    { label: "FAQ", href: "#faq" },
  ];

  const legalLinks = [
    { label: "Termos de Uso", href: "#" },
    { label: "Política de Privacidade", href: "#" },
    { label: "Política de Cookies", href: "#" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t-2 border-x-2 border-primary/30 rounded-t-3xl bg-gradient-to-b from-muted/50 to-background overflow-hidden">
      {/* Decorative glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-br-full" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="#inicio" onClick={(e) => handleNavClick(e, "#inicio")} className="flex items-center gap-3 mb-4 group">
              <APLogo size="default" />
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-500 transition-all">
                AutomaticPress
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Automatize seu blog WordPress com IA. Crie, agende e publique artigos otimizados para monetização.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-background/50 hover:bg-primary/10 border border-border/50 hover:border-primary/50 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-purple-500 rounded-full" />
              Navegação
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-muted-foreground hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-purple-500 rounded-full" />
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-purple-500 rounded-full" />
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a
                  href="mailto:contato@automaticpress.com"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200 pt-1"
                >
                  contato@automaticpress.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <a
                  href="tel:+5511999999999"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200 pt-1"
                >
                  +55 (11) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground text-sm pt-1">
                  São Paulo, Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {currentYear} AutomaticPress. Todos os direitos reservados.
            </p>
            <p className="text-muted-foreground/70 text-xs text-center md:text-right flex items-center gap-1">
              Feito com <span className="text-red-500 animate-pulse">❤️</span> para criadores de conteúdo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
