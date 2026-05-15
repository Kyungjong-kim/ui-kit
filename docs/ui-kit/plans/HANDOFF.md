# ui-kit HANDOFF

> 이전 Session notes → [`history/세션_노트.md`](../history/세션_노트.md) 참고

## Session Update 2026-05-15 (디자인 하네스 문서 검증·수정 #55)

### 배경
신규 에이전트 진입 시나리오(컴포넌트 추가 / 버그 수정 / 세션 종료)로 ui-kit 디자인 하네스 문서 세트 점검 → 🔴 4건 · 🟡 4건 발견.

### 발견 이슈
1. `CLAUDE.md`·`architecture.md`·`ui-kit-dev.md`·`conventions.md` 가 `src/components/composed/` 카테고리 미인지 (실제 16개 컴포넌트 존재).
2. 토큰 사용 규칙 자체 모순 — `design-system.md`·CLAUDE.md 안에서 `[var(--...)]` ↔ `bg-bg-brand-default` 권장 혼재.
3. `branch-commit.md` 자체 모순 — `feat/<요약>` ↔ `feat/#<이슈번호>` 패턴 혼재.
4. `ui-kit-dev.md` L61 옛 브랜치 규칙 (`feat/<요약>`).
5. `architecture.md` 컴포넌트 개수(22 → 실제 36+16) / `styles.css` 크기(107줄 → 311줄) / test 수치(54 → 226) stale.
6. `HANDOFF_NOW.md` §2 정비 항목 경로 오류 (`primitives/empty-state` → `composed/empty-state`).

### 수정 방향
- 토큰 사용 규칙은 라이브러리 이식성 위해 `[var(--color-...)]` 임의값 형태로 통일 (Tailwind utility 형태 금지).
- 브랜치 네이밍 `<타입>/#<이슈번호>` 통일 (요약 suffix 허용).
- 컴포넌트 영역 `primitives` / `composed` 두 카테고리 명시.
- architecture.md 신선도·디렉토리 트리·수치 갱신 (2026-05-15 기준).

### 변경 파일
- `CLAUDE.md`
- `.claude/agents/ui-kit-dev.md`
- `docs/ui-kit/agent/architecture.md`
- `docs/ui-kit/agent/conventions.md`
- `docs/ui-kit/agent/design-system.md`
- `docs/ui-kit/git-workflow/branch-commit.md`
- `docs/ui-kit/status/HANDOFF_NOW.md`
- `docs/ui-kit/plans/HANDOFF.md` + `history/세션_노트.md`

### 영향 범위
문서 전용. 소스 코드 변경 없음. 빌드·테스트 영향 없음.

## Session Update 2026-05-13 (컴포넌트 동작성 수정 — 디자인 토큰·utility 누락 보강)

### 배경
사용자가 Storybook에서 9개 컴포넌트의 시각/상호작용 이슈를 보고. 근본 원인:
1. 이관 컴포넌트가 참조하던 `--token-color-*`·`--token-size-*`·`--token-radius-*` 정의 없음 → CSS 변수 미해결로 0 사이즈/색상 누락
2. `typography-*` utility 클래스가 어디에도 정의되지 않음 → Text·Chip·SlideListBadge·CheckMark 모든 typography 미적용
3. Toast 스토리는 각 스토리가 `<Toaster />`를 렌더 → autodocs 페이지에서 다중 Toaster가 같은 queue 구독 → 중복 발생
4. LogoOnlyHeader 스토리는 `onClick: () => {}` 무동작

### 변경 파일
- `src/styles/tokens/core.css` — 구조 토큰 추가: radius(7), size·icon(8), size·control(8), size·image(7), spacing·inline(7), shadow·default(4), typography(26 variant × 4 attr ≈ 104 라인)
- `src/styles/tokens/semantic.css` — icon 색상(12) + surface·action 색상 alias(14) 추가
- `src/styles/index.css` — `@theme inline` 에 Tailwind utility 생성용 매핑 추가 (`--color-surface-*`, `--color-action-*`, `--spacing-inline-*`, `--spacing-size-control-*`, `--spacing-size-image-*`, `--shadow-default-*`) + `@utility typography-*` 26개 정의
- `stories/toast.stories.tsx` — `<Toaster />` 를 `meta.decorators` 단일 인스턴스로 이동
- `stories/logo-only-header.stories.tsx` — `WithClick` 스토리에 클릭 카운터 추가 (시각 피드백)

