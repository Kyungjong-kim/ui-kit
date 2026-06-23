# 목록 레이아웃

> 데이터를 표/카드로 나열하고 검색·필터·페이지네이션하는 화면의 **스택 순서·간격·로딩** 표준.

> 전제 — 컬럼 구성·필터는 화면마다 다르다. 이 문서는 **골격·간격·로딩/페이지네이션 배선**을 표준화한다. 컬럼·필터만 화면에 맞게 교체한다.

> 라이브러리에 전용 `DataTable`이 없으면 시맨틱 `<table>` + 라이브러리 컴포넌트(`Badge`·`Text` 등)를 셀에 조합한다. 페이지네이션은 `Pagination`, 빈/실패 상태는 `EmptyState`로 위임한다.

---

## 1. 한눈 골격 + 스택 순서

모든 목록 화면은 **위→아래 동일 순서**로 쌓는다.

```
컨테이너  (gap-stack-xxxl · px-inline-xxl · py-stack-xxl)
├─ PageHeader                       (타이틀 · 우측 액션)
└─ 리스트 블록  (gap-stack-md)
   ├─ 컨트롤 바                       (필터 좌 / 액션 우)
   └─ 테이블 블록  (gap-stack-md)
      ├─ 테이블 (또는 EmptyState)
      └─ Pagination                 ({!isEmpty && …})
```

### 복붙 스켈레톤 (전체)

```tsx
import { Badge, Button, EmptyState, Input, PageHeader, Pagination, Select, Text } from "@/components";

function ItemListView() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const isEmpty = list.length === 0;            // !loading 넣지 말 것
  const isFiltering = search !== "" || status !== "";
  const handleReset = () => { setSearch(""); setStatus(""); setPage(1); refetch({ search: "", status: "", page: 1 }); };

  return (
    <div className="flex flex-col gap-stack-xxxl w-full px-inline-xxl py-stack-xxl">
      <PageHeader
        title="항목 목록"
        rightTrailingButton={<Button variant="primary" size="md" onClick={openCreate}>생성</Button>}
      />

      {/* 리스트 블록 */}
      <div className="flex flex-col gap-stack-md">
        {/* 컨트롤 바 — 필터 좌 / 액션 우 */}
        <div className="flex items-center justify-between gap-group-md">
          <div className="flex items-center gap-group-sm">
            <Input placeholder="검색어 입력" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Select placeholder="상태" value={status} onValueChange={setStatus}
              options={[{ value: "active", label: "정상" }, { value: "stopped", label: "중지" }]} />
            {isFiltering && <Button variant="ghost" size="md" onClick={handleReset}>초기화</Button>}
          </div>
        </div>

        {/* 테이블 블록 */}
        <div className="flex flex-col gap-stack-md">
          {hasError ? (
            <EmptyState
              illustSrc={errorIllust}
              title="목록을 불러올 수 없습니다."
              description="다시 시도해 주세요."
              primaryAction={{ label: "다시 시도", onClick: handleRetry }}
            />
          ) : isEmpty ? (
            isFiltering ? (
              <EmptyState
                illustSrc={noResultIllust}
                title="조건에 맞는 항목이 없습니다"
                description="검색어 또는 필터를 조정해 보세요."
                primaryAction={{ label: "초기화", onClick: handleReset }}
              />
            ) : (
              <EmptyState
                illustSrc={noDataIllust}
                title="아직 항목이 없습니다"
                primaryAction={{ label: "항목 생성", onClick: openCreate }}
              />
            )
          ) : (
            <ItemTable rows={list} loading={loading} onRowClick={(id) => goDetail(id)} />
          )}

          {!isEmpty && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </div>
      </div>
    </div>
  );
}
```

> 데이터·로딩·정렬·페이지 상태는 화면(또는 상위 컨테이너)이 관리하고, 테이블에는 결과값만 내려준다.

### 테이블 셀 조합 예 (전용 DataTable 부재 시)

