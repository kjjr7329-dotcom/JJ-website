import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { scrollY } = useScroll();
  
  // Parallax transforms for background blobs
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); 
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const y3 = useTransform(scrollY, [0, 500], [0, 100]);
  
  // Parallax and fade effects for text content
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleScroll = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Common button style for identical appearance
  const buttonClass = "inline-block bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-blue-900/20 cursor-pointer min-w-[140px]";

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Blobs with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[-10%] left-[-10%] z-0"
      >
        <div className="w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[-10%] right-[-10%] z-0"
      >
        <div className="w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </motion.div>

      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-[-20%] left-[20%] z-0"
      >
        <div className="w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </motion.div>

      {/* Main Content with Parallax */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="z-10 text-center px-4 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-slate-800 border border-slate-600 text-sm font-medium text-blue-300 mb-6">
            Portfolio 2024
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-normal tracking-tight whitespace-pre-line"
        >
          {data.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          {data.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 items-center"
        >
          <a href="#about" onClick={handleScroll('about')} className={buttonClass}>
            소개 보기
          </a>
          <a href="#contact" onClick={handleScroll('contact')} className={buttonClass}>
            연락하기
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator (Fades out on scroll) */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10"
      >
        <ChevronDown className="w-8 h-8 text-slate-400" />
      </motion.div>
    </section>
  );
};

export default Hero;
