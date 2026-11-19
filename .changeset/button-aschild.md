---
"@kyungjong-kim/ui-kit": patch
---

`Button asChild` 가 렌더 중 예외(`React.Children.only`)로 죽던 문제를 고쳤다. 이제 자식 요소(링크 등)가 버튼 스타일을 받고, `loading` 이면 Spinner 가 그 안에 들어간다.

`asChild` 이면서 `disabled`·`loading` 이면 자식 요소에 `aria-disabled="true"` 를 붙이고 클릭(링크 이동)을 막는다. 링크에는 `disabled` 속성이 통하지 않기 때문이다.
