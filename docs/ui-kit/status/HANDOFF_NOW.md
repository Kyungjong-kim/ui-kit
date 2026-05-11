# ui-kit HANDOFF NOW

> **Hot 문서** — 세션 시작 시 가장 먼저 읽는다. 항상 60줄 이하로 유지.
> 상세 히스토리 → `plans/HANDOFF.md` / 세션 기록 → `history/세션_노트.md`

---

## §1 현재 상태

| 항목 | 값 |
|---|---|
| **브랜치** | `feat/#20-custom-component-migration` |
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

**최근 변경 (2026-05-11)**: Calendar · Popover · ScrollArea 프리미티브 추가(#22 DatePicker 의존), Icon 컴포넌트 + SVG 자동생성 시스템(#23) 커밋·push 완료. test 78/78 · build · lint 통과. biome.json generated 디렉토리 lint 제외 추가.

---

## §2 다음 작업 (신규 세션)

1. 🔴 **#21 커스텀 Primitives 이관** (`feat/#20-custom-component-migration` 브랜치)
   - Text · Thumbnail · LinkButton · SlideListBadge
   - 소스: `업무/GenOS/GenOS/gen-portal/frontend/packages/design-system/src/components/primitives/genon/`
2. 🔴 **#22 Composed 컴포넌트 이관** (16개)
   - CheckMark · Chip · DatePicker · DocumentCell · EmptyState · FileIcon · IconButton · IconTabs · ImageCell · LogoOnlyHeader · Modal · MultilineButton · PageHeader · SelectButton · SelectIconButton · TextSkeleton
   - 소스: `업무/GenOS/GenOS/gen-portal/frontend/packages/design-system/src/components/composed/`
3. (단발) Storybook main.ts 변경사항 커밋 (온보딩 가이드 제거)
4. (후순위) Progress / Tag / RadioGroup 추가
