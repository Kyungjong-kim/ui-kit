# ui-kit HANDOFF NOW

> **Hot 문서** — 세션 시작 시 가장 먼저 읽는다. 항상 60줄 이하로 유지.
> 상세 히스토리 → `plans/HANDOFF.md` / 세션 기록 → `history/세션_노트.md`

---

## §1 현재 상태

| 항목 | 값 |
|---|---|
| **브랜치** | `fix/#37-component-behavior` |
| **브랜치 네이밍** | `feat/#8`, `fix/#10` 형식 (`타입/#이슈번호`) |
| **열린 PR / 이슈** | PR #36 (feat/#31 신규 프리미티브 4종, 리뷰 대기) · #37 부모 + #38~#41 (컴포넌트 동작성 수정) |
| **빌드** | `pnpm build` (tsup) |
| **테스트** | `pnpm test` (vitest) |
| **시각 검증** | `pnpm storybook` (localhost:6006) |
| **Project** | [UI-kit 구축 #1](https://github.com/users/Kyungjong-kim/projects/1) |

**아키텍처**: React 디자인시스템 라이브러리. tsup ESM+CJS dual 빌드, `dist/` 산출물을 외부 앱이 소비.

**주의**:
- 컴포넌트 className: `[var(--color-...)]` 또는 semantic 토큰(`bg-bg-brand-default` 등) 경유
- 신규 컴포넌트는 **5개 산출물 동시 작성** (tsx + test + index + stories + primitives/index.ts export)
- **이슈 먼저 생성** → 브랜치 `feat/#<번호>` → 커밋 `feat: 한국어 내용 #번호`
- 디자인 토큰: ui-kit 자체 `--color-*` + 이관 컴포넌트용 `--token-*` (core.css·semantic.css)

**최근 변경 (2026-05-15) Phase 1**: UI 컴포넌트 토큰화 — core.css spacing-stack/group 토큰, index.css radius/@theme 매핑(rounded-sm=8px, rounded-md=12px), button/badge/card/input/tag 전면 토큰화.

**최근 변경 (2026-05-15) Phase 2**: UX 개선 — ① checkbox/radio hover 브랜드 border ② progress 슬라이딩 indeterminate 애니메이션 + h-stack 토큰 ③ file-upload 중복방지+FileRejection 에러표시(role=alert) ④ select size prop + checked 하이라이트 ⑤ stepper aria(ol/li/aria-current=step) ⑥ dialog aria-label+토큰 ⑦ pagination/switch/toast 토큰 정리. test 223/223 통과.

**최근 변경 (2026-05-13)**: 컴포넌트 동작성 수정 — `--token-*` 구조 토큰(radius·size·spacing·shadow·typography)을 core.css 에 추가, 시맨틱 alias(`--token-color-surface-*` 등)·icon 컬러를 semantic.css 에 추가, Tailwind utility 생성용 `--color-surface-*`·`--spacing-size-*`·`--shadow-default-*` 를 index.css `@theme` 에, `@utility typography-*` 26개를 index.css 하단에 정의. Toast·LogoOnlyHeader 스토리 수정. test 226/226·build·lint 통과.

---

## §2 다음 작업 (신규 세션)

1. (대기) PR #36 (신규 프리미티브 4종) 리뷰·머지
2. (대기) PR #37 fix (컴포넌트 동작성) 생성·머지
3. (검토) Storybook 시각 회귀 확인 — Calendar·Text·SlideListBadge·CheckMark·Chip·DatePicker·ImageCell·Toast·LogoOnlyHeader
4. (정비) `src/components/primitives/empty-state/` 가 `primitives/index.ts` 에 export 안 됨 — 의도 확인 필요
