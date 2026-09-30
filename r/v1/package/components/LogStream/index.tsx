import {
  isValidElement,
  memo,
  useDeferredValue,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@sia-ui/utils";
import { plural, useSiaLocale, type LogStreamMessages } from "@sia-ui/headless";
import { useControllableState, useCopyToClipboard } from "@sia-ui/react";
import { Button, type ButtonProps } from "../Button";
import { EmptyState, type EmptyStateProps } from "../EmptyState";
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from "../Icons";
import { SearchInput, type SearchInputProps } from "../SearchInput";
import { Spinner, type SpinnerProps } from "../Spinner";
import {
  Toggle,
  ToggleGroup,
  type ToggleGroupProps,
  type ToggleProps,
} from "../Toggle";
import "./styles.css";

/** La gravité d'une ligne. */
export type LogLevel = "debug" | "info" | "warn" | "error" | "success";

/** Une ligne de journal. */
export interface LogLine {
  /**
   * Un identifiant stable. Facultatif, mais conseillé : sans lui, la ligne
   * est repérée par sa position, et un tableau raccourci par le début
   * obligerait à redessiner toutes les lignes.
   */
  id?: string;
  /** Quand : une date ISO, un horodatage ou une `Date`. */
  time: string | number | Date;
  level: LogLevel;
  message: ReactNode;
  /** L'essai, l'étape ou la tâche : « Essai 1 », « Essai 2 ». */
  group?: string;
}

/** Les niveaux, dans l'ordre de la barre de filtres. */
const NIVEAUX: LogLevel[] = ["debug", "info", "warn", "error", "success"];

/**
 * Les libellés par défaut, lus dans la locale. Courts et de longueur
 * voisine : ils tiennent dans une colonne à largeur fixe et restent lisibles
 * une fois copiés en texte.
 */
function libellesNiveaux(m: LogStreamMessages): Record<LogLevel, string> {
  return {
    debug: m.levelDebug,
    info: m.levelInfo,
    warn: m.levelWarn,
    error: m.levelError,
    success: m.levelSuccess,
  };
}

/** En pixels : la marge sous laquelle on considère la zone « en bas ». */
const SEUIL_BAS = 16;

export interface LogStreamProps {
  lines: LogLine[];
  /**
   * Le nombre de lignes gardées. Au-delà, les plus anciennes tombent.
   *
   * C'est la réponse à un journal qui grossit sans fin, plutôt qu'une
   * virtualisation : mille lignes se dessinent sans peine, et une liste
   * virtuelle casserait la recherche du navigateur et la sélection au
   * clavier. `1000` par défaut.
   */
  maxLines?: number;
  /** La hauteur de la zone défilante. `20rem` par défaut. */
  height?: number | string;

  /**
   * Défiler jusqu'à la dernière ligne à chaque arrivée. Contrôlé quand il
   * est fourni ; remonter dans le journal appelle alors `onFollowChange(false)`.
   */
  follow?: boolean;
  /** Vrai par défaut : un journal d'exécution se lit par la fin. */
  defaultFollow?: boolean;
  onFollowChange?: (follow: boolean) => void;

  /** Les niveaux affichés. Contrôlé quand il est fourni. */
  levels?: LogLevel[];
  /** Tous par défaut. */
  defaultLevels?: LogLevel[];
  onLevelsChange?: (levels: LogLevel[]) => void;
  /** Les libellés des niveaux, dans la colonne comme dans la copie. */
  levelLabels?: Partial<Record<LogLevel, string>>;

  /** Les groupes repliés au premier affichage. */
  defaultCollapsedGroups?: string[];

  /** Le premier chargement : rien n'est encore arrivé. */
  loading?: boolean;
  /** Des lignes arrivent encore. Un indicateur discret le dit. */
  streaming?: boolean;
  streamingLabel?: string;
  loadingLabel?: string;

  /** La langue du format horaire. Par défaut, celle de la locale SIA. */
  locale?: string;
  /** Sans barre d'outils : ni filtre, ni recherche, ni copie. */
  toolbar?: boolean;
  /** Le nom de la zone pour les lecteurs d'écran. */
  ariaLabel?: string;
  searchPlaceholder?: string;
  copyLabel?: string;
  copiedLabel?: string;
  followLabel?: string;
  resumeLabel?: string;
  className?: string;

  /**
   * Le filtre par niveau. Sans ses options ni sa valeur, tirées des niveaux,
   * ni son type : on en retient plusieurs à la fois.
   */
  levelFilterProps?: Partial<
    Omit<ToggleGroupProps, "options" | "type" | "value" | "defaultValue" | "onValueChange">
  >;
  /** La recherche. Sa valeur reste celle du journal, qui filtre avec. */
  searchInputProps?: Partial<Omit<SearchInputProps, "value" | "defaultValue" | "onValueChange">>;
  /** Le bouton de copie. Son action et son libellé suivent la copie. */
  copyButtonProps?: Partial<Omit<ButtonProps, "onClick" | "children">>;
  /** La bascule « Suivre la fin ». Son état est celui du suivi. */
  followToggleProps?: Partial<Omit<ToggleProps, "pressed" | "defaultPressed" | "onPressedChange">>;
  /** Le bouton « Reprendre le suivi », affiché quand le suivi est en pause. */
  resumeButtonProps?: Partial<Omit<ButtonProps, "onClick" | "children">>;
  /**
   * L'en-tête repliable de chaque groupe. `aria-expanded` et
   * `aria-controls` restent calculés groupe par groupe.
   */
  groupButtonProps?: Partial<
    Omit<ButtonProps, "onClick" | "children" | "aria-expanded" | "aria-controls">
  >;
  /** L'état vide : pas encore de ligne, ou aucune qui corresponde. */
  emptyStateProps?: Partial<EmptyStateProps>;
  /** Les indicateurs de chargement et de flux en cours. Sans `label`. */
  spinnerProps?: Partial<Omit<SpinnerProps, "label">>;
}

/** Une ligne retenue, avec sa clé et sa position parmi les lignes gardées. */
interface Entree {
  line: LogLine;
  key: string;
  pos: number;
}

/**
 * Le texte d'un message, pour la recherche et la copie.
 *
 * Un message est un nœud React : on descend dans les enfants pour en tirer
 * le texte. Le résultat est gardé par ligne — une ligne ne change pas une
 * fois émise, et refaire ce parcours à chaque frappe sur mille lignes se
 * sentirait.
 */
const textes = new WeakMap<LogLine, { brut: string; bas: string }>();

function texteDe(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number" || typeof node === "bigint") {
    return String(node);
  }
  if (Array.isArray(node)) return node.map((n: ReactNode) => texteDe(n)).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return texteDe(node.props.children);
  return "";
}

