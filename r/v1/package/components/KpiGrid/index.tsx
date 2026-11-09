import { type HTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface KpiGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

/**
 * Une rangée d'indicateurs.
 *
 * Le nombre de colonnes est déclaré, pas déduit du nombre de cartes : trois
 * indicateurs sur quatre colonnes laissent un trou, et ce trou dit qu'il
 * manque une donnée.
 */
export function KpiGrid({ columns = 4, className, ...props }: KpiGridProps) {
  return <div className={cn("sia-kpi-grid", `sia-kpi-grid--${columns}`, className)} {...props} />;
}
