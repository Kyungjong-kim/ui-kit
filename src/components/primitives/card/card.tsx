import type { HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  shadow?: "none" | "sm" | "md" | "lg";
}

export function Card({ className, shadow = "sm", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] transition-shadow",
        {
          "shadow-none": shadow === "none",
          "shadow-default-sm": shadow === "sm",
          "shadow-default-md": shadow === "md",
          "shadow-default-lg": shadow === "lg",
        },
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-group-xs p-inline-xxl pb-0", className)} {...props} />
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-inline-xxl", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-inline-xxl pt-0", className)} {...props} />;
}
