import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface DescriptionItem { key: string; label: ReactNode; value: ReactNode; span?: 1 | 2 | 3; }
export interface DescriptionsProps { items: DescriptionItem[]; title?: ReactNode; columns?: 1 | 2 | 3; bordered?: boolean; className?: string; }
/**
 * Des paires libellé / valeur, en colonnes.
 *
 * C'est la forme d'une fiche en lecture — ce qu'un formulaire montre quand
 * il n'y a rien à saisir. `span` laisse une valeur longue occuper toute la
 * ligne plutôt que d'être coupée dans une colonne étroite.
 */
export function Descriptions({ items, title, columns = 2, bordered = false, className }: DescriptionsProps) { return <section className={cn("sia-descriptions", bordered && "sia-descriptions--bordered", className)}>{title && <h3>{title}</h3>}<dl className={`sia-descriptions__grid sia-descriptions__grid--${columns}`}>{items.map((item) => <div key={item.key} style={{ gridColumn: `span ${item.span ?? 1}` }}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></section>; }
