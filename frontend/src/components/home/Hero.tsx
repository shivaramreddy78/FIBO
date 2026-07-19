import { motion } from 'framer-motion';
import { ArrowRight, Zap, PlayCircle, Hexagon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { InteractiveDashboardPreview } from './InteractiveDashboardPreview';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleStart = () => {
    if (isAuthenticated) navigate('/dashboard');
    else navigate('/register');
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-20 overflow-hidden bg-white text-foreground">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8 text-primary font-medium text-sm shadow-sm"
        >
          <Zap size={14} className="text-primary" />
          <span>FIBO API v2.0 is now live</span>
          <div className="w-px h-4 bg-primary/20 mx-1" />
          <Link to="/demo" className="text-primary hover:underline flex items-center gap-1">View docs <ArrowRight size={12}/></Link>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }} 
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-extrabold tracking-tight mb-6 max-w-5xl leading-[1.05] flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
        >
          <div className="flex items-center gap-4 text-primary">
            <div className="relative flex items-center justify-center text-accent">
              <Hexagon className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" fill="currentColor" />
              <div className="absolute w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-white rounded-full"></div>
            </div>
            <span>FIBO</span>
          </div>
          <span>{t('landing.heroTitle') || 'Financial Inclusion for All'}</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl leading-relaxed"
        >
          {t('landing.heroSubtitle') || 'FIBO is an AI-powered Alternative Credit Assessment Platform that helps banks and financial institutions make smarter lending decisions using real financial behavior instead of relying only on traditional credit scores.'}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }} 
          className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full justify-center max-w-2xl mx-auto"
        >
          <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all" onClick={handleStart}>
            {t('landing.getStarted') || 'Start Live Assessment'} <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Link to="/demo" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full h-14 px-8 text-lg bg-white hover:bg-muted/50 border-border">
              <PlayCircle className="mr-2 w-5 h-5 text-primary" /> Explore Demo
            </Button>
          </Link>
        </motion.div>

        {/* Dashboard Preview Injection */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.5 }} 
          className="w-full max-w-6xl relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-emerald-500/20 to-primary/20 rounded-[2.5rem] blur-lg opacity-50"></div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-border relative z-10">
            {/* MacOS Window Mockup */}
            <div className="bg-muted/30 border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <div className="mx-auto bg-white px-32 py-1 rounded-md text-xs text-muted-foreground font-medium flex items-center gap-2 border border-border shadow-sm">
                fibo.app/dashboard
              </div>
            </div>
            <div className="max-h-[600px] overflow-y-auto overflow-x-hidden p-0 relative">
              {/* Overlay gradient to fade out bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
              <InteractiveDashboardPreview />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
