export type CalendarBooking = {
  date: number;
  type: 'course' | 'venue' | 'event';
  time: string;
  name: string;
  place: string;
  cost: string;
  refId: string;
};

export type ChatRoom = {
  id: string;
  name: string;
  type: '課程' | '活動' | '場地';
  host: string;
  last: string;
  time: string;
  unread: number;
  live?: boolean;
  members: string[];
};

export type ChatMessage = {
  who: 'host' | 'them' | 'me';
  name?: string;
  tag?: string;
  text: string;
  time: string;
};
