# EmptyState

데이터가 없거나 결과가 비었을 때 보여주는 안내 영역. 일러스트·제목·설명·액션 버튼을 조합하며, 제공된 요소만 선택적으로 렌더한다(아무 콘텐츠도 없으면 `null`).

## Import

```ts
import { EmptyState } from "ui-kit";
import type { EmptyStateProps, EmptyStateButtonAction } from "ui-kit";
```

## Props (`EmptyStateProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `illustSrc` | `string` | — | 일러스트 이미지 src(URL 또는 import 경로) |
| `illustAlt` | `string` | `""` | 일러스트 alt. 빈 문자열이면 장식으로 간주(`aria-hidden`) |
| `title` | `ReactNode` | — | 제목 |
| `description` | `ReactNode` | — | 설명(줄바꿈 유지) |
| `primaryAction` | `EmptyStateButtonAction` | — | 주요 액션 버튼 |
| `tertiaryAction` | `EmptyStateButtonAction` | — | 보조 액션 버튼(주요 액션과 함께일 때만 노출) |
| `ariaLabel` | `string` | — | 섹션 `aria-label` |
| `className` | `string` | — | 루트에 병합 |

### `EmptyStateButtonAction`

| 필드 | 타입 | 설명 |
|---|---|---|
| `label` | `string` | 버튼 텍스트 |
| `onClick` | `() => void` | 클릭 핸들러 |
| `buttonProps` | `Omit<ButtonProps, "children" \| "onClick">` | 버튼에 추가 전달할 props |

## 기본 사용

```tsx
<EmptyState
  illustSrc={emptyBoxImg}
  illustAlt="빈 목록"
  title="아직 항목이 없습니다"
  description={"첫 항목을 추가해\n시작해보세요."}
  primaryAction={{ label: "추가하기", onClick: handleCreate }}
/>

{/* 액션 2개 */}
<EmptyState
  title="검색 결과 없음"
  description="다른 키워드로 다시 시도해보세요."
  primaryAction={{ label: "초기화", onClick: reset }}
  tertiaryAction={{ label: "도움말", onClick: openHelp }}
/>
```

## 동작 노트

- `primaryAction`만 있으면 버튼 1개, `primaryAction` + `tertiaryAction`이면 버튼 2개(보조=secondary, 주요=primary)가 렌더된다. `tertiaryAction`만 단독으로 주면 버튼은 표시되지 않는다.
- 액션 버튼은 내부적으로 [Button](./button.md) `size="lg"`로 렌더된다.
- 일러스트·제목·설명·버튼 중 **아무 것도 없으면 `null`**을 반환한다.

## When to use

- 첫 사용(빈 컬렉션)·검색 결과 없음·필터 결과 0건 등 "보여줄 것이 없는" 상태.
- 로딩 중이라면 EmptyState가 아니라 스켈레톤/스피너를 쓴다.
- 오류로 인한 빈 화면은 재시도 액션(`primaryAction`)을 함께 제공한다.

## 접근성

- 루트는 `<section data-slot="empty-state">`이며 `ariaLabel`로 영역 이름을 줄 수 있다.
- 장식용 일러스트는 `illustAlt=""`(기본)일 때 `aria-hidden` 처리된다. 의미 있는 이미지면 `illustAlt`에 설명을 넣는다.
- 이미지는 `loading="lazy"` / `decoding="async"`로 지연 로딩된다.
