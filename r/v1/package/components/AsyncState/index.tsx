import { type ReactNode } from "react";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { EmptyState } from "../EmptyState";
import "./styles.css";

export interface AsyncStateProps {
  loading?: boolean;
  error?: ReactNode;
  empty?: boolean;
  emptyTitle?: ReactNode;
  emptyDescription?: ReactNode;
  onRetry?: () => void;
  children: ReactNode;
}

/**
 * Les trois états d'un chargement, au même endroit.
 *
 * En attente, en erreur, ou vide : ce sont les mêmes trois cas à chaque
 * écran, et les écrire à la main en oublie toujours un — le plus souvent le
 * vide, qui ressemble à un chargement qui n'en finit pas.
 */
export function AsyncState({ loading, error, empty, emptyTitle = "No data", emptyDescription, onRetry, children }: AsyncStateProps) {
  if (loading) return <div className="sia-async-state" role="status"><span className="sia-spinner" /><span>Loading...</span></div>;
  if (error) return <Alert tone="danger" title="Unable to load data" action={onRetry && <Button variant="outline" onClick={onRetry}>Retry</Button>}>{error}</Alert>;
  if (empty) return <EmptyState compact title={emptyTitle} description={emptyDescription} />;
  return <>{children}</>;
}
