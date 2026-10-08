/**
 * La description d'un objet métier, écrite une seule fois.
 *
 * Une page de liste décrit le même objet trois fois : en colonnes pour le
 * tableau, en champs pour le formulaire, en lignes pour le détail. Plus la
 * validation, les clés de recherche et la règle de droits par opération. Ces
 * descriptions divergent, et toujours dans le même sens — c'est le formulaire
 * qui oublie le champ que le tableau affiche.
 *
 * `defineResource` la décrit une fois; tout le reste en est dérivé. Ce module
 * n'exporte donc pas de composant, mais les fonctions qui font cette
 * dérivation : `CrudPage` les appelle, et chacune reste remplaçable par la
 * prop correspondante.
 */

import type { Key, ReactNode } from "react";
import { formatDate, formatDateTime, formatNumber } from "@sia-ui/utils";
import {
  createValidator,
  email as regleEmail,
  phone as reglePhone,
  required as regleRequise,
  type Rule,
} from "@sia-ui/utils/validation";
import {
  useSiaLocale,
  type FormValidator,
  type PermissionRule,
  type ResourceMessages,
} from "@sia-ui/headless";
import type { ComponentTone } from "@sia-ui/tokens";
import type { FieldControlOverrides, FieldProps, FieldType, FieldValue } from "../Field";
import type { SelectOption } from "../Select";
import type { FormEntry, FormFieldConfig, FormShape } from "../Form";
import type { ColumnCardRole, DataTableColumn } from "../DataTable/types";
import { AmountDisplay } from "../AmountDisplay";
import { Badge, toneOf } from "../Badge";

/**
 * Une propriété d'une ressource.
 *
 * Elle est déclarée **une fois** et sert partout : colonne du tableau, champ
 * du formulaire, ligne de la vue de détail, règle de validation, clé de
 * recherche. C'est l'objet de toute cette déclaration — trois descriptions du
 * même client finissent toujours par diverger, et c'est le formulaire qui
 * oublie le champ que le tableau affiche.
 */
/** Le formulaire ouvert : une création, ou la modification d'une ligne. */
export type ResourceFormMode = "create" | "edit";

export interface ResourceField<T = unknown> {
  /** Le contrôle de saisie et le rendu par défaut. `text` sans précision. */
  type?: FieldType;
  /** À défaut, la clé de la propriété, première lettre en capitale. */
  label?: ReactNode;
  description?: ReactNode;
  helpText?: ReactNode;
  placeholder?: string;

  /**
   * Obligatoire toujours, ou dans un seul mode.
   *
   * `"create"` sert au mot de passe initial : exigé à la création, facultatif
   * ensuite — le laisser vide en modification veut dire « inchangé ».
   */
  required?: boolean | ResourceFormMode;
  /** Les règles en plus de `required`. Celles du type sont ajoutées seules. */
  rules?: Array<Rule<never>>;

  /** Les choix d'un `select`, `radio` ou `multiselect`. */
  options?: SelectOption[];
  /** Valeur de départ d'une création. */
  defaultValue?: FieldValue;

  /**
   * Lu, mais pas saisi : un identifiant, une date de création, un total.
   *
   * Reste au tableau et au détail, disparaît du formulaire. Sans quoi une
   * page de modification renverrait au serveur des champs qu'il calcule
   * lui-même.
   */
  readOnly?: boolean;

  /* ── Où la propriété apparaît ───────────────────────────────────────── */

  /** Par défaut, tout sauf les types trop longs pour une cellule. */
  inTable?: boolean;
  /**
   * Par défaut, tout sauf `readOnly` et les valeurs calculées. `"create"` ou
   * `"edit"` limitent le champ à l'un des deux formulaires.
   */
  inForm?: boolean | ResourceFormMode;
  /** Par défaut, tout. */
  inDetail?: boolean;
  /** Par défaut, les types textuels. */
  searchable?: boolean;
  sortable?: boolean;

  /* ── Mise en forme ──────────────────────────────────────────────────── */

  align?: "start" | "center" | "end";
  width?: string;
  truncate?: boolean;
  card?: ColumnCardRole;
  /** Place du champ dans la grille du formulaire. */
  colSpan?: number;
  /** Le groupe de formulaire où ranger le champ. */
  group?: string;

  /** La devise d'un montant. */
  currency?: string;
  /** Le nombre de décimales d'un `number`. */
  decimals?: number;

