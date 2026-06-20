import { Pressable } from 'react-native';

import { Text } from '@/components/ui/text';

export type ChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function Chip({ label, active, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-8 items-center justify-center rounded-full px-3.5 active:scale-[0.97] ${
        active ? 'bg-bmog-forest' : 'border border-bmog-fg-15 bg-transparent'
      }`}>
      <Text
        className={`font-mono text-[10.5px] ${active ? 'text-bmog-mist' : 'text-bmog-fg-62'}`}
        style={{ letterSpacing: 0.6, textTransform: 'uppercase' }}>
        {label}
      </Text>
    </Pressable>
  );
}
