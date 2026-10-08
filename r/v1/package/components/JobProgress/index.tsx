import { useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import { formatMessage, useSiaLocale, type SiaLocale } from "@sia-ui/headless";
import { Alert, type AlertProps } from "../Alert";
import { StatusBadge, type StatusBadgeProps } from "../Badge";
import { Button, type ButtonProps } from "../Button";
import { DurationDisplay, type DurationDisplayProps } from "../DurationDisplay";
import { Progress, type ProgressProps } from "../Progress";
import { Steps, type StepItem, type StepsProps } from "../Steps";
import "./styles.css";

/** Le cycle de vie d'une opération asynchrone. */
export type JobStatus = "queued" | "running" | "succeeded" | "failed" | "cancelled";

/** Un instant : une date ISO, un horodatage ou une `Date`. */
export type JobInstant = string | number | Date;

/**
 * Les textes du composant, à remplacer au cas par cas. Leur valeur par défaut
 * vient du groupe `jobProgress` de la locale (`JobProgressMessages`) ; ici,
 * un texte peut aussi être un nœud, et `attempts` une fonction.
 */
export interface JobProgressLabels {
  queued: ReactNode;
  running: ReactNode;
  succeeded: ReactNode;
  failed: ReactNode;
  cancelled: ReactNode;
  /** « Essai 2 sur 3 », ou « Essai 2 » sans maximum connu. */
  attempts: (current: number, max?: number) => ReactNode;
  /** Le titre de l'encadré d'erreur. */
  errorTitle: ReactNode;
  retry: ReactNode;
  cancel: ReactNode;
}

/** Les libellés par défaut, tirés de la locale. */
function libelles(locale: SiaLocale): JobProgressLabels {
  const m = locale.jobProgress;
  return {
    queued: m.queued,
    running: m.running,
    succeeded: m.succeeded,
    failed: m.failed,
    cancelled: m.cancelled,
    attempts: (current, max) =>
      max === undefined
        ? formatMessage(m.attempt, { current })
        : formatMessage(m.attemptOf, { current, max }),
    errorTitle: m.errorTitle,
    retry: m.retry,
    cancel: locale.cancel,
  };
}

const TONS: Record<JobStatus, ComponentTone> = {
  queued: "neutral",
  running: "primary",
  succeeded: "success",
  failed: "danger",
  cancelled: "warning",
};

export interface JobProgressProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  status: JobStatus;
  /** L'avancement, de 0 à 100. Absent pendant `queued`/`running` : indéterminé. */
  progress?: number;
  /** L'étape en cours : « Construction de l'image ». */
  step?: ReactNode;
  /** Les étapes de l'opération, affichées en liste ; `currentStep` la met en avant. */
  steps?: StepItem[];
  /** L'index de l'étape en cours dans `steps`. */
  currentStep?: number;
  /** L'essai en cours, et le nombre maximal quand il est connu. */
  attempts?: { current: number; max?: number };
  startedAt?: JobInstant;
  /** Absent pendant `running` : la durée avance chaque seconde. */
  finishedAt?: JobInstant;
  /** Le message d'échec, affiché quand `status` vaut `failed`. */
  error?: ReactNode;
  /** Affiche « Relancer » quand l'opération a échoué. */
  onRetry?: () => void;
  /** Affiche « Annuler » tant que l'opération est en file ou en cours. */
  onCancel?: () => void;
  /** Un emplacement libre sous le reste : un journal, une sortie de commande. */
  logs?: ReactNode;
  title?: ReactNode;
  labels?: Partial<JobProgressLabels>;
  /** Le ton de chaque statut, pour la pastille et la barre. */
  statusTones?: Partial<Record<JobStatus, ComponentTone>>;

  /** Les props de la pastille de statut. Sans `value`, `tones` ni `labels`, tirés du statut. */
  statusBadgeProps?: Partial<Omit<StatusBadgeProps, "value" | "tones" | "labels">>;
  /** Les props de la barre. Sans `value`, tirée de `progress`. */
  progressProps?: Partial<Omit<ProgressProps, "value">>;
  /** Les props de la liste d'étapes. Sans `items` ni `current`. */
  stepsProps?: Partial<Omit<StepsProps, "items" | "current">>;
  /** Les props de la durée. Sans `milliseconds`, calculée des deux instants. */
  durationProps?: Partial<Omit<DurationDisplayProps, "milliseconds">>;
  /** Les props de l'encadré d'erreur. Sans `children`, qui est `error`. */
  alertProps?: Partial<Omit<AlertProps, "children">>;
  /** Les props du bouton « Relancer ». Sans `onClick`, qui est `onRetry`. */
  retryButtonProps?: Partial<Omit<ButtonProps, "onClick">>;
  /** Les props du bouton « Annuler ». Sans `onClick`, qui est `onCancel`. */
  cancelButtonProps?: Partial<Omit<ButtonProps, "onClick">>;
}

function instant(value: JobInstant | undefined): number | undefined {
  if (value === undefined) return undefined;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? undefined : time;
}

