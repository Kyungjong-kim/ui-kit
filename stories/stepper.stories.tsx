import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stepper } from "../src/components/primitives/stepper";

const meta: Meta = {
  title: "Navigation/Stepper",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const steps = ["기본 정보", "상세 설정", "검토", "완료"];
    const [active, setActive] = useState(0);
    return (
      <div className="w-96">
        <Stepper
          steps={steps}
          activeStep={active}
          onNext={() => setActive((p) => Math.min(p + 1, steps.length - 1))}
          onPrev={() => setActive((p) => Math.max(p - 1, 0))}
          onComplete={() => alert("완료!")}
        />
      </div>
    );
  },
};
