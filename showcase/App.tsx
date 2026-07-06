import { useCallback, useEffect, useState } from "react";
import { findEntry } from "./catalog";
import { ComponentView } from "./components/ComponentView";
import { Sidebar } from "./components/Sidebar";

/** URLSearchParams 기반 경량 라우팅 — ?item=<name> */
function readItemFromUrl(): string | null {
  return new URLSearchParams(window.location.search).get("item");
}

export function App() {
  const [activeName, setActiveName] = useState<string | null>(readItemFromUrl);

  // 뒤로/앞으로 가기 대응
  useEffect(() => {
    const onPop = () => setActiveName(readItemFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const handleSelect = useCallback((name: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("item", name);
    window.history.pushState({}, "", `?${params.toString()}`);
    setActiveName(name);
  }, []);

  const entry = findEntry(activeName);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <Sidebar activeName={activeName} onSelect={handleSelect} />
      <main className="flex-1 overflow-y-auto">
        <ComponentView entry={entry} />
      </main>
    </div>
  );
}
