import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomSheet } from '@/components/brand/bottom-sheet';
import { PhotoPlaceholder } from '@/components/brand/photo-placeholder';
import { RichText } from '@/components/brand/rich-text';
import { Button } from '@/components/ui/button';
import { BrandIcons, type BrandIconName } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { EVENTS, NOTIFY_CHANNELS, WAITLIST_TICKETS } from '@/lib/mock/mock-events';

function HeroBtn({ onPress, icon }: { onPress?: () => void; icon: BrandIconName }) {
  return (
    <Pressable
      onPress={onPress}
      className="size-10 items-center justify-center rounded-full active:scale-90"
      style={{ backgroundColor: 'rgba(255,248,242,0.85)' }}>
      <Icon as={BrandIcons[icon]} size={18} className="text-bmog-forest" />
    </Pressable>
  );
}

function WaitlistSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [step, setStep] = React.useState<'pick' | 'notify' | 'done'>('pick');
  const [ticket, setTicket] = React.useState(WAITLIST_TICKETS[0].id);
  const [channels, setChannels] = React.useState<Set<string>>(new Set(['push']));

  const close = () => {
    onClose();
    setStep('pick');
  };

  const toggleChannel = (id: string, system?: boolean) => {
    if (system) return;
    setChannels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <BottomSheet visible={visible} onClose={close}>
      <View className="px-6 pb-8 pt-1">
        {step === 'pick' ? (
          <>
            <Text className="font-tc-bold text-bmog-fg text-[17px]">活動已滿</Text>
            <Text className="font-sans text-bmog-fg-62 text-[13px] mt-1.5 mb-5">
              選擇候補方案，有名額釋出時將立即通知你
            </Text>
            <View className="gap-2.5">
              {WAITLIST_TICKETS.map((t) => {
                const active = t.id === ticket;
                return (
                  <Pressable
                    key={t.id}
                    onPress={() => setTicket(t.id)}
                    className={`flex-row items-center gap-3 rounded-tile border p-3.5 ${
                      active ? 'border-bmog-ember bg-bmog-ember-100' : 'border-bmog-fg-15'
                    }`}>
                    <View
                      className={`size-5 items-center justify-center rounded-full border ${
                        active ? 'border-bmog-ember bg-bmog-ember' : 'border-bmog-fg-15'
                      }`}>
                      {active ? <View className="size-2 rounded-full bg-bmog-mist" /> : null}
                    </View>
                    <View className="flex-1">
                      <Text className="font-sans-semibold text-bmog-fg text-[13.5px]">{t.name}</Text>
                      <Text className="font-mono text-bmog-fg-38 text-[10px] mt-0.5">{t.sub}</Text>
                    </View>
                    <Text className="font-mono-bold text-bmog-ember text-[14px]">${t.price}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Button variant="brand" size="brand" className="mt-6" onPress={() => setStep('notify')}>
              <Text className="font-sans-semibold text-bmog-forest text-[15px]">下一步</Text>
            </Button>
          </>
        ) : null}

        {step === 'notify' ? (
          <>
            <Text className="font-tc-bold text-bmog-fg text-[17px]">通知方式</Text>
            <Text className="font-sans text-bmog-fg-62 text-[13px] mt-1.5 mb-5">
              候補成功時，我們會透過以下方式通知你
            </Text>
            <View className="gap-2.5">
              {NOTIFY_CHANNELS.map((c) => {
                const active = channels.has(c.id);
                return (
                  <Pressable
                    key={c.id}
                    onPress={() => toggleChannel(c.id, c.system)}
                    className={`flex-row items-center gap-3 rounded-tile border p-3.5 ${
                      active ? 'border-bmog-sky bg-bmog-sky-100' : 'border-bmog-fg-15'
                    }`}>
                    <Icon as={BrandIcons[c.icon]} size={18} className="text-bmog-forest" />
                    <View className="flex-1">
                      <Text className="font-sans-semibold text-bmog-fg text-[13.5px]">{c.label}</Text>
                      <Text className="font-mono text-bmog-fg-38 text-[10px] mt-0.5">{c.sub}</Text>
                    </View>
                    <View
                      className={`size-[20px] items-center justify-center rounded-[6px] ${
                        active ? 'bg-bmog-sky' : 'border border-bmog-fg-15'
                      }`}>
                      {active ? <Icon as={BrandIcons.check} size={13} className="text-bmog-mist" /> : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
            <Button variant="brand" size="brand" className="mt-6" onPress={() => setStep('done')}>
              <Text className="font-sans-semibold text-bmog-forest text-[15px]">加入候補名單</Text>
            </Button>
          </>
        ) : null}

        {step === 'done' ? (
          <View className="items-center py-4">
            <View className="size-16 items-center justify-center rounded-full bg-bmog-forest">
              <Icon as={BrandIcons['check-circle-2']} size={30} className="text-bmog-flash" />
            </View>
            <Text className="font-tc-bold text-bmog-fg text-[17px] mt-4">已加入候補名單</Text>
            <Text className="font-sans text-bmog-fg-62 text-[13px] mt-1.5 text-center leading-[19px]">
              有名額釋出時，我們會立即透過所選方式通知你
            </Text>
            <Button variant="brand" size="brand" className="mt-6 w-full" onPress={close}>
              <Text className="font-sans-semibold text-bmog-forest text-[15px]">完成</Text>
            </Button>
          </View>
        ) : null}
      </View>
    </BottomSheet>
  );
}

export default function EventDetailRich() {
  const router = useRouter();
  const { venueId, eventId } = useLocalSearchParams<{ venueId: string; eventId: string }>();
  const event = EVENTS.find((e) => e.id === eventId) ?? EVENTS[0];
  const [waitlistOpen, setWaitlistOpen] = React.useState(false);
  const full = event.going >= event.cap;
  const pct = Math.min(100, Math.round((event.going / event.cap) * 100));

  return (
    <View className="flex-1 bg-bmog-mist">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="pb-7">
        <View style={{ position: 'relative', height: 236 }}>
          <PhotoPlaceholder icon="swords" />
          <SafeAreaView edges={['top']} className="absolute inset-x-0 top-0">
            <View className="flex-row items-center justify-between px-4 pt-2">
              <HeroBtn icon="chevron-left" onPress={() => router.back()} />
              <HeroBtn icon="share-2" />
            </View>
          </SafeAreaView>
        </View>

        <View className="px-5 pt-4">
          <Text className="font-mono text-bmog-ember text-[11px]" style={{ letterSpacing: 0.6 }}>
            {event.kicker}
          </Text>
          <Text className="font-tc-bold text-bmog-fg text-[22px] mt-1.5">{event.title}</Text>
          <Text className="font-mono text-bmog-fg-38 text-[10.5px] mt-1">{event.en}</Text>

          <View className="mt-5 gap-2.5">
            <View className="flex-row items-center gap-3">
              <Icon as={BrandIcons.calendar} size={16} className="text-bmog-fg-62" />
              <Text className="font-sans text-bmog-fg text-[13px]">
                {event.date} · {event.time}
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Icon as={BrandIcons['map-pin']} size={16} className="text-bmog-fg-62" />
              <Text className="font-sans text-bmog-fg text-[13px]">
                {event.place} · {event.placeSub}
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Icon as={BrandIcons.users} size={16} className="text-bmog-fg-62" />
              <Text className="font-sans text-bmog-fg text-[13px]">主辦：{event.host}</Text>
            </View>
          </View>

          <View className="mt-4 rounded-card border border-bmog-fg-15 bg-bmog-sand p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-sans-semibold text-bmog-fg text-[13px]">
                {event.going}/{event.cap} 人已報名
              </Text>
              <Text
                className={`font-mono text-[10px] ${full ? 'text-bmog-ember' : 'text-bmog-fg-38'}`}
                style={{ letterSpacing: 0.5 }}>
                {full ? '名額已滿' : `剩餘 ${event.cap - event.going} 位`}
              </Text>
            </View>
            <View className="h-[6px] rounded-full bg-bmog-fg-15">
              <View
                className={`h-[6px] rounded-full ${full ? 'bg-bmog-ember' : 'bg-bmog-forest'}`}
                style={{ width: `${pct}%` }}
              />
            </View>
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">活動介紹</Text>
          <RichText paragraphs={event.desc} />

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">活動流程</Text>
          <View className="gap-3">
            {event.agenda.map((a, i) => (
              <View key={i} className="flex-row items-center gap-3">
                <Text className="font-mono-bold text-bmog-forest text-[12px] w-12">{a.time}</Text>
                <View className="flex-1 flex-row items-center gap-2 border-b border-bmog-fg-15 pb-2.5">
                  <Text className="flex-1 font-sans text-bmog-fg text-[13px]">{a.label}</Text>
                  {a.sub ? <Text className="font-mono text-bmog-fg-38 text-[10px]">{a.sub}</Text> : null}
                </View>
              </View>
            ))}
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">活動包含</Text>
          <View className="flex-row flex-wrap gap-2">
            {event.includes.map((inc, i) => (
              <View
                key={i}
                className="flex-row items-center gap-1.5 rounded-full border border-bmog-fg-15 px-3 py-1.5">
                <Icon as={BrandIcons[inc.icon]} size={13} className="text-bmog-forest" />
                <Text className="font-mono text-bmog-fg-62 text-[10px]">{inc.label}</Text>
              </View>
            ))}
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">注意事項</Text>
          <View className="gap-2">
            {event.notes.map((n, i) => (
              <View key={i} className="flex-row items-start gap-2.5">
                <View className="size-1.5 rounded-full bg-bmog-fg-38 mt-1.5" />
                <Text className="flex-1 font-sans text-bmog-fg-62 text-[12.5px] leading-[18px]">{n}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <SafeAreaView
        edges={['bottom']}
        className="flex-row items-center gap-3.5 border-t border-bmog-fg-15 bg-bmog-mist px-5 pt-3">
        <View>
          <Text className="font-display text-bmog-ember text-[20px]">${event.price}</Text>
          <Text className="font-mono text-bmog-fg-38 text-[9px]">每人</Text>
        </View>
        <Button
          variant="brand"
          size="brand"
          className="flex-1"
          onPress={() =>
            full
              ? setWaitlistOpen(true)
              : router.push({
                  pathname: '/venue/[venueId]/event/[eventId]/register',
                  params: { venueId, eventId: event.id },
                })
          }>
          <Icon
            as={BrandIcons[full ? 'users' : 'check-circle-2']}
            size={18}
            className="text-bmog-forest"
          />
          <Text className="font-sans-semibold text-bmog-forest text-[16px]">
            {full ? '加入候補名單' : '立即報名'}
          </Text>
        </Button>
      </SafeAreaView>

      <WaitlistSheet visible={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </View>
  );
}