  /**
   * Le ton d'une valeur de `select`, par valeur.
   *
   * Déclaré, la colonne rend une pastille plutôt qu'un mot : un statut se lit
   * alors d'un balayage, sans qu'on écrive une fonction de rendu.
   */
  tones?: Record<string, ComponentTone>;

  /** Le rendu en tableau et en détail. Écrase celui déduit du type. */
  render?: (row: T, index: number) => ReactNode;

  /**
   * Les props du contrôle de saisie, transmises telles quelles par le
   * formulaire : `{ searchable: true }` pour un `select` long, `{ maxLength }`
   * pour un texte. Sans elles, régler le contrôle obligeait à redéclarer tous
   * les champs dans la page.
   */
  controlProps?: FieldControlOverrides;
  /** Contrôle métier transmis au formulaire dérivé. */
  renderControl?: FieldProps["renderControl"];

  /**
   * Une valeur calculée plutôt que lue sur la ligne.
   *
   * La colonne peut alors porter une clé qui n'est pas une propriété de `T`
   * — un nom complet, un solde — sans élargir le type de la ligne. Le rendu
   * par défaut, la carte et la recherche locale passent par elle. Une valeur
   * calculée ne se saisit pas : elle sort du formulaire, sauf `inForm`.
   */
  value?: (row: T) => unknown;
}

export interface ResourceDefinition<T> {
  /** L'identifiant technique — sert aux droits et aux clés de cache. */
  name: string;

  /**
   * Comment la ressource se nomme à l'écran.
   *
   * `create` est déclaré plutôt que fabriqué : « Nouvelle facture » et
   * « Nouveau client » ne se déduisent pas du singulier sans connaître le
   * genre, et se tromper une fois sur deux est pire que d'écrire « Créer ».
   */
  label?: { singular?: ReactNode; plural?: ReactNode; create?: ReactNode };
  description?: ReactNode;

  /** La propriété qui identifie une ligne. `id` par défaut. */
  key?: (keyof T & string) | ((row: T, index: number) => Key);

  /** Les propriétés, dans l'ordre où elles s'affichent. */
  fields: Record<string, ResourceField<T>>;

  /**
   * Les droits des quatre opérations.
   *
   * `"auto"` les dérive du nom : `facture.creer`, `facture.modifier`,
   * `facture.supprimer`, `facture.lire`. C'est une convention, pas une
   * obligation — chaque règle se déclare aussi à la main.
   */
  permissions?:
    | "auto"
    | { domain: string; verbs?: Partial<PermissionVerbs> }
    | {
        create?: PermissionRule;
        view?: PermissionRule;
        edit?: PermissionRule;
        delete?: PermissionRule;
      };

  /** Colonnes de la grille du formulaire. */
  formColumns?: number;
}

/**
 * Déclarer une ressource.
 *
 * ```ts
 * const factures = defineResource<Facture>({
 *   name: "facture",
 *   label: { singular: "Facture", plural: "Factures" },
 *   fields: {
 *     reference: { label: "Référence", required: true },
 *     client: { label: "Client", required: true },
 *     montant: { type: "currency", currency: "XOF", align: "end" },
 *     statut: {
 *       type: "select",
 *       options: [{ value: "payee", label: "Payée" }],
 *       tones: { payee: "success" },
 *     },
 *   },
 * });
 * ```
 *
 * La fonction ne transforme rien : elle sert à ce que TypeScript vérifie la
 * déclaration au moment où on l'écrit, plutôt qu'au moment où on la passe à
 * `CrudPage`. Le message d'erreur y gagne dix lignes de lisibilité.
 */
export function defineResource<T>(
  definition: ResourceDefinition<T>,
): ResourceDefinition<T> {
  return definition;
}

/* ─────────────────────────────────────────────── les défauts par type */

/** Trop long, trop lourd ou trop secret pour une cellule de tableau. */
const HORS_TABLEAU = new Set<FieldType>([
  "textarea",
  "rich-text",
  "markdown",
  "json",
  "password",
  "file",
  "image",
  "otp",
  "hidden",
]);

/** Ce qu'une recherche textuelle a une chance de trouver. */
const CHERCHABLES = new Set<FieldType>([
  "text",
  "textarea",
  "email",
  "phone",
  "autocomplete",
  "reference",
]);

/** Ce qui s'aligne à droite : des chiffres qu'on compare de haut en bas. */
const NUMERIQUES = new Set<FieldType>(["number", "currency", "slider"]);

/** La règle que le type impose de lui-même. */
const REGLE_DU_TYPE: Partial<
  Record<FieldType, (messages?: ResourceMessages) => Rule<never>>
