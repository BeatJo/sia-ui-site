import { useEffect, useState, type HTMLAttributes } from "react";
import { cn, formatDate, formatTimeAgo } from "@sia-ui/utils";
import { useFormatLocale } from "@sia-ui/headless";
import "./styles.css";

export interface RelativeTimeProps extends Omit<HTMLAttributes<HTMLTimeElement>, "dateTime"> {
  value: Date | string | number;
  /** La langue de la phrase. Par défaut, celle de la locale SIA. */
  locale?: string;
  prefix?: string;
  refreshInterval?: number;
}

/**
 * Une date, dite par rapport à maintenant.
 *
 * Elle se rafraîchit d'elle-même : « il y a une minute » affiché une heure
 * plus tard est faux, et rien ne le signale à qui lit l'écran resté ouvert.
 */
export function RelativeTime({ value, locale: localeProp, prefix, refreshInterval = 60_000, className, title, ...props }: RelativeTimeProps) {
  const formatLocale = useFormatLocale("date");
  const locale = localeProp ?? formatLocale;
  const [, refresh] = useState(0);
  useEffect(() => {
    if (refreshInterval <= 0) return;
    const id = window.setInterval(() => refresh((current) => current + 1), refreshInterval);
    return () => window.clearInterval(id);
  }, [refreshInterval]);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return <time className={cn("sia-relative-time", className)} dateTime={date.toISOString()} title={title ?? formatDate(date, { locale, dateStyle:"full", timeStyle:"short" })} {...props}>{formatTimeAgo(date, { locale, ...(prefix ? { prefix } : {}) })}</time>;
}
