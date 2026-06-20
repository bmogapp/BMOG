import * as React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';

export type WalletPassField = { label: string; value: string; sub?: string };

export type WalletPassProps = {
  tint: string;
  dark?: boolean;
  status: string;
  primaryLabel: string;
  primaryValue: string;
  primarySub?: string;
  fields: WalletPassField[];
  ticketLabel: string;
  ticketNo: string;
  ticketHint?: string;
  overlay?: React.ReactNode;
};

function QRGrid({ color }: { color: string }) {
  const n = 9;
  return (
    <View style={{ width: 64, height: 64, flexDirection: 'row', flexWrap: 'wrap' }}>
      {Array.from({ length: n * n }).map((_, i) => {
        const x = i % n;
        const y = Math.floor(i / n);
        const corner = (x < 2 && y < 2) || (x > n - 3 && y < 2) || (x < 2 && y > n - 3);
        const on = corner || (x * 7 + y * 13 + x * y) % 3 === 0;
        return (
          <View
            key={i}
            style={{
              width: 64 / n,
              height: 64 / n,
              backgroundColor: on ? color : 'transparent',
            }}
          />
        );
      })}
    </View>
  );
}

export function WalletPass({
  tint,
  dark,
  status,
  primaryLabel,
  primaryValue,
  primarySub,
  fields,
  ticketLabel,
  ticketNo,
  ticketHint,
  overlay,
}: WalletPassProps) {
  const ink = dark ? '#FFF8F2' : '#1E2D21';
  const ink70 = dark ? 'rgba(255,248,242,0.7)' : 'rgba(30,45,33,0.62)';
  const ink40 = dark ? 'rgba(255,248,242,0.4)' : 'rgba(30,45,33,0.38)';
  const hairline = dark ? 'rgba(255,248,242,0.18)' : 'rgba(30,45,33,0.15)';

  return (
    <View
      style={{ backgroundColor: tint, borderRadius: 20, overflow: 'hidden' }}
      className="w-full">
      <View className="px-5 pt-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-mono text-[10px]" style={{ color: ink70, letterSpacing: 1.5 }}>
            MOGGER
          </Text>
          <View
            className="rounded-full px-2.5 py-1"
            style={{ backgroundColor: dark ? 'rgba(255,248,242,0.16)' : 'rgba(30,45,33,0.08)' }}>
            <Text className="font-mono text-[9.5px]" style={{ color: ink, letterSpacing: 1 }}>
              {status}
            </Text>
          </View>
        </View>

        <Text className="font-mono text-[10px] mt-4" style={{ color: ink70, letterSpacing: 1 }}>
          {primaryLabel}
        </Text>
        <Text className="font-tc-bold text-[22px] mt-1" style={{ color: ink }}>
          {primaryValue}
        </Text>
        {primarySub ? (
          <Text className="font-sans text-[12.5px] mt-0.5" style={{ color: ink70 }}>
            {primarySub}
          </Text>
        ) : null}

        <View className="mt-4 flex-row flex-wrap">
          {fields.slice(0, 4).map((f, i) => (
            <View key={i} style={{ width: '50%' }} className="mb-3 pr-2">
              <Text className="font-mono text-[9.5px]" style={{ color: ink40, letterSpacing: 0.8 }}>
                {f.label}
              </Text>
              <Text className="font-sans-semibold text-[13.5px] mt-0.5" style={{ color: ink }}>
                {f.value}
              </Text>
              {f.sub ? (
                <Text className="font-mono text-[10px] mt-0.5" style={{ color: ink40 }}>
                  {f.sub}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      </View>

      <View className="flex-row items-center">
        <View
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: '#FFF8F2',
            marginLeft: -7,
          }}
        />
        <View
          className="flex-1"
          style={{
            height: 1,
            borderStyle: 'dashed',
            borderWidth: 1,
            borderColor: hairline,
          }}
        />
        <View
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: '#FFF8F2',
            marginRight: -7,
          }}
        />
      </View>

      <View className="flex-row items-center gap-4 px-5 py-4">
        <QRGrid color={ink} />
        <View className="flex-1">
          <Text className="font-mono text-[9.5px]" style={{ color: ink40, letterSpacing: 0.8 }}>
            {ticketLabel}
          </Text>
          <Text className="font-mono-bold text-[15px] mt-0.5" style={{ color: ink, letterSpacing: 1.5 }}>
            {ticketNo}
          </Text>
          {ticketHint ? (
            <Text className="font-sans text-[11px] mt-1.5" style={{ color: ink70 }}>
              {ticketHint}
            </Text>
          ) : null}
        </View>
      </View>

      {overlay ? (
        <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
          {overlay}
        </View>
      ) : null}
    </View>
  );
}
