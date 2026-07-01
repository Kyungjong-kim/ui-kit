# Tooltip

호버/포커스 시 보조 정보를 띄우는 말풍선. Radix Tooltip primitive를 단일 컴포넌트로 감싸 Provider·Trigger·Content·Arrow를 내부에서 처리한다.

## Import

```ts
import { Tooltip } from "ui-kit";
import type { TooltipProps } from "ui-kit";
```

## Props (`TooltipProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `children` | `ReactNode` | — (필수) | 트리거가 될 요소 (asChild로 감싸짐) |
| `content` | `ReactNode` | — (필수) | 말풍선 내용 |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | 표시 방향 |
| `align` | `"start" \| "center" \| "end"` | `"center"` | 정렬 |
| `delayDuration` | `number` | `300` | 표시 지연(ms) |

## 기본 사용

```tsx
<Tooltip content="저장하지 않고 닫기">
  <Button variant="ghost">닫기</Button>
</Tooltip>

<Tooltip content="추가 정보" side="right" align="start">
  <span aria-label="도움말">?</span>
</Tooltip>

<Tooltip content="즉시 표시" delayDuration={0}>
  <Button>호버</Button>
</Tooltip>
```

## When to use

- 아이콘 버튼의 의미 보충, 잘린 텍스트의 전체값, 짧은 힌트 등 **부가적·비필수 정보**에 사용.
- 필수 정보나 긴 설명은 툴팁에 두지 않는다 — 본문이나 [helperText](../../molecules/form/input.md)로 노출한다.
- 모바일/터치 환경에서는 호버가 없으므로 핵심 정보를 툴팁에만 의존하지 않는다.

## 접근성

- `children`은 `asChild`로 트리거에 병합되므로 **포커스 가능한 요소**(button 등)를 자식으로 둬야 키보드로도 툴팁이 뜬다.
- 트리거가 아이콘만 있는 요소라면 자식 자체에 `aria-label`을 부여한다.
- 말풍선은 inverse 배경/텍스트 토큰을 사용해 대비를 확보한다.
