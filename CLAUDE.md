# ui-kit — Claude Code 하네스

> 이 문서는 단순 가이드가 아닌 **작업을 통제하는 하네스**다.
> 아래 규칙을 따르지 않으면 작업을 진행하지 않는다.

> **프로젝트 유형**: React 디자인시스템 라이브러리 (단일 패키지)
> 빌드 산출물(`dist/`)을 외부 앱이 소비.

---

## 🔴 STEP 0 — 작업 시작 전 필수 (건너뜀 금지)

### 0-A. 작업 영역 판별

요청을 받으면 **코드를 건드리기 전에** 작업 대상 영역을 판별한다.
불명확하면 **반드시 사용자에게 먼저 질문한다.** 임의 추정 금지.

| 키워드 / 단서 | 작업 영역 |
|---|---|
| 컴포넌트 추가·수정·variant·prop | `src/components/primitives/<컴포넌트>/` |
| 색상·spacing·radius 등 디자인 값 | `src/styles/tokens/` |
| 스토리북·예시·시각 검증 | `stories/` |
| 단위 테스트 | `src/components/primitives/<컴포넌트>/<컴포넌트>.test.tsx` |
| 빌드·exports·릴리스 | `tsup.config.ts` · `package.json` · `.changeset/` |
| 유틸 함수 (cn 등) | `src/utils/` |

불명확 시 질문:
> "이 작업은 컴포넌트 추가/수정인가요, 디자인 토큰 변경인가요, 빌드 설정인가요?"

---

### 0-B. 진입 문서 로드

작업 영역 확정 후 진입 문서를 읽고 작업을 시작한다.

| 문서 | 경로 |
|---|---|
| **HANDOFF_NOW** (현재 상태·다음 작업) | `docs/ui-kit/status/HANDOFF_NOW.md` |
| **agent/architecture.md** (라이브러리 구조) | `docs/ui-kit/agent/architecture.md` |
| **agent/conventions.md** (코딩 규칙) | `docs/ui-kit/agent/conventions.md` |
| **agent/design-system.md** (토큰·variant 패턴) | `docs/ui-kit/agent/design-system.md` |

읽은 후 §1(현재 상태)·§2(다음 작업)를 사용자에게 요약 출력한다.

---

### 0-C. 기존 코드 분석 (코드 작성 전 필수)

**컴포넌트 추가·수정 시 유사 컴포넌트 최소 2개를 먼저 읽는다.**
- 새 컴포넌트가 Radix 기반이면 → `accordion`, `dialog`, `tabs` 중 2개
- 새 컴포넌트가 단순(non-Radix)이면 → `badge`, `spinner`, `skeleton` 중 2개
- variant 시스템이 필요하면 → `button`, `badge` 의 `cva` 패턴 확인

확인 항목: 디렉토리 구조 / displayName / forwardRef 사용 여부 / cva variants / 테스트 형태 / 스토리 형태.

### 0-D. 구현 계획 수립 및 확인

분석 결과를 바탕으로 단계별 구현 계획을 수립한 뒤 **사용자에게 제시하고 확인을 받는다.**

```
[구현 계획]
- 신규/수정 파일: <파일 목록>
- 변경 내용: <단계별 작업>
- 영향 범위: <export·index.ts·기존 컴포넌트 영향 여부>
```

**사용자 확인 전까지 코드 작성·파일 수정 금지.**

---

## 에이전트 작업 방식 (필수)

**모든 작업에서 아래 루프를 따른다. 임의 실행 금지.**

```
1. 분석 — 유사 컴포넌트 2개 이상 확인 (구조·variant·테스트·스토리)
2. 제안 — "다음 행동: [구체적 행동]을 하겠습니다. 진행할까요?" 사용자에게 먼저 물어봄
3. 대기 — 사용자 승인 확인
4. 실행 — 승인 후에만 코드 작성·파일 수정
5. 보고 — 완료 결과 요약 후 다음 행동 제안으로 돌아감
```

