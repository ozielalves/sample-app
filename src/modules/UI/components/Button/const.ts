const BUTTON_VARIANTS = {
  primary: "bg-primary active:opacity-80",
  secondary: "bg-fill active:opacity-80",
  outline:
    "border border-separator bg-surface active:bg-fill dark:bg-surface-dark",
  ghost: "bg-transparent active:bg-fill",
  destructive: "bg-destructive active:opacity-80",
} as const;

const BUTTON_TEXT_VARIANTS = {
  primary: "text-primary-foreground",
  secondary: "text-primary",
  outline: "text-primary",
  ghost: "text-primary",
  destructive: "text-destructive-foreground",
} as const;

const BUTTON_SIZES = {
  sm: "px-4 py-2 rounded-xl",
  md: "px-4 py-3 rounded-xl",
  lg: "px-5 py-3.5 rounded-xl",
} as const;

const BUTTON_TEXT_SIZES = {
  sm: "text-footnote font-semibold",
  md: "text-body font-semibold",
  lg: "text-body font-semibold",
} as const;

export default {
  BUTTON_VARIANTS,
  BUTTON_TEXT_VARIANTS,
  BUTTON_SIZES,
  BUTTON_TEXT_SIZES,
};
