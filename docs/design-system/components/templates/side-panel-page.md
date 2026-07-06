# SidePanelPageTemplate

측면 패널 페이지 템플릿. `SidePanel`(organisms)을 감싸 헤더(제목·닫기) + 스크롤 본문 + 푸터(액션)의 표준 레이아웃을 제공하는 페이지 래퍼다. 필터·상세보기·설정 등 컨텍스트를 유지하는 보조 화면 구성에 사용한다.

## Import

```ts
import { SidePanelPageTemplate } from "ui-kit";
import type { SidePanelPageTemplateProps } from "ui-kit";
```

## Props (`SidePanelPageTemplateProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `open` | `boolean` | — | 열림 상태(controlled) |
| `onClose` | `() => void` | — | 닫기 요청 콜백 |
| `title` | `string` | — | 헤더 타이틀 |
| `children` | `ReactNode` | — | 스크롤되는 본문 콘텐츠 |
| `footer` | `ReactNode` | — | 하단 고정 푸터(액션 버튼 등) |

## 기본 사용

```tsx
const [open, setOpen] = useState(false);

<SidePanelPageTemplate
  open={open}
  onClose={() => setOpen(false)}
  title="상세 정보"
  footer={<Button onClick={save}>저장</Button>}
>
  <DetailFields />
</SidePanelPageTemplate>
```

## 동작 노트

- 완전한 controlled 컴포넌트다. `open`으로 표시를 제어하고, 배경 클릭·ESC 등 내부 닫기 요청은 `onClose`로 전달된다(`SidePanel`의 `onOpenChange(false)` → `onClose()`).
- 오버레이·애니메이션·포커스 트랩 등 세부 동작은 `SidePanel`을 따른다.

## When to use

- 목록 옆에서 컨텍스트를 유지한 채 상세·필터·설정을 보여줄 때 → `SidePanelPageTemplate`.
- 흐름을 막는 중앙 확인·입력 → [ModalPageTemplate](./modal-page.md).
- 화면 전체가 필요한 긴 폼·뷰어 → [FullScreenDialogPageTemplate](./full-screen-dialog-page.md).
