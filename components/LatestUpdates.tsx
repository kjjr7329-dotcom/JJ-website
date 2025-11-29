
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Plus, Trash2, Camera } from 'lucide-react';
import { UpdateItem } from '../types';

interface LatestUpdatesProps {
  updates: UpdateItem[];
  isAdmin: boolean;
  onUpdate: (id: number, field: keyof UpdateItem, value: string) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const LatestUpdates: React.FC<LatestUpdatesProps> = ({ updates, isAdmin, onUpdate, onAdd, onDelete }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-24 px-4 bg-slate-900/40 backdrop-blur-sm border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-end justify-between px-2"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">최신 근황</h2>
            <p className="text-slate-400">나의 활동과 새로운 소식들을 전합니다.</p>
          </div>
          <div className="flex items-center gap-4">
             {isAdmin && (
                <button 
                  onClick={onAdd}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
                >
                  <Plus size={16} /> 추가하기
                </button>
             )}
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollBehavior: 'smooth' }}
        >
          {updates.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[300px] md:min-w-[350px] snap-center bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group relative flex flex-col"
            >
              {isAdmin && (
                <button 
                  onClick={() => onDelete(item.id)}
                  className="absolute top-2 right-2 z-20 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="삭제"
                >
                  <Trash2 size={16} />
                </button>
              )}

              <div className="h-48 overflow-hidden relative shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {isAdmin && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10">
                    <div className="flex flex-col items-center text-white">
                      <Camera size={24} />
                      <span className="text-xs mt-1 font-bold">이미지 변경</span>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(item.id, e)}
                    />
                  </label>
                )}

                {!isAdmin && (
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium text-slate-200">
                    <Calendar size={12} />
                    {item.date}
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col grow">
                {isAdmin ? (
                   <div className="space-y-3">
                      <input 
                        value={item.date}
                        onChange={(e) => onUpdate(item.id, 'date', e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded px-2 py-1 text-xs text-slate-300 focus:border-blue-500 outline-none"
                        placeholder="날짜 (YYYY.MM.DD)"
                      />
                      <input 
                        value={item.title}
                        onChange={(e) => onUpdate(item.id, 'title', e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded px-2 py-1 text-sm font-bold text-white focus:border-blue-500 outline-none"
                        placeholder="제목"
                      />
                      <textarea 
                        value={item.description}
                        onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded px-2 py-1 text-xs text-slate-300 focus:border-blue-500 outline-none resize-none h-20"
                        placeholder="설명"
                      />
                   </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Padding for end of scroll */}
          <div className="min-w-[20px]"></div>
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;
