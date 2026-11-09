import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
}

/**
 * Ce qu'on montre quand il n'y a rien.
 *
 * Une liste vide sans explication ressemble à un chargement bloqué. Elle
 * porte donc une action : le vide initial est le meilleur moment pour
 * proposer de créer le premier élément.
 */
export function EmptyState({ icon, title, description, action, compact, className }: EmptyStateProps) {
  return (
    <section className={cn("sia-empty-state", compact && "sia-empty-state--compact", className)}>
      {icon && <div className="sia-empty-state__icon" aria-hidden="true">{icon}</div>}
      <strong className="sia-empty-state__title">{title}</strong>
      {description && <p className="sia-empty-state__description">{description}</p>}
      {action && <div className="sia-empty-state__action">{action}</div>}
    </section>
  );
}
