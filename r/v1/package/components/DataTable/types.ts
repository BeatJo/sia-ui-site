import type { Key, ReactNode } from "react";
import type { PermissionRule } from "@sia-ui/headless";
import type { ComponentTone } from "@sia-ui/tokens";
import type { SearchInputProps } from "../SearchInput";
import type { EmptyStateProps } from "../EmptyState";
import type { ErrorStateProps } from "../ErrorState";
import type { SkeletonProps } from "../Skeleton";
import type { CheckboxProps } from "../Checkbox";
import type { ButtonProps } from "../Button";
import type { IconButtonProps } from "../IconButton";
import type { DropdownMenuProps } from "../DropdownMenu";
import type { ConfirmDialogProps } from "../ConfirmDialog";

/** Liste dense, ou grille de cartes. */
export type DataTableView = "table" | "cards";

/**
 * Le rôle d'une colonne dans la carte.
 *
 * `title` sert d'en-tête — la première colonne le prend si rien n'est
 * déclaré. `meta` s'affiche en paire libellé / valeur. `hidden` reste au
 * tableau seul : une carte qui recopie douze colonnes n'est plus une carte.
 */
export type ColumnCardRole = "title" | "meta" | "hidden";

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;

  /**
   * Où lire la valeur : une clé de l'objet, ou une fonction pour les valeurs
   * calculées. Sert au rendu par défaut, à la carte et à la recherche locale.
   */
  accessor?: keyof T | ((row: T) => unknown);

  /** Rendu personnalisé. Prioritaire sur `accessor`. */
  cell?: (row: T, index: number) => ReactNode;

  align?: "start" | "center" | "end";

  /**
   * Largeur suggérée — `120px`, `20%`.
   *
   * En `layout="auto"` (défaut) le navigateur n'y voit qu'une indication.
   * Pour qu'elle soit tenue, passer en `layout="fixed"`.
   */
  width?: string;
  minWidth?: string;

  /** Coupe au lieu d'élargir. Indispensable en `layout="fixed"`. */
  truncate?: boolean;

  /** Retire la colonne du tableau sans toucher à la carte. */
  hidden?: boolean;

  /** Rend l'en-tête cliquable. Le tri lui-même reste au serveur. */
  sortable?: boolean;
  /** Le champ envoyé au serveur, si différent de `key`. */
  sortKey?: string;

  /** Place de la colonne dans la carte. */
  card?: ColumnCardRole;

  headerClassName?: string;
  cellClassName?: string;
}

export interface RowAction<T> {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  tone?: ComponentTone;

  /** Masque l'action pour cette ligne — un solde nul, un envoi déjà annulé. */
  hidden?: (row: T, index: number) => boolean;
  disabled?: (row: T, index: number) => boolean;

  /** Même grammaire de droits que la navigation. */
  permission?: PermissionRule;

  /** Demande confirmation. Obligatoire pour tout ce qui détruit. */
  confirm?: {
    title: ReactNode;
    description?: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
  };

  onSelect: (row: T, index: number) => void | Promise<void>;
}

export interface DataTableProps<T> {
  columns: Array<DataTableColumn<T>>;
  data: T[];

  /** La clé d'une ligne. Sans elle, l'index — à éviter si les lignes bougent. */
  getRowKey?: (row: T, index: number) => Key;

  /* ─────────────────────────────────────────────── en-tête et recherche */

  title?: ReactNode;
  description?: ReactNode;
  /** Zone libre : filtres, sélecteur de période. */
  toolbar?: ReactNode;
  /** Actions globales, à droite. */
  actions?: ReactNode;

  /**
   * Les clés sur lesquelles porte la recherche.
   *
   * Absente, aucun champ n'est affiché : un tableau sans champ déclaré n'a
   * rien à chercher. Le filtrage est local, sur les lignes déjà chargées.
   */
  searchKeys?: string[];
  searchPlaceholder?: string;
  /** Recherche déléguée. Fournie, le tableau cesse de filtrer lui-même. */
  onSearch?: (query: string) => void;
  /**
   * Millisecondes d'inactivité avant d'appeler `onSearch`.
   *
   * `0` — le défaut — l'appelle à chaque frappe, ce qui convient à un
   * filtrage local. Pour une recherche serveur, 300 évite une requête par
   * lettre ; Entrée et l'effacement déclenchent sans attendre.
   */
  searchDelay?: number;
  /**
   * Le champ de recherche : placeholder, libellés, `clearable`, classe.
   *
   * La valeur et les rappels restent au tableau — c'est lui qui filtre et
   * qui temporise ; les déléguer ici ferait deux recherches concurrentes.
   */
  searchInputProps?: Partial<
    Omit<
      SearchInputProps,
      "value" | "defaultValue" | "onValueChange" | "onSearch" | "searchDelay"
    >
  >;

  /* ─────────────────────────────────────────────────────── mise en page */

  layout?: "auto" | "fixed";
  /** Hauteur du corps. Sans elle, `stickyHeader` n'a rien où se coller. */
  maxHeight?: string;
  stickyHeader?: boolean;
  density?: "compact" | "default" | "comfortable";
  /** Un fond alterné, une ligne sur deux. */
  striped?: boolean;
  bordered?: boolean;

  /* ────────────────────────────────────────────────── actions de ligne */

