# Tabs

같은 영역에서 콘텐츠를 전환하는 탭. Radix Tabs primitive를 합성 컴포넌트(`Tabs` / `TabsList` / `TabsTrigger` / `TabsContent`)로 노출한다.

## Import

```ts
import { Tabs, TabsList, TabsTrigger, TabsContent } from "ui-kit";
```

## 구성

| export | 역할 | 비고 |
|---|---|---|
| `Tabs` | 루트 컨테이너(상태 보유) | `TabsPrimitive.Root` 재노출 |
| `TabsList` | 트리거 묶음 | 토큰 배경/라운드 적용된 래퍼 |
| `TabsTrigger` | 개별 탭 버튼 | `value` 필수 |
| `TabsContent` | 탭별 패널 | `value` 필수 |

Props는 각 Radix Tabs primitive 속성을 그대로 받는다.

- `Tabs`: `value` / `defaultValue` / `onValueChange` / `orientation` 등
- `TabsTrigger`·`TabsContent`: `value`(필수), `disabled` 등 + `className`

## 기본 사용

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">개요</TabsTrigger>
    <TabsTrigger value="details">상세</TabsTrigger>
    <TabsTrigger value="history" disabled>이력</TabsTrigger>
  </TabsList>

  <TabsContent value="overview">개요 내용</TabsContent>
  <TabsContent value="details">상세 내용</TabsContent>
  <TabsContent value="history">이력 내용</TabsContent>
</Tabs>
```

제어형:

```tsx
const [tab, setTab] = useState("overview");

<Tabs value={tab} onValueChange={setTab}>
  {/* ... */}
</Tabs>
```

## 스타일 노트

- 활성 트리거는 `data-[state=active]`에서 primary 배경 + 그림자 토큰으로 강조된다.
- 비활성 트리거는 tertiary 텍스트 토큰, hover 시 secondary로 전환된다.
- `TabsList`는 tertiary 배경의 알약형 컨테이너로 트리거를 감싼다.

## When to use

- 동일 맥락의 콘텐츠를 한 화면에서 **상호 배타적으로** 전환할 때.
- 페이지 자체가 바뀌는 내비게이션은 탭이 아니라 라우팅/링크로 처리한다.
- 탭 수가 많거나 라벨이 길어 가로로 넘치면 다른 패턴(드롭다운·세그먼트)을 고려한다.

## 접근성

- Radix Tabs 기반으로 `role="tablist"`/`tab`/`tabpanel` 구조와 화살표 키 이동·자동/수동 활성화가 기본 제공된다.
- 트리거·패널은 `value`로 자동 연결되므로 짝이 맞는 `value`를 부여해야 한다.
- 모든 트리거·패널은 `focus-visible` 시 `var(--color-border-focus)` 링을 표시한다.
