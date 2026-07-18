import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, Loader2, CheckCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../api/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm } from 'react-hook-form';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').regex(EMAIL_REGEX, 'Please enter a valid email address.'),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export function ForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isValid } } = useHookForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
    mode: 'onChange'
  });

  const emailValue = watch('email');
  const isEmailValid = emailValue && !errors.email;
  const showEmailError = emailValue && errors.email;

  const onSubmit = async (data: ForgotForm) => {
    try {
      setError('');
      const response = await apiClient.post('/auth/forgot-password', data);
      
      // For hackathon demo, we log the token or use it immediately
      // In production, this would just say "Email sent".
      setIsSuccess(true);
      
      if (response.data.token) {
        // Just for demo convenience: save it so user can copy it or we redirect
        console.log("DEMO MODE RESET TOKEN: ", response.data.token);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred. Please try again.');
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

          <h1 className="text-4xl font-heading font-bold mb-2">Reset Password</h1>
          <p className="text-muted-foreground mb-8">Enter your email address and we'll send you a link to reset your password.</p>

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
               <h3 className="font-bold text-emerald-900 text-lg">Reset Link Sent</h3>
               <p className="text-sm text-emerald-800">
                 If that email is in our database, we've sent a password reset link. Please check your inbox.
               </p>
               <p className="text-xs text-muted-foreground mt-4">(Check the browser console for the Demo Token)</p>
               <Link to="/reset-password">
                  <Button variant="outline" className="mt-4 border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                    Go to Reset Page (Demo)
                  </Button>
               </Link>
             </motion.div>
          ) : (
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

              <Button type="submit" className="w-full h-12 rounded-xl text-lg" disabled={isSubmitting || !isValid}>
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
              </Button>
            </form>
          )}

          <p className="mt-8 text-center text-muted-foreground">
            Remembered your password? <Link to="/login" className="text-secondary font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-mesh opacity-80"></div>
        <div className="relative z-10 text-center text-white px-12">
          <h2 className="text-4xl font-heading font-bold mb-6">Bank-grade Security.</h2>
          <p className="text-white/70 text-lg max-w-md mx-auto">
            Your data is protected by enterprise-level encryption and secure authentication protocols.
          </p>
        </div>
      </div>
    </div>
  );
}
