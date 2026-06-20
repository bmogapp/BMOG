import type { ClassSession, CourseDetail, Studio } from '@/lib/types/course';

export const STUDIOS: Studio[] = [
  {
    id: 'pilates-liudong',
    sport: '皮拉提斯',
    area: '信義',
    dist: '1.2 km',
    name: '流動皮拉提斯',
    en: 'FLOW PILATES STUDIO',
    rating: 4.9,
    reviews: 128,
    desc: '專注核心控制與呼吸節奏的器械皮拉提斯教室，小班制教學，適合初學者到進階學員。',
    addr: '台北市信義區松仁路 89 號 3F',
    walk: '捷運市政府站 步行 6 分鐘',
    contacts: [
      { icon: 'phone', label: '02-2723-8899' },
      { icon: 'clock', label: '週一至週日 07:00–22:00' },
      { icon: 'globe', label: '@flowpilates.tw', action: '前往' },
    ],
    facilities: [
      { icon: 'wifi', label: '免費 WiFi' },
      { icon: 'lock', label: '置物櫃' },
      { icon: 'dumbbell', label: '專業器械' },
      { icon: 'check-circle-2', label: '空調教室' },
    ],
    ratingDist: [
      { stars: 5, pct: 78 },
      { stars: 4, pct: 16 },
      { stars: 3, pct: 4 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 1 },
    ],
    reviewSamples: [
      { name: '陳宥安', rating: 5, date: '2026-06-02', text: '教練很細心糾正體態，器械保養得很好。' },
      { name: '林雨晴', rating: 5, date: '2026-05-21', text: '空間乾淨明亮，課程強度剛好。' },
    ],
  },
  {
    id: 'boxing-beijing',
    sport: '拳擊',
    area: '大安',
    dist: '2.6 km',
    name: '北境拳館',
    en: 'NORTHGATE BOXING',
    rating: 4.8,
    reviews: 96,
    desc: '專業拳擊與體能訓練教室，從基礎站姿到實戰對打皆有課程，新手友善。',
    addr: '台北市大安區敦化南路二段 105 號 2F',
    walk: '捷運大安站 步行 9 分鐘',
    contacts: [
      { icon: 'phone', label: '02-2733-1212' },
      { icon: 'clock', label: '週一至週六 10:00–23:00' },
    ],
    facilities: [
      { icon: 'wifi', label: '免費 WiFi' },
      { icon: 'lock', label: '置物櫃' },
      { icon: 'swords', label: '拳擊用具' },
      { icon: 'check-circle-2', label: '淋浴間' },
    ],
    ratingDist: [
      { stars: 5, pct: 70 },
      { stars: 4, pct: 21 },
      { stars: 3, pct: 6 },
      { stars: 2, pct: 2 },
      { stars: 1, pct: 1 },
    ],
    reviewSamples: [
      { name: '王柏宇', rating: 5, date: '2026-06-10', text: '教練帶節奏很強，流汗量超大。' },
      { name: '李恩', rating: 4, date: '2026-05-30', text: '器材新，缺點是尖峰時段人比較多。' },
    ],
  },
  {
    id: 'yoga-chenguang',
    sport: '瑜伽',
    area: '中山',
    dist: '3.1 km',
    name: '晨光瑜伽所',
    en: 'MORNING LIGHT YOGA',
    rating: 4.9,
    reviews: 154,
    desc: '日光灑落的木地板教室，主打流動瑜伽與陰瑜伽，適合放鬆與伸展。',
    addr: '台北市中山區南京東路三段 56 號 5F',
    walk: '捷運松江南京站 步行 4 分鐘',
    contacts: [
      { icon: 'phone', label: '02-2515-6677' },
      { icon: 'clock', label: '週一至週日 08:00–21:30' },
    ],
    facilities: [
      { icon: 'wifi', label: '免費 WiFi' },
      { icon: 'lock', label: '置物櫃' },
      { icon: 'flower-2', label: '瑜伽墊提供' },
      { icon: 'check-circle-2', label: '淋浴間' },
    ],
    ratingDist: [
      { stars: 5, pct: 82 },
      { stars: 4, pct: 13 },
      { stars: 3, pct: 3 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 1 },
    ],
    reviewSamples: [
      { name: '張采妮', rating: 5, date: '2026-06-15', text: '早晨的光線很美，老師聲音很療癒。' },
      { name: '黃凱', rating: 5, date: '2026-06-01', text: '陰瑜伽課程強度適合下班後放鬆。' },
    ],
  },
];

