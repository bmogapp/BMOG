import { Pressable, View } from 'react-native';

import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';

export type StarsProps = {
  value: number;
  size?: number;
  gap?: number;
  onChange?: (value: number) => void;
};

export function Stars({ value, size = 16, gap = 2, onChange }: StarsProps) {
  return (
    <View className="flex-row" style={{ gap }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(value);
        const star = (
          <Icon
            as={BrandIcons.star}
            size={size}
            fill={filled ? '#FFD23F' : 'transparent'}
            className={filled ? 'text-bmog-ember' : 'text-bmog-fg-15'}
            strokeWidth={1.5}
          />
        );
        if (!onChange) return <View key={i}>{star}</View>;
        return (
          <Pressable key={i} onPress={() => onChange(i + 1)} className="active:scale-90">
            {star}
          </Pressable>
        );
      })}
    </View>
  );
}
