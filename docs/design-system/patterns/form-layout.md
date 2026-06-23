# 폼 레이아웃

> 입력·생성·수정 화면의 골격·간격 표준. **풀페이지(단계형)** · **모달**(§6) 두 변형.

> 규모 순으로 고른다: **모달**(§6, 필드 적음·단일 단계) < **풀페이지**(§1~5, 단계·섹션 많고 복잡).

> 전제 — 폼의 **필드 구성·개수·순서·섹션 수**는 화면마다 전부 다르다. 이 문서가 표준화하는 것은 **① 공통 골격·간격 ② 필드를 감싸는 래퍼 패턴 ③ 필드 유형별 컴포넌트 메뉴**뿐이다. 스켈레톤의 필드 자리는 모두 `{/* 화면별 필드 */}` 자리표시자다.

> 이 문서는 레이아웃/마크업만 다룬다. 폼 상태·검증·제출 로직은 화면이 담당한다 — 최소 배선: 모달 `open`/`onOpenChange`, 주 액션 `loading={submitting}`, 검증 실패 입력은 `error` + `helperText`.

---

## 1. 한눈 골격 + 스택 순서 (풀페이지)

```
페이지 wrapper (flex flex-col w-full)
├─ 콘텐츠 컬럼 (max-w-[720px] 중앙 · px-inline-xxl · py-stack-xxl)
│  ├─ PageHeader                              (페이지 타이틀)
│  └─ 본문  (가로 2단 · gap-stack-xxxl)
│     ├─ Stepper        (진행 표시 + 클릭 이동, 약 160px)
│     └─ 폼 컨테이너     (flex-1 · 섹션 사이 gap-stack-xxxl)
│        ├─ 폼 섹션 = 섹션 타이틀 + 필드들(gap-stack-xl)
│        ├─ Separator
│        └─ 폼 섹션 …
└─ 하단 액션 바  (sticky bottom-0 · 배경/구분선 풀폭 · 버튼은 720 컬럼 우측 · 취소 / 저장)
```

> **Stepper는 기본적으로 좌측 "진행 표시"** — 폼 섹션은 한 화면에 **전부 펼쳐** 세로로 쌓고(섹션 사이 `Separator`), 하단에서 **취소 / 저장**으로 한 번에 제출한다. 화면을 단계별로 전환하는 건 단계가 많고 단계별 검증이 필요한 **진짜 마법사형일 때만**(§4-(a-2)).
> 단계가 없는 단순 폼이면 Stepper 단을 빼고 폼 컨테이너만 둔다.
>
> 하단 바를 `sticky bottom-0`로 둘 때: 바깥 컨테이너가 풀폭 배경·`border-t`를 깔고, 안쪽 `max-w-[720px] mx-auto` 한 겹을 더 둬 버튼을 폼 컬럼과 같은 라인에 우측 정렬한다(바를 720 컬럼 안에 두면 폭이 좁아짐).

---

## 2. 필드 유형별 컴포넌트 메뉴

화면마다 다른 필드는 **유형에 맞는 컴포넌트를 골라 끼운다**:

| 입력 유형 | 컴포넌트 |
|---|---|
| 한 줄 텍스트 | `Input` |
| 숫자 | `Input` (`type="number"`) |
| 여러 줄 텍스트 | `Textarea` |
| 단일 선택(드롭다운) | `Select` (`options`) |
| 검색형 단일 선택 | `Combobox` |
| 단일 택1(2~3개 토글) | `RadioGroup` |
| 불리언 on/off | `Switch` |
| 다중 동의·옵션 | `Checkbox` |
| 날짜 | `DatePicker` |
| 파일/이미지 업로드 | `FileUpload` |

**구조 래퍼는 라이브러리에 없으므로 수동 조합**한다(아래 §4 스켈레톤 복붙):

