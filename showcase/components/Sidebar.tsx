import { useMemo, useState } from "react";
import { type AtomicStage, catalog, STAGE_ORDER } from "../catalog";

interface SidebarProps {
  activeName: string | null;
  onSelect: (name: string) => void;
}

interface GroupedStage {
  stage: AtomicStage;
  groups: Array<{ group: string; items: { name: string; title: string }[] }>;
}

function buildTree(): GroupedStage[] {
  return STAGE_ORDER.map((stage) => {
    const stageEntries = catalog.filter((e) => e.stage === stage);
    const groupNames = [...new Set(stageEntries.map((e) => e.group))];
    return {
      stage,
      groups: groupNames.map((group) => ({
        group,
        items: stageEntries
          .filter((e) => e.group === group)
          .map((e) => ({ name: e.name, title: e.title })),
      })),
    };
  });
}

export function Sidebar({ activeName, onSelect }: SidebarProps) {
  const tree = useMemo(buildTree, []);
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();
  const matches = (title: string) => normalized === "" || title.toLowerCase().includes(normalized);

  return (
    <nav className="flex h-full w-64 shrink-0 flex-col border-r border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
      <div className="border-b border-[var(--color-border-default)] p-4">
        <div className="typography-body-lg-bold text-[var(--color-text-primary)]">ui-kit</div>
        <div className="typography-caption text-[var(--color-text-tertiary)]">
          Component Showcase
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="컴포넌트 검색"
          className="mt-3 w-full rounded-xs border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-1.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-border-focus)]"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        {tree.map(({ stage, groups }) => {
          const visibleGroups = groups
            .map((g) => ({ ...g, items: g.items.filter((i) => matches(i.title)) }))
            .filter((g) => g.items.length > 0);
          if (visibleGroups.length === 0) return null;
          return (
            <div key={stage} className="mb-4">
              <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                {stage}
              </div>
              {visibleGroups.map(({ group, items }) => (
                <div key={group} className="mb-2">
                  <div className="px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
                    {group}
                  </div>
                  <ul>
                    {items.map((item) => {
                      const isActive = item.name === activeName;
                      return (
                        <li key={item.name}>
                          <button
                            type="button"
                            onClick={() => onSelect(item.name)}
                            className={[
                              "w-full rounded-xs px-3 py-1.5 text-left text-sm transition-colors",
                              isActive
                                ? "bg-[var(--color-bg-brand-subtle)] font-medium text-[var(--color-text-brand-default)]"
                                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]",
                            ].join(" ")}
                          >
                            {item.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
