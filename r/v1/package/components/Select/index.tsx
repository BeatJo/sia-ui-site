import {
  Children,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn, looseIncludes } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import { Overlay, type OverlayPlacement, type OverlayProps } from "../Overlay";
import { Spinner, type SpinnerProps } from "../Spinner";
import { ChevronDownIcon, SearchIcon, CheckIcon, XIcon } from "../Icons";
import "./styles.css";

export interface SelectOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  keywords?: string[];
}

export interface SelectProps {
  id?: string;
  name?: string;
  options?: SelectOption[];
  /** Compatibility path. Prefer the options prop. */
  children?: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, option?: SelectOption) => void;
  /** Le texte du champ vide. Par défaut, `select` de la locale. */
  placeholder?: string;
  searchable?: boolean;
  /** Le texte indicatif de la recherche. Par défaut, `searchPlaceholder` de la locale. */
  searchPlaceholder?: string;
  fetcher?: (query: string, signal?: AbortSignal) => Promise<SelectOption[]>;
  debounce?: number;
  /** Pendant le chargement distant. Par défaut, `selectField.loadingOptions` de la locale. */
  loadingText?: ReactNode;
  /** Quand rien ne correspond. Par défaut, `noResults` de la locale. */
  emptyText?: ReactNode;
  /** Quand le chargement échoue. Par défaut, `selectField.loadError` de la locale. */
  errorText?: ReactNode;
  clearable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  placement?: OverlayPlacement;
  /**
   * Réglages du panneau de la liste — décalage, marge au bord, classe.
   * `matchAnchorWidth: false` le laisse prendre la largeur de ses options.
   */
  overlayProps?: Partial<Omit<OverlayProps, "open" | "anchorRef" | "onOpenChange" | "children">>;
  /** Réglages de l'indicateur de chargement des options distantes. */
  spinnerProps?: Partial<SpinnerProps>;
  /**
   * Ce que montre le déclencheur. Par défaut, le libellé de l'option.
   *
   * La liste garde ses libellés complets — « 🇨🇲 Cameroun (+237) » — pendant
   * que le champ fermé n'affiche que ce qui tient : « 🇨🇲 +237 ».
   */
  renderValue?: (option: SelectOption | undefined) => ReactNode;
  /**
   * `embedded` retire bordure, fond et largeur pleine du déclencheur : le
   * `Select` se loge alors dans un autre contrôle — l'indicatif d'un
   * `PhoneInput`, la taille de page d'une `Pagination`.
   */
  variant?: "default" | "embedded";
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
}

function optionsFromChildren(children: ReactNode): SelectOption[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement<{ value?: string; disabled?: boolean; children?: ReactNode }>(child))
      return [];
    const value = child.props.value;
    if (value === undefined) return [];
    return [{
      value: String(value),
      label: child.props.children,
      ...(child.props.disabled !== undefined ? { disabled: child.props.disabled } : {}),
    }];
  });
}

function optionText(option: SelectOption) {
  return [option.label, option.description, ...(option.keywords ?? [])]
    .map((value) => (typeof value === "string" || typeof value === "number" ? String(value) : ""))
    .join(" ");
}

