import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Award, TrendingUp, Camera, Upload } from 'lucide-react';
import { SiteContent } from '../types';

interface AboutProps {
  isAdmin: boolean;
  content: SiteContent['about'];
  onUpdate: (key: string, value: string) => void;
}

const About: React.FC<AboutProps> = ({ isAdmin, content, onUpdate }) => {
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Use stored profileImage or fallback to default
  const displayImage = content.profileImage || './profile.jpg';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert file to Base64 to persist in localStorage via onUpdate
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onUpdate('profileImage', base64String);
        setImgError(false);
      };
      reader.readAsDataURL(file);
    }
  };

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
          {isAdmin ? (
            <input 
              value={content.mainTitle}
              onChange={(e) => onUpdate('mainTitle', e.target.value)}
              className="text-3xl md:text-4xl font-bold mb-4 text-white bg-slate-800 border border-blue-500 rounded px-2 text-center"
            />
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{content.mainTitle}</h2>
          )}
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Clean Frame Design */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] shadow-2xl bg-slate-800 border border-slate-700/50 group">
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />

              <img 
                src={displayImage}
                alt="김종진 프로필" 
                className={`w-full h-full object-cover transition-transform duration-700 ${!imgError ? "group-hover:scale-105" : "opacity-30 scale-100"}`}
                onError={(e) => {
                  // Only set error if we haven't already and there isn't a custom image
                  if (!imgError && !content.profileImage) setImgError(true);
                }}
              />
              
              {/* Overlay Gradient for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none"></div>

              {/* Show Fallback/Upload UI if image failed loading AND we don't have a custom image */}
              {(imgError && !content.profileImage) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm p-6 text-center z-10">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">이미지 로딩 실패</h3>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold transition-all mt-4"
                  >
                    <Upload size={18} />
                    사진 등록하기
                  </button>
                </div>
              )}

              {/* Admin Edit Button */}
              {isAdmin && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute top-4 right-4 p-2.5 bg-slate-900/50 hover:bg-blue-600 text-white rounded-full backdrop-blur-md border border-white/10 transition-all z-20"
                  title="사진 변경"
                >
                  <Camera size={20} />
                </button>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                <p className="text-white text-2xl font-bold mb-1 tracking-tight"></p>
                <p className="text-slate-300 font-medium text-sm uppercase tracking-wider opacity-80">Story Hacker</p>
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
              {isAdmin ? (
                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-xs text-blue-400 font-bold ml-1">소제목 수정</label>
                    <textarea 
                      value={content.subTitle}
                      onChange={(e) => onUpdate('subTitle', e.target.value)}
                      className="w-full text-3xl font-bold text-white bg-slate-800/50 border border-blue-500 rounded-lg p-3 focus:outline-none"
                      rows={2}
                    />
                  </div>
                  <div className="relative">
                     <label className="text-xs text-blue-400 font-bold ml-1">문단 1 수정</label>
                     <textarea 
                      value={content.desc1}
                      onChange={(e) => onUpdate('desc1', e.target.value)}
                      className="w-full text-slate-300 text-lg bg-slate-800/50 border border-blue-500 rounded-lg p-3 focus:outline-none"
                      rows={4}
                    />
                  </div>
                  <div className="relative">
                     <label className="text-xs text-blue-400 font-bold ml-1">문단 2 수정</label>
                     <textarea 
                      value={content.desc2}
                      onChange={(e) => onUpdate('desc2', e.target.value)}
                      className="w-full text-slate-300 text-lg bg-slate-800/50 border border-blue-500 rounded-lg p-3 focus:outline-none"
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-white leading-tight whitespace-pre-line">{content.subTitle}</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">{content.desc1}</p>
                  <p className="text-slate-300 text-lg leading-relaxed">{content.desc2}</p>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center hover:bg-slate-800 transition-colors">
                <User className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">경력 32년+</h4>
                <p className="text-sm text-slate-400 font-medium">공직 생활</p>
              </div>
              <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center hover:bg-slate-800 transition-colors">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">전업 투자자</h4>
                <p className="text-sm text-slate-400 font-medium">데이터 분석</p>
              </div>
              <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center hover:bg-slate-800 transition-colors">
                <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">3개 자격</h4>
                <p className="text-sm text-slate-400 font-medium">전문 자격증</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;