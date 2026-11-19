# Select

정해진 선택지 중 하나를 고르는 드롭다운. Radix Select primitive 위에 토큰 스타일을 입힌 단일 선택 컴포넌트로, 옵션을 데이터 배열(`options`)로 받는다.

## Import

```ts
import { Select } from "ui-kit";
import type { SelectProps, SelectOption } from "ui-kit";
```

## Props

### `SelectProps`

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `options` | `SelectOption[]` | — (필수) | 선택지 목록 |
| `value` | `string` | — | 선택된 값(제어형) |
| `onValueChange` | `(value: string) => void` | — | 선택 변경 콜백 |
| `placeholder` | `string` | `"선택"` | 미선택 시 표시 문구 |
| `label` | `string` | — | 위에 표시되는 라벨 |
| `error` | `boolean` | `false` | 에러 상태 (danger 토큰) |
| `helperText` | `string` | — | 하단 보조/에러 문구 |
| `disabled` | `boolean` | — | 전체 비활성 |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 트리거 높이·타이포 |
| `className` | `string` | — | 트리거에 병합 |

### `SelectOption`

| 필드 | 타입 | 설명 |
|---|---|---|
| `value` | `string` | 옵션 값. `""`(「전체」 등)도 쓸 수 있다 — 선택하면 `onValueChange("")`. 빈 값 옵션이 없을 때 `value=""` 는 「선택 없음(placeholder)」이다 |
| `label` | `string` | 표시 텍스트 |
| `disabled` | `boolean` | 개별 옵션 비활성(선택) |

## 기본 사용

```tsx
const options: SelectOption[] = [
  { value: "low", label: "낮음" },
  { value: "normal", label: "보통" },
  { value: "high", label: "높음", disabled: true },
];

const [value, setValue] = useState<string>();

<Select
  label="우선순위"
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="선택하세요"
/>
```

## size 매트릭스

| size | 트리거 높이 |
|---|---|
| `sm` | `h-size-control-sm` |
| `md` | `h-size-control-md` (기본) |
| `lg` | `h-size-control-lg` |

## 스타일 노트

- 트리거: 6px(`rounded-xs`), `border-input-default` → hover `border-input-hover`. 초점·열림 상태는 `border-input-focus` + 3px `focus-halo` 로 같은 표시.
- 목록 패널: 8px(`rounded-sm`), 안쪽 여백 `stack-xs`(4), 옵션 4px(`rounded-xxs`).
- 옵션 상태: hover·키보드 활성 `bg-tertiary` / 선택 `bg-brand-subtle` + medium + 브랜드 체크 아이콘 / 선택+활성 `bg-brand-subtle-hover`.
- Combobox·SearchableSelect 도 같은 트리거·옵션 규격을 따른다.

## When to use

- 선택지가 정해져 있고(보통 4개 이상) 한 번에 하나를 고를 때.
- 선택지가 2~4개로 적고 한눈에 보여야 하면 [RadioGroup](../../atoms/form-controls/form-controls.md)을 고려한다.
- 켜고 끄는 단일 토글은 [Switch](../../atoms/form-controls/form-controls.md).

## 접근성

- Radix Select 기반으로 키보드 내비게이션(↑↓·Home/End·타입어헤드)과 포커스 트랩이 기본 제공된다.
- `label`은 트리거 `id`와 연결되어 라벨 클릭으로 열 수 있다.
- 트리거 높이는 토큰 기반이며 placeholder 텍스트는 tertiary 토큰으로 표시된다.
