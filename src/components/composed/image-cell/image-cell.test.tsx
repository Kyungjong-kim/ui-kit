import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ImageCell } from "./image-cell";

const image = { id: "1", src: "https://example.com/img.png", alt: "테스트" };

describe("ImageCell", () => {
  it("이미지를 렌더한다", () => {
    render(<ImageCell image={image} size="sm" isLoading={false} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("onRemove가 있으면 삭제 버튼이 렌더된다", () => {
    render(<ImageCell image={image} size="sm" isLoading={false} onRemove={vi.fn()} />);
    expect(screen.getByRole("button", { name: "파일 삭제" })).toBeInTheDocument();
  });

  it("삭제 버튼 클릭 시 onRemove가 호출된다", async () => {
    const onRemove = vi.fn();
    render(<ImageCell image={image} size="sm" isLoading={false} onRemove={onRemove} />);
    await userEvent.click(screen.getByRole("button", { name: "파일 삭제" }));
    expect(onRemove).toHaveBeenCalledWith("1");
  });

  it("isLoading + skeleton이면 img 대신 skeleton을 렌더한다", () => {
    render(<ImageCell image={image} size="sm" isLoading loadingType="skeleton" />);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("onChange가 있으면 클릭 시 호출된다", async () => {
    const onChange = vi.fn();
    render(<ImageCell image={image} size="sm" isLoading={false} onChange={onChange} />);
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
