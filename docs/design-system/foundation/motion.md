# Foundation — 모션

> 전환·애니메이션 가이드 — 어떤 상황에 어떤 **duration·easing**을 쓰는지. 임의 ms·cubic-bezier 남발 금지, 표준 단계를 따른다.

## 원칙

모션은 상태 변화를 **인지시키는 보조 수단**이지 장식이 아니다. 작은 변화는 짧게, 큰 영역 전환은 약간 길게, 그 이상은 자제한다.

## Duration (권장 단계)

| 단계 | 값 | 용도 |
|---|---|---|
| instant | 0ms | 즉시 반영(전환 없음) |
| fast | 150ms | hover·focus·색/상태 전환 등 작은 변화 |
| medium | 300ms | 팝오버·아코디언·드롭다운 펼침/접힘 |
| slow | 500ms | 큰 영역 전환·강조 모션(남용 금지) |

> 토큰화하지 않은 raw `duration-200` 같은 값을 흩뿌리지 말고 위 단계 중 하나로 통일한다. 단계가 필요하면 호스트 앱 Tailwind theme에 매핑해 쓴다.

## Easing (권장)

| 상황 | easing |
|---|---|
| 양방향 전환(기본) | `ease-in-out` |
| 등장(나타남) | `ease-out` |
| 퇴장(사라짐) | `ease-in` |
| 강조 전환 | `cubic-bezier(0.4, 0, 0.2, 1)` |
| 회전·진행(등속) | `linear` |

대부분은 Tailwind 기본 `ease-in-out`/`ease-out`으로 충분하다.

## 코드 관례

- **색·상태 전환:** `transition-colors`(짧은 duration으로 충분). 변형은 `transition-transform`, 그림자는 `transition-shadow`.
- **Radix 열림/닫힘:** `data-[state=open]`/`closed`에 진입·퇴장 애니메이션을 붙인다(예: `fade-in`·`zoom-in-95`). Radix가 상태 속성을 관리하므로 직접 토글하지 않는다.
- **회전 피드백(새로고침 등):** 1회전 `linear` 0.6s 정도.
- **로딩 스피너:** 무한 회전은 로딩 표시에만, 다른 곳에서 장식으로 쓰지 않는다.

```tsx
// hover 색 전환 — 빠르게
<button className="transition-colors duration-150 hover:bg-[var(--color-interactive-ghost-bg-hover)]" />

// Radix Dialog 열림 애니메이션
<DialogContent className="data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95" />
```

## 규칙

- **`prefers-reduced-motion` 존중** — 감소 모드에서 큰 모션은 약화·제거한다.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- **장식성 모션 남용 금지** — 불필요한 진입 애니메이션·무한 회전·과한 패럴랙스 금지([principles.md](principles.md)).
- **임의 cubic-bezier 남발 금지** — 위 표준 easing 중에서 고른다.
