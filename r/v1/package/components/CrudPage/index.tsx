import { useMemo, useState, type Key, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import type { FormValidator, PermissionRule } from "@sia-ui/headless";
import { PageHeader } from "../PageHeader";
import { Button } from "../Button";
import { Pagination } from "../Pagination";
import { DataTable } from "../DataTable";
import { EyeIcon, PlusIcon, TrashIcon } from "../Icons";
import type {
  DataTableColumn,
  DataTableProps,
  RowAction,
} from "../DataTable/types";
import type { FormEntry, FormShape } from "../Form";
import {
  resourceColumns,
  resourceDefaults,
  resourceDetailColumns,
  resourceFormFields,
  resourcePermissions,
  resourceRowKey,
  resourceSearchKeys,
  resourceValidator,
  type ResourceDefinition,
} from "../Resource";
import {
  CrudDialogs,
  type CrudDialogOptions,
  type CrudDialogState,
} from "./dialogs";
import "./styles.css";

export {
  CrudDialogs,
  type CrudDialogOptions,
  type CrudDialogState,
} from "./dialogs";

/**
 * La personnalisation d'une action standard.
 *
 * Tout est facultatif : fournir le gestionnaire suffit à obtenir un bouton
 * qui marche. Ce qui est ici ne sert qu'à s'écarter du défaut — un autre
 * libellé, une règle de droits, une confirmation en plus ou en moins.
 */
export interface CrudActionOptions<T> {
  label?: ReactNode;
  icon?: ReactNode;
  permission?: PermissionRule;
  hidden?: (row: T, index: number) => boolean;
  disabled?: (row: T, index: number) => boolean;
  /** `false` retire la confirmation que `delete` a par défaut. */
  confirm?: RowAction<T>["confirm"] | false;
}

export interface CrudCreateOptions {
  label?: ReactNode;
  icon?: ReactNode;
  permission?: PermissionRule;
  disabled?: boolean;
}

interface CrudPageBase<T> {
  /** À défaut, le pluriel de la ressource. */
  title?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;

  data: T[];
  getRowKey?: (row: T, index: number) => Key;

  /* ───────────────────────────────── les quatre opérations, par défaut */

  /**
   * Ce que fait le bouton de création.
   *
   * Facultatif : avec `fields`, la page ouvre elle-même son formulaire. Le
   * fournir sert à partir ailleurs — une page dédiée, un assistant en
   * plusieurs étapes — et prend alors le pas sur la boîte.
   */
  onCreate?: () => void;
  /** Idem : sans lui, la boîte de détail s'ouvre. */
  onView?: (row: T, index: number) => void;
  /** Idem : sans lui, le formulaire s'ouvre prérempli. */
  onEdit?: (row: T, index: number) => void;
  /** Confirmée d'office. Détruire sans demander est une faute. */
  onDelete?: (row: T, index: number) => void | Promise<void>;

  /* ──────────────────────────────────── le formulaire de la page */

  /**
   * Les champs de création et de modification.
   *
   * Les déclarer suffit à obtenir un CRUD complet : le bouton « Créer » ouvre
   * un formulaire vide, « Modifier » le même prérempli, « Consulter » la
   * ligne en lecture. C'est la même description que `Form` — aucun schéma
   * propre à cette page, aucune bibliothèque imposée.
   */
  fields?: FormEntry[];

  /** Ce que la page fait d'un formulaire envoyé. */
  onSubmit?: (
    values: FormShape,
    context: { mode: "create" | "edit"; row?: T; index?: number },
  ) => void | Promise<void>;

  /**
   * La validation, sous la même forme que `Form`.
   *
   * `createValidator` de `@sia-ui/utils/validation` en produit une; un Zod s'y
   * branche en cinq lignes, sans que le composant connaisse Zod.
   */
  validate?: FormValidator<FormShape>;

  /** Valeurs de départ d'une création. Par défaut, des champs vides. */
  createDefaults?: FormShape;

  /**
   * Comment une ligne devient des valeurs de formulaire.
   *
   * Par défaut, les champs de même nom sont repris tels quels. À fournir dès
   * que la ligne et le formulaire ne parlent pas la même langue — une date
   * ISO à découper, un objet lié à réduire à son identifiant.
   */
  toFormValues?: (row: T) => FormShape;

  /**
   * La vue de détail.
   *
   * Par défaut dérivée des colonnes, qui disent déjà quoi montrer. Une
   * fonction la remplace, `false` la retire avec son action.
   */
  detail?: boolean | ((row: T, index: number) => ReactNode);

  /** Titres, largeur et nombre de colonnes des boîtes. */
  dialog?: CrudDialogOptions;

  /**
   * De quoi s'écarter des défauts.
   *
   * `false` retire une action alors même que son gestionnaire existe — utile
   * quand le gestionnaire sert ailleurs, par exemple à un raccourci clavier.
   */
  operations?: {
    create?: CrudCreateOptions | false;
    view?: CrudActionOptions<T> | false;
    edit?: CrudActionOptions<T> | false;
    delete?: CrudActionOptions<T> | false;
  };

  /** Des actions de ligne en plus des quatre standard. */
  extraRowActions?: Array<RowAction<T>> | ((row: T, index: number) => Array<RowAction<T>>);

  /** Suppression groupée. Ajoute la sélection et sa barre d'actions. */
  onBulkDelete?: (keys: Key[], rows: T[]) => void | Promise<void>;

  can?: (rule: PermissionRule) => boolean;

  /* ────────────────────────────────────────────────── autour du tableau */

  /** Actions de page, à droite du titre. S'ajoute au bouton de création. */
  headerActions?: ReactNode;
  toolbar?: ReactNode;
  searchKeys?: string[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;

  loading?: boolean;
  error?: ReactNode;
  onRetry?: () => void;
  empty?: DataTableProps<T>["empty"];

  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;

  /**
   * Ce qui n'a pas de raccourci ici passe au tableau tel quel — densité,
   * mode cartes, tri, colonnes figées.
   */
  table?: Partial<Omit<DataTableProps<T>, "columns" | "data">>;

  /** Remplace le tableau. Le reste de la page continue de fonctionner. */
  children?: ReactNode;

  className?: string;
}

/**
 * Les props de la page.
 *
 * Deux façons de la remplir, et une seule des deux à la fois : une ressource
 * déclarée, d'où tout se déduit, ou des colonnes écrites à la main. L'union
 * est là pour que TypeScript exige l'une ou l'autre — une page sans colonnes
 * ni ressource ne montrerait rien, et le dirait à l'exécution.
 */
export type CrudPageProps<T> = CrudPageBase<T> &
  (
    | {
        /**
         * La ressource, déclarée une fois avec `defineResource`.
         *
         * Colonnes, formulaire, détail, validation, recherche, clé de ligne
         * et droits en sont dérivés. Chacun reste remplaçable — `columns`,
         * `fields`, `validate`, `searchKeys` passent devant la dérivation.
         */
        resource: ResourceDefinition<T>;
        columns?: Array<DataTableColumn<T>>;
      }
    | {
        resource?: undefined;
        columns: Array<DataTableColumn<T>>;
      }
  );

/** Une icône de crayon. Dessinée ici : le jeu commun n'en a pas. */
function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M4 20h4l10-10a2.5 2.5 0 0 0-3.5-3.5L4.5 16.5 4 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Une page de liste, avec ses quatre opérations.
 *
 * Créer, consulter, modifier, supprimer : ce sont les mêmes partout, et les
 * réécrire à chaque écran produit quatre variantes qui divergent — celle qui
 * oublie la confirmation, celle qui ne vérifie pas les droits, celle dont le
 * bouton ne se désactive pas pendant l'appel.
 *
 * Ici, fournir le gestionnaire suffit. Ne pas le fournir retire l'action.
 */
export function CrudPage<T>({
  resource,
  title,
  description,
  eyebrow,
  columns: colonnesFournies,
  data,
  getRowKey: cleFournie,
  onCreate,
  onView,
  onEdit,
  onDelete,
  fields: champsFournis,
  onSubmit,
  validate: validationFournie,
  createDefaults,
  toFormValues,
  detail,
  dialog,
  operations,
  extraRowActions,
  onBulkDelete,
  can,
  headerActions,
  toolbar,
  searchKeys: clesDeRecherche,
  searchPlaceholder,
  onSearch,
  loading = false,
  error,
  onRetry,
  empty,
  page,
  totalPages,
  onPageChange,
  table,
  children,
  className,
}: CrudPageProps<T>) {
  const [boite, setBoite] = useState<CrudDialogState<T> | null>(null);

  /**
   * Ce que la ressource donne, et ce qui passe devant.
   *
   * Chaque dérivation cède à la prop correspondante : déclarer une ressource
   * ne doit jamais empêcher de reprendre la main sur un point précis. Les
   * dérivations sont mémoïsées — elles parcourent la déclaration entière, et
   * une page de liste se rend à chaque frappe dans sa barre de recherche.
   */
  const derive = useMemo(
    () =>
      resource
        ? {
            columns: resourceColumns(resource),
            detailColumns: resourceDetailColumns(resource),
            fields: resourceFormFields(resource),
            validate: resourceValidator(resource),
            searchKeys: resourceSearchKeys(resource),
            defaults: resourceDefaults(resource),
            getRowKey: resourceRowKey(resource),
            permissions: resourcePermissions(resource),
            formColumns: resource.formColumns,
            label: resource.label,
          }
        : undefined,
    [resource],
  );

  const columns = colonnesFournies ?? derive?.columns ?? [];
  const fields = champsFournis ?? derive?.fields;
  const validate = validationFournie ?? derive?.validate;
  const searchKeys = clesDeRecherche ?? derive?.searchKeys;
  const getRowKey = cleFournie ?? derive?.getRowKey;

  /**
   * Qui ouvre quoi.
   *
   * Le gestionnaire fourni l'emporte toujours : c'est la porte de sortie vers
   * une page dédiée. À défaut, la page ouvre sa propre boîte — dès lors
   * qu'elle a de quoi la remplir. Une action reste absente quand ni l'un ni
   * l'autre n'est possible : un bouton qui n'ouvre rien est pire qu'un bouton
   * manquant.
   */
  const formulaireDispo = Boolean(fields && onSubmit);
  const detailDispo =
    detail === undefined ? Boolean(fields) : detail !== false;

  /*
    Mémoïsés, et pas par principe : ces trois fonctions entrent dans les
    dépendances des actions de ligne. Recréées à chaque rendu, elles
    annuleraient cette mémoïsation — et une page de liste se rend à chaque
    frappe dans sa barre de recherche.
  */
  const creer = useMemo(
    () =>
      onCreate ??
      (formulaireDispo ? () => setBoite({ mode: "create" }) : undefined),
    [onCreate, formulaireDispo],
  );
  const modifier = useMemo(
    () =>
      onEdit ??
      (formulaireDispo
        ? (row: T, index: number) => setBoite({ mode: "edit", row, index })
        : undefined),
    [onEdit, formulaireDispo],
  );
  const consulter = useMemo(
    () =>
      onView ??
      (detailDispo
        ? (row: T, index: number) => setBoite({ mode: "view", row, index })
        : undefined),
    [onView, detailDispo],
  );

  /**
   * Les actions de ligne, dans l'ordre où on les lit : consulter, modifier,
   * supprimer. La destruction en dernier, et jamais à côté d'une action
   * bénigne qu'on viserait de travers.
   */
  const actionsDeLigne = useMemo(() => {
    const liste: Array<RowAction<T>> = [];

    const ajouter = (
      key: "view" | "edit" | "delete",
      handler: ((row: T, index: number) => void | Promise<void>) | undefined,
      defauts: Omit<RowAction<T>, "key" | "onSelect">,
    ) => {
      const options = operations?.[key];
      if (!handler || options === false) return;

      // Le droit déclaré sur l'opération l'emporte sur celui de la ressource,
      // qui n'est qu'une convention appliquée faute de mieux.
      const droit = options?.permission ?? derive?.permissions[key];

      const confirmation =
        options?.confirm === false
          ? undefined
          : (options?.confirm ?? defauts.confirm);

      liste.push({
        key,
        label: options?.label ?? defauts.label,
        icon: options?.icon ?? defauts.icon,
        ...(defauts.tone ? { tone: defauts.tone } : {}),
        ...(droit !== undefined ? { permission: droit } : {}),
        ...(options?.hidden ? { hidden: options.hidden } : {}),
        ...(options?.disabled ? { disabled: options.disabled } : {}),
        ...(confirmation ? { confirm: confirmation } : {}),
        onSelect: handler,
      });
    };

    ajouter("view", consulter, { label: "Consulter", icon: <EyeIcon /> });
    ajouter("edit", modifier, { label: "Modifier", icon: <EditIcon /> });
    ajouter("delete", onDelete, {
      label: "Supprimer",
      icon: <TrashIcon />,
      tone: "danger",
      // Détruire sans demander est une faute. On peut la retirer — encore
      // faut-il l'avoir écrit.
      confirm: {
        title: "Supprimer cet élément ?",
        description: "Cette action est définitive.",
        confirmLabel: "Supprimer",
        destructive: true,
      },
    });

    return liste;
  }, [operations, onDelete, modifier, consulter, derive]);

  const toutesLesActions = useMemo(() => {
    if (!extraRowActions) {
      return actionsDeLigne.length > 0 ? actionsDeLigne : undefined;
    }

    return (row: T, index: number) => [
      ...actionsDeLigne,
      ...(typeof extraRowActions === "function"
        ? extraRowActions(row, index)
        : extraRowActions),
    ];
  }, [actionsDeLigne, extraRowActions]);

  /**
   * Le bouton de création.
   *
   * Trois conditions, dans cet ordre : un gestionnaire, une action non
   * retirée, et le droit de s'en servir. Un bouton qui ouvre un formulaire
   * que le serveur refusera est pire qu'un bouton absent.
   */
  const creation = operations?.create === false ? null : (operations?.create ?? {});
  const droitDeCreer = creation?.permission ?? derive?.permissions.create;
  const creationAutorisee =
    droitDeCreer === undefined || !can || can(droitDeCreer);

  const boutonCreer =
    creer && creation && creationAutorisee ? (
      <Button onClick={creer} disabled={creation.disabled ?? false}>
        {creation.icon ?? <PlusIcon />}
        {creation.label ?? derive?.label?.create ?? "Créer"}
      </Button>
    ) : null;
  const enTeteActions =
    boutonCreer || headerActions ? (
      <>
        {headerActions}
        {boutonCreer}
      </>
    ) : undefined;

  return (
    <section className={cn("sia-crud-page", className)}>
      <PageHeader
        title={title ?? derive?.label?.plural ?? resource?.name ?? ""}
        {...(description ?? resource?.description
          ? { description: description ?? resource?.description }
          : {})}
        {...(eyebrow ? { eyebrow } : {})}
        {...(enTeteActions ? { actions: enTeteActions } : {})}
      />

      {children ?? (
        <DataTable<T>
          columns={columns}
          data={data}
          {...(getRowKey ? { getRowKey } : {})}
          {...(toolbar ? { toolbar } : {})}
          {...(searchKeys ? { searchKeys } : {})}
          {...(searchPlaceholder ? { searchPlaceholder } : {})}
          {...(onSearch ? { onSearch } : {})}
          {...(toutesLesActions ? { rowActions: toutesLesActions } : {})}
          {...(can ? { can } : {})}
          loading={loading}
          {...(error ? { error } : {})}
          {...(onRetry ? { onRetry } : {})}
          {...(empty ? { empty } : {})}
          {...(onBulkDelete
            ? {
                selectable: true,
                selectionActions: ({ keys, rows, clear }) => (
                  <Button
                    size="sm"
                    variant="outline"
                    tone="danger"
                    onClick={async () => {
                      await onBulkDelete(keys, rows);
                      clear();
                    }}
                  >
                    <TrashIcon />
                    Supprimer
                  </Button>
                ),
              }
            : {})}
          /*
            Trois actions en ligne plutôt que deux : consulter, modifier et
            supprimer sont précisément ce que cette page existe pour offrir.
            La limite du tableau, elle, reste à deux — un tableau quelconque
            n'a pas de raison d'étaler ses boutons.
          */
          inlineActionsLimit={3}
          {...table}
        />
      )}

      <CrudDialogs<T>
        state={boite}
        onClose={() => setBoite(null)}
        columns={derive?.detailColumns ?? columns}
        fields={fields}
        validate={validate}
        onSubmit={onSubmit}
        createDefaults={createDefaults ?? derive?.defaults}
        toFormValues={toFormValues}
        renderDetail={typeof detail === "function" ? detail : undefined}
        getRowKey={getRowKey}
        /*
          Les titres des boîtes reprennent le nom de la ressource, faute de
          mieux : « Modifier la facture » se lit mieux que « Modifier », et
          l'écrire trois fois par page de liste est précisément ce que cette
          déclaration existe pour éviter.
        */
        dialog={{
          ...(derive?.label?.singular
            ? {
                createTitle: derive.label.create ?? "Créer",
                editTitle: <>Modifier — {derive.label.singular}</>,
                viewTitle: derive.label.singular,
              }
            : {}),
          ...(derive?.formColumns ? { columns: derive.formColumns } : {}),
          ...dialog,
        }}
      />

      {page !== undefined && totalPages !== undefined && onPageChange && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showTotal
        />
      )}
    </section>
  );
}
