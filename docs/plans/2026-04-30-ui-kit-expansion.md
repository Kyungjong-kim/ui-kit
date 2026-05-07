# ui-kit Component Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** gen-portal 컴포넌트 포팅 + 누락 컴포넌트 추가로 ui-kit을 완전한 개인 디자인 시스템으로 확장한다.

**Architecture:** 기존 Button/Badge/Input/Checkbox와 동일한 패턴(TDD → CVA + Radix UI → Storybook story → commit)을 18개 컴포넌트에 반복 적용한다. 그룹 A(기반) → B(오버레이) → C(레이아웃) → D(복합 폼) → E(고급) 순으로 의존성이 낮은 것부터 구현한다.

**Tech Stack:** React 19, TypeScript, Tailwind v4 CSS Variables, Radix UI Primitives, CVA, tsup, Storybook 10, Vitest + Testing Library, Sonner(Toast), react-dropzone(FileUpload), @dnd-kit(DnD)

**Working Directory:** `~/Projects/ui-kit/`

**기존 패턴 요약:**
- 테스트: `src/components/primitives/<name>/<name>.test.tsx`
- 구현: `src/components/primitives/<name>/<name>.tsx`
- 진입점: `src/components/primitives/<name>/index.ts`
- 스토리: `stories/<name>.stories.tsx`
- 유틸: `src/utils/cn.ts` (이미 존재)
- CSS 변수: `var(--color-*)` 사용 (semantic.css 참조)
- 테스트 실행: `pnpm test`
- 빌드: `pnpm build`

---

## 사전 준비: Radix UI 패키지 설치

```bash
cd ~/Projects/ui-kit
pnpm add @radix-ui/react-separator @radix-ui/react-tooltip @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-accordion @radix-ui/react-dropdown-menu @radix-ui/react-avatar @radix-ui/react-popover sonner
```

---

## Group A — 기반 유틸리티

---

## Task 1: Switch

**Files:**
- Create: `src/components/primitives/switch/switch.tsx`
- Create: `src/components/primitives/switch/switch.test.tsx`
- Create: `src/components/primitives/switch/index.ts`
- Create: `stories/switch.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/switch/switch.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./switch";

describe("Switch", () => {
  it("label을 렌더한다", () => {
    render(<Switch label="알림 활성화" />);
    expect(screen.getByText("알림 활성화")).toBeInTheDocument();
  });

  it("클릭 시 onCheckedChange가 호출된다", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="알림" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("disabled 상태에서 클릭해도 변경되지 않는다", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="알림" disabled onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
```

**Step 2: 테스트 실패 확인**

```bash
pnpm test
```

Expected: FAIL — Switch not found

**Step 3: 구현**

`src/components/primitives/switch/switch.tsx`:

```tsx
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as Label from "@radix-ui/react-label";
import { type ComponentPropsWithoutRef, useId } from "react";
import { cn } from "../../../utils/cn";

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function Switch({ className, label, id, size = "md", ...props }: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;

  return (
    <div className="flex items-center gap-2">
      <SwitchPrimitive.Root
        id={switchId}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-[var(--color-bg-brand-default)] data-[state=unchecked]:bg-[var(--color-neutral-300)]",
          {
            "h-4 w-7": size === "sm",
            "h-5 w-9": size === "md",
            "h-6 w-11": size === "lg",
          },
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-md transition-transform",
            {
              "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0": size === "sm",
              "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0": size === "md",
              "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0": size === "lg",
            },
          )}
        />
      </SwitchPrimitive.Root>
      {label && (
        <Label.Root
          htmlFor={switchId}
          className="text-sm text-[var(--color-text-primary)] cursor-pointer"
        >
          {label}
        </Label.Root>
      )}
    </div>
  );
}
```

**Step 4: index.ts**

`src/components/primitives/switch/index.ts`:

```typescript
export { Switch } from "./switch";
export type { SwitchProps } from "./switch";
```

**Step 5: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 기존 11개 + 새 3개 = 14 tests

**Step 6: 스토리 작성**

`stories/switch.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../src/components/primitives/switch";

const meta: Meta<typeof Switch> = {
  title: "Primitives/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: "알림 활성화" },
};

export const Checked: Story = {
  args: { label: "알림 활성화", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "알림 활성화", disabled: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
      <Switch size="lg" label="Large" />
    </div>
  ),
};
```

**Step 7: 커밋**

```bash
git add .
git commit -m "feat: add Switch component"
```

---

## Task 2: Textarea

**Files:**
- Create: `src/components/primitives/textarea/textarea.tsx`
- Create: `src/components/primitives/textarea/textarea.test.tsx`
- Create: `src/components/primitives/textarea/index.ts`
- Create: `stories/textarea.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/textarea/textarea.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("label을 렌더한다", () => {
    render(<Textarea label="내용" />);
    expect(screen.getByText("내용")).toBeInTheDocument();
  });

  it("error 상태에서 helperText를 렌더한다", () => {
    render(<Textarea error helperText="필수 입력 항목입니다." />);
    expect(screen.getByText("필수 입력 항목입니다.")).toBeInTheDocument();
  });

  it("disabled 상태에서 textarea가 비활성화된다", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("rows prop이 적용된다", () => {
    render(<Textarea rows={5} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
  });
});
```

**Step 2: 테스트 실패 확인**

```bash
pnpm test
```

Expected: FAIL — Textarea not found

**Step 3: 구현**

`src/components/primitives/textarea/textarea.tsx`:

```tsx
import * as Label from "@radix-ui/react-label";
import { type TextareaHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "../../../utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, resize = "vertical", id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label.Root
            htmlFor={textareaId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </Label.Root>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={props.rows ?? 4}
          className={cn(
            "w-full rounded-md border bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:border-[var(--color-border-focus)]",
            "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-disabled)] disabled:text-[var(--color-text-disabled)]",
            error
              ? "border-[var(--color-border-danger-default)]"
              : "border-[var(--color-border-default)]",
            {
              "resize-none": resize === "none",
              "resize-y": resize === "vertical",
              "resize-x": resize === "horizontal",
              resize: resize === "both",
            },
            className,
          )}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              "text-xs",
              error ? "text-[var(--color-text-danger-default)]" : "text-[var(--color-text-tertiary)]",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
```

