import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ComponentPropsWithoutRef } from "react";
import { useId } from "react";
import { cn } from "../../../utils/cn";
import type { IconSize } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";
import type { TextProps } from "../../primitives/text";
import { Text } from "../../primitives/text";

type Size = "sm" | "md";

type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

const checkboxSizeStyles: Record<Size, string> = {
  sm: "size-4",
  md: "size-5",
};

const textVariantMap: Record<Size, Record<"base" | "bold", TextProps["variant"]>> = {
  sm: {
    base: "typography-label-md-base",
    bold: "typography-label-md-bold",
  },
  md: {
    base: "typography-label-lg-base",
    bold: "typography-body-lg-bold",
  },
};

export interface CheckMarkProps extends Omit<CheckboxProps, "children"> {
  size?: Size;
  hasBold?: boolean;
  label: React.ReactNode;
  labelClassName?: string;
  checkboxClassName?: string;
}

export function CheckMark({
  className,
  checkboxClassName,
  labelClassName,
  size = "md",
  hasBold = false,
  label,
  disabled,
  ...props
}: CheckMarkProps) {
  const textVariant = textVariantMap[size][hasBold ? "bold" : "base"];
  const labelId = useId();
  const ariaLabel = props["aria-label"];
  const ariaLabelledby = props["aria-labelledby"] ?? labelId;

  return (
    <CheckboxPrimitive.Root
      data-slot="check-mark"
      className={cn(
        "group inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? props["aria-labelledby"] : ariaLabelledby}
      {...props}
    >
      <span
        data-slot="check-mark-checkbox"
        aria-hidden="true"
        className={cn(
          "bg-transparent shrink-0 outline-none transition-shadow",
          "text-[var(--color-text-tertiary)] group-data-[state=checked]:text-[var(--color-text-brand-default)] group-data-[state=indeterminate]:text-[var(--color-text-brand-default)]",
          "group-disabled:text-[var(--color-text-disabled)] group-disabled:cursor-not-allowed",
          checkboxSizeStyles[size],
          checkboxClassName,
        )}
      >
        <CheckboxPrimitive.Indicator
          forceMount
          data-slot="checkbox-indicator"
          className="grid place-content-center text-current transition-none"
        >
          <Icon name="checkThickTrue" size={size as IconSize} color="currentColor" />
        </CheckboxPrimitive.Indicator>
      </span>

      <Text
        as="span"
        data-slot="checkmark-label"
        id={labelId}
        variant={textVariant}
        className={cn(
          "text-[var(--color-text-secondary)]",
          "group-data-[state=checked]:text-[var(--color-text-primary)]",
          "group-disabled:text-[var(--color-text-disabled)]",
          labelClassName,
        )}
      >
        {label}
      </Text>
    </CheckboxPrimitive.Root>
  );
}

CheckMark.displayName = "CheckMark";
