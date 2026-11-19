---
"@kyungjong-kim/ui-kit": patch
---

`Progress` 의 `value` 가 `max` 를 넘거나 음수일 때 화면과 같게 범위로 잘라 `aria-valuenow` 를 유지한다(전에는 indeterminate 로 바뀌고 콘솔 오류). `label` 은 진행바의 접근 가능한 이름으로 연결된다.
