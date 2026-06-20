import { router } from 'expo-router';
import { Camera, UserRound } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Field } from '@/components/brand/field';
import { FlowHeader } from '@/components/brand/flow-header';
import { StepBar } from '@/components/brand/step-bar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

/** TODO: wire Supabase profile insert (src/lib/services/) */
async function saveProfile(profile: { name: string; email: string; referralCode: string }) {
  console.warn('saveProfile not wired yet', profile);
}

export default function ProfileScreen() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [referralCode, setReferralCode] = React.useState('');

  const handleContinue = () => {
    saveProfile({ name, email, referralCode });
    router.push('/(auth)/card');
  };

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1">
        <StepBar step={2} total={5} onBack={() => router.back()} />
        <FlowHeader kicker="Step 02 · 個人資料" title="建立檔案" sub="這會顯示在你的預約與評價上。" />

        <View className="px-6">
          <View className="items-center mb-[22px]">
            <View>
              <View className="size-[88px] items-center justify-center rounded-full border border-bmog-fg-15 bg-bmog-sand">
                <Icon as={UserRound} size={38} className="text-bmog-fg-38" />
              </View>
              <Pressable
                className="size-8 items-center justify-center rounded-full border-[3px] border-bmog-mist bg-bmog-ember active:scale-[0.97]"
                style={{ position: 'absolute', right: -2, bottom: -2 }}>
                <Icon as={Camera} size={15} className="text-bmog-forest" />
              </Pressable>
            </View>
          </View>

          <Field label="姓名" icon="user-round" value={name} onChangeText={setName} placeholder="輸入姓名" />
          <Field
            label="電子信箱"
            icon="mail"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Field
            label="推薦碼"
            icon="gift"
            value={referralCode}
            onChangeText={setReferralCode}
            placeholder="輸入好友推薦碼"
            optional
          />
        </View>

        <View className="px-6 pt-3.5">
          <Button variant="brand" size="brand" onPress={handleContinue} disabled={!name.trim()}>
            <Text>繼續 →</Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
