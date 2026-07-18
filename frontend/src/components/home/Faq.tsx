import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How is the Alternative Credit Score calculated?",
      a: "Our XGBoost model analyzes over 150 data points from raw bank statements, UPI transaction histories, and utility bill payments. It identifies patterns in cash flow velocity, income stability, and spending ratios to accurately predict repayment probability without relying on traditional credit bureaus."
    },
    {
      q: "Is FIBO compliant with RBI guidelines?",
      a: "Yes. FIBO operates entirely within the RBI's Account Aggregator (AA) framework. We act as a Financial Information User (FIU), meaning data is fetched only with explicit, revokable consent from the applicant, and is encrypted end-to-end."
    },
    {
      q: "Can the AI decisions be explained to regulators?",
      a: "Absolutely. FIBO uses SHAP (SHapley Additive exPlanations) values to generate human-readable reasoning for every single loan decision. This ensures 100% compliance with fair lending laws and eliminates black-box AI problems."
    },
    {
      q: "How fast is the API?",
      a: "Our typical API latency is ~850ms for complete document ingestion, fraud checking, ML inference, and score generation."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white shadow-sm">
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
