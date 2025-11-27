import React, { useState, useRef } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { X, Save, Upload, Lock, LogOut } from 'lucide-react';

const Admin: React.FC = () => {
  const { data, updateData, setAdminMode } = usePortfolio();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // 편집용 로컬 상태
  const [formData, setFormData] = useState(data);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '123456') {
      setIsLoggedIn(true);
      setFormData(data); // 현재 데이터로 폼 초기화
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateData(formData);
    alert('저장되었습니다.');
    setAdminMode(false); // 저장 후 관리자 모드 자동 종료
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setAdminMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-800">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Lock className="text-blue-400" size={20} />
            관리자 모드
          </div>
          <button onClick={() => setAdminMode(false)} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-6 max-w-sm mx-auto py-10">
              <div className="text-center mb-8">
                <h3 className="text-xl text-white font-bold">로그인</h3>
                <p className="text-slate-400 text-sm">관리자 계정으로 접속하세요.</p>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-1">아이디</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="아이디"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-1">비밀번호</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="••••••"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors">
                로그인
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Image Section */}
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Upload size={18} className="text-blue-400"/> 프로필 이미지
                </h4>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-slate-700 overflow-hidden flex-shrink-0 border-2 border-slate-600">
                    {formData.profileImage ? (
                      <img src={formData.profileImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">No Img</div>
                    )}
                  </div>
                  <div>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors border border-slate-600"
                    >
                      사진 변경하기
                    </button>
                    <p className="text-xs text-slate-500 mt-2">변경 후 저장을 눌러야 적용됩니다.</p>
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-xs mb-1 uppercase font-bold">이름</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2.5 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1 uppercase font-bold">메인 타이틀 (줄바꿈 가능)</label>
                  <textarea 
                    name="heroTitle"
                    value={formData.heroTitle}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2.5 text-white focus:border-blue-500 outline-none h-20"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1 uppercase font-bold">메인 서브 타이틀</label>
                  <textarea 
                    name="heroSubtitle"
                    value={formData.heroSubtitle}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2.5 text-white focus:border-blue-500 outline-none h-20"
                  />
                </div>
                
                <div className="h-px bg-slate-700 my-4"></div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1 uppercase font-bold">About 타이틀</label>
                  <input 
                    name="aboutTitle"
                    value={formData.aboutTitle}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2.5 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1 uppercase font-bold">About 설명 1</label>
                  <textarea 
                    name="aboutDesc1"
                    value={formData.aboutDesc1}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2.5 text-white focus:border-blue-500 outline-none h-24"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1 uppercase font-bold">About 설명 2</label>
                  <textarea 
                    name="aboutDesc2"
                    value={formData.aboutDesc2}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2.5 text-white focus:border-blue-500 outline-none h-24"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {isLoggedIn && (
          <div className="p-4 border-t border-slate-700 bg-slate-800 flex justify-between">
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-2"
            >
              <LogOut size={16} /> 로그아웃
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-2 shadow-lg hover:shadow-blue-500/20 transition-all"
            >
              <Save size={18} /> 저장 및 적용
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;