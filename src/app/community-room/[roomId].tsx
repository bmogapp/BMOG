import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PhotoPlaceholder } from '@/components/brand/photo-placeholder';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CHAT_ROOMS, COMMUNITY_ROOM_MESSAGES } from '@/lib/mock/mock-community';
import type { ChatMessage } from '@/lib/types/community';

export default function CommunityRoom() {
  const router = useRouter();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const room = CHAT_ROOMS.find((r) => r.id === roomId) ?? CHAT_ROOMS[0];
  const [messages, setMessages] = React.useState<ChatMessage[]>(COMMUNITY_ROOM_MESSAGES);
  const [draft, setDraft] = React.useState('');

  const send = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [...prev, { who: 'me', text: draft.trim(), time: '現在' }]);
    setDraft('');
  };

  return (
    <View className="flex-1 bg-bmog-sand">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center gap-3 border-b border-bmog-fg-15 bg-bmog-mist px-4 py-3">
          <Pressable
            onPress={() => router.back()}
            className="size-9 items-center justify-center rounded-tile border border-bmog-fg-15 active:scale-[0.95]">
            <Icon as={BrandIcons['chevron-left']} size={18} className="text-bmog-forest" />
          </Pressable>
          <View style={{ width: 40, height: 40, borderRadius: 12, overflow: 'hidden' }}>
            <PhotoPlaceholder icon="messages-square" />
          </View>
          <View className="flex-1">
            <Text className="font-tc-bold text-bmog-fg text-[14.5px]" numberOfLines={1}>
              {room.name}
            </Text>
            <Text className="font-mono text-bmog-fg-38 text-[10px] mt-0.5">
              {room.members.length} 位參加者 · 主辦 {room.host}
            </Text>
          </View>
          <Icon as={BrandIcons.info} size={19} className="text-bmog-fg-38" />
        </View>

        <ScrollView contentContainerClassName="px-4 py-4 gap-3" showsVerticalScrollIndicator={false}>
          <Text className="self-center font-mono text-bmog-fg-38 text-[10.5px]">— 6月19日 —</Text>
          {messages.map((m, i) => {
            const mine = m.who === 'me';
            return (
              <View key={i} className={`gap-1 ${mine ? 'items-end' : 'items-start'}`}>
                {!mine ? (
                  <View className="flex-row items-center gap-1.5 ml-1">
                    <Text className="font-sans-semibold text-bmog-fg-62 text-[11.5px]">{m.name}</Text>
                    {m.tag ? (
                      <View className="rounded-full border border-bmog-ember px-1.5 py-0.5">
                        <Text className="font-mono text-bmog-ember text-[8px]">{m.tag}</Text>
                      </View>
                    ) : null}
                  </View>
                ) : null}
                <View
                  className={`max-w-[78%] flex-row items-end gap-2 ${mine ? 'flex-row-reverse' : ''}`}>
                  <View
                    className={`rounded-tile px-3.5 py-2.5 ${
                      mine
                        ? 'bg-bmog-forest rounded-br-[4px]'
                        : `bg-bmog-mist border ${m.tag ? 'border-bmog-ember' : 'border-bmog-fg-15'}`
                    }`}>
                    <Text className={`font-sans text-[13.5px] ${mine ? 'text-bmog-mist' : 'text-bmog-fg'}`}>
                      {m.text}
                    </Text>
                  </View>
                  <Text className="font-mono text-bmog-fg-38 text-[9.5px] mb-1">{m.time}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View className="flex-row items-center gap-2.5 border-t border-bmog-fg-15 bg-bmog-mist px-3.5 py-2.5">
          <Pressable className="size-9 items-center justify-center active:scale-90">
            <Icon as={BrandIcons.plus} size={20} className="text-bmog-fg-62" />
          </Pressable>
          <View className="flex-1 flex-row items-center gap-2 rounded-full bg-bmog-sand px-4 h-[40px]">
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="傳送訊息…"
              placeholderTextColor="rgba(30,45,33,0.38)"
              className="flex-1 font-sans text-bmog-fg text-[13.5px]"
            />
            <Icon as={BrandIcons.smile} size={18} className="text-bmog-fg-38" />
          </View>
          <Pressable
            onPress={send}
            className="size-9 items-center justify-center rounded-full bg-bmog-ember active:scale-90">
            <Icon as={BrandIcons['arrow-up']} size={18} className="text-bmog-forest" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
