import { type ReactNode } from "react";
import { cn, formatCurrency } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import "./styles.css";

export interface AmountDisplayProps { value: number; currency?: string; locale?: string; label?: ReactNode; secondary?: ReactNode; sign?: "auto" | "always"; tone?: ComponentTone; className?: string; }
/**
 * Un montant, lisible d'un coup d'œil.
 *
 * Le signe est porté par la mise en forme et non par le nombre : un débit
 * de 12 000 francs s'écrit « -12 000 F CFA », jamais « 12 000 F CFA » en
 * rouge seul. La couleur peut manquer — un daltonien, une impression en
 * noir et blanc — le signe, lui, reste.
 */
export function AmountDisplay({ value, currency = "XAF", locale = "fr-FR", label, secondary, sign = "auto", tone = "neutral", className }: AmountDisplayProps) {
  const formatted = formatCurrency(Math.abs(value), { locale, currency });
  const prefix = sign === "always" || value < 0 ? value < 0 ? "-" : "+" : "";
  return <span className={cn("sia-amount-display", `sia-amount-display--${tone}`, className)}>{label && <span className="sia-amount-display__label">{label}</span>}<strong>{prefix}{formatted}</strong>{secondary && <span className="sia-amount-display__secondary">{secondary}</span>}</span>;
}
