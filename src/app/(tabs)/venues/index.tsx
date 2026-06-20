import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PickTile } from '@/components/brand/pick-tile';
import type { BrandIconName } from '@/components/ui/brand-icons';
import { Text } from '@/components/ui/text';

const VENUE_TYPES: { id: string; label: string; icon: BrandIconName }[] = [
  { id: '羽球', label: '羽球', icon: 'activity' },
  { id: '籠式足球', label: '籠式足球', icon: 'swords' },
  { id: '網球', label: '網球', icon: 'activity' },
  { id: '籃球', label: '籃球', icon: 'dumbbell' },
  { id: '游泳', label: '游泳', icon: 'flame' },
  { id: '桌球', label: '桌球', icon: 'activity' },
];

export default function TabVenuesPick() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-7 pt-2">
          <Text
            className="font-display text-bmog-fg text-[30px]"
            style={{ textTransform: 'uppercase', letterSpacing: -0.3 }}>
            選擇場地種類
          </Text>
          <Text className="font-sans text-bmog-fg-62 text-[14px] mt-1.5 mb-5">
            找個場地，跟朋友打一場
          </Text>
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {VENUE_TYPES.map((v) => (
              <PickTile
                key={v.id}
                icon={v.icon}
                label={v.label}
                onPress={() => router.push({ pathname: '/venues/list', params: { sport: v.id } })}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
