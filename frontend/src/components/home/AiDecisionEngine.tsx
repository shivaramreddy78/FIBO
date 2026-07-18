import { motion } from 'framer-motion';
import { Brain, Cpu, Fingerprint, LineChart } from 'lucide-react';

export function AiDecisionEngine() {
  const models = [
    {
      title: "XGBoost Classifier",
      description: "Our primary ensemble learning method optimized for tabular financial data, identifying non-linear patterns in cash flow velocity.",
      icon: Cpu,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Neural Anomaly Detection",
      description: "Deep learning models that instantly flag synthetic bank statements, circular transactions, and identity fraud.",
      icon: Fingerprint,
      color: "text-red-500",
      bg: "bg-red-50"
    },
    {
      title: "Explainable AI (SHAP)",
      description: "Every decision is fully transparent. SHAP values calculate the exact impact of every financial behavior on the final score.",
      icon: Brain,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      title: "Time-Series Forecasting",
      description: "ARIMA and LSTM models project future savings and income stability based on historical spending volatility.",
      icon: LineChart,
      color: "text-amber-500",
      bg: "bg-amber-50"
    }
  ];

  return (
    <section id="ai-engine" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Powered by advanced Machine Learning.</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            FIBO doesn't rely on simple rules engines. We deploy enterprise-grade machine learning models to assess risk with unprecedented accuracy and fairness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {models.map((model, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-border bg-white hover:shadow-xl transition-shadow group cursor-default"
            >
              <div className={`w-14 h-14 ${model.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <model.icon className={`w-7 h-7 ${model.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{model.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{model.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
