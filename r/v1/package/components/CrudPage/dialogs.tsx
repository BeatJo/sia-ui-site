import { type Key, type ReactNode } from "react";
import type { FormValidator } from "@sia-ui/headless";
import { Modal } from "../Modal";
import { Form, type FormEntry, type FormShape } from "../Form";
import { Descriptions } from "../Descriptions";
import type { DataTableColumn } from "../DataTable/types";
import { renduCellule } from "../DataTable/values";

/** Laquelle des trois boîtes est ouverte, et sur quelle ligne. */
export interface CrudDialogState<T> {
  mode: "create" | "edit" | "view";
  row?: T;
  index?: number;
}

/** Les titres et la forme des boîtes. Tout est facultatif. */
export interface CrudDialogOptions {
  createTitle?: ReactNode;
  createDescription?: ReactNode;
  editTitle?: ReactNode;
  editDescription?: ReactNode;
  viewTitle?: ReactNode;
  viewDescription?: ReactNode;
  submitText?: ReactNode;
  /** Colonnes du formulaire. Deux, au-delà de quatre ou cinq champs. */
  columns?: number;
  /** Colonnes de la vue de détail. */
  detailColumns?: 1 | 2 | 3;
}

/**
 * Les noms de champs, groupes aplatis.
 *
 * Servent à fabriquer un formulaire vide : sans valeur initiale déclarée, un
 * champ non contrôlé le devient à la première frappe, et React s'en plaint à
 * juste titre.
 */
function nomsDeChamps(fields: FormEntry[]): string[] {
  const noms: string[] = [];
  for (const entree of fields) {
    if ("group" in entree) noms.push(...entree.fields.map((f) => f.name));
    else noms.push(entree.name);
  }
  return noms;
}

export function valeursVides(fields: FormEntry[]): FormShape {
  const valeurs: FormShape = {};
  for (const nom of nomsDeChamps(fields)) valeurs[nom] = "";
  return valeurs;
}

/**
 * Ne garder d'une ligne que ce que le formulaire sait montrer.
 *
 * Une ligne porte souvent plus que ses champs — un identifiant, des dates de
 * suivi, un objet imbriqué. Les passer au formulaire les renverrait tels
 * quels à l'envoi, et `isDirty` les compterait comme modifiés.
 */
export function valeursDeLigne<T>(row: T, fields: FormEntry[]): FormShape {
  const source = row as Record<string, unknown>;
  const valeurs: FormShape = {};
  for (const nom of nomsDeChamps(fields)) {
    const valeur = source[nom];
    valeurs[nom] =
      typeof valeur === "string" ||
      typeof valeur === "number" ||
      typeof valeur === "boolean" ||
      Array.isArray(valeur)
        ? (valeur as FormShape[string])
        : "";
  }
  return valeurs;
}

export interface CrudDialogsProps<T> {
  state: CrudDialogState<T> | null;
  onClose: () => void;

  columns: Array<DataTableColumn<T>>;
  fields?: FormEntry[] | undefined;
  validate?: FormValidator<FormShape> | undefined;
  onSubmit?:
    | ((
        values: FormShape,
        context: { mode: "create" | "edit"; row?: T; index?: number },
      ) => void | Promise<void>)
    | undefined;

  createDefaults?: FormShape | undefined;
  toFormValues?: ((row: T) => FormShape) | undefined;
  renderDetail?: ((row: T, index: number) => ReactNode) | undefined;

  getRowKey?: ((row: T, index: number) => Key) | undefined;
  dialog?: CrudDialogOptions | undefined;
}

/**
 * Les boîtes du CRUD : créer, modifier, consulter.
 *
 * Elles n'inventent rien — `Modal` pour la boîte, `Form` pour la saisie,
 * `Descriptions` pour la lecture. Ce qu'elles apportent est de savoir
 * laquelle ouvrir, avec quelles valeurs, et de refermer une fois l'envoi
 * passé.
 */
export function CrudDialogs<T>({
  state,
  onClose,
  columns,
  fields,
  validate,
  onSubmit,
  createDefaults,
  toFormValues,
  renderDetail,
  getRowKey,
  dialog,
}: CrudDialogsProps<T>) {
  const creation = state?.mode === "create";
  const modification = state?.mode === "edit";
  const consultation = state?.mode === "view";

  /*
    Une clé qui change d'une ouverture à l'autre.

    `useLocalForm` fige ses valeurs initiales à la première passe — c'est ce
    qui rend `isDirty` fiable. Sans remonter le formulaire, la deuxième
    modification rouvrirait sur la première ligne.
  */
  const cle =
    state === undefined || state === null
      ? "vide"
      : `${state.mode}-${
          state.row !== undefined && state.index !== undefined && getRowKey
            ? String(getRowKey(state.row, state.index))
            : String(state.index ?? "")
        }`;

  const valeurs =
    modification && state?.row !== undefined && fields
      ? (toFormValues?.(state.row) ?? valeursDeLigne(state.row, fields))
      : (createDefaults ?? (fields ? valeursVides(fields) : {}));

  return (
    <>
      {fields && (creation || modification) && (
        <Modal
          open
          onOpenChange={(ouvert) => {
            if (!ouvert) onClose();
          }}
          title={
            creation
              ? (dialog?.createTitle ?? "Créer")
              : (dialog?.editTitle ?? "Modifier")
          }
          {...(creation
            ? dialog?.createDescription
              ? { description: dialog.createDescription }
              : {}
            : dialog?.editDescription
              ? { description: dialog.editDescription }
              : {})}
          className="sia-crud-dialog"
        >
          <Form
            key={cle}
            fields={fields}
            defaultValues={valeurs}
            {...(validate ? { validate } : {})}
            columns={dialog?.columns ?? 1}
            submitText={
              dialog?.submitText ?? (creation ? "Créer" : "Enregistrer")
            }
            // Une création part de champs vides : exiger une modification
            // bloquerait l'envoi d'un formulaire dont tous les défauts
            // conviennent.
            requireDirty={modification}
            onSubmit={async (values) => {
              await onSubmit?.(values, {
                mode: creation ? "create" : "edit",
                ...(state?.row !== undefined ? { row: state.row } : {}),
                ...(state?.index !== undefined ? { index: state.index } : {}),
              });
              onClose();
            }}
          />
        </Modal>
      )}

      {consultation && state?.row !== undefined && (
        <Modal
          open
          onOpenChange={(ouvert) => {
            if (!ouvert) onClose();
          }}
          title={dialog?.viewTitle ?? "Détail"}
          {...(dialog?.viewDescription
            ? { description: dialog.viewDescription }
            : {})}
          className="sia-crud-dialog"
        >
          {renderDetail?.(state.row, state.index ?? 0) ?? (
            /*
              À défaut de rendu à soi, les colonnes du tableau.

              Elles disent déjà quoi montrer et comment : un montant y est
              formaté, un statut y est une pastille. Redemander la même chose
              sous une autre forme ferait deux descriptions du même objet.
            */
            <Descriptions
              columns={dialog?.detailColumns ?? 2}
              items={columns
                .filter((colonne) => colonne.card !== "hidden")
                .map((colonne) => ({
                  key: colonne.key,
                  label: colonne.header,
                  value: renduCellule(
                    state.row as T,
                    state.index ?? 0,
                    colonne,
                  ),
                }))}
            />
          )}
        </Modal>
      )}
    </>
  );
}
