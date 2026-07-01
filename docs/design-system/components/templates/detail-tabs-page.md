# DetailTabsPageTemplate

탭 기반 상세 페이지용 레이아웃 템플릿. 상단 [PageHeader](../molecules/heading/page-header.md)(제목·우측 액션 슬롯), 탭 목록([Tabs](../molecules/navigation/tabs.md)), 탭별 콘텐츠 영역으로 구성된다. 하나의 리소스를 여러 탭으로 나눠 보여주는 상세 화면의 뼈대로 사용한다.

## Import

```ts
import { DetailTabsPageTemplate } from "ui-kit";
import type { DetailTabsPageTemplateProps, DetailTabsPageTab } from "ui-kit";
```

## Props (`DetailTabsPageTemplateProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `title` | `string` | — | 상단 헤더 제목 |
| `tabs` | `DetailTabsPageTab[]` | — | 탭 정의 목록 |
| `defaultTab` | `string` | 첫 번째 탭의 `value` | 초기 활성 탭 값 |
| `headerActions` | `ReactNode` | — | 헤더 우측 액션 슬롯 |
| `className` | `string` | — | 루트에 병합 |

### `DetailTabsPageTab`

| 필드 | 타입 | 설명 |
|---|---|---|
| `label` | `string` | 탭 버튼 라벨 |
| `value` | `string` | 탭 식별 고유 값 |
| `content` | `ReactNode` | 탭 선택 시 표시할 콘텐츠 |

## 기본 사용

```tsx
<DetailTabsPageTemplate
  title="모델 상세"
  headerActions={<Button>편집</Button>}
  tabs={[
    { label: "개요", value: "overview", content: <Overview /> },
    { label: "버전", value: "versions", content: <Versions /> },
  ]}
/>
```

## 동작 노트

- `defaultTab` 미지정 시 `tabs[0].value`가 초기 활성 탭이 된다.
- 탭 목록은 헤더 아래, 콘텐츠는 `flex-1` + `overflow-y-auto`로 스크롤된다.
- 탭 전환·활성 상태 등 세부 동작은 [Tabs](../molecules/navigation/tabs.md)를 따른다.

## When to use

- 하나의 리소스를 개요·이력·설정 등 여러 탭으로 나눠 보여주는 상세 화면 → `DetailTabsPageTemplate`.
- 단일 폼 화면 → [FormPageTemplate](./form-page.md).
