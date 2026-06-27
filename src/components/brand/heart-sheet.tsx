import * as React from 'react';
import { Pressable, View } from 'react-native';

import { BottomSheet } from '@/components/brand/bottom-sheet';
import { FolderEditSheet } from '@/components/brand/folder-edit-sheet';
import { Button } from '@/components/ui/button';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { WISHLIST_FOLDERS } from '@/lib/mock/mock-wishlist';

export type HeartSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSaved: (saved: boolean) => void;
};

export function HeartSheet({ visible, onClose, onSaved }: HeartSheetProps) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [folders, setFolders] = React.useState(WISHLIST_FOLDERS);
  const [creating, setCreating] = React.useState(false);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const close = () => {
    onSaved(selected.size > 0);
    onClose();
  };

  return (
    <>
      <BottomSheet visible={visible && !creating} onClose={close}>
        <View className="px-6 pb-8 pt-1">
          <Text className="font-tc-bold text-bmog-fg text-[17px] mb-5">加入收藏清單</Text>
          <View className="gap-2.5">
            {folders.map((f) => {
              const active = selected.has(f.id);
              return (
                <Pressable
                  key={f.id}
                  onPress={() => toggle(f.id)}
                  className={`flex-row items-center gap-3 rounded-tile border p-3.5 ${
                    active ? 'border-bmog-ember bg-bmog-ember-100' : 'border-bmog-fg-15'
                  }`}>
                  <Text className="text-[20px]">{f.emoji}</Text>
                  <View className="flex-1">
                    <Text className="font-sans-semibold text-bmog-fg text-[13.5px]">{f.name}</Text>
                    <Text className="font-mono text-bmog-fg-38 text-[10px] mt-0.5">
                      {f.count} 個收藏
                    </Text>
                  </View>
                  <View
                    className={`size-[20px] items-center justify-center rounded-[6px] ${
                      active ? 'bg-bmog-ember' : 'border border-bmog-fg-15'
                    }`}>
                    {active ? <Icon as={BrandIcons.check} size={13} className="text-bmog-forest" /> : null}
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            onPress={() => setCreating(true)}
            className="flex-row items-center justify-center gap-2 rounded-tile border border-dashed border-bmog-fg-15 p-3.5 mt-3">
            <Icon as={BrandIcons['folder-plus']} size={17} className="text-bmog-sky" />
            <Text className="font-tc-medium text-bmog-fg-62 text-[13.5px]">建立新清單</Text>
          </Pressable>

          <Button variant="brand" size="brand" className="mt-6" onPress={close}>
            <Text className="font-sans-semibold text-bmog-forest text-[15px]">完成</Text>
          </Button>
        </View>
      </BottomSheet>

      <FolderEditSheet
        visible={creating}
        onClose={() => setCreating(false)}
        onSave={({ emoji, name }) => {
          const id = `folder-${Date.now()}`;
          setFolders((prev) => [...prev, { id, emoji, name, count: 0 }]);
          setSelected((prev) => new Set(prev).add(id));
        }}
      />
    </>
  );
}
