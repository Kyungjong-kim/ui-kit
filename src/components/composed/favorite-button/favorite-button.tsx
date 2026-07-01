import { useState } from "react";
import { IconButton, type IconButtonProps } from "../icon-button";

export interface FavoriteButtonProps
  extends Omit<IconButtonProps, "icon" | "onChange" | "color" | "iconColor"> {
  /** 즐겨찾기 여부 (controlled) */
  pressed?: boolean;
  /** 초기 즐겨찾기 여부 (uncontrolled) */
  defaultPressed?: boolean;
  /** 토글 시 호출되는 콜백 */
  onPressedChange?: (pressed: boolean) => void;
}

/**
 * 즐겨찾기 토글 버튼.
 *
 * IconButton 기반으로 별 아이콘의 채움/빈 상태를 토글한다.
 * pressed 를 지정하면 controlled, 미지정 시 defaultPressed 로 uncontrolled 동작한다.
 * aria-pressed 로 토글 상태를 노출한다.
 */
export function FavoriteButton({
  pressed,
  defaultPressed = false,
  onPressedChange,
  onClick,
  "aria-label": ariaLabel = "즐겨찾기",
  ...rest
}: FavoriteButtonProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const isControlled = pressed !== undefined;
  const isPressed = isControlled ? pressed : internalPressed;

  const handleClick: IconButtonProps["onClick"] = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const next = !isPressed;
    if (!isControlled) setInternalPressed(next);
    onPressedChange?.(next);
  };

  return (
    <IconButton
      icon={isPressed ? "starFilledTrue" : "starFilledFalse"}
      iconColor={isPressed ? "brandDefault" : "tertiary"}
      aria-pressed={isPressed}
      aria-label={ariaLabel}
      onClick={handleClick}
      {...rest}
    />
  );
}

FavoriteButton.displayName = "FavoriteButton";
