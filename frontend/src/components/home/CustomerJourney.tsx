import { motion } from 'framer-motion';
import { UserCheck, FileKey, UploadCloud, Cpu, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CustomerJourney() {
  const steps = [
    { num: "01", icon: UserCheck, title: "Identity", desc: "Verify identity via PAN & Aadhaar" },
    { num: "02", icon: FileKey, title: "Consent", desc: "Approve data access" },
    { num: "03", icon: UploadCloud, title: "Ingestion", desc: "Upload or fetch financial history" },
    { num: "04", icon: Cpu, title: "AI Analysis", desc: "Behavioral processing in ms" },
    { num: "05", icon: LayoutDashboard, title: "Decision", desc: "View the AI Dashboard" }
  ];

  return (
    <section id="journey" className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">A frictionless journey.</h2>
          <p className="text-lg text-muted-foreground">
            Applicants complete the entire onboarding and assessment flow in under 3 minutes.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10"></div>
            
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center mb-8 md:mb-0 w-full md:w-1/5 px-2 group"
              >
                <div className="w-24 h-24 bg-white rounded-3xl border border-border shadow-sm flex flex-col items-center justify-center mb-6 relative group-hover:border-primary group-hover:shadow-md transition-all">
                  <span className="absolute top-2 left-2 text-[10px] font-bold text-muted-foreground">{step.num}</span>
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/register" className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg">
              Experience the Onboarding Flow
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
