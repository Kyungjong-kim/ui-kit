import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../../utils/cn";
import type { IconColor, IconName, IconSize } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";
import { Text } from "../../primitives/text";

const chipVariants = cva(
  [
    "group",
    "inline-flex items-center justify-center",
    "whitespace-nowrap",
    "rounded-full",
    "transition-all",
    "cursor-pointer",
    "focus-visible:outline-none focus-visible:ring focus-visible:ring-border-gray-lighter",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-action-primary-subtle", "ds-border-default"],
        secondary: ["bg-action-tertiary-default"],
      },
      appearance: {
        ghost: ["border-none"],
      },
      size: {
        xs: ["h-size-control-xxs", "px-inline-sm", "gap-group-xxs"],
        md: ["h-size-control-md", "px-inline-lg", "py-stack-sm"],
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        appearance: "ghost",
        className: ["text-text-brand-hover", "hover:bg-action-primary-subtle-hover"],
      },
      {
        variant: "secondary",
        appearance: "ghost",
        className: ["text-text-secondary", "hover:bg-action-tertiary-hover"],
      },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "ghost",
      size: "md",
    },
  },
);

type ChipVariants = VariantProps<typeof chipVariants>;

const defaultIconColorMap: Record<NonNullable<ChipVariants["variant"]>, IconColor> = {
  primary: "brandDefault",
  secondary: "secondary",
};

const iconSizeByChipSize: Record<NonNullable<ChipVariants["size"]>, IconSize> = {
  xs: "xs",
  md: "xs",
};

const textVariantBySize: Record<
  NonNullable<ChipVariants["size"]>,
  "typography-label-xs" | "typography-label-md-base"
> = {
  xs: "typography-label-xs",
  md: "typography-label-md-base",
};

export interface ChipProps extends ComponentProps<"button">, ChipVariants {
  leadingIcon?: IconName;
  subDescription?: string;
  iconColor?: IconColor;
}

export function Chip({
  className,
  children,
  variant = "primary",
  appearance = "ghost",
  size = "md",
  leadingIcon,
  subDescription,
  iconColor,
  ...rest
}: ChipProps) {
  const resolvedIconColor = iconColor ?? defaultIconColorMap[variant ?? "primary"];
  const textVariant = textVariantBySize[size ?? "md"];
  const iconSize = iconSizeByChipSize[size ?? "md"];

  return (
    <button
      type="button"
      className={cn(chipVariants({ variant, appearance, size }), className)}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} size={iconSize} color={resolvedIconColor} />}
      <Text
        variant={textVariant}
        className={cn("font-normal group-hover:font-medium", "group-focus-visible:font-medium")}
      >
        {children}
      </Text>
      {subDescription && (
        <Text variant="typography-label-xs" className="text-text-tertiary">
          {subDescription}
        </Text>
      )}
    </button>
  );
}
