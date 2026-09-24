import { useState } from "react";
import { cn } from "@sia-ui/utils";
import { StarIcon } from "../Icons";
import "./styles.css";
export interface RatingProps {
  id?: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  /** Autorise les demi-valeurs — 3,5 sur 5. */
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
}
/**
 * Une note, en étoiles.
 *
 * `allowClear` rend la note réversible : sans lui, cliquer une étoile par
 * erreur est définitif, puisqu'aucune étoile ne vaut « aucune note ».
 */
export function Rating({
  id,
  value,
  defaultValue = 0,
  onValueChange,
  max = 5,
  allowHalf = false,
  allowClear = true,
  disabled,
  label = "Note",
  className,
  ...ariaProps
}: RatingProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const update = (next: number) => {
    const resolved = allowClear && next === current ? 0 : next;
    if (value === undefined) setInternal(resolved);
    onValueChange?.(resolved);
  };
  return (
    <div
      id={id}
      role="radiogroup"
      aria-label={label}
      className={cn("sia-rating", className)}
      {...ariaProps}
    >
      {Array.from({ length: max }, (_, index) => index + 1).map((item) => {
        // Part remplie de CETTE étoile : pleine, vide, ou entre les deux.
        // Impossible avec un caractère — d'où le passage au tracé.
        const filled = Math.min(1, Math.max(0, current - item + 1));

        return (
          <button
            key={item}
            type="button"
            role="radio"
            aria-checked={current === item}
            aria-label={`${item} sur ${max}`}
            disabled={disabled}
            className={filled > 0 ? "is-active" : ""}
            style={{ "--sia-rating-fill": `${filled * 100}%` } as React.CSSProperties}
            onClick={(event) => {
              if (!allowHalf) return update(item);
              // Moitié gauche du bouton = demi-étoile.
              const box = event.currentTarget.getBoundingClientRect();
              const half = event.clientX - box.left < box.width / 2;
              update(half ? item - 0.5 : item);
            }}
          >
            <span className="sia-rating__star" aria-hidden="true">
              <StarIcon className="sia-rating__outline" />
              <StarIcon className="sia-rating__fill" fill="currentColor" />
            </span>
          </button>
        );
      })}
    </div>
  );
}
