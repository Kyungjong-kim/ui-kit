---
"@kyungjong-kim/ui-kit": patch
---

입력 컴포넌트의 안내·오류 문구를 스크린리더가 읽도록 연결했다. `helperText` 는 컨트롤의 `aria-describedby` 로, `error` 는 `aria-invalid` 로 자동 연결된다(Input · Textarea · Checkbox · Switch · RadioGroup · Select · Combobox · SearchableSelect · MultiSelect · Slider · SliderField). RadioGroup 의 그룹 `label` 은 `aria-labelledby` 로 이어진다. SliderField 의 thumb 에 이름이 빠져 있던 문제(전달한 `aria-label` 이 버려짐)도 고쳤다.
