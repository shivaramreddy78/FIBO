import { useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '../ui/Button';
import { Hexagon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = memo(function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Platform', id: 'features' },
    { label: 'Solutions', id: 'benefits' },
    { label: 'Security', id: 'security' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <motion.nav 
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          scrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-sm text-primary' : 'bg-transparent text-white'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
              <Hexagon size={32} fill="currentColor" className={scrolled || mobileMenuOpen ? 'text-secondary' : 'text-accent'} />
              <div className="absolute w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-2xl font-heading font-extrabold tracking-tight">
              FIBO
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-medium">
            {navItems.map((item) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`cursor-pointer hover:text-accent transition-colors ${scrolled ? 'text-foreground/80' : 'text-white/80 hover:text-white'}`}
                >
                  {item.label}
                </a>
              ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant={scrolled ? 'primary' : 'secondary'} size="sm">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant={scrolled ? 'ghost' : 'glass'} size="sm">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileMenuOpen || scrolled ? 'bg-primary' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileMenuOpen || scrolled ? 'bg-primary' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileMenuOpen || scrolled ? 'bg-primary' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col"
        style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
      >
        <div className="flex flex-col gap-6 text-xl font-heading font-bold text-primary">
          {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
        </div>
        <div className="mt-auto pb-12 flex flex-col gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full h-12 text-lg">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-12 text-lg border-border">Sign In</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full h-12 text-lg">Get Started</Button>
                </Link>
              </>
            )}
        </div>
      </motion.div>
    </>
  );
});
