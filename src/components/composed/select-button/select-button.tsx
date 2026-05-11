import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useState } from "react";
import { cn } from "../../../utils/cn";
import type { IconName } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";

export type SelectButtonAppearance = "outline" | "ghost";

export interface SelectButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  selected?: boolean;
  defaultSelected?: boolean;
  onChange?: (selected: boolean) => void;
  appearance?: SelectButtonAppearance;
  startIcon?: IconName;
  endIcon?: IconName;
  children?: ReactNode;
}

export function SelectButton({
  className,
  selected,
  defaultSelected = false,
  disabled,
  onClick,
  onChange,
  appearance = "outline",
  startIcon,
  endIcon,
  children,
  ...rest
}: SelectButtonProps) {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const isControlled = selected !== undefined;
  const isSelected = isControlled ? selected : internalSelected;

  const outlineClassName = disabled
    ? "bg-transparent border border-[var(--color-border-disabled)]"
    : isSelected
      ? "bg-[var(--color-neutral-100)] border border-[var(--color-border-default)] hover:bg-[var(--color-interactive-ghost-bg-hover)] hover:border-[var(--color-border-default)]"
      : "bg-transparent border border-[var(--color-border-default)] hover:bg-[var(--color-interactive-ghost-bg-hover)] hover:border-[var(--color-border-default)]";

  const ghostClassName = disabled
    ? "bg-transparent"
    : isSelected
      ? "bg-[var(--color-neutral-100)] hover:bg-[var(--color-interactive-ghost-bg-hover)]"
      : "bg-transparent hover:bg-[var(--color-interactive-ghost-bg-hover)]";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;
    const nextSelected = !isSelected;
    if (!isControlled) setInternalSelected(nextSelected);
    onChange?.(nextSelected);
  };

  return (
    <button
      type="button"
      data-slot="select-button"
      aria-pressed={isSelected}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md h-8 px-3 text-xs font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
        "disabled:pointer-events-none disabled:opacity-50",
        appearance === "ghost" ? ghostClassName : outlineClassName,
        className,
      )}
      onClick={handleClick}
      {...rest}
    >
      {startIcon && <Icon name={startIcon} size="xs" color="secondary" />}
      {children}
      {endIcon && <Icon name={endIcon} size="xs" color="secondary" />}
    </button>
  );
}

SelectButton.displayName = "SelectButton";