### 영향 컴포넌트 (시각 복원)
- Calendar / DatePicker — 선택색·기본색 복원 (`--token-color-surface-*` 해결)
- Icon — md/sm/lg 등 사이즈 복원 → CheckMark·Chip·LogoOnlyHeader·DatePicker 아이콘 visible
- Text — 26 typography variant 모두 동작
- SlideListBadge — `bg-surface-default`·`bg-action-primary-default`·`w-size-control-xxxs`·`shadow-default-sm` 등 utility 생성
- ImageCell — `w-size-image-{sm,lg,xxl}` 해결 → 셀·이미지 visible
- Chip — typography + 아이콘 사이즈 복원으로 위치 정상화
- Toast — 단일 Toaster decorator
- LogoOnlyHeader — 클릭 피드백

### 디자인 토큰 정책
- 색상 토큰은 회사(gen-portal) 고유 색을 쓰지 않고 ui-kit 자체 `--color-*` 시맨틱 토큰을 alias.
- 사이즈/타이포 구조 토큰은 ui-kit 자체 정의가 없어 합리적 표준값(`--token-radius-xxs: 4px` 등)으로 신규 정의.

### 검증
- test 226/226 · build 통과 (styles.css 4.55KB → 12.79KB) · lint 통과
- IDE stylelint가 `@theme`/`@utility` 를 unknown at-rule 로 표기하나 Tailwind v4 build는 정상 처리

### 다음 작업
- PR 생성 → 머지
- Storybook 시각 회귀 확인 (사용자 직접 — 9개 컴포넌트 visual smoke test)

## Session Update 2026-05-13 (신규 프리미티브 4종 — AlertDialog · Sheet · Pagination · Breadcrumb)

### 변경 파일
- `src/components/primitives/alert-dialog/` — AlertDialog 컴포넌트 신규 (Radix 기반, destructive variant·cancel/action 빌트인)
- `src/components/primitives/sheet/` — Sheet 컴포넌트 신규 (Radix Dialog 재활용 + cva side variant top/right/bottom/left)
- `src/components/primitives/pagination/` — Pagination 컴포넌트 신규 (자체 페이지 범위 계산·siblingCount·ellipsis·aria-current)
- `src/components/primitives/breadcrumb/` — Breadcrumb compound 신규 (List·Item·Link[asChild]·Page·Separator·Ellipsis)
- `src/components/primitives/index.ts` — 4종 export 추가
- `package.json` / `pnpm-lock.yaml` — `@radix-ui/react-alert-dialog` 추가
- `stories/` — alert-dialog·sheet·pagination·breadcrumb 스토리 추가

### 주요 변경
- AlertDialog: Dialog와 분리, 파괴적 액션용 단순 wrapper. `cancelText`/`actionText`/`destructive` props.
- Sheet: Radix Dialog 재활용 (의존성 추가 X). cva로 4방향 슬라이드 variant.
- Pagination: 비제어 입력값 클램프 처리(범위 벗어난 currentPage → totalPages로 보정). `siblingCount=1` 기본.
- Breadcrumb: shadcn 패턴 답습 + 한국어 기본 aria-label("이동 경로", "더보기"). BreadcrumbLink는 asChild로 라우터 Link 호환.

### 검증
- test 226/226 · build 통과 · lint 통과
- biome 수정 2건: BreadcrumbPage `role="link"` 제거(aria-current만 사용), Pagination ellipsis key 안정화

### 알려진 이슈 (다음 세션 검증 대상)
- 슬라이드/페이드 애니메이션 utility(`animate-in`/`slide-in-from-X`)는 다른 primitives와 동일 패턴이나 keyframes 미정의일 가능성 — 시각 회귀 점검 필요.
- `src/components/primitives/empty-state/` 디렉토리가 존재하지만 primitives/index.ts에 export 되지 않음 (의도 여부 확인).

### 다음 작업
- PR 생성 → 머지
- 기존 작성 컴포넌트 동작성 검증 (사용자 보고 — 동작 안 되는 케이스 있음)

## Session Update 2026-05-11 (Progress·Tag·RadioGroup 추가)

### 변경 파일
- `src/components/primitives/progress/` — Progress 컴포넌트 신규 (Radix 기반, indeterminate 지원)
- `src/components/primitives/tag/` — Tag 컴포넌트 신규 (cva, 5 variant × 2 size, onRemove)
- `src/components/primitives/radio-group/` — RadioGroup·RadioGroupItem 신규 (Radix 기반, label)
- `src/components/primitives/index.ts` — 3개 export 추가 (progress·radio-group·tag)
- `package.json` / `pnpm-lock.yaml` — @radix-ui/react-progress, @radix-ui/react-radio-group 추가
- `stories/` — progress·tag·radio-group 스토리 추가

