---
version: alpha
name: ui-kit Design System
description: ui-kit의 비주얼 아이덴티티 — 코딩 에이전트가 한 파일로 정체성·정량 규격을 파악하기 위한 큐레이티드 요약. 값의 정본(SoT)은 src/styles/tokens/{core,semantic}.css이며, 이 파일은 그 위에 "무엇을·왜 그렇게"를 한 화면으로 보여주는 레이어다.
colors:
  brand: "#fabc37"
  brand-hover: "#e6a828"
  brand-text: "#c48e1a"
  bg-primary: "#ffffff"
  bg-secondary: "#faf8f5"
  bg-tertiary: "#f2efe9"
  text-primary: "#141210"
  text-secondary: "#403c38"
  text-tertiary: "#908880"
  text-disabled: "#b5afa5"
  text-inverse: "#ffffff"
  border-default: "#e5e1da"
  border-strong: "#d2cdc4"
  success: "#28c76f"
  warning: "#f97316"
  danger: "#ff4c51"
  info: "#3b82f6"
  category: "#8b5cf6"
typography:
  display-md: { fontSize: 32px, fontWeight: 700, lineHeight: 40px, letterSpacing: -0.5px }
  headline-xl: { fontSize: 24px, fontWeight: 700, lineHeight: 32px, letterSpacing: -0.3px }
  headline-lg: { fontSize: 20px, fontWeight: 700, lineHeight: 28px, letterSpacing: -0.2px }
  headline-sm: { fontSize: 16px, fontWeight: 700, lineHeight: 24px, letterSpacing: 0px }
  body-md-base: { fontSize: 14px, fontWeight: 400, lineHeight: 20px, letterSpacing: 0px }
  body-md-medium: { fontSize: 14px, fontWeight: 500, lineHeight: 20px, letterSpacing: 0px }
  label-md-medium: { fontSize: 14px, fontWeight: 500, lineHeight: 20px, letterSpacing: 0px }
  caption: { fontSize: 12px, fontWeight: 400, lineHeight: 18px, letterSpacing: 0px }
radius:
  xxs: 4px
  xs: 6px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 99999px
spacing-stack:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
spacing-inline:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  xxl: 24px
  xxxl: 28px
spacing-group:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
shadow:
  sm: "카드·hover (살짝 떠 있는 면)"
  md: "드롭다운·팝오버·툴팁"
  lg: "모달·사이드패널"
  xl: "토스트·풀스크린 (최상위)"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.text-primary}"
    radius: "{radius.sm}"
    typography: "{typography.label-md-medium}"
  button-primary-hover:
    backgroundColor: "{colors.brand-hover}"
  card:
    backgroundColor: "{colors.bg-primary}"
    radius: "{radius.lg}"
    padding: "inline-xxl(24) / stack-xl(24)"
  badge-success:
    textColor: "{colors.success}"
  badge-danger:
    textColor: "{colors.danger}"
---

> **이 문서의 위치.** ui-kit 디자인 시스템의 **정체성·정량 규격 요약**이다(수기·큐레이티드). 값의 정본(SoT)은 [`tokens/`](./tokens/) 가이드가 설명하는 `src/styles/tokens/{core,semantic}.css`이고, 컴포넌트 API의 정본은 각 컴포넌트 소스 + 스토리다. 이 파일은 그 위에 "무엇을·왜 그렇게 정하는가"를 한 화면으로 보여주는 레이어다.
> Front matter의 모든 값은 실제 토큰값에서 발췌했다(2계층: core→semantic). **값을 직접 쓰지 말고 항상 semantic 토큰을 `[var(--color-...)]` 형태로 참조한다.**

## Overview

ui-kit은 **골든 앰버(Golden Amber, `#fabc37`) 브랜드**를 축으로 한 범용 프로덕트 UI 라이브러리다. React 19 + Radix UI 프리미티브 + Tailwind v4 + `class-variance-authority`(cva)로 구성한다.

- **톤**: 따뜻한 중성 그레이 배경 위에 텍스트 위계로 정보를 정리하고, 브랜드 앰버는 **행동(action) 신호로만** 절제해서 쓴다.
- **명료함 우선**: 화려함보다 명료함·차분함·고대비 가독성. 강조는 색이 아니라 **굵기·크기·간격 대비**로 만든다.
- **토큰·컴포넌트 우선**: 새 스타일을 발명하지 않는다. semantic 토큰 + `src/components`의 컴포넌트 조합으로만 화면을 만든다.
- **이식성 우선**: className은 항상 임의값 `[var(--token-...)]` 형태로 쓴다. 토큰만 재정의하면 다른 프로젝트로 이식 가능해야 한다.

근거: [`foundation/principles.md`](./foundation/principles.md).

## Colors

브랜드(앰버)는 **행동·강조에만**, 정보 전달은 **중성 텍스트 3단계**로 한다.

