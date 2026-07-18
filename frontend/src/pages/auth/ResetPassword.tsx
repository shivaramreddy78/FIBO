import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../api/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm } from 'react-hook-form';

const resetSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetForm = z.infer<typeof resetSchema>;

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenParam = searchParams.get('token') || '';
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useHookForm<ResetForm>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      token: tokenParam
    }
  });

  const onSubmit = async (data: ResetForm) => {
    try {
      setError('');
      await apiClient.post('/auth/reset-password', {
        token: data.token,
        new_password: data.password
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid or expired token.');
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

          <h1 className="text-4xl font-heading font-bold mb-2">Set New Password</h1>
          <p className="text-muted-foreground mb-8">Enter your new secure password below.</p>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {isSuccess ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center space-y-4"
             >
               <CheckCircle className="w-12 h-12 text-emerald-500" />
               <h3 className="font-bold text-emerald-900 text-lg">Password Reset Successfully!</h3>
               <p className="text-sm text-emerald-800">
                 You can now log in with your new password. Redirecting to login...
               </p>
             </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {!tokenParam && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Reset Token (Demo Mode)</label>
                  <input 
                    {...register('token')}
                    className="w-full h-12 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                    placeholder="Paste token from console here"
                  />
                  {errors.token && <p className="mt-2 text-sm text-red-500">{errors.token.message}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                <input 
                  type="password"
                  {...register('password')}
                  className="w-full h-12 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  placeholder="••••••••"
                />
                {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                <input 
                  type="password"
                  {...register('confirmPassword')}
                  className="w-full h-12 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-500">{errors.confirmPassword.message}</p>}
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl text-lg" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Reset Password'}
              </Button>
            </form>
          )}
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
