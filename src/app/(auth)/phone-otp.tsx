import { router } from 'expo-router';
import { Check, ChevronDown, MessageSquare } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FlowHeader } from '@/components/brand/flow-header';
import { StepBar } from '@/components/brand/step-bar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 54;

/** TODO: wire Firebase Auth phone-number sign-in (send code) */
async function sendOtp(phoneNumber: string) {
  console.warn('sendOtp not wired yet', phoneNumber);
}

/** TODO: wire Firebase Auth phone-number sign-in (verify code) */
async function verifyOtp(code: string) {
  console.warn('verifyOtp not wired yet', code);
}

export default function PhoneOtpScreen() {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [digits, setDigits] = React.useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [countdown, setCountdown] = React.useState(0);
  const otpRefs = React.useRef<(TextInput | null)[]>([]);

  React.useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const handleSend = () => {
    if (phoneNumber.trim().length < 9) return;
    sendOtp(phoneNumber);
    setSent(true);
    setCountdown(RESEND_SECONDS);
  };

  const handleDigitChange = (index: number, value: string) => {
    const next = [...digits];
    next[index] = value.slice(-1);
    setDigits(next);
    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleDigitKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const code = digits.join('');
  const codeComplete = code.length === OTP_LENGTH;

  const handlePrimary = () => {
    if (!sent) {
      handleSend();
      return;
    }
    if (!codeComplete) return;
    verifyOtp(code);
    router.push('/(auth)/profile');
  };

  const mm = String(Math.floor(countdown / 60)).padStart(2, '0');
  const ss = String(countdown % 60).padStart(2, '0');

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1">
        <StepBar step={1} total={5} onBack={() => router.back()} />
        <FlowHeader kicker="Step 01 · 註冊" title="驗證手機號碼" sub="輸入手機並收取 6 位數驗證碼，確認是你本人。" />

        <View className="px-6">
          {/* phone */}
          <View className="flex-row justify-between mb-2">
            <Text
              className="font-mono text-bmog-fg-38 text-[10.5px]"
              style={{ letterSpacing: 1, textTransform: 'uppercase' }}>
              手機號碼
            </Text>
            {sent ? (
              <View className="flex-row items-center gap-1">
                <Icon as={Check} size={12} className="text-bmog-sky" />
                <Text
                  className="font-mono text-bmog-sky text-[10.5px]"
                  style={{ letterSpacing: 0.4 }}>
                  已發送
                </Text>
              </View>
            ) : null}
          </View>
          <View
            className={`mb-4 h-[54px] flex-row items-center overflow-hidden rounded-field bg-bmog-mist ${
              sent ? 'border border-bmog-fg-15' : 'border-[1.5px] border-bmog-sky'
            }`}>
            <Pressable className="h-full flex-row items-center gap-1.5 border-r border-bmog-fg-15 px-3.5">
              <Text className="font-mono text-bmog-fg-38 text-[10.5px]" style={{ letterSpacing: 0.5 }}>
                TW
              </Text>
              <Text className="font-mono text-bmog-fg text-[15px]">+886</Text>
              <Icon as={ChevronDown} size={15} className="text-bmog-fg-38" />
            </Pressable>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              editable={!sent}
              placeholder="912 345 678"
              placeholderTextColor="rgba(30,45,33,0.38)"
              keyboardType="phone-pad"
              className="flex-1 font-sans text-bmog-fg text-[15.5px] px-3.5"
            />
          </View>

          {/* otp */}
          <View className={sent ? 'opacity-100' : 'opacity-40'} pointerEvents={sent ? 'auto' : 'none'}>
            <View className="flex-row justify-between mb-2">
              <Text
                className="font-mono text-bmog-fg-38 text-[10.5px]"
                style={{ letterSpacing: 1, textTransform: 'uppercase' }}>
                驗證碼
              </Text>
            </View>
            <View className="flex-row gap-2.5 mb-3">
              {digits.map((d, i) => (
                <TextInput
                  key={i}
                  ref={(el) => {
                    otpRefs.current[i] = el;
                  }}
                  value={d}
                  onChangeText={(v) => handleDigitChange(i, v)}
                  onKeyPress={(e) => handleDigitKeyPress(i, e.nativeEvent.key)}
                  editable={sent}
                  maxLength={1}
                  keyboardType="number-pad"
                  textAlign="center"
                  className="h-14 flex-1 rounded-[12px] border border-bmog-fg-15 bg-bmog-mist font-mono text-bmog-fg text-2xl"
                />
              ))}
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-1.5">
                <Icon as={MessageSquare} size={14} className="text-bmog-sky" />
                <Text className="text-bmog-fg-62 text-[13px]">簡訊已發送至上方號碼</Text>
              </View>
              <Text className="font-mono text-bmog-fg-38 text-[12px]" style={{ letterSpacing: 0.4 }}>
                {countdown > 0 ? `重送 ${mm}:${ss}` : '重新發送'}
              </Text>
            </View>
          </View>
        </View>

        <View className="px-6 pt-5">
          <Button
            variant="brand"
            size="brand"
            onPress={handlePrimary}
            disabled={sent ? !codeComplete : phoneNumber.trim().length < 9}>
            <Text>{sent ? '完成驗證 →' : '發送驗證碼 →'}</Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
