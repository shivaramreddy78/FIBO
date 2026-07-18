import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle } from 'lucide-react';

export const ExplainableAi = React.memo(function ExplainableAi() {
  return (
    <section id="explainable-ai" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
          
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">Explainable AI</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Regulatory compliance requires lenders to explain exactly why an applicant was approved or denied. FIBO's Explainable AI (XAI) engine generates human-readable reasoning for every single decision.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <CheckCircle className="text-emerald-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">SHAP Value Integration</h4>
                  <p className="text-muted-foreground text-sm">We use SHapley Additive exPlanations to assign an exact mathematical weight to every variable influencing the credit score.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Target className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Regulatory Ready</h4>
                  <p className="text-muted-foreground text-sm">Automatically generate Adverse Action notices in compliance with global financial lending standards.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 bg-muted/30 rounded-3xl p-8 border border-border shadow-inner"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="p-2 bg-emerald-50 rounded-lg"><CheckCircle className="text-emerald-500 w-5 h-5" /></div>
                <h3 className="font-bold text-lg">AI Decision: Approved</h3>
              </div>
              
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Primary Positive Factors</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 bg-emerald-50/50 p-2 rounded-lg text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                    <span className="text-foreground">Consistent daily UPI inflows (Vendor QR)</span>
                  </div>
                  <div className="flex items-start gap-2 bg-emerald-50/50 p-2 rounded-lg text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                    <span className="text-foreground">Zero missed utility payments in 12 months</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Identified Risks</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 bg-amber-50/50 p-2 rounded-lg text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                    <span className="text-foreground">Mild seasonal dip in revenue during July-Aug</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});
