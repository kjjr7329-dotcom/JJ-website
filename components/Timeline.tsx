
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Landmark } from 'lucide-react';
import { CareerItem } from '../types';

const careerData: CareerItem[] = [
  {
    period: "2021 ~ 현재",
    role: "전업 투자자 (Full-time Investor)",
    description: "글로벌 경제 동향 분석 및 가치 투자, 부동산, 주식, 금융 투자.",
    icon: Landmark
  },
  {
    period: "1989 ~ 2021",
    role: "공무원 (Civil Servant)",
    description: "32년 근속, 행정 실무 및 정책 수행, 지역 사회 발전에 노력.",
    icon: Briefcase
  }
];

const Timeline: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-slate-900/60 backdrop-blur-sm border-t border-slate-800/30">
      <div className="max-w-4xl mx-auto">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">걸어온 길</h2>
          <p className="text-slate-300 text-lg">나의 여정과 경력</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-slate-700/50"></div>

          <div className="space-y-12">
            {careerData.map((item, index) => {
              const Icon = item.icon || Briefcase;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Empty half for desktop layout */}
                  <div className="hidden md:block w-5/12"></div>

                  {/* Icon Dot */}
                  <div className="absolute left-[-8px] md:left-1/2 md:-ml-[20px] w-10 h-10 rounded-full bg-slate-800 border-4 border-slate-700 shadow-xl flex items-center justify-center z-10">
                    <Icon size={18} className="text-blue-400" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-8 md:ml-0 w-full md:w-5/12 glass-card p-6 rounded-xl hover:bg-slate-800/60 transition-colors border border-slate-700/50">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold mb-3">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3">{item.role}</h3>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
