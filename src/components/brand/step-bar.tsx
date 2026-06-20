import { ChevronLeft } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export type StepBarProps = {
  step: number;
  total?: number;
  onBack?: () => void;
};

export function StepBar({ step, total = 5, onBack }: StepBarProps) {
  return (
    <View className="flex-row items-center gap-3.5 px-5 pb-[18px] pt-1">
      <Pressable
        onPress={onBack}
        className="size-[38px] items-center justify-center rounded-tile border border-bmog-fg-15 active:scale-[0.97]">
        <Icon as={ChevronLeft} size={20} className="text-bmog-forest" />
      </Pressable>
      <View className="flex-1 flex-row gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            className={`h-[5px] flex-1 rounded-full ${i < step ? 'bg-bmog-ember' : 'bg-bmog-fg-15'}`}
          />
        ))}
      </View>
      <Text className="font-mono text-bmog-fg-38 text-[11px]" style={{ letterSpacing: 0.7 }}>
        {String(step).padStart(2, '0')}/{String(total).padStart(2, '0')}
      </Text>
    </View>
  );
}
