# Badge · Tag · Chip

상태·라벨·필터를 표현하는 작은 인라인 요소 3종. 시맨틱이 다르므로 용도에 맞게 구분해 사용한다.

## Import

```ts
import { Badge, Tag } from "ui-kit"; // primitives
import { Chip } from "ui-kit";       // composed
import type { BadgeProps, TagProps, ChipProps } from "ui-kit";
```

---

## Badge

비대화형 상태 표시기. 클릭/제거 없이 상태·카운트를 나타낸다. `<span>` 렌더.

### Props (`BadgeProps`)

표준 `<span>` 속성 + 아래.

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `variant` | `"default" \| "success" \| "warning" \| "danger" \| "info" \| "outline"` | `"default"` | 색상 시맨틱 |
| `size` | `"sm" \| "md"` | `"md"` | 크기 |

### 사용

```tsx
<Badge>신규</Badge>
<Badge variant="success">완료</Badge>
<Badge variant="warning" size="sm">대기</Badge>
<Badge variant="danger">실패</Badge>
<Badge variant="outline">초안</Badge>
```

### variant × size

| variant | sm | md | 의미 |
|---|---|---|---|
| `default` | ✅ | ✅ | 브랜드 강조 |
| `success` | ✅ | ✅ | 성공/완료 |
| `warning` | ✅ | ✅ | 주의/대기 |
| `danger` | ✅ | ✅ | 오류/실패 |
| `info` | ✅ | ✅ | 정보 |
| `outline` | ✅ | ✅ | 중립 테두리 |

---

## Tag

제거 가능한 라벨. `onRemove`를 주면 닫기 버튼이 붙는다. 필터 칩·선택된 키워드 표시에 적합. `<span>` 렌더.

### Props (`TagProps`)

표준 `<span>` 속성 + 아래.

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `variant` | `"default" \| "info" \| "success" \| "warning" \| "danger"` | `"default"` | 색상 시맨틱 |
| `size` | `"sm" \| "md"` | `"md"` | 크기 |
| `onRemove` | `() => void` | — | 지정 시 제거(×) 버튼 표시 |

### 사용

```tsx
<Tag>React</Tag>
<Tag variant="info">TypeScript</Tag>

{/* 제거 가능 */}
<Tag onRemove={() => removeFilter("draft")}>초안</Tag>
```

---

## Chip

대화형(클릭 가능) 칩. `<button>` 렌더이며 선행 아이콘·보조 설명을 가질 수 있다. 토글 필터·빠른 선택 액션에 적합.

### Props (`ChipProps`)

표준 `<button>` 속성 + 아래.

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `variant` | `"primary" \| "secondary"` | `"primary"` | 스타일 |
| `appearance` | `"ghost"` | `"ghost"` | 외형 모드 |
| `size` | `"xs" \| "md"` | `"md"` | 크기 |
| `leadingIcon` | `IconName` | — | 선행 아이콘 |
| `subDescription` | `string` | — | 본문 뒤 보조 텍스트(tertiary 토큰) |
| `iconColor` | `IconColor` | variant별 기본값 | 아이콘 색 오버라이드 |

### 사용

```tsx
<Chip onClick={toggle}>전체</Chip>

<Chip variant="secondary" leadingIcon="filter">
  필터
</Chip>

<Chip leadingIcon="star" subDescription="12">
  즐겨찾기
</Chip>
```

---

## When to use

| 필요 | 컴포넌트 | 시맨틱 |
|---|---|---|
| 상태/카운트 표시(클릭 없음) | **Badge** | `<span>` |
| 제거 가능한 라벨/적용된 필터 | **Tag** | `<span>` + 내부 닫기 `<button>` |
| 클릭/토글되는 선택 액션 | **Chip** | `<button>` |

- 클릭 동작이 필요하면 Badge/Tag가 아니라 Chip을 쓴다 — 시맨틱이 버튼이어야 키보드 접근이 보장된다.

## 접근성

- **Badge·Tag**는 시각적 표식이다. 색상만으로 의미를 전달하지 말고 텍스트 라벨을 함께 둔다.
- **Tag**의 제거 버튼은 `aria-label="제거"`를 내장한다.
- **Chip**은 실제 `<button>`이라 키보드 포커스·Enter/Space 활성화가 동작하며 `focus-visible` 링을 표시한다.
