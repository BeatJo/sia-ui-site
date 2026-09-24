import { useMemo } from "react";
import {
  useTableQuery,
  type TableQuery,
  type TableQueryState,
  type TableQueryStorage,
} from "@sia-ui/headless";

/**
 * L'état du tableau dans la barre d'adresse.
 *
 * `history.replaceState` plutôt que `pushState` : trier une colonne trois
 * fois de suite ne doit pas demander trois retours en arrière pour revenir
 * d'où l'on vient.
 */
export function createUrlTableStorage(
  mode: "replace" | "push" = "replace",
): TableQueryStorage {
  return {
    read: () => (typeof window === "undefined" ? "" : window.location.search),
    write: (value) => {
      if (typeof window === "undefined") return;
      const url = `${window.location.pathname}${value ? `?${value}` : ""}${window.location.hash}`;
      if (mode === "push") window.history.pushState(null, "", url);
      else window.history.replaceState(null, "", url);
    },
    subscribe: (listener) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("popstate", listener);
      return () => window.removeEventListener("popstate", listener);
    },
  };
}

export interface UseDataTableQueryOptions {
  defaultState?: Partial<TableQueryState>;
  /** `false` garde l'état en mémoire — utile dans une modale. */
  syncUrl?: boolean;
  /** Empile une entrée d'historique à chaque changement. */
  history?: "replace" | "push";
  /** Préfixe des clés, pour deux tableaux sur la même page. */
  prefix?: string;
}

/**
 * Tri, filtres et pagination d'un tableau, synchronisés avec l'URL.
 *
 * Le calcul vit dans `@sia-ui/headless`; il n'y a ici que le branchement sur
 * la barre d'adresse, qui est la seule partie propre au navigateur.
 */
export function useDataTableQuery(
  options: UseDataTableQueryOptions = {},
): TableQuery {
  const { defaultState, syncUrl = true, history = "replace", prefix } = options;

  // Créé une fois : un objet reconstruit à chaque rendu réabonnerait
  // l'écouteur `popstate` en boucle.
  const storage = useMemo(
    () => (syncUrl ? createUrlTableStorage(history) : undefined),
    [history, syncUrl],
  );

  return useTableQuery({
    ...(defaultState ? { defaultState } : {}),
    ...(storage ? { storage } : {}),
    ...(prefix ? { prefix } : {}),
  });
}
