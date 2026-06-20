import { Pressable, View } from 'react-native';

import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export type SectionLabelProps = {
  children: string;
  action?: string;
  onAction?: () => void;
};

export function SectionLabel({ children, action, onAction }: SectionLabelProps) {
  return (
    <View className="mb-3.5 flex-row items-center justify-between">
      <Text className="font-tc-bold text-bmog-fg text-[18px]">{children}</Text>
      {action ? (
        <Pressable onPress={onAction} className="flex-row items-center gap-1">
          <Text className="font-tc-medium text-bmog-sky text-[13px]">{action}</Text>
          <Icon as={BrandIcons['chevron-right']} size={14} className="text-bmog-sky" />
        </Pressable>
      ) : null}
    </View>
  );
}
