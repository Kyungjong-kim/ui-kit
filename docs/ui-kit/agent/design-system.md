# ui-kit 디자인 시스템 (에이전트용 가이드)

> 이 문서 = 에이전트 작업용 quickref(토큰·variant·절차). 컴포넌트별 Props·패턴·foundation 원칙 등 캐노니컬 문서는 [`docs/design-system/`](../../design-system/README.md) 참조.

---

## 1. 디자인 토큰 구조

ui-kit는 **2계층 토큰** 구조를 따릅니다.

```
src/styles/
├── tokens.css                 # dist 배포 진입점 (core + semantic import)
├── index.css                  # Storybook/dev 전용 (tailwindcss + @theme inline 포함)
└── tokens/
    ├── core.json              # ★ 단일 소스 — raw 값 (#fabc37 등)
    ├── core.css               # core.json에서 생성 — 직접 편집 금지
    ├── semantic.json          # ★ 단일 소스 — core 참조 의미 토큰
    ├── semantic.css           # semantic.json에서 생성 — 직접 편집 금지
    └── tokens.ts              # 생성된 토큰 이름 union 타입 (public export)
```

**원칙**: 컴포넌트는 **semantic 토큰만** 참조한다. core 토큰을 직접 쓰지 않는다.

> **토큰 파이프라인**: `core.css`·`semantic.css`·`tokens.ts`는 JSON 단일 소스에서 생성된 산출물이다.
> **토큰 값을 바꿀 때는 `.css`가 아니라 `core.json`·`semantic.json`을 수정한 뒤 `pnpm tokens`로 재생성한다.**
> 생성기는 `scripts/build-tokens.ts` (Node TS strip, `node scripts/build-tokens.ts`).

> **라이브러리 이식성**: 컴포넌트 className에는 `bg-[var(--color-bg-brand-default)]` 형태(CSS 임의값)를 사용한다.
> Tailwind 유틸리티 클래스(`bg-bg-brand-default`)는 소비 앱이 `@theme inline`을 구성한 경우에만 동작하므로
> 라이브러리 내부에서는 항상 `var(--...)` 방식을 쓴다.

---

## 2. core.css — raw 값 카테고리

| 카테고리 | 변수 prefix | 단계 |
|---|---|---|
| **brand** | `--color-brand-*` | 25, 50, 100~900 |
| **neutral** | `--color-neutral-*` | 25, 50, 100~900 |
| **red** | `--color-red-*` | 25, 50, 100~900 |
| **green** | `--color-green-*` | 25, 50, 100~900 |
| **orange** | `--color-orange-*` | 25, 50, 100~900 |
| **blue** | `--color-blue-*` | 25, 50, 100~900 |
| **white/black** | `--color-white`, `--color-black` | — |

---

## 3. semantic.css — 의미 토큰 (컴포넌트가 직접 사용)

| 카테고리 | 패턴 | 예시 |
|---|---|---|
| **text** | `--color-text-{primary, secondary, tertiary, disabled, inverse, brand-default, brand-hover, danger-default, success-default, warning-default, info-default, on-strong}` | `--color-text-primary` |
| **bg** | `--color-bg-{primary, secondary, tertiary, inverse, brand-default, brand-hover, brand-subtle, danger-default, danger-subtle, danger-strong, success-default, success-subtle, success-strong, warning-default, warning-subtle, warning-strong, info-default, info-subtle, info-strong, disabled}` | `--color-bg-brand-default` |
| **border** | `--color-border-{default, strong, brand-default, danger-default, info-default, disabled, focus, input-default, input-hover, input-focus, control}` | `--color-border-default` |
| **focus** | `--color-focus-halo` (필드 초점 3px 링, brand 30% 투명 / 다크 brand-400 35%) | `focus:shadow-[0_0_0_3px_var(--color-focus-halo)]` |
| **interactive** | `--color-interactive-{primary, secondary, ghost, destructive}-{bg, bg-hover, text, border}` | `--color-interactive-primary-bg` |

**대비 규칙 (WCAG AA)**
- 흰 배경 위 의미색 텍스트: `text-{danger,success,warning}-default` (core 700, hover·strong 은 800).
- 채움·아이콘: `bg-{danger,success,warning}-default` (core 600, 3:1 이상).
- **밝은 브랜드 노랑(`bg-brand-default`) 위 글자는 `--color-interactive-primary-text`(neutral-900)**. 흰 글자 금지. (Calendar 선택일·MonthPicker 선택월·FilterDropdown 개수 배지·SlideListBadge 선택·Badge/Tag solid 기본형)
- 흰 글자를 올리는 채움(solid Badge·Tag)은 `bg-{danger,success,warning,info}-strong`(700, 테마 공통) + `text-on-strong`(white, 테마 공통).
- 포커스: `border-focus`·`border-input-focus` 라이트 brand-700 / 다크 brand-400.
- 글꼴: core `--token-font-family-sans`(Pretendard Variable → 시스템 한글 폴백) → `theme.css` `--font-sans`. 글꼴 파일은 라이브러리가 싣지 않는다 — 소비 앱이 Pretendard 로드(`pretendard` 패키지 variable dynamic-subset CSS 또는 jsDelivr CDN), Storybook 은 `preview-head.html` 에서 CDN 로드.
- 다크 `bg-*-subtle`·`border-*-subtle` 은 `color-mix(in oklab, <hue>-500 18%|35%, neutral-900)` — 900 단계 직접 참조 금지.
- 팔레트 600~900 은 명도를 벌려 재단계됨(25~500 불변). 값 정본은 `core.json`.

