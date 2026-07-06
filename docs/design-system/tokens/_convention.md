# 토큰 컨벤션

`ui-kit`의 디자인 토큰 모델·네이밍·사용 규칙. 토큰 값을 바꾸거나 새 토큰을 추가하기 전에 읽는다.

## 2계층 모델 (core → semantic)

토큰은 두 계층으로만 구성한다. 더 늘리지 않는다.

```
core (raw 값)              semantic (의미)             컴포넌트
--color-brand-500   ──▶   --color-bg-brand-default  ──▶  className="[var(--color-bg-brand-default)]"
#fabc37                    var(--color-brand-500)
```

| 계층 | 정의 파일 | 내용 | 누가 참조하나 |
|---|---|---|---|
| **core** | `src/styles/tokens/core.css` | raw 팔레트·치수. 실제 값(hex·px)이 들어있는 유일한 곳. | **semantic 토큰만** 참조 |
| **semantic** | `src/styles/tokens/semantic.css` | 의미·역할. 값을 직접 들고 있지 않고 core를 `var()`로 가리킨다. | **컴포넌트**가 참조 |

진입 파일 `src/styles/tokens.css`가 두 파일을 import한다. 컴포넌트는 항상 semantic 끝단만 본다.

### 왜 2계층인가

- core를 한 곳에서 바꾸면 그 색을 쓰는 모든 semantic 토큰이 따라 바뀐다 (테마 일괄 변경).
- 컴포넌트는 "무슨 색"이 아니라 "무슨 역할"(`danger`·`primary`)에 묶이므로, 팔레트가 교체돼도 컴포넌트 코드는 그대로다.

## 네이밍 규칙

### color (semantic)

```
--color-<역할군>-<용도>[-<상태>]
```

- 역할군: `text` · `bg` · `border` · `interactive` · `icon`
- 용도: `primary` · `secondary` · `tertiary` · `brand` · `danger` · `success` · `warning` · `info` · `disabled` …
- 상태: `hover` · `subtle` · `default` 등 (선택)

예: `--color-text-primary`, `--color-bg-danger-subtle`, `--color-interactive-primary-bg-hover`.

### color (core)

```
--color-<팔레트>-<단계>
```

- 팔레트: `brand` · `neutral` · `red` · `green` · `orange` · `blue` (+ `white`·`black`)
- 단계: `25` · `50` · `100` … `900` (25는 가장 옅음, 900이 가장 짙음)

### 치수·타이포 (`--token-*`)

색이 아닌 토큰은 모두 `--token-` 접두사를 쓴다.

```
--token-<범주>-<하위범주>-<스케일>
```

예: `--token-radius-md`, `--token-spacing-inline-lg`, `--token-size-control-sm`, `--token-typography-body-md-base-size`.

스케일은 `xxs`·`xs`·`sm`·`md`·`lg`·`xl`·`xxl`… 순으로 커진다.

## 사용 규칙 (컴포넌트)

| 규칙 | 이유 |
|---|---|
| **컴포넌트는 semantic 토큰만 참조** | 역할에 묶여야 팔레트 교체에 견딘다. core 직접 참조 금지. |
| **className은 임의값 `[var(--...)]` 형태로** | 프로젝트별 Tailwind 설정에 의존하지 않아 라이브러리 이식성이 보장된다. 예: `className="bg-[var(--color-bg-brand-default)] text-[var(--color-interactive-primary-text)]"` |
| **Tailwind 색/간격 유틸 금지** | `bg-red-500`·`text-gray-700`·`p-4` 등은 토큰 우회. 토큰 변경이 반영되지 않는다. |
| **raw hex/rgb 금지** | 값이 흩어지면 SoT가 깨진다. 값은 core에만. |
| **core 직접 참조 금지** | `var(--color-brand-500)`을 컴포넌트에서 직접 쓰지 않는다. semantic을 거친다. |

> 예외 — semantic에 적절한 역할 토큰이 *아직* 없을 때는, core를 직접 쓰지 말고 **먼저 semantic 토큰을 추가**한다 (아래 절차).

## 새 토큰 추가 절차

1. **core에 값이 있는지 확인.** 필요한 raw 값(색 단계·치수)이 `core.css`에 없으면 먼저 추가한다. 기존 팔레트로 표현 가능하면 추가하지 않는다.
2. **semantic에 의미 토큰 추가.** `semantic.css`에 역할 기반 이름으로 추가하고 값은 core를 `var()`로 가리킨다.
   ```css
   /* core.css — 이미 있으면 생략 */
   --color-blue-500: #3b82f6;
   /* semantic.css */
   --color-bg-info-default: var(--color-blue-500);
   ```
3. **컴포넌트에서 semantic만 사용.** `className="[var(--color-bg-info-default)]"`.
4. **문서 갱신.** core를 늘렸으면 [`core.md`](./core.md), semantic을 늘렸으면 [`semantic.md`](./semantic.md)의 표에 한 줄 추가.
5. **중복 점검.** 같은 의미의 토큰이 이미 있는지 먼저 확인한다. "거의 같은데 미묘하게 다른" 토큰을 늘리지 않는다.

## 정본(SoT)

- 토큰 **값**의 정본은 `src/styles/tokens/core.css`·`semantic.css`. 이 문서들과 값이 어긋나면 CSS가 옳다.
- 이 문서는 **분류·규칙**을 정의한다. 값 카탈로그는 [`core.md`](./core.md)·[`semantic.md`](./semantic.md) 참조.
