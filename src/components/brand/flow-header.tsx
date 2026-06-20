import { View } from 'react-native';

import { Text } from '@/components/ui/text';

export type FlowHeaderProps = {
  kicker?: string;
  title: string;
  sub?: string;
};

export function FlowHeader({ kicker, title, sub }: FlowHeaderProps) {
  return (
    <View className="px-6 pb-[22px]">
      {kicker ? (
        <Text
          className="font-mono text-bmog-ember text-[11px] mb-2.5"
          style={{ letterSpacing: 1.3, textTransform: 'uppercase' }}>
          {kicker}
        </Text>
      ) : null}
      <Text
        className="font-display text-bmog-fg text-[30px] leading-[30px]"
        style={{ textTransform: 'uppercase', letterSpacing: -0.3 }}>
        {title}
      </Text>
      {sub ? <Text className="text-bmog-fg-62 text-[14.5px] leading-[21px] mt-2.5">{sub}</Text> : null}
    </View>
  );
}
