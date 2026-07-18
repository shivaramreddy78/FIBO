import { Hero } from '../components/home/Hero';
import { ProblemStatement } from '../components/home/ProblemStatement';
import { TraditionalCredit } from '../components/home/TraditionalCredit';
import { HowItWorks } from '../components/home/HowItWorks';
import { Features } from '../components/home/Features';
import { Benefits } from '../components/home/Benefits';
import { ExplainableAi } from '../components/home/ExplainableAi';
import { Security } from '../components/home/Security';
import { CustomerJourney } from '../components/home/CustomerJourney';
import { Faq } from '../components/home/Faq';
import { Contact } from '../components/home/Contact';
import { Footer } from '../components/home/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ProblemStatement />
      <TraditionalCredit />
      <HowItWorks />
      <Features />
      <Benefits />
      <ExplainableAi />
      <Security />
      <CustomerJourney />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}
