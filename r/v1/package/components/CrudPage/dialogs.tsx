import { type Key, type ReactNode } from "react";
import {
  hasFormErrors,
  useSiaLocale,
  type FormSubmitResult,
  type FormValidator,
} from "@sia-ui/headless";
import { cn } from "@sia-ui/utils";
import { Modal, type ModalProps } from "../Modal";
import {
  Form,
  formFieldNames,
  type FormEntry,
  type FormProps,
  type FormShape,
} from "../Form";
import { Descriptions, type DescriptionsProps } from "../Descriptions";
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
 * Un formulaire vide : sans valeur initiale déclarée, un champ non contrôlé
 * le devient à la première frappe, et React s'en plaint à juste titre.
 */
export function valeursVides(fields: FormEntry[]): FormShape {
  const valeurs: FormShape = {};
  for (const nom of formFieldNames(fields)) valeurs[nom] = "";
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
  for (const nom of formFieldNames(fields)) {
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

/**
 * Les props des deux `Modal` — formulaire et détail — qu'on peut régler.
 *
 * Sans `open` ni `onOpenChange`, qui suivent l'état des boîtes, ni
 * `children`. Sans `title` ni `description` non plus : ils diffèrent d'une
 * boîte à l'autre et se règlent par `dialog`. `className` s'ajoute à celui
 * des boîtes.
 */
export type CrudModalProps = Partial<
  Omit<ModalProps, "open" | "onOpenChange" | "children" | "title" | "description">
>;

/**
 * Les props du `Form` de création et de modification qu'on peut régler —
 * `showClear`, `submitProps`, `fieldProps`.
 *
 * Sans ce que la boîte branche elle-même : les champs, les valeurs de
 * départ, la validation et l'envoi, qui ont leurs props sur la page ; ni
 * l'adaptateur `form`, qui couperait la boîte de ses propres valeurs.
 */
export type CrudFormProps = Partial<
  Omit<FormProps, "fields" | "defaultValues" | "validate" | "onSubmit" | "form">
>;

/** Les props de la vue de détail par défaut. Sans `items`, tirés des colonnes. */
export type CrudDescriptionsProps = Partial<Omit<DescriptionsProps, "items">>;

export interface CrudDialogsProps<T> {
  state: CrudDialogState<T> | null;
  onClose: () => void;

  columns: Array<DataTableColumn<T>>;
  fields?: FormEntry[] | undefined;
  validate?: FormValidator<FormShape> | undefined;
  /**
   * Les champs et la validation de la modification, quand ils diffèrent de
   * la création — un mot de passe exigé à la création seulement. À défaut,
   * `fields` et `validate` servent aux deux.
   */
  editFields?: FormEntry[] | undefined;
  editValidate?: FormValidator<FormShape> | undefined;
  onSubmit?:
    | ((
        values: FormShape,
        context: { mode: "create" | "edit"; row?: T; index?: number },
      ) => FormSubmitResult<FormShape> | Promise<FormSubmitResult<FormShape>>)
    | undefined;

  createDefaults?: FormShape | undefined;
  toFormValues?: ((row: T) => FormShape) | undefined;
  renderDetail?: ((row: T, index: number) => ReactNode) | undefined;

  getRowKey?: ((row: T, index: number) => Key) | undefined;
  dialog?: CrudDialogOptions | undefined;

  /** Voir `CrudModalProps`. */
  modalProps?: CrudModalProps | undefined;
  /** Voir `CrudFormProps`. */
  formProps?: CrudFormProps | undefined;
  /** Voir `CrudDescriptionsProps`. */
  descriptionsProps?: CrudDescriptionsProps | undefined;
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
  fields: champsCreation,
  validate: validationCreation,
  editFields,
  editValidate,
  onSubmit,
  createDefaults,
  toFormValues,
  renderDetail,
  getRowKey,
  dialog,
  modalProps,
  formProps,
  descriptionsProps,
}: CrudDialogsProps<T>) {
  const locale = useSiaLocale();
  const creation = state?.mode === "create";
  const modification = state?.mode === "edit";
  const consultation = state?.mode === "view";
  const fields = modification ? (editFields ?? champsCreation) : champsCreation;
  const validate = modification
    ? (editValidate ?? validationCreation)
    : validationCreation;

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
          {...modalProps}
          open
          onOpenChange={(ouvert) => {
            if (!ouvert) onClose();
          }}
          title={
            creation
              ? (dialog?.createTitle ?? locale.create)
              : (dialog?.editTitle ?? locale.edit)
          }
          {...(creation
            ? dialog?.createDescription
              ? { description: dialog.createDescription }
              : {}
            : dialog?.editDescription
              ? { description: dialog.editDescription }
              : {})}
          className={cn("sia-crud-dialog", modalProps?.className)}
        >
          <Form
            key={cle}
            fields={fields}
            defaultValues={valeurs}
            {...(validate ? { validate } : {})}
            columns={dialog?.columns ?? 1}
            submitText={
              dialog?.submitText ?? (creation ? locale.create : locale.save)
            }
            // Une création part de champs vides : exiger une modification
            // bloquerait l'envoi d'un formulaire dont tous les défauts
            // conviennent.
            requireDirty={modification}
            {...formProps}
            onSubmit={async (values) => {
              const resultat = await onSubmit?.(values, {
                mode: creation ? "create" : "edit",
                ...(state?.row !== undefined ? { row: state.row } : {}),
                ...(state?.index !== undefined ? { index: state.index } : {}),
              });
              // Refusé par le serveur : la boîte reste ouverte, les erreurs
              // sous les champs. La fermer perdrait la saisie.
              if (hasFormErrors(resultat)) return resultat;
              onClose();
            }}
          />
        </Modal>
      )}

      {consultation && state?.row !== undefined && (
        <Modal
          {...modalProps}
          open
          onOpenChange={(ouvert) => {
            if (!ouvert) onClose();
          }}
          title={dialog?.viewTitle ?? locale.crudPage.detailTitle}
          {...(dialog?.viewDescription
            ? { description: dialog.viewDescription }
            : {})}
          className={cn("sia-crud-dialog", modalProps?.className)}
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
              {...descriptionsProps}
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
