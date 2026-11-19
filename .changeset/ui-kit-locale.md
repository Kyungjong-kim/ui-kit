---
"@kyungjong-kim/ui-kit": minor
---

컴포넌트 기본 문구 로케일을 추가했다. `UiKitLocaleProvider`(`locale: "ko" | "en"`, `messages` 부분 덮어쓰기)와 `useUiKitMessages()`, 사전 `ko`·`en` 을 export 한다. Provider 가 없으면 한국어(`ko`)다. 컴포넌트에 직접 넘긴 prop 은 그대로 우선한다.

**동작 변경**: 영어로만 박혀 있던 MultiSelect(`Select` · `Search` · `No results found.` · `Select all` · `Clear all` 등)와 TagInput(placeholder · 오류 문구)의 기본값이 한국어 사전으로 바뀐다. 영어가 필요하면 `<UiKitLocaleProvider locale="en">` 으로 감싼다. PeriodFilterDropdown 트리거 요약도 이제 `presetLabels` 를 따른다.
