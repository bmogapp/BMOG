import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FlowHeader } from '@/components/brand/flow-header';
import { MoneyRow } from '@/components/brand/money-row';
import { StepBar } from '@/components/brand/step-bar';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { EVENTS } from '@/lib/mock/mock-events';

export default function EventCheckout() {
  const router = useRouter();
  const { venueId, eventId } = useLocalSearchParams<{ venueId: string; eventId: string }>();
  const event = EVENTS.find((e) => e.id === eventId) ?? EVENTS[0];
  const serviceFee = Math.round(event.price * 0.05);
  const total = event.price + serviceFee;
  const [method, setMethod] = React.useState<'card' | 'points'>('card');
  const [agree, setAgree] = React.useState(false);

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <StepBar step={2} total={3} onBack={() => router.back()} />
        <FlowHeader kicker={event.kicker} title="確認與付款" sub={`${event.title} · ${event.date}`} />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pb-7">
          <View className="rounded-card border border-bmog-fg-15 bg-bmog-sand p-4">
            <Text className="font-sans-semibold text-bmog-fg text-[14px]">{event.title}</Text>
            <Text className="font-mono text-bmog-fg-62 text-[11px] mt-1.5">
              {event.date} · {event.time}
            </Text>
            <Text className="font-mono text-bmog-fg-38 text-[10.5px] mt-1">
              {event.place} · {event.placeSub}
            </Text>
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">付款方式</Text>
          <View className="gap-2.5">
            {(
              [
                { id: 'card' as const, icon: 'credit-card' as const, label: '信用卡付款' },
                { id: 'points' as const, icon: 'wallet' as const, label: 'BMOG 點數' },
              ]
            ).map((m) => {
              const active = method === m.id;
              return (
                <Pressable
                  key={m.id}
                  onPress={() => setMethod(m.id)}
                  className={`flex-row items-center gap-3 rounded-tile border p-3.5 ${
                    active ? 'border-bmog-sky bg-bmog-sky-100' : 'border-bmog-fg-15'
                  }`}>
                  <Icon as={BrandIcons[m.icon]} size={18} className="text-bmog-forest" />
                  <Text className="flex-1 font-sans-semibold text-bmog-fg text-[13.5px]">{m.label}</Text>
                  <View
                    className={`size-5 items-center justify-center rounded-full border ${
                      active ? 'border-bmog-sky bg-bmog-sky' : 'border-bmog-fg-15'
                    }`}>
                    {active ? <View className="size-2 rounded-full bg-bmog-mist" /> : null}
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-1.5">費用明細</Text>
          <MoneyRow label="活動費用" value={`$${event.price}`} />
          <MoneyRow label="平台服務費" value={`$${serviceFee}`} sub="5%" />
          <View className="h-px bg-bmog-fg-15 my-1.5" />
          <MoneyRow label="應付總額" value={`$${total}`} strong accent />

          <Pressable onPress={() => setAgree((v) => !v)} className="flex-row items-center gap-2.5 mt-5">
            <View
              className={`size-[22px] items-center justify-center rounded-[7px] ${
                agree ? 'bg-bmog-ember' : 'border border-bmog-fg-15'
              }`}>
              {agree ? <Icon as={BrandIcons.check} size={14} className="text-bmog-forest" /> : null}
            </View>
            <Text className="flex-1 font-sans text-bmog-fg-62 text-[12.5px] leading-[18px]">
              我已閱讀並同意活動<Text className="font-sans-semibold text-bmog-fg">取消政策</Text>
            </Text>
          </Pressable>
        </ScrollView>

        <SafeAreaView edges={['bottom']} className="border-t border-bmog-fg-15 bg-bmog-mist px-5 pt-3">
          <Pressable
            disabled={!agree}
            onPress={() =>
              router.push({
                pathname: '/venue/[venueId]/event/[eventId]/confirmed',
                params: { venueId, eventId: event.id },
              })
            }
            className={`h-[54px] flex-row items-center justify-center gap-2 rounded-field active:scale-[0.97] ${
              agree ? 'bg-bmog-ember' : 'bg-bmog-fg-15'
            }`}>
            <Icon as={BrandIcons.lock} size={16} className={agree ? 'text-bmog-forest' : 'text-bmog-fg-38'} />
            <Text className={`font-sans-semibold text-[15px] ${agree ? 'text-bmog-forest' : 'text-bmog-fg-38'}`}>
              付款 ${total}
            </Text>
          </Pressable>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}
