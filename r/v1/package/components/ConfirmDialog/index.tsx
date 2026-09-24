import { type ReactNode } from "react";
import { Button } from "../Button";
import type { ComponentTone } from "@sia-ui/tokens";
import { Modal } from "../Modal";
import { useSiaLocale } from "@sia-ui/headless";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: Extract<ComponentTone, "primary" | "danger">;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
}

/**
 * La question qu'on pose avant de détruire.
 *
 * `onConfirm` peut rendre une promesse : le bouton reste occupé tant qu'elle
 * n'a pas abouti. Sans cela, la boîte se referme sur un appel encore en
 * vol, et l'on ignore si la suppression a eu lieu.
 */
export function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel: confirmLabelProp, cancelLabel: cancelLabelProp, tone = "primary", loading = false, onConfirm }: ConfirmDialogProps) {
    const locale = useSiaLocale();
    const cancelLabel = cancelLabelProp ?? locale.cancel;
    const confirmLabel = confirmLabelProp ?? locale.confirm;
  return <Modal open={open} onOpenChange={onOpenChange} title={title} description={description} closeOnBackdrop={!loading} footer={<><Button variant="ghost" disabled={loading} onClick={() => onOpenChange(false)}>{cancelLabel}</Button><Button className={tone === "danger" ? "sia-button--danger" : undefined} loading={loading} onClick={() => void onConfirm()}>{confirmLabel}</Button></>}>{description ? null : <p>Cette action nécessite votre confirmation.</p>}</Modal>;
}
