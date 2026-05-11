import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FileIcon } from "./file-icon";

describe("FileIcon", () => {
  it("렌더된다", () => {
    const { container } = render(<FileIcon fileName="test.txt" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("pdf 파일은 formatDocument 아이콘을 렌더한다", () => {
    const { container } = render(<FileIcon fileName="report.pdf" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("py 파일은 formatPython 아이콘을 렌더한다", () => {
    const { container } = render(<FileIcon fileName="script.py" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("알 수 없는 확장자는 file 아이콘을 렌더한다", () => {
    const { container } = render(<FileIcon fileName="unknown.xyz" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("className이 전달된다", () => {
    const { container } = render(<FileIcon fileName="test.txt" className="text-red-500" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
