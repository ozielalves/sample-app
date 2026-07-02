import { View, type ViewProps } from "react-native";

import CardConst from "modules/UI/components/Card/const";

type CardProps = ViewProps & {
  className?: string;
};

export function Card({ children, className = "", style, ...props }: CardProps) {
  return (
    <View
      className={`mx-4 overflow-hidden rounded-card bg-surface dark:bg-surface-dark ${className}`}
      style={[CardConst.IOS_CARD_SHADOW, style]}
      {...props}
    >
      {children}
    </View>
  );
}
