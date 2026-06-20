import type { BrandIconName } from '@/components/ui/brand-icons';

export type IntensityLevel = '低' | '中' | '高';

export type Studio = {
  id: string;
  sport: string;
  area: string;
  dist: string;
  name: string;
  en: string;
  rating: number;
  reviews: number;
  desc: string;
  addr: string;
  walk: string;
  contacts: { icon: BrandIconName; label: string; action?: string }[];
  facilities: { icon: BrandIconName; label: string }[];
  ratingDist: { stars: number; pct: number }[];
  reviewSamples: { name: string; rating: number; date: string; text: string }[];
};

export type ClassSession = {
  id: string;
  studioId: string;
  time: string;
  dur: string;
  name: string;
  coach: string;
  pts: number;
  level: IntensityLevel;
  hot?: boolean;
};

export type CourseDetail = ClassSession & {
  imageCount: number;
  coachRating: number;
  coachClasses: number;
  about: string;
  notes: string[];
  cancelPolicy: { tone: 'sky' | 'flash' | 'ember'; title: string; desc: string }[];
  pointsBalance: number;
};
