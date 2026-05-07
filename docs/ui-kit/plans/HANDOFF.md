# ui-kit HANDOFF

> 이전 Session notes → [`history/세션_노트.md`](../history/세션_노트.md) 참고

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
