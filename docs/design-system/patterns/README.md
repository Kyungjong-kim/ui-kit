# 레이아웃 패턴

화면을 조립할 때 쓰는 조합·레이아웃 패턴 모음이다. 개별 컴포넌트(`Button`·`Input`·`Modal` 등)가 "부품"이라면, 이 문서들은 그 부품을 **어떤 순서·간격·골격으로 배치하는지**를 정한다.

> 전제 — 콘텐츠는 화면마다 다르다. 각 패턴이 표준화하는 것은 **① 공통 골격 ② 간격/토큰 규칙 ③ 컴포넌트 선택 메뉴**뿐이다. 스켈레톤 코드의 필드·컬럼·항목은 모두 자리표시자다.

## 패턴 목록

| 패턴 | 언제 쓰나 | 핵심 컴포넌트 |
|---|---|---|
| [폼 레이아웃](./form-layout.md) | 항목을 입력·생성·수정하는 화면/모달 | `PageHeader` · `Input` · `Textarea` · `Select` · `Button` · `Modal` · `Stepper` |
| [목록 레이아웃](./list-layout.md) | 데이터를 표/카드로 나열하고 검색·필터·페이지네이션하는 화면 | `PageHeader` · `Table 조합` · `Pagination` · `EmptyState` · `Tabs` |
| [상세 레이아웃](./detail-layout.md) | 단일 항목의 읽기 전용 정보를 보여주는 화면 | `PageHeader` · `Tabs` · `Card` · `Badge` · `Separator` |
| [빈 상태](./empty-state.md) | 데이터 0건·검색 결과 없음·로드 실패 | `EmptyState` |
| [확인 모달](./confirm-modal.md) | 생성·삭제·이탈 등 차단형 재확인 | `Modal` · `Button` · `Textarea` · `Input` · `Checkbox` |
| [에러 처리](./error-handling.md) | 검증 오류·서버 오류·차단형 확인의 표시 수단 선택 | `Input(error)` · `Toast` · `Modal` · 인라인 안내 블록 |

## 빠른 선택 가이드

- **입력 화면을 만든다** → 필드가 적고 단발 → 모달([폼 레이아웃 §6](./form-layout.md)) / 필드가 많고 단계가 있다 → 풀페이지([폼 레이아웃 §1](./form-layout.md))
- **데이터를 나열한다** → [목록 레이아웃](./list-layout.md). 데이터가 비었거나 실패하면 [빈 상태](./empty-state.md)로 위임.
- **한 항목을 자세히 본다** → [상세 레이아웃](./detail-layout.md). 편집은 [폼 레이아웃](./form-layout.md)을 모달/별 화면으로.
- **사용자에게 되묻는다** → [확인 모달](./confirm-modal.md). 어떤 수단(인라인/토스트/모달)을 쓸지는 [에러 처리](./error-handling.md).

## 공통 규칙 (전 패턴 적용)

- **컴포넌트는 라이브러리 컴포넌트만 사용.** 같은 기능을 새로 만들지 않는다. 라이브러리에 없으면 각 패턴의 조립 스켈레톤대로 기존 컴포넌트를 조합한다.
- **색·간격·타이포는 토큰만.** 컬러는 `[var(--color-text-*)]`·`[var(--color-bg-*)]`·`[var(--color-border-*)]`, 간격은 `gap-stack-*`·`px-inline-*`, 타이포는 `typography-*`. raw hex·rgb·임의 px 금지.
- **비활성은 `disabled` prop.** 조건부 언마운트(`{cond && <Component/>}`)로 컨트롤을 없애지 않는다 — 이벤트 소실·레이아웃 흔들림 방지.
- **데이터 패칭/상태**는 화면(또는 상위 컨테이너)이 담당하고, 레이아웃 컴포넌트에는 결과값(`data`·`loading`·`error`)만 내려준다.
