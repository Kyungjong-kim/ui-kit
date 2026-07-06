# Core 토큰 (raw 팔레트)

`ui-kit`의 raw 디자인 값. 실제 hex·px가 들어있는 **유일한 계층**이다.
컴포넌트는 이 토큰을 직접 참조하지 않는다 — 항상 [semantic](./semantic.md)을 거친다.

- 정의: `src/styles/tokens/core.css` (`:root`)
- 값 정본(SoT): 위 파일. 이 문서와 어긋나면 CSS가 옳다.
- 추가·수정 규칙: [`_convention.md`](./_convention.md)

## 색 — 팔레트

각 팔레트는 `25`(가장 옅음) → `900`(가장 짙음) 11단계. 토큰명은 `--color-<팔레트>-<단계>`.

### brand — Golden Amber

기준색 `--color-brand-500 = #fabc37`. 밝은 색이라 **이 색 위 텍스트는 다크(neutral-900)** 를 쓴다.

| 단계 | 값 | 단계 | 값 |
|---|---|---|---|
| 25 | `#fffdf0` | 400 | `#fcc83c` |
| 50 | `#fff8d9` | 500 | `#fabc37` |
| 100 | `#fff1b3` | 600 | `#e6a828` |
| 200 | `#ffe480` | 700 | `#c48e1a` |
| 300 | `#ffd44d` | 800 | `#a07318` |
| | | 900 | `#7a5812` |

### neutral — Warm Gray

앰버와 어울리는 따뜻한 그레이.

| 단계 | 값 | 단계 | 값 |
|---|---|---|---|
| 25 | `#fdfcfb` | 400 | `#b5afa5` |
| 50 | `#faf8f5` | 500 | `#908880` |
| 100 | `#f2efe9` | 600 | `#635e58` |
| 200 | `#e5e1da` | 700 | `#403c38` |
| 300 | `#d2cdc4` | 800 | `#272420` |
| | | 900 | `#141210` |

### red — Error / Danger

| 단계 | 값 | 단계 | 값 |
|---|---|---|---|
| 25 | `#fff5f5` | 400 | `#ff7074` |
| 50 | `#ffebea` | 500 | `#ff4c51` |
| 100 | `#ffdbdc` | 600 | `#e64449` |
| 200 | `#ffb7b9` | 700 | `#d94145` |
| 300 | `#ff9497` | 800 | `#cc3d41` |
| | | 900 | `#bf383d` |

### green — Success

| 단계 | 값 | 단계 | 값 |
|---|---|---|---|
| 25 | `#f2fbf7` | 400 | `#53d28c` |
| 50 | `#e6f8ef` | 500 | `#28c76f` |
| 100 | `#d4f4e2` | 600 | `#24b364` |
| 200 | `#a9e9c5` | 700 | `#22a95e` |
| 300 | `#7edda9` | 800 | `#209f59` |
| | | 900 | `#1e9553` |

### orange — Warning

브랜드가 골든/앰버 계열이라, 노란색 대신 오렌지로 경고를 구분한다.

| 단계 | 값 | 단계 | 값 |
|---|---|---|---|
| 25 | `#fff8f0` | 400 | `#ff8f1a` |
| 50 | `#fff1e0` | 500 | `#f97316` |
| 100 | `#ffe2bf` | 600 | `#ea6c0e` |
| 200 | `#ffc480` | 700 | `#c45c0c` |
| 300 | `#ffa640` | 800 | `#9e4a0a` |
| | | 900 | `#783908` |

### blue — Info

| 단계 | 값 | 단계 | 값 |
|---|---|---|---|
| 25 | `#f0f7ff` | 400 | `#60a5fa` |
| 50 | `#eff6ff` | 500 | `#3b82f6` |
| 100 | `#dbeafe` | 600 | `#2563eb` |
| 200 | `#bfdbfe` | 700 | `#1d4ed8` |
| 300 | `#93c5fd` | 800 | `#1e40af` |
| | | 900 | `#1e3a8a` |

