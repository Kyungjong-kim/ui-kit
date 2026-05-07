# ui-kit HANDOFF NOW

> **Hot 문서** — 세션 시작 시 가장 먼저 읽는다. 항상 60줄 이하로 유지.
> 상세 히스토리 → `plans/HANDOFF.md` / 세션 기록 → `history/세션_노트.md`

---

## §1 현재 상태

| 항목 | 값 |
|---|---|
| **브랜치** | Git Flow — base `develop`, 릴리스만 `main` |
| **브랜치 네이밍** | `feat/#8`, `chore/#10` 형식 (`타입/#이슈번호`) |
| **활성 이슈** | #20 커스텀 디자인 컴포넌트 이관 (하위: #21 Primitives · #22 Composed · #23 Icons) |
| **빌드** | `pnpm build` (tsup) |
| **테스트** | `pnpm test` (vitest) |
| **시각 검증** | `pnpm storybook` (localhost:6006) |
| **Project** | [UI-kit 구축 #1](https://github.com/users/Kyungjong-kim/projects/1) |

**아키텍처**: React 디자인시스템 라이브러리. tsup ESM+CJS dual 빌드, `dist/` 산출물을 외부 앱이 소비.

**주의**:
- 컴포넌트 className: `[var(--color-...)]` 또는 semantic 토큰(`bg-bg-brand-default` 등) 경유
- 신규 컴포넌트는 **5개 산출물 동시 작성** (tsx + test + index + stories + primitives/index.ts export)
- **이슈 먼저 생성** → 브랜치 `feat/#<번호>` → 커밋 `feat: 한국어 내용 #번호`

**최근 변경 (2026-05-07)**: @theme inline 토큰 완성, info/blue 팔레트(#8), Button loading/Badge info/테스트 보강(#9), GitHub 이슈·PR 템플릿 + CLAUDE.md 워크플로우 정비 + 브랜치 네이밍 `feat/#N` 확립(#10). Storybook 온보딩 가이드 제거(`disableWhatsNewNotifications` + `sidebarOnboardingChecklist`). 커스텀 컴포넌트 이관 이슈 #20 생성 + 브랜치 `feat/#20-custom-component-migration` 준비.

---

## §2 다음 작업 (신규 세션)

1. 🔴 **커스텀 컴포넌트 이관** (`feat/#20-custom-component-migration` 브랜치)
   - #21 커스텀 Primitives 4개 (Text · Thumbnail · LinkButton · SlideListBadge)
   - #22 Composed 컴포넌트 16개 (Chip · DatePicker · Modal · PageHeader · IconButton 등)
   - #23 아이콘 시스템 (Icon 래퍼 + SVG 자동생성)
   - 소스: `업무/GenOS/GenOS/gen-portal/frontend/packages/design-system`
2. (단발) Storybook main.ts 변경사항 커밋 (온보딩 가이드 제거, 이슈 번호 연결 후)
3. (후순위) Progress / Tag / RadioGroup 추가
4. (후순위) changeset → 버전 컷 (0.1.0) 검토
