import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b-2 border-x-2 border-primary/30 rounded-b-2xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            AutomaticPress
          </span>
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

          {/* Auth Buttons */}
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <a href="https://app.automaticpress.com.br/login">Login</a>
          </Button>
          <Button asChild className="text-xs sm:text-sm px-3 sm:px-4">
            <a href="https://app.automaticpress.com.br/register">
              <span className="hidden sm:inline">Cadastrar-se</span>
              <span className="sm:hidden">Criar conta</span>
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