### 주요 변경
- 신규 프리미티브 3개 추가 (이관이 아닌 신규 개발)
- RadioGroupItem: label 클릭으로도 선택 가능 (htmlFor 연동)
- Tag: onRemove 전달 시 인라인 SVG X 버튼 렌더 (Icon 컴포넌트 미사용, 순환 의존 회피)

### 검증
- test 194/194 · build 통과 · lint 통과

### 다음 작업
- #23 아이콘 시스템 이관 검토

## Session Update 2026-05-11 (#22 Composed 컴포넌트 이관)

### 변경 파일
- `src/components/composed/` — 신규 디렉토리, 16개 컴포넌트 전체
  - check-mark · chip · date-picker · document-cell · empty-state · file-icon · icon-button · icon-tabs · image-cell · logo-only-header · modal · multiline-button · page-header · select-button · select-icon-button · text-skeleton
- `src/components/composed/index.ts` — 16개 barrel export
- `src/components/index.ts` — `export * from "./composed"` 추가
- `src/components/primitives/index.ts` — empty-state conflict 제거
- `stories/` — 16개 stories 추가

### 주요 변경
- gen-portal design-system의 composed/ 16개 컴포넌트 이관
- **IconButton**: ui-kit Button API 불일치(appearance/tertiary/danger/light 미지원) → 독립 `<button>` + cva로 구현
- **MultilineButton·SelectButton**: ui-kit Button tertiary variant 없음 → 독립 `<button>` + cva
- **TextSkeleton**: ui-kit Skeleton이 `style` prop 미지원 → 독립 `<div>` + animate-pulse
- **Modal**: ui-kit Dialog에 `className` 없음 → ModalProps에서 className 제거
- **IconTabs**: gen-portal 복합 Tooltip → ui-kit `<Tooltip content={...}>` 단일 API로 변환
- **EmptyState**: PNG illust 에셋 번들 불가 → `illustSrc?: string` 외부 prop으로 교체
- **primitives/EmptyState 충돌**: composed가 더 풍부한 API → primitives index에서 제거

### 검증
- test 178/178 · build 통과 · lint 통과

### 다음 작업
- Storybook main.ts 변경사항 커밋 (온보딩 가이드 제거, 단발)
- Progress / Tag / RadioGroup 추가 (후순위)

## Session Update 2026-05-11 (#21 커스텀 Primitives 이관)

### 변경 파일
- `src/components/primitives/text/` — Text 컴포넌트 신규 (polymorphic, cva typography variants)
- `src/components/primitives/thumbnail/` — Thumbnail 컴포넌트 신규 (CSS 회색 배경 fallback)
- `src/components/primitives/link-button/` — LinkButton 컴포넌트 신규 (cva, Icon 연동)
- `src/components/primitives/slide-list-badge/` — SlideListBadge 컴포넌트 신규 (cva compound variants)
- `src/components/primitives/index.ts` — 4개 export 추가 (알파벳 정렬)
- `stories/` — 4개 stories 추가

### 주요 변경
- gen-portal design-system의 primitives/genon/ 4개 컴포넌트 이관
- LinkButton: `@gen-portal/design-system` Icon → ui-kit 자체 Icon으로 교체, `danger→dangerDefault`·`light→inverse` 색상 매핑
- Thumbnail: 이미지 에셋 대신 `bg-[var(--color-neutral-200)]` CSS fallback 사용 (tsup 라이브러리 빌드 호환)

### 검증
- test 99/99 · build 통과 · lint 통과

### 다음 작업
- #22 Composed 컴포넌트 이관 (16개)

## Session Update 2026-05-11 (Calendar·Popover·ScrollArea·Icon 시스템 추가)