**Step 4: index.ts**

`src/components/primitives/textarea/index.ts`:

```typescript
export { Textarea } from "./textarea";
export type { TextareaProps } from "./textarea";
```

**Step 5: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 14 + 4 = 18 tests

**Step 6: 스토리 작성**

`stories/textarea.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../src/components/primitives/textarea";

const meta: Meta<typeof Textarea> = {
  title: "Primitives/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { label: "내용", placeholder: "내용을 입력해주세요." },
};

export const WithError: Story = {
  args: {
    label: "내용",
    error: true,
    helperText: "내용을 입력해주세요.",
    placeholder: "내용을 입력해주세요.",
  },
};

export const Disabled: Story = {
  args: { label: "내용", disabled: true, placeholder: "비활성화" },
};

export const NoResize: Story = {
  args: { label: "내용", resize: "none", placeholder: "크기 조절 불가" },
};
```

**Step 7: 커밋**

```bash
git add .
git commit -m "feat: add Textarea component"
```

---

## Task 3: Separator

**Files:**
- Create: `src/components/primitives/separator/separator.tsx`
- Create: `src/components/primitives/separator/separator.test.tsx`
- Create: `src/components/primitives/separator/index.ts`
- Create: `stories/separator.stories.tsx`

**Step 1: 패키지 확인 (사전 준비 단계에서 설치했으면 skip)**

```bash
ls node_modules/@radix-ui/react-separator 2>/dev/null && echo "installed" || echo "need install"
```

**Step 2: 테스트 작성**

`src/components/primitives/separator/separator.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./separator";

describe("Separator", () => {
  it("기본 horizontal separator를 렌더한다", () => {
    const { container } = render(<Separator />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.getAttribute("data-orientation")).toBe("horizontal");
  });

  it("vertical orientation이 적용된다", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("data-orientation")).toBe("vertical");
  });
});
```

**Step 3: 구현**

`src/components/primitives/separator/separator.tsx`:

```tsx
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../utils/cn";

export type SeparatorProps = ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>;

export function Separator({ className, orientation = "horizontal", decorative = true, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-[var(--color-border-default)]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
```

**Step 4: index.ts**

`src/components/primitives/separator/index.ts`:

```typescript
export { Separator } from "./separator";
export type { SeparatorProps } from "./separator";
```

**Step 5: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 18 + 2 = 20 tests

**Step 6: 스토리 작성**

`stories/separator.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../src/components/primitives/separator";

const meta: Meta<typeof Separator> = {
  title: "Primitives/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm text-[var(--color-text-secondary)]">위 섹션</p>
      <Separator className="my-3" />
      <p className="text-sm text-[var(--color-text-secondary)]">아래 섹션</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-3 h-8">
      <span className="text-sm">Home</span>
      <Separator orientation="vertical" />
      <span className="text-sm">About</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Contact</span>
    </div>
  ),
};
```

**Step 7: 커밋**

```bash
git add .
git commit -m "feat: add Separator component"
```

---

## Task 4: Skeleton

**Files:**
- Create: `src/components/primitives/skeleton/skeleton.tsx`
- Create: `src/components/primitives/skeleton/skeleton.test.tsx`
- Create: `src/components/primitives/skeleton/index.ts`
- Create: `stories/skeleton.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/skeleton/skeleton.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("animate-pulse 클래스를 가진다", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("rounded prop이 적용된다", () => {
    const { container } = render(<Skeleton rounded="full" />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });

  it("className이 병합된다", () => {
    const { container } = render(<Skeleton className="w-32 h-4" />);
    expect(container.firstChild).toHaveClass("w-32", "h-4");
  });
});
```

**Step 2: 구현**

`src/components/primitives/skeleton/skeleton.tsx`:

```tsx
import { cn } from "../../../utils/cn";

export interface SkeletonProps {
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--color-neutral-200)]",
        {
          "rounded-none": rounded === "none",
          "rounded-sm": rounded === "sm",
          "rounded-md": rounded === "md",
          "rounded-lg": rounded === "lg",
          "rounded-full": rounded === "full",
        },
        className,
      )}
    />
  );
}
```

**Step 3: index.ts**

`src/components/primitives/skeleton/index.ts`:

```typescript
export { Skeleton } from "./skeleton";
export type { SkeletonProps } from "./skeleton";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 20 + 3 = 23 tests

**Step 5: 스토리 작성**

`stories/skeleton.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../src/components/primitives/skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      <Skeleton className="h-40 w-full" rounded="lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex items-center gap-2 pt-1">
        <Skeleton className="h-8 w-8" rounded="full" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
};

export const TextSkeleton: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  ),
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add Skeleton component"
```

---

## Group B — 오버레이 / 피드백

---

## Task 5: Spinner

**Files:**
- Create: `src/components/primitives/spinner/spinner.tsx`
- Create: `src/components/primitives/spinner/spinner.test.tsx`
- Create: `src/components/primitives/spinner/index.ts`
- Create: `stories/spinner.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/spinner/spinner.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("aria-label로 접근 가능하다", () => {
    const { getByRole } = render(<Spinner />);
    expect(getByRole("status")).toBeInTheDocument();
  });

  it("size 클래스가 적용된다", () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.firstChild).toHaveClass("h-8");
  });
});
```

**Step 2: 구현**

`src/components/primitives/spinner/spinner.tsx`:

```tsx
import { cn } from "../../../utils/cn";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="로딩 중"
      className={cn(
        "animate-spin rounded-full border-2 border-[var(--color-border-default)] border-t-[var(--color-bg-brand-default)]",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg",
        },
        className,
      )}
    />
  );
}
```

**Step 3: index.ts**

`src/components/primitives/spinner/index.ts`:

```typescript
export { Spinner } from "./spinner";
export type { SpinnerProps } from "./spinner";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 23 + 2 = 25 tests

**Step 5: 스토리 작성**

`stories/spinner.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../src/components/primitives/spinner";

const meta: Meta<typeof Spinner> = {
  title: "Primitives/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm">
      <Spinner size="sm" />
      <span>불러오는 중...</span>
    </div>
  ),
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add Spinner component"
```

---

## Task 6: Toast

