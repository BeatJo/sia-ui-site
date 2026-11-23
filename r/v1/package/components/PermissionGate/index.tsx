import { type ReactNode } from "react";
export interface PermissionGateProps { permissions: string[]; require: string | string[]; mode?: "all" | "any"; fallback?: ReactNode; children: ReactNode; }
/**
 * Ce qui n'apparaît qu'avec le droit correspondant.
 *
 * > Ceci masque une portion d'écran; **ça ne protège pas une API**. Le
 * > serveur reste seul juge, et doit refuser la même chose.
 */
export function PermissionGate({ permissions, require, mode = "all", fallback = null, children }: PermissionGateProps) { const expected = Array.isArray(require) ? require : [require]; const allowed = mode === "all" ? expected.every((item) => permissions.includes(item)) : expected.some((item) => permissions.includes(item)); return <>{allowed ? children : fallback}</>; }
