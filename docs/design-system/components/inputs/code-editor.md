# CodeEditor

CodeMirror 6 기반 코드 에디터. controlled(`value`)·uncontrolled(`defaultValue`) 모두 지원하며 JavaScript·JSON 문법 하이라이팅, 읽기 전용, 높이 지정을 제공한다. 컨테이너는 DS 토큰으로 스타일링하고 에디터 내부는 CodeMirror 기본 테마를 쓴다.

## Import

```ts
import { CodeEditor } from "ui-kit";
import type { CodeEditorProps, CodeEditorLanguage } from "ui-kit";
```

## Props (`CodeEditorProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `value` | `string` | — | 에디터 내용(controlled). 외부에서 바뀌면 에디터에 반영된다 |
| `defaultValue` | `string` | `""` | 초기 내용(uncontrolled). `value` 미지정 시에만 사용 |
| `onChange` | `(value: string) => void` | — | 내용 변경 콜백 |
| `language` | `"javascript" \| "json" \| "plain"` | `"plain"` | 문법 하이라이팅 언어 |
| `readOnly` | `boolean` | `false` | 읽기 전용 여부 |
| `height` | `number \| string` | `240` | 에디터 높이. 숫자는 px, 문자열은 그대로 적용 |
| `className` | `string` | — | 컨테이너에 병합 |

## 기본 사용

```tsx
{/* uncontrolled */}
<CodeEditor defaultValue={"{\n  \"key\": \"value\"\n}"} language="json" />

{/* controlled */}
const [code, setCode] = useState("const x = 1;");
<CodeEditor value={code} onChange={setCode} language="javascript" height={320} />

{/* 읽기 전용 뷰어 */}
<CodeEditor value={snippet} readOnly height="100%" />
```

## 동작 노트

- 라인 넘버·undo/redo 히스토리·괄호 매칭·자동 들여쓰기가 기본 활성화된다.
- 에디터 인스턴스는 `language`·`readOnly` 변경 시 재생성된다. `defaultValue`(초기 문서)는 최초 마운트 시 한 번만 반영되므로, 마운트 후 내용을 외부에서 갱신하려면 controlled(`value`)로 써야 한다.
- controlled 모드에서 `value`가 현재 문서와 다르면 diff를 계산해 에디터에 dispatch한다.

## When to use

- 코드·JSON·설정 스니펫의 입력·표시가 필요한 경우.
- 여러 줄 일반 텍스트 입력은 [Textarea](./textarea.md), 한 줄 값은 [Input](./input.md)을 쓴다.
