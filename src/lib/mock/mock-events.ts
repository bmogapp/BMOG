import type { EventListing, NotifyChannel, WaitlistTicket } from '@/lib/types/event';

export const EVENTS: EventListing[] = [
  {
    id: 'evt-3on3',
    venueId: 'court-daan',
    kicker: 'EVENT · 3 ON 3',
    title: '城市鬥牛夜間賽',
    en: 'CITY NIGHT 3-ON-3',
    date: '2026年6月28日 週日',
    time: '19:00–21:30',
    place: '大安運動公園球場',
    placeSub: 'Court A',
    host: '大安籠式聯盟',
    going: 18,
    cap: 20,
    price: 300,
    desc: [
      [
        { text: '本場為單淘汰制 3 on 3 賽事，' },
        { text: '報名即分組', bold: true },
        { text: '，現場依籤序進行對抗，最終冠軍隊可獲得獎金與獎盃。' },
      ],
      [{ text: '請穿著籠式球場適用之室外運動鞋，禁止穿著釦鞋或皮革底鞋入場。' }],
    ],
    notes: ['請於開賽前 20 分鐘完成報到', '比賽全程錄影，報名即同意授權使用', '雨天順延，將另行通知改期'],
    agenda: [
      { time: '19:00', label: '報到 / 暖身' },
      { time: '19:30', label: '分組抽籤' },
      { time: '19:45', label: '小組賽開始' },
      { time: '21:00', label: '冠軍賽 / 頒獎' },
    ],
    includes: [
      { icon: 'check-circle-2', label: '隊伍背心' },
      { icon: 'gift', label: '紀念毛巾' },
    ],
    form: [
      { id: 'name', label: '姓名', type: 'text', required: true },
      { id: 'phone', label: '聯絡電話', type: 'tel', required: true },
      { id: 'email', label: 'Email', type: 'email' },
      {
        id: 'position',
        label: '慣用位置',
        type: 'choice',
        options: ['控球', '得分後衛', '前鋒', '中鋒'],
        required: true,
      },
      { id: 'note', label: '備註', type: 'textarea', placeholder: '特殊需求或想說的話' },
    ],
  },
];

export const WAITLIST_TICKETS: WaitlistTicket[] = [
  { id: 'single', name: '單人候補', sub: '候補成功後僅補你 1 位', price: 300 },
  { id: 'pair', name: '雙人候補', sub: '候補成功後補你與 1 位同行者', price: 580 },
];

export const NOTIFY_CHANNELS: NotifyChannel[] = [
  { id: 'push', icon: 'bell', label: 'App 推播通知', sub: '候補成功立即通知', system: true },
  { id: 'email', icon: 'mail', label: 'Email 通知', sub: '寄送至註冊信箱' },
  { id: 'sms', icon: 'smartphone', label: '簡訊通知', sub: '額外簡訊費用由平台負擔' },
];
