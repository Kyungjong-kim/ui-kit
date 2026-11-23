# Overlay — Dialog · Sheet

오버레이 위에 떠서 포커스를 가두는 두 컴포넌트. **Dialog**는 화면 중앙 모달, **Sheet**는 가장자리에서 슬라이드되는 패널. 둘 다 Radix Dialog primitive 기반이며 `title` · `description` · `footer` · `showClose` 구조를 공유한다.

## Import

```ts
import { Dialog, DialogTrigger, Sheet, SheetTrigger } from "ui-kit";
import type { DialogProps, SheetProps } from "ui-kit";
```

트리거 버튼으로 열려면 `trigger` prop 에 요소를 넘긴다(`<Dialog trigger={<Button>열기</Button>}>` — 내부에서 `Trigger asChild` 로 감싼다). `open` 을 넘기지 않으면 비제어로 동작한다. `DialogTrigger` / `SheetTrigger` export 는 래퍼가 Root 를 내부에서 만들어 단독으로는 쓸 수 없다(호환을 위해 남김).

---

## Dialog

화면 중앙 모달.

### Props (`DialogProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `open` | `boolean` | — | 열림 상태(제어형) |
| `onOpenChange` | `(open: boolean) => void` | — | 상태 변경 콜백 |
| `trigger` | `ReactNode` | — | 누르면 여는 요소 (`asChild`, 단일 요소). 넘기면 `open` 없이도 쓸 수 있다 |
| `title` | `string` | — | 제목 (`Dialog.Title`) |
| `description` | `string` | — | 부제 (`Dialog.Description`) |
| `children` | `ReactNode` | — | 본문 |
| `footer` | `ReactNode` | — | 하단 액션 영역(우측 정렬) |
| `maxWidth` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | 최대 너비 |
| `showClose` | `boolean` | `true` | 우상단 × 버튼 표시 |

### 사용

```tsx
const [open, setOpen] = useState(false);

<Dialog
  open={open}
  onOpenChange={setOpen}
  title="삭제하시겠습니까?"
  description="이 작업은 되돌릴 수 없습니다."
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>취소</Button>
      <Button variant="destructive" onClick={handleDelete}>삭제</Button>
    </>
  }
>
  선택한 항목이 영구적으로 제거됩니다.
</Dialog>
```

---

## Sheet

화면 가장자리에서 슬라이드되어 들어오는 패널.

### Props (`SheetProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `open` | `boolean` | — | 열림 상태 |
| `onOpenChange` | `(open: boolean) => void` | — | 상태 변경 콜백 |
| `trigger` | `ReactNode` | — | 누르면 여는 요소 (`asChild`, 단일 요소). 넘기면 `open` 없이도 쓸 수 있다 |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | 등장 방향 |
| `maxWidth` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"sm"` | 너비(좌/우) — `top`·`bottom`에서는 무시 |
| `title` | `string` | — | 제목 |
| `description` | `string` | — | 부제 |
| `children` | `ReactNode` | — | 본문 |
| `footer` | `ReactNode` | — | 하단 액션 영역 |
| `showClose` | `boolean` | `true` | × 버튼 표시 |
| `className` | `string` | — | content에 병합 |

### 사용

```tsx
const [open, setOpen] = useState(false);

<Sheet
  open={open}
  onOpenChange={setOpen}
  side="right"
  maxWidth="md"
  title="필터"
  footer={<Button onClick={() => setOpen(false)}>적용</Button>}
>
  {/* 필터 폼 */}
</Sheet>
```

### side × maxWidth

| side | maxWidth 적용 |
|---|---|
| `left` / `right` | `sm`·`md`·`lg`·`xl`·`full` 적용 |
| `top` / `bottom` | 무시(가로 전체 폭) |

---

## When to use

| 상황 | 컴포넌트 |
|---|---|
| 짧은 확인·결정(삭제 확인 등) | **Dialog** |
| 폼·상세·필터 등 보조 컨텍스트 패널 | **Sheet** |
| 단순 비파괴 알림 | [Toast](../../molecules/feedback/toast.md) |

- 파괴적 확인이라면 footer의 액션 버튼을 `variant="destructive"`로 둔다.
- 본문이 길고 스크롤이 예상되면 Sheet(`side="right"`)가 모달보다 적합하다.

## 접근성

- 두 컴포넌트 모두 Radix Dialog 기반으로 **포커스 트랩·ESC 닫기·배경 스크롤 잠금**이 기본 동작한다.
- `title`을 제공하면 `Dialog.Title`로 접근 가능한 이름이 연결된다. Sheet는 `title` 미제공 시 `sr-only` 제목을 자동 삽입한다.
- × 버튼은 `aria-label="닫기"`를 내장한다.

## 스타일

- Dialog·AlertDialog: 12px(`rounded-md`) + hairline 테두리.
- Sheet 닫기 버튼: `focus-ring`·`rounded-xs`·hover `bg-tertiary`(Dialog 와 동일).
- NavFlyout: 패널 `p-stack-xs`(4px), 항목 `rounded-xxs`·`focus-ring-inset`.
