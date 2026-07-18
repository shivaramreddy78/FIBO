import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function EmailVerification() {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  useEffect(() => {
    // Simulate email verification delay
    const timer = setTimeout(() => {
      setVerifying(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-border text-center"
      >
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          {verifying ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-muted border-t-secondary rounded-full"
            />
          ) : (
            <CheckCircle className="text-emerald-500 w-10 h-10" />
          )}
          <Mail className={verifying ? "text-secondary w-8 h-8" : "text-emerald-500 w-8 h-8 opacity-0 absolute"} />
        </div>

        <h2 className="text-2xl font-bold font-heading mb-3">
          {verifying ? 'Verifying your email...' : 'Email Verified!'}
        </h2>
        
        <p className="text-muted-foreground mb-8">
          {verifying 
            ? 'We are confirming your email address. This will only take a moment.' 
            : 'Your account has been successfully verified. You can now access the FIBO platform.'}
        </p>

        <Button 
          className="w-full h-12 text-lg" 
          disabled={verifying}
          onClick={() => navigate('/login')}
        >
          Continue to Login <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
}
