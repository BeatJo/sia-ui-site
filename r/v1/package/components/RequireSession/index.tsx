import { useEffect, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import {
  useSession,
  type PermissionRule,
  type SessionState,
  type SessionStore,
} from "@sia-ui/headless";
import { Spinner } from "../Spinner";
import "./styles.css";

export interface RequireSessionProps<TUser, TTenant, TRule> {
  session: SessionStore<TUser, TTenant, TRule>;
  children: ReactNode;
  /** La règle de droits exigée, s'il y en a une. */
  require?: TRule;
  /**
   * Affiché pendant la vérification.
   *
   * Ce rendu est ce qui distingue cette garde d'un `if (!user) redirect` :
   * tant que le serveur n'a pas répondu, on attend. Rediriger pendant la
   * vérification renvoie à la page de connexion quelqu'un qui est connecté.
   */
  pending?: ReactNode;
  /** Rendu quand il n'y a pas de session. */
  fallback?: ReactNode;
  /** Rendu quand la session existe mais que les droits manquent. */
  forbidden?: ReactNode;
  /** Laisse passer une session `incomplete` — profil pas encore rempli. */
  allowIncomplete?: boolean;
  /**
   * Appelé une fois quand la vérification conclut à l'absence de session.
   *
   * C'est ici que l'application navigue : `navigate("/login")`,
   * `router.push(…)`, ou rien du tout si `fallback` suffit. La garde ne
   * connaît aucun routeur.
   */
  onUnauthenticated?: (state: SessionState<TUser, TTenant>) => void;
  onForbidden?: (state: SessionState<TUser, TTenant>) => void;
  onIncomplete?: (state: SessionState<TUser, TTenant>) => void;
  className?: string;
}

/**
 * Ce qui se trouve derrière une session valide.
 *
 * Écrite cinq fois dans les projets du disque D, cinq fois de la même façon
 * à la cible de redirection près. Elle ne dépend d'aucun routeur : elle rend
 * un état et prévient, l'application décide où aller.
 *
 * > Ceci protège l'interface, pas les données. Une route masquée reste une
 * > route ouverte tant que le serveur ne refuse pas l'appel.
 */
export function RequireSession<TUser, TTenant, TRule = PermissionRule>({
  session,
  children,
  require: rule,
  pending,
  fallback = null,
  forbidden = null,
  allowIncomplete = false,
  onUnauthenticated,
  onForbidden,
  onIncomplete,
  className,
}: RequireSessionProps<TUser, TTenant, TRule>) {
  const state = useSession(session);

  const denied =
    state.status === "authenticated" &&
    rule !== undefined &&
    !session.access.can(rule);
  const incomplete = state.status === "incomplete" && !allowIncomplete;

  // Les rappels partent d'un effet, jamais du rendu : naviguer pendant un
  // rendu démonte l'arbre que React est en train de construire.
  useEffect(() => {
    if (state.status === "anonymous") onUnauthenticated?.(state);
    else if (incomplete) onIncomplete?.(state);
    else if (denied) onForbidden?.(state);
    // Seul le statut compte : réagir à chaque changement de l'objet d'état
    // relancerait la navigation à chaque rendu.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, denied, incomplete]);

  if (state.status === "checking") {
    return (
      <div className={cn("sia-require-session", className)} aria-busy="true">
        {pending ?? (
          <div className="sia-require-session__pending">
            <Spinner />
          </div>
        )}
      </div>
    );
  }

  if (state.status === "anonymous") return <>{fallback}</>;
  if (incomplete) return <>{fallback}</>;
  if (denied) return <>{forbidden}</>;

  return <>{children}</>;
}

export interface CanProps<TUser, TTenant, TRule> {
  session: SessionStore<TUser, TTenant, TRule>;
  require: TRule;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Un morceau d'interface derrière un droit.
 *
 * `PermissionGate` fait la même chose à partir d'un tableau de permissions
 * passé à la main; celui-ci lit la session et suit son évaluateur — jokers,
 * expression textuelle ou égalité stricte selon le serveur.
 */
export function Can<TUser, TTenant, TRule = PermissionRule>({
  session,
  require: rule,
  children,
  fallback = null,
}: CanProps<TUser, TTenant, TRule>) {
  useSession(session);
  return <>{session.access.can(rule) ? children : fallback}</>;
}
