import { Pressable, Text, type PressableProps } from 'react-native';

import ButtonConst from 'modules/UI/components/Button/const';
import type { ButtonSize, ButtonVariant } from 'modules/UI/components/Button/types';

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      className={`items-center justify-center ${ButtonConst.BUTTON_SIZES[size]} ${ButtonConst.BUTTON_VARIANTS[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
      {...props}
    >
      <Text className={`${ButtonConst.BUTTON_TEXT_SIZES[size]} ${ButtonConst.BUTTON_TEXT_VARIANTS[variant]}`}>
        {label}
      </Text>
    </Pressable>
  );
}
