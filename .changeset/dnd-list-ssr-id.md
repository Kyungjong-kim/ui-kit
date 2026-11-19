---
"@kyungjong-kim/ui-kit": patch
---

`DndList` 가 서버 렌더와 클라이언트 렌더에서 다른 접근성 id(`DndDescribedBy-N`)를 만들어 하이드레이션 경고가 날 수 있던 문제를 고쳤다(`DndContext` 에 `useId`).
