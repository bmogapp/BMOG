import { Pressable } from 'react-native';

import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';

export type HeartButtonProps = {
  active: boolean;
  onToggle: () => void;
  size?: number;
};

export function HeartButton({ active, onToggle, size = 19 }: HeartButtonProps) {
  return (
    <Pressable
      onPress={onToggle}
      className="size-10 items-center justify-center rounded-full active:scale-90"
      style={{ backgroundColor: 'rgba(255,248,242,0.85)' }}>
      <Icon
        as={BrandIcons.heart}
        size={size}
        fill={active ? '#FF7A2E' : 'transparent'}
        className={active ? 'text-bmog-ember' : 'text-bmog-forest'}
        strokeWidth={2}
      />
    </Pressable>
  );
}
