import { motion } from 'framer-motion';
import { Smartphone, Zap, Shield, Globe, Clock, BarChart3 } from 'lucide-react';

export function Features() {
  const features = [
    {
      title: "Account Aggregator Integration",
      description: "Direct, secure connection to Indian banking networks via the Account Aggregator framework for real-time data fetch.",
      icon: Globe,
      span: "md:col-span-2 lg:col-span-2"
    },
    {
      title: "Real-time Processing",
      description: "Decisions rendered in milliseconds.",
      icon: Zap,
      span: "md:col-span-1 lg:col-span-1"
    },
    {
      title: "Device Agnostic",
      description: "Fully responsive platform accessible on any device.",
      icon: Smartphone,
      span: "md:col-span-1 lg:col-span-1"
    },
    {
      title: "Dynamic Dashboard",
      description: "Visualize cash flows, categorical spending, and savings trajectories with beautiful, interactive charts.",
      icon: BarChart3,
      span: "md:col-span-2 lg:col-span-2"
    },
    {
      title: "Bank-Grade Security",
      description: "End-to-end encryption for all documents.",
      icon: Shield,
      span: "md:col-span-1 lg:col-span-1"
    },
    {
      title: "24/7 Availability",
      description: "Always online, completely automated.",
      icon: Clock,
      span: "md:col-span-1 lg:col-span-1"
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Everything you need to underwrite.</h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive suite of tools designed specifically for modern financial institutions to evaluate credit risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col ${feature.span}`}
            >
              <feature.icon className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