- **Brand / Action** — `brand #fabc37`(기본), hover `brand-600 #e6a828`. 주요 버튼·활성 상태 등 "누를 수 있는 것"에만 쓴다. ⚠️ 브랜드 500은 **밝은 색**이므로 그 위 텍스트는 반드시 다크(`--color-interactive-primary-text` = neutral-900). 흰 배경 위 브랜드 텍스트는 가독성을 위해 `--color-text-brand-default`(brand-700).
- **Surface** — `bg-primary #ffffff`(카드·패널), `bg-secondary`(neutral-50)·`bg-tertiary`(neutral-100)로 한 단계씩 낮춘다. 면은 색이 아니라 **명도 단계**로 위계를 만든다. Tailwind 유틸 호환 표면 계층은 `surface-{subtlest…strongest}`.
- **Text (3단계)** — `text-primary`(neutral-900, 본문·제목), `text-secondary`(neutral-700, 보조·라벨), `text-tertiary`(neutral-500, 캡션·약한 보조). 그 외 `text-disabled`(neutral-400, 본문 금지), `text-inverse`(white, 어두운 면 위).
- **Border** — `border-default`(neutral-200, 기본 구분선), `border-subtle`(neutral-100, 옅은 경계), `border-strong`(neutral-300, 강조). 입력은 `border-input-default`(neutral-300) / focus `border-input-focus`(brand-500).
- **Status** — `success #28c76f`(green) · `warning #f97316`(orange) · `danger #ff4c51`(red) · `info #3b82f6`(blue). 의미 전달(상태·결과)에만 쓰고 장식으로 쓰지 않는다. 색만으로 의미를 전달하지 말고 아이콘·텍스트를 병기한다.
- **Category** — `category #8b5cf6`(purple). 분류·태그 계열. 상태색·브랜드와 구분되는 중립 강조색.

규칙: **raw hex/rgb 금지** — `[var(--color-text-primary)]`·`[var(--color-bg-brand-default)]`·`[var(--color-border-default)]` 같은 semantic 토큰만 참조한다(core 팔레트 `--color-brand-500` 직접 참조도 금지). 근거: [`foundation/color.md`](./foundation/color.md).

## Typography

ui-kit은 특정 웹폰트를 강제하지 않는다(호스트 앱이 패밀리 지정). 위계는 크기·굵기·자간으로 구분한다.

| 스케일 | size / weight / line-height | 용도 |
|---|---|---|
| `display-md` | 32 / 700 / 40 | 페이지 최상위 타이틀(대형) |
| `headline-xl` | 24 / 700 / 32 | 페이지 타이틀(기본) |
| `headline-lg` | 20 / 700 / 28 | 섹션/모달 헤더 |
| `headline-sm` | 16 / 700 / 24 | 폼 섹션 타이틀 |
| `body-md-base` | 14 / 400 / 20 | 본문 기본 |
| `body-md-medium` | 14 / 500 / 20 | 강조 본문·값 |
| `label-md-medium` | 14 / 500 / 20 | 버튼·폼 라벨 |
| `caption` | 12 / 400 / 18 | 보조 설명·메타 |

- **웨이트 접미사 규칙**: `body`·`label` 계열은 반드시 `-base`(400)/`-medium`(500)/`-bold`(700) 접미사로 굵기를 명시한다(`--token-typography-body-md-medium-*`). `label-xs`만 예외로 무접미(400 고정).
- **`headline`·`display`·`caption`·`code`는 무접미** — weight가 스케일에 고정.
- raw `font-size`/`px` 금지 — `--token-typography-*` 토큰만 사용.

근거: [`foundation/typography.md`](./foundation/typography.md).

## Layout

ui-kit은 라이브러리이므로 페이지 셸을 강제하지 않는다 — 컴포넌트는 자기 폭을 강제하지 않고, 폭은 호스트 앱이 결정한다.

- **콘텐츠 폭(권장)**: 리스트 = 풀폭 `w-full`, 상세 = `max-w-[1136px]` 중앙, 생성/폼 = `max-w-[720px]` 중앙. (라이브러리 강제값 아님 — 호스트 앱 컨벤션)
- **간격 리듬(정량)**: **구획은 크게, 묶음은 촘촘히.** 세로 흐름은 `stack`, 가로 패딩은 `inline`, 요소 묶음 gap은 `group` 토큰. ui-kit 스케일 상한이 `stack-xxl`(32)이므로 **구획 최대 리듬 = 32**다(레퍼런스의 40 리듬을 ui-kit 스케일에 맞춰 32로 대응).

  | 관계 | 간격 토큰 | px |
  |---|---|---|
  | PageHeader ↔ 본문 / 섹션 ↔ 섹션 | `gap-stack-xxl` | 32 |
  | 섹션 타이틀 ↔ 첫 필드 / 필드 ↔ 필드 | `gap-stack-xl` | 24 |
  | 컨트롤 ↔ 테이블 | `gap-stack-md` | 12 |
  | 라벨 ↔ 입력 | `gap-group-xs` | 4 |

  전체 표·카드 패딩·오버레이 폭: [`foundation/layout-grid.md`](./foundation/layout-grid.md).

