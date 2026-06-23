# 디자인 시스템 문서

`ui-kit`의 디자인 시스템(DS) 규칙·토큰·패턴·컴포넌트 사용법을 모아둔 문서 트리다.
화면을 조립하거나 새 컴포넌트를 추가할 때 **코드를 건드리기 전에** 여기서 규칙을 먼저 확인한다.

## 스택

React 19 + Radix UI 프리미티브 + Tailwind CSS v4 + `class-variance-authority`(cva).
빌드는 `tsup`, 문서·플레이그라운드는 Storybook, 테스트는 Vitest.

## 문서 구조

```
docs/design-system/
├── README.md          ← 지금 이 문서 (진입점)
├── foundation/        디자인 원칙·시각 언어
│   ├── principles.md      DS 전반의 설계 원칙
│   ├── color.md           색 사용 규칙 (semantic 매핑)
│   ├── typography.md      타입 스케일·역할
│   ├── layout-grid.md     레이아웃·그리드·간격 규칙
│   ├── motion.md          전환·애니메이션 가이드
│   └── a11y.md            접근성 기준
├── tokens/            디자인 토큰 정본 가이드
│   ├── _convention.md     2계층 토큰 모델·네이밍·사용 규칙
│   ├── core.md            raw 팔레트 (값의 출처)
│   └── semantic.md        의미 토큰 (컴포넌트가 참조하는 계층)
├── patterns/          화면 조립용 레이아웃·조합 패턴
│   ├── README.md
│   ├── form-layout.md     입력·생성·수정 화면
│   ├── list-layout.md     표/카드 나열·검색·페이지네이션
│   ├── detail-layout.md   단일 항목 읽기 전용
│   ├── empty-state.md     0건·검색 없음·로드 실패
│   ├── confirm-modal.md   차단형 재확인
│   └── error-handling.md  검증·서버 오류 표시 수단 선택
└── components/        개별 컴포넌트 사용 문서 (button·input·select … 보유분)
```

## 4계층 모델

| 계층 | 무엇을 정하나 | 정본(SoT) |
|---|---|---|
| **foundation** | 색·타입·간격·모션·접근성의 *원칙* | 문서 자체 |
| **tokens** | 실제 색/치수 *값* | `src/styles/tokens/*.css` |
| **patterns** | 부품을 배치하는 *골격* | 문서 자체 + 스토리 |
| **components** | 개별 부품의 *API·variant* | 컴포넌트 소스 + 스토리 |

## 네이밍 컨벤션

- **파일·디렉터리**: kebab-case (`form-layout.md`, `layout-grid.md`).
- **`_` 접두사 = 메타 문서.** 카탈로그가 아니라 규칙·컨벤션을 정의하는 문서에 붙인다 (예: `tokens/_convention.md`). 정렬 시 목록 상단에 모이고, "값 카탈로그"와 "규칙 문서"를 한눈에 구분한다.
- 컴포넌트 문서 파일명은 컴포넌트의 export 이름을 kebab-case로 (`link-button.md` ↔ `LinkButton`).

## SoT(Source of Truth) 규칙

문서는 값을 **복제하지 않고 출처를 가리킨다.** 값이 바뀌면 출처만 고치고 문서는 출처를 인용한다.

| 대상 | 정본 | 문서의 역할 |
|---|---|---|
| **토큰 값** (hex·px·스케일) | `src/styles/tokens/core.css`, `src/styles/tokens/semantic.css` | 값을 설명·분류. 값 자체가 어긋나면 CSS가 옳다. |
| **컴포넌트 동작·variant** | 컴포넌트 소스(`src/components/…`) + 해당 스토리 | API·prop·상태는 소스/스토리가 옳다. 문서는 사용 의도를 설명. |
| **원칙·패턴** | foundation·patterns 문서 자체 | 코드로 강제되지 않는 합의는 문서가 정본. |

토큰 진입 파일은 `src/styles/tokens.css`(core + semantic을 import). dev/플레이그라운드용 `src/styles/index.css`가 토큰을 Tailwind v4 `@theme inline`으로 노출한다.

## 토큰 사용 규칙 (요약)

자세한 규칙은 [`tokens/_convention.md`](./tokens/_convention.md) 참조.

- 컴포넌트는 **semantic 토큰만** 참조한다. core 팔레트 직접 참조 금지.
- 이식성을 위해 className에 **임의값 `[var(--color-...)]` 형태**로 쓴다. 프로젝트별 Tailwind 설정에 의존하지 않는다.
- raw hex/rgb, 임의 px, Tailwind 색·간격 유틸(`bg-red-500`·`p-4` 등) 금지.

## 기여 가이드

1. **값을 바꾼다** → `src/styles/tokens/*.css`를 수정하고, 분류가 달라졌으면 `tokens/core.md`·`tokens/semantic.md`의 표를 맞춘다.
2. **컴포넌트를 추가한다** → 소스 + 스토리 + (필요 시) `components/<name>.md`. 색·간격·타이포는 semantic 토큰만 사용.
3. **새 패턴을 정의한다** → `patterns/<name>.md` 추가 후 `patterns/README.md` 표에 등록.
4. **새 토큰을 추가한다** → `tokens/_convention.md`의 "새 토큰 추가 절차"를 따른다 (core에 값 → semantic에 의미 → 문서 갱신 순).
5. 문서는 **출처를 인용**하되 값을 복제하지 않는다. 복제가 불가피하면 "정본: `<경로>`"를 함께 적는다.

## 관련 진입 문서

- 토큰 규칙: [`tokens/_convention.md`](./tokens/_convention.md)
- raw 팔레트: [`tokens/core.md`](./tokens/core.md)
- 의미 토큰: [`tokens/semantic.md`](./tokens/semantic.md)
- 디자인 원칙: [`foundation/principles.md`](./foundation/principles.md)
- 레이아웃 패턴 인덱스: [`patterns/README.md`](./patterns/README.md)
