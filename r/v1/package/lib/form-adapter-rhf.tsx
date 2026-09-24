/**
 * L'adaptateur react-hook-form du contrat `FormAdapter`.
 *
 * Ce fichier ne fait pas partie de `@sia-ui/react-web` : il n'est ni exporté
 * par le paquet, ni compilé avec lui. Il est servi par le registre et copié
 * dans les projets qui ont déjà react-hook-form. C'est la seule façon
 * d'offrir le branchement sans imposer la dépendance à tous les autres.
 *
 *   pnpm dlx @sia-ui/cli add form-adapter-rhf
 *   pnpm add react-hook-form
 *
 * Une fois copié, il se remplace par n'importe quel autre : Formik, Final
 * Form, TanStack Form. Les composants, eux, ne changent pas — ils ne voient
 * que `FieldBinding`.
 */
import { useCallback, useMemo } from "react";
import {
  useForm,
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import type { FieldBindOptions, FieldBinding, FormAdapter, FormErrors, FormState } from "@sia-ui/headless";

export interface RhfAdapterOptions<TValues extends FieldValues>
  extends UseFormProps<TValues> {
  onSubmit?: (values: TValues) => void | Promise<void>;
}

export interface RhfAdapter<TValues extends FieldValues>
  extends FormAdapter<TValues> {
  /** L'instance sous-jacente, pour tout ce que le contrat ne couvre pas. */
  form: UseFormReturn<TValues>;
}

/**
 * Enveloppe `useForm` dans le contrat.
 *
 * Le passage tient à une différence : `register` de react-hook-form rend des
 * gestionnaires qui reçoivent un événement DOM, alors que `FieldBinding`
 * transporte la valeur. C'est précisément ce qui rend le contrat portable sur
 * mobile — et ce que cet adaptateur traduit.
 */
export function useRhfFormAdapter<TValues extends FieldValues>(
  options: RhfAdapterOptions<TValues> = {},
): RhfAdapter<TValues> {
  const { onSubmit, ...formOptions } = options;
  const form = useForm<TValues>({ mode: "onBlur", ...formOptions });

  const {
    watch,
    setValue,
    setError,
    clearErrors,
    trigger,
    reset,
    handleSubmit,
    formState,
  } = form;

  // `watch()` sans argument réabonne le composant à chaque champ : c'est ce
  // qu'on veut ici, puisque le formulaire rend tous ses champs ensemble.
  const values = watch();

  const errors = useMemo(() => {
    const out: FormErrors<TValues> = {};
    for (const [key, entry] of Object.entries(formState.errors)) {
      const message = (entry as { message?: string } | undefined)?.message;
      if (message) out[key as keyof TValues] = message;
    }
    return out;
  }, [formState.errors]);

  const bind = useCallback(
    <K extends keyof TValues & string>(
      name: K,
      bindOptions: FieldBindOptions = {},
    ): FieldBinding<TValues[K]> => ({
      name,
      value: watch(name as Path<TValues>) as TValues[K],
      onChange: (value) =>
        setValue(name as Path<TValues>, value as PathValue<TValues, Path<TValues>>, {
          shouldDirty: true,
          shouldValidate: formOptions.mode === "onChange",
        }),
      onBlur: () => {
        void trigger(name as Path<TValues>);
      },
      error: (formState.errors[name] as { message?: string } | undefined)?.message,
      ...bindOptions,
    }),
    [formOptions.mode, formState.errors, setValue, trigger, watch],
  );

  const state: FormState<TValues> = {
    values: values as TValues,
    errors,
    touched: formState.touchedFields as FormState<TValues>["touched"],
    isSubmitting: formState.isSubmitting,
    isDirty: formState.isDirty,
    isValid: formState.isValid,
    submitCount: formState.submitCount,
  };

  return {
    form,
    state,
    bind,
    setValue: (name, value) =>
      setValue(name as Path<TValues>, value as PathValue<TValues, Path<TValues>>, {
        shouldDirty: true,
      }),
    setValues: (patch) => {
      for (const [key, value] of Object.entries(patch)) {
        setValue(key as Path<TValues>, value as PathValue<TValues, Path<TValues>>, {
          shouldDirty: true,
        });
      }
    },
    setError: (name, message) => {
      if (message) setError(name as Path<TValues>, { message });
      else clearErrors(name as Path<TValues>);
    },
    // Ce que rend `HttpError.fields` de `@sia-ui/api` entre directement ici :
    // les erreurs du serveur se posent sous les champs, pas dans un bandeau.
    setErrors: (next) => {
      for (const [key, message] of Object.entries(next)) {
        if (message) setError(key as Path<TValues>, { message: String(message) });
      }
    },
    reset: (next) => reset(next as TValues | undefined),
    submit: async () => {
      await handleSubmit(async (formValues) => {
        await onSubmit?.(formValues);
      })();
    },
    validate: () => trigger(),
  };
}
