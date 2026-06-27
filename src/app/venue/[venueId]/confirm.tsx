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
import { PAYERS, VENUES } from '@/lib/mock/mock-venues';

const PEAK_HOURS = new Set([18, 19, 20, 21]);
const STATUS_LABEL: Record<string, string> = { ready: '已就緒', pending: '待確認', invited: '已邀請' };
const STATUS_TONE: Record<string, string> = {
  ready: 'bg-bmog-sky-100 text-bmog-sky-700',
  pending: 'bg-bmog-flash text-bmog-forest',
  invited: 'bg-bmog-fg-06 text-bmog-fg-62',
};

export default function VenueConfirm() {
  const router = useRouter();
  const { venueId, hours, court, day } = useLocalSearchParams<{
    venueId: string;
    hours: string;
    court: string;
    day: string;
  }>();
  const venue = VENUES.find((v) => v.id === venueId) ?? VENUES[0];
  const selectedHours = (hours ?? '')
    .split(',')
    .filter(Boolean)
    .map(Number)
    .sort((a, b) => a - b);
  const venueCost = selectedHours.reduce(
    (sum, h) => sum + (PEAK_HOURS.has(h) ? venue.peak : venue.offPeak),
    0
  );
  const serviceFee = Math.round(venueCost * 0.05);
  const total = venueCost + serviceFee;

  const [mode, setMode] = React.useState<'single' | 'split'>('single');
  const [people, setPeople] = React.useState(2);
  const [agree, setAgree] = React.useState(false);

  const perPerson = mode === 'split' ? Math.ceil(total / people) : total;

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <StepBar step={1} total={2} onBack={() => router.back()} />
        <FlowHeader kicker="場地租借 · 確認預約" title="確認與付款" sub={`${venue.courts[Number(court) || 0]} · 6/${20 + Number(day || 0)}`} />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pb-7">
          <View className="rounded-card border border-bmog-fg-15 bg-bmog-sand p-4">
            <Text className="font-sans-semibold text-bmog-fg text-[14px]">{venue.name}</Text>
            <Text className="font-mono text-bmog-fg-62 text-[11px] mt-1.5">
              {selectedHours.map((h) => `${h}:00`).join(' · ')}
            </Text>
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">付款方式</Text>
          <View className="flex-row rounded-tile bg-bmog-sand p-1">
            {(['single', 'split'] as const).map((m) => (
              <Pressable
                key={m}
                onPress={() => setMode(m)}
                className={`flex-1 items-center rounded-tile py-2.5 ${mode === m ? 'bg-bmog-mist' : ''}`}>
                <Text className={`font-sans-semibold text-[13px] ${mode === m ? 'text-bmog-fg' : 'text-bmog-fg-38'}`}>
                  {m === 'single' ? '一人付款' : '平分付款'}
                </Text>
              </Pressable>
            ))}
          </View>

          {mode === 'split' ? (
            <>
              <View className="flex-row items-center justify-between mt-4">
                <Text className="font-sans text-bmog-fg-62 text-[13px]">分攤人數</Text>
                <View className="flex-row items-center gap-3">
                  <Pressable
                    onPress={() => setPeople((p) => Math.max(2, p - 1))}
                    className="size-8 items-center justify-center rounded-full border border-bmog-fg-15 active:scale-90">
                    <Icon as={BrandIcons.minus} size={15} className="text-bmog-forest" />
                  </Pressable>
                  <Text className="font-mono-bold text-bmog-fg text-[16px] w-5 text-center">{people}</Text>
                  <Pressable
                    onPress={() => setPeople((p) => Math.min(4, p + 1))}
                    className="size-8 items-center justify-center rounded-full border border-bmog-fg-15 active:scale-90">
                    <Icon as={BrandIcons.plus} size={15} className="text-bmog-forest" />
                  </Pressable>
                </View>
              </View>

              <View className="mt-3 gap-2">
                {PAYERS.slice(0, people).map((p, i) => (
                  <View
                    key={p.id}
                    className="flex-row items-center gap-3 rounded-tile border border-bmog-fg-15 bg-bmog-mist p-3">
                    <View className="size-9 items-center justify-center rounded-full bg-bmog-forest">
                      <Text className="font-tc-bold text-bmog-mist text-[13px]">{p.name[0]}</Text>
                    </View>
                    <Text className="flex-1 font-sans-semibold text-bmog-fg text-[13.5px]">
                      {i === 0 ? `${p.name}（你）` : p.name}
                    </Text>
                    <View className={`rounded-full px-2.5 py-1 ${STATUS_TONE[p.status]}`}>
                      <Text className="font-mono text-[9.5px]">{STATUS_LABEL[p.status]}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View className="flex-row items-start gap-2.5 mt-3 rounded-tile border border-bmog-ember bg-bmog-ember-100 p-3.5">
                <Icon as={BrandIcons['alert-triangle']} size={16} className="text-bmog-ember-700 mt-0.5" />
                <Text className="flex-1 font-sans text-bmog-ember-700 text-[12px] leading-[18px]">
                  所有分攤者須在 30 分鐘內完成付款，否則此預約將自動取消並全額退款。
                </Text>
              </View>
            </>
          ) : null}

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-1.5">費用明細</Text>
          <MoneyRow label="場地費" value={`$${venueCost}`} />
          <MoneyRow label="平台服務費" value={`$${serviceFee}`} sub="5%" />
          <View className="h-px bg-bmog-fg-15 my-1.5" />
          <MoneyRow
            label={mode === 'split' ? '你的應付金額' : '應付總額'}
            value={`$${perPerson}`}
            strong
            accent
          />

          <Pressable onPress={() => setAgree((v) => !v)} className="flex-row items-center gap-2.5 mt-5">
            <View
              className={`size-[22px] items-center justify-center rounded-[7px] ${
                agree ? 'bg-bmog-ember' : 'border border-bmog-fg-15'
              }`}>
              {agree ? <Icon as={BrandIcons.check} size={14} className="text-bmog-forest" /> : null}
            </View>
            <Text className="flex-1 font-sans text-bmog-fg-62 text-[12.5px] leading-[18px]">
              我已閱讀並同意場地<Text className="font-sans-semibold text-bmog-fg">取消政策</Text>
            </Text>
          </Pressable>
        </ScrollView>

        <SafeAreaView edges={['bottom']} className="border-t border-bmog-fg-15 bg-bmog-mist px-5 pt-3">
          <Pressable
            disabled={!agree}
            onPress={() => router.push({ pathname: '/venue/[venueId]/confirmed', params: { venueId: venue.id } })}
            className={`h-[54px] flex-row items-center justify-center gap-2 rounded-field active:scale-[0.97] ${
              agree ? 'bg-bmog-ember' : 'bg-bmog-fg-15'
            }`}>
            <Icon as={BrandIcons.lock} size={16} className={agree ? 'text-bmog-forest' : 'text-bmog-fg-38'} />
            <Text className={`font-sans-semibold text-[15px] ${agree ? 'text-bmog-forest' : 'text-bmog-fg-38'}`}>
              付款 ${perPerson}
            </Text>
          </Pressable>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}
