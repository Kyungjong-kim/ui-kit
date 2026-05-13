# ui-kit HANDOFF NOW

> **Hot 문서** — 세션 시작 시 가장 먼저 읽는다. 항상 60줄 이하로 유지.
> 상세 히스토리 → `plans/HANDOFF.md` / 세션 기록 → `history/세션_노트.md`

---

## §1 현재 상태

| 항목 | 값 |
|---|---|
| **브랜치** | `feat/#31-new-primitives` |
| **브랜치 네이밍** | `feat/#8`, `chore/#10` 형식 (`타입/#이슈번호`) |
| **활성 이슈** | #31 신규 프리미티브 4종 (하위: #32 AlertDialog · #33 Sheet · #34 Pagination · #35 Breadcrumb) |
| **빌드** | `pnpm build` (tsup) |
| **테스트** | `pnpm test` (vitest) |
| **시각 검증** | `pnpm storybook` (localhost:6006) |
| **Project** | [UI-kit 구축 #1](https://github.com/users/Kyungjong-kim/projects/1) |

**아키텍처**: React 디자인시스템 라이브러리. tsup ESM+CJS dual 빌드, `dist/` 산출물을 외부 앱이 소비.

**주의**:
- 컴포넌트 className: `[var(--color-...)]` 또는 semantic 토큰(`bg-bg-brand-default` 등) 경유
- 신규 컴포넌트는 **5개 산출물 동시 작성** (tsx + test + index + stories + primitives/index.ts export)
- **이슈 먼저 생성** → 브랜치 `feat/#<번호>` → 커밋 `feat: 한국어 내용 #번호`

**최근 변경 (2026-05-13)**: 신규 프리미티브 4종 추가 (AlertDialog·Sheet·Pagination·Breadcrumb). `@radix-ui/react-alert-dialog` 추가. test 226/226·build·lint 통과.

---

## §2 다음 작업 (신규 세션)

1. (대기) PR 생성 후 — 리뷰·머지
2. (검토) 기존 작성 컴포넌트 동작성 검증 — 동작 안 되는 케이스 수집·수정 (시각 회귀·애니메이션 유틸 누락 가능성 포함)
3. (정비) `src/components/primitives/empty-state/` 가 `primitives/index.ts` 에 export 안 됨 — 의도 확인 필요
