import type { BrandIconName } from '@/components/ui/brand-icons';

export type Venue = {
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
  offPeak: number;
  peak: number;
  contacts: { icon: BrandIconName; label: string; action?: string }[];
  facilities: { icon: BrandIconName; label: string }[];
  ratingDist: { stars: number; pct: number }[];
  reviewSamples: { name: string; rating: number; date: string; text: string }[];
  courts: string[];
};

export type VenueSlot = {
  hour: number;
  status: 'available' | 'selected' | 'booked';
  peak: boolean;
};

export type Payer = {
  id: string;
  name: string;
  status: 'ready' | 'pending' | 'invited';
};
