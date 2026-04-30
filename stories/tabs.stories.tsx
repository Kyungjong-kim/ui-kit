import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/components/primitives/tabs";

const meta: Meta = {
  title: "Primitives/Tabs",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList>
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="analytics">분석</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">개요 내용입니다.</TabsContent>
      <TabsContent value="analytics">분석 데이터가 여기에 표시됩니다.</TabsContent>
      <TabsContent value="settings">설정 옵션입니다.</TabsContent>
    </Tabs>
  ),
};
