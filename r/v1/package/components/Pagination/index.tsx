import { useEffect, useId, useState, type FormEvent } from "react";
import { cn } from "@sia-ui/utils";
import { paginationItems, useSiaLocale } from "@sia-ui/headless";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";
import "./styles.css";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  previousLabel?: string;
  nextLabel?: string;
  /**
   * Ajoute un champ pour sauter directement à une page.
   *
   * Sur quarante pages, atteindre la vingt-septième demande sinon de cliquer
   * dans les ellipses jusqu'à ce qu'elle apparaisse.
   */
  jumpTo?: boolean;
  /** Affiche « Page 3 sur 40 » à côté des numéros. */
  showTotal?: boolean;
  /** Masque les libellés et ne garde que les flèches. */
  compact?: boolean;
  ariaLabel?: string;
  className?: string;
}

/**
 * La navigation entre les pages.
 *
 * Le calcul des numéros et des ellipses vient de `@sia-ui/headless` :
 * `usePagination` et ce composant appliquent la même règle, écrite une fois.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  previousLabel: previousLabelProp,
  nextLabel: nextLabelProp,
  jumpTo = false,
  showTotal = false,
  compact = false,
  ariaLabel,
  className,
}: PaginationProps) {
  const locale = useSiaLocale();
  const nextLabel = nextLabelProp ?? locale.next;
  const previousLabel = previousLabelProp ?? locale.previous;

  // Deux paginations sur la même page ne doivent pas partager l'identifiant
  // de leur champ : le libellé pointerait alors vers l'autre.
  const jumpId = useId();
  const current = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const [draft, setDraft] = useState(String(current));

  // Le champ suit la page quand elle change ailleurs — un clic sur un numéro,
  // un retour arrière du navigateur.
  useEffect(() => setDraft(String(current)), [current]);

  if (totalPages <= 1) return null;

  const items = paginationItems(current, totalPages, siblingCount);

  const jump = (event: FormEvent) => {
    event.preventDefault();
    const asked = Number(draft);
    if (!Number.isFinite(asked)) {
      setDraft(String(current));
      return;
    }
    // Une page hors bornes est ramenée dedans plutôt que refusée : taper 99
    // sur 40 pages veut dire « la dernière ».
    onPageChange(Math.min(Math.max(Math.round(asked), 1), totalPages));
  };

  return (
    <nav
      className={cn(
        "sia-pagination",
        compact && "sia-pagination--compact",
        className,
      )}
      aria-label={ariaLabel ?? "Pagination"}
    >
      <button
        type="button"
        className="sia-pagination__step"
        disabled={current === 1}
        aria-label={previousLabel}
        onClick={() => onPageChange(current - 1)}
      >
        <ChevronLeftIcon />
        {!compact && <span>{previousLabel}</span>}
      </button>

      {items.map((item) =>
        typeof item === "number" ? (
          <button
            type="button"
            key={item}
            className="sia-pagination__page"
            aria-current={item === current ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ) : (
          <span key={item} className="sia-pagination__gap" aria-hidden="true">
            …
          </span>
        ),
      )}

      <button
        type="button"
        className="sia-pagination__step"
        disabled={current === totalPages}
        aria-label={nextLabel}
        onClick={() => onPageChange(current + 1)}
      >
        {!compact && <span>{nextLabel}</span>}
        <ChevronRightIcon />
      </button>

      {showTotal && (
        <span className="sia-pagination__total">
          {locale.page} {current} / {totalPages}
        </span>
      )}

      {jumpTo && (
        <form className="sia-pagination__jump" onSubmit={jump}>
          <label htmlFor={jumpId}>{locale.goToPage}</label>
          <input
            id={jumpId}
            // `text` plutôt que `number` : le champ numérique natif accepte
            // « 1e5 » et « -- », et vide sa valeur sans prévenir quand elle
            // ne lui plaît pas.
            type="text"
            inputMode="numeric"
            value={draft}
            aria-label={locale.goToPage}
            onChange={(event) => setDraft(event.target.value.replace(/\D/g, ""))}
            onBlur={jump}
          />
          <span className="sia-pagination__jump-total" aria-hidden="true">
            / {totalPages}
          </span>
        </form>
      )}
    </nav>
  );
}
