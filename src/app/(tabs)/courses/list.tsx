import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip } from '@/components/brand/chip';
import { ScreenHeader } from '@/components/brand/screen-header';
import { StudioListItem } from '@/components/brand/studio-list-item';
import { Text } from '@/components/ui/text';
import { STUDIOS } from '@/lib/mock/mock-studios';

const SPORTS = ['全部', '皮拉提斯', '瑜伽', 'HIIT', '拳擊', '泰拳', '重量訓練'];

export default function TabCourses() {
  const router = useRouter();
  const params = useLocalSearchParams<{ sport?: string }>();
  const [sport, setSport] = React.useState(params.sport ?? '全部');

  const filtered = sport === '全部' ? STUDIOS : STUDIOS.filter((s) => s.sport === sport);

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScreenHeader title="教室清單" sub={`${filtered.length} 間教室`} onBack={() => router.back()} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 px-5 pb-3.5"
          style={{ flexGrow: 0 }}>
          {SPORTS.map((s) => (
            <Chip key={s} label={s} active={s === sport} onPress={() => setSport(s)} />
          ))}
        </ScrollView>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-7">
          {filtered.length === 0 ? (
            <Text className="font-sans text-bmog-fg-38 text-[13px] text-center mt-10">
              這個分類目前沒有教室
            </Text>
          ) : (
            filtered.map((s) => (
              <StudioListItem
                key={s.id}
                studio={s}
                onPress={() => router.push({ pathname: '/studio/[studioId]', params: { studioId: s.id } })}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
