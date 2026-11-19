import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css";

const preview: Preview = {
  // 툴바 테마 전환 — 라이브러리 소비 앱과 같은 방식(<html data-theme="dark">)으로 토큰을 바꾼다.
  globalTypes: {
    theme: {
      description: "색상 테마",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "라이트" },
          { value: "dark", title: "다크" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      if (context.globals.theme === "dark") root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
      document.body.style.background = "var(--color-bg-primary)";
      document.body.style.color = "var(--color-text-primary)";
      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 캔버스 배경은 테마 토큰(--color-bg-primary)을 따른다 — 고정 배경색은 다크 테마 확인을 가린다.
    backgrounds: { disable: true },
    a11y: {
      test: "todo",
    },
    options: {
      storySort: {
        order: [
          "Docs",
          ["Welcome", "Design Tokens", "Conventions"],
          "Foundation",
          "Actions",
          "Inputs",
          "Data Display",
          "Feedback",
          "Navigation",
          "Overlay",
          "Layout",
        ],
      },
    },
  },
};

export default preview;
