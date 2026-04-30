import { CheckIcon } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Button } from "../button";

export interface StepperProps {
  steps: string[];
  activeStep: number;
  onNext?: () => void;
  onPrev?: () => void;
  onComplete?: () => void;
  completeBtnText?: string;
  isNextDisabled?: boolean;
  className?: string;
}

export function Stepper({
  steps,
  activeStep,
  onNext,
  onPrev,
  onComplete,
  completeBtnText = "완료",
  isNextDisabled,
  className,
}: StepperProps) {
  const isFirst = activeStep === 0;
  const isLast = activeStep === steps.length - 1;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isDone = index < activeStep;
          const isCurrent = index === activeStep;
          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    isDone && "bg-[var(--color-bg-brand-default)] text-[var(--color-neutral-900)]",
                    isCurrent &&
                      "border-2 border-[var(--color-border-brand-default)] text-[var(--color-text-brand-default)]",
                    !isDone &&
                      !isCurrent &&
                      "border-2 border-[var(--color-border-default)] text-[var(--color-text-tertiary)]",
                  )}
                >
                  {isDone ? <CheckIcon className="h-4 w-4" /> : index + 1}
                </div>
                <span
                  className={cn(
                    "mt-1 text-xs whitespace-nowrap",
                    isCurrent
                      ? "text-[var(--color-text-brand-default)] font-medium"
                      : "text-[var(--color-text-tertiary)]",
                  )}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-px flex-1 transition-colors",
                    index < activeStep
                      ? "bg-[var(--color-bg-brand-default)]"
                      : "bg-[var(--color-border-default)]",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        <Button variant="secondary" onClick={onPrev} disabled={isFirst}>
          이전
        </Button>
        {isLast ? (
          <Button onClick={onComplete}>{completeBtnText}</Button>
        ) : (
          <Button onClick={onNext} disabled={isNextDisabled}>
            다음
          </Button>
        )}
      </div>
    </div>
  );
}
