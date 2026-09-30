import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { Button, type ButtonProps } from "../Button";
import type { ComponentTone } from "@sia-ui/tokens";
import { Modal, type ModalProps } from "../Modal";
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
  /**
   * Les props de la `Modal`. Sans `open`, `onOpenChange`, `children` ni
   * `footer`, que la boîte de confirmation tient elle-même. Pendant
   * `loading`, un clic sur le voile ne ferme jamais, quel que soit
   * `closeOnBackdrop` : ce serait abandonner un appel encore en vol.
   */
  modalProps?: Partial<Omit<ModalProps, "open" | "onOpenChange" | "children" | "footer">>;
  /**
   * Les props du bouton de confirmation. Sans `onClick` ni `loading`,
   * branchés sur `onConfirm` et `loading` ; le libellé passe par
   * `confirmLabel`.
   */
  confirmButtonProps?: Partial<Omit<ButtonProps, "onClick" | "loading" | "children">>;
  /**
   * Les props du bouton d'annulation. Sans `onClick`, qui referme la boîte ;
   * `disabled` s'ajoute à `loading` au lieu de le remplacer.
   */
  cancelButtonProps?: Partial<Omit<ButtonProps, "onClick" | "children">>;
}

/**
 * La question qu'on pose avant de détruire.
 *
 * `onConfirm` peut rendre une promesse : le bouton reste occupé tant qu'elle
 * n'a pas abouti. Sans cela, la boîte se referme sur un appel encore en
 * vol, et l'on ignore si la suppression a eu lieu.
 */
export function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel: confirmLabelProp, cancelLabel: cancelLabelProp, tone = "primary", loading = false, onConfirm, modalProps, confirmButtonProps, cancelButtonProps }: ConfirmDialogProps) {
    const locale = useSiaLocale();
    const cancelLabel = cancelLabelProp ?? locale.cancel;
    const confirmLabel = confirmLabelProp ?? locale.confirm;
    const confirmClassName = cn(tone === "danger" && "sia-button--danger", confirmButtonProps?.className);
  return <Modal title={title} description={description} {...modalProps} open={open} onOpenChange={onOpenChange} closeOnBackdrop={!loading && (modalProps?.closeOnBackdrop ?? true)} footer={<><Button variant="ghost" {...cancelButtonProps} disabled={loading || Boolean(cancelButtonProps?.disabled)} onClick={() => onOpenChange(false)}>{cancelLabel}</Button><Button {...confirmButtonProps} {...(confirmClassName ? { className: confirmClassName } : {})} loading={loading} onClick={() => void onConfirm()}>{confirmLabel}</Button></>}>{description ? null : <p>{locale.confirmDialog.defaultDescription}</p>}</Modal>;
}
