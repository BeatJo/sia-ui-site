import { useEffect, useRef, useState } from "react";
import { cn } from "@sia-ui/utils";

export interface TimerProps { duration?: number; initialValue?: number; direction?: "down" | "up"; running?: boolean; interval?: number; onChange?: (milliseconds: number) => void; onFinish?: () => void; format?: (milliseconds: number) => string; className?: string; }
export interface TimeParts { hours: number; minutes: number; seconds: number; }
export function parseTimeValue(value = ""): TimeParts { const [hours = 0, minutes = 0, seconds = 0] = value.split(":").map(Number); return { hours: Math.min(Math.max(hours || 0, 0), 23), minutes: Math.min(Math.max(minutes || 0, 0), 59), seconds: Math.min(Math.max(seconds || 0, 0), 59) }; }
export function formatTimeValue(parts: TimeParts, showSeconds = false) { const base = `${String(parts.hours).padStart(2, "0")}:${String(parts.minutes).padStart(2, "0")}`; return showSeconds ? `${base}:${String(parts.seconds).padStart(2, "0")}` : base; }
export function formatDuration(milliseconds: number, showMilliseconds = false) { const total = Math.max(0, milliseconds); const hours = Math.floor(total / 3600000); const minutes = Math.floor((total % 3600000) / 60000); const seconds = Math.floor((total % 60000) / 1000); const ms = Math.floor((total % 1000) / 10); return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}${showMilliseconds ? `.${String(ms).padStart(2, "0")}` : ""}`; }
/**
 * Un temps qui s'écoule, dans un sens ou dans l'autre.
 *
 * L'intervalle est réglable et vaut 250 ms par défaut : une pendule au
 * dixième de seconde redessine quarante fois par seconde pour un chiffre
 * que personne ne lit.
 */
export function Timer({ duration = 60000, initialValue = 0, direction = "down", running = true, interval = 250, onChange, onFinish, format = formatDuration, className }: TimerProps) { const initial = direction === "down" ? duration : initialValue; const [value, setValue] = useState(initial); const finishCalled = useRef(false); useEffect(() => { setValue(direction === "down" ? duration : initialValue); finishCalled.current = false; }, [direction, duration, initialValue]); useEffect(() => { if (!running) return; const startedAt = Date.now(); const base = value; const update = () => { const elapsed = Date.now() - startedAt; const next = direction === "down" ? Math.max(0, base - elapsed) : base + elapsed; setValue(next); onChange?.(next); if (direction === "down" && next === 0 && !finishCalled.current) { finishCalled.current = true; onFinish?.(); } }; update(); const id = window.setInterval(update, interval); return () => window.clearInterval(id); }, [running, direction, interval]); return <time className={cn("sia-timer", className)} aria-live="polite">{format(value)}</time>; }
