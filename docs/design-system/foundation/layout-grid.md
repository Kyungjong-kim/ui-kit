# Foundation — 레이아웃 · 그리드

> 간격 리듬·크기 스케일·반경·elevation의 기초 규칙. ui-kit은 라이브러리이므로 페이지 셸을 강제하지 않는다 — 컴포넌트가 일관된 간격·크기 토큰을 쓰는 방법을 정의한다.

## 레이아웃 접근

- ui-kit 컴포넌트는 **자기 너비를 강제하지 않는다.** 폭은 호스트 앱(부모 컨테이너)이 결정하고, 컴포넌트는 패딩·간격·높이만 토큰으로 가진다.
- 폼 컨트롤(Input/Select 등)이 내용 길이와 무관한 정적 너비가 필요할 때만 `--token-size-field-{sm,md,lg}`(200/280/320)를 기본값으로 쓴다.
- 레이아웃 골격은 Tailwind flex/grid 유틸 + spacing 토큰으로 조립한다. 별도의 12-컬럼 그리드 시스템은 두지 않는다.

## 간격 리듬 (구획 vs 묶음)

**구획은 크게 띄우고, 묶음은 촘촘히.** spacing 토큰은 용도별 3종으로 나뉜다.

| 그룹 | 토큰 | 용도 |
|---|---|---|
| **inline** | `--token-spacing-inline-{xs..xxxl}` (4·8·12·16·20·24·28) | 가로 패딩 |
| **stack** | `--token-spacing-stack-{xxs..xxl}` (2·4·8·12·16·24·32) | 세로 패딩·세로 간격 |
| **group** | `--token-spacing-group-{xxs..xl}` (2·4·8·12·16·24) | flex/grid gap |

권장 리듬 예시:

| 관계 | 간격 토큰 |
|---|---|
| 섹션 ↔ 섹션 | `stack-xxl` (32) |
| 섹션 타이틀 ↔ 첫 필드 | `stack-xl` (24) |
| 필드 ↔ 필드 | `stack-xl` (24) |
| 라벨 ↔ 입력 | `stack-xs` (4) |
| 인접 컨트롤 묶음 | `group-sm`~`group-md` (8~12) |

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

## 반경 · elevation

| 토큰 | 값 |
|---|---|
| `--token-radius-xxs` ~ `-xl` | 4 · 6 · 8 · 12 · 16 · 24 |
| `--token-radius-full` | 99999 (pill·원형) |
| `--token-shadow-default-{sm,md,lg,xl}` | 4단계 elevation |

- 반경은 위계에 따라 **차등**한다(모든 모서리를 큰 라운드로 균일하게 처리 금지 → [principles.md](principles.md)).
- 깊이는 그림자 토큰 단계로 표현하고, 그림자를 장식으로 남용하지 않는다.

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
