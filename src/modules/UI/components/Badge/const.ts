const BADGE_VARIANTS = {
  default: "bg-fill",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
} as const;

const BADGE_TEXT_VARIANTS = {
  default: "text-label-secondary",
  primary: "text-primary-foreground",
  success: "text-success-foreground",
  warning: "text-warning-foreground",
  destructive: "text-destructive-foreground",
} as const;

export default {
  BADGE_VARIANTS,
  BADGE_TEXT_VARIANTS,
};
