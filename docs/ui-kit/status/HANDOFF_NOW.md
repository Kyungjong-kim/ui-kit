# ui-kit HANDOFF NOW

> **Hot 문서** — 세션 시작 시 가장 먼저 읽는다. 항상 60줄 이하로 유지.
> 상세 히스토리 → `plans/HANDOFF.md` / 세션 기록 → `history/세션_노트.md`

---

## §1 현재 상태

| 항목 | 값 |
|---|---|
| **브랜치** | `develop` (PR #69 머지 완료) |
| **브랜치 네이밍** | `feat/#8`, `fix/#10`, `design/#68` 형식 (`타입/#이슈번호`) |
| **열린 PR / 이슈** | 없음 |
| **빌드** | `pnpm build` (tsup) |
| **테스트** | `pnpm test` (vitest 241/241) |
| **시각 검증** | `pnpm storybook` (localhost:6006) |
| **CI** | `.github/workflows/{ci,release}.yml` (PR·main 자동 검증) |
| **Project** | [UI-kit 구축 #1](https://github.com/users/Kyungjong-kim/projects/1) |

**아키텍처**: React 디자인시스템 라이브러리. tsup ESM+CJS dual 빌드, `dist/` 산출물을 외부 앱이 소비.

**주의**:
- 컴포넌트 className: semantic 토큰 `[var(--color-...)]` 임의값 형태만 사용 (Tailwind utility 형태 금지 — 라이브러리 이식성)
- 컴포넌트는 **primitives** (Radix·단일 책임) 또는 **composed** (조합·도메인) 두 카테고리에 위치
- 신규 컴포넌트는 **5개 산출물 동시 작성** (tsx + test + index + stories + `<카테고리>/index.ts` export)
- **이슈 먼저 생성** → 브랜치 `feat/#<번호>` → 커밋 `feat: 한국어 내용 #번호`
- 디자인 토큰: ui-kit 자체 `--color-*` + 이관 컴포넌트용 `--token-*` (core.css·semantic.css)

**최근 변경 (2026-05-27) PR #69 디자인 시스템 재정비 + 풍부화**: shadcn 미니멀 + depth·gradient·press·hover 단서 기조. 토큰(shadow 방향성·필드너비 `--size-field-*`·focus brand-400·`--spacing-size-icon-*` 매핑 보완). 폼·오버레이·Button·Progress·Slider·Tabs·Pagination. 버그수정 2건: Slider thumb 안보임(무효토큰 크기0), size-icon 매핑 누락. 비토큰 shadow 0건.

**최근 변경 (2026-05-27) PR #62·#64·#66**: Combobox(검색형 select, uncontrolled fallback) + Slider(Radix) 신규.

**최근 변경 (2026-05-27) PR #60**: CI bootstrap — `ci.yml`·`release.yml`.

**최근 변경 (2026-05-18) PR #59**: 컴포넌트 구조 표준화 — size/error/helperText prop + CVA 통일.

---

## §2 다음 작업 (신규 세션) — 디자인 풍부화 미적용 컴포넌트

> 적용 기법: depth(inset/elevation shadow)·gradient accent·마이크로인터랙션(hover lift·active press·scale)·hover 단서·shadow 토큰화

1. **인터랙티브**: tooltip·sheet·accordion·stepper·dnd-list·file-upload·calendar·link-button·scroll-area
2. **디스플레이**(점검만, 풍부화 미적용): card·badge·tag·avatar·breadcrumb·thumbnail·slide-list-badge
3. **단순**(필요 시): separator·skeleton·spinner·text·icon·toast
4. (예정) changesets 첫 release 검증 — main push 후 version PR 자동 생성 확인
