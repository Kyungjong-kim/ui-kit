---
"@kyungjong-kim/ui-kit": minor
---

`Dialog`·`AlertDialog`·`Sheet` 에 `trigger` prop 을 추가했다. 넘긴 요소를 누르면 열리고, `open` 을 주지 않으면 비제어로 동작한다. 기존 `*Trigger` export 는 래퍼 밖에서 쓸 수 없어(Radix context 없음) 이 prop 이 트리거를 붙이는 방법이다.
