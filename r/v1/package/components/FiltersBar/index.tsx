import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import "./styles.css";

export interface FiltersBarProps {
  search?: ReactNode;
  filters?: ReactNode;
  actions?: ReactNode;
  activeCount?: number;
  onReset?: () => void;
  resetLabel?: string;
  className?: string;
}

/**
 * La barre au-dessus d'une liste : recherche, filtres, actions.
 *
 * `activeCount` affiche combien de filtres sont en vigueur. Sans ce compte,
 * une liste filtrée ressemble à une liste vide, et l'on cherche la panne
 * avant de penser au filtre posé la veille.
 */
export function FiltersBar({ search, filters, actions, activeCount = 0, onReset, resetLabel: resetLabelProp, className }: FiltersBarProps) {
    const locale = useSiaLocale();
    const resetLabel = resetLabelProp ?? locale.reset;
  return <section className={cn("sia-filters-bar", className)} aria-label="Filtres"><div className="sia-filters-bar__main">{search && <div className="sia-filters-bar__search">{search}</div>}{filters && <div className="sia-filters-bar__filters">{filters}</div>}</div><div className="sia-filters-bar__actions">{activeCount > 0 && <span className="sia-filters-bar__count">{activeCount} actif{activeCount > 1 ? "s" : ""}</span>}{onReset && activeCount > 0 && <button type="button" className="sia-filters-bar__reset" onClick={onReset}>{resetLabel}</button>}{actions}</div></section>;
}
