---
"@kyungjong-kim/ui-kit": patch
---

`Select` 옵션 `value` 로 빈 문자열(「전체」 등)을 쓸 수 있다. 전에는 Radix 가 예외를 던졌다. 선택하면 `onValueChange("")` 를 받는다. 빈 값 옵션이 없으면 `value=""` 는 지금처럼 placeholder 를 보여 준다.