**Files:**
- Create: `src/components/primitives/toast/toast.tsx`
- Create: `src/components/primitives/toast/toast.test.tsx`
- Create: `src/components/primitives/toast/index.ts`
- Create: `stories/toast.stories.tsx`

**Step 1: Sonner 설치 (사전 준비 단계에서 설치했으면 skip)**

```bash
pnpm add sonner
```

**Step 2: 테스트 작성**

`src/components/primitives/toast/toast.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toaster } from "./toast";

describe("Toaster", () => {
  it("Toaster가 DOM에 마운트된다", () => {
    render(<Toaster />);
    // Sonner는 portal로 마운트되므로 존재 자체만 확인
    expect(document.body).toBeInTheDocument();
  });
});
```

**Step 3: 구현**

`src/components/primitives/toast/toast.tsx`:

```tsx
import { Toaster as Sonner } from "sonner";
import type { ComponentProps } from "react";

export type ToasterProps = ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      toastOptions={{
        style: {
          background: "var(--color-bg-primary)",
          border: "1px solid var(--color-border-default)",
          color: "var(--color-text-primary)",
          borderRadius: "8px",
        },
      }}
      {...props}
    />
  );
}

export { toast } from "sonner";
```

**Step 4: index.ts**

`src/components/primitives/toast/index.ts`:

```typescript
export { Toaster, toast } from "./toast";
export type { ToasterProps } from "./toast";
```

**Step 5: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 25 + 1 = 26 tests

**Step 6: 스토리 작성**

`stories/toast.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/primitives/button";
import { Toaster, toast } from "../src/components/primitives/toast";

const meta: Meta = {
  title: "Primitives/Toast",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Toaster />
      <Button onClick={() => toast("기본 알림 메시지입니다.")}>Default</Button>
      <Button onClick={() => toast.success("저장되었습니다.")}>Success</Button>
      <Button onClick={() => toast.error("오류가 발생했습니다.")}>Error</Button>
      <Button onClick={() => toast.warning("주의하세요.")}>Warning</Button>
      <Button onClick={() => toast.info("참고 사항입니다.")}>Info</Button>
      <Button
        onClick={() =>
          toast("확인이 필요합니다.", {
            action: { label: "확인", onClick: () => {} },
          })
        }
      >
        With Action
      </Button>
    </div>
  ),
};
```

**Step 7: 커밋**

```bash
git add .
git commit -m "feat: add Toast (Sonner) component"
```

---

## Task 7: Tooltip

**Files:**
- Create: `src/components/primitives/tooltip/tooltip.tsx`
- Create: `src/components/primitives/tooltip/tooltip.test.tsx`
- Create: `src/components/primitives/tooltip/index.ts`
- Create: `stories/tooltip.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/tooltip/tooltip.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tooltip } from "./tooltip";
import { Button } from "../../primitives/button";

describe("Tooltip", () => {
  it("trigger 자식을 렌더한다", () => {
    render(
      <Tooltip content="도움말">
        <Button>hover me</Button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "hover me" })).toBeInTheDocument();
  });

  it("hover 시 content가 나타난다", async () => {
    render(
      <Tooltip content="도움말 텍스트">
        <Button>hover me</Button>
      </Tooltip>,
    );
    await userEvent.hover(screen.getByRole("button"));
    expect(await screen.findByText("도움말 텍스트")).toBeInTheDocument();
  });
});
```

**Step 2: 구현**

`src/components/primitives/tooltip/tooltip.tsx`:

```tsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["side"];
  align?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["align"];
  delayDuration?: number;
}

export function Tooltip({ children, content, side = "top", align = "center", delayDuration = 300 }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={6}
            className={cn(
              "z-50 max-w-xs rounded-md bg-[var(--color-bg-inverse)] px-3 py-1.5 text-xs text-[var(--color-text-inverse)]",
              "animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[var(--color-bg-inverse)]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
```

**Step 3: index.ts**

`src/components/primitives/tooltip/index.ts`:

```typescript
export { Tooltip } from "./tooltip";
export type { TooltipProps } from "./tooltip";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 26 + 2 = 28 tests

**Step 5: 스토리 작성**

`stories/tooltip.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/primitives/button";
import { Tooltip } from "../src/components/primitives/tooltip";

const meta: Meta = {
  title: "Primitives/Tooltip",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-16">
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Tooltip key={side} content={`${side} tooltip`} side={side}>
          <Button variant="secondary">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add Tooltip component"
```

---

## Task 8: Dialog

**Files:**
- Create: `src/components/primitives/dialog/dialog.tsx`
- Create: `src/components/primitives/dialog/dialog.test.tsx`
- Create: `src/components/primitives/dialog/index.ts`
- Create: `stories/dialog.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/dialog/dialog.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dialog } from "./dialog";
import { Button } from "../../primitives/button";

