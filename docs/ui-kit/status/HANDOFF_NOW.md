# ui-kit HANDOFF NOW

> **Hot 문서** — 세션 시작 시 가장 먼저 읽는다. 항상 60줄 이하로 유지.
> 상세 히스토리 → `plans/HANDOFF.md` / 세션 기록 → `history/세션_노트.md`

---

## §1 현재 상태

| 항목 | 값 |
|---|---|
| **브랜치** | Git Flow — base `develop`, 릴리스만 `main` |
| **GitHub 기본 브랜치** | `develop` |
| **활성 이슈** | 없음 (이슈 #1·#2·#3 모두 머지로 close) |
| **빌드** | `pnpm build` (tsup) |
| **테스트** | `pnpm test` (vitest, 22 files / 54 tests) |
| **시각 검증** | `pnpm storybook` (localhost:6006) |
| **Project** | [UI-kit 구축 #1](https://github.com/users/Kyungjong-kim/projects/1) |

**아키텍처**: React 디자인시스템 라이브러리. tsup ESM+CJS dual 빌드, `dist/` 산출물을 외부 앱이 소비. `src/components/primitives/<kebab-case>/` 단위로 22개 컴포넌트 구현.

**주의**:
- 컴포넌트 className에 raw hex 사용 금지 → semantic 토큰(`bg-bg-brand-default` 등) 경유
- 신규 컴포넌트는 **5개 산출물 동시 작성** (tsx + test + index + stories + primitives/index.ts export)

**최근 변경 (2026-04-30)**: 하네스 구축·Git Flow 전환·biome 2.x·Toast 스토리·README 추가. 상세 내역은 `plans/HANDOFF.md` Session Update 참조.

---

## §2 다음 작업 (신규 세션)

1. 🔴 컴포넌트 확장 plan 실행 검토 — `docs/plans/2026-04-30-ui-kit-expansion.md` (18개 컴포넌트, `/executing-plans` 스킬로 진행)
2. (대안) 단발 컴포넌트 추가: Progress / Tag / RadioGroup 중 선택
3. 디자인 토큰 `info` 카테고리 추가 시나리오
4. 기존 Button에 `loading` prop 추가 시나리오
