import { Timer, type TimerProps } from "../Timer";
export type CountdownProps = Omit<TimerProps, "direction">;
/**
 * Un `Timer` qui descend.
 *
 * Le compte à rebours est assez fréquent — une session qui expire, un code
 * à usage unique — pour mériter son nom plutôt qu'une prop à ne pas
 * oublier.
 */
export function Countdown(props: CountdownProps) { return <Timer {...props} direction="down" />; }
