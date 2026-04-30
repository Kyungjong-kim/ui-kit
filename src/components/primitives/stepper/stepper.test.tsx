import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "./stepper";

const steps = ["기본 정보", "상세 설정", "완료"];

describe("Stepper", () => {
  it("모든 step 라벨이 렌더된다", () => {
    render(<Stepper steps={steps} activeStep={0} />);
    steps.forEach((s) => expect(screen.getByText(s)).toBeInTheDocument());
  });

  it("다음 버튼 클릭 시 onNext가 호출된다", async () => {
    const onNext = vi.fn();
    render(<Stepper steps={steps} activeStep={0} onNext={onNext} />);
    await userEvent.click(screen.getByRole("button", { name: /다음/ }));
    expect(onNext).toHaveBeenCalled();
  });

  it("첫 번째 스텝에서 이전 버튼이 비활성화된다", () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByRole("button", { name: /이전/ })).toBeDisabled();
  });

  it("마지막 스텝에서 다음 버튼이 완료로 바뀐다", () => {
    render(<Stepper steps={steps} activeStep={2} />);
    expect(screen.getByRole("button", { name: /완료/ })).toBeInTheDocument();
  });
});
