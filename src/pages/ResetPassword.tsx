import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock, Moon, Sun, KeyRound, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import APLogo from '@/components/APLogo';
import { Button } from '@/components/ui/button';

const passwordSchema = z.string()
  .min(6, 'Senha deve ter pelo menos 6 caracteres')
  .max(72, 'Senha muito longa');

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user has a valid recovery session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsValidSession(!!session);
      
      if (!session) {
        toast({
          title: 'Link inválido ou expirado',
          description: 'Por favor, solicite um novo link de recuperação.',
          variant: 'destructive'
        });
      }
    };
    
    checkSession();
  }, []);

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};
    
    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        toast({
          title: 'Erro',
          description: error.message || 'Não foi possível atualizar a senha. Tente novamente.',
          variant: 'destructive'
        });
      } else {
        setIsSuccess(true);
        toast({
          title: 'Senha atualizada!',
          description: 'Sua senha foi alterada com sucesso.'
        });
        
        // Sign out after password change
        await supabase.auth.signOut();
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

  if (isValidSession === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero-gradient">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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

          {!isValidSession ? (
            /* Invalid Session State */
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
                <KeyRound className="w-8 h-8 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Link inválido
              </h1>
              <p className="text-muted-foreground mb-6">
                O link de recuperação é inválido ou expirou. Por favor, solicite um novo link.
              </p>
              <Button
                onClick={() => navigate('/forgot-password')}
                className="w-full bg-gradient-to-r from-primary to-purple-500"
              >
                Solicitar novo link
              </Button>
            </div>
          ) : isSuccess ? (
            /* Success State */
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Senha atualizada!
              </h1>
              <p className="text-muted-foreground mb-6">
                Sua senha foi alterada com sucesso. Você já pode fazer login com sua nova senha.
              </p>
              <Button
                onClick={() => navigate('/auth')}
                className="w-full bg-gradient-to-r from-primary to-purple-500"
              >
                Ir para o login
              </Button>
            </div>
          ) : (
            /* Form State */
            <>
              <h1 className="text-center font-black text-2xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-2">
                Nova Senha
              </h1>
              <p className="text-center text-sm text-muted-foreground mb-6">
                Digite sua nova senha abaixo
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Password */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none z-10">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full bg-background pl-12 pr-12 py-4 rounded-2xl 
                      border-2 border-border
                      shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.1)]
                      focus:border-primary focus:shadow-[2px_2px_0px_0px_hsl(var(--primary)/0.2)]
                      focus:translate-x-0.5 focus:translate-y-0.5
                      focus:outline-none placeholder:text-muted-foreground/50 text-foreground 
                      transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors z-10"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {errors.password && (
                    <p className="text-sm text-destructive mt-2 ml-2">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none z-10">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmar nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full bg-background pl-12 pr-12 py-4 rounded-2xl 
                      border-2 border-border
                      shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.1)]
                      focus:border-primary focus:shadow-[2px_2px_0px_0px_hsl(var(--primary)/0.2)]
                      focus:translate-x-0.5 focus:translate-y-0.5
                      focus:outline-none placeholder:text-muted-foreground/50 text-foreground 
                      transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors z-10"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-2 ml-2">{errors.confirmPassword}</p>
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
                      Atualizando...
                    </>
                  ) : (
                    <>
                      <KeyRound className="h-5 w-5" />
                      Atualizar Senha
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
