import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Award, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const About: React.FC = () => {
  const { data } = usePortfolio();
  const [imgError, setImgError] = useState(false);
  
  // 기본 이미지 경로
  const defaultImage = "profile.jpg";

  return (
    <section id="about" className="py-24 px-4 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">프로필 소개</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 blur-sm opacity-50"></div>
            
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl glass-card border-0 bg-slate-800">
              
              {/* 이미지 요소 */}
              <img 
                src={data.profileImage || defaultImage}
                alt="프로필" 
                className={`w-full h-full object-cover transition-transform duration-500 ${!imgError ? "group-hover:scale-105" : "opacity-30 scale-100"}`}
                onError={() => {
                  if (!data.profileImage) setImgError(true);
                }}
              />
              
              {/* 이미지를 찾을 수 없을 때 대체 화면 */}
              {(imgError && !data.profileImage) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm p-6 text-center z-10">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-400 text-sm">
                    이미지가 없습니다. <br/> 관리자 모드에서 이미지를 등록해주세요.
                  </p>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-6 pointer-events-none">
                <p className="text-white text-2xl font-bold mb-1"> {data.name}</p>
                <p className="text-slate-200 font-medium"></p>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white leading-tight whitespace-pre-line">
                {data.aboutTitle}
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                {data.aboutDesc1}
              </p>
              <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                {data.aboutDesc2}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-800 rounded-xl border border-slate-700 text-center hover:bg-slate-700 transition-colors">
                <User className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">경력 32년+</h4>
                <p className="text-sm text-slate-300 font-medium">공직 생활 & 행정 전문가</p>
              </div>
              <div className="p-5 bg-slate-800 rounded-xl border border-slate-700 text-center hover:bg-slate-700 transition-colors">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">전업 투자자</h4>
                <p className="text-sm text-slate-300 font-medium">데이터 기반 분석</p>
              </div>
              <div className="p-5 bg-slate-800 rounded-xl border border-slate-700 text-center hover:bg-slate-700 transition-colors">
                <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">3개 자격</h4>
                <p className="text-sm text-slate-300 font-medium">전문성 보유</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;