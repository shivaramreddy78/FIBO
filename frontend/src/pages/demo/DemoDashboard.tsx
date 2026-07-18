import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Target, 
  AlertTriangle,
  Download,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { demoProfiles } from '../../data/demoProfiles';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

export function DemoDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = demoProfiles.find(p => p.id === id);

  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Profile not found.</p>
        <Button onClick={() => navigate('/demo')}>Return to Gallery</Button>
      </div>
    );
  }

  const fhiColor = profile.fhi > 80 ? '#10B981' : profile.fhi > 60 ? '#F59E0B' : '#EF4444';
  const fhiLabel = profile.fhi > 80 ? 'Excellent' : profile.fhi > 60 ? 'Good' : profile.fhi > 40 ? 'Average' : 'Needs Improvement';
  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#6366F1', '#94A3B8'];

  return (
    <DashboardLayout>
      <div className="pb-12 space-y-8 animate-in fade-in duration-500">
        
        {/* DEMO HEADER */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img src={profile.avatar} alt="avatar" className="w-12 h-12 rounded-full bg-white shadow-sm" />
            <div>
              <p className="text-xs text-primary font-bold uppercase tracking-wider">Demo Profile Active</p>
              <h2 className="text-lg font-bold">{profile.name} — {profile.occupation}</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/demo">
              <Button variant="outline" size="sm"><ArrowLeft className="w-4 h-4 mr-2" /> Gallery</Button>
            </Link>
            <Link to="/demo/compare">
              <Button size="sm">Compare Profiles</Button>
            </Link>
          </div>
        </div>
        
        {/* 1. HEADER ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">AI Decision Intelligence</h1>
            <p className="text-muted-foreground">Comprehensive Alternative Credit Assessment Report</p>
          </div>
          <Button variant="outline" className="h-10 bg-white" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" /> Download PDF Report
          </Button>
        </div>

        {/* 2. TOP AI SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {/* Score */}
          <div className="col-span-2 bg-primary text-white rounded-2xl p-5 relative overflow-hidden shadow-md">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <p className="text-white/70 text-xs font-medium mb-1 uppercase tracking-wider">Alt Credit Score</p>
            <div className="text-4xl font-heading font-bold">{profile.score}</div>
          </div>

          {/* FHI */}
          <div className="col-span-1 bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col justify-center">
            <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Health Index</p>
            <div className="text-2xl font-bold" style={{ color: fhiColor }}>{profile.fhi}/100</div>
            <p className="text-xs text-muted-foreground mt-1">{fhiLabel}</p>
          </div>

          {/* Risk Level */}
          <div className="col-span-1 bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col justify-center">
            <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Risk Level</p>
            <div className={`text-xl font-bold ${profile.riskLevel === 'Low' ? 'text-emerald-600' : profile.riskLevel === 'Medium' ? 'text-amber-500' : 'text-red-500'}`}>
              {profile.riskLevel}
            </div>
            <div className="w-full bg-muted h-1.5 mt-2 rounded-full overflow-hidden">
              <div className={`h-full ${profile.riskLevel === 'Low' ? 'bg-emerald-500 w-1/4' : profile.riskLevel === 'Medium' ? 'bg-amber-500 w-2/4' : 'bg-red-500 w-3/4'}`}></div>
            </div>
          </div>

          {/* Repayment Prob */}
          <div className="col-span-1 bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col justify-center">
            <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Repay Prob.</p>
            <div className={`text-2xl font-bold ${parseInt(profile.repaymentProbability) > 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {profile.repaymentProbability}
            </div>
          </div>

          {/* Fraud Risk */}
          <div className="col-span-1 bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col justify-center">
            <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">Fraud Risk</p>
            <div className="flex items-center gap-1.5">
              <ShieldAlert size={20} className={profile.fraudFlags.length > 0 ? "text-amber-500" : "text-emerald-500"} />
              <span className="font-bold">{profile.fraudFlags.length > 0 ? "Flagged" : "Minimal"}</span>
            </div>
          </div>

          {/* Confidence */}
          <div className="col-span-1 bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col justify-center">
            <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">AI Confidence</p>
            <div className="text-2xl font-bold text-foreground">96%</div>
          </div>
        </div>

        {/* 3. MAIN AI DECISION & EXPLAINABILITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recommendation Panel */}
          <div className="lg:col-span-1 bg-white rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col">
            <div className={`p-6 text-white ${profile.loanRecommendation.status === 'Approved' ? 'bg-emerald-600' : profile.loanRecommendation.status === 'Conditionally Approved' ? 'bg-amber-500' : 'bg-red-600'}`}>
              <h3 className="text-white/80 font-medium mb-1">AI Loan Decision</h3>
              <div className="flex items-center gap-2">
                {profile.loanRecommendation.status === 'Approved' ? <CheckCircle size={28} /> : profile.loanRecommendation.status === 'Conditionally Approved' ? <AlertTriangle size={28} /> : <XCircle size={28} />}
                <span className="text-2xl font-bold tracking-tight uppercase">{profile.loanRecommendation.status}</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Suggested Loan Amount</p>
                  <div className="text-4xl font-heading font-extrabold text-foreground">
                    ₹{profile.loanRecommendation.amount.toLocaleString()}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/40 rounded-2xl">
                    <p className="text-xs text-muted-foreground mb-1">Interest Rate (APR)</p>
                    <p className="text-xl font-bold text-foreground">{profile.loanRecommendation.interestRate}%</p>
                  </div>
                  <div className="p-4 bg-muted/40 rounded-2xl">
                    <p className="text-xs text-muted-foreground mb-1">Suggested Tenure</p>
                    <p className="text-xl font-bold text-foreground">{profile.loanRecommendation.tenureMonths} Months</p>
                  </div>
                </div>
                {profile.loanRecommendation.condition && (
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-sm text-amber-800 font-medium flex items-start gap-2">
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                    {profile.loanRecommendation.condition}
                  </div>
                )}
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
              Based on the applicant's financial behaviour over the last six months, the XGBoost model predicts a <strong className={parseInt(profile.repaymentProbability) > 80 ? "text-emerald-600" : "text-amber-600"}>{profile.repaymentProbability} repayment probability</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-emerald-700 mb-4 flex items-center gap-2"><CheckCircle size={18}/> Positive Influencers</h3>
                <div className="space-y-3">
                  {profile.explanation.positive.map((factor, i) => (
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
                  {profile.explanation.negative.length > 0 ? profile.explanation.negative.map((factor, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100/50">
                      <div className="mt-0.5"><div className="w-2 h-2 rounded-full bg-red-500" /></div>
                      <span className="text-sm text-foreground">{factor}</span>
                    </div>
                  )) : (
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                      <span className="text-sm text-muted-foreground">No significant risk factors detected.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4. FINANCIAL ANALYTICS & CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Cash Flow */}
          <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Cash Flow Trend</h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profile.cashFlowData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}}/>
                  <Area type="monotone" dataKey="income" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" name="Income" />
                  <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" name="Expenses" />
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
                      data={profile.expenseCategories}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {profile.expenseCategories.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `₹${Number(value).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {profile.expenseCategories.slice(0,4).map((cat, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}} />
                    <span className="truncate">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-white rounded-3xl p-6 border border-border shadow-sm flex flex-col">
              <h3 className="text-sm font-bold text-muted-foreground mb-2 uppercase tracking-wider">Savings Growth</h3>
              <div className="text-2xl font-bold mb-4">₹{profile.savingsTrend[profile.savingsTrend.length-1].balance.toLocaleString()}</div>
              <div className="flex-1 min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profile.savingsTrend}>
                    <Line type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={4} dot={false} />
                    <Tooltip formatter={(value: any) => `₹${Number(value).toLocaleString()}`} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>

        {/* 5. AI INSIGHTS */}
        <div className="bg-white rounded-3xl border border-border shadow-sm p-8">
           <h3 className="text-lg font-bold mb-6">Smart AI Recommendations</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {profile.insights.map((insight, i) => (
               <div key={i} className="p-5 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
                 <div className="p-2 bg-primary/10 rounded-lg text-primary mt-1"><Target size={16}/></div>
                 <p className="text-sm font-medium leading-relaxed">{insight}</p>
               </div>
             ))}
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
