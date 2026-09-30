import { cn } from "@sia-ui/utils";
import { formatMessage, plural, useSiaLocale } from "@sia-ui/headless";
export interface DurationDisplayProps { milliseconds: number; /** La langue des nombres et des unités. Par défaut, celle de la locale SIA. */ locale?: string; style?: "short" | "long" | "clock"; className?: string; }
/**
 * Une durée, en mots ou en pendule.
 *
 * Trois styles pour trois usages : `clock` pour un chronomètre qu'on lit en
 * continu, `short` pour une colonne de tableau, `long` pour une phrase.
 */
export function DurationDisplay({ milliseconds, locale: localeProp, style = "short", className }: DurationDisplayProps) {
  const messages = useSiaLocale();
  const locale = localeProp ?? messages.language;
  const unites = messages.durationDisplay;
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (style === "clock") return <span className={cn("sia-duration-display", className)}>{[hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":")}</span>;
  const formatter = new Intl.NumberFormat(locale);
  // Le nombre formaté remplace `{count}` ; le pluriel se choisit sur la valeur brute.
  const dire = (value: number, cle: "hours" | "minutes" | "seconds") =>
    style === "long"
      ? plural(unites, cle, value, locale, { count: formatter.format(value) })
      : formatMessage(unites[`${cle}Short`], { count: formatter.format(value) });
  const parts = [[hours, "hours"], [minutes, "minutes"], [seconds, "seconds"]] as const;
  return <span className={cn("sia-duration-display", className)}>{parts.filter(([value]) => value > 0).map(([value, cle]) => dire(value, cle)).join(" ") || dire(0, "seconds")}</span>;
}
