import { useMemo, type Key, type ReactNode } from "react";
import { cn, formatDateTime } from "@sia-ui/utils";
import { FRENCH, useSiaLocale, type ActivityLogMessages, type TableQuery } from "@sia-ui/headless";
import type { ComponentTone } from "@sia-ui/tokens";
import { DataTable } from "../DataTable";
import type { DataTableColumn, DataTableProps } from "../DataTable/types";
import { FiltersBar, type FiltersBarProps } from "../FiltersBar";
import { PageHeader, type PageHeaderProps } from "../PageHeader";
import { Pagination, type PaginationProps } from "../Pagination";
import { SearchInput, type SearchInputProps } from "../SearchInput";
import { Select, type SelectOption, type SelectProps } from "../Select";
import { StatusBadge, type StatusBadgeProps } from "../Badge";
import "./styles.css";

/** Une entrée de journal, dans sa forme la plus courante. */
export interface ActivityEntry {
  id: string | number;
  /** Quand : une date ISO, un horodatage ou une `Date`. */
  at: string | number | Date;
  /** Qui : un nom lisible. */
  actor: string;
  /** Quoi : un code — `create`, `delete`, `login`. */
  action: string;
  /** Sur quoi : « Projet Atlas », « Compte ovh-prod ». */
  target?: string | undefined;
  /** Le type de la cible : `project`, `account`. */
  targetType?: string | undefined;
  /** Une phrase de contexte, facultative. */
  summary?: ReactNode;
}

/** Un filtre déclaré : une clé de requête et ses choix. */
export interface ActivityLogFilter {
  /** La clé envoyée au serveur : `actor`, `action`, `targetType`. */
  key: string;
  label: string;
  options: SelectOption[];
  /** Cherchable au-delà d'une dizaine de choix. */
  searchable?: boolean;
}

export interface ActivityLogProps<T = ActivityEntry> {
  entries: T[];
  /**
   * L'état de la requête : page, taille, recherche, filtres.
   *
   * `useDataTableQuery()` le fournit, synchronisé avec l'URL ou le routeur ;
   * `query.params` part tel quel au serveur. Le journal ne filtre rien
   * lui-même : un journal se compte en milliers de lignes.
   */
  query: TableQuery;
  totalPages?: number;
  filters?: ActivityLogFilter[];
  /** Absente, la recherche n'est pas proposée. */
  searchPlaceholder?: string;

  /** Par défaut, les colonnes d'une `ActivityEntry`. */
  columns?: Array<DataTableColumn<T>>;
  getRowKey?: (row: T, index: number) => Key;
  /** Le ton de chaque action dans les colonnes par défaut. */
  actionTones?: Record<string, ComponentTone>;
  /** Le libellé de chaque action — « Suppression » pour `delete`. */
  actionLabels?: Record<string, ReactNode>;

  title?: ReactNode;
  description?: ReactNode;
  headingLevel?: 1 | 2 | 3;

  loading?: boolean;
  error?: ReactNode;
  onRetry?: () => void;
  empty?: DataTableProps<T>["empty"];
  className?: string;

  /** Les props du `PageHeader`, rendu quand `title` est fourni. */
  pageHeaderProps?: Partial<PageHeaderProps>;
  /**
   * Les props de la `FiltersBar` — des actions, un autre libellé de
   * réinitialisation. Sans `search`, `filters`, `activeCount` ni `onReset`,
   * que le journal compose à partir de la requête.
   */
  filtersBarProps?: Partial<
    Omit<FiltersBarProps, "search" | "filters" | "activeCount" | "onReset">
  >;
  /**
   * Les props du champ de recherche. Sans `value`, `defaultValue`,
   * `onValueChange` ni `onSearch` : la recherche en vigueur vit dans la
   * requête.
   */
  searchInputProps?: Partial<
    Omit<SearchInputProps, "value" | "defaultValue" | "onValueChange" | "onSearch">
  >;
  /**
   * Les props communes aux `Select` des filtres. Sans `value`,
   * `onValueChange` ni `options`, propres à chaque filtre et branchés sur la
   * requête.
   */
  filterSelectProps?: Partial<Omit<SelectProps, "value" | "onValueChange" | "options">>;
  /**
   * Les props du `StatusBadge` de la colonne « Action » par défaut. Sans
   * `value`, lue sur l'entrée. Sans effet quand `columns` est fourni.
   */
  actionBadgeProps?: Partial<Omit<StatusBadgeProps, "value">>;
  /**
   * Les props du `DataTable` — densité, mode cartes, sélection. Sans
   * `columns` ni `data`, qui ont leurs props ici.
   */
  tableProps?: Partial<Omit<DataTableProps<T>, "columns" | "data">>;
  /**
   * Les props de la `Pagination` — `jumpTo`, `pageSizeOptions`. Sans la page
   * et la taille de page ni leurs changements, branchés sur la requête.
   */
  paginationProps?: Partial<
    Omit<
      PaginationProps,
      "page" | "totalPages" | "onPageChange" | "pageSize" | "onPageSizeChange"
    >
  >;
}

