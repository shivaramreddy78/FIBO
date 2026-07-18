import { motion } from 'framer-motion';

export function ProblemStatement() {
  return (
    <section id="problem" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold mb-6 tracking-tight"
          >
            A massive global economy remains <span className="text-primary">invisible.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed mb-12"
          >
            Over 1.4 billion adults globally are unbanked, and millions more are "credit invisible." They pay utility bills, earn regular income, and manage cash flows—but without a traditional CIBIL score, they are systematically denied access to fair credit.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { stat: "80%", label: "Of MSMEs lack access to formal credit" },
              { stat: "1.4B", label: "Adults worldwide without banking history" },
              { stat: "$5T", label: "Estimated global credit gap for micro-businesses" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="border-l-2 border-primary/20 pl-6"
              >
                <div className="text-4xl font-heading font-black text-foreground mb-2">{item.stat}</div>
                <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
