import { Text, View } from "react-native";

type SectionProps = {
  title?: string;
  footer?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({
  title,
  footer,
  children,
  className = "",
}: SectionProps) {
  return (
    <View className={`gap-2 ${className}`}>
      {title ? (
        <Text className="px-8 text-footnote font-medium uppercase tracking-wide text-label-secondary">
          {title}
        </Text>
      ) : null}
      {children}
      {footer ? (
        <Text className="px-8 text-footnote text-label-secondary">
          {footer}
        </Text>
      ) : null}
    </View>
  );
}
