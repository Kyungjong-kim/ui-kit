import {
  type ButtonHTMLAttributes,
  createContext,
  type KeyboardEvent,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { cn } from "../../../utils/cn";
import type { IconName } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";

type SegmentedControlVariant = "light" | "primary";

type SegmentedControlContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  variant: SegmentedControlVariant;
};

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

function useSegmentedControlContext() {
  const ctx = useContext(SegmentedControlContext);
  if (!ctx) throw new Error("SegmentedControlItem must be used inside <SegmentedControl>");
  return ctx;
}

export interface SegmentedControlProps {
  value: string;
  onValueChange: (value: string) => void;
  /** light: 선택 시 텍스트만 강조 / primary: 선택 시 체크 아이콘 + brand 컬러 */
  variant?: SegmentedControlVariant;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

export function SegmentedControl({
  value,
  onValueChange,
  variant = "light",
  className,
  children,
  ...props
}: SegmentedControlProps) {
  const ctx = useMemo(() => ({ value, onValueChange, variant }), [value, onValueChange, variant]);
  const groupRef = useRef<HTMLDivElement>(null);

  // value 가 어떤 항목과도 매칭되지 않으면 모든 항목 tabIndex=-1 → 키보드 진입 불가(트랩).
  // 매번 렌더 후 포커스 가능 항목이 없으면 첫 활성(disabled 아님) 항목을 진입점으로 보정.
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const radios = Array.from(
      group.querySelectorAll<HTMLElement>('[role="radio"]:not([disabled])'),
    );
    if (radios.length === 0) return;
    const hasFocusable = radios.some((r) => r.getAttribute("tabindex") === "0");
    if (!hasFocusable) radios[0].setAttribute("tabindex", "0");
  });

  return (
    <SegmentedControlContext.Provider value={ctx}>
      <div
        ref={groupRef}
        role="radiogroup"
        data-slot="segmented-control"
        data-variant={variant}
        className={cn(
          "inline-flex h-9 w-fit items-center gap-1 rounded-md bg-[var(--color-bg-secondary)] px-1 py-1",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
}

SegmentedControl.displayName = "SegmentedControl";

export interface SegmentedControlItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onClick"> {
  value: string;
  /** 텍스트 라벨 */
  children?: ReactNode;
  /** 아이콘 표시 (텍스트 없이 사용 가능) */
  icon?: IconName;
  /** 아이콘 + 텍스트 같이 표시 시 아이콘 위치 (기본 left) */
  iconPosition?: "left" | "right";
}

/** 같은 그룹 내 이전/다음 항목으로 선택 이동 (disabled 항목 건너뜀). */
function moveSelection(
  current: HTMLButtonElement,
  dir: 1 | -1,
  onValueChange: (value: string) => void,
) {
  const group = current.closest('[role="radiogroup"]');
  if (!group) return;
  const items = Array.from(
    group.querySelectorAll<HTMLButtonElement>('[role="radio"]:not([disabled])'),
  );
  const idx = items.indexOf(current);
  if (idx === -1) return;
  const next = items[(idx + dir + items.length) % items.length];
  if (!next) return;
  next.focus();
  const nextValue = next.getAttribute("data-value");
  if (nextValue) onValueChange(nextValue);
}

export function SegmentedControlItem({
  className,
  value,
  children,
  icon,
  iconPosition = "left",
  disabled,
  ...props
}: SegmentedControlItemProps) {
  const { value: selectedValue, onValueChange, variant } = useSegmentedControlContext();
  const isSelected = value === selectedValue;
  const isPrimarySelected = isSelected && variant === "primary";

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      moveSelection(e.currentTarget, 1, onValueChange);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      moveSelection(e.currentTarget, -1, onValueChange);
    }
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: 세그먼트 컨트롤 = radiogroup + 버튼(role=radio) + roving tabindex 패턴. 시각적 토글 그룹이라 native input[type=radio] 부적합
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      data-slot="segmented-control-item"
      data-value={value}
      data-state={isSelected ? "on" : "off"}
      disabled={disabled}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => !disabled && !isSelected && onValueChange(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex h-7 min-w-[20px] items-center justify-center gap-1 rounded-sm px-3 py-1",
        "cursor-pointer transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        isSelected && [
          "bg-[var(--color-bg-primary)] shadow-sm",
          variant === "light" && "text-[var(--color-text-secondary)] typography-body-md-medium",
          variant === "primary" &&
            "text-[var(--color-text-brand-default)] typography-body-sm-medium",
        ],
        !isSelected && [
          "bg-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]",
          variant === "light" && "typography-body-md-base",
          variant === "primary" && "typography-body-sm-base",
        ],
        className,
      )}
      {...props}
    >
      {isPrimarySelected && <Icon name="checkThickTrue" size={12} color="currentColor" />}
      {icon && iconPosition === "left" && !isPrimarySelected && (
        <Icon name={icon} size={16} color="currentColor" />
      )}
      {children}
      {icon && iconPosition === "right" && <Icon name={icon} size={16} color="currentColor" />}
    </button>
  );
}

SegmentedControlItem.displayName = "SegmentedControlItem";
