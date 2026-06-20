import type { BrandIconName } from '@/components/ui/brand-icons';

export type RichTextRun = { text: string; bold?: boolean; italic?: boolean; link?: boolean };
export type RichTextParagraph = RichTextRun[];

export type EventFormField = {
  id: string;
  label: string;
  type: 'text' | 'tel' | 'email' | 'choice' | 'textarea';
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

export type EventListing = {
  id: string;
  venueId: string;
  kicker: string;
  title: string;
  en: string;
  date: string;
  time: string;
  place: string;
  placeSub: string;
  host: string;
  going: number;
  cap: number;
  price: number;
  desc: RichTextParagraph[];
  notes: string[];
  agenda: { time: string; label: string; sub?: string }[];
  includes: { icon: BrandIconName; label: string }[];
  form: EventFormField[];
};

export type WaitlistTicket = { id: string; name: string; sub: string; price: number };
export type NotifyChannel = {
  id: string;
  icon: BrandIconName;
  label: string;
  sub: string;
  system?: boolean;
};
