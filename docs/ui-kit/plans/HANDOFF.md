# ui-kit HANDOFF

> 이전 Session notes → [`history/세션_노트.md`](../history/세션_노트.md) 참고

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
