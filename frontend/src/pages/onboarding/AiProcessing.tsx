import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Cpu, CheckCircle2, Loader2, Database, ShieldAlert, 
  Activity, FileSearch, UploadCloud, Layers, Network 
} from 'lucide-react';
import { apiClient } from '../../api/client';

const STAGES = [
  { id: 1, label: "Uploading Files", icon: UploadCloud, timeMs: 1200 },
  { id: 2, label: "Reading Financial Data", icon: FileSearch, timeMs: 1800 },
  { id: 3, label: "Cleaning Dataset", icon: Database, timeMs: 1500 },
  { id: 4, label: "Feature Engineering", icon: Layers, timeMs: 2000 },
  { id: 5, label: "Fraud Detection", icon: ShieldAlert, timeMs: 1600 },
  { id: 6, label: "XGBoost Prediction", icon: Network, timeMs: 2500 },
  { id: 7, label: "SHAP Explainability", icon: Activity, timeMs: 2200 },
  { id: 8, label: "Generating Credit Score", icon: Cpu, timeMs: 1500 }
];

export function AiProcessing() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    let isMounted = true;
    
    // Countdown timer for estimated completion
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const runSimulation = async () => {
      let totalTimeElapsed = 0;
      const totalEstimatedTime = STAGES.reduce((acc, stage) => acc + stage.timeMs, 0);

      for (let i = 0; i < STAGES.length; i++) {
        if (!isMounted) break;
        setCurrentStage(i);
        
        // Wait for the specific duration of this stage
        const stageTime = STAGES[i].timeMs + (Math.random() * 400 - 200); // Add slight randomness
        await new Promise(resolve => setTimeout(resolve, stageTime));
        
        totalTimeElapsed += stageTime;
        setProgress(Math.min(100, Math.round((totalTimeElapsed / totalEstimatedTime) * 100)));
      }
      
      if (!isMounted) return;

      // Trigger actual backend generation
      try {
        await apiClient.post('/assessment/generate');
        clearInterval(timerInterval);
        
        // Final pause for UX
        setProgress(100);
        await new Promise(resolve => setTimeout(resolve, 800));
        navigate('/dashboard');
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.detail || "AI Assessment failed to generate.");
        clearInterval(timerInterval);
      }
    };

    runSimulation();
    
    return () => { 
      isMounted = false;
      clearInterval(timerInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-primary to-primary"></div>
      
      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
         <motion.div 
           animate={{ y: [-20, 20], x: [-20, 20] }}
           transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
           className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full mix-blend-screen filter blur-[100px]"
         />
         <motion.div 
           animate={{ y: [20, -20], x: [20, -20] }}
           transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
           className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-screen filter blur-[120px]"
         />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 relative shadow-2xl">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-white/10 border-t-accent rounded-2xl"
            />
            <Cpu className="text-accent w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold font-heading text-white mb-3">AI Intelligence Engine</h2>
          <p className="text-white/60 text-lg">Running Alternative Credit Assessment...</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {error ? (
            <div className="text-red-400 text-center py-6 bg-red-400/10 rounded-xl border border-red-500/20">
              <ShieldAlert className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <p className="font-medium text-lg">{error}</p>
              <button 
                onClick={() => navigate('/upload-documents')}
                className="mt-6 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-red-100"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Progress Bar Header */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-white/50 text-sm font-medium mb-1 uppercase tracking-wider">Overall Progress</p>
                  <div className="text-3xl font-bold text-white">{progress}%</div>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-sm font-medium mb-1 uppercase tracking-wider">Est. Time Remaining</p>
                  <div className="text-xl font-medium text-accent">~{timeLeft}s</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden mb-10">
                <motion.div 
                  className="h-full bg-gradient-to-r from-secondary to-accent relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />
                </motion.div>
              </div>

              {/* Stages List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STAGES.map((stage, index) => {
                  const isCompleted = index < currentStage;
                  const isCurrent = index === currentStage;
                  const Icon = stage.icon;
                  
                  return (
                    <div 
                      key={stage.id} 
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
                        isCompleted 
                          ? 'bg-white/5 border border-white/10 opacity-100' 
                          : isCurrent 
                            ? 'bg-accent/10 border border-accent/30 opacity-100 scale-[1.02] shadow-[0_0_20px_rgba(var(--accent),0.1)]' 
                            : 'bg-transparent border border-transparent opacity-30 grayscale'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isCompleted 
                          ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                          : isCurrent 
                            ? 'bg-accent/20 text-accent shadow-[0_0_15px_rgba(var(--accent),0.2)]' 
                            : 'bg-white/5 text-white/50'
                      }`}>
                        {isCompleted ? <CheckCircle2 size={24} /> : isCurrent ? <Loader2 size={24} className="animate-spin" /> : <Icon size={20} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`block font-medium truncate ${
                          isCompleted ? 'text-white' : isCurrent ? 'text-accent font-bold' : 'text-white/50'
                        }`}>
                          {stage.label}
                        </span>
                        {(isCurrent || isCompleted) && (
                          <span className={`block text-xs mt-0.5 ${isCompleted ? 'text-emerald-400/70' : 'text-accent/70 animate-pulse'}`}>
                            {isCompleted ? 'Completed' : 'Processing...'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
