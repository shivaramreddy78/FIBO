import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-white border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-primary text-white p-12 md:p-16 rounded-[3rem] relative overflow-hidden shadow-xl text-center"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to Experience Smarter Lending?</h2>
            <p className="text-xl text-white/80 leading-relaxed mb-10">
              Discover how FIBO uses Explainable AI and alternative financial data to generate fair, accurate, and transparent credit assessments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-emerald-400 text-primary font-bold rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                Request a Demo <ArrowRight size={20} />
              </Link>
              <a href="mailto:sales@fibo.ai" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2">
                <MessageCircle size={20} /> Contact Sales
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
