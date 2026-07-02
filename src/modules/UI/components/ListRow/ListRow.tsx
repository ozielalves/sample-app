import { Pressable, Text, View } from "react-native";

type ListRowProps = {
  label: string;
  value?: string;
  showChevron?: boolean;
  isLast?: boolean;
  destructive?: boolean;
  onPress?: () => void;
};

export function ListRow({
  label,
  value,
  showChevron = false,
  isLast = false,
  destructive = false,
  onPress,
}: ListRowProps) {
  const row = (
    <View
      className={`flex-row items-center justify-between px-4 py-3 ${!isLast ? "border-b border-separator" : ""}`}
    >
      <Text
        className={`text-body ${destructive ? "text-destructive" : "text-foreground"}`}
      >
        {label}
      </Text>
      <View className="flex-row items-center gap-2">
        {value ? (
          <Text className="text-body text-label-secondary">{value}</Text>
        ) : null}
        {showChevron ? (
          <Text className="text-lg text-label-secondary">›</Text>
        ) : null}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        className="active:opacity-70"
      >
        {row}
      </Pressable>
    );
  }

  return row;
}
