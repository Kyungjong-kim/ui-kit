import type { CatalogEntry } from "../catalog";

interface ComponentViewProps {
  entry: CatalogEntry | undefined;
}

export function ComponentView({ entry }: ComponentViewProps) {
  if (!entry) {
    return (
      <div className="flex h-full items-center justify-center text-center">
        <div>
          <div className="typography-headline-md text-[var(--color-text-primary)]">
            컴포넌트를 선택하세요
          </div>
          <p className="mt-2 text-sm text-[var(--color-text-tertiary)]">
            좌측 사이드바에서 Atomic 계층을 탐색하세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-8 py-10">
      <header className="mb-8 border-b border-[var(--color-border-default)] pb-5">
        <div className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--color-text-tertiary)]">
          {entry.stage} · {entry.group}
        </div>
        <h1 className="typography-headline-xl text-[var(--color-text-primary)]">{entry.title}</h1>
        {entry.description && (
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{entry.description}</p>
        )}
      </header>

      <section>
        <h2 className="mb-4 text-sm font-semibold text-[var(--color-text-secondary)]">Example</h2>
        <div className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] p-8">
          {entry.example ? (
            entry.example()
          ) : (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <span className="text-sm font-medium text-[var(--color-text-tertiary)]">
                예제 준비 중
              </span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                이 컴포넌트는 카탈로그에 등록되어 있으며 예제는 곧 추가됩니다.
              </span>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
