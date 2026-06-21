import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { getCourseDetail, STUDIOS } from '@/lib/mock/mock-studios';

const STAMP_RED = '#C4432B';
const STAMP_CREAM = '#FFF8F2';

function VintageStamp() {
  const scale = useSharedValue(2.2);
  const rotate = useSharedValue(-18);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 80 });
    scale.value = withSequence(
      withTiming(0.94, { duration: 220 }),
      withTiming(1, { duration: 120 })
    );
    rotate.value = withTiming(-9, { duration: 260 });
  }, [opacity, scale, rotate]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          width: 132,
          height: 132,
          borderRadius: 66,
          borderWidth: 4,
          borderColor: STAMP_RED,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(196,67,43,0.06)',
        },
      ]}>
      <View
        style={{
          width: 112,
          height: 112,
          borderRadius: 56,
          borderWidth: 1.5,
          borderColor: STAMP_RED,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          className="font-display text-[18px]"
          style={{ color: STAMP_RED, letterSpacing: 1 }}>
          已評價
        </Text>
        <Text
          className="font-mono text-[8px] mt-1"
          style={{ color: STAMP_RED, letterSpacing: 2 }}>
          REVIEWED
        </Text>
      </View>
    </Animated.View>
  );
}

export default function FlowReviewDone() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const detail = getCourseDetail(bookingId);
  const studio = STUDIOS.find((s) => s.id === detail.studioId) ?? STUDIOS[0];

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1 items-center justify-center px-6" edges={['top', 'bottom']}>
        <View
          style={{ backgroundColor: STAMP_CREAM }}
          className="w-full items-center rounded-card border border-bmog-fg-15 p-7">
          <VintageStamp />
          <Text className="font-tc-bold text-bmog-fg text-[18px] mt-5">感謝你的評價！</Text>
          <Text className="font-sans text-bmog-fg-62 text-[13px] mt-1.5 text-center leading-[19px]">
            {detail.name} · {studio.name}
          </Text>
          <Text className="font-mono text-bmog-fg-38 text-[10.5px] mt-3" style={{ letterSpacing: 0.5 }}>
            +20 BMOG 點數已存入帳戶
          </Text>
        </View>

        <Button
          variant="brand"
          size="brand"
          className="w-full mt-6"
          onPress={() => router.replace('/(tabs)/calendar')}>
          <Text className="font-sans-semibold text-bmog-forest text-[15px]">回到行事曆</Text>
        </Button>
      </SafeAreaView>
    </View>
  );
}
