import type { WishlistFolderSummary, SavedVenue } from '@/lib/types/wishlist';

export const EMOJI_SET = [
  '❤️', '⭐', '🔥', '💪', '🏃', '🧘', '🥊', '🏸',
  '⚽', '🏀', '🎯', '🏆', '📍', '🌅', '🌙', '☕',
  '🎉', '✨', '🙌', '🧡',
];

export const WISHLIST_FOLDERS: WishlistFolderSummary[] = [
  { id: 'weekend-yoga', emoji: '🧘', name: '週末瑜伽', count: 6 },
  { id: 'pocket-list', emoji: '📍', name: '口袋名單', count: 11 },
  { id: 'date-night', emoji: '🌙', name: '約會場地', count: 3 },
];

export const SAVED_VENUES: SavedVenue[] = [
  { id: 'pilates-liudong', sport: '皮拉提斯', indoor: true, nameTc: '流動皮拉提斯', name: 'FLOW PILATES', rating: 4.9, dist: '1.2 km', price: '120 點/堂' },
  { id: 'yoga-chenguang', sport: '瑜伽', indoor: true, nameTc: '晨光瑜伽所', name: 'MORNING LIGHT', rating: 4.9, dist: '3.1 km', price: '100 點/堂' },
  { id: 'court-xinyi', sport: '羽球', indoor: true, nameTc: '信義運動中心', name: 'XINYI SPORTS', rating: 4.7, dist: '0.8 km', price: '$350/時' },
];
