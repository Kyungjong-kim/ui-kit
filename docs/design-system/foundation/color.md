# Foundation — 컬러

> 어떤 상황에 어떤 **의미 토큰(semantic)**을 쓰는지. raw 팔레트(core) 직접 사용 금지 — 항상 semantic 경유.

## 계층

raw 팔레트(`core.css`) → **의미 토큰(`semantic.css`)** → 컴포넌트 className. 컴포넌트는 semantic 토큰만 `[var(--color-...)]` 형태로 참조한다.

- raw 팔레트: `src/styles/tokens/core.css` — `--color-{brand,neutral,red,green,orange,blue,purple}-{25..900}` 등 (직접 참조 금지)
- 의미 토큰: `src/styles/tokens/semantic.css` — `--color-text-*` · `--color-bg-*` · `--color-surface-*` · `--color-border-*` · `--color-icon-*` · `--color-interactive-*`

## raw 팔레트 (core)

색상 카테고리와 대표값(50/500/900). 의미 토큰이 가리키는 원천이며, 컴포넌트에서 직접 쓰지 않는다.

| 카테고리 | 역할 | 50 | 500 | 900 |
|---|---|---|---|---|
| **brand** (Golden Amber) | 브랜드·기본 액션 | `#fff8d9` | `#fabc37` | `#7a5812` |
| **neutral** (Warm Gray) | 텍스트·배경·테두리 | `#faf8f5` | `#908880` | `#141210` |
| **red** | 위험·삭제·에러 | `#ffebea` | `#ff4c51` | `#bf383d` |
| **green** | 성공 | `#e6f8ef` | `#28c76f` | `#1e9553` |
| **orange** | 경고 (브랜드가 골든이라 노랑 대신 오렌지로 구분) | `#fff1e0` | `#f97316` | `#783908` |
| **blue** | 정보 | `#eff6ff` | `#3b82f6` | `#1e3a8a` |
| **purple** | 분류·태그(category) | `#f4eeff` | `#8b5cf6` | `#472a85` |

> ⚠️ 브랜드 500(`#fabc37`)은 **밝은 색**이다. 이 색을 배경으로 쓰면 그 위 텍스트는 반드시 다크(neutral-900)를 사용한다 — 흰 텍스트는 대비 미달.

## 텍스트 (`--color-text-*`)

| 토큰 | 가리키는 값 | 용도 |
|---|---|---|
| `--color-text-primary` | neutral-900 | 본문·제목 기본 |
| `--color-text-secondary` | neutral-700 | 보조 텍스트 |
| `--color-text-tertiary` | neutral-500 | 캡션·약한 보조 |
| `--color-text-disabled` | neutral-400 | 비활성 텍스트 (본문에 쓰지 말 것) |
| `--color-text-inverse` | white | 어두운 배경 위 텍스트 |
| `--color-text-brand-default` | brand-700 | 링크·브랜드 강조 (흰 배경 가독성 위해 700) |
| `--color-text-brand-hover` | brand-800 | 브랜드 텍스트 hover |
| `--color-text-danger-default` | red-500 | 에러·위험 텍스트 |
| `--color-text-success-default` | green-500 | 성공 텍스트 |
| `--color-text-warning-default` | orange-600 | 경고 텍스트 |
| `--color-text-info-default` | blue-700 | 정보 텍스트 |
| `--color-text-category-default` | purple-600 | 분류·태그(category) 텍스트 |

> 각 상태·브랜드·category 계열에는 `-hover` 변형도 있다(`*-hover` = default보다 한 단계 진하게). 전체 목록은 [tokens/semantic.md](../tokens/semantic.md).

## 배경 (`--color-bg-*`)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-bg-primary` | white | 카드·패널·기본 표면 |
| `--color-bg-secondary` | neutral-50 | 한 단계 낮은 표면 |
| `--color-bg-tertiary` | neutral-100 | 더 낮은 표면·구획 |
| `--color-bg-inverse` | neutral-900 | 반전 표면(툴팁 등) |
| `--color-bg-brand-default` | brand-500 | 기본 브랜드 배경 (위 텍스트=다크) |
| `--color-bg-brand-hover` | brand-600 | 브랜드 배경 hover |
| `--color-bg-brand-subtle` / `-subtle-hover` | brand-50 / brand-100 | 약한 브랜드 강조 영역 |
| `--color-bg-danger-default` / `-subtle` | red-500 / red-50 | 위험 배경·약한 위험 영역 |
| `--color-bg-success-default` / `-subtle` | green-500 / green-50 | 성공 |
| `--color-bg-warning-default` / `-subtle` | orange-500 / orange-50 | 경고 |
| `--color-bg-info-default` / `-subtle` | blue-500 / blue-50 | 정보 |
| `--color-bg-disabled` | neutral-100 | 비활성 배경 |

