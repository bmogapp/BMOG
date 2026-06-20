import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';

export function ComingSoon({ title }: { title: string }) {
  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1 items-center justify-center gap-2.5 px-8" edges={['top']}>
        <Text
          className="font-display text-bmog-fg text-[32px]"
          style={{ textTransform: 'uppercase', letterSpacing: -0.3 }}>
          {title}
        </Text>
        <Text className="font-mono text-bmog-fg-38 text-[12px]" style={{ letterSpacing: 1 }}>
          COMING SOON
        </Text>
      </SafeAreaView>
    </View>
  );
}
