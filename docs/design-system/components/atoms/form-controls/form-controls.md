# Form Controls — Checkbox · RadioGroup · Switch

선택·토글류 폼 컨트롤 모음. 셋 모두 공통으로 `label` · `error` · `helperText`를 지원하며 Radix primitive 위에 토큰 스타일을 입혔다.

## Import

```ts
import { Checkbox, RadioGroup, RadioGroupItem, Switch } from "ui-kit";
import type {
  CheckboxProps,
  RadioGroupProps,
  RadioGroupItemProps,
  SwitchProps,
} from "ui-kit";
```

---

## Checkbox

독립적인 on/off 또는 다중 선택 항목. Radix Checkbox 기반.

### Props (`CheckboxProps`)

Radix `Checkbox.Root` 속성(`checked`, `onCheckedChange`, `disabled`, `name`, `value` 등) 전체 + 아래.

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `label` | `string` | — | 우측 라벨, 자동 연결 |
| `error` | `boolean` | `false` | danger 테두리 토큰 |
| `helperText` | `string` | — | 라벨 아래 보조 문구 |

### 사용

```tsx
<Checkbox label="이용약관에 동의합니다" />

<Checkbox
  label="알림 받기"
  helperText="언제든 설정에서 끌 수 있습니다."
  defaultChecked
/>

<Checkbox label="필수 항목" error helperText="필수 동의 항목입니다." />
```

---

## RadioGroup

상호 배타적 선택지. `RadioGroup`(컨테이너) + `RadioGroupItem`(개별 옵션) 조합.

### Props (`RadioGroupProps`)

Radix `RadioGroup.Root` 속성(`value`, `onValueChange`, `defaultValue`, `disabled`, `orientation` 등) + 아래.

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `label` | `string` | — | 그룹 라벨 |
| `error` | `boolean` | `false` | 그룹 헬퍼 텍스트를 danger 토큰으로 |
| `helperText` | `string` | — | 그룹 하단 보조 문구 |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | 항목 배치 방향 |

### Props (`RadioGroupItemProps`)

Radix `RadioGroup.Item` 속성(`value` 필수, `disabled` 등) + `label` · `error` · `helperText`.

### 사용

```tsx
<RadioGroup label="알림 빈도" defaultValue="daily">
  <RadioGroupItem value="realtime" label="실시간" />
  <RadioGroupItem value="daily" label="하루 1회" />
  <RadioGroupItem value="off" label="받지 않음" helperText="알림이 비활성화됩니다." />
</RadioGroup>

{/* 가로 배치 */}
<RadioGroup label="정렬" orientation="horizontal" defaultValue="asc">
  <RadioGroupItem value="asc" label="오름차순" />
  <RadioGroupItem value="desc" label="내림차순" />
</RadioGroup>
```

---

## Switch

즉시 반영되는 단일 on/off 토글.

### Props (`SwitchProps`)

Radix `Switch.Root` 속성(`checked`, `onCheckedChange`, `defaultChecked`, `disabled` 등) + 아래.

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 트랙·썸 크기 |
| `label` | `string` | — | 우측 라벨, 자동 연결 |
| `error` | `boolean` | `false` | off 상태 트랙을 danger 토큰으로 |
| `helperText` | `string` | — | 라벨 아래 보조 문구 |

### 사용

```tsx
<Switch label="다크 모드" />

<Switch size="sm" label="자동 저장" defaultChecked />

<Switch
  label="공개"
  helperText="다른 사용자가 볼 수 있습니다."
/>
```

### size 매트릭스 (Switch)

| size | 트랙 |
|---|---|
| `sm` | `h-4 w-7` |
| `md` | `h-5 w-9` (기본) |
| `lg` | `h-6 w-11` |

---

## When to use

| 상황 | 컴포넌트 |
|---|---|
| 독립 동의·다중 선택 | Checkbox |
| 배타적 1개 선택(2~4개 노출) | RadioGroup |
| 즉시 적용되는 단일 토글 | Switch |
| 선택지 5개 이상·공간 제약 | [Select](../../molecules/select/select.md) |

- **Switch vs Checkbox**: Switch는 즉시 효과가 적용되는 설정에, Checkbox는 폼 제출 시 반영되는 동의/선택에 쓴다.

## 접근성

- 세 컴포넌트 모두 `label`이 컨트롤 `id`와 자동 연결되어 라벨 클릭으로 토글된다.
- 키보드 조작(Space 토글, RadioGroup은 화살표 이동)이 Radix primitive로 기본 제공된다.
- 모든 컨트롤은 `focus-visible` 시 `var(--color-border-focus)` 링을 표시한다.
