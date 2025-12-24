import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, ArrowLeft, Moon, Sun, Send, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import APLogo from '@/components/APLogo';
import { Button } from '@/components/ui/button';

const emailSchema = z.string().email('Email inválido').max(255, 'Email muito longo');

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível enviar o email de recuperação. Tente novamente.',
          variant: 'destructive'
        });
      } else {
        setIsSuccess(true);
        toast({
          title: 'Email enviado!',
          description: 'Verifique sua caixa de entrada para redefinir sua senha.'
        });
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro inesperado',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient p-4">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted border border-border/50 shadow-lg"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </div>

      {/* Back button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          onClick={() => navigate('/auth')}
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted border border-border/50 shadow-lg text-sm gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </div>

      {/* Card */}
      <div 
        className="w-full max-w-[420px] relative animate-fade-in"
        style={{ perspective: '1000px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-[44px] blur-2xl opacity-50 dark:opacity-30" />
        
        <div className="relative bg-card rounded-[40px] p-6 sm:p-8 
          border-[4px] border-primary/40 dark:border-primary/50
          shadow-[8px_8px_0px_0px_hsl(var(--primary)/0.3),_0_25px_50px_-12px_rgba(99,102,241,0.25)]
          dark:shadow-[8px_8px_0px_0px_hsl(var(--primary)/0.4),_0_25px_50px_-12px_rgba(99,102,241,0.4)]
          transition-all duration-300"
        >
          {/* Corner accents */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/50 rounded-tl-xl" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/50 rounded-tr-xl" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/50 rounded-bl-xl" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/50 rounded-br-xl" />
          
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="p-3 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl border border-primary/20">
              <APLogo size="lg" />
            </div>
          </div>

          {isSuccess ? (
            /* Success State */
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Email enviado!
              </h1>
              <p className="text-muted-foreground mb-6">
                Enviamos um link de recuperação para <strong className="text-foreground">{email}</strong>. 
                Verifique sua caixa de entrada e spam.
              </p>
              <Button
                onClick={() => navigate('/auth')}
                className="w-full bg-gradient-to-r from-primary to-purple-500"
              >
                Voltar para o login
              </Button>
            </div>
          ) : (
            /* Form State */
            <>
              <h1 className="text-center font-black text-2xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-2">
                Recuperar Senha
              </h1>
              <p className="text-center text-sm text-muted-foreground mb-6">
                Digite seu email para receber um link de recuperação
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full bg-background pl-12 pr-4 py-4 rounded-2xl 
                      border-2 border-border
                      shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.1)]
                      focus:border-primary focus:shadow-[2px_2px_0px_0px_hsl(var(--primary)/0.2)]
                      focus:translate-x-0.5 focus:translate-y-0.5
                      focus:outline-none placeholder:text-muted-foreground/50 text-foreground 
                      transition-all duration-200"
                  />
                  {error && (
                    <p className="text-sm text-destructive mt-2 ml-2">{error}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 font-bold text-lg
                    bg-gradient-to-r from-primary to-purple-500 text-primary-foreground py-4 rounded-2xl 
                    border-2 border-primary/50
                    shadow-[6px_6px_0px_0px_hsl(var(--primary)/0.4)]
                    hover:shadow-[3px_3px_0px_0px_hsl(var(--primary)/0.5)]
                    hover:translate-x-1 hover:translate-y-1
                    active:shadow-[1px_1px_0px_0px_hsl(var(--primary)/0.5)]
                    active:translate-x-1.5 active:translate-y-1.5
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0
                    transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar Link
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-sm text-muted-foreground">
                  Lembrou a senha?{' '}
                </span>
                <button
                  onClick={() => navigate('/auth')}
                  className="text-sm text-primary hover:underline font-semibold"
                >
                  Fazer login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
