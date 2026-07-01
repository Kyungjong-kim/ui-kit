import { ChevronRightIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import { cn } from "../../../utils/cn";

/** 계층 구조를 가지는 트리 테이블 노드. children으로 중첩. */
export interface TreeTableNode {
  id: string;
  children?: TreeTableNode[];
  [key: string]: unknown;
}

/** 트리 테이블 컬럼 정의. render로 셀 커스터마이징 가능. */
export interface TreeTableColumn<T extends TreeTableNode> {
  key: string;
  header: ReactNode;
  render?: (node: T, depth: number) => ReactNode;
  className?: string;
}

export interface TreeTableProps<T extends TreeTableNode> {
  columns: TreeTableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  defaultExpandedIds?: string[];
  className?: string;
}

/** children으로 중첩된 행을 펼침/접힘 토글하며 depth 들여쓰기로 계층을 표현하는 테이블. */
export function TreeTable<T extends TreeTableNode>({
  columns,
  data,
  emptyMessage = "데이터가 없습니다",
  defaultExpandedIds = [],
  className,
}: TreeTableProps<T>) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(defaultExpandedIds));

  function toggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const isEmpty = data.length === 0;

  function renderRows(nodes: T[], depth: number): ReactNode[] {
    return nodes.flatMap((node) => {
      const hasChildren = Boolean(node.children && node.children.length > 0);
      const isExpanded = expandedIds.has(node.id);

      const row = (
        <tr key={node.id} className="border-b border-[var(--color-border-default)] last:border-b-0">
          {columns.map((column, columnIndex) => (
            <td
              key={column.key}
              className={cn("px-4 py-3 text-[var(--color-text-primary)]", column.className)}
            >
              {columnIndex === 0 ? (
                <span
                  className="flex items-center gap-1"
                  style={{ paddingLeft: `${depth * 20}px` }}
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() => toggle(node.id)}
                      aria-label={isExpanded ? "접기" : "펼치기"}
                      aria-expanded={isExpanded}
                      className="flex h-5 w-5 items-center justify-center rounded text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-tertiary)]"
                    >
                      <ChevronRightIcon
                        className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")}
                      />
                    </button>
                  ) : (
                    <span className="inline-block h-5 w-5 shrink-0" />
                  )}
                  <span>
                    {column.render
                      ? column.render(node, depth)
                      : ((node[column.key] as ReactNode) ?? null)}
                  </span>
                </span>
              ) : column.render ? (
                column.render(node, depth)
              ) : (
                ((node[column.key] as ReactNode) ?? null)
              )}
            </td>
          ))}
        </tr>
      );

      if (hasChildren && isExpanded) {
        return [row, ...renderRows(node.children as T[], depth + 1)];
      }
      return [row];
    });
  }

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border-default)]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-3 text-left font-semibold text-[var(--color-text-secondary)]",
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isEmpty ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-[var(--color-text-tertiary)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            renderRows(data, 0)
          )}
        </tbody>
      </table>
    </div>
  );
}

TreeTable.displayName = "TreeTable";
