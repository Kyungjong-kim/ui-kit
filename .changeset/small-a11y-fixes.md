---
"@kyungjong-kim/ui-kit": patch
---

- `Checkbox` `checked="indeterminate"` 에 전용 스타일과 가로줄 아이콘을 쓴다(전에는 미선택 모양에 체크 아이콘).
- 범위 `Slider` 의 thumb 에 서로 다른 이름(예: 「가격 최솟값」·「가격 최댓값」, 사전 `slider.thumb`)을 준다.
- `LinkButton` 이 `disabled` 일 때도 id·data-*·aria-* 를 유지한다(onClick 만 뺀다).
