import { type HTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

/**
 * Un trait entre deux choses.
 *
 * `decorative` décide s'il compte pour un lecteur d'écran. Un trait qui
 * sépare deux groupes de sens est une information; un trait qui aère ne
 * l'est pas, et l'annoncer ajoute du bruit à chaque parcours.
 */
export function Divider({ orientation = "horizontal", decorative = true, className, ...props }: DividerProps) {
  return <div className={cn("sia-divider", `sia-divider--${orientation}`, className)} role={decorative ? "presentation" : "separator"} aria-orientation={decorative ? undefined : orientation} {...props} />;
}
