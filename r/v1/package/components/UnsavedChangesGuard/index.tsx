import { useEffect } from "react";
export interface UnsavedChangesGuardProps { when: boolean; message?: string; }
/**
 * L'avertissement avant de quitter une saisie en cours.
 *
 * Le navigateur n'autorise cette interruption que sur un geste explicite de
 * quitter, et impose son propre libellé : le message passé ici sert à la
 * confirmation interne, que `confirmUnsavedNavigation` déclenche avant une
 * navigation du routeur.
 */
export function UnsavedChangesGuard({ when, message = "Des modifications non enregistrées seront perdues." }: UnsavedChangesGuardProps) { useEffect(() => { if (!when) return; const handler = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = message; return message; }; window.addEventListener("beforeunload", handler); return () => window.removeEventListener("beforeunload", handler); }, [when, message]); return null; }
export function confirmUnsavedNavigation(when: boolean, message = "Des modifications non enregistrées seront perdues.") { return !when || window.confirm(message); }
