# Foundation — 레이아웃 · 그리드

> 간격 리듬·크기 스케일·반경·elevation의 기초 규칙. ui-kit은 라이브러리이므로 페이지 셸을 강제하지 않는다 — 컴포넌트가 일관된 간격·크기 토큰을 쓰는 방법을 정의한다.

## 레이아웃 접근

- ui-kit 컴포넌트는 **자기 너비를 강제하지 않는다.** 폭은 호스트 앱(부모 컨테이너)이 결정하고, 컴포넌트는 패딩·간격·높이만 토큰으로 가진다.
- 폼 컨트롤(Input/Select 등)이 내용 길이와 무관한 정적 너비가 필요할 때만 `--token-size-field-{sm,md,lg}`(200/280/320)를 기본값으로 쓴다.
- 레이아웃 골격은 Tailwind flex/grid 유틸 + spacing 토큰으로 조립한다. 별도의 12-컬럼 그리드 시스템은 두지 않는다.

## 콘텐츠 폭 (권장)

라이브러리는 폭을 강제하지 않지만, 호스트 앱이 화면 골격을 짤 때 아래 폭을 권장한다.

| 화면 | 폭 | 좌우 / 상하 패딩 |
|---|---|---|
| 리스트 | 풀폭 `w-full` | `px-inline-xxl`(24) / `py-stack-xxl`(32) |
| 상세 | `mx-auto w-full max-w-[1136px]` (초과 시 가운데 정렬) | 동상 |
| 생성 / 폼 | `mx-auto max-w-[720px]` | 동상 |

> 이 값은 라이브러리 토큰이 아니라 **호스트 앱 컨벤션**이다(패턴 문서 기준). 컴포넌트 자체는 폭을 갖지 않는다.

## 간격 리듬 (구획 vs 묶음)

**구획은 크게 띄우고, 묶음은 촘촘히.** spacing 토큰은 용도별 3종으로 나뉜다.

| 그룹 | 토큰 | 용도 |
|---|---|---|
| **inline** | `--token-spacing-inline-{xs..xxxl}` (4·8·12·16·20·24·28) | 가로 패딩 |
| **stack** | `--token-spacing-stack-{xxs..xxl}` (2·4·8·12·16·24·32) | 세로 패딩·세로 간격 |
| **group** | `--token-spacing-group-{xxs..xl}` (2·4·8·12·16·24) | flex/grid gap |

**정량 리듬표** — 화면 조립 시 관계별 간격은 아래 값으로 통일한다. ui-kit stack 스케일 상한이 `xxl`(32)이므로 **구획 최대 리듬 = 32**다(레퍼런스의 40 리듬을 ui-kit 스케일에 맞춰 32로 대응).

| 관계 | 간격 토큰 | px |
|---|---|---|
| PageHeader ↔ 본문 | `gap-stack-xxl` | 32 |
| 섹션 ↔ 섹션 (Separator 포함) | `gap-stack-xxl` | 32 |
| 섹션 타이틀 ↔ 첫 필드 | `gap-stack-xl` | 24 |
| 필드 ↔ 필드 | `gap-stack-xl` | 24 |
| 컨트롤(툴바) ↔ 테이블 | `gap-stack-md` | 12 |
| 카드 ↔ 카드 (그리드) | `gap-stack-md`~`group-lg` | 12~16 |
| 라벨 ↔ 입력 | `gap-group-xs` | 4 |
| 인접 컨트롤/버튼 묶음 | `gap-group-sm`~`group-md` | 8~12 |
| 나란한 2-up 필드·라디오 옵션 | `gap-group-lg` | 16 |

> **원리**: PageHeader↔본문·섹션↔섹션은 `stack-xxl`(32)로 **크게** 띄워 구획을 나누고, 묶음 내부(컨트롤↔테이블·라벨↔입력)는 `stack-md`(12)·`group-xs`(4)로 **촘촘하게** 묶는다. 32 → 24 → 12 → 4 리듬을 유지한다.

```tsx
<div className="flex flex-col gap-[var(--token-spacing-stack-xl)]">
  <label className="mb-[var(--token-spacing-stack-xs)]">이름</label>
  <input className="px-[var(--token-spacing-inline-md)]" />
</div>
```

## 크기 스케일

| 종류 | 토큰 | 값 |
|---|---|---|
| **control** (입력·버튼·셀렉트 높이) | `--token-size-control-{xxxs..xxl}` | 20·24·28·32·36·44·48·360 |
| **icon** | `--token-size-icon-{xxs..xxxl}` | 8·12·16·20·24·32·48·80 |
| **avatar** | `--token-size-avatar-{xs..xl}` | 24·32·40·48·64 |
| **image** | `--token-size-image-{xxs..xxl}` | 36·56·60·100·104·184·320 |
| **field width** | `--token-size-field-{sm,md,lg}` | 200·280·320 |

- 기본 입력/버튼 높이는 control `md`(36), 큰 입력은 `lg`(44).
- 아이콘 기본은 `sm`(16) 또는 `md`(20).

## 반경 (Shapes)

반경은 위계에 따라 **차등**한다(모든 모서리를 큰 라운드로 균일하게 처리 금지 → [principles.md](principles.md)).

| 토큰 | px | 용도 |
|---|---|---|
| `--token-radius-xxs` / `-xs` | 4 / 6 | 마이크로 요소·배지 |
| `--token-radius-sm` | 8 | **버튼 · 인풋 · 작은 컨트롤** |
| `--token-radius-md` | 12 | 중간 컨테이너 |
| `--token-radius-lg` | 16 | **카드 · 패널 · 모달** |
| `--token-radius-xl` | 24 | 큰 컨테이너 |
| `--token-radius-full` | 99999 | **원형 · pill** |

## Elevation (그림자 4단계)

그림자는 **면을 띄우는 의미**일 때만 쓴다. 평면 구분은 그림자가 아니라 `border`·표면 명도로 한다. 깊이는 4단계 토큰으로 표현하고 장식으로 남용하지 않는다.

| 토큰 | 의미·용도 |
|---|---|
| `--token-shadow-default-sm` | 카드 · hover (살짝 떠 있는 면) |
| `--token-shadow-default-md` | 드롭다운 · 팝오버 · 툴팁 |
| `--token-shadow-default-lg` | 모달 · 사이드패널 |
| `--token-shadow-default-xl` | 토스트 · 풀스크린 (최상위) |

```tsx
<div className="rounded-[var(--token-radius-lg)] shadow-[var(--token-shadow-default-md)]" />
```

## 카드 권장 형태 (예시)

- 카드 = `bg-[var(--color-bg-primary)]` + `rounded-[var(--token-radius-lg)]`(16) + 가로 패딩 `inline-xxl`(24) / 세로 패딩 `stack-xl`(24).
- 그룹 구분은 두꺼운 그림자보다 `border-[var(--color-border-default)]` 구분선이나 간격으로 처리.

## 오버레이 폭 (권장)

라이브러리는 폭을 강제하지 않지만, Dialog류 오버레이는 용도에 따라 폭을 키운다.

| 용도 | 권장 폭 |
|---|---|
| 확인·간단 입력 | 360 ~ 480 |
| 상세 편집 패널 | 640 ~ 800 |
| 전체 화면 작업 | `calc(100vw - 32px)` (상하좌우 16 여백) |

## 반응형

- 컴포넌트는 부모 폭에 맞춰 신축하고, 다열 레이아웃은 호스트 앱이 Tailwind breakpoint(`md:`·`lg:`)로 열 수를 조절한다.
- 모바일에서는 열 수를 줄이고 control 높이는 유지한다(터치 타깃 확보).
