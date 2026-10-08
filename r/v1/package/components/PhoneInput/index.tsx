import { forwardRef, useMemo, useState } from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import { Input, type InputProps } from "../Input";
import { Select, type SelectOption, type SelectProps } from "../Select";
import "./styles.css";

export interface PhoneCountry {
  /** Code ISO 3166-1 alpha-2. */
  code: string;
  /** Indicatif, avec le `+`. */
  dial: string;
  /**
   * Le nom affiché. Par défaut, celui que donne `Intl.DisplayNames` dans la
   * langue de la locale — « Cameroun », « Cameroon ».
   */
  label?: string;
  flag: string;
  /** Nombre de chiffres attendus après l'indicatif. */
  digits?: number;
  /** Découpage visuel du numéro national : `[1, 2, 2, 2, 2]` → `6 12 34 56 78`. */
  groups?: number[];
}

/**
 * Les pays servis par défaut.
 *
 * Volontairement court et centré sur la zone franc : une liste mondiale pèse
 * 40 ko pour être fausse six mois plus tard. La prop `countries` la remplace
 * entièrement quand un projet en a besoin d'une autre.
 */
export const DEFAULT_COUNTRIES: PhoneCountry[] = [
  { code: "CM", dial: "+237", flag: "🇨🇲", digits: 9, groups: [1, 2, 2, 2, 2] },
  { code: "CI", dial: "+225", flag: "🇨🇮", digits: 10, groups: [2, 2, 2, 2, 2] },
  { code: "SN", dial: "+221", flag: "🇸🇳", digits: 9, groups: [2, 3, 2, 2] },
  { code: "GA", dial: "+241", flag: "🇬🇦", digits: 8, groups: [2, 2, 2, 2] },
  { code: "CG", dial: "+242", flag: "🇨🇬", digits: 9, groups: [2, 3, 2, 2] },
  { code: "CD", dial: "+243", flag: "🇨🇩", digits: 9, groups: [3, 3, 3] },
  { code: "BF", dial: "+226", flag: "🇧🇫", digits: 8, groups: [2, 2, 2, 2] },
  { code: "ML", dial: "+223", flag: "🇲🇱", digits: 8, groups: [2, 2, 2, 2] },
  { code: "BJ", dial: "+229", flag: "🇧🇯", digits: 10, groups: [2, 2, 2, 2, 2] },
  { code: "TG", dial: "+228", flag: "🇹🇬", digits: 8, groups: [2, 2, 2, 2] },
  { code: "TD", dial: "+235", flag: "🇹🇩", digits: 8, groups: [2, 2, 2, 2] },
  { code: "FR", dial: "+33", flag: "🇫🇷", digits: 9, groups: [1, 2, 2, 2, 2] },
  { code: "BE", dial: "+32", flag: "🇧🇪", digits: 9, groups: [3, 2, 2, 2] },
  { code: "CA", dial: "+1", flag: "🇨🇦", digits: 10, groups: [3, 3, 4] },
];

export interface PhoneInputProps
  extends Omit<InputProps, "value" | "defaultValue" | "onChange" | "type" | "left"> {
  /** Le numéro complet, indicatif compris : `+237612345678`. */
  value?: string;
  defaultValue?: string;
  /** Reçoit toujours la forme E.164, sans espaces. */
  onValueChange?: (value: string) => void;
  countries?: PhoneCountry[];
  /** Pays présélectionné, par code ISO. */
  defaultCountry?: string;
  /** Verrouille le pays et masque le sélecteur. */
  lockCountry?: boolean;
  /**
   * Le sélecteur d'indicatif : placement, recherche, rendu, classe.
   *
   * La valeur, les options et le rappel viennent de `countries` et du
   * numéro ; `disabled` suit celui du champ — pour figer le pays seul,
   * `lockCountry`.
   */
  countrySelectProps?: Partial<
    Omit<
      SelectProps,
      "value" | "defaultValue" | "options" | "children" | "onValueChange" | "disabled"
    >
  >;
}

// Un `Intl.DisplayNames` par langue, pour toute la durée de la page.
const regionNamesCache = new Map<string, Intl.DisplayNames | undefined>();

