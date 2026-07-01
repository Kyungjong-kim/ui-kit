# Alert

인라인 경고 배너. variant(info/success/warning/danger)별 색·아이콘을 표시하고 제목·설명과 선택적 닫기 버튼을 제공한다. `role="alert"`로 렌더된다.

## Import

```ts
import { Alert } from "ui-kit";
import type { AlertProps, AlertVariant } from "ui-kit";
```

## Props (`AlertProps`)

`title`을 제외한 표준 `<div>` 속성(`HTMLAttributes<HTMLDivElement>`)을 상속한다.

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `variant` | `"info" \| "success" \| "warning" \| "danger"` | `"info"` | 상태 톤(색·기본 아이콘) |
| `title` | `ReactNode` | — | 경고 제목 |
| `description` | `ReactNode` | — | 상세 설명 |
| `icon` | `ReactNode` | variant 기본 아이콘 | 아이콘 대체. `null`이면 아이콘 숨김 |
| `dismissible` | `boolean` | `false` | 우상단 닫기 버튼 표시 |
| `onDismiss` | `() => void` | — | 닫기 버튼 클릭 콜백 |
| `children` | `ReactNode` | — | 제목·설명 아래 추가 콘텐츠 |

## 기본 사용

```tsx
<Alert variant="info" title="안내" description="변경 사항이 저장되었습니다." />

<Alert
  variant="danger"
  title="저장 실패"
  description="네트워크 연결을 확인해주세요."
  dismissible
  onDismiss={handleClose}
/>

{/* 아이콘 숨김 + 커스텀 콘텐츠 */}
<Alert variant="warning" icon={null} title="주의">
  <Button size="sm" variant="ghost">자세히 보기</Button>
</Alert>
```

## 동작 노트

- variant별 기본 아이콘(원형 info/체크/삼각 경고/x)이 자동 표시된다. `icon`에 노드를 주면 대체하고, `icon={null}`이면 아이콘 영역을 숨긴다.
- `dismissible`일 때만 우상단 닫기 버튼이 렌더되며 클릭 시 `onDismiss`를 호출한다(상태는 호출부가 관리).
- `title`·`description` 외에 `children`으로 액션 버튼 등을 자유롭게 넣을 수 있다.

## When to use

- 화면에 **지속적으로 남아야 하는** 상태·경고(폼 검증 요약, 배너 공지 등).
- 잠깐 떴다 사라지는 비파괴 알림은 [Toast](./toast.md), 흐름을 막는 확인이 필요하면 [Dialog](../overlay/overlay.md)를 쓴다.

## 접근성

- 루트에 `role="alert"`가 지정되어 스크린리더가 즉시 읽는다.
- variant 아이콘은 `aria-hidden`(장식). 의미는 `title`/`description` 텍스트로 전달한다.
- 닫기 버튼에는 `aria-label="닫기"`가 지정된다.
