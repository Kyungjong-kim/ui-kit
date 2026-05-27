# ui-kit HANDOFF NOW

> **Hot 문서** — 세션 시작 시 가장 먼저 읽는다. 항상 60줄 이하로 유지.
> 상세 히스토리 → `plans/HANDOFF.md` / 세션 기록 → `history/세션_노트.md`

---

## §1 현재 상태

| 항목 | 값 |
|---|---|
| **브랜치** | `feat/#60` (CI bootstrap 작업 중) |
| **브랜치 네이밍** | `feat/#8`, `fix/#10` 형식 (`타입/#이슈번호`) |
| **열린 PR / 이슈** | #60 CI bootstrap (작업 중) |
| **빌드** | `pnpm build` (tsup) |
| **테스트** | `pnpm test` (vitest 226/226) |
| **시각 검증** | `pnpm storybook` (localhost:6006) |
| **CI** | `.github/workflows/{ci,release}.yml` (#60에서 추가 중) |
| **Project** | [UI-kit 구축 #1](https://github.com/users/Kyungjong-kim/projects/1) |

**아키텍처**: React 디자인시스템 라이브러리. tsup ESM+CJS dual 빌드, `dist/` 산출물을 외부 앱이 소비.

**주의**:
- 컴포넌트 className: semantic 토큰 `[var(--color-...)]` 임의값 형태만 사용 (Tailwind utility 형태 금지 — 라이브러리 이식성)
- 컴포넌트는 **primitives** (Radix·단일 책임) 또는 **composed** (조합·도메인) 두 카테고리에 위치
- 신규 컴포넌트는 **5개 산출물 동시 작성** (tsx + test + index + stories + `<카테고리>/index.ts` export)
- **이슈 먼저 생성** → 브랜치 `feat/#<번호>` → 커밋 `feat: 한국어 내용 #번호`
- 디자인 토큰: ui-kit 자체 `--color-*` + 이관 컴포넌트용 `--token-*` (core.css·semantic.css)

**최근 변경 (2026-05-18) PR #59**: 컴포넌트 구조 표준화 — size/error/helperText prop + CVA 통일.

**최근 변경 (2026-05-15) PR #58**: 디자인 하네스 문서 검증·수정 — 토큰 사용 규칙 통일, 브랜치 네이밍 일관화, primitives/composed 두 카테고리 명시.

**최근 변경 (2026-05-15) PR #56·#53 Phase 1/2**: UI 컴포넌트 토큰화 + UX 개선 — core.css spacing-stack/group 토큰, index.css radius/@theme 매핑, button/badge/card/input/tag 전면 토큰화 / checkbox·radio hover·progress 슬라이딩·file-upload 에러표시·select size·stepper aria·dialog aria-label·pagination/switch/toast 토큰 정리. test 223/223 통과.

---

## §2 다음 작업 (신규 세션)

1. (작업 중 #60) CI workflow 추가 — `ci.yml` (lint·test·build·storybook) + `release.yml` (changesets) → PR 머지
2. (검토) Storybook 시각 회귀 — Calendar·Text·SlideListBadge·CheckMark·Chip·DatePicker·ImageCell·Toast·LogoOnlyHeader
3. (예정) changesets 첫 release 워크플로우 검증 — main 브랜치 push 후 version PR 자동 생성 확인
