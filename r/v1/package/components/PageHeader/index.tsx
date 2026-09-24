import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

/**
 * Le titre d'un écran, et ses actions.
 *
 * Un seul `<h1>` par page, rendu ici : la hiérarchie des titres est ce qui
 * permet de parcourir un écran au lecteur d'écran, et deux `<h1>` la
 * cassent sans que rien ne se voie.
 */
export function PageHeader({ title, description, eyebrow, actions, className }: PageHeaderProps) {
  return (
    <header className={cn("sia-page-header", className)}>
      <div className="sia-page-header__content">
        {eyebrow && <div className="sia-page-header__eyebrow">{eyebrow}</div>}
        <h1 className="sia-page-header__title">{title}</h1>
        {description && <p className="sia-page-header__description">{description}</p>}
      </div>
      {actions && <div className="sia-page-header__actions">{actions}</div>}
    </header>
  );
}
