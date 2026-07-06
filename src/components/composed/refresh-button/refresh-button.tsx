import { cn } from "../../../utils/cn";
import { IconButton, type IconButtonProps } from "../icon-button";

export interface RefreshButtonProps extends Omit<IconButtonProps, "icon"> {
  /** 로딩 중이면 아이콘이 회전하고 버튼이 비활성화된다 */
  loading?: boolean;
}

/**
 * 새로고침 아이콘 버튼.
 *
 * IconButton 기반으로 새로고침 아이콘을 렌더한다.
 * loading=true 이면 아이콘이 회전 애니메이션되고 버튼이 비활성화되어 중복 실행을 막는다.
 */
export function RefreshButton({
  loading = false,
  disabled,
  className,
  "aria-label": ariaLabel = "새로고침",
  ...rest
}: RefreshButtonProps) {
  return (
    <IconButton
      icon="arrowsClockWise"
      aria-label={ariaLabel}
      aria-busy={loading}
      disabled={disabled || loading}
      className={cn(loading && "[&_[data-icon]]:animate-spin", className)}
      {...rest}
    />
  );
}

RefreshButton.displayName = "RefreshButton";
