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
| `--color-border-strong` | `neutral-300` |
| `--color-border-brand-default` | `brand-500` |
| `--color-border-danger-default` | `red-500` |
| `--color-border-info-default` | `blue-500` |
| `--color-border-disabled` | `neutral-200` |
| `--color-border-focus` | `brand-400` (포커스 링 — offset과 함께 사용) |

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
| `--color-icon-success-default` | `bg-success-default` |

## Surface · Action (alias)

`bg-surface-default` 같은 Tailwind 유틸 호환용 alias. 기존 semantic 토큰을 다시 가리킨다.
신규 코드는 위의 text/bg/border/interactive 토큰을 우선 사용하고, 이 alias는 호환이 필요할 때만 쓴다.

| 토큰 | → |
|---|---|
| `--token-color-surface-default` | `bg-primary` |
| `--token-color-surface-brand-default` | `bg-brand-default` |
| `--token-color-surface-brand-subtle` | `bg-brand-subtle` |
| `--token-color-surface-brand-subtlest` | `bg-brand-subtle` |
| `--token-color-surface-brand-muted` | `bg-brand-subtle-hover` |
| `--token-color-surface-brand-strong` | `bg-brand-hover` |
| `--token-color-text-primary` | `text-primary` |
| `--token-color-text-secondary` | `text-secondary` |
| `--token-color-text-tertiary` | `text-tertiary` |
| `--token-color-text-inverse` | `text-inverse` |
| `--token-color-action-primary-default` | `bg-brand-default` |
| `--token-color-action-primary-hover` | `bg-brand-hover` |
| `--token-color-action-tertiary-default` | `bg-secondary` |
| `--token-color-action-tertiary-hover` | `bg-tertiary` |
