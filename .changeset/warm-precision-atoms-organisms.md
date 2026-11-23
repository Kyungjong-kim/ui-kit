---
"@kyungjong-kim/ui-kit": minor
---

Atoms·Organisms 를 Warm Precision 규격으로 맞추고 버그 2건을 고쳤다. **시각 변경**: 버튼·카드·표·대화상자의 라운드·그림자·여백이 바뀐다.

버그
- `IconButton` 기본(secondary)·ghost 아이콘이 흰색이라 흰 배경에서 보이지 않던 문제. primary 는 노랑 위 어두운 아이콘, danger 는 흰 아이콘, 나머지는 secondary 색을 쓴다.
- `Button size="lg"` 글꼴이 md(14px)로 렌더되던 문제. `cn` 이 `typography-*` 유틸끼리 충돌로 처리한다(소비자가 className 으로 넘긴 typography 도 이제 덮어쓴다).

규격
- 라운드 체계: 옵션 4px · 컨트롤 6px(Button·IconButton·SelectButton 8 → 6) · 떠 있는 패널 8px · 컨테이너 12px(Card 계열·표·Dialog 16 → 12).
- Button·Card 계열의 기본 그림자를 빼고 hairline 테두리만 둔다. `Card` 의 `shadow` 기본값이 `"sm"` → `"none"`.
- 카드 여백 20px 통일(Card 24·VersionInfoCard 16·StatCard·MetricCard raw 값 → 20). 지표 값 tabular 숫자.
- Table·TreeTable 이 DataTable 과 같은 규격(테두리 래퍼·회색 헤더·토큰 여백·typography). DataTable 선택 행은 연노랑으로 hover 와 구분.
- 새 토큰 `--color-border-control`: Checkbox·Radio 미선택 테두리를 한 단계 진하게. 노랑 위 체크·점은 어두운 색.
- SelectButton 선택은 연노랑, Dialog·AlertDialog 테두리, Sheet 닫기 버튼 초점·hover, NavFlyout 패널 여백·항목 라운드·초점.
- Popover·LinkButton 의 utility 형태 토큰을 `[var(--…)]` 로, Progress 채움 단색, Skeleton 기본 라운드 8px.