### 변경 파일
- `src/components/primitives/calendar/` — Calendar 컴포넌트 신규 (react-day-picker 기반)
- `src/components/primitives/popover/` — Popover 컴포넌트 신규 (Radix 기반)
- `src/components/primitives/scroll-area/` — ScrollArea 컴포넌트 신규 (Radix 기반)
- `src/components/primitives/icon/` — Icon 컴포넌트 + SVG 자동생성 스크립트 + 생성 파일 113개
- `src/components/primitives/index.ts` — 4개 신규 export 추가
- `stories/` — calendar·popover·scroll-area·icon 스토리 추가
- `biome.json` — `generated/` 디렉토리 lint/format 제외
- `package.json` / `pnpm-lock.yaml` — @radix-ui/react-scroll-area, react-day-picker, @svgr/* 추가

### 주요 변경
- Calendar·Popover·ScrollArea: #22 DatePicker 의존 프리미티브 선행 추가
- Icon 시스템: SVG → TSX 자동변환(generate-icons.mjs), 113개 아이콘, color/size 토큰 지원
- 테스트 수정: jsdom hex→rgb 정규화(icon), Radix scrollbar jsdom 미렌더 조건(scroll-area)
- SVGRProps export 수정으로 tsup dts 빌드 오류 해결

### 다음 할 일
- [ ] #21 커스텀 Primitives — Text · Thumbnail · LinkButton · SlideListBadge
- [ ] #22 Composed 16개 — CheckMark · Chip · DatePicker · DocumentCell · EmptyState · FileIcon · IconButton · IconTabs · ImageCell · LogoOnlyHeader · Modal · MultilineButton · PageHeader · SelectButton · SelectIconButton · TextSkeleton
- [ ] Storybook main.ts 온보딩 가이드 제거 커밋 (단발)

---

## Session Update 2026-05-07 (Storybook 정리·커스텀 컴포넌트 이관 준비)

### 변경 파일
- `.storybook/main.ts` — 온보딩 가이드 비활성화 (disableWhatsNewNotifications · sidebarOnboardingChecklist)
- `package.json` / `pnpm-lock.yaml` — @chromatic-com/storybook 제거
- `docs/ui-kit/status/HANDOFF_NOW.md` — 이관 작업 계획 반영

### 주요 변경
- Storybook "What's New" 알림 및 "Level up" 온보딩 체크리스트 제거
- 커스텀 디자인 컴포넌트 이관 이슈 #20 생성 (하위: #21 Primitives · #22 Composed · #23 Icons)
- 브랜치 `feat/#20-custom-component-migration` 생성

### 다음 할 일
- [ ] #21 커스텀 Primitives 이관 (Text · Thumbnail · LinkButton · SlideListBadge)
- [ ] #22 Composed 컴포넌트 이관 (Chip · DatePicker · Modal · PageHeader · IconButton 등 16개)
- [ ] #23 아이콘 시스템 이관

---

## Session Update 2026-05-07 (토큰 보강·컴포넌트 개선·워크플로우 정비)

### 변경 파일 (PR #13·#14·#15 squash merge)
- `src/styles/index.css` — @theme inline 누락 토큰 전체 등록 (#8)
- `src/styles/tokens/core.css` — blue 팔레트(25~900) 추가 (#8)
- `src/styles/tokens/semantic.css` — info 카테고리 토큰 추가 (#8)
- `src/components/primitives/button/button.tsx` — `loading` prop, Spinner 연동 (#9)
- `src/components/primitives/badge/badge.tsx` — `info` variant 추가 (#9)
- `src/components/primitives/toast/toast.test.tsx` — 1→4 tests (#9)
- `src/components/primitives/file-upload/file-upload.test.tsx` — 2→6 tests (#9)
- `.github/ISSUE_TEMPLATE/*.yml` — bug_report / feature_request / token_request (#10)
- `.github/PULL_REQUEST_TEMPLATE.md` — PR 템플릿 신규 (#10)
- `CLAUDE.md` — GitHub Issues 필수화, 횡단규칙 4개, 브랜치 네이밍 feat/#N (#10)
- `docs/ui-kit/git-workflow/branch-commit.md` — 브랜치 네이밍 `feat/#8` 형식 (#10)
- 하네스(code/design) — 이슈 생성 가이드 템플릿 추가·push

### 기타
- 브랜치 네이밍 규칙 실수 수정: `feat/8-long-name` → `feat/#8` 형식으로 재생성
- 커밋 메시지 한국어 규칙 확립

---

## Session Update 2026-04-30 (워크플로우 운영 시연 + README)

### 변경 파일
- `README.md` — 라이브러리 진입 문서 추가 (설치·사용법·컴포넌트 카탈로그·개발 명령·Git Flow 요약)
- `docs/ui-kit/status/HANDOFF_NOW.md` — §1·§2 갱신 (Project 링크 추가, §2를 expansion plan 중심으로 재정렬)
- `docs/ui-kit/history/세션_노트.md` — Session note prepend
- `docs/ui-kit/plans/HANDOFF.md` — 이 Session Update 추가

### 인프라/운영 변경 (이번 세션에 PR로 반영됨)
- `develop` 브랜치 신설, GitHub 기본 브랜치를 `develop` 으로 변경
- 이슈 #1·#2·#3 생성 → PR #4·#5·#6 생성·squash merge (3분리 단위 워크플로우 검증)
  - #4 `chore: biome 2.4.13 업그레이드 + 자동 포맷` (69 files)
  - #5 `feat: Toast 스토리 variant별 분리 + WithDescription`
  - #6 `chore: Claude Code 하네스 + Git Flow`
- 라벨 단일 축 6종 (이모지+색상)으로 재정의: 🧩 components / 🎨 tokens / 📚 stories / 🛠️ tooling / 🤖 harness / 🔀 workflow
- GitHub Project [UI-kit 구축 #1](https://github.com/users/Kyungjong-kim/projects/1) 생성, 이슈 #1·#2·#3 연결
- 인증: `gh` active account `kyungjongKim` → `Kyungjong-kim` 전환 (원격 레포 소유자 일치)

### 이슈
- 다음 세션 후보: (1) `docs/plans/2026-04-30-ui-kit-expansion.md` 실행 (`/executing-plans`, 18개 컴포넌트), (2) §2 단발 컴포넌트 옵션 (Progress·Tag·RadioGroup 등)

---

## Session Update 2026-04-30 (하네스 검토·Git Flow 전환)

### 변경 파일
- `CLAUDE.md` — (1) `doc-writer` → `ui-kit-doc-writer` 명칭 일치 (2) `main`·`develop` 직접 커밋 금지로 강제 규칙 갱신 (3) "브랜치·커밋 핵심 규칙" 상세 표 제거 → `branch-commit.md` 참조로 압축 (227줄 → 218줄) (4) "이슈 번호 없이 커밋 금지" 규칙을 트래커 도입 후 조건부로 변경
- `docs/ui-kit/git-workflow/branch-commit.md` — Git Flow 다이어그램으로 재작성 (main·develop 분리, release/hotfix 추가). 네이밍 표에 base 컬럼·release·hotfix 추가. PR 대상 매트릭스 추가. `.gitignore` 예시 블록을 실제 파일과 일치
- `docs/ui-kit/status/HANDOFF_NOW.md` — 브랜치 정보를 Git Flow로 갱신
- `.claude/agents/ui-kit-dev.md` — `main`·`develop` 직접 커밋 금지 + feature/release/hotfix 분기 규칙 명시
- `.gitignore` — `.claude/settings.local.json` 추가

### 이슈
- 하네스 자체 점검 + 브랜치 전략 변경 세션. `develop` 브랜치 실제 생성·푸시는 별도 세션에서 진행 예정. GitHub 기본 브랜치 변경(`gh repo edit --default-branch develop`) 여부도 미결정.

---

## Session Update 2026-04-30 (하네스 초기 구축)

### 변경 파일
- `CLAUDE.md` — 라이브러리 특화 STEP 0~3 + 강제 규칙 (5개 산출물 동시 작성, semantic 토큰 강제, primitives/index.ts export 갱신)
- `docs/ui-kit/agent/README.md` — 에이전트 컨텍스트 인덱스
- `docs/ui-kit/agent/architecture.md` — 라이브러리 빌드·exports·peerDeps·디렉토리·forwardRef·variant 패턴
- `docs/ui-kit/agent/conventions.md` — biome·네이밍·선언 순서·테스트·스토리 패턴
- `docs/ui-kit/agent/design-system.md` — 2계층 토큰(core·semantic)·variant(cva)·새 토큰 추가 절차
- `docs/ui-kit/status/HANDOFF_NOW.md` — 초기 상태
- `docs/ui-kit/history/세션_노트.md` — 첫 세션 노트
- `docs/ui-kit/git-workflow/branch-commit.md` — GitHub Flow + 컨벤셔널 커밋
- `.claude/agents/ui-kit-dev.md` — 컴포넌트·토큰 작성 전담
- `.claude/agents/ui-kit-doc-writer.md` — 문서 갱신 전담
- `.claude/skills/` (6개) — install.sh --local로 설치
- `.claude/settings.json` — 하네스 경로 등록

### 이슈
- 하네스 초기 구축 완료 — OSS 하네스 v1.0.0 직전 상태를 ui-kit(라이브러리)에 적용한 시뮬레이션. 다음 세션부터 Progress·Tag·RadioGroup 추가 작업으로 실제 워크플로우 검증.

---