> = {
  email: (messages) => regleEmail(messages?.invalidEmail) as Rule<never>,
  phone: (messages) => reglePhone(messages?.invalidPhone) as Rule<never>,
};

/** « dateEcheance » → « Date echeance ». Un repli, pas une traduction. */
function libelleParDefaut(cle: string): string {
  const mots = cle
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .trim();
  return mots.charAt(0).toUpperCase() + mots.slice(1);
}

function estVisible(
  champ: ResourceField<never>,
  ou: "table" | "form" | "detail",
  mode: ResourceFormMode = "create",
) {
  const type = champ.type ?? "text";
  if (ou === "table") return champ.inTable ?? !HORS_TABLEAU.has(type);
  if (ou === "form") {
    const inForm = champ.inForm ?? (!champ.readOnly && !champ.value);
    return typeof inForm === "string" ? inForm === mode : inForm;
  }
  return champ.inDetail ?? true;
}

function estRequis(champ: ResourceField<never>, mode: ResourceFormMode) {
  return champ.required === true || champ.required === mode;
}

/** Comment lire la valeur d'une propriété : calculée, ou sur la ligne. */
function lecteur<T>(cle: string, champ: ResourceField<T>): (row: T) => unknown {
  return champ.value ?? ((row) => (row as Record<string, unknown>)[cle]);
}

/** Les propriétés dans l'ordre de déclaration, avec leur clé. */
function entrees<T>(resource: ResourceDefinition<T>) {
  return Object.entries(resource.fields) as Array<[string, ResourceField<T>]>;
}

/* ─────────────────────────────────────── les valeurs dans la langue */

/*
  Les rendus par défaut sont des fonctions pures, appelées hors de tout
  composant : la locale n'y est pas lisible. Ces trois petits composants la
  lisent au moment où la cellule s'affiche — « Oui » ou « Yes », la date et
  le nombre au format de la langue.
*/

function OuiNon({ value }: { value: unknown }) {
  const locale = useSiaLocale();
  return <>{value ? locale.yes : locale.no}</>;
}

function DateLocale({ value, time }: { value: string | Date; time: boolean }) {
  const { language } = useSiaLocale();
  return (
    <>
      {time
        ? formatDateTime(value, { locale: language })
        : formatDate(value, { locale: language })}
    </>
  );
}

function NombreLocale({ value, decimals }: { value: number; decimals?: number | undefined }) {
  const { language } = useSiaLocale();
  return (
    <>
      {formatNumber(value, {
        locale: language,
        ...(decimals !== undefined
          ? { minimumFractionDigits: decimals, maximumFractionDigits: decimals }
          : {}),
      })}
    </>
  );
}

/* ──────────────────────────────────────────────────── les dérivations */

/**
 * Le rendu d'une valeur, déduit de son type.
 *
 * Un montant se lit formaté, une date au format local, un statut en
 * pastille. Sans cela, chaque page réécrirait les mêmes quatre fonctions de
 * rendu, et la cinquième oublierait la devise.
 */
function renduParDefaut<T>(
  cle: string,
  champ: ResourceField<T>,
): ((row: T, index: number) => ReactNode) | undefined {
  const type = champ.type ?? "text";
  const lire = lecteur(cle, champ);

  if (type === "currency") {
    return (row) => {
      const valeur = lire(row);
      if (typeof valeur !== "number") return null;
      return (
        <AmountDisplay
          value={valeur}
          {...(champ.currency ? { currency: champ.currency } : {})}
        />
      );
    };
  }

  if (type === "select" || type === "radio") {
    return (row) => {
      const valeur = lire(row);
      if (valeur === null || valeur === undefined || valeur === "") return null;
      const brut = String(valeur);
      const option = champ.options?.find((o) => o.value === brut);
      const libelle = option?.label ?? brut;
      // Sans ton déclaré pour cette valeur, un mot plutôt qu'une pastille
      // neutre : la colonne n'a pas demandé à être lue comme un statut.
      return champ.tones?.[brut] ? (
        <Badge tone={toneOf(champ.tones, brut)}>{libelle}</Badge>
      ) : (
        <>{libelle}</>
      );
    };
  }

  if (type === "checkbox" || type === "switch") {
    return (row) => <OuiNon value={lire(row)} />;
  }

  if (type === "date" || type === "datetime") {
    return (row) => {
      const valeur = lire(row);
      if (typeof valeur !== "string" && !(valeur instanceof Date)) return null;
      return <DateLocale value={valeur} time={type === "datetime"} />;
    };
  }

  if (type === "number") {
    return (row) => {
      const valeur = lire(row);
      if (typeof valeur !== "number") return null;
      return <NombreLocale value={valeur} decimals={champ.decimals} />;
    };
  }

  if (type === "multiselect" || type === "tags") {
    return (row) => {
      const valeur = lire(row);
      if (!Array.isArray(valeur)) return null;
      return valeur
        .map((v) => {
          const brut = String(v);
          const option = champ.options?.find((o) => o.value === brut);
          return typeof option?.label === "string" ? option.label : brut;
        })
        .join(", ");
    };
  }

  // Le reste tombe sur le rendu par défaut du tableau : la valeur en texte.
  return undefined;
}

