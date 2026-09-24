import { cn } from "@sia-ui/utils";
export interface DurationDisplayProps { milliseconds: number; locale?: string; style?: "short" | "long" | "clock"; className?: string; }
/**
 * Une durée, en mots ou en pendule.
 *
 * Trois styles pour trois usages : `clock` pour un chronomètre qu'on lit en
 * continu, `short` pour une colonne de tableau, `long` pour une phrase.
 */
export function DurationDisplay({ milliseconds, locale = "fr-FR", style = "short", className }: DurationDisplayProps) { const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000)); const hours = Math.floor(totalSeconds / 3600); const minutes = Math.floor((totalSeconds % 3600) / 60); const seconds = totalSeconds % 60; if (style === "clock") return <span className={cn("sia-duration-display", className)}>{[hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":")}</span>; const formatter = new Intl.NumberFormat(locale); const parts = [[hours, style === "long" ? "heure" : "h"], [minutes, style === "long" ? "minute" : "min"], [seconds, style === "long" ? "seconde" : "s"]] as const; return <span className={cn("sia-duration-display", className)}>{parts.filter(([value]) => value > 0).map(([value, unit]) => `${formatter.format(value)} ${unit}${style === "long" && value > 1 ? "s" : ""}`).join(" ") || `0 ${style === "long" ? "seconde" : "s"}`}</span>; }
