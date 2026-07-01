# Button

액션을 트리거하는 기본 버튼. `asChild`로 임의 요소(링크 등)에 스타일을 위임할 수 있고, `loading` 상태에서 스피너를 표시한다.

## Import

```ts
import { Button } from "ui-kit";
import type { ButtonProps } from "ui-kit";
```

## Props

`ButtonProps`는 표준 `<button>` 속성(`ButtonHTMLAttributes`)을 모두 상속한다.

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "destructive"` | `"primary"` | 시각적 스타일 |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 크기 |
| `asChild` | `boolean` | `false` | `true`면 자식 요소에 스타일을 병합(Radix Slot). 단일 자식 요구 |
| `loading` | `boolean` | `false` | 스피너 표시 + `disabled` + `aria-busy` |
| `disabled` | `boolean` | — | 비활성. `loading`이 `true`여도 disabled 처리됨 |

## 기본 사용

```tsx
<Button onClick={handleSave}>저장</Button>

<Button variant="secondary" size="sm">취소</Button>

<Button loading>처리 중</Button>

<Button variant="destructive">삭제</Button>

{/* asChild — 링크로 렌더 */}
<Button asChild variant="ghost">
  <a href="/docs">문서 보기</a>
</Button>
```

## variant × size 매트릭스

| | sm | md | lg |
|---|---|---|---|
| **primary** | ✅ | ✅ | ✅ |
| **secondary** | ✅ | ✅ | ✅ |
| **ghost** | ✅ | ✅ | ✅ |
| **destructive** | ✅ | ✅ | ✅ |

- `primary` — 채워진 브랜드 배경 + 그림자. 화면당 1개 주요 액션.
- `secondary` — 테두리 + 중립 배경. 보조 액션.
- `ghost` — 배경 없음, hover 시만 강조. 밀집 영역·아이콘 인접 액션.
- `destructive` — 파괴적/되돌릴 수 없는 액션(삭제 등).

크기별 높이는 `h-size-control-sm|md|lg` 토큰을 사용한다.

## When to use

- 폼 제출·모달 확인 등 **즉시 실행되는 액션**에 사용.
- 화면 전환만이 목적이면 링크 시맨틱이 맞다 — `asChild`로 `<a>`를 감싸 버튼 룩을 유지하되 시맨틱은 앵커로 둔다.

## 접근성

- 비활성/로딩 시 `disabled` + `aria-busy={loading}`가 자동 적용된다.
- `focus-visible` 상태에서 `var(--color-border-focus)` 포커스 링이 표시된다.
- 아이콘 전용 버튼이면 `aria-label`을 직접 전달해 접근 가능한 이름을 보장한다.
