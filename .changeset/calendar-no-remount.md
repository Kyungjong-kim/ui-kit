---
"@kyungjong-kim/ui-kit": patch
---

`Calendar` 가 다시 렌더될 때마다 날짜 트리 전체를 재마운트하던 문제를 고쳤다(react-day-picker 에 렌더마다 새 컴포넌트 함수를 넘기던 탓). hover·전환이 초기화되지 않는다.