## Elevation & Depth

그림자는 **면을 띄우는 의미**일 때만 4단계로 쓴다. 평면 구분은 그림자가 아니라 `border`·표면 명도로 한다.

| 토큰 | 의미·용도 |
|---|---|
| `--token-shadow-default-sm` | 카드 · hover (살짝 떠 있는 면) |
| `--token-shadow-default-md` | 드롭다운 · 팝오버 · 툴팁 |
| `--token-shadow-default-lg` | 모달 · 사이드패널 |
| `--token-shadow-default-xl` | 토스트 · 풀스크린 (최상위) |

- 정의: `src/styles/tokens/core.css` (`--token-shadow-default-*`). 그림자를 장식으로 남용하지 않는다.

## Shapes

반경은 **위계에 따라 차등**한다(모든 모서리를 큰 라운드로 균일 처리 금지).

| 토큰 | px | 용도 |
|---|---|---|
| `--token-radius-xxs` / `-xs` | 4 / 6 | 마이크로 요소·배지 |
| `--token-radius-sm` | 8 | **버튼 · 인풋 · 작은 컨트롤** |
| `--token-radius-md` | 12 | 중간 컨테이너 |
| `--token-radius-lg` | 16 | **카드 · 패널 · 모달** |
| `--token-radius-xl` | 24 | 큰 컨테이너 |
| `--token-radius-full` | 99999 | **원형 · pill** |

## Components

화면은 `src/components`에서 import한 **컴포넌트 + semantic 토큰** 조합으로만 만든다. 카탈로그에 있으면 재구현 금지 — import만 한다. 전체 목록·API는 [`components/`](./components/) 문서 트리와 각 컴포넌트 스토리.

대표 컴포넌트:

- **Button**(primary) — `bg-[var(--color-interactive-primary-bg)]` / `text-[var(--color-interactive-primary-text)]`(다크) / `rounded-[var(--token-radius-sm)]`, hover `bg-[var(--color-interactive-primary-bg-hover)]`.
- **Card** — `bg-[var(--color-bg-primary)]` / `rounded-[var(--token-radius-lg)]`(16) / 패딩 `inline-xxl`(24)·`stack-xl`(24).
- **Input / Select** — control 높이 `md`(36) 기본·`lg`(44) 큰 입력, `rounded-sm`(8), 정적 폭이 필요하면 `field-{sm,md,lg}`(200/280/320).
- **Badge / Tag** — 상태색 텍스트 + 옅은 틴트 면(`bg-*-subtle`).
- **EmptyState** — 0건 / 검색 없음 / 로드 실패. (패턴: [`patterns/empty-state.md`](./patterns/empty-state.md))
- **Modal / Sheet(SidePanel)** — 폭에 따라 선택: 360/480 → Modal, 640/800 → SidePanel, 그 이상 → 풀스크린.

## Do's and Don'ts

**Do**
- semantic 토큰만 임의값으로 참조(`[var(--color-...)]`·`[var(--token-...)]`·`gap-stack-*`·`px-inline-*`·`rounded-[var(--token-radius-*)]`).
- `src/components`의 컴포넌트를 import해 조합. 빈 상태·확인 모달 등은 [`patterns/`](./patterns/) 스켈레톤대로.
- 브랜드 컬러는 행동·강조에만, 상태색은 의미 전달에만.
- 밝은 브랜드 배경 위 텍스트는 항상 다크(`--color-interactive-primary-text`).

**Don't**
- raw hex/rgb/임의 px 하드코딩 금지(토큰 미존재 시 core.css에 먼저 추가).
- core 팔레트(`--color-brand-500` 등) 직접 참조 금지 — semantic 경유.
- 카탈로그에 있는 컴포넌트 재구현 금지.
- 장식용 그라디언트·글로우·과한 진입 애니메이션 남용 금지([`foundation/motion.md`](./foundation/motion.md)).

---

## 관련 문서

- 디자인 시스템 진입점: [`README.md`](./README.md)
- 토큰: [`tokens/_convention.md`](./tokens/_convention.md) · [`tokens/core.md`](./tokens/core.md) · [`tokens/semantic.md`](./tokens/semantic.md)
- 파운데이션: [`foundation/principles.md`](./foundation/principles.md) · [`foundation/color.md`](./foundation/color.md) · [`foundation/typography.md`](./foundation/typography.md) · [`foundation/layout-grid.md`](./foundation/layout-grid.md) · [`foundation/motion.md`](./foundation/motion.md) · [`foundation/a11y.md`](./foundation/a11y.md)
- 패턴 인덱스: [`patterns/README.md`](./patterns/README.md)