**예외 — 승인 없이 바로 실행 가능한 것:**
- 파일 읽기·검색 등 조회성 작업
- 사용자가 "바로 해줘" / "한 번에 다 해줘" 등으로 명시적으로 허가한 경우

---

## 🔴 STEP 1 — 작업 중 강제 규칙

> **규칙 위반 발견 시: 즉시 중단 → 사용자에게 위반 내용 보고 → 지시 후 재개. 임의 수정 후 계속 진행 금지.**

| 규칙 | 위반 시 |
|---|---|
| **신규 컴포넌트는 5개 산출물 동시 작성** (`<name>.tsx` / `<name>.test.tsx` / `index.ts` / `stories/<name>.stories.tsx` / `src/components/primitives/index.ts` export 추가) | 즉시 중단 → 누락 항목 보고 후 보완 |
| **디자인 토큰 직접 hex 사용 금지** — 컴포넌트 className에 `#fabc37` 같은 raw값 작성 금지. semantic 토큰 변수(`bg-bg-brand-default` 등) 경유 | 즉시 중단 → semantic 토큰으로 교체 |
| **`src/components/primitives/index.ts` 갱신 누락 금지** — 신규 컴포넌트 export 추가 후 `pnpm build` 실행 | 즉시 중단 → export 추가 후 빌드 재실행 |
| **(이슈 트래커 도입 후) 이슈 번호 없이 커밋 금지** — 트래커 미도입 상태(현재)에선 적용 안 함 | 즉시 중단 → 이슈 생성 후 재개 |
| **`main`·`develop` 직접 커밋 금지** (Git Flow — feature/release/hotfix 브랜치만 머지) | 즉시 중단 → 브랜치 생성 |
| **커밋은 명시적 요청 시에만** | 사용자가 "커밋해줘" 전까지 커밋 불가 |

---

## 🔴 STEP 2 — 검증 하네스 (코드 작성 후 필수)

```
[규칙 준수 체크]
- [ ] 5개 산출물 모두 작성 (신규 컴포넌트 시)
- [ ] 디자인 토큰 직접 hex 사용 없음
- [ ] forwardRef 사용 패턴 일관 (Radix 래퍼는 forwardRef, 단순 컴포넌트는 함수)
- [ ] cva variants 네이밍 기존 패턴 따름 (variant·size 키)
- [ ] 변경된 모든 줄이 사용자 요청에 추적 가능 (Surgical Changes)
- [ ] pnpm test 통과
- [ ] pnpm build 통과 (dist 갱신)
- [ ] pnpm lint 통과 (biome)
```

**체크 실패 시:** 위반 항목을 사용자에게 보고한 뒤 수정 방향을 확인받는다. 스스로 판단해 수정 후 완료 처리 금지.

**테스트 작성 기준:** 신규 컴포넌트 → **필수** / variant·prop 추가 → **필수** / 토큰만 변경 → 시각 회귀(스토리북) 확인 / 문서·설정만 변경 → 생략.

**시각 검증 방법:**
- 컴포넌트 추가·수정 시 `pnpm storybook` 으로 해당 스토리 확인 (사용자가 직접)
- 자동 검증은 단위 테스트(vitest)로 충분 — Playwright 별도 도입 안 함

**빌드·타입·린트 오류 시:** ① 내 코드 문제 → 즉시 수정 ② 기존 호환성 문제 → `debugger` 에이전트 ③ 2회 이상 반복 실패 → **즉시 중단·사용자 보고**

---

## agent/ 문서 갱신 트리거

매 세션마다 갱신하지 않고 아래 조건 충족 시에만 갱신한다.

| 문서 | 갱신 트리거 |
|------|------------|
| `agent/architecture.md` | 빌드 시스템 변경, 새 디렉토리 구조 추가, peerDependencies 변경 |
| `agent/conventions.md` | 린터 설정 변경, 파일 네이밍 규칙 변경, 새 컨벤션 결정 |
| `agent/design-system.md` | 디자인 토큰 추가·변경, 새 variant 패턴 도입, semantic 토큰 재정의 |

