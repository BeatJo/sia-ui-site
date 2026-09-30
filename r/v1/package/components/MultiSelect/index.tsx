import { useMemo, useState } from "react";
import { cn } from "@sia-ui/utils";
import { formatMessage, useSiaLocale } from "@sia-ui/headless";
import type { SelectOption } from "../Select";
import "./styles.css";

export type { SelectOption } from "../Select";
import { XIcon } from "../Icons";
export interface MultiSelectProps {
  id?: string;
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** Le texte du champ vide. Par défaut, `select` de la locale. */
  placeholder?: string;
  /** Le texte indicatif de la recherche. Par défaut, `searchPlaceholder` de la locale. */
  searchPlaceholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
}
/**
 * Plusieurs choix dans une liste.
 *
 * Les valeurs retenues s'affichent dans le champ, retirables une à une :
 * un compte seul — « 3 sélectionnés » — oblige à rouvrir la liste pour
 * savoir lesquels.
 */
export function MultiSelect({
  id,
  options,
  value,
  defaultValue = [],
  onValueChange,
  placeholder: placeholderProp,
  searchPlaceholder: searchPlaceholderProp,
  searchable = true,
  disabled,
  className,
  ...ariaProps
}: MultiSelectProps) {
  const locale = useSiaLocale();
  const placeholder = placeholderProp ?? locale.select;
  const searchPlaceholder = searchPlaceholderProp ?? locale.searchPlaceholder;
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const current = value ?? internal;
  const selected = new Set(current);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return options.filter(
      (option) =>
        !needle ||
        [String(option.label), ...(option.keywords ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(needle),
    );
  }, [options, query]);
  const update = (next: string[]) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };
  return (
    <div
      className={cn(
        "sia-multi-select",
        disabled && "sia-multi-select--disabled",
        className,
      )}
      {...ariaProps}
    >
      <div
        id={id}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        className="sia-multi-select__trigger"
        aria-disabled={disabled || undefined}
        aria-expanded={open}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={(event) => {
          if (!disabled && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            setOpen(!open);
          }
        }}
      >
        {current.length ? (
          <span className="sia-multi-select__values">
            {options
              .filter((option) => selected.has(option.value))
              .map((option) => (
                <span key={option.value}>
                  {option.label}
                  <button
                    type="button"
                    aria-label={formatMessage(locale.multiSelect.removeItem, {
                      name: String(option.label),
                    })}
                    onClick={(event) => {
                      event.stopPropagation();
                      update(current.filter((item) => item !== option.value));
                    }}
                  >
                    <XIcon />
                  </button>
                </span>
              ))}
          </span>
        ) : (
          placeholder
        )}
      </div>
      {open && (
        <div className="sia-multi-select__panel">
          {searchable && (
            <input
              value={query}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              onChange={(event) => setQuery(event.target.value)}
            />
          )}
          {filtered.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                checked={selected.has(option.value)}
                disabled={option.disabled}
                onChange={(event) =>
                  update(
                    event.target.checked
                      ? [...current, option.value]
                      : current.filter((item) => item !== option.value),
                  )
                }
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