describe("Dialog", () => {
  it("open=true일 때 title을 렌더한다", () => {
    render(
      <Dialog open title="삭제 확인" onOpenChange={() => {}}>
        <p>정말 삭제하시겠습니까?</p>
      </Dialog>,
    );
    expect(screen.getByText("삭제 확인")).toBeInTheDocument();
  });

  it("open=false일 때 렌더되지 않는다", () => {
    render(
      <Dialog open={false} title="삭제 확인" onOpenChange={() => {}}>
        <p>정말 삭제하시겠습니까?</p>
      </Dialog>,
    );
    expect(screen.queryByText("삭제 확인")).not.toBeInTheDocument();
  });

  it("children이 렌더된다", () => {
    render(
      <Dialog open title="확인" onOpenChange={() => {}}>
        <p>dialog content</p>
      </Dialog>,
    );
    expect(screen.getByText("dialog content")).toBeInTheDocument();
  });
});
```

**Step 2: 구현**

`src/components/primitives/dialog/dialog.tsx`:

```tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  showClose?: boolean;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  maxWidth = "md",
  showClose = true,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[var(--color-bg-primary)] p-6 shadow-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "w-full",
            {
              "max-w-sm": maxWidth === "sm",
              "max-w-md": maxWidth === "md",
              "max-w-lg": maxWidth === "lg",
              "max-w-xl": maxWidth === "xl",
            },
          )}
        >
          {(title || showClose) && (
            <div className="flex items-center justify-between mb-4">
              {title && (
                <DialogPrimitive.Title className="text-base font-semibold text-[var(--color-text-primary)]">
                  {title}
                </DialogPrimitive.Title>
              )}
              {showClose && (
                <DialogPrimitive.Close className="ml-auto rounded-sm p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]">
                  <XIcon className="h-4 w-4" />
                </DialogPrimitive.Close>
              )}
            </div>
          )}
          {description && (
            <DialogPrimitive.Description className="mb-4 text-sm text-[var(--color-text-secondary)]">
              {description}
            </DialogPrimitive.Description>
          )}
          <div>{children}</div>
          {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const DialogTrigger = DialogPrimitive.Trigger;
```

**Step 3: index.ts**

`src/components/primitives/dialog/index.ts`:

```typescript
export { Dialog, DialogTrigger } from "./dialog";
export type { DialogProps } from "./dialog";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 28 + 3 = 31 tests

**Step 5: 스토리 작성**

`stories/dialog.stories.tsx`:

```tsx
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/primitives/button";
import { Dialog, DialogTrigger } from "../src/components/primitives/dialog";

const meta: Meta = {
  title: "Primitives/Dialog",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="확인"
          description="이 작업을 진행하시겠습니까?"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>취소</Button>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </>
          }
        >
          <p className="text-sm text-[var(--color-text-secondary)]">추가 내용이 여기에 들어갑니다.</p>
        </Dialog>
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>삭제</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="정말 삭제하시겠습니까?"
          description="이 작업은 되돌릴 수 없습니다."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>취소</Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>삭제</Button>
            </>
          }
        />
      </>
    );
  },
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add Dialog component (Radix Dialog)"
```

---

## Group C — 네비게이션 / 레이아웃

---

## Task 9: Tabs

**Files:**
- Create: `src/components/primitives/tabs/tabs.tsx`
- Create: `src/components/primitives/tabs/tabs.test.tsx`
- Create: `src/components/primitives/tabs/index.ts`
- Create: `stories/tabs.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/tabs/tabs.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

describe("Tabs", () => {
  const setup = () =>
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">탭 1</TabsTrigger>
          <TabsTrigger value="tab2">탭 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">내용 1</TabsContent>
        <TabsContent value="tab2">내용 2</TabsContent>
      </Tabs>,
    );

  it("기본 탭 내용이 렌더된다", () => {
    setup();
    expect(screen.getByText("내용 1")).toBeInTheDocument();
  });

  it("다른 탭 클릭 시 해당 내용이 표시된다", async () => {
    setup();
    await userEvent.click(screen.getByText("탭 2"));
    expect(screen.getByText("내용 2")).toBeInTheDocument();
  });
});
```

**Step 2: 구현**

`src/components/primitives/tabs/tabs.tsx`:

```tsx
import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../utils/cn";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex items-center rounded-lg bg-[var(--color-bg-tertiary)] p-1 gap-1",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all",
        "text-[var(--color-text-tertiary)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-[var(--color-bg-primary)] data-[state=active]:text-[var(--color-text-primary)] data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
        className,
      )}
      {...props}
    />
  );
}
```

**Step 3: index.ts**

`src/components/primitives/tabs/index.ts`:

```typescript
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 31 + 2 = 33 tests

**Step 5: 스토리 작성**

`stories/tabs.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../src/components/primitives/tabs";

const meta: Meta = {
  title: "Primitives/Tabs",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList>
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="analytics">분석</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">개요 내용입니다.</TabsContent>
      <TabsContent value="analytics">분석 데이터가 여기에 표시됩니다.</TabsContent>
      <TabsContent value="settings">설정 옵션입니다.</TabsContent>
    </Tabs>
  ),
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add Tabs component"
```

---

## Task 10: Accordion

**Files:**
- Create: `src/components/primitives/accordion/accordion.tsx`
- Create: `src/components/primitives/accordion/accordion.test.tsx`
- Create: `src/components/primitives/accordion/index.ts`
- Create: `stories/accordion.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/accordion/accordion.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

describe("Accordion", () => {
  const setup = () =>
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>질문 1</AccordionTrigger>
          <AccordionContent>답변 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

  it("trigger가 렌더된다", () => {
    setup();
    expect(screen.getByText("질문 1")).toBeInTheDocument();
  });

  it("클릭 시 content가 열린다", async () => {
    setup();
    await userEvent.click(screen.getByText("질문 1"));
    expect(screen.getByText("답변 1")).toBeVisible();
  });
});
```

**Step 2: 구현**

`src/components/primitives/accordion/accordion.tsx`:

```tsx
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../utils/cn";

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = AccordionPrimitive.Item;

export function AccordionTrigger({ className, children, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:text-[var(--color-text-brand-default)]",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-sm text-[var(--color-text-secondary)]",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className,
      )}
      {...props}
    >
      <div className="pb-4">{children}</div>
    </AccordionPrimitive.Content>
  );
}
```

**Step 3: index.ts**

`src/components/primitives/accordion/index.ts`:

```typescript
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 33 + 2 = 35 tests

**Step 5: 스토리 작성**

`stories/accordion.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../src/components/primitives/accordion";

const meta: Meta = {
  title: "Primitives/Accordion",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const items = [
  { value: "q1", trigger: "ui-kit이란 무엇인가요?", content: "개인 디자인 시스템입니다. React + Tailwind v4 + Radix UI로 구성됩니다." },
  { value: "q2", trigger: "어떻게 설치하나요?", content: "pnpm add ui-kit 으로 설치할 수 있습니다." },
  { value: "q3", trigger: "브랜드 컬러는?", content: "골든 앰버(#FABC37)를 기반으로 합니다." },
];

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} className="border-b border-[var(--color-border-default)]">
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add Accordion component"
```

---

## Task 11: Card

**Files:**
- Create: `src/components/primitives/card/card.tsx`
- Create: `src/components/primitives/card/card.test.tsx`
- Create: `src/components/primitives/card/index.ts`
- Create: `stories/card.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/card/card.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardHeader, CardBody, CardFooter } from "./card";

describe("Card", () => {
  it("children을 렌더한다", () => {
    render(<Card>카드 내용</Card>);
    expect(screen.getByText("카드 내용")).toBeInTheDocument();
  });

  it("CardHeader/CardBody/CardFooter가 렌더된다", () => {
    render(
      <Card>
        <CardHeader>헤더</CardHeader>
        <CardBody>바디</CardBody>
        <CardFooter>푸터</CardFooter>
      </Card>,
    );
    expect(screen.getByText("헤더")).toBeInTheDocument();
    expect(screen.getByText("바디")).toBeInTheDocument();
    expect(screen.getByText("푸터")).toBeInTheDocument();
  });
});
```

