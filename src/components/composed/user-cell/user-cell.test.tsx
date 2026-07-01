import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UserCell } from "./user-cell";

describe("UserCell", () => {
  it("이름을 렌더한다", () => {
    render(<UserCell name="홍길동" />);
    expect(screen.getByText("홍길동")).toBeInTheDocument();
  });

  it("부가 정보를 렌더한다", () => {
    render(<UserCell name="홍길동" description="admin@genon.ai" />);
    expect(screen.getByText("admin@genon.ai")).toBeInTheDocument();
  });

  it("avatarSrc가 없으면 이름 첫 글자를 fallback으로 표시한다", () => {
    render(<UserCell name="홍길동" />);
    expect(screen.getByText("홍")).toBeInTheDocument();
  });

  it("avatarSrc가 있으면 이미지를 렌더한다", () => {
    render(<UserCell name="홍길동" avatarSrc="https://example.com/a.png" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/a.png");
  });

  it("description이 없으면 부가 정보 텍스트를 렌더하지 않는다", () => {
    render(<UserCell name="홍길동" />);
    expect(screen.queryByText("admin@genon.ai")).not.toBeInTheDocument();
  });
});