**`index.css`의 `@theme inline` 블록은 Storybook dev 환경 전용. 컴포넌트 className은 항상 `[var(--...)]` 임의값 형태 사용 (라이브러리 이식성 보장 — 소비 앱이 `@theme inline` 미구성 시에도 동작).**

---

## 4. 작업 원칙

| 규칙 | 위반 예 | 올바른 예 |
|---|---|---|
| **하드코딩 색상 금지** | `bg-[#fabc37]` | `bg-[var(--color-bg-brand-default)]` |
| **Tailwind utility 사용 금지** | `bg-bg-brand-default` (소비 앱 `@theme` 의존) | `bg-[var(--color-bg-brand-default)]` |
| **core 토큰 직접 사용 금지** | `bg-[var(--color-brand-500)]` | `bg-[var(--color-bg-brand-default)]` (semantic 경유) |
| **임의 px 금지** | `p-[7px]` | `p-2` (Tailwind 기본 spacing) |
| **새 색상 필요 시 토큰 먼저 추가** | 컴포넌트에 색상 직접 정의 | `tokens/semantic.css`에 토큰 추가 후 참조 |

---

## 4-1. 필드·패널·옵션 규칙 (Warm Precision)

| 대상 | 규칙 |
|---|---|
| **필드 트리거** (Input·Textarea·Select·Combobox·SearchableSelect·MultiSelect, Filter·PeriodFilter 트리거) | `rounded-xs`(6px), 테두리 `input-default` → hover `input-hover` → 초점·열림 `input-focus` + `shadow-[0_0_0_3px_var(--color-focus-halo)]`. ring-offset 방식 금지 |
| **떠 있는 패널** (DropdownMenu·Popover·Select 계열 목록) | `rounded-sm`(8px), 목록 안쪽 `p-stack-xs`(4), 옵션 `rounded-xxs`(4px) |
| **옵션 상태** | hover·키보드 활성 `bg-tertiary` / 선택 `bg-brand-subtle` + medium + 브랜드 체크 / 선택+활성 `bg-brand-subtle-hover`. DropdownMenu hover 도 tertiary |
| **오류 문구** | 내부 전용 `_internal/field-helper-text.tsx`(`FieldHelperText`, 공개 export 없음). 오류일 때만 `aria-hidden` 경고 아이콘, `disabled` 가 오류보다 우선 |
| **Tabs·IconTabs** | 밑줄형 — 목록 하단 hairline `border-default`, 활성 2px `border-brand-default` + `text-primary` |
| **SegmentedControl** | 알약형 — 트랙 `border-default` + `bg-tertiary` + 8px, 선택 칸 `bg-primary` + `input-default` 테두리(그림자 없음), 비선택 `border-transparent` + `text-secondary` |
| **Pagination** | 칸 32px(`size-control-sm`)·6px·`tabular-nums`, 이전/다음은 `input-default` 테두리 버튼 |
| **라운드 체계** | 옵션 4px(`rounded-xxs`) · 컨트롤(버튼·필드·IconButton square·SelectButton) 6px(`rounded-xs`) · 떠 있는 패널·Skeleton 기본 8px(`rounded-sm`) · 컨테이너 12px(`rounded-md`). 16px(`rounded-lg`)는 이 계열에서 쓰지 않는다 |
| **Button** | 6px. primary·secondary·destructive 는 `shadow-default-sm`/`hover:shadow-default-md` 없이 hairline 만 |
| **IconButton** | filled 기본 아이콘 색 — primary `interactive-primary-text`(노랑 위 어둡게) / danger `text-on-strong` / 그 외(secondary·ghost·tertiary·light) `text-secondary`. inverse(흰색) 금지(흰 배경에서 안 보임). outline = `input-default` 테두리 → hover `input-hover` |
| **SelectButton** | 6px, 테두리 `input-default` → hover `input-hover`, 선택 `bg-brand-subtle`(hover `brand-subtle-hover`) |
| **Checkbox·Radio·MultiSelect 체크** | 미선택 테두리 `border-control`(라이트 neutral-400 / 다크 neutral-500). 체크·indeterminate 아이콘·Radio 선택 점·MultiSelect 체크 아이콘은 노랑 위라 `interactive-primary-text`. Radio 배경 `bg-primary` 토큰 |
| **카드 계열** (Card·StatCard·MetricCard·VersionInfoCard·DataItemsTable·DescriptionList) | 12px·hairline·그림자 없음(Card `shadow` 기본 `"none"`), 여백 20px(`p-inline-xl`) 통일. StatCard·MetricCard 값 `tabular-nums` |
| **표 계열** (Table·TreeTable·DataTable) | 12px 테두리 래퍼, 회색 헤더(`bg-secondary`), th `typography-label-sm-medium`·td `typography-body-sm-base`, `px-inline-lg py-stack-md`, 빈 상태 `py-stack-xl`. DataTable 선택 행 `bg-brand-subtle`(hover 회색과 구분). DataItemsTable 은 카드 12px·`p-inline-lg` |
| **오버레이** | Dialog·AlertDialog 12px + hairline 테두리. Sheet 닫기 버튼 `focus-ring`·`rounded-xs`·hover `bg-tertiary`(Dialog 와 동일). NavFlyout 패널 `p-stack-xs`(4), 항목 `rounded-xxs`·`focus-ring-inset` |
| **Progress·Skeleton** | Progress 채움은 그라데이션 없이 브랜드 단색. Skeleton 기본 `rounded` `"md"` → `"sm"` |

