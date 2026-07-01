import { Text, View } from 'react-native';

import BadgeConst from 'modules/UI/components/Badge/const';
import type { BadgeVariant } from 'modules/UI/components/Badge/types';

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  return (
    <View className={`self-start rounded-full px-2.5 py-1 ${BadgeConst.BADGE_VARIANTS[variant]} ${className}`}>
      <Text className={`text-caption font-medium ${BadgeConst.BADGE_TEXT_VARIANTS[variant]}`}>{label}</Text>
    </View>
  );
}
