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
  sm: "size-size-icon-sm",
  md: "size-size-icon-md",
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
        "group inline-flex items-center gap-group-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-border-gray-lighter",
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
          "text-icon-tertiary group-data-[state=checked]:text-icon-brand-default group-data-[state=indeterminate]:text-icon-brand-default",
          "group-disabled:text-text-disabled group-disabled:cursor-not-allowed",
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
          "text-text-secondary",
          "group-data-[state=checked]:text-text-primary",
          "group-disabled:text-text-disabled",
          labelClassName,
        )}
      >
        {label}
      </Text>
    </CheckboxPrimitive.Root>
  );
}

CheckMark.displayName = "CheckMark";
