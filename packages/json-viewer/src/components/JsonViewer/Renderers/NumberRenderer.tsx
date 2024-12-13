import { AST } from "@phal/json-ast";
import { NodeProps } from "./Factory.ts";
import { BaseNode } from "../../BaseNode";

export function NumberRenderer({
  node,
  name,
  isLast,
}: NodeProps<AST.NumberNode>) {
  return (
    <BaseNode name={name} isLast={isLast}>
      <span className="number">{node.value}</span>
    </BaseNode>
  );
}
