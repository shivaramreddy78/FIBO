import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, Database, TrendingUp, ShieldCheck, Activity, PieChart, CheckCircle 
} from 'lucide-react';
import { demoProfiles } from '../../data/demoProfiles';

export function DemoProcessing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const profile = demoProfiles.find(p => p.id === id);

  const steps = [
    { name: 'Reading Documents & PDFs', icon: FileText },
    { name: 'Extracting Transactions', icon: Database },
    { name: 'Categorizing Expenses', icon: PieChart },
    { name: 'Analyzing Cash Flow & Savings', icon: TrendingUp },
    { name: 'Fraud & Anomaly Detection', icon: ShieldCheck },
    { name: 'Feature Engineering', icon: Activity },
    { name: 'XGBoost Prediction Inference', icon: Activity },
    { name: 'Calculating Alt Credit Score', icon: CheckCircle },
  ];

  useEffect(() => {
    if (!profile) {
      navigate('/demo');
      return;
    }

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(() => {
            navigate(`/demo/dashboard/${id}`);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800); // Fast simulation

    return () => clearInterval(timer);
  }, [id, navigate, profile, steps.length]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <img src={profile.avatar} alt="avatar" className="w-20 h-20 rounded-full mx-auto mb-4 bg-white/10 p-1" />
          <h2 className="text-2xl font-bold">Analyzing {profile.name}'s Profile</h2>
          <p className="text-white/50">Processing 6 months of financial behaviour...</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="space-y-4 relative z-10">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;
              
              return (
                <motion.div 
                  key={idx}
                  animate={{ opacity: isActive || isPast ? 1 : 0.3, scale: isActive ? 1.02 : 1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${isActive ? 'bg-white/10 border-accent shadow-[0_0_15px_rgba(45,212,191,0.2)]' : 'bg-transparent border-transparent'}`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-accent/20 text-accent' : isPast ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/50'}`}>
                    {isPast ? <CheckCircle size={20} /> : <step.icon size={20} />}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm md:text-base">{step.name}</span>
                    {isActive && (
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "100%" }} 
                        transition={{ duration: 0.8, ease: "linear" }}
                        className="h-1 bg-accent mt-2 rounded-full"
                      />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
