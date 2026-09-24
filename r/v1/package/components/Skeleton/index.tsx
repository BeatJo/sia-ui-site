import { type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: CSSProperties["borderRadius"];
  circle?: boolean;
}

/**
 * La forme de ce qui n'est pas encore là.
 *
 * Aux dimensions du contenu attendu, et non d'une taille générique : c'est
 * ce qui évite le sursaut de mise en page à l'arrivée des données, lequel
 * fait cliquer à côté.
 */
export function Skeleton({ className, width = "100%", height = "1rem", radius, circle, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("sia-skeleton", circle && "sia-skeleton--circle", className)}
      aria-hidden="true"
      style={{ width, height, borderRadius: circle ? "9999px" : radius, ...style }}
      {...props}
    />
  );
}