---

## 🔴 STEP 3 — 세션 종료 강제 절차

코드·문서 변경이 있었던 세션은 사용자 지시 없이도 자동 수행한다.

**갱신 순서 (순서 바꾸지 말 것):**
1. `docs/ui-kit/status/HANDOFF_NOW.md` — §1 현재 상태·§2 다음 작업 갱신 (60줄 이하 유지)
2. `docs/ui-kit/history/세션_노트.md` — 최상단 prepend (`> Session note YYYY-MM-DD: [요약]`)
3. `docs/ui-kit/plans/HANDOFF.md` — `## Session Update YYYY-MM-DD` 섹션 최상단 추가

**갱신 후 일관성 검증:** HANDOFF_NOW.md §2 첫 항목이 최신 다음 작업인지 / 60줄 이하인지 확인.

**변경 결과 요약 출력 (필수):**
```
[작업 결과]
- 변경 파일:
- 주요 변경:
- 영향 범위:
```

위 결과 요약 없으면 작업 완료로 간주하지 않음.

---

## 작업 범위 초과 시

요청 범위 밖 변경(파일·디렉토리 추가, 의존성 설치, 설정 수정, 요청하지 않은 파일 수정 등)이 필요하다고 판단될 때:
① 즉시 중단 ② 사용자에게 필요한 추가 변경과 이유를 보고 ③ 허가 후 진행.
거부 시 해당 변경 없이 가능한 범위만 구현 후 보고.

---

## 서브에이전트 호출 규칙

| 작업 유형 | 호출 에이전트 |
|---|---|
| 컴포넌트 추가·수정·variant·prop | `ui-kit-dev` |
| 디자인 토큰 변경·확장 | `ui-kit-dev` (design-system.md 자동 갱신 트리거) |
| 문서·HANDOFF 갱신 | `ui-kit-doc-writer` |
| 코드 리뷰 | `code-reviewer` |
| 버그 원인 추적 | `debugger` |
| 리팩토링 | `refactor` |
| 테스트 작성 | `test-writer` (**프롬프트에 "기존 소스 파일 수정 금지, 테스트 파일만 작성" 명시 필수**) |

---

## 팀 프로세스

| 작업 | 참조 문서 |
|------|-----------|
| 커밋·브랜치·PR 규칙 (Git Flow, 네이밍, 컨벤셔널 커밋, Co-Authored-By 등) | `docs/ui-kit/git-workflow/branch-commit.md` |
| PR 템플릿 | `.github/PULL_REQUEST_TEMPLATE.md` (없으면 생성 검토) |

> 브랜치 분기·머지·PR 대상 매트릭스는 위 문서를 참조한다. 브랜치 생성·커밋·PR 생성 시점에만 읽으면 된다.

---

## 공통 규칙

- 언어: 한국어로 응답.
- 패키지 매니저: `pnpm`
- 빌드: `pnpm build` (tsup, ESM+CJS dual)
- 개발: `pnpm dev` (tsup --watch) / `pnpm storybook` (시각 확인)
- 테스트: `pnpm test` (vitest)
- 린트·포맷: `pnpm lint` / `pnpm format` (biome)
- 릴리스: `pnpm changeset` → `pnpm version` → `pnpm release`

---

## 스킬

| 스킬 | 용도 |
|------|------|
| `/session-close` | 세션 종료 — HANDOFF 3종 갱신 |
| `/project-fix` | QA·버그 이슈 → 서브이슈 생성 + 브랜치 준비 |
| `/project-pr` | PR 생성 — 이슈 연결·Co-Authored-By 포함 |
| `/project-issue` | GitHub 이슈 인터랙티브 생성 |
| `/document-review` | 문서 세트 시나리오 검증·이슈 수정 |
