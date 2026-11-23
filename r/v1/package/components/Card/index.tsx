import { type HTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

/*
  Les quatre parties ne sont que des `div` : ces alias ne changent rien au
  typage, ils donnent un nom aux props qu'un composant composé laisse passer
  (`cardBodyProps?: Partial<CardBodyProps>`).
*/
export type CardProps = HTMLAttributes<HTMLDivElement>;
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export type CardBodyProps = HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * Une surface qui regroupe ce qui va ensemble.
 *
 * Quatre parties séparées — `Card`, `CardHeader`, `CardBody`, `CardFooter` —
 * plutôt que des props `title` et `footer` : dès qu'un en-tête doit porter
 * deux boutons et une pastille, une prop ne suffit plus, et l'on se retrouve
 * à passer du JSX à travers une chaîne.
 */
export function Card({ className, ...props }: CardProps) { return <div className={cn("sia-card", className)} {...props} />; }
export function CardHeader({ className, ...props }: CardHeaderProps) { return <div className={cn("sia-card__header", className)} {...props} />; }
export function CardBody({ className, ...props }: CardBodyProps) { return <div className={cn("sia-card__body", className)} {...props} />; }
export function CardFooter({ className, ...props }: CardFooterProps) { return <div className={cn("sia-card__footer", className)} {...props} />; }
