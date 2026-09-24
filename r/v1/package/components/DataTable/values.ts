import type { ReactNode } from "react";
import type { DataTableColumn } from "./types";

/**
 * Lire une colonne.
 *
 * Tenu à part du tableau parce que trois endroits en ont besoin : le tableau
 * lui-même, la carte, et la vue de détail de `CrudPage`. Recopié, ce petit
 * morceau se serait mis à diverger — la vue de détail aurait ignoré les
 * `accessor` calculés, et personne ne l'aurait remarqué avant de voir une
 * ligne vide dans un modal.
 */
export function valeurDe<T>(row: T, column: DataTableColumn<T>): unknown {
  if (typeof column.accessor === "function") return column.accessor(row);
  if (column.accessor !== undefined) return row[column.accessor];
  return (row as Record<string, unknown>)[column.key];
}

/** Ce qu'une cellule affiche : son rendu propre, ou sa valeur en texte. */
export function renduCellule<T>(
  row: T,
  index: number,
  column: DataTableColumn<T>,
): ReactNode {
  if (column.cell) return column.cell(row, index);
  const valeur = valeurDe(row, column);
  return valeur === null || valeur === undefined ? null : String(valeur);
}
