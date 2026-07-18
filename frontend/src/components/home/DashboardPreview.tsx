import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CreditCard, DollarSign } from 'lucide-react';

export const DashboardPreview = React.memo(function DashboardPreview() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Glow effect behind dashboard */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent to-secondary rounded-2xl blur-2xl opacity-20 animate-pulse" />
      
      {/* Dashboard Glass Container */}
      <div className="relative glass-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-2xl p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-secondary flex items-center justify-center">
              <span className="text-white font-bold">785</span>
            </div>
            <div>
              <h3 className="text-white font-heading font-semibold text-xl">Alternative Credit Score</h3>
              <p className="text-accent text-sm font-medium">Risk Level: Low</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <h4 className="text-white/60 text-sm">Repayment Probability</h4>
            <p className="text-white font-bold text-lg">94.2%</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Activity size={20} />
              </div>
              <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-white/60 text-sm mb-1">Monthly Cashflow</p>
            <p className="text-white font-semibold text-2xl">₹42,500</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <CreditCard size={20} />
              </div>
              <span className="text-blue-400 text-xs font-bold bg-blue-400/10 px-2 py-1 rounded-full">Consistent</span>
            </div>
            <p className="text-white/60 text-sm mb-1">Utility Payments</p>
            <p className="text-white font-semibold text-2xl">100% On-time</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <DollarSign size={20} />
              </div>
            </div>
            <p className="text-white/60 text-sm mb-1">Recommended Loan</p>
            <p className="text-white font-semibold text-2xl">₹1,50,000</p>
          </motion.div>
        </div>

        {/* Chart Placeholder */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-5 h-48 flex items-end gap-2 relative">
          <div className="absolute top-4 left-5 text-white/60 text-sm">Income vs Expenses Analysis</div>
          {/* Animated Bars */}
          {[40, 65, 30, 80, 50, 90, 70, 100, 60, 85].map((height, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
              className={`w-full rounded-t-sm opacity-80 ${i % 2 === 0 ? 'bg-secondary' : 'bg-accent'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
