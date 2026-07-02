import {
  Text,
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
} from "react-native";

import type { TextInputVariant } from "modules/UI/components/TextInput/types";
import UIConst from "modules/UI/const";

type TextInputProps = RNTextInputProps & {
  label?: string;
  error?: string;
  variant?: TextInputVariant;
  containerClassName?: string;
};

export function TextInput({
  label,
  error,
  variant = "default",
  containerClassName = "",
  className = "",
  editable = true,
  ...props
}: TextInputProps) {
  const hasError = variant === "error" || Boolean(error);

  return (
    <View className={`gap-1.5 ${containerClassName}`}>
      {label ? (
        <Text className="text-footnote font-medium uppercase tracking-wide text-label-secondary">
          {label}
        </Text>
      ) : null}
      <RNTextInput
        editable={editable}
        placeholderTextColor={UIConst.COLORS.LABEL_SECONDARY}
        className={`rounded-cell bg-fill px-3 py-3 text-body text-foreground dark:bg-fill-dark ${hasError ? "border border-destructive" : ""} ${!editable ? "opacity-50" : ""} ${className}`}
        {...props}
      />
      {error ? (
        <Text className="text-footnote text-destructive">{error}</Text>
      ) : null}
    </View>
  );
}
