# DataItemsLayout

카드형 목록 페이지의 레이아웃 골격. [PageHeader](../molecules/heading/page-header.md)(제목·액션) + `ListControl`(개수·검색·정렬·필터) + `DataItemsTable`(카드 그리드)을 세로로 조합한다. 표 대신 라벨-값 카드로 아이템을 보여주는 목록형 페이지에 사용한다.

## Import

```ts
import { DataItemsLayout } from "ui-kit";
import type { DataItemsLayoutProps, DataItemsField } from "ui-kit";
```

## Props (`DataItemsLayoutProps<T>`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `title` | `string` | — | 페이지 제목. PageHeader에 전달 |
| `leftLeadingIcon` | `PageHeaderProps["leftLeadingIcon"]` | — | 제목 좌측 리딩 아이콘 |
| `headerActions` | `ReactNode` | — | 헤더 우측 액션 버튼 슬롯 |
| `count` | `number` | — | 총 개수. ListControl "총 N건" 표시에 사용 |
| `countUnit` | `string` | `"건"` | 개수 라벨 접미사 |
| `search` | `ReactNode` | — | 검색 입력 슬롯(ListControl 좌측) |
| `sort` | `ReactNode` | — | 정렬 컨트롤 슬롯(ListControl 우측) |
| `filter` | `ReactNode` | — | 필터 컨트롤 슬롯(ListControl 우측) |
| `fields` | `DataItemsField<T>[]` | — | 카드 필드 정의(라벨-값). DataItemsTable에 전달 |
| `data` | `T[]` | — | 아이템 데이터 |
| `minCardWidth` | `number` | `260` (DataItemsTable 기본) | 카드 그리드 최소 컬럼 폭(px) |
| `emptyMessage` | `string` | `"데이터가 없습니다"` | 빈 데이터 안내 문구 |
| `loading` | `boolean` | — | 로딩 중 헤더 스켈레톤 표시 |
| `className` | `string` | — | 루트에 병합 |

### `DataItemsField<T>`

| 필드 | 타입 | 설명 |
|---|---|---|
| `key` | `string` | 필드 식별 키 |
| `label` | `ReactNode` | 카드에 표시할 라벨 |
| `render` | `(item: T, index: number) => ReactNode` | 값 커스터마이징(선택) |

## 기본 사용

```tsx
const fields: DataItemsField<Model>[] = [
  { key: "name", label: "이름", render: (m) => m.name },
  { key: "status", label: "상태", render: (m) => <Badge>{m.status}</Badge> },
];

<DataItemsLayout
  title="모델"
  count={models.length}
  fields={fields}
  data={models}
  minCardWidth={280}
/>
```

## 동작 노트

- `count`·`search`·`sort`·`filter` 중 하나라도 있으면 `ListControl`이 렌더된다.
- `loading`은 PageHeader(`isLoading`)에만 전달된다(카드 영역 자체 스켈레톤 없음).
- 카드 그리드는 `minCardWidth` 기준 반응형 auto-fill로 배치되며, 빈 데이터 시 `emptyMessage`를 중앙 표시한다.

## When to use

- 아이템을 라벨-값 카드로 훑어보는 목록 화면 → `DataItemsLayout`.
- 컬럼 정렬·행 선택이 필요한 표형 목록 → [ListPageTemplate](./list-page.md).
