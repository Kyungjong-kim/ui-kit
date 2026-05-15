# ui-kit 브랜치·커밋 가이드

---

## 브랜치 전략

**전략**: Git Flow

```
main                              ← 프로덕션 (npm publish 시점만 머지)
  ├── release/<버전>              ← 버전 cut · changeset 통합 (develop 분기 → main + develop 머지)
  └── hotfix/#<이슈번호>          ← 프로덕션 긴급 수정 (main 분기 → main + develop 머지)

develop                           ← 개발 통합 (feature PR 머지 대상)
  └── feat|fix|refactor|docs|test|chore/#<이슈번호>   ← 일반 작업 (develop 분기 → develop 머지)
```

> **브랜치명 형식**: `<타입>/#<이슈번호>` 고정. 요약 suffix 허용(예: `fix/#37-component-behavior`) 단 이슈번호는 필수. release 브랜치만 버전명 사용.

### 브랜치별 역할·머지 규칙

| 브랜치 | 분기 기준점 | 머지 대상 | 용도 |
|---|---|---|---|
| `main` | — | — | 프로덕션 / 릴리스 태깅 |
| `develop` | `main` (최초 1회) | — | 개발 통합 |
| `feat/#<이슈번호>` 등 | `develop` | `develop` | 컴포넌트·prop·variant·토큰·문서 등 일반 작업 |
| `release/<버전>` | `develop` | `main` + `develop` 백머지 | 버전 cut · changeset 모음 · QA |
| `hotfix/#<이슈번호>` | `main` | `main` + `develop` 백머지 | 프로덕션 긴급 수정 |

### 작업 시작 명령

```bash
# 일반 작업 (feat/fix/refactor/docs/test/chore)
git checkout develop
git pull origin develop
git checkout -b feat/#<이슈번호>

# 릴리스 cut
git checkout develop
git pull origin develop
git checkout -b release/<버전>

# 핫픽스
git checkout main
git pull origin main
git checkout -b hotfix/#<이슈번호>
```

---

## 브랜치 네이밍

| 타입 | 패턴 | base | 예시 |
|------|------|------|------|
| 기능 추가 | `feat/#<이슈번호>` | `develop` | `feat/#8`, `feat/#9` |
| 버그 수정 | `fix/#<이슈번호>` | `develop` | `fix/#10` |
| 토큰 변경 | `feat/#<이슈번호>` 또는 `chore/#<이슈번호>` | `develop` | `feat/#9` |
| 리팩토링 | `refactor/#<이슈번호>` | `develop` | `refactor/#11` |
| 문서 | `docs/#<이슈번호>` | `develop` | `docs/#12` |
| 테스트 | `test/#<이슈번호>` | `develop` | `test/#13` |
| 기타 정비 | `chore/#<이슈번호>` | `develop` | `chore/#10` |
| 릴리스 | `release/<버전>` | `develop` | `release/0.2.0` |
| 핫픽스 | `hotfix/#<이슈번호>` | `main` | `hotfix/#14` |

> **이슈 트래커**: GitHub Issues. 작업 시작 전 이슈 먼저 생성. 브랜치명·커밋 메시지에 이슈 번호 필수 포함.

---

## 커밋 메시지 규칙

**형식**: 컨벤셔널 커밋 (영역 브래킷 생략 — 단일 패키지)

```
<타입>: <변경 내용> #이슈번호
```

### 변경 타입 목록

| 타입 | 설명 |
|------|------|
| `feat` | 새 컴포넌트·prop·variant·토큰 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서·HANDOFF 갱신 |
| `refactor` | 코드 리팩토링 (동작 변경 없음) |
| `test` | 테스트 추가·수정 |
| `chore` | 빌드·tsup·package.json·changeset 등 |
| `style` | biome 자동 포맷·코드 스타일만 |

### 예시

```
feat: add Button loading prop #8
feat: add info tokens and Badge info variant #9
fix: Button disabled state aria-disabled missing #10
docs: update design-system.md for info tokens #11
chore: bump tsup to 8.5.1 #12
```

---

## Co-Authored-By (Claude Code 작업 시 필수)

```
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

---

## PR 가이드

**PR 대상 브랜치**:

| 작업 브랜치 | PR 대상 | 비고 |
|---|---|---|
| `feat/*`, `fix/*`, `refactor/*`, `docs/*`, `test/*`, `chore/*` | `develop` | squash 머지 |
| `release/*` | `main` | 머지 후 `develop` 으로 백머지 PR 추가 |
| `hotfix/*` | `main` | 머지 후 `develop` 으로 백머지 PR 추가 |

**PR 제목 형식**: `<변경 내용>` (타입·이슈번호는 본문에 명시)

**체크리스트**:
- [ ] 이슈 생성 확인 (작업 시작 전 필수)
- [ ] `pnpm test` 통과
- [ ] `pnpm build` 통과 (dist 갱신 확인)
- [ ] `pnpm lint` 통과
- [ ] 신규 컴포넌트면 5개 산출물 모두 작성
- [ ] semantic 토큰만 사용 (raw hex 없음)
- [ ] 관련 문서 갱신 (HANDOFF_NOW.md, design-system.md 등)
- [ ] changeset 추가 (`pnpm changeset`) — 릴리스 영향 있는 경우

---

## .gitignore 하네스 관련 항목

실제 `.gitignore` 내용:

```gitignore
node_modules/
dist/
storybook-static/
.DS_Store
*.local

# Claude Code 개인 설정
.claude/settings.local.json
```

> **팀 공유 정책**:
> - `CLAUDE.md` — 추적 (라이브러리는 1인 운영이지만 OSS 가능성 위해 공유)
> - `.claude/agents/` — 추적 (프로젝트 전용 에이전트)
> - `.claude/skills/` — 추적 (프로젝트 스킬, 목록은 CLAUDE.md "스킬" 표 참조)
> - `.claude/settings.json` — 추적 (하네스 경로 등록)
> - `docs/ui-kit/` — 추적
