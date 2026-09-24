import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import {
  useLocalForm,
  type FormAdapter,
  type FormValidator,
} from "@sia-ui/headless";
import { Button, type ButtonProps } from "../Button";
import { Field, type FieldProps, type FieldValue } from "../Field";
import "./styles.css";

/** Un champ du formulaire : les props de `Field`, plus sa place. */
export interface FormFieldConfig extends Omit<FieldProps, "field" | "name"> {
  /** La clé dans les valeurs. C'est elle qui branche le champ. */
  name: string;
  /** Nombre de colonnes occupées. Ignoré sur une seule colonne. */
  colSpan?: number;
  rowSpan?: number;
}

/** Un groupe de champs, avec son titre et sa propre grille. */
export interface FormFieldGroup {
  group: string;
  description?: ReactNode;
  columns?: number;
  fields: FormFieldConfig[];
}

export type FormEntry = FormFieldConfig | FormFieldGroup;

function isGroup(entry: FormEntry): entry is FormFieldGroup {
  return "group" in entry;
}

/**
 * Les valeurs qu'un formulaire déclaratif peut porter.
 *
 * Plus étroit que `FormValues` volontairement : ce formulaire rend ses
 * champs avec `Field`, qui ne sait afficher que ces types-là. Un objet
 * imbriqué n'aurait pas de contrôle pour le montrer.
 */
export type FormShape = Record<string, FieldValue>;

export interface FormProps<TValues extends FormShape = FormShape> {
  fields: FormEntry[];
  /**
   * L'adaptateur de formulaire.
   *
   * Sans lui, un `useLocalForm` est monté en interne à partir de
   * `defaultValues`, `validate` et `onSubmit`. Avec lui — react-hook-form,
   * Formik, votre propre magasin — le formulaire ne fait plus que rendre.
   */
  form?: FormAdapter<TValues>;
  defaultValues?: TValues;
  /** La validation. Un schéma Zod s'y branche en cinq lignes. */
  validate?: FormValidator<TValues>;
  onSubmit?: (values: TValues) => void | Promise<void>;
  columns?: number;
  submitText?: ReactNode;
  clearText?: ReactNode;
  showClear?: boolean;
  submitProps?: ButtonProps;
  /** Remplace entièrement la barre de boutons. */
  actions?: ReactNode;
  loading?: boolean;
  /** Désactive l'envoi tant que rien n'a changé. */
  requireDirty?: boolean;
  /** Désactive l'envoi tant qu'une erreur est en vigueur. */
  requireValid?: boolean;
  className?: string;
}

const VIDE = {} as FormShape;

/**
 * Un formulaire décrit par ses champs.
 *
 * Il ne connaît aucune bibliothèque de formulaires : il reçoit un
 * `FormAdapter`, ou en monte un lui-même. C'est ce qui lui permet de servir un
 * projet sous react-hook-form et un projet sans rien, avec le même code.
 *
 * ```tsx
 * <Form
 *   columns={2}
 *   defaultValues={{ nom: "", email: "" }}
 *   validate={createValidator({ nom: [required()], email: [required(), email()] })}
 *   onSubmit={(values) => api.post("/clients", { body: values })}
 *   fields={[
 *     { name: "nom", label: "Nom du client", required: true },
 *     { name: "email", label: "Adresse e-mail", type: "email", required: true },
 *   ]}
 * />
 * ```
 */
export function Form<TValues extends FormShape = FormShape>({
  fields,
  form: adapter,
  defaultValues,
  validate,
  onSubmit,
  columns = 1,
  submitText = "Enregistrer",
  clearText = "Réinitialiser",
  showClear = false,
  submitProps,
  actions,
  loading = false,
  requireDirty = true,
  requireValid = true,
  className,
}: FormProps<TValues>) {
  // Le hook est appelé sans condition, comme il se doit; son résultat n'est
  // utilisé que si aucun adaptateur n'a été fourni. Un `useLocalForm` inerte
  // ne coûte que trois `useState`.
  const interne = useLocalForm<TValues>({
    defaultValues: (defaultValues ?? VIDE) as TValues,
    ...(validate ? { validate } : {}),
    ...(onSubmit ? { onSubmit } : {}),
  });
  const form = adapter ?? interne;

  const busy = loading || form.state.isSubmitting;
  const submitDisabled =
    busy ||
    (requireDirty && !form.state.isDirty) ||
    (requireValid && !form.state.isValid);

  const grille = (nombre: number): CSSProperties => ({
    gridTemplateColumns: `repeat(${nombre}, minmax(0, 1fr))`,
  });

  const rendre = (config: FormFieldConfig) => {
    const { name, colSpan, rowSpan, ...props } = config;

    return (
      <div
        key={name}
        className="sia-form-cell"
        style={{
          ...(columns > 1 && colSpan ? { gridColumn: `span ${colSpan}` } : {}),
          ...(columns > 1 && rowSpan ? { gridRow: `span ${rowSpan}` } : {}),
        }}
      >
        <Field
          {...props}
          field={form.bind(name as keyof TValues & string)}
          {...(busy ? { disabled: true } : {})}
        />
      </div>
    );
  };

  return (
    <form
      className={cn("sia-form", className)}
      data-columns={columns}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void form.submit();
      }}
    >
      <div className="sia-form-grid" style={grille(columns)}>
        {fields.map((entry) =>
          isGroup(entry) ? (
            <fieldset key={entry.group} className="sia-form-group">
              <legend className="sia-form-group-header">
                <span className="sia-form-group-title">{entry.group}</span>
                {entry.description && (
                  <span className="sia-form-group-desc">{entry.description}</span>
                )}
              </legend>

              <div
                className="sia-form-group-grid"
                style={grille(columns === 1 ? 1 : (entry.columns ?? columns))}
              >
                {entry.fields.map(rendre)}
              </div>
            </fieldset>
          ) : (
            rendre(entry)
          ),
        )}
      </div>

      {actions ?? (
        <div className="sia-form-actions">
          {showClear && (
            <Button
              type="button"
              variant="ghost"
              disabled={busy}
              onClick={() => form.reset()}
            >
              {clearText}
            </Button>
          )}
          <Button
            type="submit"
            {...submitProps}
            loading={busy}
            disabled={submitDisabled}
          >
            {submitText}
          </Button>
        </div>
      )}
    </form>
  );
}