export const CLASS_SESSIONS: ClassSession[] = [
  { id: 'cls-001', studioId: 'pilates-liudong', time: '09:00', dur: '50 分', name: '核心控制皮拉提斯', coach: '陳莉', pts: 120, level: '中', hot: true },
  { id: 'cls-002', studioId: 'pilates-liudong', time: '11:00', dur: '50 分', name: '初階器械皮拉提斯', coach: '陳莉', pts: 100, level: '低' },
  { id: 'cls-003', studioId: 'pilates-liudong', time: '19:30', dur: '60 分', name: '進階全身雕塑', coach: '吳憶萱', pts: 140, level: '高', hot: true },
  { id: 'cls-004', studioId: 'boxing-beijing', time: '18:00', dur: '60 分', name: '拳擊體能基礎班', coach: '李振宇', pts: 130, level: '中' },
  { id: 'cls-005', studioId: 'boxing-beijing', time: '20:00', dur: '60 分', name: '實戰對打進階班', coach: '李振宇', pts: 160, level: '高', hot: true },
  { id: 'cls-006', studioId: 'yoga-chenguang', time: '08:00', dur: '60 分', name: '晨間流動瑜伽', coach: '王安妮', pts: 110, level: '低' },
  { id: 'cls-007', studioId: 'yoga-chenguang', time: '20:30', dur: '50 分', name: '陰瑜伽放鬆班', coach: '王安妮', pts: 100, level: '低' },
];

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  'cls-001': {
    ...CLASS_SESSIONS[0],
    imageCount: 3,
    coachRating: 4.9,
    coachClasses: 320,
    about:
      '這堂課著重在核心穩定與呼吸節奏的配合，透過器械輔助強化深層肌群控制力，適合想改善體態與腰背痛的學員。',
    notes: [
      '請於課前 10 分鐘到場完成報到',
      '建議穿著貼身運動服，避免過於寬鬆的衣物',
      '請勿食用過飽，建議課前 1 小時完成進食',
    ],
    cancelPolicy: [
      { tone: 'sky', title: '24 小時前取消', desc: '全額退還已扣抵點數' },
      { tone: 'flash', title: '24 小時內取消', desc: '退還 50% 點數' },
      { tone: 'ember', title: '未到場', desc: '不予退還點數' },
    ],
    pointsBalance: 860,
  },
};

export function getCourseDetail(classId: string): CourseDetail {
  const existing = COURSE_DETAILS[classId];
  if (existing) return existing;
  const session = CLASS_SESSIONS.find((c) => c.id === classId) ?? CLASS_SESSIONS[0];
  return {
    ...session,
    imageCount: 3,
    coachRating: 4.8,
    coachClasses: 180,
    about: `這堂課由 ${session.coach} 帶領，依照學員程度調整強度，適合想規律運動的你。`,
    notes: ['請於課前 10 分鐘到場完成報到', '建議穿著合身運動服', '請自備個人水壺'],
    cancelPolicy: [
      { tone: 'sky', title: '24 小時前取消', desc: '全額退還已扣抵點數' },
      { tone: 'flash', title: '24 小時內取消', desc: '退還 50% 點數' },
      { tone: 'ember', title: '未到場', desc: '不予退還點數' },
    ],
    pointsBalance: 860,
  };
}
