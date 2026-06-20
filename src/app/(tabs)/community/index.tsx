import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip } from '@/components/brand/chip';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CHAT_ROOMS } from '@/lib/mock/mock-community';
import type { ChatRoom } from '@/lib/types/community';

const FILTERS: ('全部' | ChatRoom['type'])[] = ['全部', '課程', '活動', '場地'];

export default function TabCommunity() {
  const router = useRouter();
  const [filter, setFilter] = React.useState<typeof FILTERS[number]>('全部');
  const [query, setQuery] = React.useState('');

  const rooms = CHAT_ROOMS.filter((r) => filter === '全部' || r.type === filter).filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-7 pt-2">
          <Text
            className="font-display text-bmog-fg text-[30px]"
            style={{ textTransform: 'uppercase', letterSpacing: -0.3 }}>
            社群
          </Text>
          <Text className="font-sans text-bmog-fg-62 text-[14px] mt-1.5 mb-4">
            跟一起上課、一起運動的人聊聊
          </Text>

          <View className="mb-4 flex-row items-center gap-2.5 rounded-field border border-bmog-fg-15 bg-bmog-mist px-3.5 h-[46px]">
            <Icon as={BrandIcons.search} size={17} className="text-bmog-fg-38" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="搜尋聊天室"
              placeholderTextColor="rgba(30,45,33,0.38)"
              className="flex-1 font-sans text-bmog-fg text-[14px]"
            />
          </View>

          <View className="flex-row gap-2 mb-4">
            {FILTERS.map((f) => (
              <Chip key={f} label={f} active={f === filter} onPress={() => setFilter(f)} />
            ))}
          </View>

          <Text className="font-mono text-bmog-fg-38 text-[10.5px] mb-2.5" style={{ letterSpacing: 0.6 }}>
            我的聊天室 · {rooms.length}
          </Text>

          {rooms.map((r) => (
            <Pressable
              key={r.id}
              onPress={() => router.push({ pathname: '/community/room/[roomId]', params: { roomId: r.id } })}
              className="mb-2.5 flex-row gap-3 rounded-card border border-bmog-fg-15 bg-bmog-mist p-3 active:scale-[0.98]">
              <View>
                <Image
                  source={require('@/assets/brand/venue-photo.png')}
                  style={{ width: 50, height: 50, borderRadius: 14 }}
                  contentFit="cover"
                />
                {r.live ? (
                  <View className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-bmog-mist bg-bmog-sky" />
                ) : null}
              </View>
              <View className="flex-1">
                <View className="flex-row items-center gap-1.5">
                  <View className="rounded-full border border-bmog-fg-15 px-1.5 py-0.5">
                    <Text className="font-mono text-bmog-fg-62 text-[8.5px]">{r.type}</Text>
                  </View>
                  <Text className="flex-1 font-tc-bold text-bmog-fg text-[13.5px]" numberOfLines={1}>
                    {r.name}
                  </Text>
                </View>
                <Text
                  className={`text-[12px] mt-1 ${r.unread > 0 ? 'font-sans-semibold text-bmog-fg' : 'font-sans text-bmog-fg-62'}`}
                  numberOfLines={1}>
                  {r.last}
                </Text>
                <View className="flex-row items-center mt-1.5">
                  {r.members.slice(0, 3).map((m, i) => (
                    <View
                      key={i}
                      style={{ marginLeft: i === 0 ? 0 : -8 }}
                      className="size-[18px] items-center justify-center rounded-full border border-bmog-mist bg-bmog-forest">
                      <Text className="font-tc-bold text-bmog-mist text-[8px]">{m}</Text>
                    </View>
                  ))}
                  <Text className="font-mono text-bmog-fg-38 text-[10px] ml-2">主辦 · {r.host}</Text>
                </View>
              </View>
              <View className="items-end justify-between">
                <Text className="font-mono text-bmog-fg-38 text-[10px]">{r.time}</Text>
                {r.unread > 0 ? (
                  <View className="min-w-[19px] items-center rounded-full bg-bmog-ember px-1.5 py-0.5">
                    <Text className="font-mono-bold text-bmog-forest text-[10px]">{r.unread}</Text>
                  </View>
                ) : null}
              </View>
            </Pressable>
          ))}

          <View className="mt-3 flex-row items-start gap-2.5 rounded-tile border border-dashed border-bmog-fg-15 bg-bmog-sand p-3.5">
            <Icon as={BrandIcons.lock} size={16} className="text-bmog-fg-38 mt-0.5" />
            <Text className="flex-1 font-sans text-bmog-fg-62 text-[12px] leading-[18px]">
              更多聊天室將在你報名課程或活動後解鎖，跟同班同學一起討論吧！
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
