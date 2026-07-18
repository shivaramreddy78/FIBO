import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { demoProfiles } from '../../data/demoProfiles';
import { ArrowRight, Briefcase, MapPin, IndianRupee, PieChart, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function DemoGallery() {
  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Header */}
      <div className="bg-primary text-white pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Link to="/" className="text-white/60 hover:text-white mb-6 inline-block text-sm">&larr; Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Demo Profile Gallery</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Select a realistic applicant profile to see how the FIBO Explainable AI engine evaluates them based purely on financial behaviour.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/demo/compare">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Compare Applicants
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto max-w-6xl px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoProfiles.map((profile, idx) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all p-6 flex flex-col group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              
              <div className="flex items-center gap-4 mb-6">
                <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full bg-muted" />
                <div>
                  <h3 className="font-bold text-lg leading-tight">{profile.name}</h3>
                  <p className="text-muted-foreground text-sm flex items-center gap-1"><Briefcase size={14}/> {profile.occupation}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1"><MapPin size={14}/> Location</span>
                  <span className="font-medium">{profile.city}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1"><IndianRupee size={14}/> Monthly Income</span>
                  <span className="font-medium">₹{profile.monthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1"><PieChart size={14}/> Cash Flow</span>
                  <span className="font-medium">{profile.cashFlow}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1"><ShieldAlert size={14}/> Existing Loans</span>
                  <span className="font-medium">{profile.existingLoans}</span>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-xl mb-6 text-xs text-muted-foreground italic border border-border/50">
                "{profile.summary}"
              </div>

              <Link to={`/demo/processing/${profile.id}`} className="mt-auto">
                <Button className="w-full justify-between h-12 bg-primary/5 text-primary hover:bg-primary/10 border-none group-hover:bg-primary group-hover:text-white transition-colors">
                  Run AI Assessment <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
