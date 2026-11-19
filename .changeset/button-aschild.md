---
"@kyungjong-kim/ui-kit": patch
---

`Button asChild` 가 렌더 중 예외(`React.Children.only`)로 죽던 문제를 고쳤다. 이제 자식 요소(링크 등)가 버튼 스타일을 받고, `loading` 이면 Spinner 가 그 안에 들어간다.
