import { Lock, ShieldCheck, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export function Security() {
  return (
    <section id="security" className="py-24 bg-[#0a192f] text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full opacity-10 pointer-events-none">
        <div className="w-full h-full border-[1px] border-white/20 rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Lock className="w-8 h-8 text-accent" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Bank-grade security. <br/>By default.</h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-16">
          FIBO operates on a zero-trust architecture. We process data strictly for credit assessment and never sell financial information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
          >
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">SOC 2 Type II Compliant</h3>
            <p className="text-sm text-white/60 leading-relaxed">Rigorous security protocols ensuring all organizational data and customer PII is protected against unauthorized access.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
          >
            <Database className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">Data Minimization</h3>
            <p className="text-sm text-white/60 leading-relaxed">Raw bank statements are parsed in-memory, converted to numerical vectors for XGBoost, and instantly discarded.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
          >
            <Lock className="w-8 h-8 text-accent mb-4" />
            <h3 className="font-bold text-lg mb-2">Account Aggregator Ready</h3>
            <p className="text-sm text-white/60 leading-relaxed">Fully compliant with the RBI Account Aggregator framework, ensuring explicit, revokable user consent for all data access.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
