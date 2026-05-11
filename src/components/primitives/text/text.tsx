import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../../utils/cn";

const textVariants = cva("", {
  variants: {
    variant: {
      "typography-display-md": "typography-display-md",
      "typography-display-sm": "typography-display-sm",
      "typography-headline-xl": "typography-headline-xl",
      "typography-headline-lg": "typography-headline-lg",
      "typography-headline-md": "typography-headline-md",
      "typography-headline-sm": "typography-headline-sm",
      "typography-body-lg-bold": "typography-body-lg-bold",
      "typography-body-lg-medium": "typography-body-lg-medium",
      "typography-body-lg-base": "typography-body-lg-base",
      "typography-body-md-bold": "typography-body-md-bold",
      "typography-body-md-medium": "typography-body-md-medium",
      "typography-body-md-base": "typography-body-md-base",
      "typography-body-sm-bold": "typography-body-sm-bold",
      "typography-body-sm-medium": "typography-body-sm-medium",
      "typography-body-sm-base": "typography-body-sm-base",
      "typography-caption": "typography-caption",
      "typography-code": "typography-code",
      "typography-label-lg-bold": "typography-label-lg-bold",
      "typography-label-lg-medium": "typography-label-lg-medium",
      "typography-label-lg-base": "typography-label-lg-base",
      "typography-label-md-bold": "typography-label-md-bold",
      "typography-label-md-medium": "typography-label-md-medium",
      "typography-label-md-base": "typography-label-md-base",
      "typography-label-sm-bold": "typography-label-sm-bold",
      "typography-label-sm-medium": "typography-label-sm-medium",
      "typography-label-sm-base": "typography-label-sm-base",
      "typography-label-xs": "typography-label-xs",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    fullWidth: {
      true: "block w-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "typography-body-lg-base",
    align: "left",
    fullWidth: false,
  },
});

type TextVariants = VariantProps<typeof textVariants>;

export type TextProps<T extends ElementType = "span"> = {
  as?: T;
  className?: string;
} & TextVariants &
  Omit<ComponentPropsWithoutRef<T>, "as" | "className" | keyof TextVariants>;

export function Text<T extends ElementType = "span">({
  as,
  className,
  variant,
  align,
  fullWidth,
  ...props
}: TextProps<T>) {
  const Component = (as ?? "span") as ElementType;
  return (
    <Component className={cn(textVariants({ variant, align, fullWidth }), className)} {...props} />
  );
}

export { textVariants };
