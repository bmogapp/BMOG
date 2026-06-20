import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/brand/screen-header';
import { WalletPass } from '@/components/brand/wallet-pass';
import { Button } from '@/components/ui/button';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VENUES } from '@/lib/mock/mock-venues';

export default function VenueConfirmed() {
  const router = useRouter();
  const { venueId } = useLocalSearchParams<{ venueId: string }>();
  const venue = VENUES.find((v) => v.id === venueId) ?? VENUES[0];

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScreenHeader title="預約完成票券" onBack={() => router.replace('/(tabs)/venues')} />
        <View className="px-5 pt-2">
          <WalletPass
            tint="#3A8CBD"
            dark
            status="CONFIRMED"
            primaryLabel="場地"
            primaryValue={venue.name}
            primarySub={venue.courts[0]}
            fields={[
              { label: '日期', value: '6月20日（六）' },
              { label: '時間', value: '18:00–20:00' },
              { label: '地點', value: venue.area },
              { label: '已付金額', value: '$1,050' },
            ]}
            ticketLabel="BOOKING NO."
            ticketNo={`VEN-${venue.id.slice(0, 4).toUpperCase()}`}
            ticketHint="於櫃台出示此 QR 完成入場"
          />

          <View className="flex-row items-center gap-2.5 mt-4 mb-6">
            <Icon as={BrandIcons.wallet} size={15} className="text-bmog-fg-38" />
            <Text className="font-mono text-bmog-fg-38 text-[11px]">已可加入 Apple Wallet</Text>
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
