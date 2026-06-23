# Overlay — Dialog · Sheet

오버레이 위에 떠서 포커스를 가두는 두 컴포넌트. **Dialog**는 화면 중앙 모달, **Sheet**는 가장자리에서 슬라이드되는 패널. 둘 다 Radix Dialog primitive 기반이며 `title` · `description` · `footer` · `showClose` 구조를 공유한다.

## Import

```ts
import { Dialog, DialogTrigger, Sheet, SheetTrigger } from "ui-kit";
import type { DialogProps, SheetProps } from "ui-kit";
```

`DialogTrigger` / `SheetTrigger`는 Radix `Dialog.Trigger`를 re-export한 것으로, `open`을 직접 제어하지 않을 때 트리거로 쓴다.

---

## Dialog

화면 중앙 모달.

### Props (`DialogProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `open` | `boolean` | — | 열림 상태(제어형) |
| `onOpenChange` | `(open: boolean) => void` | — | 상태 변경 콜백 |
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
| 단순 비파괴 알림 | [Toast](./toast.md) |

- 파괴적 확인이라면 footer의 액션 버튼을 `variant="destructive"`로 둔다.
- 본문이 길고 스크롤이 예상되면 Sheet(`side="right"`)가 모달보다 적합하다.

## 접근성

- 두 컴포넌트 모두 Radix Dialog 기반으로 **포커스 트랩·ESC 닫기·배경 스크롤 잠금**이 기본 동작한다.
- `title`을 제공하면 `Dialog.Title`로 접근 가능한 이름이 연결된다. Sheet는 `title` 미제공 시 `sr-only` 제목을 자동 삽입한다.
- × 버튼은 `aria-label="닫기"`를 내장한다.
