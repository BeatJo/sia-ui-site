import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { plural, useSiaLocale } from "@sia-ui/headless";
import "./styles.css";

export interface FiltersBarProps {
  search?: ReactNode;
  filters?: ReactNode;
  actions?: ReactNode;
  activeCount?: number;
  onReset?: () => void;
  resetLabel?: string;
  /**
   * La largeur de chaque filtre — `12rem` par défaut. Les filtres se placent
   * côte à côte à cette largeur, et passent à la ligne quand elle manque.
   */
  filterWidth?: string;
  className?: string;
}

/**
 * La barre au-dessus d'une liste : recherche, filtres, actions.
 *
 * `activeCount` affiche combien de filtres sont en vigueur. Sans ce compte,
 * une liste filtrée ressemble à une liste vide, et l'on cherche la panne
 * avant de penser au filtre posé la veille.
 */
export function FiltersBar({ search, filters, actions, activeCount = 0, onReset, resetLabel: resetLabelProp, filterWidth, className }: FiltersBarProps) {
    const locale = useSiaLocale();
    const resetLabel = resetLabelProp ?? locale.reset;
  return <section className={cn("sia-filters-bar", className)} aria-label={locale.filtersBar.label} {...(filterWidth ? { style: { ["--sia-filter-width" as string]: filterWidth } } : {})}><div className="sia-filters-bar__main">{search && <div className="sia-filters-bar__search">{search}</div>}{filters && <div className="sia-filters-bar__filters">{filters}</div>}</div><div className="sia-filters-bar__actions">{activeCount > 0 && <span className="sia-filters-bar__count">{plural(locale.filtersBar, "active", activeCount, locale.language)}</span>}{onReset && activeCount > 0 && <button type="button" className="sia-filters-bar__reset" onClick={onReset}>{resetLabel}</button>}{actions}</div></section>;
}