/** Les colonnes du tableau, dans l'ordre de déclaration. */
export function resourceColumns<T>(
  resource: ResourceDefinition<T>,
): Array<DataTableColumn<T>> {
  const colonnes: Array<DataTableColumn<T>> = [];
  let titreAttribue = false;

  for (const [cle, champ] of entrees(resource)) {
    if (!estVisible(champ as ResourceField<never>, "table")) continue;

    const type = champ.type ?? "text";
    const rendu = champ.render ?? renduParDefaut(cle, champ);

    /*
      La première colonne textuelle devient le titre de la carte. Laisser la
      grille de cartes sans titre la rendrait illisible, et l'exiger de
      chaque déclaration serait une cérémonie de plus.
    */
    let role = champ.card;
    if (role === undefined && !titreAttribue && CHERCHABLES.has(type)) {
      role = "title";
      titreAttribue = true;
    }

    colonnes.push({
      key: cle,
      header: champ.label ?? libelleParDefaut(cle),
      ...(champ.value ? { accessor: champ.value } : {}),
      ...(rendu ? { cell: rendu } : {}),
      align: champ.align ?? (NUMERIQUES.has(type) ? "end" : "start"),
      ...(champ.width ? { width: champ.width } : {}),
      ...(champ.truncate ? { truncate: champ.truncate } : {}),
      ...(champ.sortable ? { sortable: champ.sortable } : {}),
      ...(role ? { card: role } : {}),
    });
  }

  return colonnes;
}

/**
 * Les lignes de la vue de détail.
 *
 * Tenues à part des colonnes : une note de trois phrases n'a pas sa place
 * dans une cellule, mais c'est précisément au détail qu'on va la lire. Les
 * dériver du tableau priverait la vue de détail de tout ce qui est long, ce
 * qui est exactement ce qu'elle existe pour montrer.
 */
export function resourceDetailColumns<T>(
  resource: ResourceDefinition<T>,
): Array<DataTableColumn<T>> {
  const lignes: Array<DataTableColumn<T>> = [];

  for (const [cle, champ] of entrees(resource)) {
    if (!estVisible(champ as ResourceField<never>, "detail")) continue;
    const rendu = champ.render ?? renduParDefaut(cle, champ);
    lignes.push({
      key: cle,
      header: champ.label ?? libelleParDefaut(cle),
      ...(champ.value ? { accessor: champ.value } : {}),
      ...(rendu ? { cell: rendu } : {}),
    });
  }

  return lignes;
}

/** Les champs du formulaire, groupés si la déclaration les groupe. */
export function resourceFormFields<T>(
  resource: ResourceDefinition<T>,
  mode: ResourceFormMode = "create",
): FormEntry[] {
  const libres: FormFieldConfig[] = [];
  const groupes = new Map<string, FormFieldConfig[]>();

  for (const [cle, champ] of entrees(resource)) {
    if (!estVisible(champ as ResourceField<never>, "form", mode)) continue;

    const config: FormFieldConfig = {
      name: cle,
      label: champ.label ?? libelleParDefaut(cle),
      ...(champ.type ? { type: champ.type } : {}),
      ...(estRequis(champ as ResourceField<never>, mode) ? { required: true } : {}),
      ...(champ.placeholder ? { placeholder: champ.placeholder } : {}),
      ...(champ.helpText ? { helpText: champ.helpText } : {}),
      ...(champ.description ? { description: champ.description } : {}),
      ...(champ.options ? { options: champ.options } : {}),
      ...(champ.colSpan ? { colSpan: champ.colSpan } : {}),
      ...(champ.controlProps ? { controlProps: champ.controlProps } : {}),
      ...(champ.renderControl ? { renderControl: champ.renderControl } : {}),
    };

    if (champ.group) {
      const liste = groupes.get(champ.group);
      if (liste) liste.push(config);
      else groupes.set(champ.group, [config]);
    } else {
      libres.push(config);
    }
  }

  return [
    ...libres,
    ...Array.from(groupes, ([group, fields]) => ({ group, fields })),
  ];
}

