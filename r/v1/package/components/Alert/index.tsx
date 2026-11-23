import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import { useSiaLocale } from "@sia-ui/headless";
import { XIcon } from "../Icons";
import "./styles.css";

export interface AlertProps {
  tone?: ComponentTone;
  title?: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  dismissLabel?: string;
  onDismiss?: () => void;
  className?: string;
}

/**
 * Un message qui reste à l'écran.
 *
 * À la différence d'une annonce, il ne part pas tout seul : il décrit un
 * état de la page — un solde insuffisant, une synchronisation en retard —
 * et disparaît quand cet état change, pas au bout de cinq secondes.
 */
export function Alert({ tone = "info", title, children, action, dismissLabel: dismissLabelProp, onDismiss, className }: AlertProps) {
    const locale = useSiaLocale();
    const dismissLabel = dismissLabelProp ?? locale.close;
  return (
    <div className={cn("sia-alert", `sia-alert--${tone}`, className)} role={tone === "danger" ? "alert" : "status"}>
      <div className="sia-alert__content">
        {title && <strong className="sia-alert__title">{title}</strong>}
        {children && <div className="sia-alert__description">{children}</div>}
      </div>
      {action && <div className="sia-alert__action">{action}</div>}
      {onDismiss && <button type="button" className="sia-alert__dismiss" aria-label={dismissLabel} onClick={onDismiss}><XIcon /></button>}
    </div>
  );
}
