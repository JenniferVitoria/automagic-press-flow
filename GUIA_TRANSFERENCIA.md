# Guia de Transferência - AutomaticPress

Este guia contém todas as instruções e arquivos necessários para transferir o projeto de Home, Login e Cadastro para outro projeto Lovable.

## 📁 Estrutura de Arquivos a Copiar

```
src/
├── assets/
│   ├── ap-logo.png          # Logo do app
│   └── adsense-icon.png     # Ícone do AdSense
├── components/
│   ├── APLogo.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── animated-cta-button.tsx
│       ├── login-button.tsx
│       └── magic-card.tsx
├── contexts/
│   └── AuthContext.tsx
├── pages/
│   ├── Auth.tsx
│   ├── ForgotPassword.tsx
│   ├── ResetPassword.tsx
│   └── home/
│       ├── index.tsx
│       └── components/
│           ├── AdSenseSection.tsx
│           ├── AnimatedDemo.tsx
│           ├── BenefitsCard.css
│           ├── BenefitsSection.tsx
│           ├── CTAFinalSection.tsx
│           ├── FAQSection.tsx
│           ├── HeroSection.tsx
│           ├── HowItWorksSection.tsx
│           ├── PainSection.tsx
│           ├── PricingSection.tsx
│           └── TestimonialsSection.tsx
├── index.css                  # SUBSTITUIR/ADICIONAR
└── tailwind.config.ts        # SUBSTITUIR
```

---

## 📦 1. Dependências Necessárias

Execute no projeto destino:

```bash
npm install gsap next-themes react-helmet-async react-router-dom embla-carousel-autoplay embla-carousel-react zod
```

Ou cole no `package.json`:
```json
{
  "dependencies": {
    "gsap": "^3.14.2",
    "next-themes": "^0.3.0",
    "react-helmet-async": "^2.0.5",
    "react-router-dom": "^6.30.1",
    "embla-carousel-autoplay": "^8.6.0",
    "embla-carousel-react": "^8.6.0",
    "zod": "^3.25.76"
  }
}
```

---

## 📄 2. App.tsx (Projeto Destino)

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import HomePage from "./pages/home";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
```

---

## 🎨 3. tailwind.config.ts (SUBSTITUIR COMPLETAMENTE)

```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "flow": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(400%)" },
        },
        "card-appear": {
          "0%": { opacity: "0", transform: "translateY(30px) scale(0.9)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "arrow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "translateX(0)" },
          "50%": { opacity: "1", transform: "translateX(3px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "flow": "flow 3s ease-in-out infinite",
        "card-appear": "card-appear 0.6s ease-out forwards",
        "arrow-pulse": "arrow-pulse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## 🎨 4. index.css (ADICIONAR NO INÍCIO do arquivo existente)

Cole todo o conteúdo abaixo **NO INÍCIO** do arquivo `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* AutomaticPress Design System
   Primary: Indigo #6366f1
   Clean, modern, futuristic SaaS aesthetic
*/

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 224 71% 4%;

    --card: 0 0% 100%;
    --card-foreground: 224 71% 4%;

    --popover: 0 0% 100%;
    --popover-foreground: 224 71% 4%;

    /* Primary - Indigo #6366f1 */
    --primary: 239 84% 67%;
    --primary-foreground: 0 0% 100%;

    --secondary: 220 14% 96%;
    --secondary-foreground: 224 71% 4%;

    --muted: 220 14% 96%;
    --muted-foreground: 220 9% 46%;

    --accent: 239 84% 67%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 239 84% 67%;

    --radius: 0.75rem;

    /* Custom gradients */
    --gradient-primary: linear-gradient(135deg, hsl(239, 84%, 67%) 0%, hsl(280, 87%, 65%) 100%);
    --gradient-hero: linear-gradient(180deg, hsl(0, 0%, 100%) 0%, hsl(239, 100%, 98%) 100%);

    /* Benefit cards (always dark ink for contrast on bright surfaces) */
    --benefit-ink: 224 71% 4%;
    --benefit-ink-muted: 224 32% 18%;
    /* Sidebar */
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 239 84% 67%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 239 100% 97%;
    --sidebar-accent-foreground: 239 84% 67%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 239 84% 67%;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 210 40% 98%;

    --card: 224 71% 4%;
    --card-foreground: 210 40% 98%;

    --popover: 224 71% 4%;
    --popover-foreground: 210 40% 98%;

    --primary: 239 84% 67%;
    --primary-foreground: 0 0% 100%;

    --secondary: 215 28% 17%;
    --secondary-foreground: 210 40% 98%;

    --muted: 215 28% 17%;
    --muted-foreground: 218 11% 65%;

    --accent: 239 84% 67%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --border: 215 28% 17%;
    --input: 215 28% 17%;
    --ring: 239 84% 67%;

    /* Benefit cards (always dark ink for contrast on bright surfaces) */
    --benefit-ink: 224 71% 4%;
    --benefit-ink-muted: 224 32% 18%;
    --sidebar-background: 224 71% 4%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 239 84% 67%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 239 84% 67%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }

  html {
    scroll-behavior: smooth;
  }
}

/* TODAS AS ANIMAÇÕES E UTILITÁRIOS - Cole o restante do arquivo index.css original aqui */
/* O arquivo completo tem ~920 linhas com todas as animações */
```

**IMPORTANTE:** O arquivo `index.css` completo tem ~920 linhas com todas as animações necessárias. Você precisará copiar o arquivo completo deste projeto.

---

## ✅ 5. Checklist Final

1. ☐ Instalar dependências (`gsap`, `next-themes`, `react-helmet-async`, `zod`, etc.)
2. ☐ Copiar assets: `ap-logo.png` e `adsense-icon.png` para `src/assets/`
3. ☐ Copiar componentes UI: `animated-cta-button.tsx`, `login-button.tsx`, `magic-card.tsx`
4. ☐ Copiar `APLogo.tsx`, `Header.tsx`, `Footer.tsx`
5. ☐ Copiar `AuthContext.tsx` para `src/contexts/`
6. ☐ Copiar páginas: `Auth.tsx`, `ForgotPassword.tsx`, `ResetPassword.tsx`
7. ☐ Copiar pasta `home/` completa para `src/pages/`
8. ☐ Substituir `tailwind.config.ts`
9. ☐ Substituir/merge `index.css`
10. ☐ Atualizar `App.tsx` com rotas e providers
11. ☐ Habilitar Lovable Cloud para autenticação funcionar
12. ☐ Testar login, cadastro e navegação

---

## 🔐 6. Configuração do Backend (Lovable Cloud)

Para a autenticação funcionar, o projeto destino precisa ter:

1. **Lovable Cloud habilitado**
2. **Auto-confirm email** ativado nas configurações de Auth
3. **Tabela `profiles`** criada (se ainda não existir)

---

## 📝 Notas Importantes

- Os arquivos de componentes UI do Shadcn (`button.tsx`, `accordion.tsx`, etc.) devem já existir no projeto destino
- Se usar um logo diferente, atualize o arquivo em `src/assets/ap-logo.png`
- O tema dark/light já está configurado e funcionando
- As animações dependem do `gsap` - certifique-se de que está instalado
