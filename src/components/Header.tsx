import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, ChevronRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import APLogo from "@/components/APLogo";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const navigationLinks = [
    { label: "Início", href: "#inicio", icon: "🏠" },
    { label: "Como Funciona", href: "#como-funciona", icon: "⚙️" },
    { label: "Benefícios", href: "#beneficios", icon: "✨" },
    { label: "Preços", href: "#precos", icon: "💰" },
    { label: "FAQ", href: "#faq", icon: "❓" },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b-2 border-x-2 border-primary/30 rounded-b-2xl shadow-lg shadow-primary/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a 
          href="#inicio" 
          onClick={(e) => { e.preventDefault(); handleNavClick("#inicio"); }} 
          className="flex items-center gap-3 group"
        >
          <APLogo size="sm" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-primary transition-all duration-300">
            AutomaticPress
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <div className="flex items-center bg-muted/50 rounded-full p-1 border border-border/50">
            {navigationLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                    ${isActive 
                      ? "text-primary-foreground bg-primary shadow-md shadow-primary/25" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full bg-muted/50 hover:bg-muted border border-border/50"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Alternar tema</span>
          </Button>

          {/* Auth Buttons - Hidden on mobile */}
          <Button 
            variant="ghost" 
            className="hidden sm:inline-flex text-sm hover:bg-muted/50" 
            asChild
          >
            <a href="https://app.automaticpress.com.br/login">Login</a>
          </Button>
          <Button 
            asChild 
            className="hidden sm:inline-flex text-sm px-5 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg shadow-primary/25 border-0"
          >
            <a href="https://app.automaticpress.com.br/register" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Começar Grátis
            </a>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden rounded-full bg-muted/50 hover:bg-muted border border-border/50"
          >
            <div className="relative w-5 h-5">
              <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`
          lg:hidden absolute top-full left-0 right-0 
          bg-background/95 backdrop-blur-xl 
          border-b-2 border-x-2 border-primary/30 rounded-b-3xl 
          shadow-2xl shadow-primary/10 
          overflow-hidden transition-all duration-300 ease-out
          ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
      >
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="px-4 py-6 space-y-1">
          {navigationLinks.map((link, index) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`
                  flex items-center justify-between py-3.5 px-4 rounded-xl
                  transition-all duration-200
                  ${isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-foreground hover:bg-muted/50 border border-transparent"
                  }
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
              </a>
            );
          })}
          
          {/* Mobile Auth Buttons */}
          <div className="pt-4 mt-4 border-t border-border/30 space-y-3">
            <a
              href="https://app.automaticpress.com.br/login"
              className="flex items-center justify-center gap-2 py-3 px-4 text-center text-muted-foreground hover:text-foreground border border-border/50 rounded-xl transition-all hover:bg-muted/50"
            >
              Login
            </a>
            <a
              href="https://app.automaticpress.com.br/register"
              className="flex items-center justify-center gap-2 py-3.5 px-4 text-center bg-gradient-to-r from-primary to-purple-500 text-primary-foreground rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/25 font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Começar Grátis
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/50 backdrop-blur-sm -z-10"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
