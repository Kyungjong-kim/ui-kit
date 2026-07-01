import type { ComponentType, SVGProps } from "react";
import { iconMap } from "./generated/icon-map";
import { type IconAlias, iconAliasMap } from "./icon-alias";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** 생성된 원본 아이콘명. */
export type GeneratedIconName = keyof typeof iconMap;

/**
 * Icon `name`으로 받을 수 있는 이름.
 * 생성 원본 이름과 의미명 alias를 모두 허용한다.
 */
export type IconName = GeneratedIconName | IconAlias;

const isAlias = (name: IconName): name is IconAlias => name in iconAliasMap;

/** alias면 원본 이름으로 변환하고, 원본 이름이면 그대로 반환한다. */
function resolveIconName(name: IconName): GeneratedIconName {
  return isAlias(name) ? iconAliasMap[name] : name;
}

export type IconSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

const colorTokenMap = {
  primary: "var(--color-icon-primary)",
  secondary: "var(--color-icon-secondary)",
  tertiary: "var(--color-icon-tertiary)",
  subtle: "var(--color-icon-subtle)",
  muted: "var(--color-icon-muted)",
  disabled: "var(--color-icon-disabled)",
  inverse: "var(--color-icon-inverse)",
  brandDefault: "var(--color-icon-brand-default)",
  brandHover: "var(--color-icon-brand-hover)",
  dangerDefault: "var(--color-icon-danger-default)",
  dangerHover: "var(--color-icon-danger-hover)",
  successDefault: "var(--color-icon-success-default)",
} as const;

export type IconColor = keyof typeof colorTokenMap;

const sizeTokenMap: Record<IconSize, string> = {
  xxs: "var(--token-size-icon-xxs)",
  xs: "var(--token-size-icon-xs)",
  sm: "var(--token-size-icon-sm)",
  md: "var(--token-size-icon-md)",
  lg: "var(--token-size-icon-lg)",
  xl: "var(--token-size-icon-xl)",
  xxl: "var(--token-size-icon-xxl)",
  xxxl: "var(--token-size-icon-xxxl)",
};

type IconProps = {
  name: IconName;
  size?: IconSize | number;
  color?: IconColor | (string & {});
  className?: string;
  "aria-label"?: string;
} & Omit<SVGProps<SVGSVGElement>, "width" | "height" | "color">;

export function Icon({ name, size = "lg", color, className, ...rest }: IconProps) {
  const { style: svgStyle, ...svgProps } = rest;
  const resolvedName = resolveIconName(name);
  const Component = iconMap[resolvedName] as IconComponent;
  const dimensionValue = typeof size === "number" ? `${size}px` : sizeTokenMap[size];
  const colorValue = color ? (colorTokenMap[color as IconColor] ?? color) : undefined;

  return (
    <span
      className={className}
      data-icon={resolvedName}
      style={{
        width: dimensionValue,
        height: dimensionValue,
        display: "inline-flex",
        lineHeight: 0,
      }}
    >
      <Component
        style={{
          width: "100%",
          height: "100%",
          ...(colorValue ? { color: colorValue } : {}),
          ...svgStyle,
        }}
        {...svgProps}
      />
    </span>
  );
}

Icon.displayName = "Icon";
