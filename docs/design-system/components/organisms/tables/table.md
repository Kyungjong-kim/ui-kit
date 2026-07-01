# Table

`columns` + `data`로 `thead`/`tbody`를 렌더하는 정적 테이블. 정렬·페이지네이션·선택 기능은 없다 — 그런 상호작용이 필요하면 [DataTable](./data-table.md)을 쓴다.

## Import

```ts
import { Table } from "ui-kit";
import type { TableProps, TableColumn } from "ui-kit";
```

## Props (`TableProps<T>`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `columns` | `TableColumn<T>[]` | — | 컬럼 정의 배열 |
| `data` | `T[]` | — | 행 데이터 배열 |
| `emptyMessage` | `string` | `"데이터가 없습니다"` | 데이터가 비었을 때 표시할 문구 |
| `className` | `string` | — | 루트 래퍼에 병합 |

### `TableColumn<T>`

| 필드 | 타입 | 설명 |
|---|---|---|
| `key` | `string` | 컬럼 키. `render` 미지정 시 `row[key]`를 값으로 사용 |
| `header` | `ReactNode` | 헤더 셀 내용 |
| `render` | `(row: T, rowIndex: number) => ReactNode` | 셀 커스텀 렌더. 지정 시 `key` 대신 사용 |
| `className` | `string` | 해당 컬럼의 `th`/`td`에 병합 |

## 기본 사용

```tsx
type User = { id: number; name: string; role: string };

const columns: TableColumn<User>[] = [
  { key: "name", header: "이름" },
  { key: "role", header: "역할" },
  {
    key: "actions",
    header: "",
    render: (row) => <Button size="sm" variant="ghost">편집</Button>,
    className: "text-right",
  },
];

<Table columns={columns} data={users} emptyMessage="사용자가 없습니다" />
```

## 동작 노트

- `data`가 빈 배열이면 전 컬럼을 `colSpan`으로 병합해 `emptyMessage`를 한 행으로 표시한다.
- `render`가 없는 컬럼은 `row[key]`를 그대로 렌더하며, 값이 `null`/`undefined`면 빈 셀이 된다.
- 가로 스크롤: 루트가 `overflow-x-auto`라 좁은 뷰포트에서 테이블이 넘치면 가로 스크롤된다.

## When to use

- 정적 데이터를 표 형태로 단순 나열할 때.
- 정렬·페이징·행 선택·서버 페이징이 필요하면 [DataTable](./data-table.md), 계층(트리) 구조는 [TreeTable](./tree-table.md)을 쓴다.
