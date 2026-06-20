import { useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CALENDAR_BOOKINGS } from '@/lib/mock/mock-community';
import type { CalendarBooking } from '@/lib/types/community';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
const TYPE_TONE: Record<CalendarBooking['type'], { bg: string; text: string; label: string }> = {
  course: { bg: 'bg-bmog-ember-100', text: 'text-bmog-ember-700', label: '課程' },
  venue: { bg: 'bg-bmog-sky-100', text: 'text-bmog-sky-700', label: '場地' },
  event: { bg: 'bg-bmog-forest', text: 'text-bmog-mist', label: '活動' },
};

function routeForBooking(b: CalendarBooking): { pathname: string; params: Record<string, string> } {
  if (b.type === 'course') return { pathname: '/class/[classId]', params: { classId: b.refId } };
  if (b.type === 'venue') return { pathname: '/venue/[venueId]', params: { venueId: b.refId } };
  return { pathname: '/venue/[venueId]/event/[eventId]', params: { venueId: 'court-daan', eventId: b.refId } };
}

export default function TabCalendar() {
  const router = useRouter();
  const today = new Date(2026, 5, 20);
  const [monthOffset, setMonthOffset] = React.useState(0);
  const [selected, setSelected] = React.useState(26);

  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const bookingsByDay = React.useMemo(() => {
    const map = new Map<number, CalendarBooking[]>();
    if (monthOffset === 0) {
      for (const b of CALENDAR_BOOKINGS) {
        map.set(b.date, [...(map.get(b.date) ?? []), b]);
      }
    }
    return map;
  }, [monthOffset]);

  const selectedBookings = monthOffset === 0 ? bookingsByDay.get(selected) ?? [] : [];
  const selectedWeekdayLabel = WEEKDAYS[new Date(year, month, selected).getDay()];

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-7 pt-2">
          <View className="flex-row items-center justify-between mb-5">
            <Pressable
              onPress={() => setMonthOffset((m) => m - 1)}
              className="size-[34px] items-center justify-center rounded-tile border border-bmog-fg-15 active:scale-[0.95]">
              <Icon as={BrandIcons['chevron-left']} size={17} className="text-bmog-forest" />
            </Pressable>
            <Text
              className="font-display text-bmog-fg text-[20px]"
              style={{ textTransform: 'uppercase', letterSpacing: -0.2 }}>
              {year} · {month + 1}月
            </Text>
            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() => setMonthOffset((m) => m + 1)}
                className="size-[34px] items-center justify-center rounded-tile border border-bmog-fg-15 active:scale-[0.95]">
                <Icon as={BrandIcons['chevron-right']} size={17} className="text-bmog-forest" />
              </Pressable>
              <Pressable className="size-[42px] items-center justify-center rounded-tile bg-bmog-ember active:scale-[0.95]">
                <Icon as={BrandIcons.plus} size={19} className="text-bmog-forest" />
              </Pressable>
            </View>
          </View>

          <View className="flex-row mb-2">
            {WEEKDAYS.map((w, i) => (
              <Text
                key={w}
                className={`flex-1 text-center font-mono text-[10.5px] ${
                  i === 0 ? 'text-bmog-ember' : 'text-bmog-fg-38'
                }`}>
                {w}
              </Text>
            ))}
          </View>

          <View className="flex-row flex-wrap">
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <View key={`pad-${i}`} style={{ width: '14.28%' }} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = day === selected;
              const bookings = bookingsByDay.get(day) ?? [];
              return (
                <Pressable
                  key={day}
                  onPress={() => setSelected(day)}
                  style={{ width: '14.28%' }}
                  className="aspect-square items-center justify-center">
                  <View
                    className={`size-[34px] items-center justify-center rounded-tile ${
                      isSelected ? 'bg-bmog-forest' : ''
                    }`}>
                    <Text
                      className={`font-sans text-[13.5px] ${isSelected ? 'text-bmog-mist' : 'text-bmog-fg'}`}>
                      {day}
                    </Text>
                  </View>
                  {bookings.length > 0 ? (
                    <View className="flex-row gap-[2px] mt-1">
                      {bookings.slice(0, 3).map((_, di) => (
                        <View
                          key={di}
                          className={`size-[4px] rounded-full ${isSelected ? 'bg-bmog-ember' : 'bg-bmog-sky'}`}
                        />
                      ))}
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </View>

          <View className="mt-6 flex-row items-baseline justify-between">
            <Text className="font-tc-bold text-bmog-fg text-[16px]">
              {month + 1}月{selected}日 · 週{selectedWeekdayLabel}
            </Text>
            <Text className="font-mono text-bmog-fg-38 text-[11px]">{selectedBookings.length} 項已預約</Text>
          </View>

          <View className="mt-3.5">
            {selectedBookings.map((b, i) => {
              const tone = TYPE_TONE[b.type];
              return (
                <Pressable
                  key={i}
                  onPress={() => router.push(routeForBooking(b) as never)}
                  className="mb-2.5 flex-row items-center gap-3 rounded-tile border border-bmog-fg-15 bg-bmog-mist p-3 active:scale-[0.98]">
                  <View className="items-center">
                    <Text className="font-mono-bold text-bmog-fg text-[14px]">{b.time}</Text>
                    <View className={`mt-1.5 rounded-full px-2 py-0.5 ${tone.bg}`}>
                      <Text className={`font-mono text-[9px] ${tone.text}`} style={{ letterSpacing: 0.4 }}>
                        {tone.label}
                      </Text>
                    </View>
                  </View>
                  <View className="h-9 w-px bg-bmog-fg-15" />
                  <View className="flex-1">
                    <Text className="font-sans-semibold text-bmog-fg text-[14px]">{b.name}</Text>
                    <Text className="font-mono text-bmog-fg-62 text-[11px] mt-1">
                      {b.place} · {b.cost}
                    </Text>
                  </View>
                  <Icon as={BrandIcons['chevron-right']} size={17} className="text-bmog-fg-38" />
                </Pressable>
              );
            })}
            <Pressable className="items-center rounded-tile border border-dashed border-bmog-fg-15 py-3.5 active:scale-[0.98]">
              <Text className="font-sans text-bmog-fg-38 text-[12.5px]">
                + 為 {month + 1}/{selected} 預約課程或活動
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
