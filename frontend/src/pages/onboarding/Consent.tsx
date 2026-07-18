import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Check, ArrowRight, FileText, Lock, Database } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../api/client';

export function Consent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConsent = async () => {
    if (!agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy to continue.");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      await apiClient.post('/consent', { has_consented: true });
      navigate('/financial-profile');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to submit consent. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">Data Consent</h1>
            <p className="text-muted-foreground">Account Aggregator Framework</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="text-primary">Step 2 of 4</span>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div className="w-2/4 h-full bg-secondary"></div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border border-border shadow-sm"
        >
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Your data is secure and encrypted</h2>
              <p className="text-muted-foreground">FIBO uses bank-grade encryption to protect your financial information. We only analyze your data to generate your Alternative Credit Score.</p>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <h3 className="font-bold text-lg">What you are agreeing to:</h3>
            
            <div className="flex gap-4 p-4 rounded-2xl bg-muted/30 border border-border">
              <Database className="text-secondary w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Data Access</h4>
                <p className="text-sm text-muted-foreground">You grant FIBO permission to securely fetch your bank statements, UPI transaction history, and utility bill payments for the sole purpose of credit assessment.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-muted/30 border border-border">
              <FileText className="text-secondary w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">AI Processing</h4>
                <p className="text-sm text-muted-foreground">You acknowledge that your financial data will be processed by our Explainable AI models to determine cash flow stability, savings patterns, and fraud risk.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-muted/30 border border-border">
              <Lock className="text-secondary w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Data Privacy</h4>
                <p className="text-sm text-muted-foreground">Your data is never sold to third parties. You can revoke this consent at any time from your account settings.</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="pt-1 relative flex items-start">
              <input 
                type="checkbox" 
                id="consent-checkbox"
                className="w-5 h-5 cursor-pointer accent-primary" 
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  setError(null);
                }}
              />
            </div>
            <label htmlFor="consent-checkbox" className="text-sm text-foreground cursor-pointer leading-relaxed">
              I have read and agree to the <a href="#" className="text-secondary hover:underline">Terms of Service</a>, <a href="#" className="text-secondary hover:underline">Privacy Policy</a>, and explicitly consent to the fetching and processing of my financial data via the Account Aggregator framework.
            </label>
          </div>

          {error && (
            <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-start gap-2">
              <div className="mt-0.5"><Check size={16} /></div>
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
            <Button variant="ghost" className="w-full sm:w-auto" onClick={() => navigate('/kyc')}>
              Back
            </Button>
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-12 px-8" 
              onClick={handleConsent}
              disabled={loading}
            >
              {loading ? 'Recording Consent...' : (
                <>I Agree & Continue <ArrowRight className="ml-2 w-5 h-5" /></>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
