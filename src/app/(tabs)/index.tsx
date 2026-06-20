import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AdCarousel } from '@/components/brand/ad-carousel';
import { CatRow, type CatItem } from '@/components/brand/cat-row';
import { SectionLabel } from '@/components/brand/section-label';
import { StudioCard, type StudioCardProps } from '@/components/brand/studio-card';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

const CLASS_TYPES: CatItem[] = [
  { id: 'pilates', label: '皮拉提斯' },
  { id: 'yoga', label: '瑜伽' },
  { id: 'hiit', label: 'HIIT' },
  { id: 'boxing', label: '拳擊' },
  { id: 'muaythai', label: '泰拳' },
];

const NEW_STUDIOS: StudioCardProps[] = [
  { name: '流動皮拉提斯', area: '信義', dist: '1.2 km', rating: '4.9', tag: '新開幕' },
  { name: '北境拳館', area: '大安', dist: '2.6 km', rating: '4.8', tag: 'NEW' },
  { name: '晨光瑜伽所', area: '中山', dist: '3.1 km', rating: '4.9', tag: 'NEW' },
];

const WISHLISTS = [
  { title: '週末瑜伽', icon: 'heart' as const, count: '6 個收藏' },
  { title: '口袋名單', icon: 'bookmark' as const, count: '11 個收藏' },
];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-7">
          {/* header */}
          <View className="flex-row items-center justify-between px-[18px] pb-4 pt-1.5">
            <View className="flex-row items-center gap-3">
              <View className="size-[46px] items-center justify-center rounded-full bg-bmog-ember">
                <Text className="font-display text-bmog-forest text-[20px]">林</Text>
              </View>
              <View>
                <Text className="text-bmog-fg-38 text-[12px]">早安，準備好了嗎</Text>
                <Text className="font-tc-bold text-bmog-fg text-[18px] leading-[20px]">林凱</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1.5 rounded-full bg-bmog-forest px-3.5 py-2">
                <Icon as={BrandIcons.zap} size={15} color="#FFD23F" />
                <Text className="font-mono-bold text-bmog-mist text-[13px]">1,240</Text>
              </View>
              <View>
                <Icon as={BrandIcons.bell} size={22} className="text-bmog-forest" />
                <View className="absolute -right-0.5 -top-0.5 size-2 rounded-full border border-bmog-mist bg-bmog-ember" />
              </View>
            </View>
          </View>

          {/* ad carousel */}
          <View className="px-[18px] pb-6 pt-1">
            <AdCarousel />
          </View>

          {/* class types */}
          <View className="px-[18px]">
            <SectionLabel action="全部課程">運動類型</SectionLabel>
          </View>
          <View className="mb-6">
            <CatRow items={CLASS_TYPES} activeId="pilates" />
          </View>

          {/* new studios */}
          <View className="px-[18px]">
            <SectionLabel action="看更多">新教室</SectionLabel>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-3.5 px-[18px] pb-1"
            className="mb-6">
            {NEW_STUDIOS.map((s, i) => (
              <StudioCard key={i} {...s} />
            ))}
          </ScrollView>

          {/* wishlist */}
          <View className="px-[18px]">
            <SectionLabel action="管理">心願清單</SectionLabel>
          </View>
          <View className="flex-row flex-wrap gap-3 px-[18px]">
            {WISHLISTS.map((w) => (
              <Pressable
                key={w.title}
                className="w-[47%] flex-1 gap-2.5 rounded-[16px] border border-bmog-fg-15 bg-bmog-mist p-4">
                <View className="flex-row items-center justify-between">
                  <Icon as={BrandIcons[w.icon]} size={19} className="text-bmog-ember" />
                  <Icon as={BrandIcons['chevron-right']} size={16} className="text-bmog-fg-38" />
                </View>
                <View>
                  <Text className="font-tc-bold text-bmog-fg text-[15px]">{w.title}</Text>
                  <Text className="text-bmog-fg-38 text-[12px] mt-0.5">{w.count}</Text>
                </View>
              </Pressable>
            ))}
            <Pressable className="w-full flex-row items-center justify-center gap-2 rounded-[16px] border border-dashed border-bmog-fg-15 p-3.5">
              <Icon as={BrandIcons['folder-plus']} size={18} className="text-bmog-sky" />
              <Text className="font-tc-medium text-bmog-fg-62 text-[14px]">建立新清單並命名分類</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
