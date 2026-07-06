# 상세 레이아웃

> 단일 항목의 **읽기 전용** 상세 화면 골격·간격 표준 — 타이틀(+메타) → 탭 → 탭별 정보 카드.

> 전제 — 탭 구성·섹션·라벨↔값 항목은 항목 종류마다 전부 다르다. 이 문서는 **① 공통 골격·간격 ② 라벨↔값 표시 규칙**을 표준화한다. 스켈레톤의 항목은 자리표시자다.

> 상세는 보통 읽기 전용이다. 데이터 로딩·삭제/편집 액션은 화면이 담당한다. 편집은 생성과 같은 폼([form-layout.md](./form-layout.md))을 모달/별 화면으로 띄운다.

> 라이브러리에 전용 "Data Items" 컴포넌트가 없으므로, 라벨↔값 묶음은 `Card` + flex + `Text`로 조립하고 구분은 `Separator`로 한다.

---

## 1. 한눈 골격 + 스택 순서

상세 콘텐츠는 **최대 너비 1136px**(`mx-auto w-full max-w-[1136px]`). 그보다 넓은 화면에선 가운데 정렬한다.

```
컨테이너  (mx-auto · w-full max-w-[1136px] · gap-stack-xxxl · py-stack-xxl)
├─ PageHeader   (title · 편집 버튼 · meta · 우측 액션)
└─ Tabs
   ├─ TabsList            (TabsTrigger ×N)
   └─ TabsContent         (탭별 콘텐츠)
      └─ (섹션 타이틀 ↔ 콘텐츠 gap-stack-lg)
         ├─ 섹션 타이틀                  (Text headline)
         └─ 카드 그룹 (카드 사이 gap-stack-md)
            ├─ 상태 요약 카드            (Card · 헤더[타이틀+배지+액션] + 요약 그리드)
            └─ 정보 카드                 (Card · 라벨↔값 행 묶음, 그룹 사이 Separator)
```

---

## 2. 영역 → 컴포넌트 매핑

| 영역 | 컴포넌트 / 처리 |
|---|---|
| 타이틀 + 메타 + 액션 | `PageHeader` (`title` · `leftTrailingButton`=편집 · `rightTrailingButton`=주 액션 + 더보기). 메타·배지는 `titleElement`/`leftLeadingElement` 슬롯에 조립 |
| 탭 | `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` (간격 규칙은 [list-layout.md](./list-layout.md) §3) |
| 섹션 제목 | `Text variant="typography-headline-sm"` |
| 상태 요약 / 정보 카드 | `Card` (`shadow="sm"`) + `CardHeader` / `CardBody` |
| 요약 항목 (라벨 위/값 아래, 세로형) | flex 컬럼 + `Text`(라벨 12·secondary / 값 14·primary), 다열은 `grid grid-cols-*` |
| 라벨↔값 행 (가로형) | flex 행 + 고정폭 라벨(`w-[120px]`) + 값 |
| 상태 배지 | `Badge` (`variant="success"/"warning"/"danger"/"outline"`) |
| 인라인 안내·강조 박스 | 색 배경 박스 — `bg-[var(--color-bg-warning-subtle)]` 등 + `Text` |
| 썸네일 | `Thumbnail` |
| 복사 버튼 | `IconButton` + `navigator.clipboard` |
| 구분선 | `Separator` |
| 값 없음 | `'-'` |

---

## 3. 간격 토큰

| 구간 | 토큰 |
|---|---|
| 컨테이너 좌우 / 상하 패딩 | `px-inline-xxl` / `py-stack-xxl` |
| PageHeader ↔ 탭 | `gap-stack-xxxl` |
| 탭바 ↔ 콘텐츠 | `Tabs` 루트 `gap-stack-md` |
| 섹션 타이틀 ↔ 콘텐츠 | `gap-stack-lg` |
| 카드 ↔ 카드 | `gap-stack-md` |
| 카드 헤더 ↔ 요약 그리드 | `gap-stack-lg` |
| 요약 그리드 열간 / 행간 | `gap-x-group-lg` / `gap-y-stack-md` |
| 요약 항목 라벨↔값(세로) | `gap-group-xs` |
| 라벨↔값(가로) | `gap-group-sm` |
| 라벨 고정폭(가로형) | `w-[120px]` |

---

## 4. 복붙 스켈레톤

### (a) 전체 골격 + PageHeader

