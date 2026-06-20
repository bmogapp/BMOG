import type { TabListProps, TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, View } from 'react-native';

import { BrandIcons, type BrandIconName } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export function MainTabBar(props: TabListProps) {
  return (
    <View
      {...props}
      className="flex-row justify-around border-t border-bmog-fg-15 bg-bmog-mist px-2 pb-[30px] pt-2.5"
    />
  );
}

type TabBarButtonProps = TabTriggerSlotProps & { icon: BrandIconName; label: string };

export function TabBarButton({ icon, label, isFocused, ...props }: TabBarButtonProps) {
  return (
    <Pressable
      {...props}
      style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      className="flex-1 gap-1.5">
      <Icon
        as={BrandIcons[icon]}
        size={23}
        strokeWidth={isFocused ? 2.4 : 2}
        className={isFocused ? 'text-bmog-ember' : 'text-bmog-fg-38'}
      />
      <Text
        className={`font-tc text-[10.5px] ${isFocused ? 'font-tc-bold text-bmog-forest' : 'text-bmog-fg-38'}`}
        style={{ letterSpacing: 0.4 }}>
        {label}
      </Text>
    </Pressable>
  );
}
