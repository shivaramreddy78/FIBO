import { 
  ShieldAlert, 
  CheckCircle, 
  Target, 
  TrendingUp,
  AlertTriangle,
  Download
} from 'lucide-react';
import { Button } from '../ui/Button';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

export function InteractiveDashboardPreview() {
  
  const mockData = {
    score: 745,
    fhi: 82,
    risk_level: 'Low',
    repayment_probability: '92%',
    loan_recommendation: {
      status: 'Approved',
      suggested_loan_amount: 500000,
      suggested_interest_rate: 10.5
    },
    fraud_flags: [],
    explanation: {
      positive_factors: [
        "Stable monthly income detected across 6 months.",
        "Healthy savings buffer minimizes default risk.",
        "Positive cash flow trajectory."
      ],
      negative_factors: [
        "Slight increase in discretionary spending recently."
      ]
    }
  };

  const monthlyIncome = 95000;
  const monthlyExpenses = 42000;
  
  const cashFlowData = [
    { name: 'Jan', income: monthlyIncome * 0.9, expenses: monthlyExpenses * 0.8 },
    { name: 'Feb', income: monthlyIncome * 0.95, expenses: monthlyExpenses * 1.1 },
    { name: 'Mar', income: monthlyIncome * 1.1, expenses: monthlyExpenses * 0.9 },
    { name: 'Apr', income: monthlyIncome, expenses: monthlyExpenses },
    { name: 'May', income: monthlyIncome * 1.05, expenses: monthlyExpenses * 0.85 },
    { name: 'Jun', income: monthlyIncome, expenses: monthlyExpenses * 0.95 },
  ];

  const savingsTrend = cashFlowData.map((d, i) => ({
    name: d.name,
    balance: 200000 * (0.7 + (i * 0.05))
  }));

  const expenseCategories = [
    { name: 'Housing', value: monthlyExpenses * 0.4 },
    { name: 'Food', value: monthlyExpenses * 0.2 },
    { name: 'Transport', value: monthlyExpenses * 0.15 },
    { name: 'Utilities', value: monthlyExpenses * 0.1 },
    { name: 'Other', value: monthlyExpenses * 0.15 },
  ];
  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#6366F1', '#94A3B8'];


  const fhiColor = '#10B981';
  const fhiLabel = 'Excellent';

  return (
    <div className="bg-background text-foreground p-4 sm:p-6 lg:p-8 space-y-8 rounded-b-3xl">
      
      {/* HEADER ROW */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">AI Decision Intelligence</h1>
          <p className="text-muted-foreground">Comprehensive Alternative Credit Assessment Report</p>
        </div>
        <Button variant="outline" className="h-10 bg-white cursor-default hover:bg-white">
          <Download className="mr-2 h-4 w-4" /> Download PDF Report
        </Button>
      </div>

      {/* TOP AI SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {/* Score */}
        <div className="col-span-2 bg-primary text-white rounded-2xl p-5 relative overflow-hidden shadow-md">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <p className="text-white/70 text-xs font-medium mb-1 uppercase tracking-wider">Alt Credit Score</p>
          <div className="text-4xl font-heading font-bold">{mockData.score}</div>
          <div className="mt-2 flex items-center text-xs text-emerald-400 bg-emerald-400/10 w-fit px-2 py-1 rounded">
            <TrendingUp size={12} className="mr-1"/> +45 from last month
          </div>
        </div>

        {/* FHI */}
        <div className="col-span-1 bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col justify-center">
          <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Health Index</p>
          <div className="text-2xl font-bold" style={{ color: fhiColor }}>{mockData.fhi}/100</div>
          <p className="text-xs text-muted-foreground mt-1">{fhiLabel}</p>
        </div>

        {/* Risk Level */}
        <div className="col-span-1 bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col justify-center">
          <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Risk Level</p>
          <div className="text-xl font-bold text-foreground">{mockData.risk_level}</div>
          <div className="w-full bg-muted h-1.5 mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-[20%]"></div>
          </div>
        </div>

        {/* Repayment Prob */}
        <div className="col-span-1 bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col justify-center">
          <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Repay Prob.</p>
          <div className="text-2xl font-bold text-emerald-600">{mockData.repayment_probability}</div>
        </div>

        {/* Fraud Risk */}
        <div className="col-span-1 bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col justify-center">
          <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Fraud Risk</p>
          <div className="flex items-center gap-1.5">
            <ShieldAlert size={20} className="text-emerald-500" />
            <span className="font-bold">Minimal</span>
          </div>
        </div>

        {/* Confidence */}
        <div className="col-span-1 bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col justify-center">
          <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">AI Confidence</p>
          <div className="text-2xl font-bold text-foreground">96%</div>
        </div>
      </div>

      {/* MAIN AI DECISION & EXPLAINABILITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recommendation Panel */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 text-white bg-emerald-600">
            <h3 className="text-white/80 font-medium mb-1">AI Loan Decision</h3>
            <div className="flex items-center gap-2">
              <CheckCircle size={28} />
              <span className="text-3xl font-bold tracking-tight uppercase">{mockData.loan_recommendation.status}</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Suggested Loan Amount</p>
                <div className="text-4xl font-heading font-extrabold text-foreground">
                  ₹{mockData.loan_recommendation.suggested_loan_amount.toLocaleString()}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/40 rounded-2xl">
                  <p className="text-xs text-muted-foreground mb-1">Interest Rate (APR)</p>
                  <p className="text-xl font-bold text-foreground">{mockData.loan_recommendation.suggested_interest_rate}%</p>
                </div>
                <div className="p-4 bg-muted/40 rounded-2xl">
                  <p className="text-xs text-muted-foreground mb-1">Suggested Tenure</p>
                  <p className="text-xl font-bold text-foreground">36 Months</p>
                </div>
              </div>
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl text-sm text-primary font-medium">
                "Based on recent cash flows, EMI capacity is roughly ₹16,666/month."
              </div>
            </div>
          </div>
        </div>

        {/* Explainable AI Panel */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-border shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <div className="p-2 bg-secondary/10 rounded-lg"><Target className="text-secondary w-6 h-6" /></div>
            <h2 className="text-2xl font-bold">Explainable AI Insights</h2>
          </div>
          
          <p className="text-foreground text-lg mb-8 leading-relaxed">
            Based on the applicant's financial behaviour over the last six months, the XGBoost model predicts a <strong className="text-emerald-600">{mockData.repayment_probability} repayment probability</strong>. This decision is driven primarily by cash flow stability and consistent payment behaviour.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-emerald-700 mb-4 flex items-center gap-2"><CheckCircle size={18}/> Positive Influencers</h3>
              <div className="space-y-3">
                {mockData.explanation.positive_factors.map((factor, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/50">
                    <div className="mt-0.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /></div>
                    <span className="text-sm text-foreground">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2"><AlertTriangle size={18}/> Risk Factors</h3>
              <div className="space-y-3">
                {mockData.explanation.negative_factors.map((factor, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100/50">
                    <div className="mt-0.5"><div className="w-2 h-2 rounded-full bg-red-500" /></div>
                    <span className="text-sm text-foreground">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FINANCIAL ANALYTICS & CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Cash Flow */}
        <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Cash Flow Trend</h3>
            <select className="bg-muted text-sm border-none rounded-lg px-3 py-1 outline-none disabled">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="colorIncomePrev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpensePrev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}}/>
                <Area type="monotone" dataKey="income" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorIncomePrev)" name="Income" />
                <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpensePrev)" name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses & Savings */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 sm:col-span-1 bg-white rounded-3xl p-6 border border-border shadow-sm flex flex-col">
            <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">Expense Categories</h3>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseCategories.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `₹${Number(value).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {expenseCategories.slice(0,4).map((cat, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}} />
                  <span className="truncate">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white rounded-3xl p-6 border border-border shadow-sm flex flex-col">
            <h3 className="text-sm font-bold text-muted-foreground mb-2 uppercase tracking-wider">Savings Growth</h3>
            <div className="text-2xl font-bold mb-4">₹225,000</div>
            <div className="flex-1 min-h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={savingsTrend}>
                  <Line type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={4} dot={false} />
                  <Tooltip formatter={(value: any) => `₹${Number(value).toLocaleString()}`} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-emerald-600 font-medium mt-4">↑ 18% increase this quarter</p>
          </div>
        </div>

      </div>
    </div>
  );
}
