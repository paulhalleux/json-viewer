import { AST } from "@phal/json-ast";
import { NodeProps } from "./Factory.ts";
import { BaseNode } from "../../BaseNode";

export function BooleanRenderer({
  node,
  name,
  isLast,
}: NodeProps<AST.BooleanNode>) {
  return (
    <BaseNode name={name} isLast={isLast}>
      <span className="boolean">{String(node.value)}</span>
    </BaseNode>
  );
}
