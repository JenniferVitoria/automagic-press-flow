import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import APLogo from "@/components/APLogo";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Preços", href: "#precos" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b-2 border-x-2 border-primary/30 rounded-b-2xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#inicio" onClick={() => handleNavClick("#inicio")} className="flex items-center gap-3 group">
          <APLogo size="sm" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent group-hover:from-primary/80 group-hover:to-purple-500 transition-all">
            AutomaticPress
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Alternar tema</span>
          </Button>

          {/* Auth Buttons - Hidden on mobile */}
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <a href="https://app.automaticpress.com.br/login">Login</a>
          </Button>
          <Button asChild className="hidden sm:inline-flex text-sm px-4">
            <a href="https://app.automaticpress.com.br/register">Cadastrar-se</a>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden rounded-full"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b-2 border-x-2 border-primary/30 rounded-b-2xl shadow-lg z-50">
          <div className="px-4 py-4 space-y-2">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-border/50 space-y-2">
              <a
                href="https://app.automaticpress.com.br/login"
                className="block py-3 px-4 text-center text-muted-foreground hover:text-primary rounded-lg transition-colors"
              >
                Login
              </a>
              <a
                href="https://app.automaticpress.com.br/register"
                className="block py-3 px-4 text-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Cadastrar-se
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
