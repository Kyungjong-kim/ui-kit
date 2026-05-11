import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn";

const slideListBadgeVariants = cva(
  ["inline-flex items-center justify-center rounded-full", "leading-none"],
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        tertiary: "",
      },
      state: {
        selected: "shadow-default-sm hover:shadow-default-sm",
        unselected: "shadow-default-sm hover:shadow-default-sm",
      },
      appearance: {
        ghost: "",
        solid: "",
      },
      size: {
        md: "w-size-control-xxxs h-size-control-xxxs px-inline-xs typography-label-xs",
        sm: "",
        lg: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        state: "unselected",
        className: "bg-surface-default text-text-secondary hover:bg-action-tertiary-hover",
      },
      {
        variant: "primary",
        state: "selected",
        className: "bg-action-primary-default text-text-inverse",
      },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "ghost",
      size: "md",
    },
  },
);

type SlideListBadgeVariants = Omit<VariantProps<typeof slideListBadgeVariants>, "state">;

export interface SlideListBadgeProps extends SlideListBadgeVariants {
  value: number | string;
  selected?: boolean;
}

export function SlideListBadge({
  value,
  selected = false,
  variant,
  appearance,
  size,
}: SlideListBadgeProps) {
  const state = selected ? "selected" : "unselected";
  return (
    <div className={cn(slideListBadgeVariants({ variant, appearance, size, state }))}>{value}</div>
  );
}
