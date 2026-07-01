# Textarea

여러 줄 텍스트 입력. Input과 동일한 라벨·헬퍼·에러 패턴에 더해 리사이즈 방향을 제어한다.

## Import

```ts
import { Textarea } from "ui-kit";
import type { TextareaProps } from "ui-kit";
```

## Props

`TextareaProps`는 표준 `<textarea>` 속성을 상속한다.

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 패딩·타이포 |
| `label` | `string` | — | 위에 표시되는 라벨, 자동 연결 |
| `error` | `boolean` | `false` | 에러 상태 (danger 토큰) |
| `helperText` | `string` | — | 하단 보조/에러 문구 |
| `resize` | `"none" \| "vertical" \| "horizontal" \| "both"` | `"vertical"` | 사용자 리사이즈 방향 |
| `rows` | `number` | `4` | 기본 표시 행 수 |
| `id` | `string` | 자동 생성 | 미지정 시 `useId` |

## 기본 사용

```tsx
<Textarea label="설명" placeholder="내용을 입력하세요" rows={5} />

<Textarea
  label="메모"
  error
  helperText="500자 이내로 입력하세요."
/>

<Textarea resize="none" placeholder="고정 크기" />
```

## size 매트릭스

| size | 패딩 | 용도 |
|---|---|---|
| `sm` | `px-inline-sm py-stack-xs` | 밀집 폼 |
| `md` | `px-inline-md py-stack-sm` | 표준 (기본) |
| `lg` | `px-inline-lg py-stack-md` | 긴 본문 입력 |

`resize` 옵션은 `none` / `vertical`(기본) / `horizontal` / `both`.

## When to use

- 두 줄 이상이 예상되는 자유 서술형 입력(코멘트·설명·메모).
- 한 줄이면 [Input](./input.md)을 사용한다.

## 접근성

- `label`은 `htmlFor` ↔ `id`로 자동 연결된다.
- 가로 리사이즈는 좁은 뷰포트에서 레이아웃을 깨뜨릴 수 있어 기본값을 `vertical`로 둔다.
- 포커스 시 `var(--color-border-focus)` 링이 적용된다.
