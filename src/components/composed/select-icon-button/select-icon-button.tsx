import type { MouseEvent } from "react";
import { useState } from "react";
import { cn } from "../../../utils/cn";
import type { IconButtonProps } from "../icon-button";
import { IconButton } from "../icon-button";

export interface SelectIconButtonProps extends Omit<IconButtonProps, "onChange"> {
  variant?: "secondary";
  appearance?: "ghost";
  shape?: "square" | "circle";
  size?: "sm";
  selected?: boolean;
  defaultSelected?: boolean;
  onChange?: (selected: boolean) => void;
}

export function SelectIconButton({
  className,
  shape = "square",
  variant = "secondary",
  size = "sm",
  appearance = "ghost",
  selected,
  defaultSelected = false,
  disabled,
  onClick,
  onChange,
  ...rest
}: SelectIconButtonProps) {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const isControlled = selected !== undefined;
  const isSelected = isControlled ? selected : internalSelected;

  const backgroundClassName = disabled
    ? "bg-transparent"
    : isSelected
      ? "bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-interactive-ghost-bg-hover)]"
      : "bg-transparent hover:bg-[var(--color-interactive-ghost-bg-hover)]";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;
    const nextSelected = !isSelected;
    if (!isControlled) setInternalSelected(nextSelected);
    onChange?.(nextSelected);
  };

  return (
    <IconButton
      variant={variant}
      size={size}
      shape={shape}
      appearance={appearance}
      data-slot="select-icon-button"
      aria-pressed={isSelected}
      className={cn(backgroundClassName, className)}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    />
  );
}

SelectIconButton.displayName = "SelectIconButton";
