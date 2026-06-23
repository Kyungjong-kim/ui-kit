import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatCard } from "./stat-card";

describe("StatCard", () => {
  it("라벨·상태·수치를 렌더한다", () => {
    render(<StatCard label="처리량" tone="success" statusLabel="정상" value={1234} unit="건" />);
    expect(screen.getByText("처리량")).toBeInTheDocument();
    expect(screen.getByText("정상")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
    expect(screen.getByText("건")).toBeInTheDocument();
  });

  it("delta가 없으면 캡션을 렌더하지 않는다", () => {
    render(<StatCard label="처리량" tone="neutral" statusLabel="변동없음" value="0" />);
    expect(screen.queryByText("직전 기간 대비")).not.toBeInTheDocument();
  });

  it("delta가 있으면 증감 텍스트와 캡션을 렌더한다", () => {
    render(
      <StatCard
        label="처리량"
        tone="success"
        statusLabel="정상"
        value={10}
        delta={{ direction: "up", text: "+5" }}
      />,
    );
    expect(screen.getByText("+5")).toBeInTheDocument();
    expect(screen.getByText("직전 기간 대비")).toBeInTheDocument();
  });

  it("progress가 있으면 진행바 채움 폭을 0~100으로 클램프한다", () => {
    const { container } = render(
      <StatCard label="사용률" tone="warning" statusLabel="주의" value="120%" progress={120} />,
    );
    const bar = container.querySelector('[style*="width"]') as HTMLElement;
    expect(bar).not.toBeNull();
    expect(bar.style.width).toBe("100%");
  });
});
