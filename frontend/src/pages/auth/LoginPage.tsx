import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm } from 'react-hook-form';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').regex(EMAIL_REGEX, 'Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isValid } } = useHookForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const emailValue = watch('email');
  const isEmailValid = emailValue && !errors.email;
  const showEmailError = emailValue && errors.email;

  const onSubmit = async (data: LoginForm) => {
    try {
      setError('');
      // FastAPI requires application/x-www-form-urlencoded for OAuth2 password bearer
      const formData = new URLSearchParams();
      formData.append('username', data.email);
      formData.append('password', data.password);
      
      const response = await apiClient.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      await login(response.data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center gap-2 mb-10 group">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative flex items-center justify-center text-accent">
                <Hexagon size={32} fill="currentColor" />
                <div className="absolute w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-2xl font-heading font-extrabold text-foreground">FIBO</span>
            </Link>
          </div>

          <h1 className="text-4xl font-heading font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to access your financial dashboard.</p>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <input 
                  {...register('email')}
                  className={`w-full h-12 px-4 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
                    showEmailError ? 'border-red-500 focus:ring-red-500/20' : 
                    isEmailValid ? 'border-emerald-500 focus:ring-emerald-500/20' : 
                    'border-border focus:ring-secondary/20'
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showEmailError && <XCircle className="w-5 h-5 text-red-500" />}
                  {isEmailValid && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </div>
              </div>
              {showEmailError && <p className="mt-2 text-sm text-red-500">{errors.email?.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input 
                {...register('password')}
                type="password"
                className="w-full h-12 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              />
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-secondary hover:underline">Forgot password?</Link>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl text-lg" disabled={isSubmitting || !isValid}>
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
            </Button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Don't have an account? <Link to="/register" className="text-secondary font-medium hover:underline">Sign up</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-mesh opacity-80"></div>
        <div className="relative z-10 text-center text-white px-12">
          <h2 className="text-4xl font-heading font-bold mb-6">Financial Intelligence,<br/>Simplified.</h2>
          <p className="text-white/70 text-lg max-w-md mx-auto">
            Experience the future of alternative credit scoring driven by transparent AI.
          </p>
        </div>
      </div>
    </div>
  );
}
