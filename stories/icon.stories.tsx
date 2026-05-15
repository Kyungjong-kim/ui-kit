import type { Meta, StoryObj } from "@storybook/react";
import {
  Icon,
  type IconColor,
  type IconName,
  type IconSize,
} from "../src/components/primitives/icon";
import { iconMap } from "../src/components/primitives/icon/generated/icon-map";

const allIconNames = Object.keys(iconMap) as IconName[];

const meta: Meta<typeof Icon> = {
  title: "System/Icon",
  component: Icon,
  parameters: { layout: "centered" },
  argTypes: {
    name: { control: "select", options: allIconNames },
    size: {
      control: "select",
      options: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "subtle",
        "muted",
        "disabled",
        "inverse",
        "brandDefault",
        "brandHover",
        "dangerDefault",
        "dangerHover",
        "successDefault",
      ] satisfies IconColor[],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: { name: "bell", size: "lg", color: "primary" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {(["xxs", "xs", "sm", "md", "lg", "xl", "xxl"] as IconSize[]).map((size) => (
        <div key={size} style={{ textAlign: "center" }}>
          <Icon name="bell" size={size} color="primary" />
          <div style={{ fontSize: 10, marginTop: 4 }}>{size}</div>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(
        [
          "primary",
          "secondary",
          "tertiary",
          "brandDefault",
          "dangerDefault",
          "successDefault",
          "disabled",
        ] as IconColor[]
      ).map((color) => (
        <div key={color} style={{ textAlign: "center" }}>
          <Icon name="bell" size="lg" color={color} />
          <div style={{ fontSize: 10, marginTop: 4 }}>{color}</div>
        </div>
      ))}
    </div>
  ),
};

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
        gap: 16,
        width: 800,
      }}
    >
      {allIconNames.map((name) => (
        <div key={name} style={{ textAlign: "center" }}>
          <Icon name={name} size="md" color="primary" />
          <div
            style={{
              fontSize: 9,
              marginTop: 4,
              wordBreak: "break-all",
              color: "var(--color-text-tertiary)",
            }}
          >
            {name}
          </div>
        </div>
      ))}
    </div>
  ),
};
