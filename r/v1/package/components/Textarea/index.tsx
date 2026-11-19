import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

/**
 * La saisie de plusieurs lignes.
 *
 * Elle garde la hauteur qu'on lui donne : un redimensionnement automatique
 * fait sauter la page à chaque retour à la ligne, et déplace ce qu'on
 * s'apprêtait à cliquer.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, resize = "vertical", ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("sia-textarea", invalid && "sia-textarea--invalid", `sia-textarea--resize-${resize}`, className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
