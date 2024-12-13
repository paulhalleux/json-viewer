import { AST } from "@phal/json-ast";
import { NodeProps } from "./Factory.ts";
import { BaseNode } from "../../BaseNode";

export function StringRenderer({
  node,
  name,
  isLast,
}: NodeProps<AST.StringNode>) {
  return (
    <BaseNode name={name} isLast={isLast}>
      <span className="string">"{node.value}"</span>
    </BaseNode>
  );
}
