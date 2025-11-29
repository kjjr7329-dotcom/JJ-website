import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Edit2 } from 'lucide-react';
import { SiteContent } from '../types';

interface HeroProps {
  content: SiteContent['hero'];
  isAdmin: boolean;
  onUpdate: (key: string, value: string) => void;
}

const Hero: React.FC<HeroProps> = ({ content, isAdmin, onUpdate }) => {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); 
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const y3 = useTransform(scrollY, [0, 500], [0, 100]);
  
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

  const buttonClass = "inline-block bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-blue-900/20 cursor-pointer min-w-[140px]";

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Blobs (Hidden as per previous update, kept structure just in case but empty or transparent) */}
      <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] z-0 opacity-0">
        <div className="w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
      </motion.div>
      
      {/* Main Content */}
      <motion.div style={{ y: textY, opacity }} className="z-10 text-center px-4 max-w-4xl w-full">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block"
        >
          {isAdmin ? (
            <input
              value={content.badge}
              onChange={(e) => onUpdate('badge', e.target.value)}
              className="mb-6 bg-slate-800 border border-blue-500 text-blue-300 text-sm font-medium rounded-full py-1 px-4 text-center focus:outline-none w-auto min-w-[150px]"
            />
          ) : (
            <span className="inline-block py-1 px-4 rounded-full bg-slate-800 border border-slate-600 text-sm font-medium text-blue-300 mb-6">
              {content.badge}
            </span>
          )}
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 relative"
        >
          {isAdmin ? (
             <div className="relative group">
                <Edit2 className="absolute -right-8 top-0 text-blue-500 opacity-50" size={20} />
                <textarea
                  value={content.title}
                  onChange={(e) => onUpdate('title', e.target.value)}
                  className="w-full text-4xl md:text-6xl font-serif font-bold bg-slate-800/50 border border-blue-500 rounded-xl p-4 text-center text-white focus:outline-none resize-none"
                  rows={2}
                />
             </div>
          ) : (
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight tracking-tight whitespace-pre-line drop-shadow-xl text-slate-100">
              <span dangerouslySetInnerHTML={{ __html: content.title.replace('김종진', '<span class="gradient-text">김종진</span>') }} />
            </h1>
          )}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {isAdmin ? (
            <textarea
              value={content.description}
              onChange={(e) => onUpdate('description', e.target.value)}
              className="w-full text-lg md:text-xl bg-slate-800/50 border border-blue-500 rounded-xl p-4 text-center text-slate-200 mb-10 focus:outline-none resize-none"
              rows={3}
            />
          ) : (
            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
               {content.description}
            </p>
          )}
        </motion.div>

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