  rowActions?: Array<RowAction<T>> | ((row: T, index: number) => Array<RowAction<T>>);
  /** Au-delà, les actions passent dans un menu. */
  inlineActionsLimit?: number;
  actionsHeader?: ReactNode;
  /** `icon` garde la colonne étroite sur un tableau déjà large. */
  actionsDisplay?: "icon" | "label";
  /**
   * Les boutons d'action à libellé : variante, taille, classe.
   *
   * Le clic, le libellé et l'état désactivé viennent de chaque `RowAction`.
   */
  rowActionButtonProps?: Partial<
    Omit<ButtonProps, "onClick" | "children" | "disabled">
  >;
  /**
   * Les boutons d'action réduits à l'icône, déclencheur du menu « autres
   * actions » compris. Une `tooltip` passée ici se fusionne avec celle de
   * l'action, qui garde son libellé.
   */
  rowActionIconButtonProps?: Partial<
    Omit<IconButtonProps, "onClick" | "label" | "icon" | "disabled">
  >;
  /**
   * Le menu des actions qui ne tiennent pas en ligne : placement, décalage.
   *
   * Ni `open` ni `defaultOpen` : partagés par toutes les lignes, ils
   * ouvriraient tous les menus à la fois.
   */
  rowActionsMenuProps?: Partial<
    Omit<DropdownMenuProps, "items" | "children" | "onSelect" | "open" | "defaultOpen">
  >;
  /**
   * La confirmation d'une action : libellés par défaut, `loading`.
   *
   * Ce que déclare `confirm` sur l'action l'emporte ; le ton suit
   * `confirm.destructive`, l'ouverture et la validation restent au tableau.
   */
  confirmDialogProps?: Partial<
    Omit<ConfirmDialogProps, "open" | "onOpenChange" | "onConfirm" | "title" | "tone">
  >;

  /** Évalue les règles de permission des actions. */
  can?: (rule: PermissionRule) => boolean;

  /* ────────────────────────────────────────────────── modes d'affichage */

  view?: DataTableView;
  defaultView?: DataTableView;
  onViewChange?: (view: DataTableView) => void;
  showViewToggle?: boolean;

  /**
   * Bascule en cartes sous le point de rupture. Actif par défaut : un
   * tableau à sept colonnes est illisible sur un téléphone.
   */
  responsive?: boolean;
  cardsBreakpoint?: number;

  /** Rendu complet d'une carte. Sans lui, elle est déduite des colonnes. */
  renderCard?: (row: T, index: number) => ReactNode;

  /* ──────────────────────────────────────────────────────────── états */

  loading?: boolean;
  /** Lignes fantômes pendant le premier chargement. */
  skeletonRows?: number;
  /** Les blocs fantômes : rayon, classe, style. Leurs tailles ne sont que des défauts. */
  skeletonProps?: Partial<SkeletonProps>;
  error?: ReactNode;
  onRetry?: () => void;
  /**
   * L'état d'erreur : titre, libellé du bouton, action, `compact`.
   *
   * Le message vient de `error` ; `onRetry` du tableau l'emporte s'il est
   * fourni.
   */
  errorStateProps?: Partial<Omit<ErrorStateProps, "description" | "error">>;
  empty?: {
    title?: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
    icon?: ReactNode;
  };
  /**
   * L'état vide au complet : icône, `compact`, classe. Ce que déclare `empty`
   * l'emporte sur les mêmes clés.
   */
  emptyStateProps?: Partial<EmptyStateProps>;

  /* ───────────────────────────────────────────────────────── sélection */

  /**
   * Ajoute une colonne de cases à cocher.
   *
   * Sur une liste paginée côté serveur, la case d'en-tête ne porte que sur la
   * page affichée : le composant ne connaît pas les lignes qu'il n'a pas
   * reçues, et prétendre « tout sélectionner » serait un mensonge.
   */
  selectable?: boolean;
  selectedKeys?: Key[];
  defaultSelectedKeys?: Key[];
  onSelectionChange?: (keys: Key[], rows: T[]) => void;
  isRowSelectable?: (row: T, index: number) => boolean;
  /**
   * Les cases de sélection, en-tête comprise : taille, ton, classe.
   *
   * L'état coché, l'indétermination et le rappel sont calculés par le
   * tableau ; le clic reste retenu pour ne pas déclencher `onRowClick`.
   */
  checkboxProps?: Partial<
    Omit<
      CheckboxProps,
      | "checked"
      | "defaultChecked"
      | "indeterminate"
      | "onValueChange"
      | "onChange"
      | "onClick"
      | "disabled"
      | "value"
    >
  >;
  /** Barre affichée dès qu'une ligne est cochée. */
  selectionActions?: (context: {
    keys: Key[];
    rows: T[];
    clear: () => void;
  }) => ReactNode;

  /* ───────────────────────────────────────────────────────────── tri */

  sort?: { field: string; direction: "asc" | "desc" } | null;
  onSortChange?: (field: string) => void;

  onRowClick?: (row: T, index: number) => void;
  rowClassName?: (row: T, index: number) => string | undefined;
  caption?: string;
  className?: string;
}

/**
 * Les réglages des sous-composants d'une action de ligne. Regroupés, ils
 * traversent la vue cartes sans une prop par sous-composant.
 */
export interface RowActionsSlots {
  button: DataTableProps<unknown>["rowActionButtonProps"];
  iconButton: DataTableProps<unknown>["rowActionIconButtonProps"];
  menu: DataTableProps<unknown>["rowActionsMenuProps"];
  confirmDialog: DataTableProps<unknown>["confirmDialogProps"];
}
