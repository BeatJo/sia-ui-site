import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn, formatCurrency, numberSeparators, parseCurrency } from "@sia-ui/utils";
import { useFormatDefaults, useFormatLocale } from "@sia-ui/headless";
import "./styles.css";

export interface CurrencyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "inputMode"> { value?: number | null; defaultValue?: number | null; currency?: string; /** La langue du format et de la saisie. Par défaut, celle de la locale SIA. */ locale?: string; onValueChange?: (value: number | null) => void; invalid?: boolean; }

/**
 * La saisie d'un montant.
 *
 * La valeur rendue est un nombre, jamais la chaîne affichée : les espaces
 * de milliers et le symbole appartiennent à l'affichage, et un serveur qui
 * reçoit « 1 250 000 F CFA » ne peut rien en faire.
 */
export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(({ value, defaultValue = null, currency: currencyProp, locale: localeProp, onValueChange, invalid, className, onBlur, onFocus, ...props }, ref) => {
  const formatLocale = useFormatLocale();
  const formatDefaults = useFormatDefaults();
  const currency = currencyProp ?? formatDefaults.currency;
  const locale = localeProp ?? formatLocale;
  const [focused, setFocused] = useState(false);
  const [internal, setInternal] = useState<number | null>(defaultValue);
  const current = value === undefined ? internal : value;
  // Le brouillon de saisie porte le séparateur décimal en vigueur : « 1500,5 »
  // en français. Un point y serait relu comme séparateur de milliers s'il
  // était réglé ainsi.
  const brouillon = (montant: number | null) =>
    montant === null ? "" : String(montant).replace(".", numberSeparators({ locale }).decimal);
  const [draft, setDraft] = useState(brouillon(current));
  const display = focused ? draft : current === null ? "" : formatCurrency(current, { locale, currency });
  return <input {...props} ref={ref} className={cn("sia-input", "sia-currency-input", invalid && "sia-input--invalid", className)} inputMode="decimal" value={display} aria-invalid={invalid || undefined} onFocus={(event) => { setDraft(brouillon(current)); setFocused(true); onFocus?.(event); }} onChange={(event) => { setDraft(event.target.value); const next = parseCurrency(event.target.value, { locale }); if (value === undefined) setInternal(next); onValueChange?.(next); }} onBlur={(event) => { setFocused(false); onBlur?.(event); }} />;
});
CurrencyInput.displayName = "CurrencyInput";
