# DataTable

[TanStack Table](https://tanstack.com/table) 기반 데이터 테이블. 컬럼 정의와 행 데이터를 받아 헤더·바디를 렌더하며, 정렬·페이지네이션·행 선택·로딩·빈 상태를 옵션으로 켠다.

## Import

```ts
import { DataTable } from "ui-kit";
import type { DataTableProps } from "ui-kit";
import type { ColumnDef } from "@tanstack/react-table";
```

> `@tanstack/react-table`은 peer가 아닌 내부 의존이라 별도 설치 없이 `ColumnDef` 타입만 가져다 쓰면 된다.

## Props (`DataTableProps<TData>`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `data` | `TData[]` | — | 행 데이터 배열 |
| `columns` | `ColumnDef<TData, unknown>[]` | — | TanStack 컬럼 정의 |
| `getRowId` | `(row: TData, index: number) => string` | — | 행 고유 id 도출. 선택 상태 안정성을 위해 지정 권장 |
| `enableSorting` | `boolean` | `false` | 헤더 클릭 정렬(오름/내림 토글) |
| `pageSize` | `number` | — | 지정 시 클라이언트 페이지네이션 활성 |
| `enableRowSelection` | `boolean` | `false` | 행 체크박스 선택(헤더 전체 선택 포함) |
| `onRowSelectionChange` | `(selectedRows: TData[]) => void` | — | 선택 행이 바뀔 때 호출 |
| `loading` | `boolean` | `false` | 스켈레톤 행 렌더 |
| `emptyContent` | `ReactNode` | 기본 `EmptyState` | 빈 데이터 시 렌더할 콘텐츠 |
| `className` | `string` | — | 루트에 병합 |

## 기본 사용

```tsx
interface User {
  id: string;
  name: string;
  email: string;
}

const columns: ColumnDef<User, unknown>[] = [
  { accessorKey: "name", header: "이름" },
  { accessorKey: "email", header: "이메일" },
];

<DataTable data={users} columns={columns} getRowId={(row) => row.id} />
```

## 정렬 · 페이지네이션

```tsx
<DataTable
  data={users}
  columns={columns}
  getRowId={(row) => row.id}
  enableSorting
  pageSize={10}
/>
```

## 행 선택

```tsx
<DataTable
  data={users}
  columns={columns}
  getRowId={(row) => row.id}
  enableRowSelection
  onRowSelectionChange={(rows) => setSelected(rows)}
/>
```

## 로딩 · 빈 상태

```tsx
{/* 로딩: 스켈레톤 행(pageSize개, 미지정 시 3개) */}
<DataTable data={[]} columns={columns} loading pageSize={5} />

{/* 커스텀 빈 상태 */}
<DataTable
  data={[]}
  columns={columns}
  emptyContent={<EmptyState title="검색 결과 없음" description="필터를 바꿔보세요." />}
/>
```

## 동작 노트

- **정렬 방향**: 숫자 컬럼은 첫 클릭 시 내림차순(desc-first, TanStack 기본). 문자열 컬럼은 오름차순 우선. 재클릭으로 토글되며 정렬된 헤더에 `aria-sort`가 반영된다.
- **페이지네이션**: `pageSize` 지정 시에만 하단에 [Pagination](../../molecules/navigation/pagination.md)이 나타나고, 총 페이지가 1 이하면 숨겨진다. 페이지 상태는 컴포넌트 내부에서 관리한다(클라이언트 페이징).
- **행 선택**: `enableRowSelection`이면 맨 앞에 체크박스 컬럼이 주입된다. 헤더 체크박스는 전체 선택이며, 일부만 선택되면 `indeterminate` 상태가 된다. `getRowId`를 주면 데이터 재정렬·페이지 이동에도 선택이 안정적으로 유지된다.
- **우선순위**: `loading` → 스켈레톤, 그다음 `data`가 비면 `emptyContent`(기본 `EmptyState`), 그 외 데이터 행.

## When to use

- 정렬·페이지네이션·선택이 필요한 목록형 데이터 → `DataTable`.
- 단순 요약 지표 카드 → [StatCard](../../..) / 통계 그리드는 별도 컴포넌트 사용.
