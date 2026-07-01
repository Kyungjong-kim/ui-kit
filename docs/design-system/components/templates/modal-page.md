# ModalPageTemplate

모달 페이지 템플릿. `Modal`(organisms)을 감싸 헤더(제목·닫기) + 본문 + 푸터(액션)의 표준 레이아웃을 제공하는 페이지 래퍼다. 확인·입력 폼 등 중앙 정렬 다이얼로그 화면 구성에 사용한다.

## Import

```ts
import { ModalPageTemplate } from "ui-kit";
import type { ModalPageTemplateProps } from "ui-kit";
```

## Props (`ModalPageTemplateProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `open` | `boolean` | — | 열림 상태(controlled) |
| `onClose` | `() => void` | — | 닫기 요청 콜백 |
| `title` | `string` | — | 헤더 타이틀 |
| `children` | `ReactNode` | — | 본문 콘텐츠. Modal의 `content`로 전달 |
| `footer` | `ReactNode` | — | 하단 액션 슬롯. Modal의 `primaryAction`으로 전달 |

## 기본 사용

```tsx
const [open, setOpen] = useState(false);

<ModalPageTemplate
  open={open}
  onClose={() => setOpen(false)}
  title="삭제 확인"
  footer={<Button variant="destructive" onClick={confirm}>삭제</Button>}
>
  정말 삭제하시겠습니까?
</ModalPageTemplate>
```

## 동작 노트

- 완전한 controlled 컴포넌트다. `open`으로 표시를 제어하고, 내부 닫기 요청은 `onClose`로 전달된다(`Modal`의 `onOpenChange(false)` → `onClose()`).
- `children`은 `Modal`의 `content`, `footer`는 `primaryAction` 슬롯에 매핑된다.
- 오버레이·중앙 정렬·포커스 트랩 등 세부 동작은 `Modal`을 따른다.

## When to use

- 중앙 정렬 확인·입력 다이얼로그 → `ModalPageTemplate`.
- 컨텍스트 유지 보조 패널 → [SidePanelPageTemplate](./side-panel-page.md).
- 화면 전체 오버레이 → [FullScreenDialogPageTemplate](./full-screen-dialog-page.md).
