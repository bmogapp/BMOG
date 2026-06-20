import { Pressable, View } from 'react-native';

import { PhotoPlaceholder } from '@/components/brand/photo-placeholder';
import { Text } from '@/components/ui/text';

export type StudioCardProps = {
  name: string;
  area: string;
  dist: string;
  rating: string;
  tag?: string;
};

export function StudioCard({ name, area, dist, rating, tag }: StudioCardProps) {
  return (
    <Pressable className="w-[208px] overflow-hidden rounded-[16px] border border-bmog-fg-15 bg-bmog-mist">
      <View className="relative h-[118px] bg-bmog-sand">
        <PhotoPlaceholder icon="dumbbell" />
        {tag ? (
          <View className="absolute left-2.5 top-2.5 rounded-full bg-bmog-flash px-2 py-1">
            <Text className="font-mono-medium text-bmog-forest text-[9.5px]" style={{ letterSpacing: 1 }}>
              {tag}
            </Text>
          </View>
        ) : null}
      </View>
      <View className="p-3">
        <Text className="font-tc-bold text-bmog-fg text-[15px] mb-1">{name}</Text>
        <View className="flex-row items-center justify-between">
          <Text className="font-tc text-bmog-fg-62 text-[12px]">
            {area} · {dist}
          </Text>
          <View className="flex-row items-center gap-1">
            <Text style={{ color: '#FFD23F' }}>★</Text>
            <Text className="font-mono text-bmog-fg text-[11.5px]">{rating}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
