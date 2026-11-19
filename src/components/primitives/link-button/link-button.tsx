import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../../utils/cn";
import type { IconColor, IconName, IconSize } from "../icon";
import { Icon } from "../icon";

const linkButtonVariants = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "gap-inline-xs",
    "bg-transparent",
    "hover:bg-transparent",
    "active:bg-transparent",
    "disabled:bg-transparent",
    "rounded-xs focus-ring",
  ],
  {
    variants: {
      variant: {
        primary: [],
        secondary: ["text-text-secondary", "hover:text-text-primary"],
        tertiary: [],
        danger: [],
        light: ["text-text-inverse"],
      },
      size: {
        sm: ["typography-label-sm-base"],
      },
      disabled: {
        true: ["text-text-disabled", "hover:text-text-disabled"],
        false: ["hover:underline"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
);

type LinkButtonVariant = NonNullable<VariantProps<typeof linkButtonVariants>["variant"]>;

const variantToIconColor: Record<LinkButtonVariant, IconColor> = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  danger: "dangerDefault",
  light: "inverse",
};

export interface LinkButtonProps
  extends Omit<ComponentPropsWithoutRef<"a">, "type">,
    VariantProps<typeof linkButtonVariants> {
  icon?: IconName;
  href: string;
  size?: "sm";
  label?: string;
  children?: ReactNode;
}

export function LinkButton({
  className,
  variant = "primary",
  size = "sm",
  icon,
  label,
  href,
  disabled = false,
  children,
  target,
  rel,
  onClick,
  ...rest
}: LinkButtonProps) {
  const cls = cn(linkButtonVariants({ variant, size, disabled: !!disabled, className }));
  const safeRel = target === "_blank" && !rel ? "noopener noreferrer" : rel;
  const content = children ?? label;
  const iconColor: IconColor = disabled ? "disabled" : variantToIconColor[variant ?? "primary"];

  if (disabled) {
    return (
      // 비활성이어도 id·data-*·aria-* 등은 남긴다(클릭 핸들러만 뺀다)
      <span {...rest} aria-disabled="true" className={cls}>
        {icon && <Icon name={icon} size={size as IconSize} color={iconColor} />}
        <span>{content}</span>
      </span>
    );
  }

  return (
    <a href={href} className={cls} target={target} rel={safeRel} onClick={onClick} {...rest}>
      {icon && <Icon name={icon} size={size as IconSize} color={iconColor} />}
      <span>{content}</span>
    </a>
  );
}

LinkButton.displayName = "LinkButton";
