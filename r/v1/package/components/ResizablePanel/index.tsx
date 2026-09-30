import { useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface ResizablePanelProps { first: ReactNode; second: ReactNode; defaultSize?: number; minSize?: number; maxSize?: number; direction?: "horizontal" | "vertical"; className?: string; }
/**
 * Deux zones, et une poignée entre elles.
 *
 * Les bornes `minSize` et `maxSize` empêchent de réduire un panneau à
 * rien : une zone à zéro pour cent disparaît avec sa poignée, et on ne peut
 * plus la rouvrir.
 */
export function ResizablePanel({ first, second, defaultSize = 50, minSize = 20, maxSize = 80, direction = "horizontal", className }: ResizablePanelProps) { const [size, setSize] = useState(defaultSize); const start = (event: PointerEvent<HTMLDivElement>) => { const container = event.currentTarget.parentElement; if (!container) return; event.currentTarget.setPointerCapture(event.pointerId); const move = (moveEvent: globalThis.PointerEvent) => { const rect = container.getBoundingClientRect(); const next = direction === "horizontal" ? ((moveEvent.clientX - rect.left) / rect.width) * 100 : ((moveEvent.clientY - rect.top) / rect.height) * 100; setSize(Math.min(maxSize, Math.max(minSize, next))); }; const stop = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", stop); }; window.addEventListener("pointermove", move); window.addEventListener("pointerup", stop); }; const firstStyle = { flexBasis: `${size}%` }; return <div className={cn("sia-resizable-panel", `sia-resizable-panel--${direction}`, className)}><section style={firstStyle}>{first}</section><div className="sia-resizable-panel__handle" role="separator" aria-orientation={direction} aria-valuenow={Math.round(size)} tabIndex={0} onPointerDown={start} onKeyDown={(event) => { const delta = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -5 : event.key === "ArrowRight" || event.key === "ArrowDown" ? 5 : 0; if (delta) { event.preventDefault(); setSize((current) => Math.min(maxSize, Math.max(minSize, current + delta))); } }} /><section>{second}</section></div>; }
