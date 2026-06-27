import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip } from '@/components/brand/chip';
import { Field } from '@/components/brand/field';
import { ScreenHeader } from '@/components/brand/screen-header';
import { Stars } from '@/components/brand/stars';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { getCourseDetail, STUDIOS } from '@/lib/mock/mock-studios';

const TAGS = ['教練專業', '場地乾淨', '氛圍很好', '強度適中', '音樂很棒', '人數剛好'];

export default function FlowReview() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const detail = getCourseDetail(bookingId);
  const studio = STUDIOS.find((s) => s.id === detail.studioId) ?? STUDIOS[0];
  const [rating, setRating] = React.useState(5);
  const [tags, setTags] = React.useState<Set<string>>(new Set());
  const [comment, setComment] = React.useState('');

  const toggleTag = (t: string) =>
    setTags((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScreenHeader title="課程評價" sub={studio.name} onBack={() => router.back()} />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pb-7">
          <View className="items-center rounded-card border border-bmog-fg-15 bg-bmog-sand p-5 mt-2">
            <Text className="font-tc-bold text-bmog-fg text-[16px]">{detail.name}</Text>
            <Text className="font-mono text-bmog-fg-38 text-[10.5px] mt-1">教練 {detail.coach}</Text>
            <View className="mt-4">
              <Stars value={rating} size={32} gap={6} onChange={setRating} />
            </View>
            <Text className="font-mono text-bmog-fg-62 text-[11px] mt-2">
              {['', '不滿意', '還可以', '不錯', '很棒', '太棒了'][rating]}
            </Text>
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">這堂課怎麼樣？</Text>
          <View className="flex-row flex-wrap gap-2">
            {TAGS.map((t) => (
              <Chip key={t} label={t} active={tags.has(t)} onPress={() => toggleTag(t)} />
            ))}
          </View>

          <Text className="font-tc-bold text-bmog-fg text-[15px] mt-6 mb-3">想多說一點嗎？</Text>
          <Field
            optional
            placeholder="分享你的上課體驗⋯"
            multiline
            numberOfLines={5}
            style={{ height: 110, paddingTop: 14 }}
            value={comment}
            onChangeText={setComment}
          />
        </ScrollView>

        <SafeAreaView edges={['bottom']} className="border-t border-bmog-fg-15 bg-bmog-mist px-5 pt-3">
          <Button
            variant="brand"
            size="brand"
            onPress={() =>
              router.push({ pathname: '/review/[bookingId]/done', params: { bookingId: detail.id } })
            }>
            <Text className="font-sans-semibold text-bmog-forest text-[15px]">送出評價</Text>
          </Button>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}
