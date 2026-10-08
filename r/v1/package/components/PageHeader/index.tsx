import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  /**
   * Le niveau du titre. `1` — le défaut — pour l'en-tête d'un écran.
   *
   * `2` ou `3` pour une section dans un écran qui a déjà son `<h1>` : la
   * liste des environnements dans la fiche d'un projet. Le titre y est plus
   * petit et l'espace sous l'en-tête plus court.
   */
  level?: 1 | 2 | 3;
  className?: string;
}

/**
 * Le titre d'un écran, et ses actions.
 *
 * Un seul `<h1>` par page, rendu ici : la hiérarchie des titres est ce qui
 * permet de parcourir un écran au lecteur d'écran, et deux `<h1>` la
 * cassent sans que rien ne se voie. Une section imbriquée passe donc
 * `level={2}`.
 */
export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  level = 1,
  className,
}: PageHeaderProps) {
  const Titre = `h${level}` as const;

  return (
    <header
      className={cn(
        "sia-page-header",
        level > 1 && "sia-page-header--section",
        className,
      )}
    >
      <div className="sia-page-header__content">
        {eyebrow && <div className="sia-page-header__eyebrow">{eyebrow}</div>}
        <Titre className="sia-page-header__title">{title}</Titre>
        {description && <p className="sia-page-header__description">{description}</p>}
      </div>
      {actions && <div className="sia-page-header__actions">{actions}</div>}
    </header>
  );
}
