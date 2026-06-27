import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export default function ReferralReward() {
  const router = useRouter();

  return (
    <View className="flex-1" style={{ backgroundColor: '#0E1410' }}>
      <SafeAreaView className="flex-1 items-center" edges={['top', 'bottom']}>
        <Pressable
          onPress={() => router.back()}
          className="absolute left-5 top-14 size-10 items-center justify-center rounded-full active:scale-90"
          style={{ backgroundColor: 'rgba(255,248,242,0.12)' }}>
          <Icon as={BrandIcons.x} size={18} className="text-bmog-mist" />
        </Pressable>

        <Text className="font-display text-bmog-mist text-[48px] mt-24" style={{ letterSpacing: -1 }}>
          21:08
        </Text>
        <Text className="font-sans text-[14px] mt-1" style={{ color: 'rgba(255,248,242,0.55)' }}>
          2026年6月20日 星期六
        </Text>

        <View
          className="w-full px-5 mt-12"
          style={{ alignItems: 'center' }}>
          <View
            className="w-full flex-row gap-3 rounded-[18px] p-3.5"
            style={{ backgroundColor: 'rgba(255,248,242,0.14)', maxWidth: 360 }}>
            <View className="size-10 items-center justify-center rounded-[10px] bg-bmog-ember">
              <Icon as={BrandIcons.zap} size={18} className="text-bmog-forest" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-mono text-bmog-mist text-[10px]" style={{ letterSpacing: 1 }}>
                  BMOG
                </Text>
                <Text className="font-mono text-[9.5px]" style={{ color: 'rgba(255,248,242,0.5)' }}>
                  現在
                </Text>
              </View>
              <Text className="font-sans-semibold text-bmog-mist text-[13.5px] mt-1">
                好友已加入！🎉
              </Text>
              <Text
                className="font-sans text-[12.5px] mt-0.5 leading-[18px]"
                style={{ color: 'rgba(255,248,242,0.78)' }}>
                陳宥安 用你的邀請碼完成註冊，+25 點已存入你的帳戶
              </Text>
            </View>
          </View>
        </View>

        <View className="px-8 mt-10 items-center">
          <Icon as={BrandIcons.info} size={16} className="text-bmog-fg-38" />
          <Text
            className="font-sans text-[12px] mt-2.5 text-center leading-[18px]"
            style={{ color: 'rgba(255,248,242,0.5)' }}>
            這是推薦獎勵通知的預覽畫面，實際通知會在好友完成註冊時發送到你的裝置
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
