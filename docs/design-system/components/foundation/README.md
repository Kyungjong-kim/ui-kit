# Foundation

다른 모든 단계(atoms · molecules · organisms · templates)가 딛고 서는 토대 계층.
UI를 조립하는 컴포넌트가 아니라 **타이포그래피 · 아이콘 · 로고 · 디자인 토큰** 등 시각 언어의 원자 재료를 정의한다.

Atomic Design 표준 5단계에는 없는 0단계 성격으로, 원자(atoms)보다 더 아래의 "재료"를 담는다.

## 구성 요소

| 요소 | 개요 | 문서 | export |
|---|---|---|---|
| Text | polymorphic 타이포그래피 컴포넌트. `typography-*` variant로 모든 텍스트 스타일 표현 | 문서 예정 | `Text` |
| Icon | SVG 자동생성 기반 아이콘 컴포넌트(113종) | 문서 예정 | `Icon` |
| Separator | 콘텐츠 구획용 구분선 | 문서 예정 | `Separator` |
| Avatar | 사용자·엔티티 아바타 | 문서 예정 | `Avatar` |
| Logo | 브랜드 로고 마크 | 문서 예정 | — |
| 디자인 토큰 | 색상·간격·타이포·크기 CSS 변수 | — | — |

## 토큰 규약

색상·간격·타이포는 CSS 변수(`var(--color-...)`)와 토큰 유틸리티 클래스(`typography-*`, `h-size-control-*`, `px-inline-*` 등)로 표현한다. raw hex·임의 px 값은 사용하지 않는다.

> 상세 토큰·원칙 정의는 [../../foundation/](../../foundation/)의 principles·tokens 문서를 참조한다.
