import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CodeEditor } from "./code-editor";

describe("CodeEditor", () => {
  it("크래시 없이 렌더되고 에디터가 마운트된다", () => {
    const { container } = render(<CodeEditor defaultValue="const a = 1;" />);
    expect(container.querySelector(".cm-editor")).toBeInTheDocument();
  });

  it("초기 내용이 에디터에 표시된다", () => {
    const { container } = render(<CodeEditor defaultValue="hello world" />);
    expect(container.querySelector(".cm-content")?.textContent).toContain("hello world");
  });

  it("readOnly이면 편집 불가 상태로 렌더된다", () => {
    const { container } = render(<CodeEditor value="readonly" readOnly />);
    expect(container.querySelector(".cm-content")?.getAttribute("contenteditable")).toBe("false");
  });

  it("language를 json으로 지정해도 크래시 없이 렌더된다", () => {
    const { container } = render(<CodeEditor language="json" defaultValue={'{"a":1}'} />);
    expect(container.querySelector(".cm-editor")).toBeInTheDocument();
  });

  it("height 문자열을 컨테이너에 적용한다", () => {
    const { container } = render(<CodeEditor height="120px" />);
    expect((container.firstChild as HTMLElement).style.height).toBe("120px");
  });
});
