
import { LucideIcon } from 'lucide-react';

export interface CareerItem {
  period: string;
  role: string;
  description: string;
  icon?: LucideIcon;
}

export interface Certification {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface Interest {
  name: string;
  icon: LucideIcon;
  category: 'Tech' | 'Hobby';
  description: string;
}

export interface ContactInfo {
  type: string;
  value: string;
  link?: string;
  icon: LucideIcon;
}

export interface UpdateItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

// 편집 가능한 텍스트 컨텐츠를 위한 타입
export interface SiteContent {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  about: {
    mainTitle: string;
    subTitle: string;
    desc1: string;
    desc2: string;
    profileImage?: string; // Base64 encoded image string
  };
  updates: UpdateItem[];
}
