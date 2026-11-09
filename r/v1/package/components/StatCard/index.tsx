import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { Card, CardBody, type CardBodyProps, type CardProps } from "../Card";
import { Statistic, type StatisticProps } from "../Statistic";
import "./styles.css";

export interface StatCardProps extends StatisticProps {
  icon?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  /**
   * Les props de la `Card` qui entoure l'indicateur — un `id`, un
   * `aria-label`, un gestionnaire de clic. Sans `children` : le contenu est
   * celui de l'indicateur. `className` s'ajoute à celui de la carte.
   */
  cardProps?: Partial<Omit<CardProps, "children">>;
  /** Les props du `CardBody`, sans `children`, rempli par l'indicateur. */
  cardBodyProps?: Partial<Omit<CardBodyProps, "children">>;
}

/**
 * Un indicateur, dans une carte.
 *
 * L'assemblage d'une `Card` et d'un `Statistic` — la forme qu'ils prennent
 * presque toujours ensemble, et qu'il serait fastidieux de recomposer à
 * chaque tableau de bord.
 */
export function StatCard({ icon, description, action, className, cardProps, cardBodyProps, ...statisticProps }: StatCardProps) {
  return <Card {...cardProps} className={cn("sia-stat-card", className, cardProps?.className)}><CardBody {...cardBodyProps}><div className="sia-stat-card__top">{icon && <span className="sia-stat-card__icon" aria-hidden="true">{icon}</span>}{action}</div><Statistic {...statisticProps} />{description && <div className="sia-stat-card__description">{description}</div>}</CardBody></Card>;
}
