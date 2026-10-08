import { useMemo } from "react";
import {
  useTableQuery,
  type TableParamsMapping,
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

/**
 * Ce que l'adaptateur demande d'un routeur : la forme du `router` de
 * TanStack Router, sans en dépendre. Méthodes écrites en syntaxe de méthode :
 * leurs paramètres se comparent alors de façon bivariante, et le routeur typé
 * de l'application s'y passe sans transtypage.
 */
export interface TanStackRouterLike {
  state: { location: { search: object } };
  navigate(options: {
    to: string;
    search: Record<string, unknown>;
    replace: boolean;
  }): unknown;
  subscribe(event: "onResolved", listener: () => void): () => void;
}

/** `"2"` → `2`, mais jamais `"007"`, `"1e5"` ni `""` : la conversion est sans perte. */
function nombreCanonique(valeur: string): string | number {
  const nombre = Number(valeur);
  return valeur !== "" && Number.isFinite(nombre) && String(nombre) === valeur
    ? nombre
    : valeur;
}

/**
 * L'état du tableau dans les paramètres de TanStack Router.
 *
 * Deux pièges de la recette qu'on écrivait à la main :
 *
 * - TanStack Router sérialise les paramètres en JSON. Une chaîne qui a l'air
 *   d'un nombre y est mise entre guillemets — `page=2` devenait
 *   `page=%222%22`. L'adaptateur passe donc de vrais nombres ; les autres
 *   valeurs restent des chaînes, que le routeur relit à l'identique.
 * - La lecture part de l'objet déjà décodé par le routeur, jamais de la chaîne
 *   brute, qui porte ces guillemets.
 *
 * Les paramètres étrangers au tableau sont gardés par `useTableQuery`, qui
 * n'écrit que ses propres clés.
 */
export function createTanStackRouterStorage(
  router: TanStackRouterLike,
  mode: "replace" | "push" = "replace",
): TableQueryStorage {
  return {
    read: () => {
      const params = new URLSearchParams();
      for (const [cle, valeur] of Object.entries(router.state.location.search)) {
        if (valeur === undefined || valeur === null) continue;
        for (const v of Array.isArray(valeur) ? valeur : [valeur]) {
          params.append(cle, typeof v === "object" ? JSON.stringify(v) : String(v));
        }
      }
      return params.toString();
    },
    write: (value) => {
      const search: Record<string, unknown> = {};
      for (const [cle, brut] of new URLSearchParams(value)) {
        const valeur = nombreCanonique(brut);
        const deja = search[cle];
        search[cle] =
          deja === undefined ? valeur : [...(Array.isArray(deja) ? deja : [deja]), valeur];
      }
      router.navigate({ to: ".", search, replace: mode === "replace" });
    },
    subscribe: (listener) => router.subscribe("onResolved", listener),
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
  /**
   * Un autre endroit où ranger l'état — le plus souvent le routeur.
   *
   * La barre d'adresse écrite directement passe sous le nez d'un routeur qui
   * tient ses propres paramètres (TanStack Router, React Router) : il ne voit
   * pas le changement, et le réécrit au prochain rendu. Fourni, ce stockage
   * remplace celui de l'URL, et `syncUrl` / `history` sont ignorés.
   */
  storage?: TableQueryStorage;
  /**
   * Le routeur TanStack Router de l'application. Raccourci de
   * `storage: createTanStackRouterStorage(router)` ; `history` s'applique.
   */
  router?: TanStackRouterLike;
  /** Les noms des paramètres serveur — `limit`, `sort` + `order`… */
  serverParams?: TableParamsMapping;
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
  const {
    defaultState,
    syncUrl = true,
    history = "replace",
    prefix,
    storage: fourni,
    router,
    serverParams,
  } = options;

  // Créé une fois : un objet reconstruit à chaque rendu réabonnerait
  // l'écouteur `popstate` en boucle.
  const storage = useMemo(
    () =>
      fourni ??
      (router
        ? createTanStackRouterStorage(router, history)
        : syncUrl
          ? createUrlTableStorage(history)
          : undefined),
    [fourni, history, router, syncUrl],
  );

  return useTableQuery({
    ...(defaultState ? { defaultState } : {}),
    ...(storage ? { storage } : {}),
    ...(prefix ? { prefix } : {}),
    ...(serverParams ? { serverParams } : {}),
  });
}
