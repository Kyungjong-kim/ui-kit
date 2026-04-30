# ui-kit 코딩 컨벤션 (에이전트용 요약)

---

## 1. 기준 설정 파일

- `biome.json` — 포매터·린터 통합
- `tsconfig.json` — TypeScript strict
- `tsup.config.ts` — 빌드 entry·external

---

## 2. 핵심 규칙

| 항목 | 규칙 |
|------|------|
| **포매터** | biome (들여쓰기·따옴표·세미콜론 등 자동) |
| **파일 네이밍** | kebab-case (예: `dnd-list/dnd-list.tsx`) |
| **컴포넌트 네이밍** | PascalCase (예: `DndList`, `EmptyState`) |
| **디렉토리** | kebab-case (예: `empty-state/`) |
| **컴포넌트 선언** | 함수형 (`function Foo()`) — 단순한 경우 / `forwardRef` — ref 노출 필요 시 |
| **export** | named export만 사용 (default export 금지) |
| **타입** | `interface FooProps` 또는 `VariantProps<typeof fooVariants>` |
| **className 결합** | `cn(...)` 유틸 (`src/utils/cn.ts`) 사용 — `clsx + twMerge` |

---

## 3. 컴포넌트 파일 내 선언 순서

```ts
1. cva variants 정의 (있으면)
2. interface Props 정의
3. 컴포넌트 함수 (forwardRef 또는 function)
4. displayName (forwardRef 사용 시 필수)
5. 하위 컴포넌트 (있으면 - 예: AccordionItem, AccordionTrigger)
6. export {...}
```

---

## 4. 테스트 파일 패턴

- `<컴포넌트>.test.tsx` 같은 폴더에 위치
- vitest + Testing Library
- `describe(컴포넌트명, () => { ... })` 그룹
- 최소 항목: 렌더링 / 주요 prop / 이벤트 핸들러

---

## 5. 스토리 파일 패턴

- `stories/<kebab-case>.stories.tsx`
- `meta.title = "Primitives/<PascalCase>"`
- `Default` 스토리 + variant·size별 스토리

---

## 6. 디자인 토큰 사용

> 상세 규칙은 `design-system.md` 참조.

- 컴포넌트 className에 raw hex(`#fabc37`) 작성 금지
- semantic 토큰 변수(`bg-bg-brand-default` 등) 사용
- spacing·radius도 토큰 변수 우선

---

## 7. 에이전트 작업 시 주의

- 새 컴포넌트 추가 시 **5개 산출물 동시 작성** (CLAUDE.md STEP 1 참조)
- biome 자동 포맷에 맡김 — 수동 들여쓰기 조정 금지
- 기존 컴포넌트 카테고리(Radix / 단순 / DnD)와 동일한 패턴을 따른다
- 리팩토링은 **요청된 부분만** 변경 (Surgical Changes)
