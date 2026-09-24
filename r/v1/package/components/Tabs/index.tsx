import { createContext, useContext, useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

type TabsContextValue = { value: string; setValue: (value: string) => void; baseId: string };
const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps { value?: string; defaultValue: string; onValueChange?: (value: string) => void; className?: string; children: ReactNode; }

/**
 * Des vues qui se remplacent au même endroit.
 *
 * Elles servent à des contenus de même rang — jamais à des étapes, qui ont
 * un ordre et des `Steps`, ni à une navigation entre écrans, qui change
 * l'adresse.
 */
export function Tabs({ value, defaultValue, onValueChange, className, children }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const baseId = useId();
  const current = value ?? internal;
  const setValue = (next: string) => { if (value === undefined) setInternal(next); onValueChange?.(next); };
  return <TabsContext.Provider value={{ value: current, setValue, baseId }}><div className={cn("sia-tabs", className)}>{children}</div></TabsContext.Provider>;
}

export function TabsList({ className, children }: { className?: string; children: ReactNode }) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("[role='tab']:not(:disabled)"));
    const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (currentIndex < 0 || tabs.length === 0) return;
    event.preventDefault();
    const index = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : event.key === "ArrowRight" ? (currentIndex + 1) % tabs.length : (currentIndex - 1 + tabs.length) % tabs.length;
    tabs[index]?.focus();
    tabs[index]?.click();
  };
  return <div role="tablist" className={cn("sia-tabs__list", className)} onKeyDown={onKeyDown}>{children}</div>;
}

export function TabsTrigger({ value, disabled, children }: { value: string; disabled?: boolean; children: ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside Tabs.");
  const active = context.value === value;
  return <button type="button" role="tab" id={`${context.baseId}-tab-${value}`} aria-selected={active} aria-controls={`${context.baseId}-panel-${value}`} tabIndex={active ? 0 : -1} disabled={disabled} className="sia-tabs__trigger" onClick={() => context.setValue(value)}>{children}</button>;
}

export function TabsContent({ value, className, children }: { value: string; className?: string; children: ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used inside Tabs.");
  if (context.value !== value) return null;
  return <div role="tabpanel" id={`${context.baseId}-panel-${value}`} aria-labelledby={`${context.baseId}-tab-${value}`} tabIndex={0} className={cn("sia-tabs__content", className)}>{children}</div>;
}
