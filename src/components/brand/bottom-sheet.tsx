import * as React from 'react';
import { Modal, Pressable, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const { height: screenHeight } = useWindowDimensions();
  const translateY = useSharedValue(screenHeight);
  const backdropOpacity = useSharedValue(0);
  const [mounted, setMounted] = React.useState(visible);

  React.useEffect(() => {
    if (visible) {
      // Mount before animating in — Modal must exist before the slide-up
      // transform can run, which this lint rule doesn't model.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      translateY.value = withTiming(0, { duration: 260 });
      backdropOpacity.value = withTiming(1, { duration: 260 });
    } else if (mounted) {
      translateY.value = withTiming(screenHeight, { duration: 220 }, () => {
        runOnJS(setMounted)(false);
      });
      backdropOpacity.value = withTiming(0, { duration: 220 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const close = () => onClose();

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      // Reanimated SharedValue.value mutation — the intended worklet API,
      // not a React-state immutability violation the generic rule assumes.
      // eslint-disable-next-line react-hooks/immutability
      if (e.translationY > 0) translateY.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.translationY > 90) {
        runOnJS(close)();
      } else {
        // eslint-disable-next-line react-hooks/immutability
        translateY.value = withTiming(0, { duration: 180 });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!mounted) return null;

  return (
    <Modal transparent visible animationType="none" onRequestClose={close}>
      <View className="flex-1 justify-end">
        <Animated.View style={[{ position: 'absolute', inset: 0, backgroundColor: '#1E2D21' }, backdropStyle]}>
          <Pressable style={{ flex: 1 }} onPress={close} />
        </Animated.View>
        <GestureDetector gesture={pan}>
          <Animated.View style={sheetStyle} className="rounded-t-card bg-bmog-mist pt-2.5">
            <View className="mb-3.5 h-[5px] w-9 self-center rounded-full bg-bmog-fg-15" />
            {children}
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
}
