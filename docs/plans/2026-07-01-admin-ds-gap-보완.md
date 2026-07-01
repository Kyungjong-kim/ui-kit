# ui-kit 보완 플랜 — 성숙 관리자 DS 대비 격차 분석 (2026-07-01)

> **목적**: 성숙한 사내 관리자 프론트 디자인시스템(이하 **레퍼런스 DS**)을 벤치마크로, ui-kit의 격차를 식별하고 보완 로드맵을 세운다.
> **전제 (중요)**: 레퍼런스 DS는 **성숙도 벤치마크로만** 사용한다. 코드·토큰 값·비즈니스 로직을 복사하지 않는다. ui-kit는 독립 구현하며, 격차 항목의 *기능 종류·설계 패턴* 수준만 참고한다.

---

## 1. 요약 — 격차 스냅샷

| 영역 | 레퍼런스 DS | ui-kit 현재 | 격차 |
|---|---|---|---|
| **데이터 테이블** | TanStack 기반 정렬·페이지·tree-table | Pagination만, Table 컴포넌트 없음 | 🔴 큼 |
| **차트** | 12종(bar/line/area/donut/pie/radar/gauge/heatmap…) + 엔진 통합 + DS 토큰 플러그인 | 없음 | 🔴 큼 |
| **토큰 파이프라인** | `core.json`·`semantic.json` 소스 → CSS 자동생성 | CSS 수기 편집 (JSON 소스 없음) | 🟡 중 |
| **surface 토큰 계층** | 7단계(default~strongest) × 7색 = 49종 | surface 얕음, category(purple) 없음 | 🟡 중 |
| **고급 입력** | DateRange/DateTime/Month Picker, Cascading/Filter Select | DatePicker·Combobox·MultiSelect까지 | 🟡 중 |
| **데이터표시 보조** | MetricCard·bar-list·resource-usage·sparkline·comparison-bar | StatCard·SummaryGrid까지 | 🟢 소 |
| **아이콘** | 337개 semantic name + 8 size | Lucide 149개 + 색토큰 | 🟢 소 |
| **다크모드** | light-only (모드 확장 구조 준비) | light-only | 🟢 소(공통) |
| **Storybook** | 없음 (Figma 우선) | ✅ 65 story 1:1 | ⭐ ui-kit 우위 |
| **테스트** | 없음 | ✅ vitest 304 pass | ⭐ ui-kit 우위 |
| **문서** | JSDoc + Figma 링크 | ✅ 캐노니컬 DS 문서 트리 | ⭐ ui-kit 우위 |
| **빌드·배포** | 앱 내장 (배포 없음) | ✅ tsup dual + `theme.css` 출하 + changesets | ⭐ ui-kit 우위 |

**핵심 결론**: ui-kit는 **인프라(테스트·문서·빌드·배포)에선 오히려 앞서고**, **비즈니스 컴포넌트 깊이(테이블·차트)와 토큰 자동화**에서 뒤진다. 포트폴리오 관점 최우선 보완 = **데이터 테이블 + 토큰 파이프라인 자동화** (라이브러리 실사용 신뢰성 신호).

---

## 2. 인벤토리 대조

### 2-1. 컴포넌트 커버리지

**레퍼런스 DS에 있고 ui-kit에 없는 것 (보완 후보):**
- 데이터: `DataTable`(정렬·페이지·선택), `TreeTable`, 차트 12종, `bar-list`, `resource-usage`, `comparison-bar`, `sparkline`
- 입력: `DateRangePicker`, `DateTimePicker`, `MonthPicker`, `CascadingSelect`, `FilterDropdown`, `period-filter`
- 표시: `MetricCard`, `Alert`, `HoverCard`, `GuideBlock`, `VersionInfoCard`
- 오버레이: `FullScreenDialog`, `SidePanel`(ui-kit Sheet로 일부 커버)

**ui-kit에 있고 레퍼런스 DS에 없는 것 (독자 강점, 유지):**
- `DndList`(@dnd-kit), `Timeline`, `Calendar` 단독, `Stepper`, `SegmentedControl`, `TagInput`, `FileUpload`, 다수 composed

> 대부분의 primitive(Button/Input/Select/Dialog/Tabs/Tooltip 등)는 양쪽 동등. 격차는 **비즈니스 조합 컴포넌트**에 집중.

### 2-2. 토큰 체계 대조

| 축 | 레퍼런스 DS | ui-kit |
|---|---|---|
| 소스 | `core.json` + `semantic.json` (자동생성 파이프라인) | `core.css` + `semantic.css` (수기) |
| 계층 | core → semantic → `@theme` (3계층) | core → semantic → `@theme inline` (3계층, 동등) |
| surface | 7단계 × 7색 (49) | bg 위주, surface 계층 얕음 |
| category(purple) | 있음 | 없음 |
| Tailwind | v4, preflight OFF (MUI 공존) | v4, preflight ON (독립) |
| 다크모드 | 미구현(구조 준비) | 미구현 |

> ui-kit의 3계층 구조·semantic 네이밍은 이미 성숙. **격차는 (a) JSON 소스 자동생성 부재, (b) surface 계층 폭.**

---

## 3. 격차 항목 상세 (우선순위)

### P0 — 핵심 격차 (포트폴리오 가치 최상)

**G1. 데이터 테이블 (`DataTable`)**
- 근거: 실무 관리자 UI의 중심. 라이브러리 신뢰성의 가장 강한 신호.
- 범위: TanStack Table v8 기반. 정렬·페이지네이션·행 선택·컬럼 리사이즈. 셀 렌더 커스텀. 빈 상태(EmptyState 연동). 로딩 스켈레톤.
- 확장(후속): `TreeTable`(계층 행 펼침/접힘).
- 의존: `@tanstack/react-table` 추가.

