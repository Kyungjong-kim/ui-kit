# Foundation — 타이포그래피

> 타이포 위계·사용 가이드. `--token-typography-*` 토큰만 사용(raw font-size 금지).

## 폰트

| 용도 | 권장 패밀리 |
|---|---|
| 본문 | 시스템 산세리프 스택(`system-ui, -apple-system, sans-serif`) — 호스트 앱 폰트에 맞춰 재정의 가능 |
| 모노(코드) | `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` |

ui-kit은 특정 웹폰트를 강제하지 않는다. 호스트 앱이 폰트 패밀리를 지정하고, 토큰은 size·weight·line-height·letter-spacing을 정의한다.

## 스케일

토큰은 `--token-typography-<family>-<scale>[-<weight>]-{size,weight,line-height,letter-spacing}` 형태로 core.css에 정의돼 있다.

| family | 변형 | size / line-height | weight | letter-spacing |
|---|---|---|---|---|
| **display** | md | 32 / 40 | 700 | -0.5 |
| | sm | 28 / 36 | 700 | -0.4 |
| **headline** | xl | 24 / 32 | 700 | -0.3 |
| | lg | 20 / 28 | 700 | -0.2 |
| | md | 18 / 26 | 700 | -0.1 |
| | sm | 16 / 24 | 700 | 0 |
| **body** | lg | 16 / 24 | base 400 · medium 500 · bold 700 | 0 |
| | md | 14 / 20 | base · medium · bold | 0 |
| | sm | 12 / 18 | base · medium · bold | 0 |
| **label** | lg | 16 / 24 | base · medium · bold | 0 |
| | md | 14 / 20 | base · medium · bold | 0 |
| | sm | 12 / 18 | base · medium · bold | 0 |
| | xs | 10 / 10 | 400 (무접미) | 0 |
| **caption** | — | 12 / 18 | 400 | 0 |
| **code** | — | 14 / 28 | 400 | 0 |

> weight 접미는 core.css 토큰명과 일치한다: `base`(400) · `medium`(500) · `bold`(700). 예: `--token-typography-body-md-medium-size`.

## 토큰 사용

font-size·line-height 등을 개별 토큰으로 적용한다.

```tsx
// body-md-base (14 / 20 / 400)
<p
  className="
    text-[length:var(--token-typography-body-md-base-size)]
    leading-[var(--token-typography-body-md-base-line-height)]
    font-[var(--token-typography-body-md-base-weight)]
  "
>
  본문 텍스트
</p>

// headline-xl (24 / 32 / 700) — weight가 고정이라 무접미
<h1
  className="
    text-[length:var(--token-typography-headline-xl-size)]
    leading-[var(--token-typography-headline-xl-line-height)]
    font-[var(--token-typography-headline-xl-weight)]
    tracking-[var(--token-typography-headline-xl-letter-spacing)]
  "
>
  페이지 제목
</h1>
```

자주 쓰는 위계는 cva 또는 헬퍼로 묶어두고 토큰을 한 번만 참조하게 하면 재사용이 쉽다.

## 사용 규칙

- **raw font-size/line-height/weight 금지** — 항상 `--token-typography-*` 토큰.
- **body·label = weight 접미 필수.** `body-md`만으로는 정의가 없다 — `body-md-base`·`-medium`·`-bold` 중 하나. `label-xs`는 예외로 무접미(400 고정).
- **headline·display·caption·code = 무접미.** weight가 스케일에 고정돼 있다.
- 강조는 **굵기·크기 대비**로. 그라디언트 텍스트·장식 세리프 금지([principles.md](principles.md)).
- 극단 위계(초대형 ↔ 마이크로만)로 점프하지 말고 중간 단계를 유지한다.
- 제목·라벨은 자연스러운 문장형 — 전체 대문자·억지 Title Case 지양.

## 화면별 매핑 (예시)

| 위치 | 스케일 |
|---|---|
| 페이지 최상단 타이틀 | `headline-xl` (24) |
| 섹션/모달 헤더 | `headline-lg` (20) |
| 폼 섹션 타이틀 | `headline-sm` (16) |
| 본문 | `body-md` (14) |
| 강조 본문·값 | `body-md-medium` (14/500) |
| 폼/버튼 라벨 | `label-md-medium` (14/500) |
| 보조 설명·캡션 | `caption` (12) |
| 인라인 코드 | `code` (14) |

## 텍스트 위계 3단계 (크기 × 색)

위계는 **크기(스케일) + 색([color.md](color.md) text 3단계)**를 함께 써서 만든다. 색만 또는 크기만으로는 위계가 약하다.

| 단계 | 색 토큰 | 대표 스케일 |
|---|---|---|
| 1차 (본문·제목) | `--color-text-primary` | `body-md-base` · `headline-*` |
| 2차 (보조·라벨) | `--color-text-secondary` | `body-md-base` · `label-md-medium` |
| 3차 (캡션·메타) | `--color-text-tertiary` | `caption` |

- 비활성 텍스트는 `--color-text-disabled`(본문에 쓰지 말 것), 어두운 면 위는 `--color-text-inverse`.
