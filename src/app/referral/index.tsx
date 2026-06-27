import { useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/brand/screen-header';
import { Button } from '@/components/ui/button';
import { BrandIcons, type BrandIconName } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import {
  REFERRAL_CODE,
  REFERRAL_FRIENDS_COUNT,
  REFERRAL_MILESTONE_NEXT,
  REFERRAL_POINTS_EARNED,
} from '@/lib/mock/mock-referral';

const SHARE_CHANNELS: { id: string; icon: BrandIconName; label: string }[] = [
  { id: 'link', icon: 'link-2', label: '複製連結' },
  { id: 'line', icon: 'message-square', label: 'LINE' },
  { id: 'ig', icon: 'camera', label: 'Instagram' },
  { id: 'fb', icon: 'users', label: 'Facebook' },
  { id: 'threads', icon: 'send', label: 'Threads' },
];

export default function ReferralHome() {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const pct = Math.min(100, Math.round((REFERRAL_FRIENDS_COUNT / REFERRAL_MILESTONE_NEXT) * 100));

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScreenHeader title="推薦好友" onBack={() => router.back()} />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pb-7">
          <View className="items-center rounded-card bg-bmog-forest p-6 mt-2">
            <View className="size-16 items-center justify-center rounded-full bg-bmog-flash">
              <Icon as={BrandIcons.gift} size={28} className="text-bmog-forest" />
            </View>
            <Text className="font-tc-bold text-bmog-mist text-[19px] mt-4 text-center">
              邀請好友，一起動起來
            </Text>
            <Text
              className="font-sans text-[13px] mt-2 text-center leading-[19px]"
              style={{ color: 'rgba(255,248,242,0.7)' }}>
              好友用你的邀請碼註冊，雙方都能獲得 BMOG 點數
            </Text>
            <View className="flex-row items-center gap-6 mt-4">
              <View className="items-center">
                <Text className="font-display text-bmog-flash text-[22px]">+10</Text>
                <Text className="font-mono text-[9.5px] mt-0.5" style={{ color: 'rgba(255,248,242,0.6)' }}>
                  推薦人獲得
                </Text>
              </View>
              <View className="items-center">
                <Text className="font-display text-bmog-flash text-[22px]">+25</Text>
                <Text className="font-mono text-[9.5px] mt-0.5" style={{ color: 'rgba(255,248,242,0.6)' }}>
                  被推薦人獲得
                </Text>
              </View>
            </View>
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">你的邀請碼</Text>
          <View className="flex-row items-center gap-2.5">
            <Text
              className="flex-1 rounded-tile border border-bmog-fg-15 bg-bmog-sand px-3.5 py-3.5 font-mono text-bmog-forest text-[22px]"
              style={{ letterSpacing: 3 }}>
              {REFERRAL_CODE}
            </Text>
            <Pressable
              onPress={copy}
              className={`flex-row items-center gap-1.5 rounded-tile px-4 py-3.5 active:scale-[0.97] ${
                copied ? 'bg-bmog-flash' : 'bg-bmog-ember'
              }`}>
              <Icon
                as={BrandIcons[copied ? 'check' : 'copy']}
                size={16}
                className="text-bmog-forest"
              />
              <Text className="font-sans-semibold text-bmog-forest text-[14px]">
                {copied ? '已複製' : '複製'}
              </Text>
            </Pressable>
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">分享給好友</Text>
          <View className="flex-row flex-wrap gap-3">
            {SHARE_CHANNELS.map((c) => (
              <Pressable
                key={c.id}
                onPress={c.id === 'link' ? copy : undefined}
                className="items-center gap-1.5"
                style={{ width: '18%' }}>
                <View className="size-12 items-center justify-center rounded-full bg-bmog-sand">
                  <Icon as={BrandIcons[c.icon]} size={19} className="text-bmog-forest" />
                </View>
                <Text className="font-mono text-bmog-fg-38 text-[8.5px]" numberOfLines={1}>
                  {c.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="mt-6 rounded-card border border-bmog-fg-15 bg-bmog-sand p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-sans-semibold text-bmog-fg text-[13px]">
                已邀請 {REFERRAL_FRIENDS_COUNT} 位好友 · 賺 {REFERRAL_POINTS_EARNED} 點
              </Text>
              <Text className="font-mono text-bmog-fg-38 text-[10px]">
                {REFERRAL_FRIENDS_COUNT}/{REFERRAL_MILESTONE_NEXT}
              </Text>
            </View>
            <View className="h-[6px] rounded-full bg-bmog-fg-15">
              <View className="h-[6px] rounded-full bg-bmog-ember" style={{ width: `${pct}%` }} />
            </View>
            <Text className="font-mono text-bmog-fg-38 text-[9.5px] mt-2">
              再邀請 {REFERRAL_MILESTONE_NEXT - REFERRAL_FRIENDS_COUNT} 位好友解鎖里程碑獎勵
            </Text>
          </View>

          <Button
            variant="brand-outline"
            size="brand"
            className="mt-6"
            onPress={() => router.push('/referral/reward-preview')}>
            <Icon as={BrandIcons.bell} size={17} className="text-bmog-forest" />
            <Text className="font-sans-semibold text-bmog-forest text-[15px]">查看獎勵通知預覽</Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