### purple — Category

분류/태그 계열. 앰버·상태색과 구분되는 중립 강조색.

| 단계 | 값 | 단계 | 값 |
|---|---|---|---|
| 25 | `#faf7ff` | 400 | `#9f7aea` |
| 50 | `#f4eeff` | 500 | `#8b5cf6` |
| 100 | `#e9ddff` | 600 | `#7c4ddb` |
| 200 | `#d3bbff` | 700 | `#6b3fc4` |
| 300 | `#b794f6` | 800 | `#5a34a8` |
| | | 900 | `#472a85` |

### white / black

| 토큰 | 값 |
|---|---|
| `--color-white` | `#ffffff` |
| `--color-black` | `#000000` |

## 치수 — `--token-*`

색이 아닌 토큰은 `--token-` 접두사. 스케일은 작은 → 큰 순.

### radius

| 토큰 | 값 |
|---|---|
| `--token-radius-xxs` | 4px |
| `--token-radius-xs` | 6px |
| `--token-radius-sm` | 8px |
| `--token-radius-md` | 12px |
| `--token-radius-lg` | 16px |
| `--token-radius-xl` | 24px |
| `--token-radius-full` | 99999px |

### size · icon

| 토큰 | 값 | 토큰 | 값 |
|---|---|---|---|
| `--token-size-icon-xxs` | 8px | `--token-size-icon-lg` | 24px |
| `--token-size-icon-xs` | 12px | `--token-size-icon-xl` | 32px |
| `--token-size-icon-sm` | 16px | `--token-size-icon-xxl` | 48px |
| `--token-size-icon-md` | 20px | `--token-size-icon-xxxl` | 80px |

### size · control

폼·버튼 컨트롤 높이.

| 토큰 | 값 | 토큰 | 값 |
|---|---|---|---|
| `--token-size-control-xxxs` | 20px | `--token-size-control-md` | 36px |
| `--token-size-control-xxs` | 24px | `--token-size-control-lg` | 44px |
| `--token-size-control-xs` | 28px | `--token-size-control-xl` | 48px |
| `--token-size-control-sm` | 32px | `--token-size-control-xxl` | 360px |

### size · field width

폼 컨트롤(Input/Select/Combobox) 기본 너비. 내용 길이와 무관한 정적 레이아웃 보장.

| 토큰 | 값 |
|---|---|
| `--token-size-field-sm` | 200px |
| `--token-size-field-md` | 280px |
| `--token-size-field-lg` | 320px |

### size · avatar

| 토큰 | 값 | 토큰 | 값 |
|---|---|---|---|
| `--token-size-avatar-xs` | 24px | `--token-size-avatar-lg` | 48px |
| `--token-size-avatar-sm` | 32px | `--token-size-avatar-xl` | 64px |
| `--token-size-avatar-md` | 40px | | |

### size · image

| 토큰 | 값 | 토큰 | 값 |
|---|---|---|---|
| `--token-size-image-xxs` | 36px | `--token-size-image-lg` | 104px |
| `--token-size-image-xs` | 56px | `--token-size-image-xl` | 184px |
| `--token-size-image-sm` | 60px | `--token-size-image-xxl` | 320px |
| `--token-size-image-md` | 100px | | |

### spacing · inline (가로 패딩)

| 토큰 | 값 | 토큰 | 값 |
|---|---|---|---|
| `--token-spacing-inline-xs` | 4px | `--token-spacing-inline-xl` | 20px |
| `--token-spacing-inline-sm` | 8px | `--token-spacing-inline-xxl` | 24px |
| `--token-spacing-inline-md` | 12px | `--token-spacing-inline-xxxl` | 28px |
| `--token-spacing-inline-lg` | 16px | | |

### spacing · stack (세로 패딩)

