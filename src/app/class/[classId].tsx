import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Modal, NativeSyntheticEvent, NativeScrollEvent, Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Facilities } from '@/components/brand/facilities-grid';
import { HeartButton } from '@/components/brand/heart-button';
import { HeartSheet } from '@/components/brand/heart-sheet';
import { MapDistance } from '@/components/brand/map-distance';
import { PhotoPlaceholder } from '@/components/brand/photo-placeholder';
import { Button } from '@/components/ui/button';
import { BrandIcons, type BrandIconName } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { getCourseDetail, STUDIOS } from '@/lib/mock/mock-studios';

const TONE_BAR: Record<'sky' | 'flash' | 'ember', string> = {
  sky: 'bg-bmog-sky',
  flash: 'bg-bmog-flash',
  ember: 'bg-bmog-ember',
};

function StatCard({ icon, value, label }: { icon: BrandIconName; value: string; label: string }) {
  return (
    <View className="flex-1 items-center gap-1.5 rounded-tile border border-bmog-fg-15 bg-bmog-sand py-3">
      <Icon as={BrandIcons[icon]} size={17} className="text-bmog-ember" />
      <Text className="font-sans-semibold text-bmog-fg text-[13px]">{value}</Text>
      <Text className="font-mono text-bmog-fg-38 text-[9px]" style={{ letterSpacing: 0.4 }}>
        {label}
      </Text>
    </View>
  );
}

