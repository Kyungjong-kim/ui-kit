import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SettingRow } from "./setting-row";

describe("SettingRow", () => {
  it("라벨과 값을 렌더한다", () => {
    render(<SettingRow label="이름">홍길동</SettingRow>);
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("홍길동")).toBeInTheDocument();
  });

  it("tooltip 슬롯을 렌더한다", () => {
    render(
      <SettingRow label="이름" tooltip={<span>도움말</span>}>
        홍길동
      </SettingRow>,
    );
    expect(screen.getByText("도움말")).toBeInTheDocument();
  });

  it("className이 적용된다", () => {
    const { container } = render(
      <SettingRow label="이름" className="custom-row">
        홍길동
      </SettingRow>,
    );
    expect(container.firstChild).toHaveClass("custom-row");
  });
});
