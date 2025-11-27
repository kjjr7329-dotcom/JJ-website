import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Workflow, 
  Video, 
  Bike, 
  Trophy,
  BookOpen,
  ScrollText,
  Building2,
  Server
} from 'lucide-react';
import { Interest, Certification } from '../types';

const certifications: Certification[] = [
  { 
    name: '공인중개사', 
    type: 'finance',
    description: '부동산 관련 법률 지식과 자산 분석 능력을 바탕으로 안전하고 전문적인 중개 및 컨설팅을 수행합니다.'
  },
  { 
    name: '정보처리산업기사', 
    type: 'tech',
    description: '효율적인 정보 시스템 운용과 데이터 처리를 위한 기술적 역량을 보유하고 있습니다.'
  },
  { 
    name: '행정사', 
    type: 'admin',
    description: '행정 기관을 대상으로 하는 서류 작성 및 인허가 대리 등 전문적인 행정 법률 서비스를 제공합니다.'
  },
];

const interests: Interest[] = [
  { name: 'AI Research', icon: Cpu, category: 'Tech', description: '최신 AI 트렌드 및 LLM 활용' },
  { name: '업무 자동화', icon: Workflow, category: 'Tech', description: '생산성 향상을 위한 프로세스 최적화' },
  { name: '컨텐츠 제작', icon: Video, category: 'Tech', description: '디지털 미디어 & 스토리텔링' },
  { name: '테니스', icon: Trophy, category: 'Hobby', description: '즐거운 테니스를 통한 건강한 신체 단련' }, 
  { name: '바이크 여행', icon: Bike, category: 'Hobby', description: '자유로운 바람과 새로운 풍경 여행' },
];

const SkillsAndInterests: React.FC = () => {
  const getCertIcon = (type: string) => {
    switch(type) {
      case 'finance': return Building2;
      case 'tech': return Server;
      case 'admin': return ScrollText;
      default: return BookOpen;
    }
  };

  return (
    <section className="py-24 px-4 bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Certifications Section - Horizontal Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white justify-center md:justify-start">
            <BookOpen className="text-purple-400 w-8 h-8" />
            <span>자격증</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => {
              const Icon = getCertIcon(cert.type);
              return (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-8 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-purple-500/30 transition-all flex flex-col items-center text-center md:items-start md:text-left h-full"
                >
                  <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-6 shadow-inner border border-slate-700">
                    <Icon className="text-purple-400 w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{cert.name}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {cert.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Interests Grid */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white justify-center md:justify-start">
            <Cpu className="text-blue-400 w-8 h-8" />
            <span>관심사 및 취미</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {interests.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6 rounded-xl border border-slate-800 hover:bg-slate-800 transition-colors bg-slate-900/40"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${item.category === 'Tech' ? 'bg-blue-500/20 text-blue-300' : 'bg-orange-500/20 text-orange-300'}`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      {item.category === 'Tech' ? '기술' : '취미'}
                    </span>
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