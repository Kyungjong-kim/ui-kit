# PageHeader

페이지 상단 헤더 바. 제목을 중심으로 좌측 선행/후행 슬롯과 우측 액션 슬롯을 배치하며, 로딩 중에는 제목 스켈레톤을 표시한다.

## Import

```ts
import { PageHeader } from "ui-kit";
import type { PageHeaderProps } from "ui-kit";
```

## Props (`PageHeaderProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `title` | `string` | — (필수) | 제목 텍스트. `titleElement` 미지정 시 사용 |
| `titleElement` | `ReactNode` | — | 제목 영역을 커스텀 노드로 대체 |
| `leftLeadingElement` | `ReactNode` | — | 제목 앞 슬롯(예: 뒤로가기) |
| `leftLeadingIcon` | `IconName` | — | 제목 앞 아이콘(`size="lg"`) |
| `leftTrailingButton` | `ReactNode` | — | 제목 뒤 슬롯 |
| `rightLeadingButton` | `ReactNode` | — | 우측 첫 번째 액션 |
| `rightTrailingButton` | `ReactNode` | — | 우측 두 번째 액션 |
| `roundedStyle` | `boolean` | — | 상단 모서리 둥글게(`rounded-t-md`) |
| `isLoading` | `boolean` | — | 제목 자리에 스켈레톤 표시 |

## 기본 사용

```tsx
<PageHeader title="대시보드" />

<PageHeader
  leftLeadingIcon="arrowLeft"
  title="상세"
  rightTrailingButton={<Button size="sm">편집</Button>}
/>

{/* 액션 2개 + 로딩 */}
<PageHeader
  title="목록"
  isLoading={isFetching}
  rightLeadingButton={<Button variant="secondary" size="sm">필터</Button>}
  rightTrailingButton={<Button size="sm">새로 만들기</Button>}
/>

{/* 제목 커스텀 */}
<PageHeader
  title="문서"
  titleElement={<EditableTitle value={name} onChange={setName} />}
/>
```

## 동작 노트

- `isLoading`이 `true`면 제목 자리에 `TextSkeleton`이 표시된다.
- `titleElement`가 있으면 그것이 우선 렌더되고, 없으면 `title`이 `typography-headline-sm`으로 표시된다.
- 우측 슬롯은 `rightLeadingButton` → `rightTrailingButton` 순으로 가로 배치된다.

## When to use

- 라우트/뷰 단위의 상단 타이틀 바에 사용. 좌측엔 컨텍스트(뒤로가기·아이콘), 우측엔 페이지 액션을 배치한다.
- 섹션 내부의 작은 제목이라면 텍스트 컴포넌트로 충분하다 — PageHeader는 페이지 레벨에 둔다.

## 접근성

- 시맨틱 `<header>`로 렌더된다.
- `leftLeadingElement`/우측 슬롯에 아이콘 전용 버튼을 넣을 경우 해당 버튼에 `aria-label`을 직접 부여한다.
- 로딩 스켈레톤은 시각적 placeholder이므로, 로딩 상태를 보조기기에 알릴 필요가 있으면 상위에서 live region 처리한다.
