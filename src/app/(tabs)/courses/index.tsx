import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PickTile } from '@/components/brand/pick-tile';
import type { BrandIconName } from '@/components/ui/brand-icons';
import { Text } from '@/components/ui/text';

const SPORTS: { id: string; label: string; icon: BrandIconName }[] = [
  { id: '皮拉提斯', label: '皮拉提斯', icon: 'activity' },
  { id: '瑜伽', label: '瑜伽', icon: 'flower-2' },
  { id: 'HIIT', label: 'HIIT', icon: 'flame' },
  { id: '拳擊', label: '拳擊', icon: 'swords' },
  { id: '泰拳', label: '泰拳', icon: 'swords' },
  { id: '重量訓練', label: '重量訓練', icon: 'dumbbell' },
];

export default function TabCoursesPick() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-7 pt-2">
          <Text
            className="font-display text-bmog-fg text-[30px]"
            style={{ textTransform: 'uppercase', letterSpacing: -0.3 }}>
            選擇運動種類
          </Text>
          <Text className="font-sans text-bmog-fg-62 text-[14px] mt-1.5 mb-5">
            挑一種運動，看看附近教室開的課
          </Text>
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {SPORTS.map((s) => (
              <PickTile
                key={s.id}
                icon={s.icon}
                label={s.label}
                onPress={() => router.push({ pathname: '/courses/list', params: { sport: s.id } })}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
