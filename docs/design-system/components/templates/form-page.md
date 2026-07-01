# FormPageTemplate

폼 입력 페이지용 레이아웃 템플릿. 상단 [PageHeader](../molecules/heading/page-header.md)(제목·설명), 스크롤되는 폼 섹션 영역(children), 하단 고정 액션 바(저장·취소 버튼)로 구성된다. 생성·편집 등 단일 폼 화면의 뼈대로 사용한다.

## Import

```ts
import { FormPageTemplate } from "ui-kit";
import type { FormPageTemplateProps } from "ui-kit";
```

## Props (`FormPageTemplateProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `title` | `string` | — | 상단 헤더 제목 |
| `description` | `ReactNode` | — | 제목 아래 보조 설명 |
| `children` | `ReactNode` | — | 폼 본문 영역에 렌더할 섹션 콘텐츠 |
| `onSubmit` | `(event: FormEvent<HTMLFormElement>) => void` | — | 저장 버튼(submit) 핸들러 |
| `onCancel` | `() => void` | — | 취소 버튼 핸들러. 지정 시에만 취소 버튼 표시 |
| `isSubmitting` | `boolean` | `false` | 제출 중 여부. 저장 버튼 로딩 + 액션 비활성화 |
| `submitLabel` | `string` | `"저장"` | 저장 버튼 라벨 |
| `cancelLabel` | `string` | `"취소"` | 취소 버튼 라벨 |
| `className` | `string` | — | 루트 `<form>`에 병합 |

## 기본 사용

```tsx
<FormPageTemplate
  title="모델 생성"
  description="필수 정보를 입력하세요."
  onSubmit={handleSubmit}
  onCancel={() => router.back()}
  isSubmitting={isPending}
>
  <Input label="이름" />
  <Textarea label="설명" />
</FormPageTemplate>
```

## 동작 노트

- 루트가 `<form>`이며 저장 버튼은 `type="submit"`이라 엔터·버튼 클릭 모두 `onSubmit`을 발화한다.
- 본문 영역은 `flex-1` + `overflow-y-auto`로 스크롤되고, 헤더와 액션 바는 고정된다.
- `onCancel`이 있을 때만 취소 버튼(secondary)이 렌더된다. `isSubmitting`이면 취소 비활성화, 저장 버튼은 로딩 상태가 된다.

## When to use

- 생성·편집 등 단일 폼 화면 → `FormPageTemplate`.
- 폼을 모달·패널 안에서 띄우려면 → [ModalPageTemplate](./modal-page.md) / [SidePanelPageTemplate](./side-panel-page.md).
