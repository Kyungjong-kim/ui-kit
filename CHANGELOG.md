# @kyungjong-kim/ui-kit

## 0.3.0

### Minor Changes

- 3ad6cb3: 색 대비를 WCAG AA 기준으로 맞췄다. **시각 변경**: 상태색 텍스트·초점 고리·위험 버튼이 한 단계 진해지고, 다크 테마의 상태 배경이 어두운 틴트로 바뀐다.

  - core 팔레트 red·green·orange·brand 의 600~900 을 다시 단계화했다(25~500 은 그대로). 기존 600~900 이 거의 같은 밝기라 의미색 텍스트가 흰 배경 대비 2.2~3.3:1 이었다. `neutral-500` 도 4.5:1 이 되도록 조금 진해졌다(`text-tertiary`).
  - `text-{danger,success,warning}-default` 는 700, `-strong` 은 800, `bg-{danger,success,warning}-default` 는 600 을 가리킨다. 위험 버튼(`interactive-destructive-bg`) 흰 글자 대비 3.3 → 4.5:1.
  - 초점 고리(`--color-border-focus`)·입력 초점 테두리가 라이트에서 `brand-700` 이다(흰 배경 1.6 → 5.3:1). 다크는 `brand-400` 그대로.
  - 다크 테마의 `bg-*-subtle`·`border-*-subtle` 이 중간 톤 원색(900) 대신 `color-mix(in oklab, …)` 어두운 틴트다. 다크 Badge·Alert 글자 대비 2.3 → 6:1 이상.
  - 새 토큰 `--color-bg-{danger,success,warning,info}-strong`·`--color-text-on-strong`: 흰 글자를 올리는 채움용. `Badge`·`Tag` 의 `appearance="solid"` 상태색이 이 토큰을 쓴다.
  - 밝은 브랜드 노랑 위 글자를 어둡게 바꿨다(흰 글자 1.7:1): `Badge`·`Tag` solid 기본형, `Calendar` 선택일, `MonthPicker` 선택월, `FilterDropdown` 개수 배지, `SlideListBadge` 선택 상태.

- a55ff4a: Atoms·Organisms 를 Warm Precision 규격으로 맞추고 버그 2건을 고쳤다. **시각 변경**: 버튼·카드·표·대화상자의 라운드·그림자·여백이 바뀐다.

  버그

  - `IconButton` 기본(secondary)·ghost 아이콘이 흰색이라 흰 배경에서 보이지 않던 문제. primary 는 노랑 위 어두운 아이콘, danger 는 흰 아이콘, 나머지는 secondary 색을 쓴다.
  - `Button size="lg"` 글꼴이 md(14px)로 렌더되던 문제. `cn` 이 `typography-*` 유틸끼리 충돌로 처리한다(소비자가 className 으로 넘긴 typography 도 이제 덮어쓴다).

  규격

  - 라운드 체계: 옵션 4px · 컨트롤 6px(Button·IconButton·SelectButton 8 → 6) · 떠 있는 패널 8px · 컨테이너 12px(Card 계열·표·Dialog 16 → 12).
  - Button·Card 계열의 기본 그림자를 빼고 hairline 테두리만 둔다. `Card` 의 `shadow` 기본값이 `"sm"` → `"none"`.
  - 카드 여백 20px 통일(Card 24·VersionInfoCard 16·StatCard·MetricCard raw 값 → 20). 지표 값 tabular 숫자.
  - Table·TreeTable 이 DataTable 과 같은 규격(테두리 래퍼·회색 헤더·토큰 여백·typography). DataTable 선택 행은 연노랑으로 hover 와 구분.
  - 새 토큰 `--color-border-control`: Checkbox·Radio 미선택 테두리를 한 단계 진하게. 노랑 위 체크·점은 어두운 색.
  - SelectButton 선택은 연노랑, Dialog·AlertDialog 테두리, Sheet 닫기 버튼 초점·hover, NavFlyout 패널 여백·항목 라운드·초점.
  - Popover·LinkButton 의 utility 형태 토큰을 `[var(--…)]` 로, Progress 채움 단색, Skeleton 기본 라운드 8px.

- 26f361c: Molecule 시각 정제(Warm Precision). **시각 변경**: 필드·목록·Tabs·SegmentedControl·Pagination 의 모양이 바뀐다. 공개 API 변화는 없다.

  - 글꼴 토큰 `--token-font-family-sans`(Pretendard → 시스템 한글 글꼴)를 `--font-sans` 로 노출한다. 글꼴 파일은 싣지 않으니 Pretendard 를 쓰려면 소비 앱에서 로드한다(없으면 Apple SD Gothic Neo·Noto Sans KR 등으로 떨어진다).
  - 필드(Input·Textarea·Select·Combobox·SearchableSelect·MultiSelect, 필터 트리거): 6px 라운드, 정의만 있던 `border-input-default`·`border-input-focus` 사용, 새 `border-input-hover`. 초점은 `ring-offset` 링 대신 입력 초점 테두리 + 새 `--color-focus-halo` 3px 링.
  - 떠 있는 패널은 8px 라운드로 통일(DropdownMenu·Popover 12 → 8), 목록 안쪽 여백 4px, 옵션 4px 라운드. 선택 옵션은 브랜드 연노랑 배경 + 체크로 hover(회색)와 구분한다.
  - **Tabs·IconTabs 가 밑줄형**이 된다(활성 탭 앰버 밑줄). 알약형 전환 UI 는 SegmentedControl 을 쓴다.
  - SegmentedControl 트랙에 테두리, 선택 칸은 그림자 대신 입력 테두리.
  - Pagination 칸 36 → 32px·6px·tabular 숫자, 이전·다음은 테두리 버튼.
  - 입력 계열 오류 문구 앞에 장식용 경고 아이콘(색 외의 단서).

### Patch Changes

- f23157d: - `Calendar` `captionLayout="dropdown"` 레이아웃을 고쳤다. 연·월 라벨이 두 번 보이고 이전·다음 버튼이 세로로 쌓이던 문제(기본 스타일시트 없이 렌더). 이제 네이티브 select 가 라벨 위에 투명하게 겹치고, 이동 버튼은 캡션 줄 양끝에 놓인다.
  - `DataTable` 선택(체크박스) 열이 체크박스 폭만 차지한다. 전에는 다른 열과 폭을 나눠 체크박스와 첫 열 사이가 크게 벌어졌다.

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
