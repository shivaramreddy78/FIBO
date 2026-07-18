import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../api/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm } from 'react-hook-form';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const registerSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().min(1, 'Email is required').regex(EMAIL_REGEX, 'Please enter a valid email address.'),
  mobile_number: z.string().regex(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isValid } } = useHookForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  const emailValue = watch('email');
  const isEmailValid = emailValue && !errors.email;
  const showEmailError = emailValue && errors.email;

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError('');
      // Create user
      await apiClient.post('/auth/register', {
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        mobile_number: data.mobile_number,
      });
      
      // After successful registration, route to email verification demo
      navigate('/verify-email');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-mesh opacity-80"></div>
        <div className="relative z-10 text-center text-white px-12">
          <h2 className="text-4xl font-heading font-bold mb-6">Build Your Financial Trust.</h2>
          <p className="text-white/70 text-lg max-w-md mx-auto">
            Unlock premium financial products with alternative data and transparent AI scoring.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
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

          <h1 className="text-4xl font-heading font-bold mb-2">Create an account</h1>
          <p className="text-muted-foreground mb-8">Join FIBO to get your alternative credit score.</p>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input 
                  {...register('full_name')}
                  className="w-full h-12 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
                {errors.full_name && <p className="mt-2 text-sm text-red-500">{errors.full_name.message}</p>}
              </div>

              <div className="md:col-span-1">
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

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-foreground mb-2">Mobile Number</label>
                <input 
                  {...register('mobile_number')}
                  className="w-full h-12 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
                {errors.mobile_number && <p className="mt-2 text-sm text-red-500">{errors.mobile_number.message}</p>}
              </div>
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <input 
                {...register('confirmPassword')}
                type="password"
                className="w-full h-12 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              />
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl text-lg" disabled={isSubmitting || !isValid}>
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </Button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Already have an account? <Link to="/login" className="text-secondary font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
