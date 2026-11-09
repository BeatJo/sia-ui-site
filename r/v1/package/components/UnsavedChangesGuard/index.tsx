import { useEffect } from "react";
import { FRENCH, useSiaLocale } from "@sia-ui/headless";
export interface UnsavedChangesGuardProps {
  when: boolean;
  /** Le message de la confirmation. Par défaut, `unsavedChangesGuard.message` de la locale. */
  message?: string;
}
/**
 * L'avertissement avant de quitter une saisie en cours.
 *
 * Le navigateur n'autorise cette interruption que sur un geste explicite de
 * quitter, et impose son propre libellé : le message passé ici sert à la
 * confirmation interne, que `confirmUnsavedNavigation` déclenche avant une
 * navigation du routeur.
 */
export function UnsavedChangesGuard({ when, message: messageProp }: UnsavedChangesGuardProps) {
  const locale = useSiaLocale();
  const message = messageProp ?? locale.unsavedChangesGuard.message;
  useEffect(() => {
    if (!when) return;
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [when, message]);
  return null;
}
/**
 * La confirmation avant une navigation du routeur.
 *
 * Hors d'un composant, la locale n'est pas lisible : passer
 * `locale.unsavedChangesGuard.message` (lu avec `useSiaLocale()`) pour un
 * message dans la langue de l'application. À défaut, le message français.
 */
export function confirmUnsavedNavigation(
  when: boolean,
  message: string = FRENCH.unsavedChangesGuard.message,
) {
  return !when || window.confirm(message);
}
