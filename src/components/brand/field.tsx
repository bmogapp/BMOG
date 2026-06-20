import * as React from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import { BrandIcons, type BrandIconName } from '@/components/ui/brand-icons';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export type FieldProps = TextInputProps & {
  label?: string;
  icon?: BrandIconName;
  prefix?: string;
  optional?: boolean;
  trailing?: React.ReactNode;
};

export function Field({
  label,
  icon,
  prefix,
  optional,
  trailing,
  onFocus,
  onBlur,
  className,
  ...inputProps
}: FieldProps) {
  const [focused, setFocused] = React.useState(false);
  const IconComponent = icon ? BrandIcons[icon] : null;

  return (
    <View className="mb-4">
      {label ? (
        <View className="flex-row justify-between mb-2">
          <Text
            className="font-mono text-bmog-fg-38 text-[10.5px]"
            style={{ letterSpacing: 1, textTransform: 'uppercase' }}>
            {label}
          </Text>
          {optional ? (
            <Text
              className="font-mono text-bmog-fg-38 text-[10.5px]"
              style={{ letterSpacing: 0.6, textTransform: 'uppercase' }}>
              Optional
            </Text>
          ) : null}
        </View>
      ) : null}
      <View
        className={`h-[54px] flex-row items-center gap-[11px] rounded-field bg-bmog-mist px-3.5 ${
          focused ? 'border-[1.5px] border-bmog-sky' : 'border border-bmog-fg-15'
        }`}>
        {IconComponent ? (
          <Icon
            as={IconComponent}
            size={19}
            className={focused ? 'text-bmog-sky' : 'text-bmog-fg-38'}
          />
        ) : null}
        {prefix ? <Text className="font-mono text-bmog-fg-62 text-[15px]">{prefix}</Text> : null}
        <TextInput
          {...inputProps}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          placeholderTextColor="rgba(30,45,33,0.38)"
          className={`flex-1 font-sans text-bmog-fg text-[15.5px] ${className ?? ''}`}
        />
        {trailing}
      </View>
    </View>
  );
}
