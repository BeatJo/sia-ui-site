import { createPortal } from "react-dom";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import {
  OverlayScope,
  useOverlayLayer,
  useOverlayScrollLock,
  useOutsideClick,
} from "@sia-ui/react";
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
  className,
}: ModalProps) {
  const locale = useSiaLocale();
  const closeLabel = closeLabelProp ?? locale.close;
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLElement>(null);
  const { layer, zIndex, isTop, contains } = useOverlayLayer({
    open,
    kind: "modal",
    elementRef: dialogRef,
  });
  useOverlayScrollLock(open);
  const close = useRef(onOpenChange);
  close.current = onOpenChange;
  const top = useRef(isTop);
  top.current = isTop;
  const inside = useRef(contains);
  inside.current = contains;
  // L'instant d'ouverture : un appui sur le voile qui le suit de près est le
  // second clic d'un double clic, ou un rebond — pas une demande de fermeture.
  const ouverteA = useRef(0);

  useEffect(() => {
    if (!open) return;
    ouverteA.current = Date.now();
    const previousFocus = document.activeElement as HTMLElement | null;

    const focusableSelector =
      "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
    const focusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ??
          [],
      );
    const frame = requestAnimationFrame(() => {
      if (top.current()) (focusable()[0] ?? dialogRef.current)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || !top.current()) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close.current(false);
      }
      if (event.key === "Tab") {
        const elements = focusable();
        if (elements.length === 0) {
          event.preventDefault();
          return;
        }
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !inside.current(document.activeElement))
        ) {
          event.preventDefault();
          last?.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            !inside.current(document.activeElement))
        ) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(frame);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open]);

  useOutsideClick(
    dialogRef,
    (event) => {
      if (
        !closeOnBackdrop ||
        !open ||
        !isTop() ||
        contains(event.target as Node)
      )
        return;
      if (Date.now() - ouverteA.current < 400) return;
      onOpenChange(false);
    },
    { enabled: open },
  );

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <OverlayScope layer={layer}>
      <div className="sia-modal-backdrop" style={{ zIndex }}>
        <section
          ref={dialogRef}
          className={cn("sia-modal", className)}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
        >
          <header className="sia-modal__header">
            <div>
              <h2 id={titleId} className="sia-modal__title">
                {title}
              </h2>
              {description && (
                <p id={descriptionId} className="sia-modal__description">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              className="sia-modal__close"
              aria-label={closeLabel}
              onClick={() => onOpenChange(false)}
            >
              <XIcon />
            </button>
          </header>
          {children && <div className="sia-modal__body">{children}</div>}
          {footer && <footer className="sia-modal__footer">{footer}</footer>}
        </section>
      </div>
    </OverlayScope>,
    document.body,
  );
}
