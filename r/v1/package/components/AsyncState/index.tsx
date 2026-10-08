import { type ReactNode } from "react";
import { useSiaLocale } from "@sia-ui/headless";
import { Alert, type AlertProps } from "../Alert";
import { Button, type ButtonProps } from "../Button";
import { EmptyState, type EmptyStateProps } from "../EmptyState";
import { Spinner, type SpinnerProps } from "../Spinner";
import "./styles.css";

export interface AsyncStateProps {
  loading?: boolean;
  error?: ReactNode;
  empty?: boolean;
  emptyTitle?: ReactNode;
  emptyDescription?: ReactNode;
  onRetry?: () => void;
  children: ReactNode;
  /**
   * Les props de l'`Alert` d'erreur — un autre titre, un autre ton. Sans
   * `children` : le message est `error`.
   */
  alertProps?: Partial<Omit<AlertProps, "children">>;
  /**
   * Les props du bouton « Réessayer ». Sans `onClick`, branché sur
   * `onRetry` : un bouton de reprise qui ne reprend rien serait pire que
   * pas de bouton.
   */
  retryButtonProps?: Partial<Omit<ButtonProps, "onClick">>;
  /** Les props de l'`EmptyState` — une icône, une action, la taille. */
  emptyStateProps?: Partial<EmptyStateProps>;
  /** Le témoin de chargement. Son libellé vient de la locale. */
  spinnerProps?: Partial<Omit<SpinnerProps, "label">>;
}

/**
 * Les trois états d'un chargement, au même endroit.
 *
 * En attente, en erreur, ou vide : ce sont les mêmes trois cas à chaque
 * écran, et les écrire à la main en oublie toujours un — le plus souvent le
 * vide, qui ressemble à un chargement qui n'en finit pas.
 */
export function AsyncState({ loading, error, empty, emptyTitle, emptyDescription, onRetry, children, alertProps, retryButtonProps, emptyStateProps, spinnerProps }: AsyncStateProps) {
  // Les libellés viennent de la locale, comme partout ailleurs : ils étaient
  // restés en anglais ici, seuls de toute la bibliothèque.
  const locale = useSiaLocale();
  // Le vrai `Spinner` : un `<span class="sia-spinner">` brut ignorait ses
  // réglages par défaut (`SiaProvider defaults.spinner`).
  if (loading) return <div className="sia-async-state" role="status"><Spinner size="sm" {...spinnerProps} label={locale.loading} /><span aria-hidden="true">{locale.loading}</span></div>;
  if (error) return <Alert tone="danger" title={locale.error} action={onRetry && <Button variant="outline" {...retryButtonProps} onClick={onRetry}>{retryButtonProps?.children ?? locale.retry}</Button>} {...alertProps}>{error}</Alert>;
  if (empty) return <EmptyState compact title={emptyTitle ?? locale.empty} description={emptyDescription} {...emptyStateProps} />;
  return <>{children}</>;
}
