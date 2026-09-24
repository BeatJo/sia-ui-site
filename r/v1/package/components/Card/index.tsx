import { type HTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

/**
 * Une surface qui regroupe ce qui va ensemble.
 *
 * Quatre parties séparées — `Card`, `CardHeader`, `CardBody`, `CardFooter` —
 * plutôt que des props `title` et `footer` : dès qu'un en-tête doit porter
 * deux boutons et une pastille, une prop ne suffit plus, et l'on se retrouve
 * à passer du JSX à travers une chaîne.
 */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn("sia-card", className)} {...props} />; }
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn("sia-card__header", className)} {...props} />; }
export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn("sia-card__body", className)} {...props} />; }
export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn("sia-card__footer", className)} {...props} />; }
