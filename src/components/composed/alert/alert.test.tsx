import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./alert";

describe("Alert", () => {
  it("title과 description을 렌더한다", () => {
    render(<Alert title="주의" description="저장되지 않았습니다." />);
    expect(screen.getByText("주의")).toBeInTheDocument();
    expect(screen.getByText("저장되지 않았습니다.")).toBeInTheDocument();
  });

  it("role=alert를 가진다", () => {
    render(<Alert title="알림" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("danger variant 클래스가 적용된다", () => {
    render(<Alert variant="danger" title="오류" />);
    expect(screen.getByRole("alert").className).toMatch(/danger-subtle/);
  });

  it("dismissible이면 닫기 버튼 클릭 시 onDismiss가 호출된다", async () => {
    const onDismiss = vi.fn();
    render(<Alert title="알림" dismissible onDismiss={onDismiss} />);
    await userEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("icon={null}이면 아이콘을 숨기고 버튼도 렌더하지 않는다", () => {
    render(<Alert title="알림" icon={null} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
