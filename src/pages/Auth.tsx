import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import APLogo from '@/components/APLogo';

// Validation schemas
const emailSchema = z.string().email('Email inválido').max(255, 'Email muito longo');
const passwordSchema = z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').max(72, 'Senha muito longa');
const nameSchema = z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo').optional();

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string }>({});
  
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; fullName?: string } = {};
    
    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }
    
    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }
    
    if (!isLogin && fullName) {
      try {
        nameSchema.parse(fullName);
      } catch (e) {
        if (e instanceof z.ZodError) {
          newErrors.fullName = e.errors[0].message;
        }
      }
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
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          let message = 'Erro ao fazer login';
          if (error.message.includes('Invalid login credentials')) {
            message = 'Email ou senha incorretos';
          } else if (error.message.includes('Email not confirmed')) {
            message = 'Por favor, confirme seu email antes de fazer login';
          }
          toast({
            title: 'Erro',
            description: message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Bem-vindo!',
            description: 'Login realizado com sucesso'
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, fullName || undefined);
        if (error) {
          let message = 'Erro ao criar conta';
          if (error.message.includes('already registered')) {
            message = 'Este email já está registrado';
          } else if (error.message.includes('password')) {
            message = 'A senha não atende aos requisitos de segurança';
          }
          toast({
            title: 'Erro',
            description: message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Conta criada!',
            description: 'Sua conta foi criada com sucesso'
          });
          navigate('/');
        }
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

  const handleGoogleLogin = () => {
    toast({ 
      title: 'Em breve', 
      description: 'Login com Google será implementado em breve' 
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-background p-4">
      {/* Container */}
      <div className="w-full max-w-[380px] bg-gradient-to-b from-white to-[#f4f7fb] dark:from-card dark:to-card/80 rounded-[40px] p-6 sm:p-8 border-[5px] border-white dark:border-border/30 shadow-[0_30px_30px_-20px_rgba(133,189,215,0.88)] dark:shadow-[0_30px_30px_-20px_rgba(99,102,241,0.3)]">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <APLogo size="lg" />
        </div>

        {/* Heading */}
        <h1 className="text-center font-black text-2xl text-primary mb-1">
          {isLogin ? 'Entrar na conta' : 'Criar Conta'}
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-6">
          {isLogin ? 'Bem-vindo de volta!' : 'Preencha os dados abaixo'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (only for signup) */}
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-white dark:bg-secondary border-none p-4 rounded-[20px] shadow-[0_10px_10px_-5px_#cff0ff] dark:shadow-[0_10px_10px_-5px_rgba(99,102,241,0.2)] border-x-2 border-x-transparent focus:border-x-primary focus:outline-none placeholder:text-muted-foreground/60 text-foreground transition-all"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive mt-2 ml-2">{errors.fullName}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
              className="w-full bg-white dark:bg-secondary border-none p-4 rounded-[20px] shadow-[0_10px_10px_-5px_#cff0ff] dark:shadow-[0_10px_10px_-5px_rgba(99,102,241,0.2)] border-x-2 border-x-transparent focus:border-x-primary focus:outline-none placeholder:text-muted-foreground/60 text-foreground transition-all"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-2 ml-2">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              required
              className="w-full bg-white dark:bg-secondary border-none p-4 rounded-[20px] shadow-[0_10px_10px_-5px_#cff0ff] dark:shadow-[0_10px_10px_-5px_rgba(99,102,241,0.2)] border-x-2 border-x-transparent focus:border-x-primary focus:outline-none placeholder:text-muted-foreground/60 text-foreground transition-all"
            />
            {errors.password && (
              <p className="text-sm text-destructive mt-2 ml-2">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password */}
          {isLogin && (
            <div className="ml-2">
              <a href="#" className="text-xs text-primary hover:underline">
                Esqueceu a senha?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-bold bg-gradient-to-r from-primary to-[#12B1D1] dark:from-primary dark:to-purple-500 text-white py-4 rounded-[20px] shadow-[0_20px_10px_-15px_rgba(133,189,215,0.88)] dark:shadow-[0_20px_10px_-15px_rgba(99,102,241,0.5)] border-none transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_23px_10px_-20px_rgba(133,189,215,0.88)] active:scale-95 active:shadow-[0_15px_10px_-10px_rgba(133,189,215,0.88)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                {isLogin ? 'Entrando...' : 'Criando...'}
              </span>
            ) : (
              isLogin ? 'Entrar' : 'Criar Conta'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-xs text-muted-foreground">ou</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 px-5 text-sm font-bold uppercase text-gray-600 dark:text-foreground bg-white dark:bg-secondary border border-black/25 dark:border-border/50 rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
        >
          <svg className="h-6" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" />
            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
          </svg>
          Entrar com Google
        </button>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          </span>{' '}
          <button
            type="button"
            onClick={toggleMode}
            className="text-primary hover:underline font-medium"
            disabled={isSubmitting}
          >
            {isLogin ? 'Criar conta' : 'Fazer login'}
          </button>
        </div>

        {/* Agreement */}
        <div className="mt-4 text-center">
          <a href="#" className="text-[10px] text-muted-foreground hover:text-primary transition-colors">
            Termos de uso e política de privacidade
          </a>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Voltar para o início
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
