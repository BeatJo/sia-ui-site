import { useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import { Checkbox, type CheckboxProps } from "../Checkbox";
import "./styles.css";

export interface PermissionGroup {
  domain: string;
  label: ReactNode;
  actions: Array<{ action: string; label: ReactNode }>;
}

export interface PermissionMatrixProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  groups: PermissionGroup[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (permissions: string[]) => void;
  disabled?: boolean;
  /** Les droits que l'utilisateur peut accorder ou retirer. Le serveur doit aussi les vérifier. */
  canGrant?: (permission: string) => boolean;
  /** Permet d'accorder les actions présentes et futures du domaine (`domain.*`). */
  allowWildcard?: boolean;
  checkboxProps?: Partial<
    Omit<
      CheckboxProps,
      | "checked"
      | "defaultChecked"
      | "indeterminate"
      | "onValueChange"
      | "onChange"
      | "disabled"
      | "label"
      | "children"
    >
  >;
}

/**
 * Choisir des permissions par domaine, avec sélection partielle et jokers.
 * Les permissions inconnues sont conservées ; un droit non accordable reste
 * visible mais verrouillé. Le joker global `*` est affiché en lecture seule.
 */
export function PermissionMatrix({
  groups,
  value,
  defaultValue = [],
  onValueChange,
  disabled = false,
  canGrant = () => true,
  allowWildcard = true,
  checkboxProps,
  className,
  ...props
}: PermissionMatrixProps) {
  const [internal, setInternal] = useState(defaultValue);
  const selected = value ?? internal;
  const locale = useSiaLocale();
  const global = selected.includes("*");
  const change = (next: string[]) => {
    const unique = [...new Set(next)];
    if (value === undefined) setInternal(unique);
    onValueChange?.(unique);
  };
  return (
    <div
      {...props}
      role={props.role ?? "group"}
      className={cn("sia-permission-matrix", className)}
    >
      {groups.map((group) => {
        const wildcard = `${group.domain}.*`;
        const inherited = global || selected.includes(wildcard);
        const permissions = group.actions.map(
          ({ action }) => `${group.domain}.${action}`,
        );
        const count = permissions.filter(
          (permission) => inherited || selected.includes(permission),
        ).length;
        const all =
          inherited || (permissions.length > 0 && count === permissions.length);
        const groupDisabled =
          disabled ||
          global ||
          permissions.length === 0 ||
          !permissions.every(canGrant) ||
          (allowWildcard && !canGrant(wildcard)) ||
          (!allowWildcard && selected.includes(wildcard));
        return (
          <fieldset key={group.domain} className="sia-permission-matrix__group">
            <legend>{group.label}</legend>
            <Checkbox
              {...checkboxProps}
              label={locale.permissionMatrix.all}
              checked={all}
              indeterminate={!all && count > 0}
              disabled={groupDisabled}
              onValueChange={(checked) => {
                const rest = selected.filter(
                  (permission) =>
                    permission !== wildcard &&
                    !permissions.includes(permission),
                );
                change(
                  checked
                    ? [...rest, ...(allowWildcard ? [wildcard] : permissions)]
                    : rest,
                );
              }}
            />
            <div className="sia-permission-matrix__actions">
              {group.actions.map(({ action, label }) => {
                const permission = `${group.domain}.${action}`;
                return (
                  <Checkbox
                    key={permission}
                    {...checkboxProps}
                    label={label}
                    checked={inherited || selected.includes(permission)}
                    disabled={disabled || inherited || !canGrant(permission)}
                    onValueChange={(checked) =>
                      change(
                        checked
                          ? [...selected, permission]
                          : selected.filter((item) => item !== permission),
                      )
                    }
                  />
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
