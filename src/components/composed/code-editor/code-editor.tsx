import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { bracketMatching, indentOnInput } from "@codemirror/language";
import { EditorState, type Extension } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/cn";

/** CodeEditor가 지원하는 문법 하이라이팅 언어. */
export type CodeEditorLanguage = "javascript" | "json" | "plain";

export type CodeEditorProps = {
  /** 에디터 내용 (controlled). 값이 바뀌면 에디터에 반영된다. */
  value?: string;
  /** 초기 내용 (uncontrolled). value 미지정 시에만 사용된다. */
  defaultValue?: string;
  /** 내용 변경 콜백. */
  onChange?: (value: string) => void;
  /** 문법 하이라이팅 언어. 기본값은 "plain". */
  language?: CodeEditorLanguage;
  /** 읽기 전용 여부. */
  readOnly?: boolean;
  /** 에디터 높이. 숫자는 px, 문자열은 그대로 적용된다. */
  height?: number | string;
  /** 컨테이너에 추가할 클래스. */
  className?: string;
};

function languageExtension(language: CodeEditorLanguage): Extension {
  if (language === "javascript") return javascript();
  if (language === "json") return json();
  return [];
}

/**
 * CodeMirror 6 기반 코드 에디터.
 *
 * controlled(`value`)·uncontrolled(`defaultValue`) 모두 지원하며
 * JavaScript·JSON 문법 하이라이팅, 읽기 전용, 높이 지정을 제공한다.
 * 컨테이너는 DS 토큰으로 스타일링하고 에디터 내부는 CodeMirror 기본 테마를 쓴다.
 */
export function CodeEditor({
  value,
  defaultValue = "",
  onChange,
  language = "plain",
  readOnly = false,
  height = 240,
  className,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const isControlled = value !== undefined;
  const [initialDoc] = useState(() => (isControlled ? value : defaultValue));

  // 에디터 인스턴스 생성 — language·readOnly 변경 시 재생성.
  // biome-ignore lint/correctness/useExhaustiveDependencies: 초기 문서는 최초 마운트 시 한 번만 반영한다.
  useEffect(() => {
    const parent = containerRef.current;
    if (!parent) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current?.(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: initialDoc,
      extensions: [
        lineNumbers(),
        history(),
        indentOnInput(),
        bracketMatching(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        languageExtension(language),
        EditorState.readOnly.of(readOnly),
        EditorView.editable.of(!readOnly),
        updateListener,
      ],
    });

    const view = new EditorView({ state, parent });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [language, readOnly]);

  // controlled value 외부 변경을 에디터에 동기화.
  useEffect(() => {
    const view = viewRef.current;
    if (!view || !isControlled || value === undefined) return;
    const current = view.state.doc.toString();
    if (current === value) return;
    view.dispatch({
      changes: { from: 0, to: current.length, insert: value },
    });
  }, [isControlled, value]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] [&_.cm-editor]:h-full [&_.cm-editor.cm-focused]:outline-none [&_.cm-scroller]:font-mono",
        className,
      )}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    />
  );
}

CodeEditor.displayName = "CodeEditor";
