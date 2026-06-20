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
import { STUDIOS } from '@/lib/mock/mock-studios';

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

export default function StudioDetail() {
  const router = useRouter();
  const { studioId } = useLocalSearchParams<{ studioId: string }>();
  const studio = STUDIOS.find((s) => s.id === studioId) ?? STUDIOS[0];
  const [saved, setSaved] = React.useState(false);

  return (
    <View className="flex-1 bg-bmog-mist">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-7">
        <View style={{ position: 'relative', height: 236 }}>
          <PhotoPlaceholder icon="dumbbell" />
          <SafeAreaView edges={['top']} className="absolute inset-x-0 top-0">
            <View className="flex-row items-center justify-between px-4 pt-2">
              <HeroBtn icon="chevron-left" onPress={() => router.back()} />
              <View className="flex-row gap-2">
                <HeroBtn icon="share-2" />
                <HeartButton active={saved} onToggle={() => setSaved((v) => !v)} />
              </View>
            </View>
          </SafeAreaView>
          <View
            className="rounded-full bg-bmog-fg px-2.5 py-1"
            style={{ position: 'absolute', bottom: 12, right: 12 }}>
            <Text className="font-mono text-bmog-mist text-[10px]">1 / 8</Text>
          </View>
        </View>

        <View className="px-5 pt-4">
          <Text className="font-mono text-bmog-ember text-[11px]" style={{ letterSpacing: 0.6 }}>
            {studio.sport.toUpperCase()} · {studio.area} · {studio.dist}
          </Text>
          <Text className="font-tc-bold text-bmog-fg text-[22px] mt-1.5">{studio.name}</Text>
          <Text className="font-sans text-bmog-fg-62 text-[13.5px] leading-[20px] mt-2">{studio.desc}</Text>

          <View className="mt-5 flex-row items-center gap-5 rounded-card border border-bmog-fg-15 bg-bmog-sand p-4">
            <View className="items-center">
              <Text className="font-display text-bmog-fg text-[28px]">{studio.rating}</Text>
              <Stars value={studio.rating} size={13} />
              <Text className="font-mono text-bmog-fg-38 text-[10px] mt-1">{studio.reviews} 則評論</Text>
            </View>
            <View className="flex-1 gap-1.5">
              {studio.ratingDist.map((d) => (
                <View key={d.stars} className="flex-row items-center gap-2">
                  <Text className="font-mono text-bmog-fg-38 text-[9.5px] w-3">{d.stars}</Text>
                  <View className="flex-1 h-[5px] rounded-full bg-bmog-fg-06">
                    <View
                      className="h-[5px] rounded-full bg-bmog-flash"
                      style={{ width: `${d.pct}%` }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-4 gap-3">
            {studio.reviewSamples.map((r, i) => (
              <View key={i} className="rounded-tile border border-bmog-fg-15 bg-bmog-mist p-3.5">
                <View className="flex-row items-center gap-2.5">
                  <View className="size-8 items-center justify-center rounded-full bg-bmog-sky">
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
          <MapDistance address={studio.addr} walkTime={studio.walk} />

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">聯絡方式</Text>
          <View className="gap-2.5">
            {studio.contacts.map((c, i) => (
              <View key={i} className="flex-row items-center gap-3">
                <Icon as={BrandIcons[c.icon]} size={16} className="text-bmog-fg-62" />
                <Text className="flex-1 font-sans text-bmog-fg text-[13px]">{c.label}</Text>
                {c.action ? <Text className="font-sans-semibold text-bmog-sky text-[12.5px]">{c.action}</Text> : null}
              </View>
            ))}
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">附加設施</Text>
          <Facilities items={studio.facilities} />
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} className="border-t border-bmog-fg-15 bg-bmog-mist px-5 pt-3">
        <Button
          variant="brand"
          size="brand"
          onPress={() => router.push({ pathname: '/studio/[studioId]/schedule', params: { studioId: studio.id } })}>
          <Icon as={BrandIcons['calendar-days']} size={18} className="text-bmog-forest" />
          <Text className="font-sans-semibold text-bmog-forest text-[16px]">查看課程表</Text>
        </Button>
      </SafeAreaView>
    </View>
  );
}
