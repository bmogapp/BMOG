import * as React from 'react';
import { Linking, Pressable, View } from 'react-native';

import { BrandIcons } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export type MapDistanceProps = {
  address: string;
  walkTime: string;
};

export function MapDistance({ address, walkTime }: MapDistanceProps) {
  const [copied, setCopied] = React.useState(false);

  const openMaps = () => {
    const query = encodeURIComponent(address);
    Linking.openURL(`https://maps.google.com/?q=${query}`).catch(() => {});
  };

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <View className="gap-2.5">
      <Pressable
        onPress={openMaps}
        className="h-[120px] items-center justify-center overflow-hidden rounded-tile border border-bmog-fg-15 bg-bmog-sand active:scale-[0.98]">
        <View className="flex-row gap-3">
          <Icon as={BrandIcons['map-pin']} size={22} className="text-bmog-ember" />
          <Icon as={BrandIcons['map-pin']} size={22} className="text-bmog-fg-38" />
        </View>
        <View className="mt-2.5 flex-row items-center gap-1.5 rounded-full bg-bmog-mist px-3 py-1.5">
          <Icon as={BrandIcons['external-link']} size={13} className="text-bmog-forest" />
          <Text className="font-sans-semibold text-bmog-forest text-[12px]">用地圖開啟</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={onCopy}
        className="flex-row items-center gap-2.5 rounded-tile border border-bmog-fg-15 bg-bmog-mist px-3.5 py-3 active:scale-[0.98]">
        <Icon as={BrandIcons['map-pin']} size={17} className="text-bmog-fg-62" />
        <View className="flex-1">
          <Text className="font-sans text-bmog-fg text-[13.5px]">{address}</Text>
          <Text className="font-mono text-bmog-fg-38 text-[10.5px] mt-0.5">{walkTime}</Text>
        </View>
        <Icon
          as={copied ? BrandIcons['check-circle-2'] : BrandIcons.copy}
          size={16}
          className={copied ? 'text-bmog-ember' : 'text-bmog-fg-38'}
        />
      </Pressable>
    </View>
  );
}
