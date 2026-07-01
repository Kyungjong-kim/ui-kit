# ListPageTemplate

목록형 페이지의 레이아웃 골격. [PageHeader](../molecules/heading/page-header.md)(제목·액션) + `ListControl`(개수·검색·정렬·필터) + [DataTable](../organisms/tables/data-table.md)(목록)을 세로로 조합한다. 필터·검색·정렬·액션은 슬롯 props로 주입하고, 컬럼·데이터는 `DataTable`에 그대로 전달한다.

## Import

```ts
import { ListPageTemplate } from "ui-kit";
import type { ListPageTemplateProps } from "ui-kit";
import type { ColumnDef } from "@tanstack/react-table";
```

## Props (`ListPageTemplateProps<TData>`)

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
| `columns` | `ColumnDef<TData, unknown>[]` | — | DataTable 컬럼 정의 |
| `data` | `TData[]` | — | DataTable 행 데이터 |
| `getRowId` | `(row: TData, index: number) => string` | — | 행 고유 id 도출. DataTable에 전달 |
| `enableSorting` | `boolean` | — | 헤더 클릭 정렬 활성 |
| `pageSize` | `number` | — | 지정 시 페이지네이션 활성 |
| `loading` | `boolean` | — | 로딩 중 스켈레톤 표시 |
| `emptyContent` | `ReactNode` | — | 빈 데이터 시 렌더할 콘텐츠. DataTable에 전달 |
| `className` | `string` | — | 루트에 병합 |

## 기본 사용

```tsx
const columns: ColumnDef<User, unknown>[] = [
  { accessorKey: "name", header: "이름" },
  { accessorKey: "email", header: "이메일" },
];

<ListPageTemplate
  title="사용자"
  count={users.length}
  headerActions={<Button>추가</Button>}
  search={<Input placeholder="검색" />}
  columns={columns}
  data={users}
  getRowId={(row) => row.id}
  enableSorting
  pageSize={10}
/>
```

## 동작 노트

- `count`·`search`·`sort`·`filter` 중 하나라도 있으면 `ListControl`이 렌더된다. 모두 없으면 컨트롤 영역이 생략된다.
- `loading`은 PageHeader(`isLoading`)와 DataTable(`loading`)에 동시에 전달된다.
- 컬럼·데이터·정렬·페이지네이션·빈 상태의 세부 동작은 [DataTable](../organisms/tables/data-table.md)을 따른다.

## When to use

- 검색·정렬·필터가 붙는 표준 목록 화면 → `ListPageTemplate`.
- 행 선택 + 일괄 액션이 필요하면 → [BulkActionListPageTemplate](./bulk-action-list-page.md).
- 표 대신 카드 그리드로 보여주려면 → [DataItemsLayout](./data-items-layout.md).
