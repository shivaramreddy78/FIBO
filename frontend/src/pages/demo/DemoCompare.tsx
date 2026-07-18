import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRightLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { demoProfiles } from '../../data/demoProfiles';
import type { DemoProfile } from '../../data/demoProfiles';

export function DemoCompare() {
  const [profile1, setProfile1] = useState<DemoProfile | null>(demoProfiles[0]);
  const [profile2, setProfile2] = useState<DemoProfile | null>(demoProfiles[1]);

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Header */}
      <div className="bg-primary text-white pt-12 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <Link to="/demo" className="text-white/60 hover:text-white mb-6 inline-flex items-center text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Gallery
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 flex items-center gap-4">
            <ArrowRightLeft className="text-accent" /> Compare Applicants
          </h1>
          <p className="text-white/70 max-w-2xl">
            See exactly why the Explainable AI engine provides different loan decisions for different financial behaviours.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-6 -mt-6">
        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Applicant A</label>
            <select 
              className="w-full p-3 bg-muted/50 rounded-xl border-none outline-none font-medium"
              value={profile1?.id || ''}
              onChange={(e) => setProfile1(demoProfiles.find(p => p.id === e.target.value) || null)}
            >
              {demoProfiles.map(p => <option key={p.id} value={p.id}>{p.name} - {p.occupation}</option>)}
            </select>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Applicant B</label>
            <select 
              className="w-full p-3 bg-muted/50 rounded-xl border-none outline-none font-medium"
              value={profile2?.id || ''}
              onChange={(e) => setProfile2(demoProfiles.find(p => p.id === e.target.value) || null)}
            >
              {demoProfiles.map(p => <option key={p.id} value={p.id}>{p.name} - {p.occupation}</option>)}
            </select>
          </div>
        </div>

        {/* Comparison Grid */}
        {profile1 && profile2 && (
          <div className="bg-white rounded-3xl border border-border shadow-xl overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-border">
              
              {/* Row: Profile Header */}
              <div className="p-6 bg-muted/20"></div>
              <div className="p-6 text-center">
                <img src={profile1.avatar} className="w-20 h-20 rounded-full mx-auto mb-3 bg-muted" alt="p1"/>
                <h3 className="font-bold text-xl">{profile1.name}</h3>
                <p className="text-sm text-muted-foreground">{profile1.occupation}</p>
                <Link to={`/demo/dashboard/${profile1.id}`}>
                  <Button variant="outline" size="sm" className="mt-4">View Dashboard</Button>
                </Link>
              </div>
              <div className="p-6 text-center">
                <img src={profile2.avatar} className="w-20 h-20 rounded-full mx-auto mb-3 bg-muted" alt="p2"/>
                <h3 className="font-bold text-xl">{profile2.name}</h3>
                <p className="text-sm text-muted-foreground">{profile2.occupation}</p>
                <Link to={`/demo/dashboard/${profile2.id}`}>
                  <Button variant="outline" size="sm" className="mt-4">View Dashboard</Button>
                </Link>
              </div>

              {/* Data Rows */}
              <div className="col-span-3 border-t border-border"></div>

              <ComparisonRow label="Alternative Credit Score" val1={profile1.score} val2={profile2.score} highlightHigher />
              <ComparisonRow label="Monthly Income" val1={`₹${profile1.monthlyIncome.toLocaleString()}`} val2={`₹${profile2.monthlyIncome.toLocaleString()}`} />
              <ComparisonRow label="Cash Flow Pattern" val1={profile1.cashFlow} val2={profile2.cashFlow} />
              <ComparisonRow label="Repayment Probability" val1={profile1.repaymentProbability} val2={profile2.repaymentProbability} />
              
              <div className="col-span-3 border-t border-border"></div>

              {/* AI Decision Row */}
              <div className="p-6 font-medium text-muted-foreground flex items-center bg-muted/20">Final AI Decision</div>
              <div className={`p-6 flex flex-col items-center justify-center text-center ${profile1.loanRecommendation.status === 'Approved' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                <div className="font-bold text-xl uppercase mb-2">{profile1.loanRecommendation.status}</div>
                <div className="text-sm font-medium">₹{profile1.loanRecommendation.amount.toLocaleString()} at {profile1.loanRecommendation.interestRate}% APR</div>
              </div>
              <div className={`p-6 flex flex-col items-center justify-center text-center ${profile2.loanRecommendation.status === 'Approved' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                <div className="font-bold text-xl uppercase mb-2">{profile2.loanRecommendation.status}</div>
                <div className="text-sm font-medium">₹{profile2.loanRecommendation.amount.toLocaleString()} at {profile2.loanRecommendation.interestRate}% APR</div>
              </div>

              <div className="col-span-3 border-t border-border"></div>

              {/* Explainable AI Row */}
              <div className="p-6 font-medium text-muted-foreground bg-muted/20">Explainable AI Summary</div>
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-emerald-700 flex items-center gap-1 mb-2"><CheckCircle size={14}/> Key Strengths</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {profile1.explanation.positive.slice(0, 2).map((p, i) => <li key={i}>• {p}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-700 flex items-center gap-1 mb-2"><AlertTriangle size={14}/> Primary Risk</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {profile1.explanation.negative.slice(0, 1).map((p, i) => <li key={i}>• {p}</li>)}
                    {profile1.explanation.negative.length === 0 && <li>• None detected</li>}
                  </ul>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-emerald-700 flex items-center gap-1 mb-2"><CheckCircle size={14}/> Key Strengths</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {profile2.explanation.positive.slice(0, 2).map((p, i) => <li key={i}>• {p}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-700 flex items-center gap-1 mb-2"><AlertTriangle size={14}/> Primary Risk</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {profile2.explanation.negative.slice(0, 1).map((p, i) => <li key={i}>• {p}</li>)}
                    {profile2.explanation.negative.length === 0 && <li>• None detected</li>}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ComparisonRow({ label, val1, val2, highlightHigher = false }: { label: string, val1: any, val2: any, highlightHigher?: boolean }) {
  const isV1Higher = highlightHigher && typeof val1 === 'number' && typeof val2 === 'number' && val1 > val2;
  const isV2Higher = highlightHigher && typeof val1 === 'number' && typeof val2 === 'number' && val2 > val1;
  
  return (
    <>
      <div className="p-4 px-6 text-sm font-medium text-muted-foreground border-t border-border bg-muted/20 flex items-center">{label}</div>
      <div className={`p-4 px-6 border-t border-border text-center flex items-center justify-center font-medium ${isV1Higher ? 'text-emerald-600 bg-emerald-50/50' : ''}`}>
        {val1}
      </div>
      <div className={`p-4 px-6 border-t border-border text-center flex items-center justify-center font-medium ${isV2Higher ? 'text-emerald-600 bg-emerald-50/50' : ''}`}>
        {val2}
      </div>
    </>
  );
}
