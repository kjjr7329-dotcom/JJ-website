import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-slate-900 to-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">연락하기</h2>
          <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
            새로운 프로젝트, 투자경험 공유, 공통된 관심사에 대한 가벼운 대화도 언제나 환영합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Phone Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-10 h-10 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-200 mb-2">연락처</h3>
                <p className="text-2xl font-bold text-white tracking-wide mb-2">010-6690-1019</p>
                <p className="text-sm text-slate-400">평일 09:00 - 18:00</p>
              </div>
            </div>
          </motion.div>

          {/* Email Card */}
          <motion.a 
            href="mailto:kjjr7329@gmail.com" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-10 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all group block cursor-pointer"
          >
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-10 h-10 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-200 mb-2">이메일</h3>
                <p className="text-xl md:text-2xl font-bold text-white tracking-wide break-all mb-2">kjjr7329@gmail.com</p>
                <p className="text-sm text-slate-400">언제든지 메일을 보내주세요.</p>
              </div>
            </div>
          </motion.a>
        </div>

        <div className="border-t border-slate-800 mt-24 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-medium">
            <p>© 2024 Kim Jong-jin. All rights reserved.</p>
            <div className="flex gap-4">
                <span>대한민국</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;