/**
 * Un choix parmi une liste.
 *
 * Le champ n'est pas un `<select>` natif : celui-ci ne sait ni chercher, ni
 * afficher une description sous chaque option, ni charger ses choix à la
 * demande. Le comportement clavier du natif, lui, est reproduit — flèches,
 * première lettre, échappement.
 *
 * `fetcher` sert les listes qu'on ne peut pas descendre en entier : la
 * requête part après la frappe et s'annule si l'on continue à taper.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    id,
    name,
    options,
    children,
    value,
    defaultValue = "",
    onValueChange,
    placeholder: placeholderProp,
    searchable = false,
    searchPlaceholder: searchPlaceholderProp,
    fetcher,
    debounce = 250,
    loadingText: loadingTextProp,
    emptyText: emptyTextProp,
    errorText: errorTextProp,
    clearable = false,
    disabled = false,
    invalid = false,
    required = false,
    placement = "bottom-start",
    overlayProps,
    spinnerProps,
    renderValue,
    variant = "default",
    className,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    ...ariaProps
  },
  forwardedRef,
) {
  const locale = useSiaLocale();
  const placeholder = placeholderProp ?? locale.select;
  const searchPlaceholder = searchPlaceholderProp ?? locale.searchPlaceholder;
  const loadingText = loadingTextProp ?? locale.selectField.loadingOptions;
  const emptyText = emptyTextProp ?? locale.noResults;
  const errorText = errorTextProp ?? locale.selectField.loadError;
  const generatedId = useId();
  const controlId = id ?? `sia-select-${generatedId.replace(/:/g, "")}`;
  const listboxId = `${controlId}-listbox`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const staticOptions = useMemo(
    () => options ?? optionsFromChildren(children),
    [children, options],
  );
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [remoteOptions, setRemoteOptions] = useState<SelectOption[]>([]);
  const [selectedRemoteOption, setSelectedRemoteOption] = useState<SelectOption>();
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const currentValue = value ?? internalValue;
  const sourceOptions = fetcher ? remoteOptions : staticOptions;
  const visibleOptions = useMemo(() => {
    if (fetcher) return sourceOptions;
    // Accents et casse ignorés : « sen » trouve « Sénégal ».
    const needle = query.trim();
    return needle
      ? sourceOptions.filter((option) => looseIncludes(optionText(option), needle))
      : sourceOptions;
  }, [fetcher, query, sourceOptions]);
  const selectedOption = [...staticOptions, ...remoteOptions].find(
    (option) => option.value === currentValue,
  ) ?? (selectedRemoteOption?.value === currentValue ? selectedRemoteOption : undefined);

  useEffect(() => {
    if (!open || !fetcher) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setLoadError(false);
      try {
        const nextOptions = await fetcher(query, controller.signal);
        if (!controller.signal.aborted) setRemoteOptions(nextOptions);
      } catch {
        if (!controller.signal.aborted) setLoadError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, debounce);
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [debounce, fetcher, open, query]);

  useEffect(() => {
    if (!open) return;
    // La valeur en vigueur si elle est dans la liste, la première option
    // sinon : après une recherche qui l'écarte, Entrée doit choisir le premier
    // résultat plutôt que ne rien faire.
    const selected = visibleOptions.findIndex((option) => option.value === currentValue);
    setActiveIndex(selected >= 0 ? selected : visibleOptions.findIndex((option) => !option.disabled));
    if (searchable || fetcher) window.setTimeout(() => searchRef.current?.focus(), 0);
  }, [currentValue, fetcher, open, searchable, visibleOptions]);

  // L'option active reste visible : au clavier, descendre au-delà du bas de
  // la liste la laissait hors champ, et l'on choisissait à l'aveugle.
  // `nearest` ne fait défiler que si elle sort de la zone visible.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    document
      .getElementById(`${listboxId}-${activeIndex}`)
      ?.scrollIntoView?.({ block: "nearest" });
  }, [activeIndex, listboxId, open]);

  const setTriggerRef = (node: HTMLButtonElement | null) => {
    triggerRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };
  const changeValue = (nextValue: string, option?: SelectOption) => {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue, option);
  };
  const choose = (option: SelectOption) => {
    if (option.disabled) return;
    if (fetcher) setSelectedRemoteOption(option);
    changeValue(option.value, option);
    setOpen(false);
    setQuery("");
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };
  const moveActive = (direction: 1 | -1) => {
    if (!visibleOptions.length) return;
    let next = activeIndex;
    for (let count = 0; count < visibleOptions.length; count += 1) {
      next = (next + direction + visibleOptions.length) % visibleOptions.length;
      if (!visibleOptions[next]?.disabled) break;
    }
    setActiveIndex(next);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      if (!open) setOpen(true);
      else moveActive(event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (event.key === "Home" && open) {
      event.preventDefault();
      setActiveIndex(visibleOptions.findIndex((option) => !option.disabled));
    } else if (event.key === "End" && open) {
      event.preventDefault();
      for (let index = visibleOptions.length - 1; index >= 0; index -= 1) {
        if (!visibleOptions[index]?.disabled) {
          setActiveIndex(index);
          break;
        }
      }
    } else if (event.key === "Enter" && open && activeIndex >= 0) {
      event.preventDefault();
      const active = visibleOptions[activeIndex];
      if (active) choose(active);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (!open && clearable && currentValue && ["Backspace", "Delete"].includes(event.key)) {
      event.preventDefault();
      changeValue("");
    }
  };

  const showSearch = searchable || Boolean(fetcher);
  const activeOption = activeIndex >= 0 ? visibleOptions[activeIndex] : undefined;

  return (
    <div
      className={cn(
        "sia-select",
        variant === "embedded" && "sia-select--embedded",
        disabled && "sia-select--disabled",
        className,
      )}
    >
      {name && <input type="hidden" name={name} value={currentValue} />}
      <button
        ref={setTriggerRef}
        id={controlId}
        type="button"
        className={cn("sia-select__trigger", invalid && "sia-select__trigger--invalid")}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open && activeOption ? `${listboxId}-${activeIndex}` : undefined}
        aria-invalid={ariaInvalid ?? (invalid || undefined)}
        aria-required={ariaRequired ?? (required || undefined)}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
        {...ariaProps}
      >
        <span className={cn("sia-select__value", !selectedOption && "sia-select__placeholder")}>{renderValue ? renderValue(selectedOption) : (selectedOption?.label ?? placeholder)}</span>
        <span className="sia-select__actions">
          {clearable && currentValue && !disabled && (
            <span
              className="sia-select__clear"
              aria-hidden="true"
              title={locale.selectField.clearSelection}
              onClick={(event) => {
                event.stopPropagation();
                changeValue("");
              }}
            >
              <XIcon />
            </span>
          )}
          <ChevronDownIcon className="sia-select__chevron" aria-hidden="true" />
        </span>
      </button>
      <Overlay
        placement={placement}
        matchAnchorWidth
        {...overlayProps}
        className={cn("sia-select__overlay", overlayProps?.className)}
        open={open}
        anchorRef={triggerRef}
        onOpenChange={setOpen}
      >
        <div className="sia-select__panel" onKeyDown={handleKeyDown}>
          {showSearch && (
            <div className="sia-select__search-wrap">
              <SearchIcon aria-hidden="true" />
              <input
                ref={searchRef}
                className="sia-select__search"
                value={query}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                onChange={(event) => setQuery(event.target.value)}
              />
              {loading && <Spinner size="xs" label={locale.loading} {...spinnerProps} />}
            </div>
          )}
          <div id={listboxId} role="listbox" aria-busy={loading || undefined} className="sia-select__options">
            {loading && !visibleOptions.length ? (
              <div className="sia-select__status">{loadingText}</div>
            ) : loadError ? (
              <div className="sia-select__status sia-select__status--error">{errorText}</div>
            ) : !visibleOptions.length ? (
              <div className="sia-select__status">{emptyText}</div>
            ) : (
              visibleOptions.map((option, index) => (
                <button
                  id={`${listboxId}-${index}`}
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={currentValue === option.value}
                  disabled={option.disabled}
                  className={cn(
                    "sia-select__option",
                    index === activeIndex && "sia-select__option--active",
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => choose(option)}
                >
                  <span className="sia-select__option-content">
                    <span>{option.label}</span>
                    {option.description && <small>{option.description}</small>}
                  </span>
                  {currentValue === option.value && <CheckIcon aria-hidden="true" />}
                </button>
              ))
            )}
          </div>
        </div>
      </Overlay>
    </div>
  );
});

Select.displayName = "Select";
