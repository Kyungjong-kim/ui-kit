import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GuideBlock } from "./guide-block";

describe("GuideBlock", () => {
  it("제목과 설명을 렌더한다", () => {
    render(<GuideBlock title="안내" description="이것은 설명입니다" />);
    expect(screen.getByText("안내")).toBeInTheDocument();
    expect(screen.getByText("이것은 설명입니다")).toBeInTheDocument();
  });

  it("role=note로 렌더한다", () => {
    render(<GuideBlock title="안내" />);
    expect(screen.getByRole("note")).toBeInTheDocument();
  });

  it("tip tone이면 기본 아이콘을 coloredBinoculars로 사용한다", () => {
    const { container } = render(<GuideBlock title="팁" tone="tip" />);
    expect(container.querySelector('[data-icon="coloredBinoculars"]')).toBeInTheDocument();
  });

  it("icon prop으로 아이콘을 교체한다", () => {
    const { container } = render(<GuideBlock title="안내" icon="bell" />);
    expect(container.querySelector('[data-icon="bell"]')).toBeInTheDocument();
  });

  it("description이 없으면 설명 텍스트를 렌더하지 않는다", () => {
    render(<GuideBlock title="안내" />);
    expect(screen.queryByText("이것은 설명입니다")).not.toBeInTheDocument();
  });
});
