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
      <div className="w-full max-w-[350px] bg-gradient-to-b from-white to-[#f4f7fb] dark:from-card dark:to-card/80 rounded-[40px] p-6 sm:p-8 border-[5px] border-white dark:border-border/30 shadow-[0_30px_30px_-20px_rgba(133,189,215,0.88)] dark:shadow-[0_30px_30px_-20px_rgba(99,102,241,0.3)]">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <APLogo size="lg" />
        </div>

        {/* Heading */}
        <h1 className="text-center font-black text-3xl text-primary mb-5">
          {isLogin ? 'Entrar' : 'Criar Conta'}
        </h1>

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

        {/* Social Login */}
        <div className="mt-6">
          <span className="block text-center text-xs text-muted-foreground">
            Ou entre com
          </span>
          <div className="flex justify-center gap-4 mt-3">
            {/* Google */}
            <button
              type="button"
              className="bg-gradient-to-br from-black to-gray-500 dark:from-primary dark:to-purple-600 border-[5px] border-white dark:border-background p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-[0_12px_10px_-8px_rgba(133,189,215,0.88)] dark:shadow-[0_12px_10px_-8px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.2] active:scale-90"
              onClick={() => toast({ title: 'Em breve', description: 'Login com Google será implementado em breve' })}
            >
              <svg className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </button>

            {/* Apple */}
            <button
              type="button"
              className="bg-gradient-to-br from-black to-gray-500 dark:from-primary dark:to-purple-600 border-[5px] border-white dark:border-background p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-[0_12px_10px_-8px_rgba(133,189,215,0.88)] dark:shadow-[0_12px_10px_-8px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.2] active:scale-90"
              onClick={() => toast({ title: 'Em breve', description: 'Login com Apple será implementado em breve' })}
            >
              <svg className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
            </button>

            {/* Twitter/X */}
            <button
              type="button"
              className="bg-gradient-to-br from-black to-gray-500 dark:from-primary dark:to-purple-600 border-[5px] border-white dark:border-background p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-[0_12px_10px_-8px_rgba(133,189,215,0.88)] dark:shadow-[0_12px_10px_-8px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.2] active:scale-90"
              onClick={() => toast({ title: 'Em breve', description: 'Login com X será implementado em breve' })}
            >
              <svg className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </button>
          </div>
        </div>

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
          <a href="#" className="text-[9px] text-primary hover:underline">
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
