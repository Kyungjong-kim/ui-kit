# MultiSelect

여러 값을 선택하는 태그형 셀렉트. 트리거에 선택 항목을 [Tag](../data-display/badge-chip-tag.md) 칩으로 표시하고, 드롭다운에서 검색·전체선택·비동기 로딩·옵션 메타를 지원한다.

## Import

```ts
import { MultiSelect } from "ui-kit";
import type { MultiSelectProps, MultiSelectOption } from "ui-kit";
```

## Props (`MultiSelectProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `options` | `MultiSelectOption[]` | — | 옵션 목록 |
| `value` | `string[]` | — | 선택된 값들(제어) |
| `onValueChange` | `(value: string[]) => void` | — | 변경 콜백 |
| `label` | `string` | — | 상단 라벨 |
| `helperText` | `string` | — | 하단 헬퍼 텍스트 |
| `placeholder` | `string` | `"Select"` | 선택 없을 때 문구 |
| `state` | `"default" \| "error"` | `"default"` | 상태(error 시 danger 색) |
| `disabled` | `boolean` | — | 전체 비활성화 |
| `size` | `"md" \| "lg"` | `"md"` | 트리거 크기 |
| `showClearAll` | `boolean` | `true` | 우측 전체 삭제(trash) 아이콘 표시 |
| `searchable` | `boolean` | `true` | 드롭다운 상단 검색 input 표시 |
| `isLoading` | `boolean` | `false` | 옵션 로딩 중 스피너 표시 |
| `searchPlaceholder` | `string` | `"Search"` | 검색 input placeholder |
| `countUnit` | `string` | — | 옵션 카운트 단위(예: "items") |
| `emptyText` | `string` | `"No results found."` | 검색 결과 없음 제목 |
| `emptySubText` | `string` | `"Try a different keyword."` | 검색 결과 없음 보조 문구 |
| `showSelectAll` | `boolean` | `false` | "전체" 마스터 체크박스 노출(검색 전) |
| `selectAllLabel` | `string` | `"Select all"` | "전체" 행 라벨 |
| `selectAllMeta` | `ReactNode` | — | "전체" 행 우측 텍스트 |
| `clearAllLabel` | `string` | `"Clear all"` | 전체 삭제 버튼 aria-label |
| `className` | `string` | — | 루트에 병합 |
| `id` | `string` | 자동 생성 | 트리거 id |

### `MultiSelectOption`

| 필드 | 타입 | 설명 |
|---|---|---|
| `value` | `string` | 옵션 값 |
| `label` | `string` | 표시 라벨(검색 매칭 대상) |
| `meta` | `string` | 우측 보조 텍스트. 지정 시 `count`보다 우선 |
| `count` | `number` | 우측 카운트(`countUnit`과 함께 표시) |
| `description` | `string` | 라벨 아래 2번째 줄 설명(검색 비매칭) |
| `disabled` | `boolean` | 옵션 단위 비활성화 |

## 기본 사용

```tsx
const [selected, setSelected] = useState<string[]>([]);

<MultiSelect
  label="담당자"
  options={[
    { value: "kim", label: "김철수", count: 12 },
    { value: "lee", label: "이영희", meta: "관리자" },
    { value: "park", label: "박민수", disabled: true },
  ]}
  value={selected}
  onValueChange={setSelected}
  countUnit="건"
  showSelectAll
/>
```

## 동작 노트

- 선택 항목은 트리거에 Tag 칩으로 쌓이고 최대 3줄까지 표시 후 내부 스크롤된다. 각 칩의 x로 개별 제거, 우측 trash 아이콘으로 전체 제거한다.
- 검색어는 `label`만 매칭하며 일치 부분을 brand 색으로 강조한다. `description`은 검색 대상이 아니다.
- `showSelectAll`은 검색 전에만 노출되고, 선택 가능(`!disabled`) 항목만을 대상으로 tri-state(전체/일부/없음)로 동작한다.
- `isLoading`이면 드롭다운에 스피너, 필터 결과가 0건이면 `emptyText`/`emptySubText`를 표시한다.

## When to use

- 여러 값을 고르고 선택 결과를 칩으로 보여줘야 할 때.
- 단일 선택은 [Select](./select.md), 검색 위주 단일 선택은 `SearchableSelect`/`Combobox`를 고려한다.

## 접근성

- 트리거는 `role="combobox"` + `aria-expanded`/`aria-haspopup="listbox"`이며 `label`과 `aria-labelledby`로 연결된다.
- 드롭다운은 `role="listbox"` + `aria-multiselectable`, 각 옵션은 `role="option"` + `aria-selected`다.
- Enter/Space로 드롭다운을 토글할 수 있고, `helperText`는 `aria-describedby`로 연결된다.