**G2. 토큰 파이프라인 자동화**
- 근거: 토큰 값 변경 시 CSS 수기 편집 = 실수·drift 위험. JSON 단일 소스 → 생성.
- 범위: `tokens/core.json`·`semantic.json` 도입 → 스크립트로 `core.css`·`semantic.css`·(선택)TS 타입 자동생성. 기존 CSS와 diff 검증.
- 산출: `scripts/build-tokens.ts` + `pnpm tokens` 스크립트. IDE 자동완성용 토큰 타입 export.

### P1 — 실사용 폭 확장

**G3. 차트 (경량부터)**
- 근거: 대시보드 필수. 단, 12종 전량은 과함 → **핵심 3종(Line/Bar/Donut)부터**.
- 범위: 엔진 결정(경량 = `recharts` 또는 자체 SVG). DS 토큰으로 축·그리드·색 매핑. 툴팁 DS 스타일. 반응형.
- 트레이드오프: 번들 크기 vs 기능. tree-shaking 검증 필수.

**G4. surface 토큰 계층 확장**
- 범위: `surface-{subtle,subtlest,muted,strong,stronger,strongest}` 정합 + 필요 색(category 포함) 채움. 기존 컴포넌트 회귀 없이.
- 검증: 토큰 변경 후 Storybook 시각 회귀.

**G5. 고급 DatePicker**
- 범위: `DateRangePicker`, `DateTimePicker`. 기존 `Calendar`/`DatePicker`(react-day-picker) 재사용.

### P2 — 마감·완성도

**G6. 아이콘 확장** — Lucide 커버 확대 + semantic alias 레이어(name 안정성).
**G7. 다크모드 토큰** — `semantic.css`에 `[data-theme=dark]` 오버라이드 계층. light 회귀 없이.
**G8. 데이터표시 보조** — `MetricCard`, `sparkline`, `bar-list`.
**G9. 문서 커버리지** — 미문서 50개 → 컴포넌트 문서 채움(현재 15/65).

---

## 4. 업데이트 플랜 (마일스톤)

| 마일스톤 | 내용 | 산출 |
|---|---|---|
| **M1 (P0)** | G1 DataTable + G2 토큰 파이프라인 | DataTable(+test+story+docs), `build-tokens` 스크립트, 토큰 타입 export |
| **M2 (P1)** | G3 차트 3종 + G4 surface 토큰 + G5 고급 DatePicker | Line/Bar/Donut, surface 계층 완성, DateRange/DateTime Picker |
| **M3 (P2)** | G6~G9 마감 | 아이콘·다크모드·보조 컴포넌트·문서 커버리지 |

> 각 마일스톤 종료 시 `pnpm build` + `pnpm test` + Storybook 시각 검증 통과 필수.

---

## 5. 보완계획 — bite-sized 태스크

> ui-kit 규칙: **신규 컴포넌트 = 5산출물 동시** (tsx + test + index + stories + `<카테고리>/index.ts` export). **이슈 먼저** → 브랜치 `feat/#<번호>` → 커밋 `feat: 한국어 내용 #번호`. TDD(테스트 우선).

**M1 태스크**
- [ ] T1. `@tanstack/react-table` 의존 추가 + `DataTable` 최소 골격(컬럼·행 렌더) — test 포함
- [ ] T2. DataTable 정렬 + 페이지네이션(기존 `Pagination` 재사용) — test
- [ ] T3. DataTable 행 선택 + 빈 상태(`EmptyState`) + 로딩 스켈레톤 — test
- [ ] T4. DataTable stories(기본·정렬·빈·로딩) + docs 페이지
- [ ] T5. `tokens/core.json`·`semantic.json` 소스 정의 (현 CSS 값 그대로 이관)
- [ ] T6. `scripts/build-tokens.ts` — JSON → `core.css`·`semantic.css` 생성 + 기존 CSS diff 0 검증
- [ ] T7. 토큰 TS 타입 export(`tokens.ts`) + `pnpm tokens` 스크립트 + README 갱신

**M2 태스크**
- [ ] T8. 차트 엔진 선정 스파이크(recharts vs 자체 SVG, 번들·tree-shaking 측정)
- [ ] T9. `LineChart` DS 토큰 통합(축·그리드·툴팁) — test + story
- [ ] T10. `BarChart` — test + story
- [ ] T11. `DonutChart` — test + story
- [ ] T12. surface 토큰 계층(`subtle~strongest` + category) 채움 + 시각 회귀
- [ ] T13. `DateRangePicker` — test + story
- [ ] T14. `DateTimePicker` — test + story

**M3 태스크**
- [ ] T15. 다크모드 토큰 계층(`[data-theme=dark]`) + light 회귀 검증
- [ ] T16. `MetricCard`·`sparkline`·`bar-list` — 각 5산출물
- [ ] T17. 아이콘 semantic alias 레이어
- [ ] T18. 미문서 컴포넌트 문서 채움(우선 P0/P1 신규분)

---

## 6. 비고

- **마스킹**: 이 문서는 레퍼런스 DS의 사내 식별자·경로·비즈니스 로직을 포함하지 않는다. 기능 종류·설계 패턴만 참조.
- **코드 복사 금지**: 모든 태스크는 ui-kit 독립 구현. 레퍼런스 DS 소스를 옮기지 않는다.
- **범위 조정**: 차트 12종·아이콘 337개 등 레퍼런스 규모를 그대로 좇지 않는다. 라이브러리 성격에 맞는 핵심만 (Simplicity First).
- **다음 액션**: M1을 위한 GitHub 이슈 세트 생성(상위 Feature + T1~T7 Task) → `feat/#<번호>` 착수.
