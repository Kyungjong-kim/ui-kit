# @kyungjong-kim/ui-kit

## 0.2.0

### Minor Changes

- dacc02a: `Dialog`·`AlertDialog`·`Sheet` 에 `trigger` prop 을 추가했다. 넘긴 요소를 누르면 열리고, `open` 을 주지 않으면 비제어로 동작한다. 기존 `*Trigger` export 는 래퍼 밖에서 쓸 수 없어(Radix context 없음) 이 prop 이 트리거를 붙이는 방법이다.
- 8673d62: 컴포넌트 기본 문구 로케일을 추가했다. `UiKitLocaleProvider`(`locale: "ko" | "en"`, `messages` 부분 덮어쓰기)와 `useUiKitMessages()`, 사전 `ko`·`en` 을 export 한다. Provider 가 없으면 한국어(`ko`)다. 컴포넌트에 직접 넘긴 prop 은 그대로 우선한다.

  **동작 변경**: 영어로만 박혀 있던 MultiSelect(`Select` · `Search` · `No results found.` · `Select all` · `Clear all` 등)와 TagInput(placeholder · 오류 문구)의 기본값이 한국어 사전으로 바뀐다. 영어가 필요하면 `<UiKitLocaleProvider locale="en">` 으로 감싼다. PeriodFilterDropdown 트리거 요약도 이제 `presetLabels` 를 따른다.

### Patch Changes

- 6d69f0c: `Combobox`·`SearchableSelect` 에서 키보드로 옮긴 활성 옵션이 목록 밖에 있으면 따라 스크롤한다.
- c626aa3: `Avatar` 이미지가 로드에 실패하면 빈 원 대신 `fallback` 을 보여 준다. 실패한 뒤 `src` 가 바뀌면 새 이미지를 다시 보여 준다(이전에는 계속 숨김).
- 6d92c45: `Button asChild` 가 렌더 중 예외(`React.Children.only`)로 죽던 문제를 고쳤다. 이제 자식 요소(링크 등)가 버튼 스타일을 받고, `loading` 이면 Spinner 가 그 안에 들어간다.

  `asChild` 이면서 `disabled`·`loading` 이면 자식 요소에 `aria-disabled="true"` 를 붙이고 클릭(링크 이동)을 막는다. 링크에는 `disabled` 속성이 통하지 않기 때문이다.

- 120da51: `Calendar` 이전·다음 달 버튼에 접근 가능한 이름(사전 `date.previousMonth`·`nextMonth`)을 붙였다. `captionLayout="dropdown"` 이면 커스텀 캡션 대신 react-day-picker 의 연·월 드롭다운을 보여 준다(전에는 무시됐다).
- 43b4e5e: `Calendar` 가 다시 렌더될 때마다 날짜 트리 전체를 재마운트하던 문제를 고쳤다(react-day-picker 에 렌더마다 새 컴포넌트 함수를 넘기던 탓). hover·전환이 초기화되지 않는다.
- 5f8999b: 제목 없이 연 `Dialog`·`Sheet` 에 숨김 제목(사전 `navigation.dialog` — 대화상자/Dialog)을 넣어 스크린리더 이름을 주고 Radix 접근성 경고를 없앴다. Sheet 의 영문 폴백 `"Sheet"` 도 사전으로 바꿨다.
- 788ec22: `DndList` 가 서버 렌더와 클라이언트 렌더에서 다른 접근성 id(`DndDescribedBy-N`)를 만들어 하이드레이션 경고가 날 수 있던 문제를 고쳤다(`DndContext` 에 `useId`).
- 62b56aa: `FileUpload` 에 누적 파일이 `maxFiles` 를 넘으면 잘라 낸 뒤 「파일 개수 초과」를 표시한다. 전에는 알림 없이 잘렸다.
- 0f5db4b: 키보드 초점 표시를 `focus-ring` 유틸 하나로 통일했다(초점 색 2px 선 + 2px 띄움, outline 방식이라 고대비 모드에서도 보임). 스크롤 목록·메뉴 항목은 `focus-ring-inset`. 초점 표시가 아예 없던 Accordion 트리거 · TreeTable 펼침 버튼 · Calendar 날짜·이동 버튼(인라인 `outline: none` 제거) · DatePicker 계열 트리거 · MonthPicker · MultiSelect 옵션 · Alert 닫기 · TagInput 전체 삭제 · DnDList 손잡이 등에 초점 표시를 넣었다.

  `prefers-reduced-motion: reduce` 규칙을 옵트인 CSS 로 추가했다: `@import "@kyungjong-kim/ui-kit/reduced-motion";`. 사용자가 OS 에서 동작 줄이기를 켜면 앱 전체의 전환·애니메이션이 사실상 꺼진다(스피너·indeterminate 진행바도 멈춤). 전역 규칙이라 theme 에는 넣지 않았다.

- a0cb508: 입력 컴포넌트의 안내·오류 문구를 스크린리더가 읽도록 연결했다. `helperText` 는 컨트롤의 `aria-describedby` 로, `error` 는 `aria-invalid` 로 자동 연결된다(Input · Textarea · Checkbox · Switch · RadioGroup · Select · Combobox · SearchableSelect · MultiSelect · Slider · SliderField). RadioGroup 의 그룹 `label` 은 `aria-labelledby` 로 이어진다. SliderField 의 thumb 에 이름이 빠져 있던 문제(전달한 `aria-label` 이 버려짐)도 고쳤다.
- ca57e33: `Combobox`·`SearchableSelect` 검색창에서 한글 조합을 확정하는 Enter 가 옵션 선택으로 처리돼 목록이 닫히던 문제를 고쳤다(`TagInput` 과 같은 기준).
- 4fc0062: `Progress` 의 `value` 가 `max` 를 넘거나 음수일 때 화면과 같게 범위로 잘라 `aria-valuenow` 를 유지한다(전에는 indeterminate 로 바뀌고 콘솔 오류). `label` 은 진행바의 접근 가능한 이름으로 연결된다.
- fe8280c: `Select` 옵션 `value` 로 빈 문자열(「전체」 등)을 쓸 수 있다. 전에는 Radix 가 예외를 던졌다. 선택하면 `onValueChange("")` 를 받는다. 빈 값 옵션이 없으면 `value=""` 는 지금처럼 placeholder 를 보여 준다.
- 3f6da31: 비제어(`defaultValue`) `Slider` 의 `showValue` 가 움직인 값을 따라간다. 전에는 첫 값에 고정됐다.
- bce4ff5: - `Checkbox` `checked="indeterminate"` 에 전용 스타일과 가로줄 아이콘을 쓴다(전에는 미선택 모양에 체크 아이콘).
  - 범위 `Slider` 의 thumb 에 서로 다른 이름(예: 「가격 최솟값」·「가격 최댓값」, 사전 `slider.thumb`)을 준다.
  - `LinkButton` 이 `disabled` 일 때도 id·`data-*`·`aria-*` 를 유지한다(onClick 만 뺀다).
- 62d3fde: `Stepper` 마지막 단계의 완료 버튼도 `isNextDisabled` 를 따른다. 전에는 검증이 실패해도 완료를 누를 수 있었다.

## 0.1.0

### Minor Changes

- 초기 공개 릴리즈. React 19 + Tailwind v4 + Radix 기반 106개 컴포넌트(primitives 38 · composed 60 · templates 8), JSON 단일 소스 토큰 파이프라인(core/semantic 2계층), 다크모드(`[data-theme="dark"]`), 소비자용 `styles`/`theme` CSS 엔트리, ESM+CJS dual 빌드.
