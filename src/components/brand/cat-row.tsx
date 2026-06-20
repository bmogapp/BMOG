import { Pressable, ScrollView, View } from 'react-native';

import { PhotoPlaceholder } from '@/components/brand/photo-placeholder';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export type CatItem = { id: string; label: string };

export type CatRowProps = {
  items: CatItem[];
  activeId?: string;
};

export function CatRow({ items, activeId }: CatRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3.5 px-[18px]">
      {items.map((c) => {
        const active = c.id === activeId;
        return (
          <Pressable key={c.id} className="items-center gap-2">
            <View
              className={`size-[66px] overflow-hidden rounded-card ${
                active ? 'border-2 border-bmog-ember' : 'border border-bmog-fg-15'
              }`}>
              <PhotoPlaceholder icon="activity" />
              <View className="absolute inset-0" style={{ backgroundColor: 'rgba(30,45,33,0.3)' }} />
              {active ? (
                <View className="absolute right-1.5 top-1.5 size-[18px] items-center justify-center rounded-full bg-bmog-ember">
                  <Icon as={BrandIcons.check} size={11} className="text-bmog-forest" strokeWidth={3.4} />
                </View>
              ) : null}
            </View>
            <Text
              className={`font-tc text-[11.5px] ${active ? 'font-tc-bold text-bmog-fg' : 'text-bmog-fg-62'}`}>
              {c.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
