import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip } from '@/components/brand/chip';
import { ScreenHeader } from '@/components/brand/screen-header';
import { VenueListItem } from '@/components/brand/venue-list-item';
import { Text } from '@/components/ui/text';
import { VENUES } from '@/lib/mock/mock-venues';

const SPORTS = ['全部', '羽球', '籠式足球', '網球', '籃球', '游泳', '桌球'];

export default function TabVenues() {
  const router = useRouter();
  const params = useLocalSearchParams<{ sport?: string }>();
  const [sport, setSport] = React.useState(params.sport ?? '全部');

  const filtered = sport === '全部' ? VENUES : VENUES.filter((v) => v.sport === sport);

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScreenHeader title="場館清單" sub={`${filtered.length} 個場館`} onBack={() => router.back()} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 px-5 pb-3.5"
          style={{ flexGrow: 0 }}>
          {SPORTS.map((s) => (
            <Chip key={s} label={s} active={s === sport} onPress={() => setSport(s)} />
          ))}
        </ScrollView>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-7">
          {filtered.length === 0 ? (
            <Text className="font-sans text-bmog-fg-38 text-[13px] text-center mt-10">
              這個分類目前沒有場館
            </Text>
          ) : (
            filtered.map((v) => (
              <VenueListItem
                key={v.id}
                venue={v}
                onPress={() => router.push({ pathname: '/venues/[venueId]', params: { venueId: v.id } })}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
