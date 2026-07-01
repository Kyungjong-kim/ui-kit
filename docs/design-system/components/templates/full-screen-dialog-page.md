# FullScreenDialogPageTemplate

전체화면 다이얼로그 페이지 템플릿. `FullScreenDialog`(organisms)를 감싸 상단바(제목·액션·닫기) + 스크롤 본문 + 푸터의 전체화면 표준 레이아웃을 제공하는 페이지 래퍼다. 긴 폼·문서 뷰어 등 화면 전체가 필요한 오버레이 화면 구성에 사용한다.

## Import

```ts
import { FullScreenDialogPageTemplate } from "ui-kit";
import type { FullScreenDialogPageTemplateProps } from "ui-kit";
```

## Props (`FullScreenDialogPageTemplateProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `open` | `boolean` | — | 열림 상태(controlled) |
| `onClose` | `() => void` | — | 닫기 요청 콜백 |
| `title` | `string` | — | 상단바 타이틀 |
| `headerActions` | `ReactNode` | — | 상단바 우측 액션 슬롯(닫기 버튼 왼쪽) |
| `children` | `ReactNode` | — | 스크롤되는 본문 콘텐츠 |
| `footer` | `ReactNode` | — | 하단 고정 푸터(액션 등) |

## 기본 사용

```tsx
const [open, setOpen] = useState(false);

<FullScreenDialogPageTemplate
  open={open}
  onClose={() => setOpen(false)}
  title="문서 편집"
  headerActions={<Button variant="secondary">미리보기</Button>}
  footer={<Button onClick={save}>저장</Button>}
>
  <LongForm />
</FullScreenDialogPageTemplate>
```

## 동작 노트

- 완전한 controlled 컴포넌트다. `open`으로 표시를 제어하고, 내부 닫기 요청은 `onClose`로 전달된다(`FullScreenDialog`의 `onOpenChange(false)` → `onClose()`).
- `headerActions`는 상단바 닫기 버튼 왼쪽에 놓인다.
- 본문 스크롤·상단바·포커스 트랩 등 세부 동작은 `FullScreenDialog`를 따른다.

## When to use

- 긴 폼·문서 뷰어 등 화면 전체를 덮어야 하는 오버레이 → `FullScreenDialogPageTemplate`.
- 중앙 정렬 확인·입력 → [ModalPageTemplate](./modal-page.md).
- 컨텍스트 유지 보조 패널 → [SidePanelPageTemplate](./side-panel-page.md).
