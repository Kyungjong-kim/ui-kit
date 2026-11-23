import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup", () => {
  it("라디오 아이템들을 렌더한다", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="옵션 A" />
        <RadioGroupItem value="b" label="옵션 B" />
      </RadioGroup>,
    );
    expect(screen.getByText("옵션 A")).toBeInTheDocument();
    expect(screen.getByText("옵션 B")).toBeInTheDocument();
  });

  it("라디오 버튼 role로 렌더된다", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="x" label="X" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("클릭 시 onValueChange가 호출된다", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="a" label="옵션 A" />
      </RadioGroup>,
    );
    await userEvent.click(screen.getByRole("radio"));
    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("disabled 상태에서 클릭해도 변경되지 않는다", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange} disabled>
        <RadioGroupItem value="a" label="옵션 A" />
      </RadioGroup>,
    );
    await userEvent.click(screen.getByRole("radio"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("label 클릭으로도 선택된다", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="b" label="옵션 B" />
      </RadioGroup>,
    );
    await userEvent.click(screen.getByText("옵션 B"));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("그룹 label 을 이름으로, helperText 를 설명으로 연결한다", () => {
    render(
      <RadioGroup label="배송 방법" error helperText="하나를 고르세요.">
        <RadioGroupItem value="a" label="택배" />
        <RadioGroupItem value="b" label="퀵" />
      </RadioGroup>,
    );
    const group = screen.getByRole("radiogroup", { name: "배송 방법" });
    expect(group).toHaveAccessibleDescription("하나를 고르세요.");
    expect(group).toHaveAttribute("aria-invalid", "true");
  });

  it("항목 helperText 를 해당 라디오의 설명으로 연결한다", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="택배" helperText="2~3일 소요" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "택배" })).toHaveAccessibleDescription("2~3일 소요");
  });

  it("배경은 토큰(다크 대응), 미선택 테두리는 control 토큰, 선택 점은 노랑 위 어두운 색", () => {
    const { container } = render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" label="옵션 A" />
      </RadioGroup>,
    );
    const radio = screen.getByRole("radio");
    expect(radio.className).not.toMatch(/bg-white/);
    expect(radio.className).toMatch(/border-\[var\(--color-border-control\)\]/);
    const dot = container.querySelector('[data-state="checked"] div') as HTMLElement;
    expect(dot.className).toMatch(/color-interactive-primary-text/);
  });
});