function texteLigne(line: LogLine) {
  let t = textes.get(line);
  if (!t) {
    const brut = texteDe(line.message);
    t = { brut, bas: brut.toLowerCase() };
    textes.set(line, t);
  }
  return t;
}

function heure(format: Intl.DateTimeFormat, time: LogLine["time"]) {
  const date = time instanceof Date ? time : new Date(time);
  return Number.isNaN(date.getTime()) ? "--:--:--" : format.format(date);
}

interface LigneProps {
  line: LogLine;
  format: Intl.DateTimeFormat;
  label: string;
}

/**
 * Une ligne. Mémoïsée : quand une ligne arrive, seules les nouvelles se
 * dessinent, les mille précédentes gardent leur rendu.
 */
const Ligne = memo(function Ligne({ line, format, label }: LigneProps) {
  const date = line.time instanceof Date ? line.time : new Date(line.time);
  const valide = !Number.isNaN(date.getTime());
  return (
    <div className={cn("sia-log-stream__line", `sia-log-stream__line--${line.level}`)}>
      <time
        className="sia-log-stream__time"
        {...(valide ? { dateTime: date.toISOString() } : {})}
      >
        {heure(format, line.time)}
      </time>
      {/*
        Un marqueur texte, pas un `Badge` : il tient dans la colonne à chasse
        fixe, se copie tel quel, et ne coûte pas un composant par ligne.
      */}
      <span className="sia-log-stream__level">{label}</span>
      <span className="sia-log-stream__message">{line.message}</span>
    </div>
  );
});

/**
 * Un journal d'exécution qui se lit en direct.
 *
 * `Timeline` raconte des événements ; ici, on suit une exécution : heure en
 * colonne, niveau, police à chasse fixe, essais repliables. Le suivi de la
 * fin se met en pause dès qu'on remonte — lire une erreur pendant que le
 * journal défile sous les yeux est impossible — et un bouton dit combien de
 * lignes sont arrivées entre-temps.
 */
