
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 bg-slate-900/80 backdrop-blur-md border-t border-slate-800/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-white">연락하기</h2>
        <p className="text-slate-300 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          새로운 프로젝트, 투자 경험 공유, 공통된 관심사에 대한 대화는 언제나 환영합니다.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="glass-card p-8 rounded-2xl hover:border-blue-500/50 transition-all group border border-slate-700/50 bg-slate-800/40">
                <Phone className="w-10 h-10 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-slate-200 mb-1">휴대전화</h3>
                <p className="text-2xl font-bold text-white tracking-wide mt-2">010-6690-1019</p>
            </div>

            <a href="mailto:kjjr7329@gmail.com" className="glass-card p-8 rounded-2xl hover:border-purple-500/50 transition-all group cursor-pointer block border border-slate-700/50 bg-slate-800/40">
                <Mail className="w-10 h-10 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-slate-200 mb-1">이메일</h3>
                <p className="text-2xl font-bold text-white mt-2">kjjr7329@gmail.com</p>
            </a>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm font-medium">
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
