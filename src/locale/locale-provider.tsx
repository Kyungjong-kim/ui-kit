import { createContext, type ReactNode, useContext, useMemo } from "react";
import { ko, messagesByLocale, type UiKitLocale, type UiKitMessages } from "./messages";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (...args: never[]) => unknown
    ? T[K]
    : T[K] extends readonly unknown[]
      ? T[K]
      : T[K] extends object
        ? DeepPartial<T[K]>
        : T[K];
};

export type UiKitMessageOverrides = DeepPartial<UiKitMessages>;

const UiKitMessagesContext = createContext<UiKitMessages>(ko);

export interface UiKitLocaleProviderProps {
  /** 기본 사전. 미지정 시 `ko` */
  locale?: UiKitLocale;
  /** 사전 일부를 덮어쓴다 (예: `{ common: { close: "Dismiss" } }`) */
  messages?: UiKitMessageOverrides;
  children: ReactNode;
}

/** 컴포넌트 기본 문구를 앱 단위로 바꾼다. Provider 가 없으면 `ko`, 컴포넌트 prop 이 항상 우선한다. */
export function UiKitLocaleProvider({
  locale = "ko",
  messages,
  children,
}: UiKitLocaleProviderProps) {
  const value = useMemo(
    () => mergeMessages(messagesByLocale[locale], messages),
    [locale, messages],
  );
  return <UiKitMessagesContext.Provider value={value}>{children}</UiKitMessagesContext.Provider>;
}

/** 현재 사전. Provider 밖에서는 `ko`. */
export function useUiKitMessages(): UiKitMessages {
  return useContext(UiKitMessagesContext);
}

function mergeMessages(base: UiKitMessages, overrides?: UiKitMessageOverrides): UiKitMessages {
  if (!overrides) return base;
  const merged: UiKitMessages = { ...base };
  for (const key of Object.keys(overrides) as Array<keyof UiKitMessages>) {
    mergeSection(merged, base, key, overrides[key]);
  }
  return merged;
}

function mergeSection<K extends keyof UiKitMessages>(
  target: UiKitMessages,
  base: UiKitMessages,
  key: K,
  entries: UiKitMessageOverrides[K],
): void {
  if (!entries) return;
  // 사전 전체를 펼친 뒤 덮으므로 빠지는 키가 없다 — Partial 을 완전한 섹션으로 좁힌다
  target[key] = { ...base[key], ...entries } as UiKitMessages[K];
}
