import type { CalendarBooking, ChatMessage, ChatRoom } from '@/lib/types/community';

export const CALENDAR_BOOKINGS: CalendarBooking[] = [
  { date: 8, type: 'course', time: '09:00', name: '核心控制皮拉提斯', place: '流動皮拉提斯', cost: '120 點', refId: 'cls-001' },
  { date: 14, type: 'venue', time: '18:00', name: '羽球場地租借', place: '信義運動中心', cost: '$500', refId: 'court-xinyi' },
  { date: 21, type: 'event', time: '19:00', name: '城市鬥牛夜間賽', place: '大安運動公園球場', cost: '$300', refId: 'evt-3on3' },
  { date: 21, type: 'course', time: '20:00', name: '實戰對打進階班', place: '北境拳館', cost: '160 點', refId: 'cls-005' },
  { date: 26, type: 'course', time: '09:00', name: '核心控制皮拉提斯', place: '流動皮拉提斯', cost: '120 點', refId: 'cls-001' },
  { date: 26, type: 'venue', time: '18:00', name: '羽球場地租借', place: '信義運動中心', cost: '$500', refId: 'court-xinyi' },
  { date: 26, type: 'event', time: '19:00', name: '城市鬥牛夜間賽', place: '大安運動公園球場', cost: '$300', refId: 'evt-3on3' },
];

export const CHAT_ROOMS: ChatRoom[] = [
  {
    id: 'room-pilates',
    name: '流動皮拉提斯 · 核心班',
    type: '課程',
    host: '陳莉',
    last: '明天上課記得帶水壺喔～',
    time: '14:32',
    unread: 2,
    live: true,
    members: ['陳', '林', '王', '黃', '張'],
  },
  {
    id: 'room-3on3',
    name: '城市鬥牛夜間賽',
    type: '活動',
    host: '大安籠式聯盟',
    last: '報名截止倒數 3 天！',
    time: '11:05',
    unread: 0,
    members: ['周', '許', '蔡', '李'],
  },
  {
    id: 'room-xinyi',
    name: '信義運動中心 · 週日羽球團',
    type: '場地',
    host: '周子涵',
    last: '這週六場地我訂好了',
    time: '昨天',
    unread: 5,
    members: ['周', '許'],
  },
];

export const COMMUNITY_ROOM_MESSAGES: ChatMessage[] = [
  { who: 'host', name: '陳莉', tag: '主辦', text: '大家好～明天的核心班記得提早 10 分鐘到喔', time: '14:02' },
  { who: 'them', name: '林雨晴', text: '好的教練！需要自備瑜伽墊嗎？', time: '14:10' },
  { who: 'host', name: '陳莉', tag: '主辦', text: '教室有提供，不用自備', time: '14:15' },
  { who: 'me', text: '謝謝教練，明天見！', time: '14:32' },
];
