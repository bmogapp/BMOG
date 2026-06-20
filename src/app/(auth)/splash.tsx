import { router } from 'expo-router';
import { Smartphone } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export default function SplashScreen() {
  return (
    <View className="flex-1 bg-bmog-ember">
      <SafeAreaView className="flex-1 px-7">
        <View className="flex-1 justify-center">
          <Text
            className="font-mono text-bmog-forest text-[12px] mb-[18px]"
            style={{ letterSpacing: 1.7, textTransform: 'uppercase' }}>
            Be the Mogger
          </Text>
          <Text
            className="font-display text-bmog-forest text-[74px] leading-[64px]"
            style={{ textTransform: 'uppercase', letterSpacing: -0.7 }}>
            own{'\n'}the{'\n'}hour.
          </Text>
          <Text className="font-tc text-[16px] leading-[24px] mt-[22px]" style={{ color: 'rgba(30,45,33,0.72)' }}>
            課程、場地、活動{'\n'}一個 App，一鍵預約。
          </Text>
        </View>

        <View className="pb-[18px]">
          <Pressable
            onPress={() => router.push('/(auth)/phone-otp')}
            className="mb-3 h-[54px] flex-row items-center justify-center gap-2.5 rounded-field bg-bmog-forest active:scale-[0.97]">
            <Icon as={Smartphone} size={19} color="#FFD23F" />
            <Text className="font-sans-semibold text-bmog-mist text-[16px]">用手機號碼開始</Text>
          </Pressable>
          <Text className="text-center text-[14px]" style={{ color: 'rgba(30,45,33,0.7)' }}>
            已有帳號？<Text className="font-sans-bold text-bmog-forest text-[14px]">登入</Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
