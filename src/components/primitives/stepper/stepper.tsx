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
    <div className={cn("flex flex-col gap-group-xl", className)}>
      <ol aria-label="단계 진행" className="flex items-center">
        {steps.map((step, index) => {
          const isDone = index < activeStep;
          const isCurrent = index === activeStep;
          const stepState = isDone ? "완료" : isCurrent ? "현재" : "미완";

          return (
            <li
              key={step}
              aria-label={`${index + 1}단계: ${step} (${stepState})`}
              aria-current={isCurrent ? "step" : undefined}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-size-control-sm w-size-control-sm items-center justify-center rounded-full typography-label-sm-medium transition-colors",
                    isDone &&
                      "bg-[var(--color-bg-brand-default)] text-[var(--color-interactive-primary-text)]",
                    isCurrent &&
                      "border-2 border-[var(--color-border-brand-default)] text-[var(--color-text-brand-default)]",
                    !isDone &&
                      !isCurrent &&
                      "border-2 border-[var(--color-border-default)] text-[var(--color-text-tertiary)]",
                  )}
                  aria-hidden="true"
                >
                  {isDone ? <CheckIcon className="h-size-icon-sm w-size-icon-sm" /> : index + 1}
                </div>
                <span
                  className={cn(
                    "mt-stack-xxs typography-caption whitespace-nowrap",
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
                    "mx-inline-sm h-px flex-1 transition-colors",
                    index < activeStep
                      ? "bg-[var(--color-bg-brand-default)]"
                      : "bg-[var(--color-border-default)]",
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
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
