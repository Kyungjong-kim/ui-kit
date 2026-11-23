# Organisms · card

콘텐츠를 담는 카드 컨테이너 블록.

## 소속 컴포넌트

| 컴포넌트 | 문서 | export |
|---|---|---|
| Card | 문서 예정 | `Card` |
| VersionInfoCard | 문서 예정 | `VersionInfoCard` |

## 스타일 규격

카드 계열(Card·StatCard·MetricCard·VersionInfoCard·DataItemsTable·DescriptionList)은 12px(`rounded-md`)·hairline 테두리·그림자 없음이다. Card 의 `shadow` prop 기본값은 `"none"`(이전 `"sm"`). 여백은 20px(`p-inline-xl`)로 통일한다(Card 24→20, VersionInfoCard 16→20, DescriptionList 24→20). DataItemsTable 은 카드 12px·`p-inline-lg`.
