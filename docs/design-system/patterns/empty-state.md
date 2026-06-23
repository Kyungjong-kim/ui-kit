# 빈 상태

> 목록·콘텐츠 영역에 표시할 데이터가 없거나 로드에 실패했을 때의 3-상태 규칙.

---

## 1. 컴포넌트

`EmptyState` — 일러스트(선택) + 타이틀 + 보조설명(선택) + 액션 버튼(최대 2개).

주요 props:

| prop | 설명 |
|---|---|
| `illustSrc` / `illustAlt` | 일러스트 이미지(선택) |
| `title` | 타이틀 (상태별 문구 — 아래 §2) |
| `description` | 보조설명 (noData는 생략, 그 외는 포함) |
| `primaryAction` | `{ label, onClick }` — 주 버튼 |
| `tertiaryAction` | `{ label, onClick }` — 2-button 시 좌측 보조 버튼 |

> 버튼 스타일은 `EmptyState`가 내부에서 일관 적용한다. 호출부는 `label`·`onClick`만 넘긴다.

> 목록에서는 컨테이너가 상태를 분기해 `EmptyState`를 골라 렌더한다(아래 §3).

---

## 2. 목록 3-상태 스펙

세 상태 모두 **검색·필터·생성 버튼(목록 컨트롤)은 활성** 유지, **페이지네이션 미노출**.

### ① noData — 데이터 0건
- **진입:** 목록 내 항목이 0개
- **구성:** 타이틀 "아직 {리소스}이/가 없습니다." + (필요 시) 생성 버튼
- **보조설명 없음**(title-only) — noData는 `description` 금지(컨벤션)
- **타이틀 범위:** 화면/테이블 단위는 타이틀 사용 O, 하위 컴포넌트(박스·드롭다운 등)는 타이틀 없이 본문 텍스트로

### ② noResult — 검색/필터 결과 없음
- **진입:** 설정한 검색어·필터 결과가 0건
- **검색 + 필터 제공:**
  - 타이틀 "조건에 맞는 {리소스}가 없습니다"
  - `description` "검색어 또는 필터를 조정해 보세요."
  - **초기화 버튼**
- **검색만 제공:**
  - 타이틀 "검색 결과가 없습니다"
  - `description` "검색어를 조정해 보세요."
- **초기화 버튼:** 클릭 시 모든 목록 컨트롤 초기화 후 재조회 — 검색어 비움 + 필터 '전체' + 페이지 1

### ③ error — 목록 로드 실패
- **진입:** 시스템/네트워크 오류로 목록 조회 실패
- **구성:** 타이틀 "목록을 불러올 수 없습니다." + `description` "다시 시도해 주세요." + **다시 시도 버튼**
- **다시 시도:** 현재 검색/필터 조건을 유지한 채 목록 재요청

> 정리: **noData = 타이틀만**, **noResult·error = 보조설명 포함**.

---

## 3. 목록 연동 (구현)

컨테이너가 **단일 우선순위로 분기**한다: **error → isEmpty(noResult/noData) → data**. (로딩은 스켈레톤으로 별도 처리)

```tsx
{hasError ? (
  <EmptyState
    illustSrc={errorIllust}
    title="목록을 불러올 수 없습니다."
    description="다시 시도해 주세요."
    primaryAction={{ label: "다시 시도", onClick: handleRetry }}   // ③ error — 현재 조건 유지 재요청
  />
) : isEmpty ? (
  isFiltering ? (
    <EmptyState
      illustSrc={noResultIllust}
      title="조건에 맞는 항목이 없습니다"
      description="검색어 또는 필터를 조정해 보세요."
      primaryAction={{ label: "초기화", onClick: handleReset }}   // ② noResult
    />
  ) : (
    <EmptyState
      illustSrc={noDataIllust}
      title="아직 항목이 없습니다"
      primaryAction={{ label: "항목 생성", onClick: openCreate }} // ① noData — description 없음
    />
  )
) : (
  <ItemTable rows={list} />
)}
```

- **noResult 초기화**: 목록 컨트롤의 초기화 버튼과 **동일한 `handleReset`을 공유**한다.
- **error 다시 시도**: 현재 검색/필터 조건을 유지한 채 재요청.

---

## 4. 주의

- 권한 없음 등 도메인 특수 빈 상태는 해당 화면 규칙에 따른다.
- 문구는 하드코딩 대신 i18n/상수로 주입한다(번역체 금지).

---

## 관련 문서
- [list-layout.md](./list-layout.md) — 목록 화면 골격
- [error-handling.md](./error-handling.md) — 에러 표시 수단 선택
