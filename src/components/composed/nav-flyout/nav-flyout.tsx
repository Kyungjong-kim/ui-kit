import { type ReactNode, useState } from "react";
import { cn } from "../../../utils/cn";
import type { IconName } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";
import { Text } from "../../primitives/text";

export interface NavFlyoutItem {
  /** 항목 식별자 */
  id: string;
  /** 항목 라벨 */
  label: ReactNode;
  /** 좌측 아이콘 (선택) */
  icon?: IconName;
  /** 클릭 핸들러 — 실행 후 플라이아웃이 닫힌다 */
  onSelect?: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface NavFlyoutProps {
  /** 트리거로 쓸 요소 (버튼 등). asChild로 전달된다 */
  trigger: ReactNode;
  /** 패널에 표시할 네비 항목 목록 */
  items: NavFlyoutItem[];
  /** 열림 상태 (controlled) */
  open?: boolean;
  /** 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 패널 정렬 */
  align?: "start" | "center" | "end";
  /** 패널 표시 방향 */
  side?: "top" | "right" | "bottom" | "left";
  /** 패널 className */
  contentClassName?: string;
}

/**
 * NavFlyout — 트리거로 여는 네비게이션 플라이아웃 패널.
 *
 * Popover를 재사용해 트리거 → 항목 목록 패널을 띄운다.
 * 항목 선택 시 onSelect 실행 후 자동으로 닫힌다.
 * open/onOpenChange 미지정 시 내부 상태로 동작한다(uncontrolled).
 */
export function NavFlyout({
  trigger,
  items,
  open,
  onOpenChange,
  align = "start",
  side = "bottom",
  contentClassName,
}: NavFlyoutProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const handleSelect = (item: NavFlyoutItem) => {
    if (item.disabled) return;
    item.onSelect?.();
    setOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align={align} side={side} className={cn("w-56 p-1", contentClassName)}>
        <nav className="flex flex-col gap-0.5" aria-label="네비게이션">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => handleSelect(item)}
              className={cn(
                "flex items-center gap-group-sm rounded-sm px-2 py-1.5 text-left",
                "typography-body-sm-medium text-[var(--color-text-primary)]",
                "hover:bg-[var(--color-bg-tertiary)]",
                "focus-visible:outline-none focus-visible:bg-[var(--color-bg-tertiary)]",
                "disabled:cursor-not-allowed disabled:text-[var(--color-text-disabled)] disabled:hover:bg-transparent",
              )}
            >
              {item.icon && (
                <Icon
                  name={item.icon}
                  size="sm"
                  color={item.disabled ? "disabled" : "secondary"}
                  className="shrink-0"
                />
              )}
              <Text as="span" variant="typography-body-sm-medium" className="truncate">
                {item.label}
              </Text>
            </button>
          ))}
        </nav>
      </PopoverContent>
    </Popover>
  );
}

NavFlyout.displayName = "NavFlyout";
