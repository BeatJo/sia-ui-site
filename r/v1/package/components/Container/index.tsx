import { type HTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

/**
 * La largeur de lecture, et l'espacement vertical.
 *
 * Deux réglages posés une fois pour toutes plutôt qu'une marge inventée
 * écran par écran : des largeurs décidées page après page finissent par
 * diverger, et personne ne sait plus laquelle fait foi.
 */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sia-container", className)} {...props} />;
}

export function Stack({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sia-stack", className)} {...props} />;
}
