import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VersionInfoCard } from "./version-info-card";

describe("VersionInfoCard", () => {
  it("version을 렌더한다", () => {
    render(<VersionInfoCard version="v2.4.1" />);
    expect(screen.getByText("v2.4.1")).toBeInTheDocument();
  });

  it("releaseDate와 summary를 렌더한다", () => {
    render(
      <VersionInfoCard
        version="v2.4.1"
        releaseDate="2026-07-01"
        summary="버그 수정 및 성능 개선."
      />,
    );
    expect(screen.getByText("2026-07-01")).toBeInTheDocument();
    expect(screen.getByText("버그 수정 및 성능 개선.")).toBeInTheDocument();
  });

  it("items의 라벨-값을 렌더한다", () => {
    render(
      <VersionInfoCard
        version="v2.4.1"
        items={[
          { label: "빌드", value: "20260701" },
          { label: "커밋", value: "a1b2c3d" },
        ]}
      />,
    );
    expect(screen.getByText("빌드")).toBeInTheDocument();
    expect(screen.getByText("20260701")).toBeInTheDocument();
    expect(screen.getByText("커밋")).toBeInTheDocument();
    expect(screen.getByText("a1b2c3d")).toBeInTheDocument();
  });

  it("items가 없으면 dl을 렌더하지 않는다", () => {
    const { container } = render(<VersionInfoCard version="v2.4.1" />);
    expect(container.querySelector("dl")).not.toBeInTheDocument();
  });
});