/** Les colonnes d'une `ActivityEntry` : quand, qui, quoi, sur quoi. */
export function activityColumns(
  options: {
    actionTones?: Record<string, ComponentTone> | undefined;
    actionLabels?: Record<string, ReactNode> | undefined;
    /** Les props du `StatusBadge` de la colonne « Action », sans `value`. */
    actionBadgeProps?: Partial<Omit<StatusBadgeProps, "value">> | undefined;
    /** Les en-têtes : le groupe `activityLog` de la locale. Français par défaut. */
    messages?: ActivityLogMessages | undefined;
    /** La langue des dates. Par défaut, `fr-FR`. */
    language?: string | undefined;
  } = {},
): Array<DataTableColumn<ActivityEntry>> {
  const textes = options.messages ?? FRENCH.activityLog;
  const language = options.language ?? FRENCH.language;
  return [
    {
      key: "at",
      header: textes.date,
      width: "11rem",
      cell: (entry) => (
        <time className="sia-activity__date" dateTime={new Date(entry.at).toISOString()}>
          {formatDateTime(entry.at, { locale: language })}
        </time>
      ),
      card: "meta",
    },
    { key: "actor", header: textes.actor, card: "title" },
    {
      key: "action",
      header: textes.action,
      cell: (entry) => (
        <StatusBadge
          {...(options.actionTones ? { tones: options.actionTones } : {})}
          {...(options.actionLabels ? { labels: options.actionLabels } : {})}
          {...options.actionBadgeProps}
          value={entry.action}
        />
      ),
      card: "meta",
    },
    {
      key: "target",
      header: textes.target,
      cell: (entry) =>
        entry.target || entry.summary ? (
          <span className="sia-activity__target">
            {entry.target && <span>{entry.target}</span>}
            {entry.summary && <small>{entry.summary}</small>}
          </span>
        ) : null,
      card: "meta",
    },
  ];
}

/**
 * Un journal d'activité, filtrable et paginé par le serveur.
 *
 * `AuditMeta` et `Timeline` racontent l'histoire d'un objet ; ce bloc sert
 * l'autre question — qui a fait quoi, sur tout le système, cette semaine.
 * Filtres déclarés, recherche temporisée, pagination et taille de page : tout
 * passe par la requête, rien n'est filtré dans le navigateur.
 */
export function ActivityLog<T = ActivityEntry>({
  entries,
  query,
  totalPages,
  filters = [],
  searchPlaceholder,
  columns,
  getRowKey,
  actionTones,
  actionLabels,
  title,
  description,
  headingLevel,
  loading = false,
  error,
  onRetry,
  empty,
  className,
  pageHeaderProps,
  filtersBarProps,
  searchInputProps,
  filterSelectProps,
  actionBadgeProps,
  tableProps,
  paginationProps,
}: ActivityLogProps<T>) {
  const locale = useSiaLocale();
  const textes = locale.activityLog;
  const colonnes = useMemo(
    () =>
      columns ??
      (activityColumns({
        actionTones,
        actionLabels,
        actionBadgeProps,
        messages: textes,
        language: locale.language,
      }) as unknown as Array<DataTableColumn<T>>),
    [actionBadgeProps, actionLabels, actionTones, columns, textes, locale.language],
  );

  const actifs =
    filters.filter((filtre) => query.state.filters[filtre.key]).length +
    (query.state.search ? 1 : 0);

  const cle =
    getRowKey ??
    ((row: T, index: number) => (row as { id?: Key }).id ?? index);

  return (
    <section className={cn("sia-activity", className)}>
      {title && (
        <PageHeader
          title={title}
          {...(description ? { description } : {})}
          {...(headingLevel ? { level: headingLevel } : {})}
          {...pageHeaderProps}
        />
      )}

      {(filters.length > 0 || searchPlaceholder) && (
        <FiltersBar
          {...filtersBarProps}
          {...(searchPlaceholder
            ? {
                search: (
                  <SearchInput
                    // Remonté à la réinitialisation : le champ reprend la
                    // recherche en vigueur plutôt que sa saisie d'avant.
                    key={query.state.search === "" ? "vide" : "saisie"}
                    placeholder={searchPlaceholder}
                    searchDelay={300}
                    {...searchInputProps}
                    defaultValue={query.state.search}
                    onSearch={query.setSearch}
                  />
                ),
              }
            : {})}
          filters={filters.map((filtre) => (
            <div className="sia-activity__filter" key={filtre.key}>
              <Select
                aria-label={filtre.label}
                placeholder={filtre.label}
                clearable
                searchable={filtre.searchable ?? filtre.options.length > 10}
                {...filterSelectProps}
                options={filtre.options}
                value={query.state.filters[filtre.key] ?? ""}
                onValueChange={(valeur) => query.setFilter(filtre.key, valeur)}
              />
            </div>
          ))}
          activeCount={actifs}
          onReset={query.reset}
        />
      )}

      <DataTable<T>
        columns={colonnes}
        data={entries}
        getRowKey={cle}
        loading={loading}
        {...(error ? { error } : {})}
        {...(onRetry ? { onRetry } : {})}
        empty={
          empty ?? {
            title: actifs > 0 ? textes.emptyFiltered : textes.empty,
            ...(actifs > 0 ? { description: textes.emptyFilteredHint } : {}),
          }
        }
        {...tableProps}
      />

      {totalPages !== undefined && (
        <Pagination
          showTotal
          {...paginationProps}
          page={query.state.page}
          totalPages={totalPages}
          onPageChange={query.setPage}
          pageSize={query.state.perPage}
          onPageSizeChange={query.setPerPage}
        />
      )}
    </section>
  );
}
