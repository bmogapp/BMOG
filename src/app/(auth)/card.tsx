import { router } from 'expo-router';
import { Lock } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Field } from '@/components/brand/field';
import { FlowHeader } from '@/components/brand/flow-header';
import { StepBar } from '@/components/brand/step-bar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

/**
 * TODO: replace the manual entry below with the isolated TapPay WebView
 * component (front-end card capture happens inside TapPay's WebView, never
 * in plain app state — see CLAUDE.md's TapPay isolation rule).
 */
async function onBindCard() {
  console.warn('onBindCard not wired yet — needs TapPay WebView integration');
}

export default function CardScreen() {
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvv, setCvv] = React.useState('');

  const handleBind = () => {
    onBindCard();
    router.push('/(auth)/membership');
  };

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1">
        <StepBar step={3} total={5} onBack={() => router.back()} />
        <FlowHeader kicker="Step 03 · 付款方式" title="綁定信用卡" />

        <View className="px-6">
          <View className="gap-2.5 mb-[18px]">
            <Pressable className="h-[54px] flex-row items-center justify-center gap-2.5 rounded-field bg-bmog-forest active:scale-[0.97]">
              <Text className="font-display text-bmog-mist text-[17px]" style={{ letterSpacing: -0.2 }}>
                Apple Pay
              </Text>
              <Text className="font-sans-semibold text-bmog-mist text-[16px]">訂閱</Text>
            </Pressable>
            <Pressable className="h-[54px] flex-row items-center justify-center gap-2.5 rounded-field border border-bmog-fg-15 bg-bmog-mist active:scale-[0.97]">
              <Text className="font-display text-bmog-fg text-[17px]" style={{ letterSpacing: -0.2 }}>
                Google Pay
              </Text>
              <Text className="font-sans-semibold text-bmog-fg text-[16px]">訂閱</Text>
            </Pressable>
          </View>

          <View className="flex-row items-center gap-3 mb-[18px]">
            <View className="h-px flex-1 bg-bmog-fg-15" />
            <Text className="font-mono text-bmog-fg-38 text-[10.5px]" style={{ letterSpacing: 1 }}>
              或手動輸入卡號
            </Text>
            <View className="h-px flex-1 bg-bmog-fg-15" />
          </View>

          <Field
            label="卡號"
            icon="credit-card"
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="4242 4242 4242 4242"
            keyboardType="number-pad"
          />
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Field label="到期" value={expiry} onChangeText={setExpiry} placeholder="MM / YY" />
            </View>
            <View className="flex-1">
              <Field
                label="安全碼"
                value={cvv}
                onChangeText={setCvv}
                placeholder="•••"
                secureTextEntry
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View className="flex-row items-center justify-center gap-2 mt-1.5">
            <Icon as={Lock} size={14} className="text-bmog-sky" />
            <Text className="text-bmog-fg-38 text-[12.5px]">
              由 TapPay 第三方金流加密，BMOG 不儲存卡號。
            </Text>
          </View>
        </View>

        <View className="px-6 pt-3.5">
          <Button variant="brand" size="brand" onPress={handleBind}>
            <Text>安全綁定 →</Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
