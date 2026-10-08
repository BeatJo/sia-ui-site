import { useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import {
  readSubmitError,
  useAsyncValidation,
  useLocalForm,
  useSiaLocale,
  type AsyncFieldValidator,
  type FormAdapter,
  type FormErrors,
  type FormSubmitResult,
  type FormValidator,
} from "@sia-ui/headless";
import { Alert, type AlertProps } from "../Alert";
import { Button, type ButtonProps } from "../Button";
import { Field, type FieldProps, type FieldValue } from "../Field";
import { Spinner, type SpinnerProps } from "../Spinner";
import "./styles.css";

/** Un champ du formulaire : les props de `Field`, plus sa place. */
export interface FormFieldConfig extends Omit<FieldProps, "field" | "name"> {
  /** La clé dans les valeurs. C'est elle qui branche le champ. */
  name: string;
  /** Nombre de colonnes occupées. Ignoré sur une seule colonne. */
  colSpan?: number;
  rowSpan?: number;
  /**
   * Une vérification qui demande le serveur — un identifiant libre, un nom
   * de domaine disponible. Rend le message d'erreur, ou rien.
   *
   * Relancée après la frappe (`asyncValidationDelay`), annulée à la frappe
   * suivante par son `signal`. Pendant la vérification le champ l'annonce,
   * et l'envoi attend ; une valeur refusée bloque l'envoi.
   */
  validateAsync?: AsyncFieldValidator<FieldValue>;
  /** Affiché sous le champ quand `validateAsync` accepte la valeur. */
  validText?: ReactNode;
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

/** Les champs, groupes aplatis. */
function champsAplatis(fields: FormEntry[]): FormFieldConfig[] {
  return fields.flatMap((entree) => (isGroup(entree) ? entree.fields : [entree]));
}

/** Les noms de champs, groupes aplatis. */
export function formFieldNames(fields: FormEntry[]): string[] {
  return champsAplatis(fields).map((champ) => champ.name);
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
  /**
   * L'envoi.
   *
   * Rendre des erreurs par champ les pose sous les champs. Lever une erreur
   * l'affiche dans une alerte en tête des boutons — et une `HttpError` de
   * `@sia-ui/api` voit en plus ses erreurs de champ posées à leur place.
   */
  onSubmit?: (
    values: TValues,
  ) => FormSubmitResult<TValues> | Promise<FormSubmitResult<TValues>>;
  columns?: number;
  /** Le texte du bouton d'envoi. Par défaut, `save` de la locale. */
  submitText?: ReactNode;
  /** Le texte du bouton de remise à zéro. Par défaut, `reset` de la locale. */
  clearText?: ReactNode;
  showClear?: boolean;
  /**
   * Les props du bouton d'envoi. `disabled` s'ajoute aux conditions du
   * formulaire au lieu d'être remplacé par elles.
   */
  submitProps?: ButtonProps;
  /** Millisecondes sans frappe avant une vérification `validateAsync`. 400 par défaut. */
  asyncValidationDelay?: number;
  /** Remplace entièrement la barre de boutons. */
  actions?: ReactNode;
  loading?: boolean;
  /** Désactive l'envoi tant que rien n'a changé. */
  requireDirty?: boolean;
  /** Désactive l'envoi tant qu'une erreur est en vigueur. */
  requireValid?: boolean;
  className?: string;
  /**
   * Les props communes à tous les champs — orientation, libellé
   * « facultatif », `controlProps`. Chaque champ déclaré dans `fields`
   * l'emporte sur elles.
   *
   * Sans ce que le formulaire branche lui-même : le nom, la valeur, le
   * changement et la sortie de champ (`field`), ni les messages d'erreur et
   * de validation, qui sont propres à chaque champ.
   */
  fieldProps?: Partial<
    Omit<
      FieldProps,
      | "field"
      | "name"
      | "value"
      | "defaultValue"
      | "onValueChange"
      | "onBlur"
      | "error"
      | "success"
      | "message"
    >
  >;
  /**
   * Les props de l'`Alert` qui annonce un échec d'envoi. Sans `children`, le
   * message d'échec, ni `onDismiss`, qui l'efface.
   */
  alertProps?: Partial<Omit<AlertProps, "children" | "onDismiss">>;
  /**
   * Les props du `Spinner` d'une vérification `validateAsync` en cours.
   * Sans `label`, repris de la locale comme le texte qui l'accompagne.
   */
  spinnerProps?: Partial<Omit<SpinnerProps, "label">>;
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
  submitText,
  clearText,
  showClear = false,
  submitProps,
  actions,
  loading = false,
  requireDirty = true,
  requireValid = true,
  asyncValidationDelay = 400,
  className,
  fieldProps,
  alertProps,
  spinnerProps,
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
  const locale = useSiaLocale();

  /**
   * L'échec du dernier envoi, quand il ne se range pas sous un champ.
   *
   * Sans lui, un 409 ou un 500 devenait une promesse rejetée que personne ne
   * lisait : le bouton se relâchait, et rien ne disait pourquoi.
   */
  const [echec, setEchec] = useState<string | null>(null);

  // Les vérifications serveur déclarées sur les champs.
  const verifications: Record<string, AsyncFieldValidator> = {};
  for (const champ of champsAplatis(fields)) {
    if (champ.validateAsync) {
      verifications[champ.name] = champ.validateAsync as AsyncFieldValidator;
    }
  }
  const asynchrone = useAsyncValidation(verifications, form.state.values, {
    delay: asyncValidationDelay,
  });

  const envoyer = () => {
    // Entrée dans un champ envoie le formulaire même bouton désactivé : la
    // garde est ici, pas seulement sur le bouton.
    if (asynchrone.pending || asynchrone.invalid || submitProps?.disabled) return;
    setEchec(null);
    form.submit().catch((error: unknown) => {
      const { fields: erreurs, message } = readSubmitError(error);
      const connus = new Set(formFieldNames(fields));
      const sousLesChamps: Record<string, string> = {};
      const ailleurs: string[] = [];

      for (const [nom, texte] of Object.entries(erreurs)) {
        if (connus.has(nom)) sousLesChamps[nom] = texte;
        else ailleurs.push(texte);
      }

      form.setErrors(sousLesChamps as FormErrors<TValues>);
      // Ce que les champs affichent déjà n'est pas répété dans l'alerte ; ce
      // qui vise un champ absent du formulaire, si.
      if (ailleurs.length > 0) setEchec(ailleurs.join(" "));
      else if (Object.keys(sousLesChamps).length === 0) {
        setEchec(message ?? locale.submitError);
      }
    });
  };

  const busy = loading || form.state.isSubmitting;
  const submitDisabled =
    busy ||
    Boolean(submitProps?.disabled) ||
    asynchrone.pending ||
    asynchrone.invalid ||
    (requireDirty && !form.state.isDirty) ||
    (requireValid && !form.state.isValid);

  const grille = (nombre: number): CSSProperties => ({
    gridTemplateColumns: `repeat(${nombre}, minmax(0, 1fr))`,
  });

  const rendre = (config: FormFieldConfig) => {
    const { name, colSpan, rowSpan, validateAsync, validText, ...props } = config;
    const binding = form.bind(name as keyof TValues & string);
    const verification = validateAsync ? asynchrone.states[name] : undefined;

    // L'erreur locale passe devant : une valeur mal formée n'a pas à être
    // vérifiée auprès du serveur pour être refusée.
    const etat =
      binding.error || !verification
        ? {}
        : verification.status === "checking"
          ? {
              message: (
                <span className="sia-form-checking">
                  <Spinner size="xs" {...spinnerProps} label={locale.checking} />
                  {locale.checking}
                </span>
              ),
            }
          : verification.status === "invalid"
            ? { error: verification.error }
            : verification.status === "valid" && validText
              ? { success: validText }
              : {};

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
          {...fieldProps}
          {...props}
          {...(fieldProps?.className || props.className
            ? { className: cn(fieldProps?.className, props.className) }
            : {})}
          {...etat}
          field={binding}
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
        envoyer();
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

      {echec && (
        <Alert
          tone="danger"
          {...alertProps}
          className={cn("sia-form-error", alertProps?.className)}
          onDismiss={() => setEchec(null)}
        >
          {echec}
        </Alert>
      )}

      {actions ?? (
        <div className="sia-form-actions">
          {showClear && (
            <Button
              type="button"
              variant="ghost"
              disabled={busy}
              onClick={() => form.reset()}
            >
              {clearText ?? locale.reset}
            </Button>
          )}
          <Button
            type="submit"
            {...submitProps}
            loading={busy}
            disabled={submitDisabled}
          >
            {submitText ?? locale.save}
          </Button>
        </div>
      )}
    </form>
  );
}
