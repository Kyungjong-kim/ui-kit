# Toast

비차단(non-blocking) 일시 알림. `Toaster`(렌더 컨테이너)와 `toast`(호출 함수)로 구성된다. 내부적으로 `sonner` 위에 토큰 스타일을 입혔다.

## Import

```ts
import { Toaster, toast } from "ui-kit";
import type { ToasterProps } from "ui-kit";
```

## 구성

| export | 역할 |
|---|---|
| `Toaster` | 앱 루트에 1회 마운트하는 토스트 렌더 컨테이너 |
| `toast` | 어디서든 호출해 토스트를 띄우는 함수(`sonner`의 `toast` 재노출) |

### `ToasterProps`

`sonner` `Toaster`의 props 타입(`ComponentProps<typeof Sonner>`)을 그대로 재노출한다. 기본 테마는 `light`, 토스트 스타일은 디자인 토큰(`var(--color-bg-primary)`, `var(--color-border-default)`, `var(--token-radius-sm)` 등)으로 고정 적용된다. `position`, `richColors`, `expand` 등 sonner 옵션을 그대로 전달할 수 있다.

## 기본 사용

루트에 한 번 마운트:

```tsx
// 앱 루트 (예: App.tsx)
import { Toaster } from "ui-kit";

export function App() {
  return (
    <>
      {/* ...앱... */}
      <Toaster position="top-right" />
    </>
  );
}
```

호출:

```tsx
import { toast } from "ui-kit";

toast("저장되었습니다");
toast.success("업로드 완료");
toast.error("요청에 실패했습니다");
toast.promise(saveData(), {
  loading: "저장 중...",
  success: "저장 완료",
  error: "저장 실패",
});
```

## When to use

- 사용자 행동에 대한 **짧은 비차단 피드백**(저장됨·복사됨·실패함).
- 사용자의 확인/결정이 필요하거나 흐름을 멈춰야 하면 토스트가 아니라 [Dialog](../overlay/overlay.md)를 쓴다.
- 지속적으로 보여야 하는 상태는 토스트로 두지 않는다 — 인라인 [Badge](../data-display/badge-chip-tag.md)나 배너로 표현한다.

## 접근성

- `sonner` 기반으로 토스트는 ARIA live region을 통해 스크린리더에 자동 announce 된다.
- 에러처럼 중요한 메시지는 색상에만 의존하지 말고 명확한 텍스트를 담는다.
- 짧은 자동 소멸 시간은 인지 부담을 줄 수 있어, 액션이 동반되면 `toast`에 action 옵션을 전달하거나 지속 시간을 늘린다.
