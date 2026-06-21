import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/brand/screen-header';
import { WalletPass } from '@/components/brand/wallet-pass';
import { Button } from '@/components/ui/button';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { getCourseDetail, STUDIOS } from '@/lib/mock/mock-studios';

export default function FlowCheckIn() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const detail = getCourseDetail(bookingId);
  const studio = STUDIOS.find((s) => s.id === detail.studioId) ?? STUDIOS[0];
  const [checkedIn, setCheckedIn] = React.useState(false);

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScreenHeader title="課程報到" onBack={() => router.back()} />
        <View className="px-5 pt-2">
          <WalletPass
            tint="#FF7A2E"
            dark
            status={checkedIn ? 'CHECKED-IN' : 'BOOKED'}
            primaryLabel="課程"
            primaryValue={detail.name}
            primarySub={`教練 ${detail.coach}`}
            fields={[
              { label: '日期', value: '6月20日（六）' },
              { label: '時間', value: `${detail.time} · ${detail.dur}` },
              { label: '教室', value: studio.name },
              { label: '狀態', value: checkedIn ? '已報到' : '尚未報到' },
            ]}
            ticketLabel="BOOKING NO."
            ticketNo={detail.id.toUpperCase()}
            ticketHint={checkedIn ? '報到完成，準備開始上課' : '請讓教練掃描此 QR 完成報到'}
          />

          {checkedIn ? (
            <View className="flex-row items-center gap-2.5 mt-5 rounded-tile border border-bmog-forest bg-bmog-flash p-3.5">
              <Icon as={BrandIcons['check-circle-2']} size={18} className="text-bmog-forest" />
              <Text className="flex-1 font-sans-semibold text-bmog-forest text-[13px]">
                已成功報到，祝你有美好的一堂課！
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center gap-2.5 mt-5 rounded-tile border border-bmog-fg-15 bg-bmog-sand p-3.5">
              <Icon as={BrandIcons['scan-line']} size={18} className="text-bmog-fg-62" />
              <Text className="flex-1 font-sans text-bmog-fg-62 text-[12.5px] leading-[18px]">
                到達教室後，讓教練掃描 QR Code，或點擊下方按鈕手動報到
              </Text>
            </View>
          )}

          <View className="gap-2.5 mt-6">
            {checkedIn ? (
              <Button
                variant="brand"
                size="brand"
                onPress={() =>
                  router.push({ pathname: '/review/[bookingId]', params: { bookingId: detail.id } })
                }>
                <Icon as={BrandIcons.star} size={17} className="text-bmog-forest" />
                <Text className="font-sans-semibold text-bmog-forest text-[15px]">給這堂課評價</Text>
              </Button>
            ) : (
              <Button variant="brand" size="brand" onPress={() => setCheckedIn(true)}>
                <Icon as={BrandIcons['scan-line']} size={17} className="text-bmog-forest" />
                <Text className="font-sans-semibold text-bmog-forest text-[15px]">手動完成報到</Text>
              </Button>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
