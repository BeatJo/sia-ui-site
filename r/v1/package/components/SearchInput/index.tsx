import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import { SearchIcon, XIcon } from "../Icons";
import "./styles.css";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Appelé à la validation, et après le délai si `searchDelay` est posé. */
  onSearch?: (value: string) => void;
  /**
   * Millisecondes d'inactivité avant de déclencher `onSearch`.
   *
   * `0` — le défaut — ne déclenche qu'à la validation. Au-delà, la recherche
   * part quand la frappe s'arrête : c'est ce que chaque projet réécrivait
   * autour de ce champ.
   */
  searchDelay?: number;
  clearable?: boolean;
  searchLabel?: string;
  clearLabel?: string;
}

/**
 * Une recherche, avec son délai.
 *
 * `searchDelay` vaut zéro par défaut : la recherche ne part qu'à la
 * validation. C'est le réglage sûr — une requête à chaque frappe se paie en
 * appels serveur, et le défaut ne doit pas engager ce coût sans qu'on l'ait
 * demandé.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      defaultValue = "",
      onValueChange,
      onSearch,
      searchDelay = 0,
      clearable = true,
      searchLabel: searchLabelProp,
      clearLabel = "Effacer la recherche",
      className,
      placeholder: placeholderProp,
      ...props
    },
    ref,
  ) => {
    const locale = useSiaLocale();
    const placeholder = placeholderProp ?? locale.searchPlaceholder;
    const searchLabel = searchLabelProp ?? locale.search;

    const [internal, setInternal] = useState(defaultValue);
    const current = value ?? internal;

    // Le champ reste immédiat : seul le déclenchement est retardé. Retarder
    // la valeur affichée donnerait un champ qui paraît figé à la frappe.
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const latest = useRef({ onSearch, searchDelay });
    latest.current = { onSearch, searchDelay };

    useEffect(() => () => clearTimeout(timer.current), []);

    const update = (next: string) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);

      const { searchDelay: wait, onSearch: search } = latest.current;
      if (!wait || !search) return;

      clearTimeout(timer.current);
      timer.current = setTimeout(() => search(next), wait);
    };

    return (
      <form
        className={cn("sia-search-input", className)}
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          // La validation l'emporte sur le délai en cours : on n'attend pas
          // 300 ms de plus après avoir appuyé sur Entrée.
          clearTimeout(timer.current);
          onSearch?.(current);
        }}
      >
        <span className="sia-search-input__icon" aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          ref={ref}
          type="search"
          value={current}
          placeholder={placeholder}
          aria-label={searchLabel}
          onChange={(event) => update(event.target.value)}
          {...props}
        />
        {clearable && current && (
          <button
            type="button"
            aria-label={clearLabel}
            className="sia-search-input__clear"
            onClick={() => {
              update("");
              // Effacer relance la recherche tout de suite : attendre le
              // délai pour afficher la liste complète n'a aucun sens.
              clearTimeout(timer.current);
              onSearch?.("");
            }}
          >
            <XIcon />
          </button>
        )}
      </form>
    );
  },
);

SearchInput.displayName = "SearchInput";
