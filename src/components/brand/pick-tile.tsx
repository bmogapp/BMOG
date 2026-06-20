import { Pressable, View } from 'react-native';

import { BrandIcons, type BrandIconName } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export type PickTileProps = {
  icon: BrandIconName;
  label: string;
  onPress?: () => void;
};

export function PickTile({ icon, label, onPress }: PickTileProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: '31%' }}
      className="aspect-square items-center justify-center gap-2.5 rounded-card border border-bmog-fg-15 bg-bmog-sand active:scale-[0.97]">
      <View className="size-11 items-center justify-center rounded-full bg-bmog-mist">
        <Icon as={BrandIcons[icon]} size={21} className="text-bmog-ember" />
      </View>
      <Text className="font-tc-medium text-bmog-fg text-[12.5px]">{label}</Text>
    </Pressable>
  );
}
