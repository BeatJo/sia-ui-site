import {
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@sia-ui/utils";
import { Input, type InputProps } from "../Input";
import { Textarea, type TextareaProps } from "../Textarea";
import { CurrencyInput, type CurrencyInputProps } from "../CurrencyInput";
import { DatePicker, type DatePickerProps } from "../DatePicker";
import { TimePicker, type TimePickerProps } from "../TimePicker";
import "./styles.css";
import {
  DateTimePicker,
  type DateTimePickerProps,
  type DateTimeValue,
} from "../DateTimePicker";
import { Select, type SelectOption, type SelectProps } from "../Select";
import {
  MultiSelect,
  type MultiSelectProps,
} from "../MultiSelect";
import { Radio, RadioGroup, type RadioGroupProps } from "../RadioGroup";
import { Checkbox, type CheckboxProps } from "../Checkbox";
import { Switch, type SwitchProps } from "../Switch";
import { FileUpload, type FileUploadProps } from "../FileUpload";
import { ImageUpload, type ImageUploadProps } from "../ImageUpload";
import { Slider, type SliderProps, type SliderRangeValue } from "../Slider";
import { Rating, type RatingProps } from "../Rating";
import { ColorPicker, type ColorPickerProps } from "../ColorPicker";
import { RichTextEditor, type RichTextEditorProps } from "../RichTextEditor";
import { MarkdownEditor, type MarkdownEditorProps } from "../MarkdownEditor";
import { JsonEditor, type JsonEditorProps } from "../JsonEditor";
import { OtpInput, type OtpInputProps } from "../OtpInput";
import { TagsInput, type TagsInputProps } from "../TagsInput";
import { Autocomplete, type AutocompleteProps } from "../Autocomplete";
import {
  ReferenceSelect,
  type ReferenceOption,
  type ReferenceSelectProps,
} from "../ReferenceSelect";

export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "password"
  | "phone"
  | "number"
  | "currency"
  | "date"
  | "time"
  | "datetime"
  | "select"
  | "multiselect"
  | "radio"
  | "checkbox"
  | "switch"
  | "file"
  | "image"
  | "slider"
  | "rating"
  | "color"
  | "rich-text"
  | "markdown"
  | "json"
  | "otp"
  | "tags"
  | "autocomplete"
  | "reference"
  | "hidden";
export type FieldStatus = "default" | "error" | "success" | "warning";

type FieldControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
};
export type FieldValue =
  | string
  | number
  | SliderRangeValue
  | boolean
  | string[]
  | DateTimeValue
  | File[]
  | File
  | null
  | undefined;
type ControlProps = Partial<
  InputProps &
    TextareaProps &
    CurrencyInputProps &
    DatePickerProps &
    TimePickerProps &
    DateTimePickerProps &
    SelectProps &
    MultiSelectProps &
    RadioGroupProps &
    CheckboxProps &
    SwitchProps &
    FileUploadProps &
    ImageUploadProps &
    SliderProps &
    RatingProps &
    ColorPickerProps &
    RichTextEditorProps &
    MarkdownEditorProps &
    JsonEditorProps &
    OtpInputProps &
    TagsInputProps &
    AutocompleteProps &
    ReferenceSelectProps
>;

/**
 * Un branchement de formulaire, quel que soit le type exact de sa valeur.
 *
 * `onChange` est écrit en syntaxe de méthode, et ce n'est pas un détail :
 * TypeScript compare alors ses paramètres de façon bivariante. Sans cela, un
 * `FieldBinding<string>` — ce que rend `form.bind("email")` — serait refusé
 * ici, puisque le champ manipule une valeur plus large que la chaîne. Il
 * faudrait un `as` à chaque branchement.
 */
export interface FieldBindingLike {
  name: string;
  value: FieldValue;
  onChange(value: unknown): void;
  onBlur(): void;
  error?: string | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
}