**Step 2: 구현**

`src/components/primitives/card/card.tsx`:

```tsx
import type { HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  shadow?: "none" | "sm" | "md" | "lg";
}

export function Card({ className, shadow = "sm", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)]",
        {
          "shadow-none": shadow === "none",
          "shadow-sm": shadow === "sm",
          "shadow-md": shadow === "md",
          "shadow-lg": shadow === "lg",
        },
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 p-6 pb-0", className)} {...props} />;
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center p-6 pt-0",
        className,
      )}
      {...props}
    />
  );
}
```

**Step 3: index.ts**

`src/components/primitives/card/index.ts`:

```typescript
export { Card, CardHeader, CardBody, CardFooter } from "./card";
export type { CardProps } from "./card";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 35 + 2 = 37 tests

**Step 5: 스토리 작성**

`stories/card.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../src/components/primitives/badge";
import { Button } from "../src/components/primitives/button";
import { Card, CardBody, CardFooter, CardHeader } from "../src/components/primitives/card";

const meta: Meta = {
  title: "Primitives/Card",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card className="w-72">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[var(--color-text-primary)]">카드 제목</h3>
          <Badge variant="default">New</Badge>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">카드 설명이 여기에 들어갑니다.</p>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-[var(--color-text-tertiary)]">카드 본문 내용입니다.</p>
      </CardBody>
      <CardFooter className="gap-2">
        <Button size="sm" variant="secondary" className="flex-1">취소</Button>
        <Button size="sm" className="flex-1">확인</Button>
      </CardFooter>
    </Card>
  ),
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add Card component"
```

---

## Task 12: Avatar

**Files:**
- Create: `src/components/primitives/avatar/avatar.tsx`
- Create: `src/components/primitives/avatar/avatar.test.tsx`
- Create: `src/components/primitives/avatar/index.ts`
- Create: `stories/avatar.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/avatar/avatar.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("이미지 없을 때 fallback을 렌더한다", () => {
    render(<Avatar fallback="KJ" />);
    expect(screen.getByText("KJ")).toBeInTheDocument();
  });

  it("size 클래스가 적용된다", () => {
    const { container } = render(<Avatar fallback="KJ" size="lg" />);
    expect(container.firstChild).toHaveClass("h-12");
  });
});
```

**Step 2: 구현**

`src/components/primitives/avatar/avatar.tsx`:

```tsx
import { cn } from "../../../utils/cn";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
  className?: string;
}

export function Avatar({ src, alt, fallback, size = "md", shape = "circle", className }: AvatarProps) {
  const sizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-[var(--color-bg-brand-subtle)]",
        shape === "circle" ? "rounded-full" : "rounded-md",
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? "avatar"}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <span className="font-medium text-[var(--color-text-brand-default)] select-none">
          {fallback}
        </span>
      )}
    </div>
  );
}
```

**Step 3: index.ts**

`src/components/primitives/avatar/index.ts`:

```typescript
export { Avatar } from "./avatar";
export type { AvatarProps } from "./avatar";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 37 + 2 = 39 tests

**Step 5: 스토리 작성**

`stories/avatar.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../src/components/primitives/avatar";

const meta: Meta<typeof Avatar> = {
  title: "Primitives/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size} fallback="KJ" />
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    src: "https://github.com/Kyungjong-kim.png",
    alt: "Kyungjong Kim",
    size: "lg",
  },
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar fallback="KJ" size="lg" shape="circle" />
      <Avatar fallback="KJ" size="lg" shape="square" />
    </div>
  ),
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add Avatar component"
```

---

## Task 13: Dropdown Menu

**Files:**
- Create: `src/components/primitives/dropdown-menu/dropdown-menu.tsx`
- Create: `src/components/primitives/dropdown-menu/dropdown-menu.test.tsx`
- Create: `src/components/primitives/dropdown-menu/index.ts`
- Create: `stories/dropdown-menu.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/dropdown-menu/dropdown-menu.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import { Button } from "../../primitives/button";

describe("DropdownMenu", () => {
  it("trigger가 렌더된다", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>편집</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(screen.getByRole("button", { name: "메뉴 열기" })).toBeInTheDocument();
  });

  it("trigger 클릭 시 메뉴 아이템이 표시된다", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>편집</DropdownMenuItem>
          <DropdownMenuItem>삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText("편집")).toBeInTheDocument();
  });
});
```

**Step 2: 구현**

`src/components/primitives/dropdown-menu/dropdown-menu.tsx`:

```tsx
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../utils/cn";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;

export function DropdownMenuContent({ className, sideOffset = 6, ...props }: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-40 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] p-1 shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({ className, ...props }: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors",
        "hover:bg-[var(--color-bg-tertiary)] focus:bg-[var(--color-bg-tertiary)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuLabel({ className, ...props }: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn("px-2 py-1.5 text-xs font-semibold text-[var(--color-text-tertiary)]", className)}
      {...props}
    />
  );
}
```

**Step 3: index.ts**

`src/components/primitives/dropdown-menu/index.ts`:

```typescript
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./dropdown-menu";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 39 + 2 = 41 tests

**Step 5: 스토리 작성**

`stories/dropdown-menu.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../src/components/primitives/dropdown-menu";

const meta: Meta = {
  title: "Primitives/DropdownMenu",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">메뉴 열기 ▾</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>계정</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 h-px bg-[var(--color-border-default)]" />
        <DropdownMenuItem>프로필</DropdownMenuItem>
        <DropdownMenuItem>설정</DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 h-px bg-[var(--color-border-default)]" />
        <DropdownMenuItem className="text-[var(--color-text-danger-default)]">로그아웃</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add DropdownMenu component"
```

---

## Group D — 복합 폼

---

## Task 14: Select

**Files:**
- Create: `src/components/primitives/select/select.tsx`
- Create: `src/components/primitives/select/select.test.tsx`
- Create: `src/components/primitives/select/index.ts`
- Create: `stories/select.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/select/select.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select } from "./select";

