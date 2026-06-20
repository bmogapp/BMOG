import { View } from 'react-native';

import { BrandIcons, type BrandIconName } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export type FacilityItem = { icon: BrandIconName; label: string };

export function Facilities({ items }: { items: FacilityItem[] }) {
  return (
    <View className="flex-row flex-wrap gap-2.5">
      {items.map((item, i) => (
        <View
          key={i}
          className="flex-row items-center gap-2 rounded-tile border border-bmog-fg-15 bg-bmog-sand px-3 py-2.5"
          style={{ width: '47%' }}>
          <Icon as={BrandIcons[item.icon]} size={16} className="text-bmog-fg-62" />
          <Text className="font-sans text-bmog-fg-62 text-[12.5px]">{item.label}</Text>
        </View>
      ))}
    </View>
  );
}
