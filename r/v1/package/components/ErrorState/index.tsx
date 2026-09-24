import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { Button } from "../Button";
import { useSiaLocale } from "@sia-ui/headless";
import "./styles.css";

export interface ErrorStateProps {
  title?: ReactNode;
  description?: ReactNode;
  error?: unknown;
  action?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  compact?: boolean;
  className?: string;
}

function getErrorMessage(error: unknown): string | undefined {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return undefined;
}

/**
 * Un échec, et de quoi en sortir.
 *
 * `error` accepte n'importe quoi : une `Error`, une réponse HTTP, une
 * chaîne. Ce qui arrive d'un appel réseau n'a pas de forme garantie, et
 * exiger un type ferait écrire un `try` autour de chaque affichage
 * d'erreur.
 */
export function ErrorState({ title: titleProp, description, error, action, onRetry, retryLabel: retryLabelProp, compact, className }: ErrorStateProps) {
    const locale = useSiaLocale();
    const retryLabel = retryLabelProp ?? locale.retry;
    const title = titleProp ?? locale.error;
  const message = description ?? getErrorMessage(error);
  return <section className={cn("sia-error-state", compact && "sia-error-state--compact", className)} role="alert"><div className="sia-error-state__icon" aria-hidden="true">!</div><strong className="sia-error-state__title">{title}</strong>{message && <p className="sia-error-state__description">{message}</p>}<div className="sia-error-state__actions">{action}{onRetry && <Button variant="outline" onClick={onRetry}>{retryLabel}</Button>}</div></section>;
}
