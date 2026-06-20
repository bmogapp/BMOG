import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import type { RichTextParagraph } from '@/lib/types/event';

export function RichText({ paragraphs }: { paragraphs: RichTextParagraph[] }) {
  return (
    <View className="gap-3">
      {paragraphs.map((runs, i) => (
        <Text key={i} className="font-sans text-bmog-fg-62 text-[14px] leading-[21px]">
          {runs.map((run, j) => (
            <Text
              key={j}
              className={`font-sans text-[14px] leading-[21px] ${
                run.bold ? 'font-sans-semibold text-bmog-fg' : 'text-bmog-fg-62'
              } ${run.link ? 'text-bmog-sky' : ''}`}
              style={run.italic ? { fontStyle: 'italic' } : undefined}>
              {run.text}
            </Text>
          ))}
        </Text>
      ))}
    </View>
  );
}
