import { useCallback, useMemo, useState, type Key, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import { useMediaQuery } from "@sia-ui/react";
import { Checkbox } from "../Checkbox";
import { SearchInput } from "../SearchInput";
import { Skeleton } from "../Skeleton";
import { EmptyState } from "../EmptyState";
import { ErrorState } from "../ErrorState";
import { ChevronDownIcon, ChevronUpIcon } from "../Icons";
import { RowActions, CardMeta } from "./row-actions";
import type {
  DataTableColumn,
  DataTableProps,
  DataTableView,
  RowAction,
} from "./types";
import { renduCellule, valeurDe } from "./values";
import "./styles.css";

export {
  createUrlTableStorage,
  useDataTableQuery,
  type UseDataTableQueryOptions,
} from "./query";

export type {
  DataTableColumn,
  DataTableProps,
  DataTableView,
  RowAction,
  ColumnCardRole,
} from "./types";

/**
 * Un tableau de données.
 *
 * Il n'ordonne rien lui-même : à partir de quelques centaines de lignes,
 * trier côté client veut dire les avoir toutes téléchargées. Le tri est une
 * intention envoyée au serveur, et le tableau affiche ce qu'on lui rend.
 *
 * La recherche fait exception, et seulement par défaut : sans `onSearch`,
 * elle filtre les lignes déjà chargées — ce qui suffit tant que tout tient
 * sur une page.
 */
export function DataTable<T>({
  columns,
  data,
  getRowKey,
  title,
  description,
  toolbar,
  actions,
  searchKeys,
  searchPlaceholder,
  onSearch,
  layout = "auto",
  maxHeight,
  stickyHeader = false,
  density = "default",
  striped = false,
  bordered = true,
  rowActions,
  inlineActionsLimit = 2,
  actionsHeader,
  actionsDisplay = "icon",
  can,
  view: viewProp,
  defaultView = "table",
  onViewChange,
  showViewToggle = false,
  responsive = true,
  cardsBreakpoint = 768,
  renderCard,
  loading = false,
  skeletonRows = 5,
  error,
  onRetry,
  empty,
  selectable = false,
  selectedKeys: selectedProp,
  defaultSelectedKeys,
  onSelectionChange,
  isRowSelectable,
  selectionActions,
  sort,
  onSortChange,
  onRowClick,
  rowClassName,
  caption,
  className,
}: DataTableProps<T>) {
  const locale = useSiaLocale();
  const etroit = useMediaQuery(`(max-width: ${cardsBreakpoint - 1}px)`);

  const [vueInterne, setVueInterne] = useState<DataTableView>(defaultView);
  const vueChoisie = viewProp ?? vueInterne;
  // Un tableau à sept colonnes est illisible sur un téléphone : la bascule
  // automatique prime sur le choix, qui ne vaut que là où les deux tiennent.
  const vue: DataTableView = responsive && etroit ? "cards" : vueChoisie;

  const changerVue = useCallback(
    (suivante: DataTableView) => {
      if (viewProp === undefined) setVueInterne(suivante);
      onViewChange?.(suivante);
    },
    [onViewChange, viewProp],
  );

  const [recherche, setRecherche] = useState("");

  const cle = useCallback(
    (row: T, index: number): Key => getRowKey?.(row, index) ?? index,
    [getRowKey],
  );

  const colonnes = useMemo(
    () => columns.filter((c) => !c.hidden),
    [columns],
  );

  /** Les lignes affichées : filtrées localement, sauf recherche déléguée. */
  const lignes = useMemo(() => {
    if (onSearch || !searchKeys || recherche.trim() === "") return data;

    const terme = recherche.trim().toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) => {
        const colonne = columns.find((c) => c.key === k);
        const valeur = colonne
          ? valeurDe(row, colonne)
          : (row as Record<string, unknown>)[k];
        return String(valeur ?? "").toLowerCase().includes(terme);
      }),
    );
  }, [columns, data, onSearch, recherche, searchKeys]);

  /* ─────────────────────────────────────────────────────────── sélection */

  const [selInterne, setSelInterne] = useState<Key[]>(defaultSelectedKeys ?? []);
  const selPilotee = selectedProp !== undefined;
  const selection = selPilotee ? selectedProp : selInterne;

  const changerSelection = useCallback(
    (cles: Key[]) => {
      const lignesChoisies = lignes.filter((row, i) => cles.includes(cle(row, i)));
      if (!selPilotee) setSelInterne(cles);
      onSelectionChange?.(cles, lignesChoisies);
    },
    [cle, lignes, onSelectionChange, selPilotee],
  );

  const selectionnables = lignes.filter(
    (row, i) => isRowSelectable?.(row, i) ?? true,
  );
  const toutesCochees =
    selectionnables.length > 0 &&
    selectionnables.every((row, i) => selection.includes(cle(row, i)));
  const partiellement = selection.length > 0 && !toutesCochees;

  const basculerTout = () => {
    changerSelection(
      toutesCochees ? [] : selectionnables.map((row, i) => cle(row, i)),
    );
  };

  const basculerLigne = (k: Key) => {
    changerSelection(
      selection.includes(k)
        ? selection.filter((x) => x !== k)
        : [...selection, k],
    );
  };

  /* ────────────────────────────────────────────────────────────── états */

  const actionsDe = (row: T, index: number): Array<RowAction<T>> =>
    typeof rowActions === "function" ? rowActions(row, index) : (rowActions ?? []);

  const aDesActions = rowActions !== undefined;
  const vide = !loading && !error && lignes.length === 0;

  const enTete =
    title || description || toolbar || actions || searchKeys || showViewToggle;

  const classeRacine = cn(
    "sia-table",
    `sia-table--${density}`,
    striped && "sia-table--striped",
    bordered && "sia-table--bordered",
    loading && "sia-table--loading",
    className,
  );

  return (
    <section className={classeRacine}>
      {enTete && (
        <header className="sia-table__header">
          {(title || description) && (
            <div className="sia-table__heading">
              {title && <h2 className="sia-table__title">{title}</h2>}
              {description && (
                <p className="sia-table__description">{description}</p>
              )}
            </div>
          )}

          <div className="sia-table__tools">
            {searchKeys && (
              <SearchInput
                value={recherche}
                placeholder={searchPlaceholder ?? locale.search}
                onValueChange={(v) => {
                  setRecherche(v);
                  onSearch?.(v);
                }}
              />
            )}
            {toolbar}

            {showViewToggle && !(responsive && etroit) && (
              <div className="sia-table__views" role="group" aria-label="Affichage">
                {(["table", "cards"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={cn(
                      "sia-table__view",
                      vue === mode && "sia-table__view--active",
                    )}
                    aria-pressed={vue === mode}
                    onClick={() => changerVue(mode)}
                  >
                    {mode === "table" ? <IconeListe /> : <IconeGrille />}
                    <span className="sia-visually-hidden">
                      {mode === "table" ? "Liste" : "Cartes"}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {actions && <div className="sia-table__actions-bar">{actions}</div>}
          </div>
        </header>
      )}

      {/* La barre de sélection prend la place de rien : elle se glisse entre
          l'en-tête et le corps, et disparaît avec la sélection. */}
      {selectable && selection.length > 0 && selectionActions && (
        <div className="sia-table__selection">
          <span className="sia-table__selection-count">
            {selection.length} sélectionné{selection.length > 1 ? "s" : ""}
          </span>
          {selectionActions({
            keys: selection,
            rows: lignes.filter((row, i) => selection.includes(cle(row, i))),
            clear: () => changerSelection([]),
          })}
        </div>
      )}

      {error ? (
        <ErrorState description={error} {...(onRetry ? { onRetry } : {})} />
      ) : vide ? (
        <EmptyState
          title={empty?.title ?? locale.empty}
          {...(empty?.description ? { description: empty.description } : {})}
          {...(empty?.action ? { action: empty.action } : {})}
        />
      ) : vue === "cards" ? (
        <CartesVue
          lignes={lignes}
          colonnes={colonnes}
          loading={loading}
          skeletonRows={skeletonRows}
          cle={cle}
          {...(renderCard ? { renderCard } : {})}
          {...(onRowClick ? { onRowClick } : {})}
          aDesActions={aDesActions}
          actionsDe={actionsDe}
          inlineActionsLimit={inlineActionsLimit}
          actionsDisplay={actionsDisplay}
          can={can}
        />
      ) : (
        <div
          className={cn(
            "sia-table__scroll",
            stickyHeader && "sia-table__scroll--sticky",
          )}
          {...(maxHeight ? { style: { maxHeight } } : {})}
        >
          <table
            className="sia-table__table"
            style={layout === "fixed" ? { tableLayout: "fixed" } : undefined}
          >
            {caption && <caption className="sia-visually-hidden">{caption}</caption>}
            <thead>
              <tr>
                {selectable && (
                  <th className="sia-table__cell--select" scope="col">
                    <Checkbox
                      checked={toutesCochees}
                      indeterminate={partiellement}
                      onValueChange={basculerTout}
                      label=""
                      aria-label="Tout sélectionner"
                    />
                  </th>
                )}

                {colonnes.map((colonne) => {
                  const champ = colonne.sortKey ?? colonne.key;
                  const actif = sort?.field === champ;

                  return (
                    <th
                      key={colonne.key}
                      scope="col"
                      className={cn(
                        colonne.align && `sia-table__cell--${colonne.align}`,
                        colonne.headerClassName,
                      )}
                      style={{
                        ...(colonne.width ? { width: colonne.width } : {}),
                        ...(colonne.minWidth ? { minWidth: colonne.minWidth } : {}),
                      }}
                      {...(actif
                        ? { "aria-sort": sort.direction === "asc" ? ("ascending" as const) : ("descending" as const) }
                        : {})}
                    >
                      {colonne.sortable && onSortChange ? (
                        <button
                          type="button"
                          className="sia-table__sort"
                          onClick={() => onSortChange(champ)}
                        >
                          {colonne.header}
                          <span className="sia-table__sort-icon" aria-hidden="true">
                            {actif && sort.direction === "asc" ? (
                              <ChevronUpIcon />
                            ) : (
                              <ChevronDownIcon />
                            )}
                          </span>
                        </button>
                      ) : (
                        colonne.header
                      )}
                    </th>
                  );
                })}

                {aDesActions && (
                  <th className="sia-table__cell--actions" scope="col">
                    {actionsHeader ?? (
                      <span className="sia-visually-hidden">Actions</span>
                    )}
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {loading && lignes.length === 0
                ? Array.from({ length: skeletonRows }, (_, i) => (
                    <tr key={`fantome-${i}`} className="sia-table__row--skeleton">
                      {selectable && (
                        <td>
                          <Skeleton width="1.1rem" height="1.1rem" />
                        </td>
                      )}
                      {colonnes.map((c) => (
                        <td key={c.key}>
                          <Skeleton height=".8rem" />
                        </td>
                      ))}
                      {aDesActions && (
                        <td>
                          <Skeleton width="3rem" height=".8rem" />
                        </td>
                      )}
                    </tr>
                  ))
                : lignes.map((row, index) => {
                    const k = cle(row, index);
                    const cochee = selection.includes(k);
                    const cochable = isRowSelectable?.(row, index) ?? true;

                    return (
                      <tr
                        key={k}
                        className={cn(
                          onRowClick && "sia-table__row--clickable",
                          cochee && "sia-table__row--selected",
                          rowClassName?.(row, index),
                        )}
                        // L'apparition est décalée de quelques millisecondes
                        // par ligne : le regard suit la liste au lieu de la
                        // recevoir d'un bloc.
                        style={{ "--sia-table-row": index } as Record<string, number>}
                        onClick={onRowClick ? () => onRowClick(row, index) : undefined}
                      >
                        {selectable && (
                          <td className="sia-table__cell--select">
                            <Checkbox
                              checked={cochee}
                              disabled={!cochable}
                              onValueChange={() => basculerLigne(k)}
                              label=""
                              aria-label="Sélectionner la ligne"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                        )}

                        {colonnes.map((colonne) => (
                          <td
                            key={colonne.key}
                            className={cn(
                              colonne.align && `sia-table__cell--${colonne.align}`,
                              colonne.truncate && "sia-table__cell--truncate",
                              colonne.cellClassName,
                            )}
                          >
                            {renduCellule(row, index, colonne)}
                          </td>
                        ))}

                        {aDesActions && (
                          <td className="sia-table__cell--actions">
                            <RowActions
                              row={row}
                              index={index}
                              actions={actionsDe(row, index)}
                              inlineLimit={inlineActionsLimit}
                              display={actionsDisplay}
                              can={can}
                            />
                          </td>
                        )}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

interface CartesVueProps<T> {
  lignes: T[];
  colonnes: Array<DataTableColumn<T>>;
  loading: boolean;
  skeletonRows: number;
  cle: (row: T, index: number) => Key;
  renderCard?: (row: T, index: number) => ReactNode;
  onRowClick?: (row: T, index: number) => void;
  aDesActions: boolean;
  actionsDe: (row: T, index: number) => Array<RowAction<T>>;
  inlineActionsLimit: number;
  actionsDisplay: "icon" | "label";
  can: DataTableProps<T>["can"];
}

/**
 * La même donnée, en cartes.
 *
 * La carte n'est pas un tableau replié : elle prend un titre, quelques
 * couples libellé / valeur, et laisse le reste au tableau. Recopier douze
 * colonnes dans une carte donne une fiche que personne ne lit.
 */
function CartesVue<T>({
  lignes,
  colonnes,
  loading,
  skeletonRows,
  cle,
  renderCard,
  onRowClick,
  aDesActions,
  actionsDe,
  inlineActionsLimit,
  actionsDisplay,
  can,
}: CartesVueProps<T>) {
  // La première colonne fait le titre si rien n'est déclaré : c'est presque
  // toujours le nom, la référence ou le libellé.
  const titre = colonnes.find((c) => c.card === "title") ?? colonnes[0];
  const metas = colonnes.filter(
    (c) => c !== titre && c.card !== "hidden" && c.card !== "title",
  );

  if (loading && lignes.length === 0) {
    return (
      <div className="sia-table__cards">
        {Array.from({ length: skeletonRows }, (_, i) => (
          <div key={i} className="sia-table-card sia-table-card--skeleton">
            <Skeleton height="1rem" width="60%" />
            <Skeleton height=".75rem" />
            <Skeleton height=".75rem" width="80%" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="sia-table__cards">
      {lignes.map((row, index) => {
        if (renderCard) {
          return <div key={cle(row, index)}>{renderCard(row, index)}</div>;
        }

        return (
          <article
            key={cle(row, index)}
            className={cn(
              "sia-table-card",
              onRowClick && "sia-table-card--clickable",
            )}
            style={{ "--sia-table-row": index } as Record<string, number>}
            onClick={onRowClick ? () => onRowClick(row, index) : undefined}
          >
            {titre && (
              <div className="sia-table-card__title">
                {renduCellule(row, index, titre)}
              </div>
            )}

            <div className="sia-table-card__body">
              {metas.map((colonne) => (
                <CardMeta
                  key={colonne.key}
                  label={colonne.header}
                  value={renduCellule(row, index, colonne)}
                />
              ))}
            </div>

            {aDesActions && (
              <footer className="sia-table-card__footer">
                <RowActions
                  row={row}
                  index={index}
                  actions={actionsDe(row, index)}
                  inlineLimit={inlineActionsLimit}
                  display={actionsDisplay}
                  can={can}
                />
              </footer>
            )}
          </article>
        );
      })}
    </div>
  );
}

function IconeListe() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconeGrille() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" />
      </g>
    </svg>
  );
}
