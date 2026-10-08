import { type HTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import "./styles.css";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Un titre.
 *
 * Le niveau et la taille sont deux props distinctes : le niveau dit la
 * place dans la hiérarchie du document, la taille ce qu'on voit. Les lier
 * forcerait à sauter un niveau pour obtenir un titre plus petit — et à
 * casser le parcours au lecteur d'écran.
 */
export function Heading({ level = 2, size = "lg", className, ...props }: HeadingProps) {
  const Component = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return <Component className={cn("sia-heading", `sia-heading--${size}`, className)} {...props} />;
}

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  tone?: ComponentTone;
  size?: "sm" | "md" | "lg";
}

export function Text({ tone = "neutral", size = "md", className, ...props }: TextProps) {
  return <p className={cn("sia-text", `sia-text--${tone}`, `sia-text--${size}`, className)} {...props} />;
}

export function InlineCode({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <code className={cn("sia-inline-code", className)} {...props} />;
}
