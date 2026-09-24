import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn, toneClass } from "@sia-ui/utils";
import { Spinner, type SpinnerProps } from "../Spinner";
import type { ComponentTone } from "@sia-ui/tokens";
import { useComponentDefaults } from "@sia-ui/headless";
import "./styles.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  spinnerProps?: Omit<SpinnerProps, "label">;
  variant?: "solid" | "outline" | "ghost" | "underline";
  tone?: ComponentTone;
  inputSize?: "sm" | "md" | "lg";
  radius?: "default" | "none" | "sm" | "lg" | "full";
}

/**
 * La saisie d'une ligne de texte.
 *
 * `left` et `right` accueillent ce qui accompagne la valeur — une unité,
 * une icône de recherche, un bouton de réinitialisation — à l'intérieur du
 * cadre. Posés à côté, ils s'en désalignent dès que la taille change.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      invalid,
      left,
      right,
      loading = false,
      loadingLabel: loadingLabelProp,
      spinnerProps,
      id: providedId,
      variant = "outline",
      tone = "neutral",
      inputSize = "md",
      radius = "default",
      ...props
    },
    ref,
  ) => {
    const defaults = useComponentDefaults<InputProps>("input");
    const loadingLabel = loadingLabelProp ?? defaults.loadingLabel ?? "Chargement";
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const decorated = Boolean(left || right || loading);
    const visualClasses = [
      `sia-input--${variant}`,
      `sia-input--${inputSize}`,
      `sia-radius--${radius}`,
      toneClass("sia-tone", tone),
    ];
    const input = (
      <input
        ref={ref}
        id={id}
        className={cn(
          "sia-input",
          ...visualClasses,
          decorated && "sia-input--embedded",
          invalid && "sia-input--invalid",
          className,
        )}
        aria-invalid={invalid || undefined}
        aria-busy={loading || undefined}
        {...props}
      />
    );

    if (!decorated) return input;

    return (
      <span
        className={cn(
          "sia-input-wrapper",
          ...visualClasses,
          invalid && "sia-input-wrapper--invalid",
          loading && "sia-input-wrapper--loading",
        )}
      >
        {loading ? (
          <span className="sia-input-wrapper__left">
            <Spinner
              size="sm"
              tone="current"
              {...spinnerProps}
              label={loadingLabel}
            />
          </span>
        ) : (
          left && <span className="sia-input-wrapper__left">{left}</span>
        )}
        {input}
        {right && <span className="sia-input-wrapper__right">{right}</span>}
      </span>
    );
  },
);

Input.displayName = "Input";
