import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import "./styles.css";

export interface TimelineItem { key: string; title: ReactNode; description?: ReactNode; time?: ReactNode; tone?: ComponentTone; }
export interface TimelineProps { items: TimelineItem[]; pending?: ReactNode; className?: string; }
/**
 * Une suite d'événements, dans l'ordre.
 *
 * Le ton porte le sens de chaque étape : une chronologie de paiement se lit
 * d'abord par ses couleurs — ce qui a abouti, ce qui a échoué — avant qu'on
 * en lise les libellés.
 */
export function Timeline({ items, pending, className }: TimelineProps) { return <ol className={cn("sia-timeline", className)}>{items.map((item) => <li key={item.key} className={`sia-timeline__item sia-timeline__item--${item.tone ?? "primary"}`}><span className="sia-timeline__dot" /><div><strong>{item.title}</strong>{item.description && <p>{item.description}</p>}{item.time && <small>{item.time}</small>}</div></li>)}{pending && <li className="sia-timeline__item sia-timeline__item--pending"><span className="sia-timeline__dot" /><div>{pending}</div></li>}</ol>; }
