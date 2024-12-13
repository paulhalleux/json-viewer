import { AST } from "@phal/json-ast";
import { NodeProps } from "./Factory.ts";
import { BaseNode } from "../../BaseNode";

export function NullRenderer({ name, isLast }: NodeProps<AST.NullNode>) {
  return (
    <BaseNode name={name} isLast={isLast}>
      <span className="null">null</span>
    </BaseNode>
  );
}
