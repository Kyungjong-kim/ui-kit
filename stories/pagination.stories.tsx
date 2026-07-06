import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "../src/components/primitives/pagination";

const meta: Meta = {
  title: "Molecules/Navigation/Pagination",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Short: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />;
  },
};

export const Long: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />;
  },
};

export const WideSibling: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return (
      <Pagination currentPage={page} totalPages={50} onPageChange={setPage} siblingCount={2} />
    );
  },
};

export const FirstPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />;
  },
};

export const LastPage: Story = {
  render: () => {
    const [page, setPage] = useState(20);
    return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />;
  },
};
