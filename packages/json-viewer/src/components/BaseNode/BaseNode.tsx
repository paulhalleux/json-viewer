import { PropsWithChildren } from "react";
import { clsx } from "clsx";

type WithNameProps = PropsWithChildren<{
  name: string | undefined;
  isLast: boolean | undefined;
  column?: boolean;
}>;

export function BaseNode({
  name,
  children,
  isLast = false,
  column,
}: WithNameProps) {
  return (
    <div className={clsx("flex", { col: column })}>
      {name ? (
        <div className="flex">
          <span className="name">{name}</span>
          <span className="colon">:</span>
        </div>
      ) : null}
      {children}
      {isLast ? "" : ","}
    </div>
  );
}
