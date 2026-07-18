import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, ShieldCheck, Activity, Target, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../api/client';

export function AssessmentReport() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        // Fetch dashboard summary which includes ai_assessment
        const response = await apiClient.get('/dashboard/summary');
        setData(response.data.ai_assessment);
      } catch (error) {
        console.error("Assessment fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessment();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading Report...</div>;
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p>No assessment found.</p>
        <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    );
  }

  const isApproved = data.loan_recommendation?.status === 'Approved';

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-xl ${isApproved ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}
          >
            {isApproved ? <CheckCircle size={48} /> : <XCircle size={48} />}
          </motion.div>
          <h1 className="text-4xl font-bold font-heading mb-4">
            {isApproved ? 'Loan Assessment Approved' : 'Assessment Declined'}
          </h1>
          <p className="text-xl text-muted-foreground">Here is your comprehensive Alternative Credit Report</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Main Score Card */}
          <div className="bg-primary text-white rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
            <h3 className="text-white/70 font-medium mb-4 flex items-center gap-2"><Target size={20} /> Alternative Credit Score</h3>
            <div className="text-6xl font-heading font-extrabold mb-2">{data.score || '---'}</div>
            <p className="text-lg text-accent font-medium mb-8">Risk Level: {data.risk_level || 'Unknown'}</p>
            
            <div className="pt-6 border-t border-white/20">
              <p className="text-sm text-white/70 mb-1">Financial Health Index</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${data.fhi || 0}%` }}></div>
                </div>
                <span className="font-bold">{data.fhi || 0}/100</span>
              </div>
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col justify-center">
            <h3 className="font-bold mb-6 text-xl">Loan Recommendation</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Suggested Limit</p>
                <div className="text-4xl font-bold text-foreground">
                  ₹{data.loan_recommendation?.suggested_loan_amount?.toLocaleString() || '0'}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
                <div>
                  <p className="text-sm text-muted-foreground">Interest Rate (APR)</p>
                  <p className="text-xl font-bold">{data.loan_recommendation?.suggested_interest_rate || '0'}%</p>
                </div>
                <div className="h-10 w-px bg-border"></div>
                <div>
                  <p className="text-sm text-muted-foreground">Repayment Prob.</p>
                  <p className="text-xl font-bold text-emerald-600">{data.repayment_probability || '---'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Explainable AI */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 border border-border shadow-sm mb-12"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <Activity className="text-secondary" />
            <h3 className="text-2xl font-bold">Explainable AI Insights</h3>
          </div>
          
          <p className="text-muted-foreground mb-6">Our models analyzed your financial behavior to reach this decision. Here are the key contributing factors:</p>
          
          <div className="space-y-4">
            {data.explanation?.positive_factors?.map((factor: string, i: number) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                <CheckCircle size={24} className="text-emerald-600 flex-shrink-0" /> 
                <div>
                  <h4 className="font-bold mb-1">Positive Indicator</h4>
                  <p className="text-sm">{factor}</p>
                </div>
              </div>
            ))}
            
            {data.explanation?.negative_factors?.map((factor: string, i: number) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-red-50 text-red-800 border border-red-100">
                <XCircle size={24} className="text-red-600 flex-shrink-0" /> 
                <div>
                  <h4 className="font-bold mb-1">Risk Factor</h4>
                  <p className="text-sm">{factor}</p>
                </div>
              </div>
            ))}
            
            {data.fraud_flags?.length > 0 && (
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200">
                <ShieldCheck size={24} className="text-amber-600 flex-shrink-0" /> 
                <div>
                  <h4 className="font-bold mb-1">Security Alert</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {data.fraud_flags.map((flag: string, i: number) => (
                      <li key={i}>{flag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg" onClick={() => window.print()}>
            <Download className="mr-2 w-5 h-5" /> Download PDF
          </Button>
          <Button size="lg" className="h-14 px-8 text-lg" onClick={() => navigate('/dashboard')}>
            Continue to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
