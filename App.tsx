import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Settings, Check, Lock, Download } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import SkillsAndInterests from './components/SkillsAndInterests';
import Contact from './components/Contact';
import LatestUpdates from './components/LatestUpdates';
import Background3D from './components/Background3D';
import { SiteContent, UpdateItem } from './types';

// 👇 이곳에 복사한 JSON을 붙여넣으세요 (기존 내용을 지우고 붙여넣기)
const INITIAL_CONTENT: SiteContent = {
  "hero": {
    "badge": "2025 포트폴리오",
    "title": "안녕하세요,\n김종진입니다.",
    "description": "32년의 공직 생활을 넘어, 이제는 데이터와 통찰로 새로운 가치를 만들어 가는 전업 투자자이자 크리에이터입니다."
  },
  "about": {
    "mainTitle": "나에 대하여",
    "subTitle": "변화를 두려워하지 않는\n끊임없는 도전자",
    "desc1": "1989년 공직에 입문하여 2021년 직장생활을 마무리 하고, 이제는 4차 산업혁명 시대의 흐름을 읽는 전업 투자자로서 제2의 인생을 살고 있습니다.",
    "desc2": "사회생활의 효율성을 높이고자 AI와 업무 자동화 기술을 탐구하고 있으며 , 테니스와 바이크 여행을 통해 삶의 활력을 얻습니다. 어제보다 더 나은 내일을 위해 끊임없이 배우고 성장하고자 합니다.",
    "profileImage": undefined
  },
  "updates": [
    {
      "id": 1,
      "title": "AI & 미래 투자 컨퍼런스 참석",
      "date": "2024.03.15",
      "description": "서울 코엑스에서 열린 AI 기술 동향과 핀테크 투자 전략 컨퍼런스에 참석하여 최신 인사이트를 공유했습니다.",
      "image": "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=800"
    },
    {
      "id": 2,
      "title": "동해안 바이크 투어",
      "date": "2024.02.20",
      "description": "강원도 해안도로를 따라 300km를 달리며 재충전의 시간을 가졌습니다. 바람과 함께한 자유로운 여정이었습니다.",
      "image": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800"
    },
    {
      "id": 3,
      "title": "부동산 시장 분석 보고서 발행",
      "date": "2024.01.10",
      "description": "금리 변동에 따른 수도권 부동산 시장의 흐름과 2024년 전망을 담은 자체 분석 리포트를 작성했습니다.",
      "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
    },
    {
      "id": 4,
      "title": "테니스 동호회 우승",
      "date": "2023.12.05",
      "description": "지역 테니스 클럽 연말 대회에서 복식 우승을 차지했습니다. 꾸준한 연습과 팀워크가 만들어낸 결과입니다.",
      "image": "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800"
    },
    {
      "id": 5,
      "title": "데이터 분석 자격 과정 수료",
      "date": "2023.11.15",
      "description": "빅데이터 분석 준전문가(ADsP) 과정을 수료하며 데이터 기반 의사결정 역량을 한층 더 강화했습니다.",
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    }
  ]
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isScrolled, setIsScrolled] = useState(false);
  
  // 관리자 및 컨텐츠 상태
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // 로컬 스토리지에서 데이터 불러오기
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('portfolio_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_CONTENT,
          ...parsed,
          about: {
            ...INITIAL_CONTENT.about,
            ...parsed.about
          },
          updates: parsed.updates || INITIAL_CONTENT.updates
        };
      }
      return INITIAL_CONTENT;
    } catch (e) {
      return INITIAL_CONTENT;
    }
  });
  
  // 로그인 입력 상태
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_content', JSON.stringify(siteContent));
    } catch (e) {
      console.error("Storage quota exceeded", e);
      alert("저장 용량이 부족합니다. 이미지를 줄이거나 텍스트를 줄여주세요.");
    }
  }, [siteContent]);

  // General content update for Hero/About
  const handleContentUpdate = (section: keyof Pick<SiteContent, 'hero' | 'about'>, key: string, value: string) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  // Updates Section Handlers
  const handleUpdateItemChange = (id: number, field: keyof UpdateItem, value: string) => {
    setSiteContent(prev => ({
      ...prev,
      updates: prev.updates.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAddUpdateItem = () => {
    const newId = Date.now();
    const newItem: UpdateItem = {
      id: newId,
      title: "새로운 소식",
      date: new Date().toLocaleDateString(),
      description: "새로운 내용을 입력하세요.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
    };
    setSiteContent(prev => ({
      ...prev,
      updates: [newItem, ...prev.updates]
    }));
  };

  const handleDeleteUpdateItem = (id: number) => {
    setSiteContent(prev => ({
      ...prev,
      updates: prev.updates.filter(item => item.id !== id)
    }));
  };

  // 드래그 앤 드롭으로 순서 변경 시 호출
  const handleReorderUpdates = (newOrder: UpdateItem[]) => {
    setSiteContent(prev => ({
      ...prev,
      updates: newOrder
    }));
  };

  // 현재 컨텐츠를 JSON으로 복사
  const handleExportContent = () => {
    const jsonString = JSON.stringify(siteContent, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert("전체 데이터가 클립보드에 복사되었습니다!\n\n이제 이 코드를 'App.tsx' 파일의 'INITIAL_CONTENT' 부분에 붙여넣으시면, 배포 후에도 수정사항이 유지됩니다.");
    }).catch(() => {
      alert("복사에 실패했습니다.");
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId === "admin" && loginPw === "123456") {
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginId("");
      setLoginPw("");
      setLoginError("");
    } else {
      setLoginError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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

  return (
    <div className="text-slate-200 min-h-[100dvh] selection:bg-blue-500 selection:text-white relative">
      <Background3D />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-xl font-bold tracking-tighter text-white">
            <span className="text-blue-500">MY</span> PORTFOLIO
          </a>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8 text-sm font-medium">
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, 'about')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                소개
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                연락처
              </a>
            </div>

            <div className="flex items-center gap-2">
              {/* 저장용 복사 버튼 (관리자일 때만 보임) */}
              {isAdmin && (
                <button
                  onClick={handleExportContent}
                  className="flex px-3 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all items-center gap-2 font-bold shadow-lg"
                  title="현재 데이터 JSON 복사"
                >
                  <Download size={16} />
                  <span className="text-xs hidden md:inline">JSON 복사</span>
                </button>
              )}

              <button
                onClick={() => isAdmin ? handleLogout() : setShowLoginModal(true)}
                className={`flex px-4 py-2 rounded-full transition-all duration-300 items-center gap-2 font-bold shadow-lg ${
                  isAdmin 
                    ? 'bg-green-600 text-white hover:bg-green-500 shadow-green-900/20 ring-2 ring-green-400/50' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
                title={isAdmin ? "편집 완료 및 저장" : "관리자 로그인"}
              >
                {isAdmin ? <Check size={18} strokeWidth={3} /> : <Settings size={18} />}
                <span className="text-xs">{isAdmin ? "완료" : "관리자"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <Hero 
          content={siteContent.hero} 
          isAdmin={isAdmin} 
          onUpdate={(key, val) => handleContentUpdate('hero', key, val)} 
        />
        <About 
          content={siteContent.about}
          isAdmin={isAdmin} 
          onUpdate={(key, val) => handleContentUpdate('about', key, val)}
        />
        <Timeline />
        <SkillsAndInterests />
        <LatestUpdates 
          updates={siteContent.updates}
          isAdmin={isAdmin}
          onUpdate={handleUpdateItemChange}
          onAdd={handleAddUpdateItem}
          onDelete={handleDeleteUpdateItem}
          onReorder={handleReorderUpdates}
        />
        <Contact />
      </main>

      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800/90 border border-slate-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <Lock className="text-blue-400" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">관리자 로그인</h2>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="아이디"
                />
              </div>
              <div>
                <input 
                  type="password" 
                  value={loginPw}
                  onChange={(e) => setLoginPw(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="비밀번호"
                />
              </div>
              {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowLoginModal(false)} className="flex-1 py-3 text-slate-400 hover:bg-slate-700 rounded-xl font-bold">취소</button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold">로그인</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default App;