```tsx
import { Badge, Button, Card, CardBody, CardHeader, IconButton, PageHeader, Separator, Tabs, TabsContent, TabsList, TabsTrigger, Text } from "@/components";

function ItemDetailView() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="mx-auto flex w-full max-w-[1136px] flex-col gap-stack-xxxl py-stack-xxl">
      <PageHeader
        isLoading={loading}
        title={detail?.name ?? "-"}
        leftLeadingElement={<Badge variant="success" size="sm">정상</Badge>}
        leftTrailingButton={
          <IconButton icon="pencil" variant="ghost" size="sm" aria-label="편집" onClick={onEdit} />
        }
        rightLeadingButton={<Button variant="secondary" size="md" onClick={onOpen}>열기</Button>}
        rightTrailingButton={<IconButton icon="more-vertical" variant="ghost" size="md" aria-label="더보기" onClick={onMore} />}
      />

      <Tabs value={tab} onValueChange={setTab} className="gap-stack-md">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          {/* …탭은 화면별 */}
        </TabsList>

        <TabsContent value="overview">
          <div className="flex flex-col gap-stack-lg">
            <Text variant="typography-headline-sm" className="text-[var(--color-text-primary)]">기본 정보</Text>
            <div className="flex flex-col gap-stack-md">  {/* 카드 사이 */}
              {/* (b) 상태 요약 카드 + (c) 정보 카드 */}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

> 로드 중에는 `PageHeader isLoading`(타이틀만 스켈레톤), 카드 영역은 `Skeleton`으로 자리표시하고 탭·헤더 액션은 즉시 실제 렌더한다.

### (b) 상태 요약 카드 (세로형 라벨↔값 다열)

```tsx
<Card shadow="sm">
  <CardHeader className="flex items-center justify-between">
    <div className="flex items-center gap-group-sm">
      <Text variant="typography-headline-sm" className="text-[var(--color-text-primary)]">현황</Text>
      <Badge variant="success" size="sm">정상</Badge>
    </div>
    <Button variant="secondary" size="sm" onClick={onAction}>액션</Button>
  </CardHeader>
  <CardBody>
    <div className="grid grid-cols-4 gap-x-group-lg gap-y-stack-md">
      <Field label="담당자" value="홍길동" />
      <Field label="등록일시" value="2026-12-31 23:59" />
      <Field label="항목 수" value="31개" />
      <Field label="공개 범위" value="전체" />
    </div>
  </CardBody>
</Card>

// 세로형 라벨↔값 항목
function Field({ label, value }) {
  return (
    <div className="flex flex-col gap-group-xs">
      <span className="typography-label-sm text-[var(--color-text-secondary)]">{label}</span>
      <span className="typography-body-md-medium text-[var(--color-text-primary)]">{value ?? "-"}</span>
    </div>
  );
}
```

### (c) 정보 카드 (가로형 라벨↔값 행 묶음)

```tsx
<Card shadow="sm">
  <CardBody className="flex flex-col gap-stack-lg">
    <SettingRow label="분류">기본형</SettingRow>
    <SettingRow label="설명">
      요약된 정보를 제공합니다. <span className="typography-body-sm-regular text-[var(--color-text-tertiary)]">(부가 설명)</span>
    </SettingRow>

    <Separator />

    <SettingRow label="옵션 사용"><span className="text-[var(--color-text-tertiary)]">미사용</span></SettingRow>
  </CardBody>
</Card>

// 가로형 라벨↔값 행 (라벨 고정폭 120)
function SettingRow({ label, children }) {
  return (
    <div className="flex gap-group-sm">
      <span className="w-[120px] shrink-0 typography-body-md-regular text-[var(--color-text-secondary)]">{label}</span>
      <span className="flex-1 typography-body-md-medium text-[var(--color-text-primary)]">{children}</span>
    </div>
  );
}
```

---

## 5. 라벨↔값 색 규칙

- **카드** = `Card shadow="sm"`. 그룹 구분은 카드 내부 `Separator`.
- **라벨** = `text-[var(--color-text-secondary)]`. 가로형 라벨 14 / 세로 요약 라벨 12.
- **값** = `text-[var(--color-text-primary)]`, `typography-body-md-medium`.
- **보조 설명·비활성(`미사용` 등)** = `text-[var(--color-text-tertiary)]`. 진짜 없음은 `'-'`.
- 값에 보조 텍스트·링크·`Badge` 등 ReactNode 가능. 긴 값은 셀에 `truncate` 또는 2줄(메인+보조).

---

## 6. 체크리스트

- [ ] 컨테이너 `mx-auto w-full max-w-[1136px] gap-stack-xxxl py-stack-xxl` (최대 1136 캡·가운데 정렬)
- [ ] PageHeader: `title` + 편집 버튼 + 메타 + 우측 액션
- [ ] PageHeader↔탭 `gap-stack-xxxl` / 탭바↔콘텐츠 `gap-stack-md` / 섹션↔콘텐츠 `gap-stack-lg` / 카드↔카드 `gap-stack-md`
- [ ] 라벨↔값은 `Card`+flex/grid로 조립 (세로형 요약 / 가로형 행)
- [ ] 라벨 `text-secondary` · 값 `text-primary` · 비활성 `text-tertiary` · 값 없음 `'-'`
- [ ] 목록형 탭(중첩 표·카드 목록)은 [list-layout.md](./list-layout.md) 골격을 탭 콘텐츠로 재사용

---

## 관련 문서
- [list-layout.md](./list-layout.md) — 목록 화면(탭+테이블 간격 포함)
- [form-layout.md](./form-layout.md) — 생성/편집 폼
- [empty-state.md](./empty-state.md) — 빈 상태