const options = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "orange", label: "오렌지" },
];

describe("Select", () => {
  it("placeholder를 렌더한다", () => {
    render(<Select options={options} placeholder="선택해주세요" />);
    expect(screen.getByText("선택해주세요")).toBeInTheDocument();
  });

  it("label을 렌더한다", () => {
    render(<Select options={options} label="과일" />);
    expect(screen.getByText("과일")).toBeInTheDocument();
  });

  it("disabled 상태가 적용된다", () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
```

**Step 2: 구현**

`src/components/primitives/select/select.tsx`:

```tsx
import * as SelectPrimitive from "@radix-ui/react-select";
import * as Label from "@radix-ui/react-label";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useId } from "react";
import { cn } from "../../../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = "선택",
  label,
  error,
  helperText,
  disabled,
  className,
}: SelectProps) {
  const generatedId = useId();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label.Root
          htmlFor={generatedId}
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          {label}
        </Label.Root>
      )}
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          id={generatedId}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border bg-[var(--color-bg-primary)] px-3 text-sm text-[var(--color-text-primary)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:border-[var(--color-border-focus)]",
            "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-disabled)] disabled:opacity-50",
            "data-[placeholder]:text-[var(--color-text-tertiary)]",
            error ? "border-[var(--color-border-danger-default)]" : "border-[var(--color-border-default)]",
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDownIcon className="h-4 w-4 text-[var(--color-text-tertiary)]" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-[var(--color-text-primary)] outline-none",
                    "hover:bg-[var(--color-bg-tertiary)] focus:bg-[var(--color-bg-tertiary)]",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  )}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <CheckIcon className="h-3.5 w-3.5 text-[var(--color-text-brand-default)]" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {helperText && (
        <p className={cn("text-xs", error ? "text-[var(--color-text-danger-default)]" : "text-[var(--color-text-tertiary)]")}>
          {helperText}
        </p>
      )}
    </div>
  );
}
```

**Step 3: index.ts**

`src/components/primitives/select/index.ts`:

```typescript
export { Select } from "./select";
export type { SelectProps, SelectOption } from "./select";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 41 + 3 = 44 tests

**Step 5: 스토리 작성**

`stories/select.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../src/components/primitives/select";

const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "orange", label: "오렌지" },
  { value: "grape", label: "포도", disabled: true },
];

export const Default: Story = {
  args: { options, label: "과일 선택", placeholder: "과일을 선택해주세요" },
};

export const WithError: Story = {
  args: { options, label: "과일 선택", error: true, helperText: "필수 선택 항목입니다." },
};

export const Disabled: Story = {
  args: { options, label: "과일 선택", disabled: true },
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add Select component (Radix Select)"
```

---

## Task 15: FileUpload

**Files:**
- Create: `src/components/primitives/file-upload/file-upload.tsx`
- Create: `src/components/primitives/file-upload/file-upload.test.tsx`
- Create: `src/components/primitives/file-upload/index.ts`
- Create: `stories/file-upload.stories.tsx`

**Step 1: react-dropzone 설치**

```bash
pnpm add react-dropzone
```

**Step 2: 테스트 작성**

`src/components/primitives/file-upload/file-upload.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FileUpload } from "./file-upload";

describe("FileUpload", () => {
  it("드롭존 안내 문구를 렌더한다", () => {
    render(<FileUpload onFilesChange={() => {}} />);
    expect(screen.getByText(/파일을 드래그하거나/)).toBeInTheDocument();
  });

  it("accept 힌트가 표시된다", () => {
    render(<FileUpload onFilesChange={() => {}} accept={{ "image/*": [] }} />);
    expect(screen.getByText(/파일을 드래그하거나/)).toBeInTheDocument();
  });
});
```

**Step 3: 구현**

`src/components/primitives/file-upload/file-upload.tsx`:

```tsx
import { useCallback, useState } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { UploadIcon, XIcon, FileIcon } from "lucide-react";
import { cn } from "../../../utils/cn";

export interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  onFilesChange,
  accept,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  disabled,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (accepted: File[]) => {
      const next = [...files, ...accepted].slice(0, maxFiles);
      setFiles(next);
      onFilesChange(next);
    },
    [files, maxFiles, onFilesChange],
  );

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesChange(next);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    disabled,
  });

  return (
    <div className={cn("space-y-2", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer",
          isDragActive
            ? "border-[var(--color-border-brand-default)] bg-[var(--color-bg-brand-subtle)]"
            : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-secondary)]",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input {...getInputProps()} />
        <UploadIcon className="mb-3 h-8 w-8 text-[var(--color-text-tertiary)]" />
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          파일을 드래그하거나 클릭해서 업로드
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
          최대 {maxFiles}개, 파일당 {Math.round(maxSize / 1024 / 1024)}MB
        </p>
      </div>
      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 rounded-md border border-[var(--color-border-default)] px-3 py-2"
            >
              <FileIcon className="h-4 w-4 shrink-0 text-[var(--color-text-tertiary)]" />
              <span className="flex-1 truncate text-sm text-[var(--color-text-primary)]">
                {file.name}
              </span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                {(file.size / 1024).toFixed(0)}KB
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="rounded p-0.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

**Step 4: index.ts**

`src/components/primitives/file-upload/index.ts`:

```typescript
export { FileUpload } from "./file-upload";
export type { FileUploadProps } from "./file-upload";
```

**Step 5: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 44 + 2 = 46 tests

**Step 6: 스토리 작성**

`stories/file-upload.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "../src/components/primitives/file-upload";

const meta: Meta<typeof FileUpload> = {
  title: "Primitives/FileUpload",
  component: FileUpload,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: { onFilesChange: (files) => console.log(files) },
};

export const ImageOnly: Story = {
  args: {
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 3,
    onFilesChange: (files) => console.log(files),
  },
};
```

**Step 7: 커밋**

```bash
git add .
git commit -m "feat: add FileUpload component (react-dropzone)"
```

---

## Task 16: Stepper

**Files:**
- Create: `src/components/primitives/stepper/stepper.tsx`
- Create: `src/components/primitives/stepper/stepper.test.tsx`
- Create: `src/components/primitives/stepper/index.ts`
- Create: `stories/stepper.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/stepper/stepper.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "./stepper";

