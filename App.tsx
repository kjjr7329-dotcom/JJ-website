import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Lock } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import SkillsAndInterests from './components/SkillsAndInterests';
import Contact from './components/Contact';
import Admin from './components/Admin';
import { PortfolioProvider, usePortfolio } from './contexts/PortfolioContext';

// 내부 컨텐츠 (Context 사용을 위해 분리)
const AppContent: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const { isAdminMode, setAdminMode } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen selection:bg-blue-500 selection:text-white">
      {/* Admin Modal */}
      {isAdminMode && <Admin />}

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-xl font-bold tracking-tighter text-white">
            <span className="text-blue-500"></span>INVESTOR & EXPLORER
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            <button 
              onClick={() => setAdminMode(true)}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Lock size={14} />
              Admin Login
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Timeline />
        <SkillsAndInterests />
        <Contact />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
};

export default App;