function BookingDoneModal({
  visible,
  onClose,
  onViewBooking,
  classId,
}: {
  visible: boolean;
  onClose: () => void;
  onViewBooking: () => void;
  classId: string;
}) {
  const detail = getCourseDetail(classId);
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center px-6" style={{ backgroundColor: 'rgba(30,45,33,0.5)' }}>
        <View className="w-full rounded-card bg-bmog-mist p-6">
          <View className="self-center size-14 items-center justify-center rounded-full bg-bmog-ember">
            <Icon as={BrandIcons.check} size={28} className="text-bmog-forest" />
          </View>
          <Text
            className="font-display text-bmog-fg text-[24px] text-center mt-4"
            style={{ textTransform: 'uppercase', letterSpacing: -0.2 }}>
            預約完成
          </Text>
          <Text className="font-sans text-bmog-fg-62 text-[13px] text-center mt-2 leading-[19px]">
            已為你保留名額，記得準時到場上課！
          </Text>

          <View className="mt-5 rounded-tile bg-bmog-forest p-4">
            <View className="flex-row items-center gap-2.5">
              <Icon as={BrandIcons['calendar-check']} size={16} className="text-bmog-flash" />
              <Text className="font-sans-semibold text-bmog-mist text-[13px]">
                6/20（六） {detail.time} · {detail.dur}
              </Text>
            </View>
            <View
              className="my-3"
              style={{ height: 1, borderStyle: 'dashed', borderWidth: 1, borderColor: 'rgba(255,248,242,0.18)' }}
            />
            <View className="flex-row justify-between">
              <Text className="font-mono text-[11px]" style={{ color: 'rgba(255,248,242,0.7)' }}>
                扣抵點數
              </Text>
              <Text className="font-mono-bold text-bmog-flash text-[13px]">-{detail.pts} 點</Text>
            </View>
            <View className="flex-row justify-between mt-1.5">
              <Text className="font-mono text-[11px]" style={{ color: 'rgba(255,248,242,0.7)' }}>
                剩餘點數
              </Text>
              <Text className="font-mono-bold text-bmog-mist text-[13px]">
                {detail.pointsBalance - detail.pts} 點
              </Text>
            </View>
          </View>

          <Text className="font-mono text-bmog-fg-38 text-[10px] text-center mt-3">
            已自動加入你的行事曆
          </Text>

          <View className="mt-5 gap-2.5">
            <Button variant="brand" size="brand" onPress={onClose}>
              <Text className="font-sans-semibold text-bmog-forest text-[16px]">完成</Text>
            </Button>
            <Pressable onPress={onViewBooking} className="items-center py-2">
              <Text className="font-sans-semibold text-bmog-sky text-[13.5px]">查看我的預約</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function CourseDetailRich() {
  const router = useRouter();
  const { classId } = useLocalSearchParams<{ classId: string }>();
  const detail = getCourseDetail(classId);
  const studio = STUDIOS.find((s) => s.id === detail.studioId) ?? STUDIOS[0];
  const { width } = useWindowDimensions();
  const [saved, setSaved] = React.useState(false);
  const [heartOpen, setHeartOpen] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const [imgIndex, setImgIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setImgIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <View className="flex-1 bg-bmog-mist">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="pb-7">
        <View className="relative" style={{ height: 280 }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onScroll}>
            {Array.from({ length: detail.imageCount }).map((_, i) => (
              <View key={i} style={{ width, height: 280 }}>
                <PhotoPlaceholder icon="dumbbell" />
              </View>
            ))}
          </ScrollView>
          <SafeAreaView edges={['top']} className="absolute inset-x-0 top-0">
            <View className="flex-row items-center justify-between px-4 pt-2">
              <Pressable
                onPress={() => router.back()}
                className="size-10 items-center justify-center rounded-full active:scale-90"
                style={{ backgroundColor: 'rgba(255,248,242,0.85)' }}>
                <Icon as={BrandIcons['chevron-left']} size={18} className="text-bmog-forest" />
              </Pressable>
              <HeartButton active={saved} onToggle={() => setHeartOpen(true)} />
            </View>
          </SafeAreaView>
          <View
            className="flex-row items-center justify-center gap-1.5"
            style={{ position: 'absolute', bottom: 12, left: 0, right: 0 }}>
            {Array.from({ length: detail.imageCount }).map((_, i) => (
              <View
                key={i}
                className={`h-1.5 rounded-full ${i === imgIndex ? 'w-[18px] bg-bmog-ember' : 'w-1.5 bg-bmog-mist'}`}
              />
            ))}
          </View>
          <View
            className="rounded-full bg-bmog-fg px-2.5 py-1"
            style={{ position: 'absolute', bottom: 12, right: 12 }}>
            <Text className="font-mono text-bmog-mist text-[10px]">
              {imgIndex + 1} / {detail.imageCount}
            </Text>
          </View>
        </View>

        <View className="px-5 pt-4">
          <Text className="font-mono text-bmog-ember text-[11px]" style={{ letterSpacing: 0.6 }}>
            {studio.sport.toUpperCase()} · {studio.name}
          </Text>
          <Text className="font-tc-bold text-bmog-fg text-[21px] mt-1.5">{detail.name}</Text>

          <View className="flex-row items-center gap-3 mt-3.5 rounded-tile border border-bmog-fg-15 bg-bmog-mist p-3">
            <View className="size-10 items-center justify-center rounded-full bg-bmog-ember">
              <Text className="font-tc-bold text-bmog-forest text-[14px]">{detail.coach[0]}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-sans-semibold text-bmog-fg text-[14px]">{detail.coach}</Text>
              <Text className="font-mono text-bmog-fg-38 text-[10px] mt-0.5">
                ★ {detail.coachRating} · 已帶 {detail.coachClasses} 堂
              </Text>
            </View>
            <Button variant="brand-outline" size="sm">
              <Text className="font-sans-semibold text-bmog-forest text-[12px]">追蹤</Text>
            </Button>
          </View>

          <View className="flex-row gap-2.5 mt-4">
            <StatCard icon="clock" value={detail.dur} label="時長" />
            <StatCard icon="flame" value={detail.level} label="強度" />
            <StatCard icon="zap" value={`${detail.pts}`} label="點數" />
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-2.5">關於課程</Text>
          <Text className="font-sans text-bmog-fg-62 text-[13.5px] leading-[20px]">{detail.about}</Text>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-2.5">注意事項</Text>
          <View className="gap-2">
            {detail.notes.map((n, i) => (
              <View key={i} className="flex-row items-start gap-2">
                <View className="size-[5px] rounded-full bg-bmog-fg-38 mt-2" />
                <Text className="flex-1 font-sans text-bmog-fg-62 text-[13px] leading-[19px]">{n}</Text>
              </View>
            ))}
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-2.5">教室位置</Text>
          <MapDistance address={studio.addr} walkTime={studio.walk} />

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-2.5">附加設施</Text>
          <Facilities items={studio.facilities} />

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-2.5">取消政策</Text>
          <View className="gap-2.5">
            {detail.cancelPolicy.map((p, i) => (
              <View key={i} className="flex-row gap-3 rounded-tile bg-bmog-sand p-3.5">
                <View className={`w-1 rounded-full ${TONE_BAR[p.tone]}`} />
                <View className="flex-1">
                  <Text className="font-sans-semibold text-bmog-fg text-[13px]">{p.title}</Text>
                  <Text className="font-sans text-bmog-fg-62 text-[12px] mt-0.5">{p.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable
            onPress={() => setAgree((v) => !v)}
            className="flex-row items-center gap-2.5 mt-5">
            <View
              className={`size-[22px] items-center justify-center rounded-[7px] ${
                agree ? 'bg-bmog-ember' : 'border border-bmog-fg-15'
              }`}>
              {agree ? <Icon as={BrandIcons.check} size={14} className="text-bmog-forest" /> : null}
            </View>
            <Text className="flex-1 font-sans text-bmog-fg-62 text-[12.5px] leading-[18px]">
              我已閱讀並同意本課程的<Text className="font-sans-semibold text-bmog-fg">取消政策</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <SafeAreaView
        edges={['bottom']}
        className="flex-row items-center gap-3.5 border-t border-bmog-fg-15 bg-bmog-mist px-5 pt-3">
        <View>
          <Text className="font-display text-bmog-ember text-[22px]">{detail.pts}</Text>
          <Text className="font-mono text-bmog-fg-38 text-[9.5px]">點 · 餘額 {detail.pointsBalance}</Text>
        </View>
        <Pressable
          disabled={!agree}
          onPress={() => setModalVisible(true)}
          className={`flex-1 h-[54px] flex-row items-center justify-center gap-2 rounded-field active:scale-[0.97] ${
            agree ? 'bg-bmog-ember' : 'bg-bmog-fg-15'
          }`}>
          <Icon as={BrandIcons[agree ? 'check-circle-2' : 'lock']} size={17} className={agree ? 'text-bmog-forest' : 'text-bmog-fg-38'} />
          <Text className={`font-sans-semibold text-[15px] ${agree ? 'text-bmog-forest' : 'text-bmog-fg-38'}`}>
            確認預約・扣 {detail.pts} 點
          </Text>
        </Pressable>
      </SafeAreaView>

      <BookingDoneModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onViewBooking={() => {
          setModalVisible(false);
          router.push({ pathname: '/ticket/[bookingId]', params: { bookingId: detail.id } });
        }}
        classId={detail.id}
      />

      <HeartSheet visible={heartOpen} onClose={() => setHeartOpen(false)} onSaved={setSaved} />
    </View>
  );
}
