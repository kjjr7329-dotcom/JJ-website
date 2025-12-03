import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowUpRight, Youtube, TrendingUp, BookOpen, Camera, Mail, Send } from 'lucide-react';

// 수파베이스 클라이언트 생성 (환경변수에서 키를 가져옴)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Portfolio() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // 방명록 불러오기
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5); // 최근 5개만
    if (data) setMessages(data);
  };

  // 방명록 쓰기
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const { error } = await supabase.from('guestbook').insert([{ message: newMessage }]);
    if (!error) {
      setNewMessage("");
      fetchMessages(); // 목록 새로고침
    } else {
      alert("전송 실패: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white selection:bg-lime-400 selection:text-black font-sans">
      
      {/* 1. Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black -z-10" />
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-center mb-6">
          <span className="block text-neutral-500 text-2xl md:text-4xl font-normal mb-4 tracking-normal">Writer & Investor</span>
          INVESTING IN <br /> <span className="text-lime-400">TIME & STORIES</span>
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl max-w-2xl text-center leading-relaxed">
          차트를 보듯 세상을 읽고, <br className="md:hidden" /> 투자를 하듯 일상의 순간을 기록합니다.
        </p>
      </section>

      {/* 2. Bento Grid Section (간략화) */}
      <section className="py-24 px-6 md:px-20 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span className="w-2 h-8 bg-lime-400 block rounded-full"></span> Interest Log
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* YouTube Box */}
          <div className="col-span-1 md:col-span-2 bg-neutral-800 rounded-3xl p-8 border border-neutral-700 hover:border-lime-400 transition-colors group relative">
            <Youtube size={32} className="text-red-500 mb-4" />
            <h4 className="text-3xl font-bold mb-2">My Youtube Channel</h4>
            <p className="text-neutral-400 mb-6">사자성어와 일상 이야기.</p>
            <a href="#" className="text-lime-400 font-semibold group-hover:underline">채널 구경가기 -></a>
          </div>
          {/* Investment Box */}
          <div className="bg-neutral-800 rounded-3xl p-6 border border-neutral-700">
            <TrendingUp className="text-blue-400 mb-4" size={32} />
            <h4 className="text-xl font-bold">Market View</h4>
            <p className="text-neutral-400 text-sm mt-2">시장을 바라보는 관점 기록.</p>
          </div>
        </div>
      </section>

      {/* 3. Guestbook Section (Supabase 연동) */}
      <section className="py-24 px-6 md:px-20 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-8 text-lime-400">Guestbook</h3>
        
        {/* 입력창 */}
        <div className="flex gap-4 mb-10">
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="짧은 인사를 남겨주세요..." 
            className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-400"
          />
          <button onClick={sendMessage} className="bg-lime-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-lime-500 flex items-center gap-2">
            <Send size={18} /> 남기기
          </button>
        </div>

        {/* 메시지 목록 */}
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800 flex justify-between items-center">
              <span className="text-neutral-200">{msg.message}</span>
              <span className="text-neutral-600 text-xs">{new Date(msg.created_at).toLocaleDateString()}</span>
            </div>
          ))}
          {messages.length === 0 && <p className="text-neutral-600 text-center">아직 작성된 방명록이 없습니다. 첫 글을 남겨보세요!</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-800 text-center text-neutral-500">
        © 2025 JJin. All rights reserved.
      </footer>
    </div>
  );
}
