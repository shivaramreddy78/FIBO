import { motion } from 'framer-motion';
import { Building, Users, FileText, XCircle, Hexagon, Cpu, CheckCircle } from 'lucide-react';

export function TraditionalCredit() {
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
          
          {/* Traditional Flow */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-border shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2"><Building className="text-red-500" /> Traditional Lending</h3>
              
              <div className="space-y-4 relative">
                <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-xl">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><Users size={18} /></div>
                  <div><p className="font-medium">Applicant</p><p className="text-xs text-muted-foreground">No CIBIL Score</p></div>
                </div>
                <div className="w-0.5 h-6 bg-border mx-auto"></div>
                <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-xl">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><FileText size={18} /></div>
                  <div><p className="font-medium">Credit Bureau Check</p><p className="text-xs text-muted-foreground">Insufficient Data</p></div>
                </div>
                <div className="w-0.5 h-6 bg-border mx-auto"></div>
                <div className="flex items-center gap-4 bg-red-50 p-4 rounded-xl border border-red-100 text-red-700">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"><XCircle size={18} /></div>
                  <div><p className="font-bold">Loan Rejected</p><p className="text-xs text-red-600/80">Systemic Exclusion</p></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FIBO Flow */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0a192f] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2"><Hexagon className="text-accent" /> The FIBO Approach</h3>
              
              <div className="space-y-4 relative">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><Users size={18} /></div>
                  <div><p className="font-medium">Applicant</p><p className="text-xs text-white/60">Real Financial Activity</p></div>
                </div>
                <div className="w-0.5 h-6 bg-white/10 mx-auto"></div>
                <div className="flex items-center gap-4 bg-primary/20 p-4 rounded-xl border border-primary/30">
                  <div className="w-10 h-10 bg-primary/40 rounded-full flex items-center justify-center text-accent"><Cpu size={18} /></div>
                  <div><p className="font-medium">Behavioral Cash Flow Analysis</p><p className="text-xs text-white/60">UPI, Bills, Bank Statements</p></div>
                </div>
                <div className="w-0.5 h-6 bg-white/10 mx-auto"></div>
                <div className="flex items-center gap-4 bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/30 text-emerald-50">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center"><CheckCircle size={18} /></div>
                  <div><p className="font-bold">Alternative Credit Score</p><p className="text-xs text-emerald-200/80">Fair Loan Approved</p></div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