/** Les noms de pays dans une langue — `undefined` si Intl ne les connaît pas. */
function regionNames(language: string) {
  if (!regionNamesCache.has(language)) {
    let names: Intl.DisplayNames | undefined;
    try {
      names = new Intl.DisplayNames([language], { type: "region" });
    } catch {
      names = undefined;
    }
    regionNamesCache.set(language, names);
  }
  return regionNamesCache.get(language);
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

/** Découpe le numéro national selon le format du pays. */
function group(value: string, groups: number[] | undefined) {
  if (!groups || groups.length === 0) return value;
  const parts: string[] = [];
  let rest = value;
  for (const size of groups) {
    if (!rest) break;
    parts.push(rest.slice(0, size));
    rest = rest.slice(size);
  }
  if (rest) parts.push(rest);
  return parts.join(" ");
}

/** Retrouve le pays d'un numéro E.164 — le plus long indicatif d'abord. */
function detect(value: string, countries: PhoneCountry[]) {
  return [...countries]
    .sort((a, b) => b.dial.length - a.dial.length)
    .find((country) => value.startsWith(country.dial));
}

/**
 * Un numéro de téléphone international.
 *
 * L'indicatif et le numéro national sont deux champs distincts, parce qu'une
 * seule zone de saisie oblige à taper le `+237` à chaque fois — ce que
 * personne ne fait, d'où des numéros enregistrés sans indicatif.
 *
 * Aucune validation réelle n'est tentée : `libphonenumber-js` fait cela bien,
 * pèse 145 ko, et se branche par-dessus si un projet en a besoin. Ici, le
 * découpage visuel et la forme E.164 en sortie.
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value: valueProp,
      defaultValue = "",
      onValueChange,
      countries = DEFAULT_COUNTRIES,
      defaultCountry,
      lockCountry = false,
      countrySelectProps,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const locale = useSiaLocale();
    const controlled = valueProp !== undefined;
    const [internal, setInternal] = useState(defaultValue);
    const value = controlled ? valueProp : internal;

    const initial =
      countries.find((entry) => entry.code === defaultCountry) ??
      countries[0]!;
    const [picked, setPicked] = useState(initial.code);

    const country = useMemo(
      () =>
        detect(value, countries) ??
        countries.find((entry) => entry.code === picked) ??
        initial,
      [countries, initial, picked, value],
    );

    const national = value.startsWith(country.dial)
      ? value.slice(country.dial.length)
      : digitsOnly(value);

    // La recherche porte sur le nom, l'indicatif et le code ISO : « cam »,
    // « 237 » et « cm » trouvent tous le Cameroun. Le nom vient d'Intl dans
    // la langue de la locale, sauf si le pays en porte un.
    const options = useMemo<SelectOption[]>(() => {
      const names = regionNames(locale.language);
      return countries.map((entry) => ({
        value: entry.code,
        label: `${entry.flag} ${entry.label ?? names?.of(entry.code) ?? entry.code} (${entry.dial})`,
        keywords: [entry.code],
      }));
    }, [countries, locale.language]);

    const commit = (next: string) => {
      if (!controlled) setInternal(next);
      onValueChange?.(next);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        className={cn("sia-phone__field", className)}
        disabled={disabled}
        value={group(national, country.groups)}
        {...(country.digits ? { maxLength: country.digits + 8 } : {})}
        onChange={(event) => {
          let next = digitsOnly(event.target.value);
          if (country.digits) next = next.slice(0, country.digits);
          commit(next ? `${country.dial}${next}` : "");
        }}
        left={
          lockCountry ? (
            <span className="sia-phone__country">
              <span className="sia-phone__flag" aria-hidden="true">
                {country.flag}
              </span>
              <span className="sia-phone__dial">{country.dial}</span>
            </span>
          ) : (
            <Select
              variant="embedded"
              searchable
              aria-label={locale.countryCode}
              renderValue={() => (
                <span className="sia-phone__value">
                  <span className="sia-phone__flag" aria-hidden="true">
                    {country.flag}
                  </span>
                  <span className="sia-phone__dial">{country.dial}</span>
                </span>
              )}
              {...countrySelectProps}
              className={cn("sia-phone__country", countrySelectProps?.className)}
              options={options}
              value={country.code}
              disabled={disabled ?? false}
              onValueChange={(code) => {
                const next = countries.find((entry) => entry.code === code);
                if (!next) return;
                setPicked(next.code);
                // Le numéro national suit le changement d'indicatif : il est
                // rare mais courant de corriger le pays après coup.
                commit(national ? `${next.dial}${national}` : "");
              }}
            />
          )
        }
      />
    );
  },
);

PhoneInput.displayName = "PhoneInput";
