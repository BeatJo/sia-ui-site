import { createPortal } from "react-dom";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import { XIcon } from "../Icons";
import "./styles.css";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  closeOnBackdrop?: boolean;
  closeLabel?: string;
  className?: string;
}

/**
 * Une boîte qui interrompt.
 *
 * Elle enferme le focus et bloque le défilement de la page : sans cela, la
 * tabulation continue derrière le voile, et l'on remplit un formulaire
 * qu'on ne voit pas. L'échappement la referme toujours — c'est la sortie
 * que tout le monde essaie en premier.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  closeOnBackdrop = true,
  closeLabel: closeLabelProp,
  className
}: ModalProps) {
    const locale = useSiaLocale();
    const closeLabel = closeLabelProp ?? locale.close;
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector = "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
    const focusable = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    requestAnimationFrame(() => focusable()[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
      if (event.key === "Tab") {
        const elements = focusable();
        if (elements.length === 0) {
          event.preventDefault();
          return;
        }
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, onOpenChange]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="sia-modal-backdrop"
      onMouseDown={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <section
        ref={dialogRef}
        className={cn("sia-modal", className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
      >
        <header className="sia-modal__header">
          <div>
            <h2 id={titleId} className="sia-modal__title">{title}</h2>
            {description && <p id={descriptionId} className="sia-modal__description">{description}</p>}
          </div>
          <button type="button" className="sia-modal__close" aria-label={closeLabel} onClick={() => onOpenChange(false)}><XIcon /></button>
        </header>
        {children && <div className="sia-modal__body">{children}</div>}
        {footer && <footer className="sia-modal__footer">{footer}</footer>}
      </section>
    </div>,
    document.body
  );
}
