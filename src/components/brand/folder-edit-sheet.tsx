import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { BottomSheet } from '@/components/brand/bottom-sheet';
import { Field } from '@/components/brand/field';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { EMOJI_SET } from '@/lib/mock/mock-wishlist';

export type FolderEditSheetProps = {
  visible: boolean;
  onClose: () => void;
  initial?: { emoji: string; name: string };
  onSave: (folder: { emoji: string; name: string }) => void;
};

function FolderEditSheetBody({
  onClose,
  initial,
  onSave,
}: Omit<FolderEditSheetProps, 'visible'>) {
  const [emoji, setEmoji] = React.useState(initial?.emoji ?? EMOJI_SET[0]);
  const [name, setName] = React.useState(initial?.name ?? '');
  const valid = name.trim().length > 0;

  return (
    <View className="px-6 pb-8 pt-1">
      <Text className="font-tc-bold text-bmog-fg text-[17px] mb-5">
        {initial ? '編輯清單' : '建立新清單'}
      </Text>

      <View className="items-center mb-5">
        <View className="size-16 items-center justify-center rounded-full bg-bmog-sand">
          <Text className="text-[28px]">{emoji}</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-5">
        {EMOJI_SET.map((e) => {
          const active = e === emoji;
          return (
            <Pressable
              key={e}
              onPress={() => setEmoji(e)}
              className={`size-11 items-center justify-center rounded-full ${
                active ? 'bg-bmog-forest' : 'bg-bmog-sand'
              }`}>
              <Text className="text-[20px]">{e}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Field label="清單名稱" placeholder="例如：週末瑜伽" value={name} onChangeText={setName} />

      <Button
        variant="brand"
        size="brand"
        disabled={!valid}
        onPress={() => {
          onSave({ emoji, name: name.trim() });
          onClose();
        }}>
        <Text className="font-sans-semibold text-bmog-forest text-[15px]">
          {initial ? '儲存變更' : '建立清單'}
        </Text>
      </Button>
    </View>
  );
}

export function FolderEditSheet({ visible, onClose, initial, onSave }: FolderEditSheetProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <FolderEditSheetBody
        key={initial ? `${initial.emoji}|${initial.name}` : 'create'}
        onClose={onClose}
        initial={initial}
        onSave={onSave}
      />
    </BottomSheet>
  );
}
