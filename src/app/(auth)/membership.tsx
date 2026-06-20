import { router } from 'expo-router';
import { Check } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FlowHeader } from '@/components/brand/flow-header';
import { StepBar } from '@/components/brand/step-bar';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

/** TODO: wire Supabase membership subscription + points wallet top-up */
async function onFinishOnboarding() {
  console.warn('onFinishOnboarding not wired yet');
}

type Plan = {
  id: string;
  name: string;
  tc: string;
  price: string;
  unit: string;
  intro: string;
  feats: string[];
  cta: string;
  hot?: boolean;
};

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tc: '免費',
    price: 'NT$0',
    unit: '',
    intro: '隨用隨付，零負擔入門。',
    feats: ['場地・活動隨用隨付', '標準預約時段', '無綁約・無月費'],
    cta: '免費開始',
  },
  {
    id: 'mover',
    name: 'Mover',
    tc: '動者',
    price: 'NT$599',
    unit: '/月',
    intro: '規律運動者的甜蜜點。',
    feats: ['每月 600 點數', '課程 8 折', '優先候補', '免費改期 1 次/月'],
    cta: '訂閱 Mover',
  },
  {
    id: 'mogger',
    name: 'Mogger',
    tc: '莫格',
    price: 'NT$1,099',
    unit: '/月',
    intro: '全力以赴者的極致禮遇。',
    feats: ['每月 1,200 點數', '課程 7 折', '免費改期', '專屬會員活動', '生日好禮'],
    cta: '訂閱 Mogger',
    hot: true,
  },
];

function PlanCard({ plan, onChoose }: { plan: Plan; onChoose: () => void }) {
  const on = !!plan.hot;
  return (
    <View
      className={`w-[262px] rounded-card p-[18px] ${
        on ? 'bg-bmog-forest' : 'border border-bmog-fg-15 bg-bmog-mist'
      }`}>
      {plan.hot ? (
        <View className="absolute -top-[9px] left-[18px] rounded-full bg-bmog-flash px-2.5 py-1">
          <Text className="font-mono text-bmog-forest text-[9.5px]" style={{ letterSpacing: 1 }}>
            最划算
          </Text>
        </View>
      ) : null}

      <View className="flex-row items-baseline gap-2">
        <Text
          className={`font-display text-[24px] ${on ? 'text-bmog-mist' : 'text-bmog-fg'}`}
          style={{ textTransform: 'uppercase', letterSpacing: -0.2 }}>
          {plan.name}
        </Text>
        <Text className={`font-tc text-[14px] ${on ? 'text-bmog-on-dark-70' : 'text-bmog-fg-62'}`}>
          {plan.tc}
        </Text>
      </View>

      <View className="flex-row items-baseline gap-1 mt-2">
        <Text className={`font-mono-bold text-[26px] ${on ? 'text-bmog-flash' : 'text-bmog-ember'}`}>
          {plan.price}
        </Text>
        {plan.unit ? (
          <Text className={`font-mono text-[12px] ${on ? 'text-bmog-on-dark-55' : 'text-bmog-fg-38'}`}>
            {plan.unit}
          </Text>
        ) : null}
      </View>

      <Text className={`font-tc text-[13.5px] leading-[19.5px] mt-2 ${on ? 'text-bmog-on-dark-70' : 'text-bmog-fg-62'}`}>
        {plan.intro}
      </Text>

      <View className={`h-px my-3.5 ${on ? 'bg-bmog-on-dark-18' : 'bg-bmog-fg-15'}`} />

      <View className="gap-2.5">
        {plan.feats.map((f) => (
          <View key={f} className="flex-row items-start gap-2">
            <Icon
              as={Check}
              size={15}
              className={`mt-0.5 ${on ? 'text-bmog-flash' : 'text-bmog-sky'}`}
            />
            <Text className={`flex-1 text-[13px] leading-[17px] ${on ? 'text-bmog-mist' : 'text-bmog-fg'}`}>
              {f}
            </Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={onChoose}
        className={`mt-4 h-12 items-center justify-center rounded-tile active:scale-[0.97] ${
          on ? 'bg-bmog-ember' : 'border-[1.5px] border-bmog-forest'
        }`}>
        <Text className="font-sans-semibold text-bmog-forest text-[15px]">{plan.cta}</Text>
      </Pressable>

      <Text className={`text-[9.5px] leading-[14px] mt-2.5 ${on ? 'text-bmog-on-dark-55' : 'text-bmog-fg-38'}`}>
        {plan.id === 'free'
          ? '永久免費，隨時可升級為付費方案。'
          : `適用促銷條款。促銷價格適用為一個月。自 2026/07/01 開始，BMOG 將以每個月 ${plan.price} 繼續。可隨時取消。`}
      </Text>
    </View>
  );
}

export default function MembershipScreen() {
  const handleFinish = () => {
    onFinishOnboarding();
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1">
        <StepBar step={4} total={5} onBack={() => router.back()} />
        <FlowHeader kicker="Step 04 · 會員（選填）" title="選一個方案" sub="左右滑動比較方案，隨時可改或取消。" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-3.5 px-6"
          decelerationRate="fast">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onChoose={handleFinish} />
          ))}
        </ScrollView>

        <View className="flex-row justify-center gap-1.5 mt-3">
          {PLANS.map((plan, i) => (
            <View
              key={plan.id}
              className={`h-1.5 rounded-full ${i === 1 ? 'w-5 bg-bmog-ember' : 'w-1.5 bg-bmog-fg-15'}`}
            />
          ))}
        </View>

        <Pressable onPress={handleFinish} className="px-6 pt-3.5 items-center">
          <Text className="text-bmog-fg-62 text-[14px]">
            先跳過，<Text className="font-sans-bold text-bmog-forest text-[14px]">稍後再說</Text>
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
