import * as React from 'react';
import { Dimensions, type NativeScrollEvent, type NativeSyntheticEvent, Pressable, ScrollView, View } from 'react-native';

import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

type PromoSlide = {
  kicker: string;
  title: string;
  sub: string;
  bg: string;
  fg: string;
  accent: string;
};

const PROMO_SLIDES: PromoSlide[] = [
  { kicker: '限時優惠', title: '首訂會員 5 折', sub: '新朋友首月加碼送 100 點', bg: '#1E2D21', fg: '#FFF8F2', accent: '#FFD23F' },
  { kicker: '夏季企劃', title: '泰拳體驗週', sub: '指定教室 1 點開課', bg: '#FF7A2E', fg: '#1E2D21', accent: '#1E2D21' },
  { kicker: '好友同行', title: '揪團再 9 折', sub: '三人同訂場地享折扣', bg: '#3A8CBD', fg: '#FFF8F2', accent: '#FFD23F' },
];

const SLIDE_COUNT = PROMO_SLIDES.length + 1; // + the invite-code slide
const AUTOPLAY_MS = 3200;

function InviteSlide({ width }: { width: number }) {
  return (
    <View
      style={{ width }}
      className="h-32 justify-between rounded-[18px] border border-dashed border-bmog-ember bg-bmog-sand p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <Icon as={BrandIcons.gift} size={17} className="text-bmog-ember" />
          <Text className="font-tc-bold text-bmog-fg text-[14px]">邀請好友一起動</Text>
        </View>
        <Text className="font-tc text-bmog-fg-62 text-[11.5px]">
          <Text className="font-mono-bold text-bmog-ember">+10</Text> 推薦人 ·
          <Text className="font-mono-bold text-bmog-ember"> +25</Text> 被推薦人
        </Text>
      </View>
      <View className="flex-row items-center gap-2.5">
        <Text
          className="flex-1 rounded-tile border border-bmog-fg-15 bg-bmog-mist px-3.5 py-3 font-mono text-bmog-forest text-[21px]"
          style={{ letterSpacing: 3 }}>
          MOG-K2F9
        </Text>
        <Pressable className="flex-row items-center gap-1.5 rounded-tile bg-bmog-ember px-4 py-3.5">
          <Icon as={BrandIcons.copy} size={16} className="text-bmog-forest" />
          <Text className="font-sans-semibold text-bmog-forest text-[14px]">複製</Text>
        </Pressable>
      </View>
    </View>
  );
}

function PromoSlideCard({ slide, width }: { slide: PromoSlide; width: number }) {
  return (
    <View
      style={{ width, backgroundColor: slide.bg }}
      className="h-32 justify-center overflow-hidden rounded-[18px] p-5">
      <Text className="font-mono text-[10.5px]" style={{ color: slide.accent, letterSpacing: 2 }}>
        {slide.kicker}
      </Text>
      <Text
        className="font-display text-[26px] leading-[25px] mt-2"
        style={{ color: slide.fg, letterSpacing: -0.2 }}>
        {slide.title}
      </Text>
      <Text className="font-tc text-[13px] mt-2" style={{ color: slide.fg, opacity: 0.86 }}>
        {slide.sub}
      </Text>
    </View>
  );
}

export function AdCarousel() {
  const scrollRef = React.useRef<ScrollView>(null);
  const [index, setIndex] = React.useState(0);
  const [trackWidth, setTrackWidth] = React.useState(Dimensions.get('window').width - 36);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % SLIDE_COUNT;
        scrollRef.current?.scrollTo({ x: next * trackWidth, animated: true });
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [trackWidth]);

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (trackWidth <= 0) return;
    setIndex(Math.round(e.nativeEvent.contentOffset.x / trackWidth));
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
        onMomentumScrollEnd={handleMomentumScrollEnd}>
        <InviteSlide width={trackWidth} />
        {PROMO_SLIDES.map((slide, i) => (
          <PromoSlideCard key={i} slide={slide} width={trackWidth} />
        ))}
      </ScrollView>
      <View className="mt-2.5 flex-row justify-center gap-1.5">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <View
            key={i}
            className={`h-1.5 rounded-full ${i === index ? 'w-[18px] bg-bmog-ember' : 'w-1.5 bg-bmog-fg-15'}`}
          />
        ))}
      </View>
    </View>
  );
}