```tsx
function ItemTable({ rows, loading, onRowClick }) {
  if (loading) return <Skeleton className="h-[320px] w-full rounded-md" />;
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-[var(--color-border-default)]">
          <th className="px-inline-md py-stack-sm text-left typography-label-sm-medium text-[var(--color-text-secondary)]">이름</th>
          <th className="px-inline-md py-stack-sm text-left typography-label-sm-medium text-[var(--color-text-secondary)]">상태</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}
            className="border-b border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-secondary)] cursor-pointer"
            onClick={() => onRowClick(row.id)}>
            <td className="px-inline-md py-stack-md typography-body-md-regular text-[var(--color-text-primary)] truncate">{row.name}</td>
            <td className="px-inline-md py-stack-md">
              <Badge variant={row.online ? "success" : "outline"} size="md">{row.online ? "정상" : "중지"}</Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## 2. 간격 토큰

| 구간 | 토큰 |
|---|---|
| 컨테이너 좌우 패딩 | `px-inline-xxl` |
| 컨테이너 상/하 패딩 | `py-stack-xxl` |
| **PageHeader → 본문(리스트/탭)** | `gap-stack-xxxl` |
| **컨트롤 ↔ 테이블** | `gap-stack-md` |

> 왜: PageHeader와 본문은 `gap-stack-xxxl`로 **크게** 띄워 구획을 나누고, 본문 내부 컨트롤↔테이블은 `gap-stack-md`로 **촘촘하게** 묶는다.

---

## 3. 탭이 있는 화면

`Tabs` 루트 기본 gap과 별개로, 탭→콘텐츠 간격을 `gap-stack-md`로 통일하고 `TabsContent`에 `mt-*`를 주지 않는다.

```tsx
<Tabs value={tab} onValueChange={setTab} className="gap-stack-md">
  <TabsList>                          {/* flush — 수평 패딩 0 */}
    <TabsTrigger value="a">A</TabsTrigger>
    <TabsTrigger value="b">B</TabsTrigger>
  </TabsList>

  <TabsContent value="a">             {/* mt-* 금지 — Tabs gap이 간격 담당 */}
    {/* 리스트 블록 (§1 골격) */}
  </TabsContent>
</Tabs>
```

- 탭→콘텐츠 간격은 `Tabs` 루트 `gap-stack-md` **하나로** 잡는다. `TabsContent`에 `mt-*` 병용 시 간격이 이중으로 어긋난다.
- `TabsList`는 flush(수평 패딩 0)로 두어 본문과 좌측 정렬을 맞춘다.

---

## 4. 로딩·페이지네이션

페이지 이동 시 높이 축소·페이지네이션 깜빡임을 막기 위한 표준:

| 항목 | 규칙 |
|---|---|
| 로딩 자리표시 | `Skeleton`을 테이블 높이만큼(`h-[...]`) 둬 높이 유지 |
| `isEmpty` 정의 | `list.length === 0` **만**. `!loading &&` 포함 금지 |
| 페이지네이션 가드 | `{!isEmpty && <Pagination ... />}` — `!loading` 가드 쓰지 말 것 |

- **초기 진입(빈 목록 + 로딩)**: `isEmpty=true` → 페이지네이션 숨김, 스켈레톤만.
- **페이지 이동(기존 목록 유지 + 로딩)**: `isEmpty=false` → 페이지네이션·높이 유지.

---

## 5. 체크리스트

- [ ] 컨테이너 `gap-stack-xxxl px-inline-xxl py-stack-xxl`
- [ ] 스택 순서 `PageHeader` → 컨트롤 바 → 테이블 → `Pagination`
- [ ] PageHeader → 본문 `gap-stack-xxxl` / 컨트롤 ↔ 테이블 `gap-stack-md`
- [ ] 탭 사용 시 `Tabs className="gap-stack-md"` + `TabsContent`에 `mt-*` 없음, `TabsList` flush
- [ ] 빈/실패 상태는 `EmptyState`로 위임 (분기는 [empty-state.md](./empty-state.md))
- [ ] `isEmpty = list.length === 0` · 페이지네이션 `{!isEmpty && (…)}`
- [ ] 긴 텍스트 셀 `truncate`

---

## 관련 문서
- [empty-state.md](./empty-state.md) — 빈 상태
- [detail-layout.md](./detail-layout.md) — 상세 화면(탭+테이블 간격 포함)
- [form-layout.md](./form-layout.md) — 생성/편집 폼
