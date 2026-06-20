import {
  BatteryFull,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  Gift,
  Lock,
  Mail,
  MessageSquare,
  Signal,
  Smartphone,
  UserRound,
  Wifi,
} from 'lucide-react-native';

/** Kebab-case Lucide names (as used by the BMOG design kit) mapped to their lucide-react-native components. */
export const BrandIcons = {
  'battery-full': BatteryFull,
  camera: Camera,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'credit-card': CreditCard,
  gift: Gift,
  lock: Lock,
  mail: Mail,
  'message-square': MessageSquare,
  signal: Signal,
  smartphone: Smartphone,
  'user-round': UserRound,
  wifi: Wifi,
} as const;

export type BrandIconName = keyof typeof BrandIcons;
