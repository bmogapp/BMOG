import { View } from 'react-native';

import { BrandIcons, type BrandIconName } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';

export function PhotoPlaceholder({ icon = 'camera' as BrandIconName }: { icon?: BrandIconName }) {
  return (
    <View className="flex-1 items-center justify-center bg-bmog-sand">
      <View
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(30,45,33,0.04)' }}
      />
      <View className="size-16 items-center justify-center rounded-full bg-bmog-mist">
        <Icon as={BrandIcons[icon]} size={26} className="text-bmog-fg-38" />
      </View>
    </View>
  );
}
