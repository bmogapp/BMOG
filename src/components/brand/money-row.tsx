import { View } from 'react-native';

import { Text } from '@/components/ui/text';

export type MoneyRowProps = {
  label: string;
  value: string;
  sub?: string;
  strong?: boolean;
  accent?: boolean;
};

export function MoneyRow({ label, value, sub, strong, accent }: MoneyRowProps) {
  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row items-baseline gap-1.5">
        <Text className={`font-sans text-[14.5px] ${strong ? 'font-sans-semibold text-bmog-fg' : 'text-bmog-fg-62'}`}>
          {label}
        </Text>
        {sub ? (
          <Text className="font-mono text-bmog-fg-38 text-[11px]" style={{ letterSpacing: 0.3 }}>
            {sub}
          </Text>
        ) : null}
      </View>
      <Text
        className={`font-mono text-[15px] ${strong ? 'font-mono-bold text-[18px]' : ''} ${
          accent ? 'text-bmog-ember' : 'text-bmog-fg'
        }`}
        style={{ fontVariant: ['tabular-nums'] }}>
        {value}
      </Text>
    </View>
  );
}
