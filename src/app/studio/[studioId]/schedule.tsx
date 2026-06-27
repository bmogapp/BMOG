import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeartButton } from '@/components/brand/heart-button';
import { HeartSheet } from '@/components/brand/heart-sheet';
import { IntensityBadge } from '@/components/brand/intensity-badge';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CLASS_SESSIONS, STUDIOS } from '@/lib/mock/mock-studios';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export default function StudioSchedule() {
  const router = useRouter();
  const { studioId } = useLocalSearchParams<{ studioId: string }>();
  const studio = STUDIOS.find((s) => s.id === studioId) ?? STUDIOS[0];
  const [saved, setSaved] = React.useState(false);
  const [heartOpen, setHeartOpen] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(0);

  const today = new Date(2026, 5, 20);
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const classes = CLASS_SESSIONS.filter((c) => c.studioId === studio.id);

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center gap-3 px-5 py-3">
          <Pressable
            onPress={() => router.back()}
            className="size-[38px] items-center justify-center rounded-tile border border-bmog-fg-15 active:scale-[0.97]">
            <Icon as={BrandIcons['chevron-left']} size={20} className="text-bmog-forest" />
          </Pressable>
          <View className="flex-1">
            <Text className="font-tc-bold text-bmog-fg text-[16px]">{studio.name}</Text>
            <Text className="font-mono text-bmog-fg-38 text-[10px] mt-0.5" style={{ letterSpacing: 0.6 }}>
              課程表 · SCHEDULE
            </Text>
          </View>
          <HeartButton active={saved} onToggle={() => setHeartOpen(true)} size={16} />
        </View>

        <Text className="font-display text-bmog-fg text-[18px] px-5" style={{ letterSpacing: -0.2 }}>
          2026 · 6月
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 px-5 py-3.5"
          style={{ flexGrow: 0 }}>
          {days.map((d, i) => {
            const active = i === selectedDay;
            const isToday = i === 0;
            return (
              <Pressable
                key={i}
                onPress={() => setSelectedDay(i)}
                className={`w-12 items-center gap-1 rounded-tile py-2.5 ${
                  active ? 'bg-bmog-forest' : 'border border-bmog-fg-15'
                }`}>
                <Text
                  className={`font-mono text-[9.5px] ${active ? 'text-bmog-flash' : 'text-bmog-fg-38'}`}>
                  {isToday ? '今天' : WEEKDAYS[d.getDay()]}
                </Text>
                <Text className={`font-sans-semibold text-[14px] ${active ? 'text-bmog-mist' : 'text-bmog-fg'}`}>
                  {d.getDate()}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-7">
          <View className="flex-row items-baseline justify-between mb-3">
            <Text className="font-tc-bold text-bmog-fg text-[15px]">
              6月{days[selectedDay].getDate()}日課程
            </Text>
            <Text className="font-mono text-bmog-fg-38 text-[10.5px]">{classes.length} 堂課</Text>
          </View>

          {classes.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => router.push({ pathname: '/class/[classId]', params: { classId: c.id } })}
              className={`mb-2.5 flex-row items-center gap-3 rounded-tile bg-bmog-mist p-3.5 active:scale-[0.98] ${
                c.hot ? 'border-[1.5px] border-bmog-ember' : 'border border-bmog-fg-15'
              }`}>
              <View className="items-center w-12">
                <Text className="font-mono-bold text-bmog-fg text-[14px]">{c.time}</Text>
                <Text className="font-mono text-bmog-fg-38 text-[9.5px] mt-0.5">{c.dur}</Text>
              </View>
              <View className="h-10 w-px bg-bmog-fg-15" />
              <View className="flex-1">
                <Text className="font-sans-semibold text-bmog-fg text-[14px]">{c.name}</Text>
                <View className="flex-row items-center gap-2 mt-1.5">
                  <View className="size-[18px] items-center justify-center rounded-full bg-bmog-sky">
                    <Text className="font-tc-bold text-bmog-mist text-[8px]">{c.coach[0]}</Text>
                  </View>
                  <Text className="font-mono text-bmog-fg-62 text-[10.5px]">{c.coach}</Text>
                  <IntensityBadge level={c.level} />
                </View>
              </View>
              <View className="items-center">
                <Text className="font-display text-bmog-ember text-[18px]">{c.pts}</Text>
                <Text className="font-mono text-bmog-fg-38 text-[8.5px]">點</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      <HeartSheet visible={heartOpen} onClose={() => setHeartOpen(false)} onSaved={setSaved} />
    </View>
  );
}
