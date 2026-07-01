# Pagination

페이지 단위 목록 탐색 컨트롤. 현재 페이지를 중심으로 형제 페이지를 보여주고, 멀어진 구간은 생략 부호(…)로 압축한다.

## Import

```ts
import { Pagination } from "ui-kit";
import type { PaginationProps } from "ui-kit";
```

## Props (`PaginationProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `currentPage` | `number` | — (필수) | 현재 페이지(1-base). 범위 밖이면 자동 클램프 |
| `totalPages` | `number` | — (필수) | 전체 페이지 수. `<= 0`이면 렌더 안 함 |
| `onPageChange` | `(page: number) => void` | — (필수) | 페이지 변경 콜백 |
| `siblingCount` | `number` | `1` | 현재 페이지 양옆에 노출할 페이지 수 |
| `previousLabel` | `string` | `"이전"` | 이전 버튼 `aria-label` |
| `nextLabel` | `string` | `"다음"` | 다음 버튼 `aria-label` |
| `ariaLabel` | `string` | `"페이지 네비게이션"` | `<nav>` `aria-label` |
| `className` | `string` | — | `<nav>`에 병합 |

## 기본 사용

```tsx
const [page, setPage] = useState(1);

<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
/>

{/* 양옆 페이지 더 노출 */}
<Pagination
  currentPage={page}
  totalPages={50}
  siblingCount={2}
  onPageChange={setPage}
/>
```

## 동작 노트

- `totalPages`가 `siblingCount * 2 + 5` 이하이면 생략 없이 전체 페이지를 표시한다. 그보다 많으면 첫·끝 페이지를 고정하고 현재 페이지 주변만 노출하며 사이는 `…`로 압축한다.
- 첫/끝 페이지에서는 이전/다음 버튼이 자동 비활성화된다.
- `currentPage`가 유효 범위를 벗어나면 내부에서 1~`totalPages`로 클램프한다.

## When to use

- 결과 수가 많고 정확한 위치 이동(특정 페이지로 점프)이 필요한 목록에 사용.
- 끝없이 이어지는 피드라면 무한 스크롤/“더 보기”가 더 적합할 수 있다.

## 접근성

- 컨테이너는 `<nav aria-label>`, 현재 페이지 버튼은 `aria-current="page"`로 표시된다.
- 각 페이지 버튼은 `"{n} 페이지"` 형태의 `aria-label`을 가지며, 이전/다음 버튼은 `previousLabel`/`nextLabel`로 라벨링된다.
- 생략 부호는 `aria-hidden`으로 보조기기에서 건너뛴다.
- 버튼은 `focus-visible` 시 `var(--color-border-focus)` 링을 표시한다.
