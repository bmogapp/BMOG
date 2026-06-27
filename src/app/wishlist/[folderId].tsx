import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PhotoPlaceholder } from '@/components/brand/photo-placeholder';
import { ScreenHeader } from '@/components/brand/screen-header';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { STUDIOS } from '@/lib/mock/mock-studios';
import { VENUES } from '@/lib/mock/mock-venues';
import { SAVED_VENUES, WISHLIST_FOLDERS } from '@/lib/mock/mock-wishlist';

export default function WishlistFolder() {
  const router = useRouter();
  const { folderId } = useLocalSearchParams<{ folderId: string }>();
  const folder = WISHLIST_FOLDERS.find((f) => f.id === folderId) ?? WISHLIST_FOLDERS[0];
  const [manage, setManage] = React.useState(false);
  const [items, setItems] = React.useState(SAVED_VENUES);

  const remove = (id: string) => setItems((prev) => prev.filter((v) => v.id !== id));

  const openItem = (id: string) => {
    if (STUDIOS.find((s) => s.id === id)) {
      router.push({ pathname: '/studio/[studioId]', params: { studioId: id } });
    } else if (VENUES.find((v) => v.id === id)) {
      router.push({ pathname: '/venue/[venueId]', params: { venueId: id } });
    }
  };

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScreenHeader
          title={`${folder.emoji} ${folder.name}`}
          sub={`${items.length} 個收藏`}
          onBack={() => router.back()}
          right={manage ? '完成' : '管理'}
          onRight={() => setManage((v) => !v)}
        />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-7">
          <View className="gap-2.5">
            {items.map((v) => (
              <Pressable
                key={v.id}
                onPress={() => (manage ? remove(v.id) : openItem(v.id))}
                className="flex-row gap-3 rounded-card border border-bmog-fg-15 bg-bmog-mist p-3">
                <View style={{ width: 72, height: 72, borderRadius: 12, overflow: 'hidden' }}>
                  <PhotoPlaceholder icon={v.indoor ? 'dumbbell' : 'map-pin'} />
                </View>
                <View className="flex-1 justify-center">
                  <Text className="font-mono text-bmog-sky text-[9.5px]" style={{ letterSpacing: 0.5 }}>
                    {v.sport.toUpperCase()}
                  </Text>
                  <Text className="font-tc-bold text-bmog-fg text-[14.5px] mt-0.5">{v.nameTc}</Text>
                  <Text className="font-mono text-bmog-fg-38 text-[10px] mt-1">
                    {v.rating} · {v.dist} · {v.price}
                  </Text>
                </View>
                <View className="items-center justify-center">
                  {manage ? (
                    <View className="size-9 items-center justify-center rounded-full bg-bmog-ember-100">
                      <Icon as={BrandIcons['trash-2']} size={16} className="text-bmog-ember-700" />
                    </View>
                  ) : (
                    <Icon as={BrandIcons.heart} size={18} fill="#FF7A2E" className="text-bmog-ember" />
                  )}
                </View>
              </Pressable>
            ))}
            {items.length === 0 ? (
              <Text className="font-sans text-bmog-fg-38 text-[13px] text-center mt-10">
                這個清單還沒有收藏項目
              </Text>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
