import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/brand/screen-header';
import { WalletPass } from '@/components/brand/wallet-pass';
import { Button } from '@/components/ui/button';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { getCourseDetail, STUDIOS } from '@/lib/mock/mock-studios';

export default function FlowCheckoutPoints() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const detail = getCourseDetail(bookingId);
  const studio = STUDIOS.find((s) => s.id === detail.studioId) ?? STUDIOS[0];

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScreenHeader title="我的票券" onBack={() => router.back()} />
        <View className="px-5 pt-2">
          <WalletPass
            tint="#FF7A2E"
            dark
            status="BOOKED"
            primaryLabel="課程"
            primaryValue={detail.name}
            primarySub={`教練 ${detail.coach}`}
            fields={[
              { label: '日期', value: '6月20日（六）' },
              { label: '時間', value: `${detail.time} · ${detail.dur}` },
              { label: '教室', value: studio.name },
              { label: '扣抵點數', value: `-${detail.pts} 點`, sub: `餘 ${detail.pointsBalance - detail.pts} 點` },
            ]}
            ticketLabel="BOOKING NO."
            ticketNo={detail.id.toUpperCase()}
            ticketHint="於櫃台出示此 QR，或讓教練掃描入場"
          />

          <View className="flex-row items-center gap-2.5 mt-4 mb-6">
            <Icon as={BrandIcons.wallet} size={15} className="text-bmog-fg-38" />
            <Text className="font-mono text-bmog-fg-38 text-[11px]">
              已可加入 Apple Wallet · 課前提醒
            </Text>
          </View>

          <View className="gap-2.5">
            <Button variant="brand" size="brand">
              <Icon as={BrandIcons['calendar-check']} size={17} className="text-bmog-forest" />
              <Text className="font-sans-semibold text-bmog-forest text-[15px]">加入行事曆</Text>
            </Button>
            <Button variant="brand-outline" size="brand">
              <Icon as={BrandIcons.wallet} size={17} className="text-bmog-forest" />
              <Text className="font-sans-semibold text-bmog-forest text-[15px]">加入 Apple Wallet</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
