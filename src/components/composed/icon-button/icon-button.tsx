import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import type { IconColor, IconName, IconSize } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-interactive-primary-bg)] text-white",
          "hover:bg-[var(--color-interactive-primary-bg-hover)]",
        ],
        secondary: [
          "bg-[var(--color-interactive-secondary-bg)] border border-[var(--color-interactive-secondary-border)]",
          "hover:bg-[var(--color-bg-secondary)]",
        ],
        ghost: ["bg-transparent", "hover:bg-[var(--color-interactive-ghost-bg-hover)]"],
        danger: [
          "bg-[var(--color-interactive-destructive-bg)] text-white",
          "hover:bg-[var(--color-interactive-destructive-bg-hover)]",
        ],
        tertiary: ["bg-[var(--color-bg-tertiary)]", "hover:bg-[var(--color-bg-secondary)]"],
        light: ["bg-transparent text-white hover:bg-white/10"],
      },
      appearance: {
        filled: [],
        outline: [
          "bg-transparent border border-[var(--color-border-default)] hover:bg-[var(--color-bg-secondary)]",
        ],
        ghost: ["bg-transparent border-none hover:bg-[var(--color-interactive-ghost-bg-hover)]"],
      },
      size: {
        xs: ["h-6 w-6"],
        sm: ["h-8 w-8"],
        md: ["h-9 w-9"],
        lg: ["h-11 w-11"],
      },
      shape: {
        square: ["rounded-xs"],
        circle: ["rounded-full"],
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
      shape: "square",
    },
  },
);

const iconSizeMap: Record<
  NonNullable<VariantProps<typeof iconButtonVariants>["size"]>,
  IconSize
> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
};

type IconButtonVariant = NonNullable<VariantProps<typeof iconButtonVariants>["variant"]>;
type IconButtonAppearance = NonNullable<VariantProps<typeof iconButtonVariants>["appearance"]>;

function getDefaultIconColor(
  variant: IconButtonVariant,
  appearance: IconButtonAppearance | undefined,
): IconColor {
  const isFilled = !appearance || appearance === "filled";
  if (isFilled) {
    if (variant === "tertiary" || variant === "light") return "secondary";
    return "inverse";
  }
  if (variant === "primary") return "brandDefault";
  if (variant === "danger") return "dangerDefault";
  if (variant === "light") return "inverse";
  return "secondary";
}

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof iconButtonVariants> {
  icon: IconName;
  iconColor?: IconColor | (string & {});
  color?: IconColor | (string & {});
}

export function IconButton({
  className,
  variant = "secondary",
  size = "md",
  appearance,
  shape = "square",
  icon,
  iconColor,
  color,
  disabled,
  ...rest
}: IconButtonProps) {
  const resolvedIconSize = iconSizeMap[size ?? "md"];
  const resolvedIconColor =
    iconColor ??
    color ??
    (disabled ? "disabled" : getDefaultIconColor(variant ?? "secondary", appearance ?? undefined));

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(iconButtonVariants({ variant, size, appearance, shape }), className)}
      {...rest}
    >
      <Icon name={icon} size={resolvedIconSize} color={resolvedIconColor as IconColor} />
    </button>
  );
}

IconButton.displayName = "IconButton";
