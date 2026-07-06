import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetaInfo, MetaItem } from "./meta-item";

describe("MetaItem", () => {
  it("라벨과 값을 렌더한다", () => {
    render(<MetaItem label="작성자" value="홍길동" />);
    expect(screen.getByText("작성자")).toBeInTheDocument();
    expect(screen.getByText("홍길동")).toBeInTheDocument();
  });

  it("숫자 값을 렌더한다", () => {
    render(<MetaItem label="버전" value={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("ReactNode 값을 그대로 렌더한다", () => {
    render(<MetaItem label="상태" value={<span data-testid="badge">정상</span>} />);
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });

  it("sm 사이즈 타이포 클래스를 적용한다", () => {
    render(<MetaItem label="작성자" value="홍길동" size="sm" />);
    expect(screen.getByText("작성자").className).toMatch(/typography-body-sm-base/);
  });
});

describe("MetaInfo", () => {
  it("모든 항목을 렌더한다", () => {
    render(<MetaInfo items={[<span key="a">항목 A</span>, <span key="b">항목 B</span>]} />);
    expect(screen.getByText("항목 A")).toBeInTheDocument();
    expect(screen.getByText("항목 B")).toBeInTheDocument();
  });

  it("항목 사이에 구분선(divider)을 N-1개 렌더한다", () => {
    const { container } = render(
      <MetaInfo items={[<span key="a">A</span>, <span key="b">B</span>, <span key="c">C</span>]} />,
    );
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
  });

  it("단일 항목이면 구분선을 렌더하지 않는다", () => {
    const { container } = render(<MetaInfo items={[<span key="a">A</span>]} />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
  });
});
