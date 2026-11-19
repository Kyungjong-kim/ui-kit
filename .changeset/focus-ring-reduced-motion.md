---
"@kyungjong-kim/ui-kit": patch
---

키보드 초점 표시를 `focus-ring` 유틸 하나로 통일했다(초점 색 2px 선 + 2px 띄움, outline 방식이라 고대비 모드에서도 보임). 스크롤 목록·메뉴 항목은 `focus-ring-inset`. 초점 표시가 아예 없던 Accordion 트리거 · TreeTable 펼침 버튼 · Calendar 날짜·이동 버튼(인라인 `outline: none` 제거) · DatePicker 계열 트리거 · MonthPicker · MultiSelect 옵션 · Alert 닫기 · TagInput 전체 삭제 · DnDList 손잡이 등에 초점 표시를 넣었다.

`theme.css` 에 `prefers-reduced-motion: reduce` 규칙을 넣었다. 사용자가 OS 에서 동작 줄이기를 켜면 ui-kit theme 을 가져온 앱 전체의 전환·애니메이션이 사실상 꺼진다(스피너·indeterminate 진행바도 멈춤).
