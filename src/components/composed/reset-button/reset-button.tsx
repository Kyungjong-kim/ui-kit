import type { ReactNode } from "react";
import { Button, type ButtonProps } from "../../primitives/button";
import { Icon } from "../../primitives/icon";

export interface ResetButtonProps extends Omit<ButtonProps, "children"> {
  /** 버튼 라벨 (기본: "초기화") */
  label?: ReactNode;
}

/**
 * 초기화 버튼.
 *
 * Button 기반으로 되돌리기 아이콘과 라벨을 함께 렌더한다.
 * 폼·필터 값을 기본 상태로 되돌릴 때 사용하며, 기본 variant 는 ghost 다.
 */
export function ResetButton({
  label = "초기화",
  variant = "ghost",
  size = "md",
  loading = false,
  ...rest
}: ResetButtonProps) {
  const iconSize = size === "sm" ? 16 : size === "lg" ? 20 : 18;

  return (
    <Button variant={variant} size={size} loading={loading} {...rest}>
      {!loading && <Icon name="arrowCounterClockwise" size={iconSize} color="currentColor" />}
      {label}
    </Button>
  );
}

ResetButton.displayName = "ResetButton";
