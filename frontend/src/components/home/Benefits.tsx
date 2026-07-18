import { motion } from 'framer-motion';
import { BrainCircuit, Zap, ShieldCheck, FileSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Benefits() {
  const benefits = [
    {
      icon: BrainCircuit,
      title: 'Better Credit Assessment',
      description: 'Evaluate customers using real financial behavior instead of only traditional credit history.'
    },
    {
      icon: Zap,
      title: 'Faster Loan Processing',
      description: 'Automatically analyze financial documents and generate AI-powered credit reports within seconds.'
    },
    {
      icon: ShieldCheck,
      title: 'Lower Lending Risk',
      description: 'Predict repayment ability using machine learning models and alternative financial data.'
    },
    {
      icon: FileSearch,
      title: 'Transparent AI Decisions',
      description: 'Every prediction includes a clear explanation, helping financial institutions understand why a recommendation was made.'
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full mb-6">
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              For Banks, Lenders & Financial Institutions
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground">
            Smarter Loan Decisions with Explainable AI
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            FIBO helps banks and financial institutions make faster and more accurate lending decisions using Artificial Intelligence.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Instead of relying only on traditional credit scores, FIBO analyzes real financial behavior such as income, spending patterns, bill payments, bank statements, and cash flow to generate a fair and transparent credit score.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This enables lenders to approve more deserving applicants while reducing financial risk.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-20">
          {benefits.map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-border hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-[#0a192f] text-white p-12 rounded-[2.5rem] relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-bl-[100px] -z-10"></div>
          <h2 className="text-3xl font-heading font-bold mb-6">Ready to Modernize Your Lending Process?</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Discover how AI-powered alternative credit scoring can help your organization approve more deserving customers while reducing lending risk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors">
              Request a Live Demo
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors border border-white/10">
              Contact Our Team
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
