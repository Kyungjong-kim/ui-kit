---
"@kyungjong-kim/ui-kit": minor
---

Molecule 시각 정제(Warm Precision). **시각 변경**: 필드·목록·Tabs·SegmentedControl·Pagination 의 모양이 바뀐다. 공개 API 변화는 없다.

- 글꼴 토큰 `--token-font-family-sans`(Pretendard → 시스템 한글 글꼴)를 `--font-sans` 로 노출한다. 글꼴 파일은 싣지 않으니 Pretendard 를 쓰려면 소비 앱에서 로드한다(없으면 Apple SD Gothic Neo·Noto Sans KR 등으로 떨어진다).
- 필드(Input·Textarea·Select·Combobox·SearchableSelect·MultiSelect, 필터 트리거): 6px 라운드, 정의만 있던 `border-input-default`·`border-input-focus` 사용, 새 `border-input-hover`. 초점은 `ring-offset` 링 대신 입력 초점 테두리 + 새 `--color-focus-halo` 3px 링.
- 떠 있는 패널은 8px 라운드로 통일(DropdownMenu·Popover 12 → 8), 목록 안쪽 여백 4px, 옵션 4px 라운드. 선택 옵션은 브랜드 연노랑 배경 + 체크로 hover(회색)와 구분한다.
- **Tabs·IconTabs 가 밑줄형**이 된다(활성 탭 앰버 밑줄). 알약형 전환 UI 는 SegmentedControl 을 쓴다.
- SegmentedControl 트랙에 테두리, 선택 칸은 그림자 대신 입력 테두리.
- Pagination 칸 36 → 32px·6px·tabular 숫자, 이전·다음은 테두리 버튼.
- 입력 계열 오류 문구 앞에 장식용 경고 아이콘(색 외의 단서).
