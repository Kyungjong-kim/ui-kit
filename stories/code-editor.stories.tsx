import type { Meta, StoryObj } from "@storybook/react";
import { CodeEditor } from "../src/components/composed/code-editor";

const meta: Meta<typeof CodeEditor> = {
  title: "Molecules/Form/CodeEditor",
  component: CodeEditor,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CodeEditor>;

export const Default: Story = {
  args: {
    defaultValue: "여기에 코드를 입력하세요.",
  },
};

export const JavaScript: Story = {
  args: {
    language: "javascript",
    defaultValue: 'function greet(name) {\n  return "Hello, " + name + "!";\n}\n\ngreet("world");',
  },
};

export const Json: Story = {
  args: {
    language: "json",
    defaultValue: '{\n  "name": "ui-kit",\n  "version": "0.0.0",\n  "private": true\n}',
  },
};

export const ReadOnly: Story = {
  args: {
    language: "javascript",
    readOnly: true,
    value: "const readOnly = true; // 편집할 수 없습니다.",
  },
};

export const CustomHeight: Story = {
  args: {
    language: "javascript",
    height: 400,
    defaultValue: "// 높이 400px 에디터\nconst lines = Array.from({ length: 20 }, (_, i) => i);",
  },
};
