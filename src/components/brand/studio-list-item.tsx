import { Pressable, View } from 'react-native';

import { PhotoPlaceholder } from '@/components/brand/photo-placeholder';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import type { Studio } from '@/lib/types/course';

export function StudioListItem({ studio, onPress }: { studio: Studio; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-3 flex-row gap-3.5 rounded-card border border-bmog-fg-15 bg-bmog-mist p-3 active:scale-[0.98]">
      <View style={{ width: 84, height: 84, borderRadius: 14, overflow: 'hidden' }}>
        <PhotoPlaceholder icon="dumbbell" />
      </View>
      <View className="flex-1 justify-center">
        <Text className="font-mono text-bmog-fg-38 text-[10px]" style={{ letterSpacing: 0.6 }}>
          {studio.sport.toUpperCase()} · {studio.area}
        </Text>
        <Text className="font-tc-bold text-bmog-fg text-[15px] mt-1">{studio.name}</Text>
        <View className="flex-row items-center gap-1.5 mt-1.5">
          <Icon as={BrandIcons.star} size={12} fill="#FFD23F" className="text-bmog-ember" />
          <Text className="font-mono text-bmog-fg-62 text-[11px]">
            {studio.rating} · {studio.dist}
          </Text>
        </View>
      </View>
      <Icon as={BrandIcons['chevron-right']} size={18} className="self-center text-bmog-fg-38" />
    </Pressable>
  );
}