/**
 * Le suivi d'une opération asynchrone : un déploiement, un import, un export.
 *
 * Statut, étape, progression, essais, erreur et relance : chaque projet
 * recomposait ce motif avec les mêmes briques, et chacun oubliait une chose
 * différente — la durée figée pendant l'exécution, le bouton d'annulation
 * resté visible après l'échec. Le composant tranche ce qui s'affiche selon le
 * statut ; l'appelant ne fournit que l'état de l'opération.
 *
 * Pensé pour un tiroir de 28 à 40rem : dense, sur une colonne.
 */
export function JobProgress({
  status,
  progress,
  step,
  steps,
  currentStep = 0,
  attempts,
  startedAt,
  finishedAt,
  error,
  onRetry,
  onCancel,
  logs,
  title,
  labels: labelsProp,
  statusTones,
  statusBadgeProps,
  progressProps,
  stepsProps,
  durationProps,
  alertProps,
  retryButtonProps,
  cancelButtonProps,
  className,
  ...props
}: JobProgressProps) {
  const locale = useSiaLocale();
  const labels = { ...libelles(locale), ...labelsProp };
  const statusLabels: Record<JobStatus, ReactNode> = {
    queued: labels.queued,
    running: labels.running,
    succeeded: labels.succeeded,
    failed: labels.failed,
    cancelled: labels.cancelled,
  };
  const tones = { ...TONS, ...statusTones };
  const active = status === "queued" || status === "running";

  const debut = instant(startedAt);
  const fin = instant(finishedAt);
  // La durée d'une opération en cours avance d'elle-même : sans horloge, elle
  // resterait figée à la valeur du dernier rendu, et l'on croirait l'opération
  // bloquée. L'horloge ne tourne que tant qu'il y a quelque chose à compter.
  const ticking = status === "running" && debut !== undefined && fin === undefined;
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!ticking) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [ticking]);

  const end = fin ?? (ticking ? now : undefined);
  const duration = debut !== undefined && end !== undefined ? end - debut : undefined;

  // Une opération terminée n'a de barre que si l'on sait où elle s'est
  // arrêtée : une barre indéterminée après coup dirait « je travaille ».
  const showProgress = active || progress !== undefined;

  const stepItems =
    steps && status === "failed"
      ? steps.map((item, index) =>
          index === currentStep && !item.status ? { ...item, status: "error" as const } : item,
        )
      : steps;
  // Réussie, toutes les étapes sont faites, y compris la dernière.
  const stepIndex = status === "succeeded" && steps ? steps.length : currentStep;

  const canRetry = status === "failed" && onRetry !== undefined;
  const canCancel = active && onCancel !== undefined;

  return (
    <section
      className={cn("sia-job-progress", `sia-job-progress--${status}`, className)}
      aria-busy={active || undefined}
      {...props}
    >
      <header className="sia-job-progress__header">
        {title && <div className="sia-job-progress__title">{title}</div>}
        {/* Seule la pastille est une région vivante : y mettre la durée ferait
            annoncer chaque seconde qui passe. */}
        <span role="status" className="sia-job-progress__status">
          <StatusBadge
            {...statusBadgeProps}
            value={status}
            tones={tones}
            labels={statusLabels}
          />
        </span>
        {duration !== undefined && (
          <DurationDisplay
            style="clock"
            {...durationProps}
            className={cn("sia-job-progress__duration", durationProps?.className)}
            milliseconds={duration}
          />
        )}
      </header>

      {(step || showProgress) && (
        <div className="sia-job-progress__progress">
          {showProgress ? (
            <Progress
              size="sm"
              tone={tones[status]}
              showValue
              {...(step ? { label: step } : {})}
              {...progressProps}
              className={cn("sia-job-progress__bar", progressProps?.className)}
              // Pas de `value` pendant la file ou l'exécution sans avancement
              // connu : Progress passe alors en indéterminé.
              {...(progress !== undefined ? { value: progress } : {})}
            />
          ) : (
            <div className="sia-job-progress__step">{step}</div>
          )}
        </div>
      )}

      {stepItems && stepItems.length > 0 && (
        <Steps
          orientation="vertical"
          size="sm"
          {...stepsProps}
          className={cn("sia-job-progress__steps", stepsProps?.className)}
          items={stepItems}
          current={stepIndex}
        />
      )}

      {attempts && (
        <div className="sia-job-progress__attempts">
          {labels.attempts(attempts.current, attempts.max)}
        </div>
      )}

      {status === "failed" && error && (
        <Alert title={labels.errorTitle} {...alertProps} tone="danger">
          {error}
        </Alert>
      )}

      {(canRetry || canCancel) && (
        <div className="sia-job-progress__actions">
          {canCancel && (
            <Button variant="outline" tone="neutral" size="sm" {...cancelButtonProps} onClick={onCancel}>
              {cancelButtonProps?.children ?? labels.cancel}
            </Button>
          )}
          {canRetry && (
            <Button size="sm" {...retryButtonProps} onClick={onRetry}>
              {retryButtonProps?.children ?? labels.retry}
            </Button>
          )}
        </div>
      )}

      {logs !== undefined && logs !== null && (
        <div className="sia-job-progress__logs">{logs}</div>
      )}
    </section>
  );
}