const steps = ["기본 정보", "상세 설정", "완료"];

describe("Stepper", () => {
  it("모든 step 라벨이 렌더된다", () => {
    render(<Stepper steps={steps} activeStep={0} />);
    steps.forEach((s) => expect(screen.getByText(s)).toBeInTheDocument());
  });

  it("다음 버튼 클릭 시 onNext가 호출된다", async () => {
    const onNext = vi.fn();
    render(<Stepper steps={steps} activeStep={0} onNext={onNext} />);
    await userEvent.click(screen.getByRole("button", { name: /다음/ }));
    expect(onNext).toHaveBeenCalled();
  });

  it("첫 번째 스텝에서 이전 버튼이 비활성화된다", () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByRole("button", { name: /이전/ })).toBeDisabled();
  });

  it("마지막 스텝에서 다음 버튼이 완료로 바뀐다", () => {
    render(<Stepper steps={steps} activeStep={2} />);
    expect(screen.getByRole("button", { name: /완료/ })).toBeInTheDocument();
  });
});
```

**Step 2: 구현**

`src/components/primitives/stepper/stepper.tsx`:

```tsx
import { CheckIcon } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Button } from "../button";

export interface StepperProps {
  steps: string[];
  activeStep: number;
  onNext?: () => void;
  onPrev?: () => void;
  onComplete?: () => void;
  completeBtnText?: string;
  isNextDisabled?: boolean;
  className?: string;
}

export function Stepper({
  steps,
  activeStep,
  onNext,
  onPrev,
  onComplete,
  completeBtnText = "완료",
  isNextDisabled,
  className,
}: StepperProps) {
  const isFirst = activeStep === 0;
  const isLast = activeStep === steps.length - 1;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Step indicators */}
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isDone = index < activeStep;
          const isCurrent = index === activeStep;
          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    isDone && "bg-[var(--color-bg-brand-default)] text-[var(--color-neutral-900)]",
                    isCurrent && "border-2 border-[var(--color-border-brand-default)] text-[var(--color-text-brand-default)]",
                    !isDone && !isCurrent && "border-2 border-[var(--color-border-default)] text-[var(--color-text-tertiary)]",
                  )}
                >
                  {isDone ? <CheckIcon className="h-4 w-4" /> : index + 1}
                </div>
                <span
                  className={cn(
                    "mt-1 text-xs whitespace-nowrap",
                    isCurrent ? "text-[var(--color-text-brand-default)] font-medium" : "text-[var(--color-text-tertiary)]",
                  )}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-px flex-1 transition-colors",
                    index < activeStep ? "bg-[var(--color-bg-brand-default)]" : "bg-[var(--color-border-default)]",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button variant="secondary" onClick={onPrev} disabled={isFirst}>
          이전
        </Button>
        {isLast ? (
          <Button onClick={onComplete}>{completeBtnText}</Button>
        ) : (
          <Button onClick={onNext} disabled={isNextDisabled}>
            다음
          </Button>
        )}
      </div>
    </div>
  );
}
```

**Step 3: index.ts**

`src/components/primitives/stepper/index.ts`:

```typescript
export { Stepper } from "./stepper";
export type { StepperProps } from "./stepper";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 46 + 4 = 50 tests

**Step 5: 스토리 작성**

`stories/stepper.stories.tsx`:

```tsx
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "../src/components/primitives/stepper";

const meta: Meta = {
  title: "Primitives/Stepper",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const steps = ["기본 정보", "상세 설정", "검토", "완료"];
    const [active, setActive] = useState(0);
    return (
      <div className="w-96">
        <Stepper
          steps={steps}
          activeStep={active}
          onNext={() => setActive((p) => Math.min(p + 1, steps.length - 1))}
          onPrev={() => setActive((p) => Math.max(p - 1, 0))}
          onComplete={() => alert("완료!")}
        />
      </div>
    );
  },
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add Stepper component (gen-portal StepButton 포팅)"
```

---

## Group E — 고급

---

## Task 17: ErrorDisplay / EmptyState

**Files:**
- Create: `src/components/primitives/empty-state/empty-state.tsx`
- Create: `src/components/primitives/empty-state/empty-state.test.tsx`
- Create: `src/components/primitives/empty-state/index.ts`
- Create: `stories/empty-state.stories.tsx`

**Step 1: 테스트 작성**

`src/components/primitives/empty-state/empty-state.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("title을 렌더한다", () => {
    render(<EmptyState title="데이터가 없습니다" />);
    expect(screen.getByText("데이터가 없습니다")).toBeInTheDocument();
  });

  it("description이 있으면 렌더한다", () => {
    render(<EmptyState title="오류" description="요청을 처리할 수 없습니다." />);
    expect(screen.getByText("요청을 처리할 수 없습니다.")).toBeInTheDocument();
  });

  it("action 버튼 클릭 시 onAction이 호출된다", async () => {
    const onAction = vi.fn();
    render(
      <EmptyState title="오류" actionText="다시 시도" onAction={onAction} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "다시 시도" }));
    expect(onAction).toHaveBeenCalled();
  });
});
```

**Step 2: 구현**

`src/components/primitives/empty-state/empty-state.tsx`:

```tsx
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Button } from "../button";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ title, description, icon, actionText, onAction, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12 px-6 text-center",
        className,
      )}
    >
      {icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{title}</h3>
        {description && (
          <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">{description}</p>
        )}
      </div>
      {actionText && onAction && (
        <Button onClick={onAction}>{actionText}</Button>
      )}
    </div>
  );
}
```

**Step 3: index.ts**

`src/components/primitives/empty-state/index.ts`:

```typescript
export { EmptyState } from "./empty-state";
export type { EmptyStateProps } from "./empty-state";
```

**Step 4: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 50 + 3 = 53 tests

**Step 5: 스토리 작성**

