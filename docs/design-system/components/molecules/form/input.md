# Input

단일 행 텍스트 입력. 선택적 라벨·헬퍼 텍스트·에러 상태를 내장하며 라벨과 입력은 `useId`로 자동 연결된다.

## Import

```ts
import { Input } from "ui-kit";
import type { InputProps } from "ui-kit";
```

## Props

`InputProps`는 표준 `<input>` 속성을 상속한다(단 `size`는 자체 정의로 오버라이드).

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 높이·패딩·타이포 |
| `label` | `string` | — | 위에 표시되는 라벨. `htmlFor`로 자동 연결 |
| `error` | `boolean` | `false` | 에러 상태. 테두리·헬퍼 텍스트를 danger 토큰으로 |
| `helperText` | `string` | — | 입력 하단 보조/에러 문구 |
| `id` | `string` | 자동 생성 | 미지정 시 `useId`로 생성 |
| `placeholder`, `value`, `disabled` 등 | 표준 input 속성 | — | 그대로 전달 |

## 기본 사용

```tsx
<Input label="이름" placeholder="이름을 입력하세요" />

<Input
  label="이메일"
  type="email"
  error
  helperText="올바른 이메일 형식이 아닙니다."
/>

<Input size="sm" placeholder="검색" />

<Input label="비활성" disabled value="수정 불가" />
```

## size 매트릭스

| size | 높이 토큰 | 용도 |
|---|---|---|
| `sm` | `h-size-control-sm` | 밀집 폼·인라인 필터 |
| `md` | `h-size-control-md` | 표준 폼 (기본) |
| `lg` | `h-size-control-lg` | 강조 필드·랜딩 폼 |

## When to use

- 한 줄짜리 자유 텍스트·숫자·이메일 등 단일 값 입력.
- 여러 줄 입력이 필요하면 [Textarea](./textarea.md)를, 정해진 선택지 중 고르는 경우 [Select](../select/select.md)를 사용한다.

## 접근성

- `label` 제공 시 `<label htmlFor>` ↔ `<input id>`가 자동 연결되므로 라벨 클릭으로 포커스 이동이 가능하다.
- `helperText` 는 입력의 `aria-describedby` 로 자동 연결되고, `error` 면 `aria-invalid="true"` 가 붙는다. 직접 넘긴 `aria-describedby` 는 helperText id 앞에 합쳐지고, 직접 넘긴 `aria-invalid` 가 있으면 그 값이 우선한다.
- 포커스 시 `border-input-focus` 테두리 + 3px `focus-halo` 링이 적용된다(ring-offset 방식 아님).

## 스타일 노트

- 모서리 6px(`rounded-xs`), 테두리 `border-input-default`, hover `border-input-hover`, 초점 `border-input-focus` + `focus-halo`.
- 오류 문구는 내부 전용 `FieldHelperText`(공개 export 없음)가 그린다. `error` 일 때만 장식용 경고 아이콘(`aria-hidden`)이 앞에 붙고, `disabled` 면 오류 표시보다 비활성 색이 우선한다.
