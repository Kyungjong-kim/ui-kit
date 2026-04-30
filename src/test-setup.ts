import "@testing-library/jest-dom";

// Radix UI primitives that use positioning (Tooltip, Popover, etc.) rely on ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