| 토큰 | 값 | 토큰 | 값 |
|---|---|---|---|
| `--token-spacing-stack-xxs` | 2px | `--token-spacing-stack-lg` | 16px |
| `--token-spacing-stack-xs` | 4px | `--token-spacing-stack-xl` | 24px |
| `--token-spacing-stack-sm` | 8px | `--token-spacing-stack-xxl` | 32px |
| `--token-spacing-stack-md` | 12px | | |

### spacing · group (flex/grid gap)

| 토큰 | 값 | 토큰 | 값 |
|---|---|---|---|
| `--token-spacing-group-xxs` | 2px | `--token-spacing-group-lg` | 16px |
| `--token-spacing-group-xs` | 4px | `--token-spacing-group-xl` | 24px |
| `--token-spacing-group-sm` | 8px | | |
| `--token-spacing-group-md` | 12px | | |

### shadow · default

| 토큰 | 값 |
|---|---|
| `--token-shadow-default-sm` | `0 1px 2px 0 rgba(20,18,16,.06), 0 1px 3px 0 rgba(20,18,16,.08)` |
| `--token-shadow-default-md` | `0 1px 2px -1px rgba(20,18,16,.08), 0 4px 12px -2px rgba(20,18,16,.1)` |
| `--token-shadow-default-lg` | `0 2px 4px -2px rgba(20,18,16,.08), 0 10px 28px -6px rgba(20,18,16,.16)` |
| `--token-shadow-default-xl` | `0 4px 8px -3px rgba(20,18,16,.1), 0 20px 48px -10px rgba(20,18,16,.2)` |

## 타이포그래피

각 타입 역할은 `size`·`weight`·`line-height`·`letter-spacing` 4개 토큰 묶음으로 정의된다.
토큰명: `--token-typography-<역할>-<스케일>[-<굵기>]-<속성>`.

### display / headline

| 역할 | size | weight | line-height | letter-spacing |
|---|---|---|---|---|
| `display-md` | 32px | 700 | 40px | -0.5px |
| `display-sm` | 28px | 700 | 36px | -0.4px |
| `headline-xl` | 24px | 700 | 32px | -0.3px |
| `headline-lg` | 20px | 700 | 28px | -0.2px |
| `headline-md` | 18px | 700 | 26px | -0.1px |
| `headline-sm` | 16px | 700 | 24px | 0px |

### body (각 크기별 bold / medium / base)

letter-spacing은 모두 0px.

| 역할 | size | weight | line-height |
|---|---|---|---|
| `body-lg-bold` | 16px | 700 | 24px |
| `body-lg-medium` | 16px | 500 | 24px |
| `body-lg-base` | 16px | 400 | 24px |
| `body-md-bold` | 14px | 700 | 20px |
| `body-md-medium` | 14px | 500 | 20px |
| `body-md-base` | 14px | 400 | 20px |
| `body-sm-bold` | 12px | 700 | 18px |
| `body-sm-medium` | 12px | 500 | 18px |
| `body-sm-base` | 12px | 400 | 18px |

### label (각 크기별 bold / medium / base + xs)

letter-spacing은 모두 0px.

| 역할 | size | weight | line-height |
|---|---|---|---|
| `label-lg-bold` | 16px | 700 | 24px |
| `label-lg-medium` | 16px | 500 | 24px |
| `label-lg-base` | 16px | 400 | 24px |
| `label-md-bold` | 14px | 700 | 20px |
| `label-md-medium` | 14px | 500 | 20px |
| `label-md-base` | 14px | 400 | 20px |
| `label-sm-bold` | 12px | 700 | 18px |
| `label-sm-medium` | 12px | 500 | 18px |
| `label-sm-base` | 12px | 400 | 18px |
| `label-xs` | 10px | 400 | 10px |

### caption / code

letter-spacing 0px.

| 역할 | size | weight | line-height |
|---|---|---|---|
| `caption` | 12px | 400 | 18px |
| `code` | 14px | 400 | 28px |
