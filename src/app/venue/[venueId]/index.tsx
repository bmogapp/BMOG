import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Facilities } from '@/components/brand/facilities-grid';
import { HeartButton } from '@/components/brand/heart-button';
import { MapDistance } from '@/components/brand/map-distance';
import { PhotoPlaceholder } from '@/components/brand/photo-placeholder';
import { Stars } from '@/components/brand/stars';
import { Button } from '@/components/ui/button';
import { BrandIcons, type BrandIconName } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { EVENTS } from '@/lib/mock/mock-events';
import { VENUES } from '@/lib/mock/mock-venues';

function HeroBtn({ onPress, icon }: { onPress?: () => void; icon: BrandIconName }) {
  return (
    <Pressable
      onPress={onPress}
      className="size-10 items-center justify-center rounded-full active:scale-90"
      style={{ backgroundColor: 'rgba(255,248,242,0.85)' }}>
      <Icon as={BrandIcons[icon]} size={18} className="text-bmog-forest" />
    </Pressable>
  );
}

function EventCard({ venueId }: { venueId: string }) {
  const router = useRouter();
  const events = EVENTS.filter((e) => e.venueId === venueId);
  if (events.length === 0) {
    return (
      <Text className="font-sans text-bmog-fg-38 text-[13px] text-center mt-6">
        這個場館目前沒有活動
      </Text>
    );
  }
  return (
    <View className="gap-3">
      {events.map((ev) => (
        <Pressable
          key={ev.id}
          onPress={() =>
            router.push({ pathname: '/venue/[venueId]/event/[eventId]', params: { venueId, eventId: ev.id } })
          }
          className="flex-row gap-3 rounded-card border border-bmog-fg-15 bg-bmog-mist p-3 active:scale-[0.98]">
          <View style={{ width: 84, height: 84, borderRadius: 14, overflow: 'hidden' }}>
            <PhotoPlaceholder icon="swords" />
          </View>
          <View className="flex-1 justify-center">
            <Text className="font-mono text-bmog-ember text-[9.5px]" style={{ letterSpacing: 0.6 }}>
              {ev.kicker}
            </Text>
            <Text className="font-tc-bold text-bmog-fg text-[14.5px] mt-1">{ev.title}</Text>
            <Text className="font-mono text-bmog-fg-62 text-[10.5px] mt-1">
              {ev.date} · {ev.going}/{ev.cap} 人
            </Text>
          </View>
          <View className="items-end justify-center">
            <Text className="font-mono-bold text-bmog-ember text-[14px]">${ev.price}</Text>
            <Text className="font-mono text-bmog-fg-38 text-[9px]">報名</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

export default function VenueDetailRich() {
  const router = useRouter();
  const { venueId } = useLocalSearchParams<{ venueId: string }>();
  const venue = VENUES.find((v) => v.id === venueId) ?? VENUES[0];
  const [saved, setSaved] = React.useState(false);
  const [sub, setSub] = React.useState<'intro' | 'events'>('intro');

  return (
    <View className="flex-1 bg-bmog-mist">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-7">
        <View style={{ position: 'relative', height: 236 }}>
          <PhotoPlaceholder icon="map-pin" />
          <SafeAreaView edges={['top']} className="absolute inset-x-0 top-0">
            <View className="flex-row items-center justify-between px-4 pt-2">
              <HeroBtn icon="chevron-left" onPress={() => router.back()} />
              <View className="flex-row gap-2">
                <HeroBtn icon="share-2" />
                <HeartButton active={saved} onToggle={() => setSaved((v) => !v)} />
              </View>
            </View>
          </SafeAreaView>
        </View>

        <View className="px-5 pt-4">
          <Text className="font-mono text-bmog-sky text-[11px]" style={{ letterSpacing: 0.6 }}>
            {venue.sport.toUpperCase()} · {venue.area} · {venue.dist}
          </Text>
          <Text className="font-tc-bold text-bmog-fg text-[22px] mt-1.5">{venue.name}</Text>
          <Text className="font-sans text-bmog-fg-62 text-[13.5px] leading-[20px] mt-2">{venue.desc}</Text>

          <View className="flex-row mt-5 rounded-tile bg-bmog-sand p-1">
            {(['intro', 'events'] as const).map((s) => (
              <Pressable
                key={s}
                onPress={() => setSub(s)}
                className={`flex-1 items-center rounded-tile py-2.5 ${sub === s ? 'bg-bmog-mist' : ''}`}>
                <Text
                  className={`font-sans-semibold text-[13px] ${sub === s ? 'text-bmog-fg' : 'text-bmog-fg-38'}`}>
                  {s === 'intro' ? '介紹' : '活動'}
                </Text>
              </Pressable>
            ))}
          </View>

          {sub === 'intro' ? (
            <>
              <View className="mt-5 flex-row items-center gap-5 rounded-card border border-bmog-fg-15 bg-bmog-sand p-4">
                <View className="items-center">
                  <Text className="font-display text-bmog-fg text-[28px]">{venue.rating}</Text>
                  <Stars value={venue.rating} size={13} />
                  <Text className="font-mono text-bmog-fg-38 text-[10px] mt-1">{venue.reviews} 則評論</Text>
                </View>
                <View className="flex-1 gap-1.5">
                  {venue.ratingDist.map((d) => (
                    <View key={d.stars} className="flex-row items-center gap-2">
                      <Text className="font-mono text-bmog-fg-38 text-[9.5px] w-3">{d.stars}</Text>
                      <View className="flex-1 h-[5px] rounded-full bg-bmog-fg-06">
                        <View className="h-[5px] rounded-full bg-bmog-flash" style={{ width: `${d.pct}%` }} />
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View className="mt-4 gap-3">
                {venue.reviewSamples.map((r, i) => (
                  <View key={i} className="rounded-tile border border-bmog-fg-15 bg-bmog-mist p-3.5">
                    <View className="flex-row items-center gap-2.5">
                      <View className="size-8 items-center justify-center rounded-full bg-bmog-forest">
                        <Text className="font-tc-bold text-bmog-mist text-[12px]">{r.name[0]}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="font-sans-semibold text-bmog-fg text-[13px]">{r.name}</Text>
                        <Stars value={r.rating} size={10} />
                      </View>
                      <Text className="font-mono text-bmog-fg-38 text-[10px]">{r.date}</Text>
                    </View>
                    <Text className="font-sans text-bmog-fg-62 text-[12.5px] leading-[18px] mt-2">{r.text}</Text>
                  </View>
                ))}
              </View>

              <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">位置與距離</Text>
              <MapDistance address={venue.addr} walkTime={venue.walk} />

              <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">聯絡方式</Text>
              <View className="gap-2.5">
                {venue.contacts.map((c, i) => (
                  <View key={i} className="flex-row items-center gap-3">
                    <Icon as={BrandIcons[c.icon]} size={16} className="text-bmog-fg-62" />
                    <Text className="flex-1 font-sans text-bmog-fg text-[13px]">{c.label}</Text>
                  </View>
                ))}
              </View>

              <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">附加設施</Text>
              <Facilities items={venue.facilities} />
            </>
          ) : (
            <View className="mt-5">
              <EventCard venueId={venue.id} />
            </View>
          )}
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} className="flex-row items-center gap-3.5 border-t border-bmog-fg-15 bg-bmog-mist px-5 pt-3">
        <View>
          <Text className="font-display text-bmog-ember text-[20px]">${venue.offPeak}</Text>
          <Text className="font-mono text-bmog-fg-38 text-[9px]">起 · /時</Text>
        </View>
        <Button
          variant="brand"
          size="brand"
          className="flex-1"
          onPress={() => router.push({ pathname: '/venue/[venueId]/booking', params: { venueId: venue.id } })}>
          <Icon as={BrandIcons['calendar-days']} size={18} className="text-bmog-forest" />
          <Text className="font-sans-semibold text-bmog-forest text-[16px]">選擇時段</Text>
        </Button>
      </SafeAreaView>
    </View>
  );
}
