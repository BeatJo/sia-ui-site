import { useEffect, useRef, useState } from "react";
import { cn } from "@sia-ui/utils";
import { useSliderState, type SliderValue } from "@sia-ui/headless";

export type { SliderValue };
export type SliderRangeValue = [number, number];

export interface SliderProps {
  /** Nom du champ, quand le slider est posé dans un formulaire. */
  name?: string | undefined;
  /** Mode contrôlé. Laisser vide pour un slider non contrôlé. */
  value?: SliderValue | undefined;
  /** Valeur de départ en mode non contrôlé. */
  defaultValue?: SliderValue | undefined;
  min?: number | undefined;
  max?: number | undefined;
  step?: number | undefined;
  range?: boolean | undefined;
  onChange?: ((value: SliderValue) => void) | undefined;
  /**
   * Alias de `onChange`, tel que l'attendaient les composants du registre.
   * Les deux sont appelés.
   */
  onValueChange?: ((value: SliderValue) => void) | undefined;
  /** Écart minimal entre les deux poignées, en mode plage. */
  minDistance?: number | undefined;
  /** Affiche la valeur courante à côté de la piste. */
  showValue?: boolean | undefined;
  /** Rendu de la valeur affichée — devise, unité, arrondi. */
  formatValue?: ((value: number) => string) | undefined;
  /** Libellé de la poignée basse, annoncé aux lecteurs d'écran. */
  startLabel?: string | undefined;
  /** Libellé de la poignée haute, en mode plage. */
  endLabel?: string | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
}
import { Tooltip } from "../Tooltip";
import "./styles.css";

/**
 * Rendu DOM du slider.
 *
 * Tout le calcul — pas, bornes, pourcentages, poignée la plus proche,
 * non-croisement — vit dans `useSliderState`. Ce fichier ne garde que ce qui
 * est propre au web : la mesure de la piste, les événements souris et le JSX.
 */
export function Slider({
  name,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  range = false,
  minDistance = 0,
  showValue = false,
  formatValue,
  startLabel,
  endLabel,
  onChange,
  onValueChange,
  disabled,
  className,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);

  // `onValueChange` est le nom qu'employaient les composants du registre.
  // Les deux sont notifiés plutôt que d'imposer un renommage à l'appelant.
  const notify = (next: SliderValue) => {
    onChange?.(next);
    onValueChange?.(next);
  };

  const slider = useSliderState({
    value,
    defaultValue,
    min,
    max,
    step,
    range,
    minDistance,
    onChange: notify,
  });

  /** Le seul pont entre le pointeur et la logique : un ratio de 0 à 1. */
  const valueFromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return slider.values[0] ?? min;
    return slider.valueAt((clientX - rect.left) / rect.width);
  };

  useEffect(() => {
    if (activeThumb === null) return undefined;

    const onMove = (event: MouseEvent) => {
      slider.moveThumb(activeThumb, valueFromClientX(event.clientX));
    };
    const onUp = () => setActiveThumb(null);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  });

  const onTrackDown = (event: React.MouseEvent) => {
    if (disabled) return;

    const next = valueFromClientX(event.clientX);
    const thumb = slider.nearestThumb(next);

    setActiveThumb(thumb);
    slider.moveThumb(thumb, next);
  };

  const [first = 0, second = 0] = slider.percents;

  return (
    <div
      className={cn("sia-slider", className, disabled && "is-disabled")}
      data-name={name}
    >
      <div ref={trackRef} className="sia-slider-track" onMouseDown={onTrackDown}>
        <div
          className="sia-slider-range"
          style={
            range
              ? { left: `${first}%`, width: `${second - first}%` }
              : { width: `${first}%` }
          }
        />
      </div>

      {showValue && (
        <span className="sia-slider-value">
          {slider.values
            .map((one) => (formatValue ? formatValue(one) : String(one)))
            .join(" – ")}
        </span>
      )}

      {slider.values.map((one, index) => (
        <Thumb
          key={index}
          percent={slider.percents[index] ?? 0}
          value={one}
          label={formatValue ? formatValue(one) : String(one)}
          name={(index === 0 ? startLabel : endLabel) ?? `Valeur ${index + 1}`}
          disabled={disabled}
          onGrab={() => {
            if (!disabled) setActiveThumb(index);
          }}
        />
      ))}
    </div>
  );
}

function Thumb({
  percent,
  value,
  label,
  name,
  disabled,
  onGrab,
}: {
  percent: number;
  value: number;
  label: string;
  name: string;
  disabled?: boolean | undefined;
  onGrab: () => void;
}) {
  return (
    <Tooltip content={label} placement="top">
      <span
        role="slider"
        aria-valuenow={value}
        aria-label={name}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        className="sia-slider-thumb"
        style={{ left: `${percent}%` }}
        onMouseDown={onGrab}
      />
    </Tooltip>
  );
}
