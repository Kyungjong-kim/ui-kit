# TreeTable

`children`으로 중첩된 행을 펼침/접힘 토글하며 depth 들여쓰기로 계층을 표현하는 테이블. 첫 컬럼에 토글 화살표가 붙는다.

## Import

```ts
import { TreeTable } from "ui-kit";
import type { TreeTableProps, TreeTableColumn, TreeTableNode } from "ui-kit";
```

## Props (`TreeTableProps<T>`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `columns` | `TreeTableColumn<T>[]` | — | 컬럼 정의 배열 |
| `data` | `T[]` | — | 최상위 노드 배열 |
| `emptyMessage` | `string` | `"데이터가 없습니다"` | 데이터가 비었을 때 표시할 문구 |
| `defaultExpandedIds` | `string[]` | `[]` | 초기 펼침 상태로 둘 노드 `id` 목록 |
| `className` | `string` | — | 루트 래퍼에 병합 |

### `TreeTableNode`

계층 데이터의 기본 형태. `id`는 필수, `children`으로 중첩하며 그 외 필드는 자유롭게 확장한다.

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | `string` | 노드 고유 키(펼침 상태 추적에 사용) |
| `children` | `TreeTableNode[]` | 자식 노드. 있으면 토글 화살표가 표시된다 |
| `[key: string]` | `unknown` | 임의 컬럼 데이터 필드 |

### `TreeTableColumn<T>`

| 필드 | 타입 | 설명 |
|---|---|---|
| `key` | `string` | 컬럼 키. `render` 미지정 시 `node[key]`를 값으로 사용 |
| `header` | `ReactNode` | 헤더 셀 내용 |
| `render` | `(node: T, depth: number) => ReactNode` | 셀 커스텀 렌더. `depth`(0부터)를 함께 받는다 |
| `className` | `string` | 해당 컬럼의 `th`/`td`에 병합 |

## 기본 사용

```tsx
type FileNode = TreeTableNode & { name: string; size: string };

const columns: TreeTableColumn<FileNode>[] = [
  { key: "name", header: "이름" },
  { key: "size", header: "크기", className: "text-right" },
];

const data: FileNode[] = [
  {
    id: "src",
    name: "src",
    size: "—",
    children: [
      { id: "src/index.ts", name: "index.ts", size: "1.2KB" },
    ],
  },
];

<TreeTable columns={columns} data={data} defaultExpandedIds={["src"]} />
```

## 동작 노트

- 펼침/접힘 상태는 컴포넌트 내부 `useState`로 관리한다(비제어). `defaultExpandedIds`로 초기값만 지정한다.
- 첫 번째 컬럼(index 0)에만 토글 화살표와 `depth * 20px` 들여쓰기가 적용된다. 자식이 없는 노드는 화살표 자리를 빈 공간으로 채워 정렬을 맞춘다.
- 토글 버튼은 `aria-expanded`와 접기/펼치기 `aria-label`을 제공한다.

## When to use

- 파일 트리·조직도·중첩 카테고리 등 **계층 구조**를 표로 보여줄 때.
- 계층이 없는 평면 데이터는 [Table](./table.md), 정렬·페이징이 필요하면 [DataTable](./data-table.md)을 쓴다.
