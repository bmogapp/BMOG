import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Field } from '@/components/brand/field';
import { FlowHeader } from '@/components/brand/flow-header';
import { StepBar } from '@/components/brand/step-bar';
import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { EVENTS } from '@/lib/mock/mock-events';
import type { EventFormField } from '@/lib/types/event';

const KEYBOARD_TYPE: Record<EventFormField['type'], 'default' | 'phone-pad' | 'email-address'> = {
  text: 'default',
  tel: 'phone-pad',
  email: 'email-address',
  choice: 'default',
  textarea: 'default',
};

export default function EventRegForm() {
  const router = useRouter();
  const { venueId, eventId } = useLocalSearchParams<{ venueId: string; eventId: string }>();
  const event = EVENTS.find((e) => e.id === eventId) ?? EVENTS[0];
  const [values, setValues] = React.useState<Record<string, string>>({});

  const setValue = (id: string, v: string) => setValues((prev) => ({ ...prev, [id]: v }));

  const valid = event.form
    .filter((f) => f.required)
    .every((f) => (values[f.id] ?? '').trim().length > 0);

  return (
    <View className="flex-1 bg-bmog-mist">
      <SafeAreaView className="flex-1" edges={['top']}>
        <StepBar step={1} total={3} onBack={() => router.back()} />
        <FlowHeader kicker={event.kicker} title="活動報名" sub={event.title} />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pb-7">
          {event.form.map((f) => {
            if (f.type === 'choice') {
              return (
                <View key={f.id} className="mb-4">
                  <View className="flex-row justify-between mb-2">
                    <Text
                      className="font-mono text-bmog-fg-38 text-[10.5px]"
                      style={{ letterSpacing: 1, textTransform: 'uppercase' }}>
                      {f.label}
                    </Text>
                    {!f.required ? (
                      <Text
                        className="font-mono text-bmog-fg-38 text-[10.5px]"
                        style={{ letterSpacing: 0.6, textTransform: 'uppercase' }}>
                        Optional
                      </Text>
                    ) : null}
                  </View>
                  <View className="flex-row flex-wrap gap-2">
                    {(f.options ?? []).map((opt) => {
                      const active = values[f.id] === opt;
                      return (
                        <Pressable
                          key={opt}
                          onPress={() => setValue(f.id, opt)}
                          className={`rounded-full px-4 py-2.5 ${
                            active ? 'bg-bmog-forest' : 'border border-bmog-fg-15'
                          }`}>
                          <Text
                            className={`font-sans-semibold text-[13px] ${
                              active ? 'text-bmog-mist' : 'text-bmog-fg-62'
                            }`}>
                            {opt}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              );
            }
            return (
              <Field
                key={f.id}
                label={f.label}
                optional={!f.required}
                placeholder={f.placeholder}
                keyboardType={KEYBOARD_TYPE[f.type]}
                multiline={f.type === 'textarea'}
                numberOfLines={f.type === 'textarea' ? 4 : undefined}
                style={f.type === 'textarea' ? { height: 96, paddingTop: 14 } : undefined}
                value={values[f.id] ?? ''}
                onChangeText={(v) => setValue(f.id, v)}
              />
            );
          })}
        </ScrollView>

        <SafeAreaView edges={['bottom']} className="border-t border-bmog-fg-15 bg-bmog-mist px-5 pt-3">
          <Pressable
            disabled={!valid}
            onPress={() =>
              router.push({
                pathname: '/venue/[venueId]/event/[eventId]/checkout',
                params: { venueId, eventId: event.id },
              })
            }
            className={`h-[54px] flex-row items-center justify-center gap-2 rounded-field active:scale-[0.97] ${
              valid ? 'bg-bmog-ember' : 'bg-bmog-fg-15'
            }`}>
            <Icon as={BrandIcons['chevron-right']} size={17} className={valid ? 'text-bmog-forest' : 'text-bmog-fg-38'} />
            <Text className={`font-sans-semibold text-[15px] ${valid ? 'text-bmog-forest' : 'text-bmog-fg-38'}`}>
              下一步：付款
            </Text>
          </Pressable>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}
