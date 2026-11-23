import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface AspectRatioProps {
  /** Le rapport largeur / hauteur. `16 / 9`, `1`, `4 / 3`. */
  ratio?: number;
  children: ReactNode;
  className?: string;
}

/**
 * Une boîte au rapport imposé.
 *
 * Elle existe pour une seule raison : réserver la place avant que l'image ou
 * l'iframe n'arrive. Sans elle, le contenu qui suit saute au chargement — ce
 * que mesure le Cumulative Layout Shift, et ce que les gens ressentent comme
 * une page qui bouge sous le doigt.
 */
export function AspectRatio({ ratio = 16 / 9, children, className }: AspectRatioProps) {
  return (
    <div
      className={cn("sia-aspect-ratio", className)}
      style={{ "--sia-aspect": String(ratio) } as CSSProperties}
    >
      {children}
    </div>
  );
}
