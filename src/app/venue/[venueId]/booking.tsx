import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/brand/screen-header';
import { Text } from '@/components/ui/text';
import { VENUES } from '@/lib/mock/mock-venues';

const HOURS = Array.from({ length: 15 }, (_, i) => 8 + i); // 08:00–22:00
const PEAK_HOURS = new Set([18, 19, 20, 21]);
const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function isBooked(day: number, court: number, hour: number) {
  return (day * 11 + court * 7 + hour * 3) % 9 === 0;
}

export default function VenueBooking() {
  const router = useRouter();
  const { venueId } = useLocalSearchParams<{ venueId: string }>();
  const venue = VENUES.find((v) => v.id === venueId) ?? VENUES[0];
  const [day, setDay] = React.useState(0);
  const [court, setCourt] = React.useState(0);
  const [sel, setSel] = React.useState<Set<number>>(new Set());

  const selectDay = (i: number) => {
    setDay(i);
    setSel(new Set());
  };
  const selectCourt = (i: number) => {
    setCourt(i);
    setSel(new Set());
  };

  const today = new Date(2026, 5, 20);
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const toggleHour = (hour: number) => {
    if (isBooked(day, court, hour)) return;
    setSel((prev) => {
      const next = new Set(prev);
      if (next.has(hour)) next.delete(hour);
      else next.add(hour);
      return next;
    });
  };

  const total = Array.from(sel).reduce(
    (sum, h) => sum + (PEAK_HOURS.has(h) ? venue.peak : venue.offPeak),
    0
  );

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScreenHeader title={venue.name} sub="選擇場地與時段" onBack={() => router.back()} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 px-5 pb-3.5"
          style={{ flexGrow: 0 }}>
          {days.map((d, i) => {
            const active = i === day;
            return (
              <Pressable
                key={i}
                onPress={() => selectDay(i)}
                className={`w-12 items-center gap-1 rounded-tile py-2.5 ${
                  active ? 'bg-bmog-forest' : 'border border-bmog-fg-15'
                }`}>
                <Text className={`font-mono text-[9.5px] ${active ? 'text-bmog-flash' : 'text-bmog-fg-38'}`}>
                  {i === 0 ? '今天' : WEEKDAYS[d.getDay()]}
                </Text>
                <Text className={`font-sans-semibold text-[14px] ${active ? 'text-bmog-mist' : 'text-bmog-fg'}`}>
                  {d.getDate()}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 px-5 pb-3.5"
          style={{ flexGrow: 0 }}>
          {venue.courts.map((c, i) => {
            const free = HOURS.filter((h) => !isBooked(day, i, h)).length;
            const active = i === court;
            return (
              <Pressable
                key={c}
                onPress={() => selectCourt(i)}
                className={`items-center rounded-tile px-4 py-2.5 ${
                  active ? 'bg-bmog-sky' : 'border border-bmog-fg-15'
                }`}>
                <Text className={`font-sans-semibold text-[12.5px] ${active ? 'text-bmog-mist' : 'text-bmog-fg'}`}>
                  {c}
                </Text>
                <Text className={`font-mono text-[9px] mt-0.5 ${active ? 'text-bmog-mist' : 'text-bmog-fg-38'}`}>
                  {free} 個空檔
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View className="flex-row items-center gap-4 px-5 pb-3">
          <View className="flex-row items-center gap-1.5">
            <View className="size-2.5 rounded-full border border-bmog-fg-15 bg-bmog-mist" />
            <Text className="font-mono text-bmog-fg-38 text-[9.5px]">可預約</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <View className="size-2.5 rounded-full bg-bmog-forest" />
            <Text className="font-mono text-bmog-fg-38 text-[9.5px]">已選擇</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <View className="size-2.5 rounded-full bg-bmog-fg-15" />
            <Text className="font-mono text-bmog-fg-38 text-[9.5px]">已預訂</Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-7">
          <View className="flex-row flex-wrap gap-2.5">
            {HOURS.map((h) => {
              const booked = isBooked(day, court, h);
              const selected = sel.has(h);
              const peak = PEAK_HOURS.has(h);
              return (
                <Pressable
                  key={h}
                  disabled={booked}
                  onPress={() => toggleHour(h)}
                  style={{ width: '30%' }}
                  className={`items-center rounded-tile py-3 ${
                    booked
                      ? 'bg-bmog-fg-06'
                      : selected
                        ? 'bg-bmog-forest'
                        : 'border border-bmog-fg-15 bg-bmog-mist'
                  }`}>
                  <Text
                    className={`font-mono-bold text-[13px] ${
                      booked ? 'text-bmog-fg-38' : selected ? 'text-bmog-mist' : 'text-bmog-fg'
                    }`}
                    style={booked ? { textDecorationLine: 'line-through' } : undefined}>
                    {String(h).padStart(2, '0')}:00
                  </Text>
                  <Text
                    className={`font-mono text-[9px] mt-0.5 ${
                      booked ? 'text-bmog-fg-38' : selected ? 'text-bmog-flash' : peak ? 'text-bmog-ember' : 'text-bmog-fg-38'
                    }`}>
                    ${peak ? venue.peak : venue.offPeak}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>

      {sel.size > 0 ? (
        <View className="bg-bmog-forest px-5 pb-3 pt-3.5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-sans-semibold text-bmog-mist text-[13px]">
                {venue.courts[court]} · {sel.size} 個時段
              </Text>
              <Text className="font-mono text-[10.5px] mt-1" style={{ color: 'rgba(255,248,242,0.7)' }}>
                {Array.from(sel)
                  .sort((a, b) => a - b)
                  .map((h) => `${h}:00`)
                  .join(' · ')}
              </Text>
            </View>
            <Text className="font-display text-bmog-flash text-[22px]">${total}</Text>
          </View>
        </View>
      ) : null}
      <SafeAreaView edges={['bottom']} className="bg-bmog-forest px-5">
        <Pressable
          disabled={sel.size === 0}
          onPress={() =>
            router.push({
              pathname: '/venue/[venueId]/confirm',
              params: { venueId: venue.id, hours: Array.from(sel).join(','), court: String(court), day: String(day) },
            })
          }
          className={`h-[54px] flex-row items-center justify-center gap-2 rounded-field active:scale-[0.97] ${
            sel.size > 0 ? 'bg-bmog-ember' : 'bg-bmog-on-dark-18'
          }`}>
          <Text
            className={`font-sans-semibold text-[15px] ${sel.size > 0 ? 'text-bmog-forest' : 'text-bmog-on-dark-55'}`}>
            {sel.size > 0 ? `確認 · $${total}` : '請選擇時段'}
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
