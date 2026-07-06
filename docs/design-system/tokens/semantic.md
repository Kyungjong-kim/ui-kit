# Semantic 토큰 (의미 계층)

역할·의미 기반 토큰. **컴포넌트가 참조하는 유일한 계층**이다.
각 토큰은 값을 직접 들고 있지 않고 [core](./core.md) 팔레트를 `var()`로 가리킨다.

- 정의: `src/styles/tokens/semantic.css` (`:root`)
- 값 정본(SoT): 위 파일. 이 문서와 어긋나면 CSS가 옳다.
- 사용·추가 규칙: [`_convention.md`](./_convention.md)

컴포넌트에서는 className 임의값으로 쓴다:

```tsx
<button className="bg-[var(--color-interactive-primary-bg)] text-[var(--color-interactive-primary-text)] hover:bg-[var(--color-interactive-primary-bg-hover)]" />
```

## Text

| 토큰 | → core |
|---|---|
| `--color-text-primary` | `neutral-900` |
| `--color-text-secondary` | `neutral-700` |
| `--color-text-tertiary` | `neutral-500` |
| `--color-text-disabled` | `neutral-400` |
| `--color-text-inverse` | `white` |
| `--color-text-brand-default` | `brand-700` (흰 배경 가독성용 딥 앰버) |
| `--color-text-brand-hover` | `brand-800` |
| `--color-text-danger-default` | `red-500` |
| `--color-text-success-default` | `green-500` |
| `--color-text-warning-default` | `orange-600` |
| `--color-text-info-default` | `blue-700` |
| `--color-text-category-default` | `purple-600` |

> 브랜드·상태·category 계열에는 `-hover` 변형도 있다(default보다 한 단계 진하게): `--color-text-{brand,danger,success,warning,info,category}-hover`.

## Background

| 토큰 | → core |
|---|---|
| `--color-bg-primary` | `white` |
| `--color-bg-secondary` | `neutral-50` |
| `--color-bg-tertiary` | `neutral-100` |
| `--color-bg-inverse` | `neutral-900` |
| `--color-bg-brand-default` | `brand-500` |
| `--color-bg-brand-hover` | `brand-600` |
| `--color-bg-brand-subtle` | `brand-50` |
| `--color-bg-brand-subtle-hover` | `brand-100` |
| `--color-bg-danger-default` | `red-500` |
| `--color-bg-danger-subtle` | `red-50` |
| `--color-bg-success-default` | `green-500` |
| `--color-bg-success-subtle` | `green-50` |
| `--color-bg-warning-default` | `orange-500` |
| `--color-bg-warning-subtle` | `orange-50` |
| `--color-bg-info-default` | `blue-500` |
| `--color-bg-info-subtle` | `blue-50` |
| `--color-bg-disabled` | `neutral-100` |

## Border

| 토큰 | → core |
|---|---|
| `--color-border-default` | `neutral-200` |
| `--color-border-subtle` | `neutral-100` (default보다 옅은 경계) |
| `--color-border-strong` | `neutral-300` |
| `--color-border-hover` | `neutral-300` |
| `--color-border-inverse` | `neutral-700` |
| `--color-border-input-default` / `-input-focus` | `neutral-300` / `brand-500` |
| `--color-border-focus` | `brand-400` (포커스 링 — offset과 함께 사용) |
| `--color-border-disabled` | `neutral-200` |
| `--color-border-tertiary-default` / `-hover` | `neutral-200` / `neutral-300` |
| `--color-border-{brand,danger,info,success,warning}-default` | 각 계열 `500` |
| `--color-border-{brand,danger,info,success,warning}-hover` | 각 계열 `600` |
| `--color-border-{brand,danger,info,success,warning}-subtle` | 각 계열 `200` |
| `--color-border-category-default` / `-hover` / `-subtle` | `purple-500` / `-600` / `-200` |

## Interactive

> ⚠️ primary 버튼 배경이 밝은 골든(`brand-500`)이라 텍스트는 반드시 다크(`neutral-900`).

| 토큰 | → core |
|---|---|
| `--color-interactive-primary-bg` | `brand-500` |
| `--color-interactive-primary-bg-hover` | `brand-600` |
| `--color-interactive-primary-text` | `neutral-900` |
| `--color-interactive-secondary-bg` | `white` |
| `--color-interactive-secondary-border` | `neutral-300` |
| `--color-interactive-secondary-text` | `neutral-900` |
| `--color-interactive-ghost-text` | `neutral-700` |
| `--color-interactive-ghost-bg-hover` | `neutral-100` |
| `--color-interactive-destructive-bg` | `red-500` |
| `--color-interactive-destructive-bg-hover` | `red-600` |
| `--color-interactive-destructive-text` | `white` |