export function LogStream({
  lines,
  maxLines = 1000,
  height = "20rem",
  follow,
  defaultFollow = true,
  onFollowChange,
  levels: levelsProp,
  defaultLevels = NIVEAUX,
  onLevelsChange,
  levelLabels,
  defaultCollapsedGroups,
  loading = false,
  streaming = false,
  streamingLabel: streamingLabelProp,
  loadingLabel: loadingLabelProp,
  locale: localeProp,
  toolbar = true,
  ariaLabel: ariaLabelProp,
  searchPlaceholder: searchPlaceholderProp,
  copyLabel: copyLabelProp,
  copiedLabel: copiedLabelProp,
  followLabel: followLabelProp,
  resumeLabel: resumeLabelProp,
  className,
  levelFilterProps,
  searchInputProps,
  copyButtonProps,
  followToggleProps,
  resumeButtonProps,
  groupButtonProps,
  emptyStateProps,
  spinnerProps,
}: LogStreamProps) {
  const messages = useSiaLocale();
  const m = messages.logStream;
  const locale = localeProp ?? messages.language;
  const streamingLabel = streamingLabelProp ?? m.streaming;
  const loadingLabel = loadingLabelProp ?? m.loading;
  const ariaLabel = ariaLabelProp ?? m.ariaLabel;
  const searchPlaceholder = searchPlaceholderProp ?? m.searchPlaceholder;
  const copyLabel = copyLabelProp ?? messages.copy;
  const copiedLabel = copiedLabelProp ?? messages.copied;
  const followLabel = followLabelProp ?? m.follow;
  const resumeLabel = resumeLabelProp ?? m.resume;
  const id = useId();
  const zone = useRef<HTMLDivElement>(null);
  const { copy, copied } = useCopyToClipboard();

  const [following, setFollowing] = useControllableState({
    value: follow,
    defaultValue: defaultFollow,
    onChange: onFollowChange,
  });
  const [levels, setLevels] = useControllableState<LogLevel[]>({
    value: levelsProp,
    defaultValue: defaultLevels,
    onChange: onLevelsChange,
  });
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(() => new Set(defaultCollapsedGroups));

  // La frappe reste immédiate ; le filtrage de mille lignes passe après.
  const needle = useDeferredValue(search).trim().toLowerCase();

  const labels = useMemo(() => ({ ...libellesNiveaux(m), ...levelLabels }), [m, levelLabels]);

  // Un seul format pour tout le journal : `Intl.DateTimeFormat` coûte cher à
  // construire, pas à utiliser.
  const format = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }),
    [locale],
  );

  // Les lignes gardées, avec une clé stable : l'identifiant, sinon la
  // position dans le tableau complet — elle ne bouge pas tant qu'on ajoute
  // à la fin.
  const kept = useMemo(() => {
    const debut = Math.max(0, lines.length - Math.max(0, maxLines));
    const out: Entree[] = [];
    for (let i = debut; i < lines.length; i++) {
      const line = lines[i]!;
      out.push({ line, key: line.id ?? `#${i}`, pos: i - debut });
    }
    return out;
  }, [lines, maxLines]);

  const levelSet = useMemo(() => new Set(levels), [levels]);

  const visible = useMemo(
    () =>
      kept.filter(
        ({ line }) =>
          levelSet.has(line.level) && (!needle || texteLigne(line).bas.includes(needle)),
      ),
    [kept, levelSet, needle],
  );

  // Les groupes, dans l'ordre de leur première ligne. Les lignes sans groupe
  // forment une section sans en-tête.
  const sections = useMemo(() => {
    const map = new Map<string, Entree[]>();
    for (const entree of visible) {
      const g = entree.line.group ?? "";
      const list = map.get(g);
      if (list) list.push(entree);
      else map.set(g, [entree]);
    }
    return [...map];
  }, [visible]);

  // Le repère de la pause : la dernière ligne vue au moment où l'on a
  // remonté. Ajusté pendant le rendu, comme le recommande React pour un état
  // dérivé, plutôt que dans un effet qui dessinerait une image de trop.
  const derniere = kept.length > 0 ? kept[kept.length - 1]!.key : "";
  const [repere, setRepere] = useState<string | null>(following ? null : derniere);
  if (following && repere !== null) setRepere(null);
  if (!following && repere === null) setRepere(derniere);

  const nouvelles = useMemo(() => {
    if (following || repere === null) return 0;
    let position = -1;
    for (let i = kept.length - 1; i >= 0; i--) {
      if (kept[i]!.key === repere) {
        position = kept[i]!.pos;
        break;
      }
    }
    let n = 0;
    for (let i = visible.length - 1; i >= 0 && visible[i]!.pos > position; i--) n++;
    return n;
  }, [following, repere, kept, visible]);

  // Avant la peinture : l'utilisateur ne voit jamais la ligne apparaître
  // puis la zone sauter.
  const derniereVisible = visible.length > 0 ? visible[visible.length - 1]!.key : "";
  useLayoutEffect(() => {
    const node = zone.current;
    if (following && node) node.scrollTop = node.scrollHeight;
  }, [following, derniereVisible, visible.length, collapsed]);

  const onScroll = () => {
    const node = zone.current;
    if (!node) return;
    const enBas = node.scrollHeight - node.scrollTop - node.clientHeight <= SEUIL_BAS;
    // Remonter met en pause ; revenir tout en bas reprend le suivi.
    if (enBas !== following) setFollowing(enBas);
  };

  const basculer = (groupe: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(groupe)) next.delete(groupe);
      else next.add(groupe);
      return next;
    });

  // Construit au clic seulement : personne ne paie la copie qu'il ne fait pas.
  const copier = () => {
    const out: string[] = [];
    for (const [groupe, entrees] of sections) {
      if (groupe) out.push(`[${groupe}]`);
      for (const { line } of entrees) {
        out.push(`${heure(format, line.time)} ${labels[line.level]} ${texteLigne(line).brut}`);
      }
    }
    void copy(out.join("\n"));
  };

  const vide = kept.length === 0;

  let contenu: ReactNode;
  if (vide && loading) {
    contenu = (
      <div className="sia-log-stream__loading">
        <Spinner size="sm" {...spinnerProps} label={loadingLabel} />
      </div>
    );
  } else if (visible.length === 0) {
    contenu = (
      <EmptyState
        compact
        {...(vide
          ? { title: m.emptyTitle }
          : {
              title: m.noMatchTitle,
              description: m.noMatchDescription,
            })}
        {...emptyStateProps}
      />
    );
  } else {
    contenu = sections.map(([groupe, entrees], index) => {
      const rendu = entrees.map(({ line, key }) => (
        <Ligne key={key} line={line} format={format} label={labels[line.level]} />
      ));
      if (!groupe) return <div key="">{rendu}</div>;
      const ouvert = !collapsed.has(groupe);
      const corps = `${id}-groupe-${index}`;
      return (
        <div key={`g:${groupe}`} className="sia-log-stream__group">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={ouvert ? <ChevronDownIcon /> : <ChevronRightIcon />}
            {...groupButtonProps}
            className={cn("sia-log-stream__group-header", groupButtonProps?.className)}
            aria-expanded={ouvert}
            aria-controls={corps}
            onClick={() => basculer(groupe)}
          >
            {groupe}
            <span className="sia-log-stream__group-count">
              {plural(m, "lines", entrees.length, locale)}
            </span>
          </Button>
          <div id={corps} hidden={!ouvert}>
            {ouvert && rendu}
          </div>
        </div>
      );
    });
  }

  return (
    <div className={cn("sia-log-stream", className)}>
      {toolbar && (
        <div className="sia-log-stream__toolbar">
          <ToggleGroup
            size="md"
            ariaLabel={m.levelsLabel}
            {...levelFilterProps}
            className={cn("sia-log-stream__levels", levelFilterProps?.className)}
            type="multiple"
            options={NIVEAUX.map((niveau) => ({ value: niveau, label: labels[niveau] }))}
            value={levels}
            onValueChange={(next) => setLevels((Array.isArray(next) ? next : [next]) as LogLevel[])}
          />
          <SearchInput
            placeholder={searchPlaceholder}
            {...searchInputProps}
            className={cn("sia-log-stream__search", searchInputProps?.className)}
            value={search}
            onValueChange={setSearch}
          />
          <div className="sia-log-stream__actions">
            {streaming && (
              <span className="sia-log-stream__streaming">
                <Spinner size="xs" {...spinnerProps} label={streamingLabel} />
                <span aria-hidden="true">{streamingLabel}</span>
              </span>
            )}
            <Toggle
              size="md"
              variant="outline"
              {...followToggleProps}
              pressed={following}
              onPressedChange={setFollowing}
            >
              {followLabel}
            </Toggle>
            <Button
              variant="outline"
              size="md"
              {...(copied ? { leftIcon: <CheckIcon /> } : {})}
              disabled={visible.length === 0}
              {...copyButtonProps}
              onClick={copier}
            >
              {copied ? copiedLabel : copyLabel}
            </Button>
          </div>
        </div>
      )}
      <div className="sia-log-stream__viewport">
        {/*
          Une `div` et non `ScrollArea` : le suivi lit et règle la position de
          défilement, et `ScrollArea` n'expose ni sa référence ni son
          événement de défilement.
        */}
        <div
          ref={zone}
          className="sia-log-stream__scroll"
          style={{ height }}
          role="log"
          aria-live="polite"
          aria-label={ariaLabel}
          aria-busy={loading || undefined}
          tabIndex={0}
          onScroll={onScroll}
        >
          {contenu}
        </div>
        {!following && (
          <Button
            size="sm"
            {...resumeButtonProps}
            className={cn("sia-log-stream__resume", resumeButtonProps?.className)}
            onClick={() => setFollowing(true)}
          >
            {resumeLabel}
            {nouvelles > 0 && plural(m, "newLines", nouvelles, locale)}
          </Button>
        )}
      </div>
    </div>
  );
}
