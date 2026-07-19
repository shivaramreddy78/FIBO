import { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  TrendingUp,
  Download,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { apiClient } from '../../api/client';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, YAxis as BarYAxis, XAxis as BarXAxis
} from 'recharts';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await apiClient.get('/dashboard/summary');
        setData(response.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-muted border-t-secondary rounded-full animate-spin" />
        <p className="text-muted-foreground font-medium">Loading AI Intelligence...</p>
      </div>
    );
  }

  const hasAssessment = data?.ai_assessment?.score > 300;

  if (!hasAssessment) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-border text-foreground rounded-3xl p-10 shadow-sm mb-8"
        >
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">Welcome to FIBO, {user?.email?.split('@')[0] || 'User'}</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              You have not completed an Alternative Credit Assessment yet. Upload your financial data to generate your health profile, unlock credit limits, and receive AI loan recommendations.
            </p>
            <Button size="lg" className="h-14 px-8 text-lg" onClick={() => navigate('/upload-documents')}>
              Start AI Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Data Preparation ---
  const assessment = data.ai_assessment;
  const profile = data.financial_profile;
  const isApproved = assessment.loan_recommendation.status === 'Approved';
  
  const monthlyIncome = profile?.monthly_income || 85000;
  const monthlyExpenses = profile?.monthly_expenses || 45000;
  const savingsRate = Math.round(((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100);

  const fhi = assessment.fhi || 0;
  const fhiColor = fhi > 80 ? 'text-emerald-600' : fhi > 60 ? 'text-amber-500' : 'text-red-500';
  
  // Charts Data
  const cashFlowData = [
    { name: 'Jan', balance: monthlyIncome * 0.9 - monthlyExpenses * 0.8 },
    { name: 'Feb', balance: monthlyIncome * 0.95 - monthlyExpenses * 1.1 },
    { name: 'Mar', balance: monthlyIncome * 1.1 - monthlyExpenses * 0.9 },
    { name: 'Apr', balance: monthlyIncome - monthlyExpenses },
    { name: 'May', balance: monthlyIncome * 1.05 - monthlyExpenses * 0.85 },
    { name: 'Jun', balance: monthlyIncome - monthlyExpenses * 0.95 },
  ];

  const expenseCategories = [
    { name: 'Housing', value: monthlyExpenses * 0.4 },
    { name: 'Food', value: monthlyExpenses * 0.2 },
    { name: 'Transport', value: monthlyExpenses * 0.15 },
    { name: 'Utilities', value: monthlyExpenses * 0.1 },
    { name: 'Other', value: monthlyExpenses * 0.15 },
  ];
  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#6366F1', '#94A3B8'];

  const shapData = assessment.explanation.shap_data || [];

  const recentTransactions = [
    { id: 1, date: 'Today', description: 'Amazon Web Services', category: 'Utilities', amount: -2450 },
    { id: 2, date: 'Yesterday', description: 'Salary Credit - Tech Corp', category: 'Income', amount: monthlyIncome },
    { id: 3, date: '14 Jun', description: 'Uber Rides', category: 'Transport', amount: -450 },
    { id: 4, date: '12 Jun', description: 'Starbucks Coffee', category: 'Food', amount: -320 },
    { id: 5, date: '10 Jun', description: 'Monthly Rent', category: 'Housing', amount: -(monthlyExpenses * 0.4) },
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  return (
    <div className="pb-12 space-y-6">
      
      {/* 1. HEADER & WELCOME */}
      <motion.div {...fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden">
        {assessment.explanation.is_demo_analysis && (
          <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg z-10">
            Demo Analysis Generated
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.email?.split('@')[0] || 'User'}</h1>
          <p className="text-muted-foreground text-sm">Your Alternative Credit Assessment is ready.</p>
        </div>
        <Button variant="outline" className="h-10 bg-white" onClick={() => window.print()}>
          <Download className="mr-2 h-4 w-4" /> Download PDF Report
        </Button>
      </motion.div>

      {/* 2. CORE METRICS */}
      <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => alert("Alternative Credit Score is calculated dynamically using XGBoost over 150+ behavioral features.")}
          className="bg-white rounded-2xl p-5 border border-border shadow-sm cursor-pointer hover:border-emerald-500 transition-colors"
        >
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">{t('dashboard.altCreditScore') || 'Alt Credit Score'}</p>
          <div className="text-3xl font-bold text-foreground">{assessment.score}</div>
          <div className="mt-2 flex items-center text-xs text-emerald-600 font-medium">
            <TrendingUp size={12} className="mr-1"/> Top 15% of users
          </div>
        </div>
        <div 
          onClick={() => alert("Risk Level assesses income stability, transaction velocity, and overall leverage.")}
          className="bg-white rounded-2xl p-5 border border-border shadow-sm cursor-pointer hover:border-emerald-500 transition-colors"
        >
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">{t('dashboard.riskLevel') || 'Credit Risk Level'}</p>
          <div className="text-2xl font-bold text-foreground">{assessment.risk_level}</div>
          <div className="mt-2 flex items-center text-xs text-muted-foreground font-medium">
            Based on 6 mo. history
          </div>
        </div>
        <div 
          onClick={() => alert("Repayment probability models historical utility and rent payments against standard deviation of income.")}
          className="bg-white rounded-2xl p-5 border border-border shadow-sm cursor-pointer hover:border-emerald-500 transition-colors"
        >
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">{t('dashboard.repaymentProbability') || 'Approval Prob.'}</p>
          <div className="text-3xl font-bold text-emerald-600">{assessment.repayment_probability}</div>
          <div className="mt-2 flex items-center text-xs text-emerald-600 font-medium">
            Highly likely to repay
          </div>
        </div>
        <div 
          onClick={() => alert("Health Score aggregates savings rate, debt-to-income ratio, and essential spend ratios.")}
          className="bg-white rounded-2xl p-5 border border-border shadow-sm cursor-pointer hover:border-emerald-500 transition-colors"
        >
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">{t('dashboard.financialHealth') || 'Health Score'}</p>
          <div className={`text-3xl font-bold ${fhiColor}`}>{fhi}/100</div>
          <div className="mt-2 flex items-center text-xs text-muted-foreground font-medium">
            {fhi > 80 ? 'Excellent' : fhi > 60 ? 'Good' : 'Needs Improvement'}
          </div>
        </div>
      </motion.div>

      {/* 3. FINANCIAL OVERVIEW */}
      <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/30 rounded-2xl p-5 border border-border">
          <p className="text-muted-foreground text-sm font-medium mb-1">{t('dashboard.monthlyIncome') || 'Monthly Income'}</p>
          <div className="text-2xl font-bold">₹{monthlyIncome.toLocaleString()}</div>
        </div>
        <div className="bg-muted/30 rounded-2xl p-5 border border-border">
          <p className="text-muted-foreground text-sm font-medium mb-1">{t('dashboard.monthlyExpenses') || 'Monthly Expenses'}</p>
          <div className="text-2xl font-bold">₹{monthlyExpenses.toLocaleString()}</div>
        </div>
        <div className="bg-muted/30 rounded-2xl p-5 border border-border">
          <p className="text-muted-foreground text-sm font-medium mb-1">{t('dashboard.savings') || 'Savings Rate'}</p>
          <div className="text-2xl font-bold text-emerald-600">{savingsRate}%</div>
        </div>
      </motion.div>

      {/* 4. AI DECISION & EXPLANATION */}
      <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Loan Recommendation */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className={`px-6 py-4 border-b ${isApproved ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
            <h3 className="font-bold flex items-center gap-2">
              {isApproved ? <CheckCircle className="text-emerald-600 w-5 h-5" /> : <XCircle className="text-red-600 w-5 h-5" />}
              {isApproved ? 'Approved for Loan' : 'Loan Declined'}
            </h3>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Suggested Limit</p>
              <div className="text-3xl font-bold text-foreground">
                ₹{assessment.loan_recommendation.suggested_loan_amount.toLocaleString()}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">APR</p>
                <p className="text-lg font-bold">{assessment.loan_recommendation.suggested_interest_rate}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Tenure</p>
                <p className="text-lg font-bold">36 Months</p>
              </div>
            </div>
            <Button className="w-full" onClick={() => alert("Proceeding to Smart Contract Disbursal... (Demo Mode)")}>Proceed to Disbursal</Button>
          </div>
        </div>

        {/* Explainable AI & SHAP */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col">
          <h3 className="font-bold mb-6 text-lg">AI Explanation & Credit Factors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            
            {/* Credit Factors & Summary */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Reason Behind Score</p>
                <p className="text-sm font-medium text-foreground p-4 bg-muted/30 rounded-xl border border-border">
                  {assessment.explanation.reason_behind_score}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-border rounded-xl shadow-sm">
                  <p className="text-xs text-muted-foreground mb-1">Behavior Score</p>
                  <p className="text-xl font-bold text-emerald-600">{assessment.explanation.behavior_score}/100</p>
                </div>
                <div className="p-4 bg-white border border-border rounded-xl shadow-sm">
                  <p className="text-xs text-muted-foreground mb-1">Income Stability</p>
                  <p className="text-lg font-bold text-foreground">{assessment.explanation.income_stability}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-sm font-semibold">Primary Influencers</p>
                {assessment.explanation.positive_factors?.map((factor: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="text-emerald-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{factor}</span>
                  </div>
                ))}
                {assessment.explanation.negative_factors?.map((factor: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <AlertCircle className="text-amber-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Factors (SHAP) */}
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground mb-4">Decision Factors (Model Weights)</p>
              <div className="h-64 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shapData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <BarXAxis type="number" hide />
                    <BarYAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} width={120} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="impact" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
          </div>
        </div>

      </motion.div>

      {/* 5. FINANCIAL ANALYTICS */}
      <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Financial Timeline */}
        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="font-bold mb-6 text-lg">Financial Timeline (Net Cash Flow)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={3} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending Categories */}
        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm flex flex-col">
          <h3 className="font-bold mb-6 text-lg">Spending Categories</h3>
          <div className="flex-1 min-h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategories}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseCategories.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `₹${Number(value).toLocaleString()}`} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {expenseCategories.map((cat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i]}} />
                <span className="truncate">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

      </motion.div>

      {/* 6. TRANSACTIONS & ACTIONS */}
      <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm p-6">
          <h3 className="font-bold mb-6 text-lg">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground border-b border-border">
                <tr>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors">
                    <td className="py-4 text-muted-foreground">{tx.date}</td>
                    <td className="py-4 font-medium">{tx.description}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-muted rounded text-xs">{tx.category}</span>
                    </td>
                    <td className={`py-4 text-right font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-foreground'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col">
          <h3 className="font-bold mb-6 text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-secondary" /> Recommended Actions
          </h3>
          <div className="space-y-4 flex-1">
            <div className="p-4 bg-secondary/5 border border-secondary/10 rounded-xl">
              <p className="text-sm font-semibold text-secondary mb-1">Increase Savings Rate</p>
              <p className="text-xs text-muted-foreground">Cutting discretionary spending by 10% can boost your health score by 5 points.</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <p className="text-sm font-semibold text-emerald-700 mb-1">Maintain Utility Payments</p>
              <p className="text-xs text-emerald-600/80">Your consistent utility payments are heavily boosting your alternative credit score. Keep it up.</p>
            </div>
            {assessment.fraud_flags?.length > 0 && (
               <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                 <p className="text-sm font-semibold text-red-700 mb-1">Verify Recent Anomalies</p>
                 <p className="text-xs text-red-600/80">We noticed irregular transaction timings. Review your recent transactions.</p>
               </div>
            )}
          </div>
        </div>

      </motion.div>

    </div>
  );
}
