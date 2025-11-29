
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Workflow, 
  Video, 
  Bike, 
  Activity,
  BookOpen,
  ScrollText,
  Home,
  Database,
  Heart
} from 'lucide-react';
import { Interest, Certification } from '../types';

const certifications: Certification[] = [
  { 
    name: '공인중개사', 
    description: '부동산 자산 권리 분석 및 투자 중개 실무', 
    icon: Home 
  },
  { 
    name: '정보처리산업기사', 
    description: '데이터 시스템 구조 이해 및 프로세스 최적화', 
    icon: Database 
  },
  { 
    name: '행정사', 
    description: '행정 기관 인허가 및 서류 작성 대행 전문 자격', 
    icon: ScrollText 
  },
];

const interests: Interest[] = [
  { name: 'AI 연구', icon: Cpu, category: 'Tech', description: '미래를 이끌어 갈 최신 AI 트렌드 및 LLM 활용' },
  { name: '업무 자동화', icon: Workflow, category: 'Tech', description: '생산성 향상을 위한 프로세스 최적화' },
  { name: '컨텐츠 제작', icon: Video, category: 'Tech', description: '디지털 미디어 & 스토리텔링' },
  { name: '테니스', icon: Activity, category: 'Hobby', description: '즐거운 테니스, 건강한 신체' }, 
  { name: '바이크 여행', icon: Bike, category: 'Hobby', description: '자유로운 바람을 느끼며 새로운 풍경 여행' },
];

const SkillsAndInterests: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Certifications Section (Horizontal) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-white justify-center md:justify-start">
            <BookOpen className="text-purple-400" />
            <span>보유 자격증</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-xl border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/60 transition-all group"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                    <Icon className="text-purple-300" size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{cert.name}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{cert.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Interests Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-white justify-center md:justify-start">
            <Heart className="text-pink-500" />
            <span>관심사 및 취미</span>
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interests.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors bg-slate-800/40"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${item.category === 'Tech' ? 'bg-blue-500/20 text-blue-300' : 'bg-orange-500/20 text-orange-300'}`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">{item.category}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.name}</h4>
                  <p className="text-base text-slate-300 leading-snug">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SkillsAndInterests;
