import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/brand/screen-header';
import { WalletPass } from '@/components/brand/wallet-pass';
import { Button } from '@/components/ui/button';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { EVENTS } from '@/lib/mock/mock-events';

export default function EventConfirmed() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams<{ venueId: string; eventId: string }>();
  const event = EVENTS.find((e) => e.id === eventId) ?? EVENTS[0];

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScreenHeader title="報名完成票券" onBack={() => router.replace('/(tabs)/community')} />
        <View className="px-5 pt-2">
          <WalletPass
            tint="#FFD23F"
            status="CONFIRMED"
            primaryLabel="活動"
            primaryValue={event.title}
            primarySub={event.placeSub}
            fields={[
              { label: '日期', value: event.date },
              { label: '時間', value: event.time },
              { label: '地點', value: event.place },
              { label: '已付金額', value: `$${Math.round(event.price * 1.05)}` },
            ]}
            ticketLabel="REG. NO."
            ticketNo={`EVT-${event.id.slice(4, 8).toUpperCase()}`}
            ticketHint="於現場出示此 QR 完成報到"
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
