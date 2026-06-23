# Foundation — 디자인 원칙

> ui-kit 전반에 적용되는 "왜·어떻게" 원칙. 토큰 사용·컴포넌트 재사용·접근성·AI 클리셰 회피의 상위 기준.

## 핵심 원칙

- **스택:** React 19 + Radix UI + Tailwind v4 + class-variance-authority(cva) + TypeScript. 배포는 tsup, 문서·시연은 Storybook, 검증은 vitest.
- **토큰 2계층:** raw 팔레트(`src/styles/tokens/core.css`) → 의미 토큰(`src/styles/tokens/semantic.css`). **컴포넌트는 semantic 토큰만 참조**한다.
- **이식성 우선 className 규칙:** 색·간격은 항상 임의값 형태 `[var(--color-...)]`·`[var(--token-...)]`로 쓴다. Tailwind 유틸 별칭(`bg-bg-*` 등)·raw hex·임의 px 금지. 라이브러리를 다른 프로젝트로 이식해도 토큰만 재정의하면 동작해야 한다.
- **Preflight 고려:** Tailwind v4 preflight가 호스트 앱 스타일과 충돌할 수 있으므로, 컴포넌트는 전역 reset에 의존하지 않고 자기 스타일을 토큰으로 명시한다.

## 작업 규칙 (요약)

- **semantic 토큰만** — core.css의 raw 토큰(`--color-brand-500` 등)·raw hex/rgb/px 직접 참조 금지. 값 카탈로그 → [color.md](color.md) · [typography.md](typography.md).
- **재사용 우선** — 새 UI를 만들기 전 기존 컴포넌트(`src/components/primitives/`)에 같은 기능이 있는지 확인. 있으면 재구현하지 말고 조합·확장한다.
- **disabled 패턴** — 비활성은 `disabled` prop으로 표현한다. 조건부 언마운트(`{cond && <Button/>}`)로 인터랙티브 요소를 마운트/언마운트하지 않는다(포커스·이벤트 핸들러 소실 위험).
- **상태색은 의미 토큰으로** — `danger`·`success`·`warning`·`info` 전용 토큰 계열만 쓰고 임의 색을 만들지 않는다.

## 토큰 사용 예시

컴포넌트 className은 semantic 토큰을 임의값으로 참조한다.

```tsx
// ✅ 이식 가능한 형태 — semantic 토큰을 var()로 참조
<button
  className="
    bg-[var(--color-interactive-primary-bg)]
    text-[var(--color-interactive-primary-text)]
    hover:bg-[var(--color-interactive-primary-bg-hover)]
    border-[var(--color-border-default)]
  "
>
  저장
</button>

// ❌ raw hex·임의 px·유틸 별칭
<button className="bg-[#fabc37] text-[#141210] p-[13px] bg-bg-brand-default" />
```

`cva`로 variant를 정의할 때도 동일하게 토큰만 사용한다.

```tsx
const button = cva("inline-flex items-center justify-center rounded-[var(--token-radius-sm)]", {
  variants: {
    intent: {
      primary: "bg-[var(--color-interactive-primary-bg)] text-[var(--color-interactive-primary-text)] hover:bg-[var(--color-interactive-primary-bg-hover)]",
      secondary: "bg-[var(--color-interactive-secondary-bg)] text-[var(--color-interactive-secondary-text)] border border-[var(--color-interactive-secondary-border)]",
      ghost: "text-[var(--color-interactive-ghost-text)] hover:bg-[var(--color-interactive-ghost-bg-hover)]",
      destructive: "bg-[var(--color-interactive-destructive-bg)] text-[var(--color-interactive-destructive-text)] hover:bg-[var(--color-interactive-destructive-bg-hover)]",
    },
  },
});
```

## 접근성

- 모든 인터랙티브 요소는 **키보드만으로 조작 가능**해야 한다.
- 마우스 전용 보조 버튼(입력 clear ×·비밀번호 eye 토글 등)은 `tabIndex={-1}`로 Tab 순서에서 제외한다.
- `span[role="button"]`처럼 native 활성화가 없는 요소는 `onKeyDown`(Enter/Space)을 직접 처리한다.
- 키보드 포커스 위치가 보이도록 한다(`focus-visible`). 포커스 링은 `--color-border-focus` 사용.

> Radix 자동 보장 vs 호출부 책임 경계, 영역별 체크: [a11y.md](a11y.md).

## 흔한 안티패턴 (❌ → ✅)

> 리뷰에서 가장 자주 잡히는 위반. 좌측을 발견하면 우측으로 고친다.

| ❌ 안티패턴 | ✅ 올바른 방식 |
|---|---|
| 이미 있는 컴포넌트를 `<div>` 조합으로 다시 구현(버튼·셀렉트 등) | `src/components/primitives/`에서 import 후 조합 |
| raw hex·rgb·임의 px (`text-[#141210]`·`p-[13px]`·`text-[14px]`) | semantic 토큰 임의값 (`text-[var(--color-text-primary)]`·`px-[var(--token-spacing-inline-md)]`) |
| core 팔레트 직접 참조 (`bg-[var(--color-brand-500)]`) | semantic 경유 (`bg-[var(--color-bg-brand-default)]`) |
| 유틸 별칭 클래스 (`bg-bg-primary`·`text-text-primary`) | 임의값 형태 (`bg-[var(--color-bg-primary)]`) — 이식성 보장 |
| 조건부 언마운트로 비활성 처리 (`{!editable && <Button/>}`) | `disabled` prop 사용(마운트 유지 — 이벤트 소실 방지) |
| 상태를 색만으로 전달(빨강=에러) | 색 + 아이콘/텍스트 병기 |
| 밝은 브랜드 배경 위에 흰 텍스트 | 브랜드 배경(`--color-bg-brand-default`)은 밝은 골든이므로 텍스트는 다크(`--color-interactive-primary-text` = neutral-900) |

## AI 클리셰 회피

"문법은 맞지만 AI 티 나는" 결과를 피한다.

- 보라-파랑 그라디언트·네온 글로우·기본값 글래스모피즘 남용 금지.
- 모든 모서리를 큰 라운드로 균일하게 처리하지 않는다 — 위계에 따라 반경을 차등(`--token-radius-*`).
- 불필요한 진입 애니메이션·무한 회전·과한 패럴랙스 금지([motion.md](motion.md)).
- 라벨·문구는 자연스러운 문장형으로 — 전체 대문자·번역체 지양.
- 강조는 그라디언트 텍스트가 아니라 굵기·크기 대비로([typography.md](typography.md)).

## 검수

UI 작업 완료 후 스스로 점검한다: semantic 토큰만 사용했는지, 기존 컴포넌트를 재사용했는지, disabled 패턴을 지켰는지, 키보드·focus-visible이 동작하는지. Storybook의 해당 스토리로 인터랙션을 확인하고, 토큰 위반은 `grep`으로 raw hex(`#[0-9a-f]`)·임의 px(`-\[[0-9]+px\]`)를 검색해 0건인지 확인한다.
