---
"@kyungjong-kim/ui-kit": minor
---

색 대비를 WCAG AA 기준으로 맞췄다. **시각 변경**: 상태색 텍스트·초점 고리·위험 버튼이 한 단계 진해지고, 다크 테마의 상태 배경이 어두운 틴트로 바뀐다.

- core 팔레트 red·green·orange·brand 의 600~900 을 다시 단계화했다(25~500 은 그대로). 기존 600~900 이 거의 같은 밝기라 의미색 텍스트가 흰 배경 대비 2.2~3.3:1 이었다. `neutral-500` 도 4.5:1 이 되도록 조금 진해졌다(`text-tertiary`).
- `text-{danger,success,warning}-default` 는 700, `-strong` 은 800, `bg-{danger,success,warning}-default` 는 600 을 가리킨다. 위험 버튼(`interactive-destructive-bg`) 흰 글자 대비 3.3 → 4.5:1.
- 초점 고리(`--color-border-focus`)·입력 초점 테두리가 라이트에서 `brand-700` 이다(흰 배경 1.6 → 5.3:1). 다크는 `brand-400` 그대로.
- 다크 테마의 `bg-*-subtle`·`border-*-subtle` 이 중간 톤 원색(900) 대신 `color-mix(in oklab, …)` 어두운 틴트다. 다크 Badge·Alert 글자 대비 2.3 → 6:1 이상.
- 새 토큰 `--color-bg-{danger,success,warning,info}-strong`·`--color-text-on-strong`: 흰 글자를 올리는 채움용. `Badge`·`Tag` 의 `appearance="solid"` 상태색이 이 토큰을 쓴다.
- 밝은 브랜드 노랑 위 글자를 어둡게 바꿨다(흰 글자 1.7:1): `Badge`·`Tag` solid 기본형, `Calendar` 선택일, `MonthPicker` 선택월, `FilterDropdown` 개수 배지, `SlideListBadge` 선택 상태.
