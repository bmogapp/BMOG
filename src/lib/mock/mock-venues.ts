import type { Payer, Venue } from '@/lib/types/venue';

export const VENUES: Venue[] = [
  {
    id: 'court-xinyi',
    sport: '羽球',
    area: '信義',
    dist: '0.8 km',
    name: '信義運動中心',
    en: 'XINYI SPORTS CENTER',
    rating: 4.7,
    reviews: 210,
    desc: '5 座標準羽球場，地板採用專業 PU 防滑材質，附設休息區與飲水機。',
    addr: '台北市信義區松德路 100 號',
    walk: '捷運市政府站 步行 12 分鐘',
    offPeak: 350,
    peak: 500,
    contacts: [
      { icon: 'phone', label: '02-2723-5566' },
      { icon: 'clock', label: '週一至週日 06:00–23:00' },
    ],
    facilities: [
      { icon: 'wifi', label: '免費 WiFi' },
      { icon: 'lock', label: '置物櫃' },
      { icon: 'check-circle-2', label: '淋浴間' },
      { icon: 'dumbbell', label: '熱身區' },
    ],
    ratingDist: [
      { stars: 5, pct: 65 },
      { stars: 4, pct: 24 },
      { stars: 3, pct: 7 },
      { stars: 2, pct: 3 },
      { stars: 1, pct: 1 },
    ],
    reviewSamples: [
      { name: '周子涵', rating: 5, date: '2026-06-12', text: '場地很新，燈光也很夠亮。' },
      { name: '許文傑', rating: 4, date: '2026-05-28', text: '尖峰時段比較難搶到場。' },
    ],
    courts: ['Court 1', 'Court 2', 'Court 3', 'Court 4', 'Court 5'],
  },
  {
    id: 'court-daan',
    sport: '籠式足球',
    area: '大安',
    dist: '2.1 km',
    name: '大安運動公園球場',
    en: 'DAAN CAGE FOOTBALL',
    rating: 4.6,
    reviews: 142,
    desc: '戶外籠式足球場，人工草皮，適合 5v5 對抗賽，夜間有照明設備。',
    addr: '台北市大安區新生南路二段 1 號',
    walk: '捷運大安森林公園站 步行 5 分鐘',
    offPeak: 600,
    peak: 800,
    contacts: [{ icon: 'phone', label: '02-2700-1234' }],
    facilities: [
      { icon: 'wifi', label: '免費 WiFi' },
      { icon: 'check-circle-2', label: '夜間照明' },
    ],
    ratingDist: [
      { stars: 5, pct: 60 },
      { stars: 4, pct: 28 },
      { stars: 3, pct: 8 },
      { stars: 2, pct: 3 },
      { stars: 1, pct: 1 },
    ],
    reviewSamples: [{ name: '蔡明哲', rating: 5, date: '2026-06-08', text: '草皮維護得很好，夜間燈光足夠。' }],
    courts: ['Court A', 'Court B'],
  },
];

export const PAYERS: Payer[] = [
  { id: 'me', name: '我', status: 'ready' },
  { id: 'p2', name: '陳宥安', status: 'pending' },
  { id: 'p3', name: '林雨晴', status: 'invited' },
];
