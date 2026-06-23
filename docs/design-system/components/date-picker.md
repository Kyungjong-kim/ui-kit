# DatePicker

단일 날짜 선택기. 트리거 버튼을 누르면 Popover 안의 Calendar가 열린다. 제어형(`open`)·비제어형 모두 지원하고 min/max 범위 제한과 표시 포맷 커스터마이즈가 가능하다.

## Import

```ts
import { DatePicker } from "ui-kit";
import type { DatePickerProps } from "ui-kit";
```

## Props (`DatePickerProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `value` | `Date` | — | 선택된 날짜 |
| `onChange` | `(date: Date \| undefined) => void` | — | 선택 변경 콜백 |
| `open` | `boolean` | — | Popover 열림 상태(제어형). 미지정 시 내부 상태 사용 |
| `onOpenChange` | `(open: boolean) => void` | — | 열림 변경 콜백 |
| `minDate` | `Date` | — | 선택 가능 최소 날짜 |
| `maxDate` | `Date` | — | 선택 가능 최대 날짜 |
| `disabled` | `boolean` | — | 트리거 비활성 |
| `formatDate` | `(date: Date) => string` | `YYYY.MM.DD` | 트리거 표시 포맷 |
| `placeholder` | `string` | `"날짜 선택"` | 미선택 시 표시 |
| `className` | `string` | — | PopoverContent에 병합 |
| `triggerClassName` | `string` | — | 트리거 버튼에 병합 |

## 기본 사용

```tsx
const [date, setDate] = useState<Date>();

<DatePicker value={date} onChange={setDate} />

{/* 범위 제한 + 커스텀 포맷 */}
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date()}
  formatDate={(d) => d.toLocaleDateString("ko-KR")}
/>

{/* 열림 상태 제어 */}
<DatePicker
  value={date}
  onChange={setDate}
  open={open}
  onOpenChange={setOpen}
/>
```

## 동작 노트

- 날짜를 선택하면 `onChange` 호출 후 Popover가 자동으로 닫힌다.
- `minDate`/`maxDate`는 일(day) 경계 기준으로 비교되어, 범위 밖 날짜는 캘린더에서 비활성화된다.
- `open`을 주지 않으면 내부 상태로 열림/닫힘을 관리한다(비제어형).

## When to use

- 단일 날짜 입력(생성일·마감일 등).
- 시작–종료 같은 기간 선택은 이 단일 선택기 두 개를 조합하거나 별도 range 패턴을 쓴다.
- 연/월만 필요한 경우 등 정밀도가 다르면 캘린더를 그 용도에 맞게 구성한다.

## 접근성

- 트리거는 `<button type="button">`이며 비활성 시 `disabled` + disabled 텍스트 토큰이 적용된다.
- 열림 상태에 따라 트리거의 셰브론 아이콘 방향이 바뀐다.
- 캘린더·Popover의 키보드 내비게이션은 하위 Calendar/Popover primitive를 따른다.
- 트리거가 날짜만 표시하는 경우, 맥락이 부족하면 외부 라벨이나 `triggerClassName`과 함께 `aria-label`을 부여한다(표준 button 속성 전달 가능).
