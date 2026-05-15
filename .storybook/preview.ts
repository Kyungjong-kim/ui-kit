import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "surface", value: "#f9f9f9" },
        { name: "dark", value: "#121212" },
      ],
    },
    a11y: {
      test: "todo",
    },
    options: {
      storySort: {
        order: [
          "Docs",
          ["Welcome", "Design Tokens", "Conventions"],
          "Action",
          "Form",
          "Display",
          "Feedback",
          "Overlay",
          "Navigation",
          "Data",
          "Layout",
          "System",
        ],
      },
    },
  },
};

export default preview;
