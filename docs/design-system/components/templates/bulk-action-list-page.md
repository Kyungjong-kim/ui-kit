# BulkActionListPageTemplate

행 선택 + 일괄 액션이 있는 목록형 페이지 골격. [ListPageTemplate](./list-page.md) 패턴에 행 선택([DataTable](../organisms/tables/data-table.md) `enableRowSelection`)을 추가하고, 1개 이상 선택되면 선택 개수와 `bulkActions` 슬롯 버튼을 담은 액션 바를 노출한다. 선택 상태는 내부에서 관리하며, `bulkActions`는 선택된 행 배열을 인자로 받는다.

## Import

```ts
import { BulkActionListPageTemplate } from "ui-kit";
import type { BulkActionListPageTemplateProps } from "ui-kit";
import type { ColumnDef } from "@tanstack/react-table";
```

## Props (`BulkActionListPageTemplateProps<TData>`)

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
| `getRowId` | `(row: TData, index: number) => string` | — | 행 고유 id 도출. 선택 안정성을 위해 지정 권장 |
| `enableSorting` | `boolean` | — | 헤더 클릭 정렬 활성 |
| `pageSize` | `number` | — | 지정 시 페이지네이션 활성 |
| `loading` | `boolean` | — | 로딩 중 스켈레톤 표시 |
| `emptyContent` | `ReactNode` | — | 빈 데이터 시 렌더할 콘텐츠 |
| `bulkActions` | `(selectedRows: TData[]) => ReactNode` | — | 일괄 액션 바 슬롯. 1개 이상 선택 시 표시 |
| `selectionUnit` | `string` | `"개 선택됨"` | 선택 개수 라벨 접미사 |
| `className` | `string` | — | 루트에 병합 |

## 기본 사용

```tsx
<BulkActionListPageTemplate
  title="사용자"
  count={users.length}
  columns={columns}
  data={users}
  getRowId={(row) => row.id}
  bulkActions={(rows) => (
    <Button variant="destructive" onClick={() => deleteAll(rows)}>
      {rows.length}개 삭제
    </Button>
  )}
/>
```

## 동작 노트

- 항상 행 체크박스 선택이 켜진다(`enableRowSelection`). 선택 상태는 컴포넌트 내부 `useState`로 관리된다.
- 1개 이상 선택되면 `ListControl`과 `DataTable` 사이에 선택 개수 + `bulkActions` 버튼을 담은 액션 바가 표시된다.
- 선택 개수 라벨은 `N` + `selectionUnit` 형식이다(예: `3개 선택됨`).
- 선택 안정성을 위해 `getRowId` 지정을 권장한다.

## When to use

- 여러 행을 골라 한 번에 삭제·이동·상태 변경하는 목록 화면 → `BulkActionListPageTemplate`.
- 선택이 필요 없으면 → [ListPageTemplate](./list-page.md).
