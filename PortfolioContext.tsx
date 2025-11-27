import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { PortfolioData } from '../types';

// 초기 기본 데이터 (localStorage에 데이터가 없을 때 사용)
const defaultData: PortfolioData = {
  name: "Storyhacker",
  heroTitle: "안녕하세요, \n김종진입니다.",
  heroSubtitle: "32년의 공직 생활을 넘어, 이제는 데이터와 통찰로 새로운 가치를 만드는 전업 투자자이자 크리에이터입니다.",
  aboutTitle: "변화를 두려워하지 않는 \n끊임없는 도전자",
  aboutDesc1: "1989년 공직에 입문하여 2021년 직장생활을 마무리 하고, 이제는 4차 산업혁명 시대의 흐름을 읽는 전업 투자자로서 제2의 인생을 살고 있습니다.",
  aboutDesc2: "사회생활의 효율성을 높이고자 AI와 업무 자동화 기술을 탐구하고 있으며, 테니스와 바이크 여행을 통해 삶의 활력을 얻고 있습니다. 어제보다 더 나은 오늘을 위해 끊임없이 배우고 성장합니다.",
  aboutDesc3: "", // 추가 여유분
  profileImage: null, // 초기값 null, About 컴포넌트에서 defaultImage 사용
};

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: Partial<PortfolioData>) => void;
  isAdminMode: boolean;
  setAdminMode: (isOpen: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [isAdminMode, setAdminMode] = useState(false);

  // 마운트 시 LocalStorage에서 데이터 불러오기
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    const savedImage = localStorage.getItem('userProfileImage'); // 이전 버전 호환성

    if (savedData) {
      setData({ ...defaultData, ...JSON.parse(savedData) });
    } else if (savedImage) {
      // 이전 버전의 이미지만 있는 경우 마이그레이션
      setData({ ...defaultData, profileImage: savedImage });
    }
  }, []);

  // 데이터 변경 시 LocalStorage 저장
  const updateData = (newData: Partial<PortfolioData>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('portfolioData', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, isAdminMode, setAdminMode }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