| 요소 | 처리 |
|---|---|
| 페이지 타이틀 | `PageHeader` |
| 폼 섹션 / 폼 필드 | flex 컨테이너 + `Text`(섹션 타이틀) + 필드 수동 조합 |
| 구분선 | `Separator` |

---

## 3. 간격 토큰

### 세로 리듬

| 구간 | 토큰 |
|---|---|
| 콘텐츠 폭 | `max-w-[720px]` 중앙 |
| 컨테이너 좌우 / 상하 패딩 | `px-inline-xxl` / `py-stack-xxl` |
| 타이틀 ↔ 본문 | `gap-stack-xxxl` |
| Stepper ↔ 폼 | `gap-stack-xxxl` |
| 섹션 ↔ 구분선 ↔ 섹션 | `gap-stack-xxxl` |
| 섹션 타이틀 ↔ 첫 필드 | `gap-stack-xl` |
| 필드 ↔ 필드 | `gap-stack-xl` |
| 라벨 ↔ 입력(컨트롤) | `gap-group-xs` |

### 가로 배치 (나란히)

| 대상 | 토큰 |
|---|---|
| 2-up 필드 / 라디오 옵션 | `gap-group-lg` |

### 하단 sticky 액션 바

| 구간 | 토큰 |
|---|---|
| 상하 / 좌우 패딩 | `py-stack-md` / `px-inline-xxl` |

> `Input`/`Textarea`는 라벨↔컨트롤 간격(`gap-group-xs`)을 내부에서 처리하므로 `label` prop을 쓰면 별도 래퍼가 필요 없다. 라벨을 커스텀하거나 필수 표시(`*`)가 필요할 때만 외부 라벨 + 컨트롤(label 생략)로 조합한다.

---

## 4. 복붙 스켈레톤

### (a) 전체 페이지

```tsx
import { Button, Input, PageHeader, Separator, Stepper, Text, Textarea } from "@/components";

const STEPS = ["기본 정보", "옵션 설정"];

function ItemCreateView() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="flex flex-col w-full">
      {/* 콘텐츠 컬럼 — 720 중앙 */}
      <div className="flex flex-col gap-stack-xxxl w-full max-w-[720px] mx-auto px-inline-xxl py-stack-xxl">
        <PageHeader title="항목 생성" />

        <div className="flex gap-stack-xxxl">
          {/* 좌: Stepper — 진행 표시. 단계 없으면 블록 제거 */}
          <div className="sticky top-stack-xxl self-start w-[160px] shrink-0">
            <Stepper
              steps={STEPS}
              activeStep={activeStep}
              onNext={() => setActiveStep((i) => i + 1)}
              onPrev={() => setActiveStep((i) => i - 1)}
            />
          </div>

          {/* 우: 폼 컨테이너 — 섹션 전부 펼침 */}
          <div className="flex flex-1 flex-col gap-stack-xxxl">
            <section className="flex flex-col gap-stack-xl">
              <Text variant="typography-headline-sm" className="text-[var(--color-text-primary)]">
                기본 정보
              </Text>
              {/* 화면별 필드 — (c)~(d) 패턴으로 채움 */}
            </section>

            <Separator />

            {/* 다음 섹션 … (화면별로 개수·구성 다름) */}
          </div>
        </div>
      </div>

      {/* 하단 액션 바 — sticky. 배경/구분선은 콘텐츠 전체 너비, 버튼은 720 컬럼 우측 정렬 */}
      <div className="sticky bottom-0 z-10 border-t border-[var(--color-border-default)] bg-[var(--color-bg-primary)]">
        <div className="flex w-full max-w-[720px] mx-auto justify-end gap-group-sm px-inline-xxl py-stack-md">
          <Button variant="secondary" size="lg" onClick={onCancel}>취소</Button>
          <Button variant="primary" size="lg" disabled={!isComplete} loading={submitting} onClick={onSubmit}>저장</Button>
        </div>
      </div>
    </div>
  );
}
```

