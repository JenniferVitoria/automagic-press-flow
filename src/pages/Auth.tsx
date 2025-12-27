import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn, UserPlus, Moon, Sun, Eye, EyeOff, Shield, Zap, Sparkles } from 'lucide-react';
import { z } from 'zod';
import APLogo from '@/components/APLogo';
import { Button } from '@/components/ui/button';

// Validation schemas
const emailSchema = z.string().email('Email inválido').max(255, 'Email muito longo');
const passwordSchema = z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').max(72, 'Senha muito longa');
const nameSchema = z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo').optional();
const cpfSchema = z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido (formato: 000.000.000-00)');
const whatsappSchema = z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'WhatsApp inválido (formato: (11) 99999-9999)');
const birthDateSchema = z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida (formato: DD/MM/AAAA)');

// Format functions
const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  return numbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const formatWhatsApp = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  if (numbers.length <= 2) return numbers.length ? `(${numbers}` : '';
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
};

const formatBirthDate = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 8);
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`;
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    fullName?: string;
    cpf?: string;
    whatsapp?: string;
    birthDate?: string;
  }>({});
  
  const { signIn, signUp, user, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    const newErrors: { 
      email?: string; 
      password?: string; 
      confirmPassword?: string;
      fullName?: string;
      cpf?: string;
      whatsapp?: string;
      birthDate?: string;
    } = {};
    
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
    
    if (!isLogin) {
      // Validate confirm password
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem';
      }
      
      // Validate full name
      if (fullName) {
        try {
          nameSchema.parse(fullName);
        } catch (e) {
          if (e instanceof z.ZodError) {
            newErrors.fullName = e.errors[0].message;
          }
        }
      }
      
      // Validate CPF
      if (cpf) {
        try {
          cpfSchema.parse(cpf);
        } catch (e) {
          if (e instanceof z.ZodError) {
            newErrors.cpf = e.errors[0].message;
          }
        }
      }
      
      // Validate WhatsApp
      if (whatsapp) {
        try {
          whatsappSchema.parse(whatsapp);
        } catch (e) {
          if (e instanceof z.ZodError) {
            newErrors.whatsapp = e.errors[0].message;
          }
        }
      }
      
      // Validate Birth Date
      if (birthDate) {
        try {
          birthDateSchema.parse(birthDate);
        } catch (e) {
          if (e instanceof z.ZodError) {
            newErrors.birthDate = e.errors[0].message;
          }
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
        const { error } = await signUp(email, password, {
          fullName: fullName || undefined,
          cpf: cpf || undefined,
          whatsapp: whatsapp || undefined,
          birthDate: birthDate || undefined,
        });
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-hero-gradient p-4">
      {/* Theme Toggle - Fixed position */}
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

      {/* Back to Home - Fixed position */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted border border-border/50 shadow-lg text-sm"
        >
          ← Voltar
        </Button>
      </div>

      {/* Hero Section acima do form */}
      <div className="text-center mb-6 sm:mb-8 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl border border-primary/20">
            <APLogo size="lg" />
          </div>
        </div>
        
        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          O Futuro dos Blogs Chegou!
        </h1>
        
        {/* Subtítulo */}
        <p className="text-muted-foreground text-sm sm:text-base mb-3">
          Automatize seu blog agora mesmo!
        </p>
        
        {/* CTA Text */}
        <p className="text-primary font-bold text-lg sm:text-xl mb-4">
          COMECE GRÁTIS!
        </p>
        
        {/* Badges */}
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-500" /> Seguro
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-yellow-500" /> Rápido
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-500" /> Inteligente
          </span>
        </div>
      </div>

      {/* 3D Container with primary border */}
      <div 
        className="w-full max-w-[420px] relative animate-fade-in"
        style={{
          perspective: '1000px'
        }}
      >
        {/* Glow effect behind card */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-[44px] blur-2xl opacity-50 dark:opacity-30" />
        
        {/* Main card with 3D effect */}
        <div 
          className="relative bg-card rounded-[40px] p-6 sm:p-8 
            border-[4px] border-primary/40 dark:border-primary/50
            shadow-[8px_8px_0px_0px_hsl(var(--primary)/0.3),_0_25px_50px_-12px_rgba(99,102,241,0.25)]
            dark:shadow-[8px_8px_0px_0px_hsl(var(--primary)/0.4),_0_25px_50px_-12px_rgba(99,102,241,0.4)]
            transition-all duration-300 ease-out"
        >
          {/* Decorative corner accents */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/50 rounded-tl-xl" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/50 rounded-tr-xl" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/50 rounded-bl-xl" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/50 rounded-br-xl" />

          {/* Tab Toggle - Login / Cadastro */}
          <div className="flex bg-muted/50 rounded-2xl p-1.5 mb-6 border border-border/50">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setErrors({}); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isLogin 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setErrors({}); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                !isLogin 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Criar Conta
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-center text-sm text-muted-foreground mb-4">
            {isLogin ? 'Bem-vindo de volta! Entre com suas credenciais.' : 'Crie sua conta para começar.'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name (only for signup) */}
            <div className={`overflow-hidden transition-all duration-300 ${!isLogin ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-background px-4 py-3 rounded-xl 
                    border border-border
                    focus:border-primary focus:ring-1 focus:ring-primary/20
                    focus:outline-none placeholder:text-muted-foreground/50 text-foreground 
                    transition-all duration-200"
                />
                {errors.fullName && (
                  <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="w-full bg-background px-4 py-3 rounded-xl 
                  border border-border
                  focus:border-primary focus:ring-1 focus:ring-primary/20
                  focus:outline-none placeholder:text-muted-foreground/50 text-foreground 
                  transition-all duration-200"
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            {/* CPF and WhatsApp (only for signup) */}
            <div className={`overflow-hidden transition-all duration-300 ${!isLogin ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-2 gap-3">
                {/* CPF */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">CPF</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                    disabled={isSubmitting}
                    className="w-full bg-background px-4 py-3 rounded-xl 
                      border border-border
                      focus:border-primary focus:ring-1 focus:ring-primary/20
                      focus:outline-none placeholder:text-muted-foreground/50 text-foreground 
                      transition-all duration-200 text-sm"
                  />
                  {errors.cpf && <p className="text-xs text-destructive mt-1">{errors.cpf}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">WhatsApp</label>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                    disabled={isSubmitting}
                    className="w-full bg-background px-4 py-3 rounded-xl 
                      border border-border
                      focus:border-primary focus:ring-1 focus:ring-primary/20
                      focus:outline-none placeholder:text-muted-foreground/50 text-foreground 
                      transition-all duration-200 text-sm"
                  />
                  {errors.whatsapp && <p className="text-xs text-destructive mt-1">{errors.whatsapp}</p>}
                </div>
              </div>
            </div>

            {/* Birth Date (only for signup) */}
            <div className={`overflow-hidden transition-all duration-300 ${!isLogin ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Data de Nascimento</label>
                <input
                  type="text"
                  placeholder="DD/MM/AAAA"
                  value={birthDate}
                  onChange={(e) => setBirthDate(formatBirthDate(e.target.value))}
                  disabled={isSubmitting}
                  className="w-full bg-background px-4 py-3 rounded-xl 
                    border border-border
                    focus:border-primary focus:ring-1 focus:ring-primary/20
                    focus:outline-none placeholder:text-muted-foreground/50 text-foreground 
                    transition-all duration-200"
                />
                {errors.birthDate && (
                  <p className="text-xs text-destructive mt-1">{errors.birthDate}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="w-full bg-background px-4 py-3 pr-12 rounded-xl 
                    border border-border
                    focus:border-primary focus:ring-1 focus:ring-primary/20
                    focus:outline-none placeholder:text-muted-foreground/50 text-foreground 
                    transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password (only for signup) */}
            <div className={`overflow-hidden transition-all duration-300 ${!isLogin ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Confirmar Senha</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-background px-4 py-3 pr-12 rounded-xl 
                      border border-border
                      focus:border-primary focus:ring-1 focus:ring-primary/20
                      focus:outline-none placeholder:text-muted-foreground/50 text-foreground 
                      transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Forgot Password */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 font-semibold text-base
                bg-gradient-to-r from-primary to-purple-500 text-primary-foreground py-3 rounded-xl 
                border border-primary/50
                shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.3)]
                hover:shadow-[2px_2px_0px_0px_hsl(var(--primary)/0.4)]
                hover:translate-x-0.5 hover:translate-y-0.5
                active:shadow-[1px_1px_0px_0px_hsl(var(--primary)/0.4)]
                active:translate-x-1 active:translate-y-1
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0
                transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isLogin ? 'Entrando...' : 'Criando...'}
                </>
              ) : (
                <>
                  {isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="text-xs text-muted-foreground font-medium px-2">ou</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold
              text-foreground bg-background
              border border-border rounded-xl 
              hover:border-primary/40 hover:bg-muted/50
              transition-all duration-200"
          >
            <svg className="h-4" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
              <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
              <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
              <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" />
              <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
            </svg>
            Entrar com Google
          </button>

          {/* Agreement */}
          <div className="mt-4 text-center">
            <a href="#" className="text-[11px] text-muted-foreground hover:text-primary transition-colors">
              Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;