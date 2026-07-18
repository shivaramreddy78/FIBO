import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Database, TrendingUp, ShieldCheck, Activity, PieChart, CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const [activePipelineStep, setActivePipelineStep] = useState(0);

  const pipelineSteps = [
    { name: 'Document Parsing (Bank/UPI/Bills)', icon: FileText },
    { name: 'Transaction Extraction & Normalization', icon: Database },
    { name: 'Income & Expense Categorization', icon: PieChart },
    { name: 'Cash Flow & Savings Trajectory', icon: TrendingUp },
    { name: 'Fraud & Integrity Validation', icon: ShieldCheck },
    { name: 'XGBoost Repayment Prediction', icon: Activity },
    { name: 'Generate Alternative Credit Score', icon: CheckCircle },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePipelineStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [pipelineSteps.length]);

  return (
    <section id="how-it-works" className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#0a192f] -z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Built for scale. Designed for speed.</h2>
          <p className="text-lg text-white/70">
            A seamless, 100% digital pipeline that transforms raw financial history into a definitive Alternative Credit Score in milliseconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">The Core Processing Engine</h3>
            <p className="text-white/70 leading-relaxed">
              FIBO's architecture is heavily optimized to ingest unstructured financial data (like PDFs and raw JSON APIs) and pass it through a highly tuned machine learning pipeline. 
              We utilize ensemble models to calculate risk and predict repayment probability with extreme accuracy.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                <div className="text-2xl font-bold text-accent mb-1">~850ms</div>
                <div className="text-xs text-white/60 font-medium uppercase tracking-wider">Avg API Latency</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                <div className="text-2xl font-bold text-emerald-400 mb-1">99.9%</div>
                <div className="text-xs text-white/60 font-medium uppercase tracking-wider">Uptime SLA</div>
              </div>
            </div>
          </div>
          
          {/* Animated Pipeline UI */}
          <div className="glass-dark border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] -z-10" />
            <div className="space-y-3 relative z-10">
              {pipelineSteps.map((step, idx) => {
                const isActive = idx === activePipelineStep;
                const isPast = idx < activePipelineStep;
                
                return (
                  <motion.div 
                    key={idx}
                    animate={{ opacity: isActive || isPast ? 1 : 0.3, scale: isActive ? 1.02 : 1 }}
                    className={`flex items-center gap-4 p-3 rounded-xl border ${isActive ? 'bg-white/10 border-accent shadow-[0_0_15px_rgba(45,212,191,0.15)]' : 'bg-transparent border-transparent'}`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-accent/20 text-accent' : isPast ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                      {isPast ? <CheckCircle size={16} /> : <step.icon size={16} />}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-sm">{step.name}</span>
                      {isActive && (
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: "100%" }} 
                          transition={{ duration: 2, ease: "linear" }}
                          className="h-0.5 bg-accent mt-1.5 rounded-full opacity-50"
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
    </section>
  );
}