export interface FieldProps {
  /**
   * Le branchement d'un formulaire, en une prop.
   *
   * `<Field label="Courriel" field={form.bind("email")} />` : nom, valeur,
   * changement, sortie de champ et message d'erreur arrivent ensemble. Le
   * champ ne sait pas d'où vient l'objet — `useLocalForm`, un adaptateur
   * react-hook-form, ou trois `useState`. C'est tout l'intérêt du contrat :
   * aucune bibliothèque de formulaires n'est importée ici.
   *
   * Les props écrites explicitement l'emportent, pour corriger un cas isolé
   * sans démonter le branchement.
   */
  field?: FieldBindingLike | undefined;
  /** Appelé quand le champ est quitté. Déclenche la validation « au blur ». */
  onBlur?: (() => void) | undefined;
  type?: FieldType;
  label?: ReactNode;
  helpText?: ReactNode;
  description?: ReactNode;
  status?: FieldStatus;
  message?: ReactNode;
  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
  required?: boolean;
  optional?: boolean;
  optionalLabel?: ReactNode;
  htmlFor?: string;
  orientation?: "vertical" | "horizontal";
  className?: string;
  name?: string;
  value?: FieldValue;
  defaultValue?: FieldValue;
  onValueChange?: (value: FieldValue) => void;
  options?: SelectOption[];
  referenceOptions?: ReferenceOption[];
  controlLabel?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  controlProps?: ControlProps;
  children?: ReactElement<FieldControlProps>;
}

function joinIds(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ") || undefined;
}

