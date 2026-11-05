import { forwardRef, useMemo, useState } from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale, type PasswordInputMessages } from "@sia-ui/headless";
import { Input, type InputProps } from "../Input";
import { EyeIcon, EyeOffIcon } from "../Icons";
import "./styles.css";

export interface PasswordStrength {
  /** De 0 à 4. */
  score: number;
  label: string;
}

export interface PasswordInputProps extends Omit<InputProps, "type" | "right"> {
  /** Affiche une jauge sous le champ. */
  showStrength?: boolean;
  /** Retire le bouton d'affichage — pour un champ de confirmation. */
  hideToggle?: boolean;
  /**
   * Remplace l'évaluation par défaut. Un projet qui utilise `zxcvbn` branche
   * son résultat ici; le composant ne dépend de rien. Les libellés de
   * l'évaluation par défaut viennent de la locale (`passwordInput`).
   */
  evaluate?: (value: string) => PasswordStrength;
}

/**
 * L'évaluation par défaut : longueur et variété.
 *
 * Elle ne prétend pas mesurer une entropie réelle — c'est le travail de
 * `zxcvbn`, qui pèse 800 ko. Elle décourage les mots de passe visiblement
 * courts, ce qui est déjà l'essentiel du gain.
 */
function defaultEvaluate(
  value: string,
  messages: PasswordInputMessages,
): PasswordStrength {
  if (!value) return { score: 0, label: "" };

  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value) && /[^\w\s]/.test(value)) score += 1;

  const labels = [
    messages.strengthVeryWeak,
    messages.strengthWeak,
    messages.strengthFair,
    messages.strengthGood,
    messages.strengthExcellent,
  ];
  return { score, label: labels[score] ?? "" };
}

/**
 * Un champ de mot de passe.
 *
 * Le bouton d'affichage n'est pas un confort : sur mobile, taper une phrase
 * de passe à l'aveugle est la première raison pour laquelle les gens en
 * choisissent une courte.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      showStrength = false,
      hideToggle = false,
      evaluate,
      className,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const locale = useSiaLocale();
    const [visible, setVisible] = useState(false);
    const [internal, setInternal] = useState("");
    const current = value !== undefined ? String(value) : internal;

    const strength = useMemo(
      () =>
        showStrength
          ? evaluate
            ? evaluate(current)
            : defaultEvaluate(current, locale.passwordInput)
          : null,
      [current, evaluate, locale.passwordInput, showStrength],
    );

    return (
      <div className={cn("sia-password", className)}>
        <Input
          {...props}
          ref={ref}
          type={visible ? "text" : "password"}
          {...(value !== undefined ? { value } : {})}
          onChange={(event) => {
            if (value === undefined) setInternal(event.target.value);
            onChange?.(event);
          }}
          right={
            hideToggle ? undefined : (
              <button
                type="button"
                className="sia-password__toggle"
                // Hors du parcours de tabulation : entre le champ et le
                // bouton d'envoi, personne n'attend une étape de plus.
                tabIndex={-1}
                aria-label={
                  visible ? locale.hidePassword : locale.showPassword
                }
                aria-pressed={visible}
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            )
          }
        />

        {strength && current && (
          <div className="sia-password__strength" data-score={strength.score}>
            <div className="sia-password__bars" aria-hidden="true">
              {[0, 1, 2, 3].map((index) => (
                <span key={index} data-filled={index < strength.score || undefined} />
              ))}
            </div>
            <span className="sia-password__label" role="status">
              {strength.label}
            </span>
          </div>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
