import { LucideIcon } from 'lucide-react';

export interface CareerItem {
  period: string;
  role: string;
  description: string;
  icon?: LucideIcon;
}

export interface Certification {
  name: string;
  type: 'tech' | 'admin' | 'finance';
  description?: string;
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

export interface PortfolioData {
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  aboutDesc3: string;
  profileImage: string | null;
}