## 테두리 (`--color-border-*`)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-border-default` | neutral-200 | 기본 구분선·카드 테두리 |
| `--color-border-subtle` | neutral-100 | default보다 옅은 경계(카드·푸터) |
| `--color-border-strong` | neutral-300 | 강한 구분 |
| `--color-border-hover` | neutral-300 | hover 테두리 |
| `--color-border-inverse` | neutral-700 | 반전 테두리 |
| `--color-border-input-default` / `-input-focus` | neutral-300 / brand-500 | 입력 컨트롤 테두리 |
| `--color-border-focus` | brand-400 | 포커스 링 (offset과 함께 사용) |
| `--color-border-disabled` | neutral-200 | 비활성 테두리 |
| `--color-border-{brand,danger,info,success,warning}-default` | 각 계열 500 | 상태 강조 테두리 |
| `--color-border-category-default` | purple-500 | 분류·태그 테두리 |

> 각 상태·category 계열에는 `-hover`·`-subtle` 변형이 함께 있다(예: `--color-border-danger-subtle` = red-200). 전체 목록은 [tokens/semantic.md](../tokens/semantic.md).

## 인터랙티브 (`--color-interactive-*`)

버튼 등 액션 요소 전용. `{primary,secondary,ghost,destructive}` × `{bg, bg-hover, text, border}` 조합.

| 토큰 | 값 | 비고 |
|---|---|---|
| `--color-interactive-primary-bg` / `-bg-hover` | brand-500 / brand-600 | |
| `--color-interactive-primary-text` | neutral-900 | ⚠️ 밝은 브랜드 배경이라 텍스트는 다크 |
| `--color-interactive-secondary-bg` / `-border` / `-text` | white / neutral-300 / neutral-900 | 아웃라인 버튼 |
| `--color-interactive-ghost-text` / `-bg-hover` | neutral-700 / neutral-100 | 배경 없는 버튼 |
| `--color-interactive-destructive-bg` / `-bg-hover` / `-text` | red-500 / red-600 / white | 파괴적 액션 |

## 표면 (`--token-color-surface-*`)

Tailwind `bg-surface-*` 유틸 호환용 표면 계층. neutral 은 `subtlest`(25) → `strongest`(400) 로 진해진다. 상태·brand·category 계열도 `subtlest → strongest` 단계를 가진다.

| 계열 | 단계 |
|---|---|
| neutral | `subtlest` · `subtle` · `muted` · `default` · `strong` · `stronger` · `strongest` |
| brand | `subtlest` · `subtle` · `muted` · `default` · `strong` · `stronger` · `strongest` |
| success · danger · warning · info | `subtlest` · `subtle` · `muted` · `strong` · `stronger` · `strongest` |
| category (purple) | `subtlest` · `subtle` · `muted` · `default` · `strong` · `stronger` · `strongest` |

## 아이콘 (`--color-icon-*`)

`Icon` 컴포넌트 `colorTokenMap` 키와 매핑. 다수가 text/bg 토큰을 다시 가리킨다.

| 토큰 | 값 |
|---|---|
| `--color-icon-primary` / `-secondary` / `-tertiary` | text-primary / -secondary / -tertiary |
| `--color-icon-disabled` / `-inverse` | text-disabled / -inverse |
| `--color-icon-{brand,danger,success,warning,info}-default` | 각 계열 bg-default |
| `--color-icon-{danger,warning,info}-muted` | 각 계열 300 (옅은 아이콘) |
| `--color-icon-category-default` / `-hover` / `-muted` | purple-500 / -600 / -300 |

## 상태 컬러 요약

상태는 전용 계열만 쓴다(text/bg/border 각각 존재). 색만으로 의미를 전달하지 말고 아이콘·텍스트를 병기한다([a11y.md](a11y.md)).

| 상태 | 계열 키워드 |
|---|---|
| 위험·삭제 | `*-danger-*` |
| 성공 | `*-success-*` |
| 경고 | `*-warning-*` |
| 정보 | `*-info-*` |

## 사용 예시

```tsx
// 본문 + 보조 텍스트
<p className="text-[var(--color-text-primary)]">제목</p>
<p className="text-[var(--color-text-secondary)]">설명</p>

// 에러 입력 — 색 + 메시지 병기
<input className="border border-[var(--color-border-danger-default)]" aria-invalid />
<span className="text-[var(--color-text-danger-default)]">필수 항목입니다.</span>

// 약한 성공 배지
<span className="bg-[var(--color-bg-success-subtle)] text-[var(--color-text-success-default)]">완료</span>
```

## 다크모드 (`[data-theme="dark"]`)

`semantic.css` 는 `[data-theme="dark"]` 셀렉터로 text·bg·surface·border·icon 계열을 재정의한다. core 팔레트(raw hex)는 불변이고, semantic 토큰만 다크 값으로 재매핑된다. 소비 앱이 최상위 요소에 `data-theme="dark"` 를 지정하면 활성화된다.

- 예: 라이트 `--color-bg-primary` = white → 다크 = neutral-900, `--color-text-primary` = neutral-900 → 다크 = neutral-25.
- 시각 전시·라이트/다크 비교: Storybook `Docs/Design Tokens` 7절.

## 규칙

- **raw hex/rgb 금지** — 반드시 semantic 토큰.
- **core 팔레트 직접 참조 금지** — `--color-brand-500`이 아니라 `--color-bg-brand-default` 같은 의미 토큰 경유.
- 밝은 브랜드 배경 위 텍스트는 항상 다크(`--color-interactive-primary-text`).
- 장식용 그라디언트·글로우 남용 금지([principles.md](principles.md)).
