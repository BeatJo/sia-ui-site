import { createContext } from "react";

/**
 * Ce que les sous-composants du tiroir ont besoin de savoir.
 *
 * Déclaré ici plutôt que dans un dossier `contexts/` partagé : le registre ne
 * copie que `components/<Nom>/`, et un import hors de ce dossier rendait
 * l'entrée `drawer` impossible à installer.
 */
export type DrawerContextValue = {
  close: () => void;
};

export const DrawerContext = createContext<DrawerContextValue | null>(null);