/**
 * La validation, dérivée des types et des `required`.
 *
 * Un champ `email` valide une adresse sans qu'on le demande : le type le dit
 * déjà. Les règles déclarées s'y ajoutent, elles ne les remplacent pas.
 *
 * `messages` — `locale.resource`, lu avec `useSiaLocale()` — donne leurs
 * textes aux règles imposées ; `CrudPage` le passe. À défaut, les messages
 * par défaut de `@sia-ui/utils/validation`.
 */
export function resourceValidator<T>(
  resource: ResourceDefinition<T>,
  mode: ResourceFormMode = "create",
  messages?: ResourceMessages,
): FormValidator<FormShape> | undefined {
  const schema: Record<string, Array<Rule<never>>> = {};

  for (const [cle, champ] of entrees(resource)) {
    if (!estVisible(champ as ResourceField<never>, "form", mode)) continue;

    const regles: Array<Rule<never>> = [];
    if (estRequis(champ as ResourceField<never>, mode)) {
      regles.push(regleRequise(messages?.required) as Rule<never>);
    }

    const duType = REGLE_DU_TYPE[champ.type ?? "text"];
    if (duType) regles.push(duType(messages));

    if (champ.rules) regles.push(...champ.rules);
    if (regles.length > 0) schema[cle] = regles;
  }

  if (Object.keys(schema).length === 0) return undefined;
  return createValidator(
    schema as Parameters<typeof createValidator<FormShape>>[0],
  ) as FormValidator<FormShape>;
}

/** Les clés que la recherche locale parcourt. */
export function resourceSearchKeys<T>(
  resource: ResourceDefinition<T>,
): string[] {
  return entrees(resource)
    .filter(([, champ]) => champ.searchable ?? CHERCHABLES.has(champ.type ?? "text"))
    .map(([cle]) => cle);
}

/** Les valeurs de départ d'une création : les champs du mode `create`. */
export function resourceDefaults<T>(resource: ResourceDefinition<T>): FormShape {
  const valeurs: FormShape = {};
  for (const [cle, champ] of entrees(resource)) {
    if (!estVisible(champ as ResourceField<never>, "form")) continue;
    valeurs[cle] =
      champ.defaultValue ??
      (champ.type === "checkbox" || champ.type === "switch"
        ? false
        : champ.type === "multiselect" || champ.type === "tags"
          ? []
          : "");
  }
  return valeurs;
}

/** Comment lire la clé d'une ligne. */
export function resourceRowKey<T>(
  resource: ResourceDefinition<T>,
): (row: T, index: number) => Key {
  const cle = resource.key ?? ("id" as keyof T & string);
  if (typeof cle === "function") return cle;
  return (row, index) => {
    const valeur = (row as Record<string, unknown>)[cle];
    return typeof valeur === "string" || typeof valeur === "number"
      ? valeur
      : index;
  };
}

/**
 * Les droits des quatre opérations.
 *
 * `"auto"` applique la convention `<ressource>.<verbe>` — la seule chose
 * qu'une convention doit faire : éviter d'écrire quatre fois ce qui se
 * déduit une fois.
 */
/** Les verbes métier des quatre opérations CRUD. */
export interface PermissionVerbs {
  create: string;
  view: string;
  edit: string;
  delete: string;
}

/** Une convention réutilisable ; le domaine reste explicite à chaque ressource. */
export function createPermissionConvention(
  verbs: Partial<PermissionVerbs> = {},
) {
  const resolved = {
    create: "creer",
    view: "lire",
    edit: "modifier",
    delete: "supprimer",
    ...verbs,
  };
  return (domain: string) => ({
    create: `${domain}.${resolved.create}`,
    view: `${domain}.${resolved.view}`,
    edit: `${domain}.${resolved.edit}`,
    delete: `${domain}.${resolved.delete}`,
  });
}

export function resourcePermissions<T>(resource: ResourceDefinition<T>): {
  create?: PermissionRule;
  view?: PermissionRule;
  edit?: PermissionRule;
  delete?: PermissionRule;
} {
  if (resource.permissions === "auto") {
    return createPermissionConvention()(resource.name);
  }
  if (resource.permissions && "domain" in resource.permissions) {
    return createPermissionConvention(resource.permissions.verbs)(
      resource.permissions.domain,
    );
  }
  return resource.permissions ?? {};
}
