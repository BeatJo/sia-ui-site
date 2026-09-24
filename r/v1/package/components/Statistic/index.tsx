import { type ReactNode } from "react";
import { cn, formatCurrency } from "@sia-ui/utils";
import "./styles.css";

export interface StatisticProps {
  value: number;
  label?: ReactNode;
  format?: "number" | "currency" | "percent";
  locale?: string;
  currency?: string;
  precision?: number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  trend?: number;
  className?: string;
}

/**
 * Un nombre qu'on lit d'un coup d'œil.
 *
 * La tendance est un écart, pas une flèche : c'est le signe du nombre qui
 * décide du sens et de la couleur. Une flèche passée en prop finit par
 * pointer vers le haut sur une baisse.
 */
export function Statistic({ value, label, format = "number", locale = "fr-FR", currency = "XAF", precision, prefix, suffix, trend, className }: StatisticProps) {
  const formatted = format === "currency"
    ? formatCurrency(value, { locale, currency, ...(precision !== undefined ? { minimumFractionDigits: precision, maximumFractionDigits: precision } : {}) })
    : new Intl.NumberFormat(locale, format === "percent" ? { style: "percent", ...(precision !== undefined ? { minimumFractionDigits: precision, maximumFractionDigits: precision } : {}) } : { ...(precision !== undefined ? { minimumFractionDigits: precision, maximumFractionDigits: precision } : {}) }).format(value);
  return <div className={cn("sia-statistic", className)}>{label && <span className="sia-statistic__label">{label}</span>}<div className="sia-statistic__value">{prefix}<span>{formatted}</span>{suffix}</div>{trend !== undefined && <span className={cn("sia-statistic__trend", trend > 0 && "sia-statistic__trend--up", trend < 0 && "sia-statistic__trend--down")}>{trend > 0 ? "+" : ""}{new Intl.NumberFormat(locale, { style:"percent", maximumFractionDigits:1 }).format(trend)}</span>}</div>;
}