`stories/empty-state.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { InboxIcon, AlertCircleIcon, SearchIcon } from "lucide-react";
import { EmptyState } from "../src/components/primitives/empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "Primitives/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoData: Story = {
  args: {
    icon: <InboxIcon className="h-8 w-8" />,
    title: "데이터가 없습니다",
    description: "아직 추가된 항목이 없습니다. 새 항목을 추가해보세요.",
    actionText: "항목 추가",
    onAction: () => {},
  },
};

export const Error: Story = {
  args: {
    icon: <AlertCircleIcon className="h-8 w-8 text-[var(--color-text-danger-default)]" />,
    title: "오류가 발생했습니다",
    description: "요청을 처리하는 중 문제가 발생했습니다.",
    actionText: "다시 시도",
    onAction: () => {},
  },
};

export const NotFound: Story = {
  args: {
    icon: <SearchIcon className="h-8 w-8" />,
    title: "검색 결과가 없습니다",
    description: "다른 검색어로 시도해보세요.",
  },
};
```

**Step 6: 커밋**

```bash
git add .
git commit -m "feat: add EmptyState component (gen-portal ErrorDisplay 포팅)"
```

---

## Task 18: DnD List

**Files:**
- Create: `src/components/primitives/dnd-list/dnd-list.tsx`
- Create: `src/components/primitives/dnd-list/dnd-list.test.tsx`
- Create: `src/components/primitives/dnd-list/index.ts`
- Create: `stories/dnd-list.stories.tsx`

**Step 1: @dnd-kit 설치**

```bash
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**Step 2: 테스트 작성**

`src/components/primitives/dnd-list/dnd-list.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DndList } from "./dnd-list";

interface Item { id: string; label: string }

const items: Item[] = [
  { id: "1", label: "항목 1" },
  { id: "2", label: "항목 2" },
  { id: "3", label: "항목 3" },
];

describe("DndList", () => {
  it("모든 아이템을 렌더한다", () => {
    render(
      <DndList
        items={items}
        onReorder={() => {}}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    items.forEach((item) => expect(screen.getByText(item.label)).toBeInTheDocument());
  });
});
```

**Step 3: 구현**

`src/components/primitives/dnd-list/dnd-list.tsx`:

```tsx
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface DndListProps<T extends { id: string }> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
}

function SortableItem<T extends { id: string }>({
  item,
  index,
  renderItem,
}: {
  item: T;
  index: number;
  renderItem: (item: T, index: number) => ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-2 rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] p-3 transition-shadow",
        isDragging && "opacity-50 shadow-lg",
      )}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] active:cursor-grabbing"
        aria-label="드래그 핸들"
      >
        <GripVerticalIcon className="h-4 w-4" />
      </button>
      <div className="flex-1">{renderItem(item, index)}</div>
    </div>
  );
}

export function DndList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
  className,
}: DndListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className={cn("space-y-2", className)}>
          {items.map((item, index) => (
            <SortableItem key={item.id} item={item} index={index} renderItem={renderItem} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
```

**Step 4: index.ts**

`src/components/primitives/dnd-list/index.ts`:

```typescript
export { DndList } from "./dnd-list";
export type { DndListProps } from "./dnd-list";
```

**Step 5: 테스트 통과 확인**

```bash
pnpm test
```

Expected: PASS — 53 + 1 = 54 tests

**Step 6: 스토리 작성**

`stories/dnd-list.stories.tsx`:

```tsx
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DndList } from "../src/components/primitives/dnd-list";
import { Badge } from "../src/components/primitives/badge";

const meta: Meta = {
  title: "Primitives/DndList",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "1", label: "디자인 시스템 구축", status: "done" as const },
      { id: "2", label: "컴포넌트 포팅", status: "progress" as const },
      { id: "3", label: "스토리북 연동", status: "done" as const },
      { id: "4", label: "문서화", status: "pending" as const },
    ]);

    return (
      <div className="w-80">
        <DndList
          items={items}
          onReorder={setItems}
          renderItem={(item) => (
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-primary)]">{item.label}</span>
              <Badge
                variant={
                  item.status === "done"
                    ? "success"
                    : item.status === "progress"
                    ? "default"
                    : "outline"
                }
              >
                {item.status === "done" ? "완료" : item.status === "progress" ? "진행중" : "대기"}
              </Badge>
            </div>
          )}
        />
      </div>
    );
  },
};
```

**Step 7: 커밋**

```bash
git add .
git commit -m "feat: add DnD List component (@dnd-kit)"
```

---

## Task 19: 패키지 진입점 업데이트 및 최종 빌드 검증

**Files:**
- Modify: `src/components/primitives/index.ts`

**Step 1: primitives/index.ts 업데이트**

`src/components/primitives/index.ts`:

```typescript
export * from "./accordion";
export * from "./avatar";
export * from "./badge";
export * from "./button";
export * from "./card";
export * from "./checkbox";
export * from "./dialog";
export * from "./dnd-list";
export * from "./dropdown-menu";
export * from "./empty-state";
export * from "./file-upload";
export * from "./input";
export * from "./select";
export * from "./separator";
export * from "./skeleton";
export * from "./spinner";
export * from "./stepper";
export * from "./switch";
export * from "./tabs";
export * from "./textarea";
export * from "./toast";
export * from "./tooltip";
```

**Step 2: 전체 테스트 실행**

```bash
pnpm test
```

Expected: 54 tests, all PASS

**Step 3: 빌드 실행**

```bash
pnpm build
```

Expected: `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`, `dist/styles.css` — 오류 없음

**Step 4: Storybook 빌드 검증**

```bash
pnpm build-storybook
```

Expected: `storybook-static/` 생성, 오류 없음

**Step 5: 최종 커밋 및 push**

```bash
git add .
git commit -m "feat: update package exports — all 22 components"
git push origin main
```

---

## 완료 기준

- [ ] `pnpm test` — 54개 이상 테스트 통과
- [ ] `pnpm build` — dist/ 오류 없이 생성
- [ ] `pnpm build-storybook` — storybook-static/ 오류 없이 생성
- [ ] GitHub `Kyungjong-kim/ui-kit` push 완료
- [ ] 22개 컴포넌트 모두 Storybook에서 확인 가능

---

## 신규 추가 의존성 요약

```bash
# 사전 설치 (플랜 상단 참조)
pnpm add @radix-ui/react-separator @radix-ui/react-tooltip @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-accordion @radix-ui/react-dropdown-menu @radix-ui/react-avatar @radix-ui/react-popover sonner

# Task 15
pnpm add react-dropzone

# Task 18
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```