> 위가 **기본형**: 섹션을 전부 펼치고(Stepper는 진행 표시) 하단 **풀폭 sticky 액션 바**로 한 번에 제출.
> - 바깥 `flex flex-col w-full` → 콘텐츠 컬럼(720)과 sticky 바를 **형제로** 둬 바가 720에 갇히지 않게 한다.
> - 데이터 fetch로 폼 바디가 로드 중이면 `Skeleton`으로 라벨+컨트롤 쌍을 자리표시하고, 헤더·스텝퍼·푸터는 즉시 실제 렌더한다.

### (a-2) (예외) 진짜 마법사형 — 스텝 전환

이전/다음으로 **화면을 단계별 전환**하는 건 **단계가 많고 단계별 검증이 필요할 때만**. 기본 폼(위 (a))은 전부 펼치므로 이 블록을 쓰지 않는다.

```tsx
const [currentIndex, setCurrentIndex] = useState(0);
const isLastStep = currentIndex === STEPS.length - 1;

{currentIndex === 0 && <BasicInfoSection />}
{currentIndex === 1 && <OptionSection />}

// 하단 액션 바
<Button variant="secondary" size="lg" onClick={() => (currentIndex === 0 ? onCancel() : setCurrentIndex((i) => i - 1))}>
  {currentIndex === 0 ? "취소" : "이전"}
</Button>
<Button variant="primary" size="lg" loading={submitting}
  onClick={() => (isLastStep ? onSubmit() : setCurrentIndex((i) => i + 1))}>
  {isLastStep ? "저장" : "다음"}
</Button>
```

### (b) 폼 섹션 = 타이틀 + 필드들

```tsx
<section className="flex flex-col gap-stack-xl">
  <Text variant="typography-headline-sm" className="text-[var(--color-text-primary)]">기본 정보</Text>
  {/* 화면별 필드 */}
</section>
```

### (c) 폼 필드 = 라벨 + 입력

```tsx
{/* 방법 1 — 입력 자체 label prop (단순할 때) */}
<Input label="이름" placeholder="이름 입력" value={name} onChange={(e) => setName(e.target.value)} />

{/* 방법 2 — 외부 라벨(필수 표시·커스텀 필요할 때): 라벨 + 컨트롤을 gap-group-xs로 묶음 */}
<div className="flex flex-col gap-group-xs">
  <label className="typography-label-md-medium text-[var(--color-text-primary)]">
    이름 <span className="text-[var(--color-text-danger-default)]">*</span>
  </label>
  <Input placeholder="이름 입력" value={name} onChange={(e) => setName(e.target.value)}
    error={touched && !name.trim()} helperText={touched && !name.trim() ? "이름을 입력해 주세요." : undefined} />
</div>
```

### (d) 단일 선택 / 토글

```tsx
<Select
  label="분류"
  placeholder="분류 선택"
  value={category}
  onValueChange={setCategory}
  options={[
    { value: "a", label: "분류 A" },
    { value: "b", label: "분류 B" },
  ]}
/>
```

### (e) 하단 액션 바 (sticky 풀폭)

콘텐츠를 전부 펼치는 기본형의 표준 바. **배경/구분선은 콘텐츠 전체 너비, 버튼은 720 컬럼 우측 정렬** 2겹 구조.

```tsx
<div className="sticky bottom-0 z-10 border-t border-[var(--color-border-default)] bg-[var(--color-bg-primary)]">
  <div className="flex w-full max-w-[720px] mx-auto justify-end gap-group-sm px-inline-xxl py-stack-md">
    <Button variant="secondary" size="lg" onClick={onCancel}>취소</Button>
    <Button variant="primary" size="lg" disabled={!isComplete} loading={submitting} onClick={onSubmit}>저장</Button>
  </div>
</div>
```

