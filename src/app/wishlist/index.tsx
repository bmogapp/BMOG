import { useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FolderEditSheet } from '@/components/brand/folder-edit-sheet';
import { ScreenHeader } from '@/components/brand/screen-header';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { WISHLIST_FOLDERS } from '@/lib/mock/mock-wishlist';

export default function WishlistHome() {
  const router = useRouter();
  const [folders, setFolders] = React.useState(WISHLIST_FOLDERS);
  const [manage, setManage] = React.useState(false);
  const [editing, setEditing] = React.useState<{ id: string; emoji: string; name: string } | null>(
    null
  );
  const [creating, setCreating] = React.useState(false);

  const removeFolder = (id: string) => setFolders((prev) => prev.filter((f) => f.id !== id));

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScreenHeader
          title="心願清單"
          sub={`${folders.length} 個清單`}
          onBack={() => router.back()}
          right={manage ? '完成' : '管理'}
          onRight={() => setManage((v) => !v)}
        />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-7">
          <View className="gap-2.5">
            {folders.map((f) => (
              <Pressable
                key={f.id}
                onPress={() =>
                  manage
                    ? setEditing({ id: f.id, emoji: f.emoji, name: f.name })
                    : router.push({ pathname: '/wishlist/[folderId]', params: { folderId: f.id } })
                }
                className="flex-row items-center gap-3.5 rounded-card border border-bmog-fg-15 bg-bmog-mist p-4">
                <View className="size-12 items-center justify-center rounded-full bg-bmog-sand">
                  <Text className="text-[22px]">{f.emoji}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-tc-bold text-bmog-fg text-[15px]">{f.name}</Text>
                  <Text className="font-mono text-bmog-fg-38 text-[10.5px] mt-0.5">
                    {f.count} 個收藏
                  </Text>
                </View>
                {manage ? (
                  <Pressable
                    onPress={() => removeFolder(f.id)}
                    className="size-9 items-center justify-center rounded-full bg-bmog-ember-100 active:scale-90">
                    <Icon as={BrandIcons['trash-2']} size={16} className="text-bmog-ember-700" />
                  </Pressable>
                ) : (
                  <Icon as={BrandIcons['chevron-right']} size={18} className="text-bmog-fg-38" />
                )}
              </Pressable>
            ))}

            <Pressable
              onPress={() => setCreating(true)}
              className="flex-row items-center justify-center gap-2 rounded-card border border-dashed border-bmog-fg-15 p-4">
              <Icon as={BrandIcons['folder-plus']} size={18} className="text-bmog-sky" />
              <Text className="font-tc-medium text-bmog-fg-62 text-[14px]">建立新清單並命名分類</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>

      <FolderEditSheet
        visible={creating}
        onClose={() => setCreating(false)}
        onSave={({ emoji, name }) =>
          setFolders((prev) => [...prev, { id: `folder-${Date.now()}`, emoji, name, count: 0 }])
        }
      />

      <FolderEditSheet
        visible={editing !== null}
        onClose={() => setEditing(null)}
        initial={editing ?? undefined}
        onSave={({ emoji, name }) =>
          setFolders((prev) =>
            prev.map((f) => (f.id === editing?.id ? { ...f, emoji, name } : f))
          )
        }
      />
    </View>
  );
}
