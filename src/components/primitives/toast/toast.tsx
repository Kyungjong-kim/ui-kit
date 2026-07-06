import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

export type ToasterProps = ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      toastOptions={{
        style: {
          background: "var(--color-bg-primary)",
          border: "1px solid var(--color-border-default)",
          color: "var(--color-text-primary)",
          borderRadius: "var(--token-radius-sm)",
          boxShadow: "var(--token-shadow-default-xl)",
        },
      }}
      {...props}
    />
  );
}

export { toast } from "sonner";
