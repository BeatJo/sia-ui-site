import * as React from "react";
import { cn } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import "./styles.css";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Le ton du libellé. Par défaut, la couleur du texte courant. */
  tone?: ComponentTone;
  /** Marque le champ comme obligatoire d'une astérisque. */
  required?: boolean;
  /** Atténue le libellé — une mention secondaire, une unité. */
  muted?: boolean;
}

/** Alias historique, attendu par les composants venus du registre. */
export type ILabelProps = LabelProps;

/**
 * Le nom d'un champ.
 *
 * L'astérisque d'obligation est portée par une prop plutôt qu'écrite dans
 * le texte : elle reçoit ainsi un `aria-hidden`, et le champ est annoncé
 * « obligatoire » plutôt que « nom étoile ».
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, muted, tone, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "sia-label",
          muted && "sia-label--muted",
          tone && `sia-label--${tone}`,
          className,
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="sia-label__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = "SiaLabel";
