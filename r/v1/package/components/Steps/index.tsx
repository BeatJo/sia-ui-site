import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { AlertCircleIcon, CheckIcon } from "../Icons";
import "./styles.css";

export type StepStatus = "done" | "current" | "upcoming" | "error";

export interface StepItem {
  key: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  /** Forcé au besoin; sinon déduit de `current`. */
  status?: StepStatus;
  disabled?: boolean;
}

export interface StepsProps {
  items: StepItem[];
  /** Index de l'étape en cours. Ce qui précède est fait, ce qui suit à venir. */
  current?: number;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md";
  /** Rend les étapes cliquables — pour revenir en arrière dans un tunnel. */
  onStepClick?: (item: StepItem, index: number) => void;
  className?: string;
}

function statusOf(item: StepItem, index: number, current: number): StepStatus {
  if (item.status) return item.status;
  if (index < current) return "done";
  if (index === current) return "current";
  return "upcoming";
}

/**
 * Une progression en étapes.
 *
 * Le trait entre deux étapes se remplit plutôt que de changer de couleur d'un
 * coup : c'est ce qui donne le sens de la marche, vers l'avant.
 */
export function Steps({
  items,
  current = 0,
  orientation = "horizontal",
  size = "md",
  onStepClick,
  className,
}: StepsProps) {
  return (
    <ol
      className={cn(
        "sia-steps",
        `sia-steps--${orientation}`,
        `sia-steps--${size}`,
        className,
      )}
    >
      {items.map((item, index) => {
        const status = statusOf(item, index, current);
        const clickable = Boolean(onStepClick) && !item.disabled;

        return (
          <li
            key={item.key}
            className="sia-steps__item"
            data-status={status}
            {...(status === "current" ? { "aria-current": "step" as const } : {})}
          >
            <div className="sia-steps__marker">
              <span className="sia-steps__bullet">
                {status === "done" ? (
                  <CheckIcon />
                ) : status === "error" ? (
                  <AlertCircleIcon />
                ) : (
                  (item.icon ?? <span className="sia-steps__number">{index + 1}</span>)
                )}
              </span>
              {index < items.length - 1 && (
                <span className="sia-steps__connector" aria-hidden="true">
                  <span className="sia-steps__connector-fill" />
                </span>
              )}
            </div>

            <div className="sia-steps__body">
              {clickable ? (
                <button
                  type="button"
                  className="sia-steps__title sia-steps__title--button"
                  onClick={() => onStepClick?.(item, index)}
                >
                  {item.title}
                </button>
              ) : (
                <span className="sia-steps__title">{item.title}</span>
              )}
              {item.description && (
                <span className="sia-steps__description">{item.description}</span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
