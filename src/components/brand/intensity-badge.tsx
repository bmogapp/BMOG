import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import type { IntensityLevel } from '@/lib/types/course';

const LEVEL_INDEX: Record<IntensityLevel, number> = { 低: 1, 中: 2, 高: 3 };
const BAR_COLORS = ['bg-bmog-sky', 'bg-bmog-flash', 'bg-bmog-ember'];

export function IntensityBadge({ level = '中' as IntensityLevel }: { level?: IntensityLevel }) {
  const active = LEVEL_INDEX[level] ?? 2;
  return (
    <View className="flex-row items-center gap-1.5">
      <View className="flex-row items-end gap-[2px]">
        {[5, 8, 11].map((h, i) => (
          <View
            key={i}
            className={`w-[3px] rounded-full ${i < active ? BAR_COLORS[i] : 'bg-bmog-fg-15'}`}
            style={{ height: h }}
          />
        ))}
      </View>
      <Text className="font-mono text-bmog-fg-62 text-[10.5px]" style={{ letterSpacing: 0.4 }}>
        {level}強度
      </Text>
    </View>
  );
}
