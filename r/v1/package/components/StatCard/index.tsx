import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { Card, CardBody } from "../Card";
import { Statistic, type StatisticProps } from "../Statistic";
import "./styles.css";

export interface StatCardProps extends StatisticProps {
  icon?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

/**
 * Un indicateur, dans une carte.
 *
 * L'assemblage d'une `Card` et d'un `Statistic` — la forme qu'ils prennent
 * presque toujours ensemble, et qu'il serait fastidieux de recomposer à
 * chaque tableau de bord.
 */
export function StatCard({ icon, description, action, className, ...statisticProps }: StatCardProps) {
  return <Card className={cn("sia-stat-card", className)}><CardBody><div className="sia-stat-card__top">{icon && <span className="sia-stat-card__icon" aria-hidden="true">{icon}</span>}{action}</div><Statistic {...statisticProps} />{description && <div className="sia-stat-card__description">{description}</div>}</CardBody></Card>;
}
