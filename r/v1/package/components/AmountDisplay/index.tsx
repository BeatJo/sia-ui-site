import { type ReactNode } from "react";
import { cn, formatCurrency } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import { useFormatDefaults, useFormatLocale } from "@sia-ui/headless";
import "./styles.css";

export interface AmountDisplayProps { value: number; currency?: string; /** La langue du format. Par défaut, celle de la locale SIA. */ locale?: string; label?: ReactNode; secondary?: ReactNode; sign?: "auto" | "always"; tone?: ComponentTone; className?: string; }
/**
 * Un montant, lisible d'un coup d'œil.
 *
 * Le signe est porté par la mise en forme et non par le nombre : un débit
 * de 12 000 francs s'écrit « −12 000 F CFA », jamais « 12 000 F CFA » en
 * rouge seul. La couleur peut manquer — un daltonien, une impression en
 * noir et blanc — le signe, lui, reste.
 */
export function AmountDisplay({ value, currency: currencyProp, locale: localeProp, label, secondary, sign = "auto", tone = "neutral", className }: AmountDisplayProps) {
  const formatLocale = useFormatLocale();
  const formatDefaults = useFormatDefaults();
  const currency = currencyProp ?? formatDefaults.currency;
  const locale = localeProp ?? formatLocale;
  const formatted = formatCurrency(Math.abs(value), { locale, currency });
  // Le vrai signe moins, comme `formatCurrency` — sauf réglage `minusSign: "ascii"`.
  const moins = formatDefaults.minusSign === "ascii" ? "-" : "\u2212";
  const prefix = sign === "always" || value < 0 ? value < 0 ? moins : "+" : "";
  return <span className={cn("sia-amount-display", `sia-amount-display--${tone}`, className)}>{label && <span className="sia-amount-display__label">{label}</span>}<strong>{prefix}{formatted}</strong>{secondary && <span className="sia-amount-display__secondary">{secondary}</span>}</span>;
}