function createControl(props: FieldProps): ReactElement<FieldControlProps> {
  const {
    type = "text",
    name,
    value,
    defaultValue,
    onValueChange,
    options = [],
    referenceOptions = [],
    controlLabel,
    placeholder,
    disabled,
    controlProps = {},
  } = props;
  const stringValue = typeof value === "string" ? value : undefined;
  const stringDefault =
    typeof defaultValue === "string" ? defaultValue : undefined;
  const numberValue = typeof value === "number" ? value : undefined;
  const numberDefault =
    typeof defaultValue === "number" ? defaultValue : undefined;
  const rangeValue =
    Array.isArray(value) &&
    value.length === 2 &&
    value.every((item) => typeof item === "number")
      ? (value as SliderRangeValue)
      : undefined;
  const rangeDefault =
    Array.isArray(defaultValue) &&
    defaultValue.length === 2 &&
    defaultValue.every((item) => typeof item === "number")
      ? (defaultValue as SliderRangeValue)
      : undefined;
  const booleanValue = typeof value === "boolean" ? value : undefined;
  const booleanDefault =
    typeof defaultValue === "boolean" ? defaultValue : undefined;
  const arrayValue =
    Array.isArray(value) && value.every((item) => typeof item === "string")
      ? (value as string[])
      : undefined;
  const arrayDefault =
    Array.isArray(defaultValue) &&
    defaultValue.every((item) => typeof item === "string")
      ? (defaultValue as string[])
      : undefined;
  const inputProps = controlProps as InputProps;
  const stringState = {
    ...(stringValue !== undefined ? { value: stringValue } : {}),
    ...(stringDefault !== undefined ? { defaultValue: stringDefault } : {}),
  };
  const numberState = {
    ...(numberValue !== undefined ? { value: numberValue } : {}),
    ...(numberDefault !== undefined ? { defaultValue: numberDefault } : {}),
  };
  const arrayState = {
    ...(arrayValue !== undefined ? { value: arrayValue } : {}),
    ...(arrayDefault !== undefined ? { defaultValue: arrayDefault } : {}),
  };
  const common = {
    ...(name ? { name } : {}),
    ...(placeholder !== undefined ? { placeholder } : {}),
    ...(disabled !== undefined ? { disabled } : {}),
  };

  if (["text", "email", "password", "phone", "number", "hidden"].includes(type))
    return (
      <Input
        {...inputProps}
        type={type === "phone" ? "tel" : type}
        name={name}
        value={typeof value === "number" ? value : stringValue}
        defaultValue={
          typeof defaultValue === "number" ? defaultValue : stringDefault
        }
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) =>
          onValueChange?.(
            type === "number" ? event.target.valueAsNumber : event.target.value,
          )
        }
      />
    );
  if (type === "textarea")
    return (
      <Textarea
        {...(controlProps as TextareaProps)}
        name={name}
        value={stringValue}
        defaultValue={stringDefault}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onValueChange?.(event.target.value)}
      />
    );
  if (type === "currency")
    return (
      <CurrencyInput
        {...(controlProps as CurrencyInputProps)}
        name={name}
        value={numberValue ?? null}
        defaultValue={numberDefault ?? null}
        placeholder={placeholder}
        disabled={disabled}
        onValueChange={(next) => onValueChange?.(next ?? undefined)}
      />
    );
  if (type === "date")
    return (
      <DatePicker
        {...(controlProps as DatePickerProps)}
        {...common}
        {...stringState}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "time")
    return (
      <TimePicker
        {...(controlProps as TimePickerProps)}
        {...common}
        {...stringState}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "datetime") {
    const dateTimeState = {
      ...(value !== undefined ? { value: value as DateTimeValue } : {}),
      ...(defaultValue !== undefined
        ? { defaultValue: defaultValue as DateTimeValue }
        : {}),
    };
    return (
      <DateTimePicker
        {...(controlProps as DateTimePickerProps)}
        {...dateTimeState}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  }
  if (type === "select")
    return (
      <Select
        {...(controlProps as SelectProps)}
        options={options}
        {...common}
        {...stringState}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "multiselect")
    return (
      <MultiSelect
        {...(controlProps as MultiSelectProps)}
        options={options}
        {...arrayState}
        {...(placeholder !== undefined ? { placeholder } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "radio")
    return (
      <RadioGroup
        {...(controlProps as RadioGroupProps)}
        {...(name ? { name } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        {...(stringValue !== undefined ? { value: stringValue } : {})}
        {...(stringDefault !== undefined ? { defaultValue: stringDefault } : {})}
        onValueChange={(next) => onValueChange?.(next)}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            {...(option.disabled !== undefined
              ? { disabled: option.disabled }
              : {})}
          />
        ))}
      </RadioGroup>
    );
  if (type === "checkbox")
    return (
      <Checkbox
        {...(controlProps as CheckboxProps)}
        name={name}
        label={controlLabel}
        disabled={disabled}
        checked={booleanValue}
        defaultChecked={booleanDefault}
        onChange={(event) => onValueChange?.(event.target.checked)}
      />
    );
  if (type === "switch")
    return (
      <Switch
        {...(controlProps as SwitchProps)}
        {...(name ? { name } : {})}
        {...(controlLabel ? { label: controlLabel } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        {...(booleanValue !== undefined ? { checked: booleanValue } : {})}
        {...(booleanDefault !== undefined
          ? { defaultChecked: booleanDefault }
          : {})}
        onCheckedChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "file")
    return (
      <FileUpload
        {...(controlProps as FileUploadProps)}
        name={name}
        disabled={disabled}
        onFilesChange={(files) => onValueChange?.(files)}
      />
    );
  if (type === "image")
    return (
      <ImageUpload
        {...(controlProps as ImageUploadProps)}
        {...(disabled !== undefined ? { disabled } : {})}
        {...(stringValue !== undefined ? { value: stringValue } : {})}
        onValueChange={(file) => onValueChange?.(file)}
      />
    );
  if (type === "slider") {
    const {
      value: _controlValue,
      defaultValue: _controlDefaultValue,
      onValueChange: _controlOnValueChange,
      name: _controlName,
      disabled: _controlDisabled,
      ...sliderControlProps
    } = controlProps as SliderProps;
    return (
      <Slider
        {...sliderControlProps}
        {...(name !== undefined ? { name } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        {...(rangeValue !== undefined || numberValue !== undefined
          ? { value: (rangeValue ?? numberValue)! }
          : {})}
        {...(rangeDefault !== undefined || numberDefault !== undefined
          ? { defaultValue: (rangeDefault ?? numberDefault)! }
          : {})}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  }
  if (type === "rating")
    return (
      <Rating
        {...(controlProps as RatingProps)}
        {...(disabled !== undefined ? { disabled } : {})}
        {...numberState}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "color")
    return (
      <ColorPicker
        {...(controlProps as ColorPickerProps)}
        name={name}
        disabled={disabled}
        value={stringValue}
        defaultValue={stringDefault}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "rich-text")
    return (
      <RichTextEditor
        {...(controlProps as RichTextEditorProps)}
        {...stringState}
        {...(placeholder !== undefined ? { placeholder } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "markdown")
    return (
      <MarkdownEditor
        {...(controlProps as MarkdownEditorProps)}
        {...stringState}
        {...(placeholder !== undefined ? { placeholder } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "json")
    return (
      <JsonEditor
        {...(controlProps as JsonEditorProps)}
        {...stringState}
        {...(placeholder !== undefined ? { placeholder } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "otp")
    return (
      <OtpInput
        {...(controlProps as OtpInputProps)}
        {...stringState}
        {...(disabled !== undefined ? { disabled } : {})}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "tags")
    return (
      <TagsInput
        {...(controlProps as TagsInputProps)}
        {...arrayState}
        {...(placeholder !== undefined ? { placeholder } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  if (type === "autocomplete")
    return (
      <Autocomplete
        {...(controlProps as AutocompleteProps)}
        options={options}
        {...stringState}
        {...(placeholder !== undefined ? { placeholder } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        onValueChange={(next) => onValueChange?.(next)}
      />
    );
  return (
    <ReferenceSelect
      {...(controlProps as ReferenceSelectProps)}
      options={referenceOptions.length ? referenceOptions : options}
      {...stringState}
      {...(placeholder !== undefined ? { placeholder } : {})}
      {...(disabled !== undefined ? { disabled } : {})}
      onValueChange={(next) => onValueChange?.(next)}
    />
  );
}

/**
 * Fond le `field` dans les props, sans jamais écraser ce qui est écrit.
 *
 * Fait une fois, en tête de `Field` : `createControl` reçoit ensuite des
 * props ordinaires et n'a pas à connaître le contrat.
 */
function applyBinding(props: FieldProps): FieldProps {
  const { field } = props;
  if (!field) return props;

  return {
    ...props,
    name: props.name ?? field.name,
    value: props.value !== undefined ? props.value : field.value,
    onValueChange: (next) => {
      field.onChange(next);
      props.onValueChange?.(next);
    },
    onBlur: () => {
      field.onBlur();
      props.onBlur?.();
    },
    error: props.error ?? field.error,
    ...pick("required", props.required ?? field.required),
    ...pick("disabled", props.disabled ?? field.disabled),
  };
}

/** Omet la clé plutôt que d'écrire `undefined` — `exactOptionalPropertyTypes`. */
function pick<K extends string, V>(key: K, value: V | undefined) {
  return (value === undefined ? {} : { [key]: value }) as { [P in K]?: V };
}

/**
 * Le champ, et tout ce qui l'entoure.
 *
 * Un libellé, un contrôle, un message d'erreur, et les attributs qui les
 * relient — `id`, `aria-describedby`, `aria-invalid`. Ce câblage est
 * toujours le même et toujours oublié quelque part : ici il est fait une
 * fois.
 *
 * `type` choisit le contrôle parmi les vingt-sept que la bibliothèque
 * fournit. Le champ ne les réimplémente pas : il les monte et leur passe le
 * branchement.
 */
export function Field(rawProps: FieldProps) {
  const props = applyBinding(rawProps);
  const {
    onBlur,
    type = "text",
    label,
    helpText,
    description,
    status = "default",
    message,
    error,
    warning,
    success,
    required = false,
    optional = false,
    optionalLabel = "Optionnel",
    htmlFor,
    orientation = "vertical",
    className,
    children,
  } = props;
  const generatedControlId = useId();
  const labelId = useId();
  const helpTextId = useId();
  const messageId = useId();
  const source = children ?? createControl(props);
  const controlId = htmlFor ?? source.props.id ?? generatedControlId;
  const resolvedHelpText = helpText ?? description;
  const resolvedStatus: FieldStatus = error
    ? "error"
    : warning
      ? "warning"
      : success
        ? "success"
        : status;
  const resolvedMessage = error ?? warning ?? success ?? message;
  const describedBy = joinIds(
    source.props["aria-describedby"],
    resolvedHelpText ? helpTextId : undefined,
    resolvedMessage ? messageId : undefined,
  );
  const labelledBy = joinIds(
    source.props["aria-labelledby"],
    label ? labelId : undefined,
  );
  const controlProps: FieldControlProps = { id: controlId };
  if (describedBy) controlProps["aria-describedby"] = describedBy;
  if (labelledBy) controlProps["aria-labelledby"] = labelledBy;
  if (resolvedStatus === "error") controlProps["aria-invalid"] = true;
  else if (source.props["aria-invalid"] !== undefined)
    controlProps["aria-invalid"] = source.props["aria-invalid"];
  if (required) controlProps["aria-required"] = true;
  const control = isValidElement<FieldControlProps>(source)
    ? cloneElement(source, controlProps)
    : source;
  if (type === "hidden" && !children) return control;
  return (
    <div
      className={cn(
        "sia-field",
        `sia-field--${orientation}`,
        `sia-field--${resolvedStatus}`,
        className,
      )}
      data-status={resolvedStatus}
      data-required={required || undefined}
    >
      <div className="sia-field__header">
        {label && (
          <label id={labelId} htmlFor={controlId} className="sia-field__label">
            {label}
            {required && (
              <span className="sia-field__required" aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}
        {optional && !required && (
          <span className="sia-field__optional">{optionalLabel}</span>
        )}
      </div>
      <div className="sia-field__control" {...(onBlur ? { onBlur } : {})}>
        {control}
      </div>
      {resolvedHelpText && (
        <div id={helpTextId} className="sia-field__help">
          {resolvedHelpText}
        </div>
      )}
      {resolvedMessage && (
        <div
          id={messageId}
          role={resolvedStatus === "error" ? "alert" : "status"}
          className="sia-field__message"
        >
          {resolvedMessage}
        </div>
      )}
    </div>
  );
}