## Icon

`Icon` 컴포넌트의 colorTokenMap 키와 매핑된다. 다수가 text/bg 토큰을 다시 가리킨다.

| 토큰 | → |
|---|---|
| `--color-icon-primary` | `text-primary` |
| `--color-icon-secondary` | `text-secondary` |
| `--color-icon-tertiary` | `text-tertiary` |
| `--color-icon-subtle` | `text-tertiary` |
| `--color-icon-muted` | `text-tertiary` |
| `--color-icon-disabled` | `text-disabled` |
| `--color-icon-inverse` | `text-inverse` |
| `--color-icon-brand-default` | `bg-brand-default` |
| `--color-icon-brand-hover` | `bg-brand-hover` |
| `--color-icon-danger-default` | `bg-danger-default` |
| `--color-icon-danger-hover` | `interactive-destructive-bg-hover` |
| `--color-icon-success-default` / `-hover` | `bg-success-default` / `green-600` |
| `--color-icon-{danger,warning,info}-muted` | 각 계열 `300` (옅은 아이콘) |
| `--color-icon-{warning,info}-default` / `-hover` | 각 계열 bg-default / `600` |
| `--color-icon-category-default` / `-hover` / `-muted` | `purple-500` / `-600` / `-300` |

## Surface · Action (alias)

`bg-surface-default` 같은 Tailwind 유틸 호환용 alias. 기존 semantic 토큰을 다시 가리킨다.
신규 코드는 위의 text/bg/border/interactive 토큰을 우선 사용하고, 이 alias는 호환이 필요할 때만 쓴다.

neutral surface 는 `subtlest`(25) → `strongest`(400) 로 진해진다. 상태·brand·category 계열도 `subtlest → strongest` 단계.

| 토큰 | → |
|---|---|
| `--token-color-surface-default` | `bg-primary` |
| `--token-color-surface-subtlest` | `neutral-25` |
| `--token-color-surface-subtle` | `bg-secondary` (neutral-50) |
| `--token-color-surface-muted` | `bg-tertiary` (neutral-100) |
| `--token-color-surface-strong` / `-stronger` / `-strongest` | `neutral-200` / `-300` / `-400` |
| `--token-color-surface-brand-{subtlest,subtle,muted,default,strong,stronger,strongest}` | brand 계층 (subtlest→900) |
| `--token-color-surface-success-{subtlest,subtle,muted,strong,stronger,strongest}` | green 계층 |
| `--token-color-surface-danger-{subtlest,subtle,muted,strong,stronger,strongest}` | red 계층 |
| `--token-color-surface-warning-{subtlest,subtle,muted,strong,stronger,strongest}` | orange 계층 |
| `--token-color-surface-info-{subtlest,subtle,muted,strong,stronger,strongest}` | blue 계층 |
| `--token-color-surface-category-{subtlest,subtle,muted,default,strong,stronger,strongest}` | purple 계층 |
| `--token-color-text-primary` | `text-primary` |
| `--token-color-text-secondary` | `text-secondary` |
| `--token-color-text-tertiary` | `text-tertiary` |
| `--token-color-text-inverse` | `text-inverse` |
| `--token-color-action-primary-default` | `bg-brand-default` |
| `--token-color-action-primary-hover` | `bg-brand-hover` |
| `--token-color-action-tertiary-default` | `bg-secondary` |
| `--token-color-action-tertiary-hover` | `bg-tertiary` |

## 다크모드 (`[data-theme="dark"]`)

`semantic.css` 는 `:root`(라이트) 외에 `[data-theme="dark"]` 블록에서 text·bg·surface·border·icon 계열을 재정의한다. core 팔레트는 불변이며 semantic 매핑만 다크 값으로 교체된다.

| 토큰 | 라이트 | 다크 |
|---|---|---|
| `--color-text-primary` | `neutral-900` | `neutral-25` |
| `--color-text-secondary` | `neutral-700` | `neutral-300` |
| `--color-bg-primary` | `white` | `neutral-900` |
| `--color-bg-secondary` | `neutral-50` | `neutral-800` |
| `--color-border-default` | `neutral-200` | `neutral-700` |
| `--color-text-brand-default` | `brand-700` | `brand-300` |
| `--token-color-surface-strong` | `neutral-200` | `neutral-700` |

> 라이트/다크 나란히 비교: Storybook `Docs/Design Tokens` 7절. 전체 다크 매핑은 `semantic.css` `[data-theme="dark"]` 블록이 SoT.