**Tabs vs SegmentedControl**: 콘텐츠 패널 전환 = Tabs(밑줄형). 보기·옵션 값 전환(알약형) = SegmentedControl.

**cn 병합 주의**: `src/utils/cn.ts` 의 tailwind-merge 는 `typography` class group 을 등록해 `typography-*` 유틸끼리 충돌로 처리한다(후자 우선). 미등록이던 시절 Button `size="lg"` 가 base 의 `typography-label-md-medium` 과 함께 남아 14px 로 렌더되던 버그가 있었다.

**토큰 형태**: Popover·LinkButton 등은 utility 형태(`bg-surface-default`, `text-text-*`)가 아닌 `[var(--…)]` 형태로 쓴다.

---

## 5. variant 패턴 (cva)

컴포넌트는 `class-variance-authority` 사용. variant·size 두 키로 표준화:

```ts
const buttonVariants = cva("기본 공통 클래스", {
  variants: {
    variant: {
      primary: "bg-[var(--color-bg-brand-default)] text-[var(--color-interactive-primary-text)]",
      secondary: "bg-[var(--color-bg-primary)] border border-[var(--color-border-default)]",
      ghost: "hover:bg-[var(--color-bg-tertiary)]",
      destructive: "bg-[var(--color-bg-danger-default)] text-[var(--color-text-inverse)]",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});
```

**variant 추가 시 체크리스트:**
- 기존 variant와 의미 충돌 없는지
- 모든 size에서 시각적 일관성 유지되는지
- semantic 토큰만 사용했는지
- 스토리에 새 variant 추가했는지
- 테스트에 variant prop 검증 추가했는지

---

## 6. 새 토큰 추가 절차

1. 의미 토큰이 부족한 상황을 판단 (예: `info` 카테고리 추가 필요)
2. core 토큰에 색상 단계 추가 (필요 시) — `tokens/core.json`
3. semantic 토큰 추가 — `tokens/semantic.json`
4. `pnpm tokens` 실행 — `core.css`·`semantic.css`·`tokens.ts` 재생성
5. `index.css` `@theme inline` 블록에 새 토큰 추가
6. `pnpm build` 실행해 `dist/styles.css` 갱신 확인
7. 기존 컴포넌트에 영향이 있는지 grep 검토
8. `agent/design-system.md` 갱신 (이 문서)

---

## 7. 자주 사용하는 토큰 빠른 참조

| 용도 | className |
|------|------|
| 본문 텍스트 | `text-[var(--color-text-primary)]` |
| 보조 텍스트 | `text-[var(--color-text-secondary)]` |
| 비활성 텍스트 | `text-[var(--color-text-disabled)]` |
| 기본 배경 | `bg-[var(--color-bg-primary)]` |
| 카드/패널 배경 | `bg-[var(--color-bg-secondary)]` |
| 브랜드 강조 배경 | `bg-[var(--color-bg-brand-default)]` |
| 위험 액션 배경 | `bg-[var(--color-bg-danger-default)]` |
| 기본 보더 | `border-[var(--color-border-default)]` |
| 포커스 보더 | `border-[var(--color-border-focus)]` |
| 노랑 채움 위 글자 | `text-[var(--color-interactive-primary-text)]` |
| solid 상태 채움 + 흰 글자 | `bg-[var(--color-bg-danger-strong)] text-[var(--color-text-on-strong)]` |
