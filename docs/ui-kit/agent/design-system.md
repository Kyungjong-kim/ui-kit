# ui-kit 디자인 시스템 (에이전트용 가이드)

---

## 1. 디자인 토큰 구조

ui-kit는 **2계층 토큰** 구조를 따릅니다.

```
src/styles/
├── tokens.css                 # dist 배포 진입점 (core + semantic import)
├── index.css                  # Storybook/dev 전용 (tailwindcss + @theme inline 포함)
└── tokens/
    ├── core.css               # raw 값 (#fabc37 등) — 직접 참조 금지
    └── semantic.css           # core 참조하는 의미 토큰 — 컴포넌트가 사용
```

**원칙**: 컴포넌트는 **semantic 토큰만** 참조한다. core 토큰을 직접 쓰지 않는다.

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
| **text** | `--color-text-{primary, secondary, tertiary, disabled, inverse, brand-default, brand-hover, danger-default, success-default, warning-default, info-default}` | `--color-text-primary` |
| **bg** | `--color-bg-{primary, secondary, tertiary, inverse, brand-default, brand-hover, brand-subtle, danger-default, danger-subtle, success-default, success-subtle, warning-default, warning-subtle, info-default, info-subtle, disabled}` | `--color-bg-brand-default` |
| **border** | `--color-border-{default, strong, brand-default, danger-default, info-default, disabled, focus}` | `--color-border-default` |
| **interactive** | `--color-interactive-{primary, secondary, ghost, destructive}-{bg, bg-hover, text, border}` | `--color-interactive-primary-bg` |

**`index.css`의 `@theme inline` 블록을 통해 Storybook dev 환경에서 `bg-bg-brand-default` 같은 클래스로 노출됨. 컴포넌트 자체는 `[var(--...)]` 방식 사용.**

---

## 4. 작업 원칙

| 규칙 | 위반 예 | 올바른 예 |
|---|---|---|
| **하드코딩 색상 금지** | `bg-[#fabc37]` | `bg-bg-brand-default` |
| **core 토큰 직접 사용 금지** | `bg-brand-500` | `bg-bg-brand-default` (semantic 경유) |
| **임의 px 금지** | `p-[7px]` | `p-2` (Tailwind 기본 spacing) |
| **새 색상 필요 시 토큰 먼저 추가** | 컴포넌트에 색상 직접 정의 | `tokens/semantic.css`에 토큰 추가 후 참조 |

---

## 5. variant 패턴 (cva)

컴포넌트는 `class-variance-authority` 사용. variant·size 두 키로 표준화:

```ts
const buttonVariants = cva("기본 공통 클래스", {
  variants: {
    variant: {
      primary: "bg-bg-brand-default text-white",
      secondary: "bg-white border border-border-default",
      ghost: "hover:bg-bg-tertiary",
      destructive: "bg-bg-danger-default text-white",
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
2. core 토큰에 색상 단계 추가 (필요 시) — `tokens/core.css`
3. semantic 토큰 추가 — `tokens/semantic.css`
4. `index.css` `@theme inline` 블록에 새 토큰 추가
5. `pnpm build` 실행해 `dist/styles.css` 갱신 확인
5. 기존 컴포넌트에 영향이 있는지 grep 검토
6. `agent/design-system.md` 갱신 (이 문서)

---

## 7. 자주 사용하는 토큰 빠른 참조

| 용도 | 토큰 |
|------|------|
| 본문 텍스트 | `text-text-primary` |
| 보조 텍스트 | `text-text-secondary` |
| 비활성 텍스트 | `text-text-disabled` |
| 기본 배경 | `bg-bg-primary` |
| 카드/패널 배경 | `bg-bg-secondary` |
| 브랜드 강조 배경 | `bg-bg-brand-default` |
| 위험 액션 배경 | `bg-bg-danger-default` |
| 기본 보더 | `border-border-default` |
| 포커스 보더 | `border-border-focus` |
