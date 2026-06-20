import { Pressable, View } from 'react-native';

import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export type ScreenHeaderProps = {
  title: string;
  sub?: string;
  onBack?: () => void;
  right?: string;
  onRight?: () => void;
  rightTone?: 'sky' | 'ember';
};

export function ScreenHeader({ title, sub, onBack, right, onRight, rightTone = 'sky' }: ScreenHeaderProps) {
  return (
    <View className="flex-row items-center gap-3 px-5 py-3">
      <Pressable
        onPress={onBack}
        className="size-[38px] items-center justify-center rounded-tile border border-bmog-fg-15 active:scale-[0.97]">
        <Icon as={BrandIcons['chevron-left']} size={20} className="text-bmog-forest" />
      </Pressable>
      <View className="flex-1">
        <Text className="font-tc-bold text-bmog-fg text-[16.5px]">{title}</Text>
        {sub ? <Text className="font-mono text-bmog-fg-38 text-[10.5px] mt-0.5">{sub}</Text> : null}
      </View>
      {right ? (
        <Pressable onPress={onRight} className="px-2 py-2 active:scale-[0.97]">
          <Text
            className={`font-sans-semibold text-[14px] ${
              rightTone === 'ember' ? 'text-bmog-ember' : 'text-bmog-sky'
            }`}>
            {right}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