- **취소**: `secondary` 좌측. 입력 변경 후 이탈이면 확인 모달([confirm-modal.md](./confirm-modal.md))로 가드.
- **저장**: `primary` 우측. 필수 입력이 다 차기 전엔 `disabled`, 제출 중엔 `loading={submitting}`.
- 활성화 게이팅 예: `const isComplete = name.trim() !== "" && category !== "";`. 빈 필수 필드 인라인 에러는 `onBlur`로 `touched` 표시 후 `error` + `helperText`.

---

## 5. 체크리스트 (풀페이지)

- [ ] 바깥 `flex flex-col w-full` + 콘텐츠 컬럼 `max-w-[720px]` 중앙 + `px-inline-xxl py-stack-xxl`
- [ ] 스택 순서 `PageHeader` → (Stepper + 폼) → 하단 sticky 액션 바
- [ ] 타이틀↔본문·Stepper↔폼·섹션↔구분선↔섹션 `gap-stack-xxxl` / 섹션타이틀↔필드·필드↔필드 `gap-stack-xl` / 라벨↔입력 `gap-group-xs`
- [ ] 섹션 사이 `Separator`로 구분
- [ ] 필수 입력은 외부 라벨 `*` 또는 검증 시 `error` + `helperText`
- [ ] 필드는 유형에 맞는 컴포넌트 재사용(§2 메뉴) — 재구현 금지
- [ ] sticky 하단 바: 풀폭 배경/버튼 720 정렬, 주 액션 `variant="primary"`·필수 충족 전 `disabled`·제출 중 `loading`

---

## 6. 생성 모달

단순 입력(필드 적음·단일 단계)은 풀페이지 대신 **모달**로. **헤더·푸터·패딩·스크롤은 `Modal`이 처리**하므로 직접 만들지 않는다 — 호출부는 `title`·`content`·`primaryAction`·`secondaryAction`만 넘긴다.

```
Modal
├─ 헤더    = title
├─ 본문    = content 슬롯 — 폼 필드 스택(gap-group-lg). 길면 Modal이 자동 스크롤
└─ 푸터    = secondaryAction(취소) / primaryAction(저장)
```

필드는 **§2 메뉴를 그대로 재사용**한다. 인라인 안내는 §에러 처리 문서의 안내 블록, 구분은 `Separator`.

### 복붙 스켈레톤

```tsx
<Modal
  open={open}
  onOpenChange={setOpen}
  title="항목 생성"
  content={
    <div className="flex flex-col gap-group-lg">
      {/* 화면별 필드 — §2 메뉴에서 골라 끼움 */}
      <Input label="이름" placeholder="이름 입력" value={name} onChange={(e) => setName(e.target.value)} />
      <Textarea label="설명" placeholder="설명 입력" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <Select label="분류" placeholder="분류 선택" value={category} onValueChange={setCategory}
        options={[{ value: "a", label: "분류 A" }, { value: "b", label: "분류 B" }]} />
    </div>
  }
  secondaryAction={<Button variant="secondary" size="md" onClick={onCancel}>취소</Button>}
  primaryAction={<Button variant="primary" size="md" disabled={!isComplete} loading={submitting} onClick={onSubmit}>저장</Button>}
/>
```

### 체크리스트 (모달)

- [ ] 헤더·푸터는 `Modal` props(`title`/`primaryAction`/`secondaryAction`)로 — 직접 div 금지
- [ ] 본문 필드 `flex flex-col gap-group-lg`
- [ ] 푸터 버튼 `size="md"`(풀페이지 액션 바만 `size="lg"`)
- [ ] 검증 실패 입력 `error` + `helperText`
- [ ] 주 액션 `variant="primary"` 우측, 제출 중 `loading`

---

## 관련 문서
- [list-layout.md](./list-layout.md) — 목록 화면
- [confirm-modal.md](./confirm-modal.md) — 확인/저장 재확인 모달
- [error-handling.md](./error-handling.md) — 폼 검증·에러 처리
