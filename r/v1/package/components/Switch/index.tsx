import { forwardRef, useId, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Une bascule à effet immédiat.
 *
 * À la différence d'une case à cocher, elle n'attend pas de validation :
 * ce qu'on bascule s'applique tout de suite. Une case dans un formulaire,
 * une bascule dans des réglages.
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, defaultChecked = false, label, disabled, onCheckedChange, onClick, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const labelId = useId();
    const isControlled = checked !== undefined;
    const current = isControlled ? checked : internalChecked;

    return (
      <span className={cn("sia-switch-field", disabled && "sia-switch-field--disabled", className)}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={current}
          aria-labelledby={label ? labelId : undefined}
          className="sia-switch"
          disabled={disabled}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) {
              if (!isControlled) setInternalChecked(!current);
              onCheckedChange?.(!current);
            }
          }}
          {...props}
        >
          <span className="sia-switch__thumb" />
        </button>
        {label && <span id={labelId} className="sia-switch-field__label">{label}</span>}
      </span>
    );
  }
);

Switch.displayName = "Switch";
