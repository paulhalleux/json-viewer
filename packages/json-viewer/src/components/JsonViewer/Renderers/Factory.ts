import { AST } from "@phal/json-ast";
import { ObjectRenderer } from "./ObjectRenderer.tsx";
import { ArrayRenderer } from "./ArrayRenderer.tsx";
import { StringRenderer } from "./StringRenderer.tsx";
import { NumberRenderer } from "./NumberRenderer.tsx";
import { BooleanRenderer } from "./BooleanRenderer.tsx";
import { NullRenderer } from "./NullRenderer.tsx";

export type NodeProps<Node extends AST.Node> = {
  node: Node;
  name?: string;
  isLast?: boolean;
};

type FactoryType = Record<AST.NodeType, React.ComponentType<NodeProps<any>>>;

export const Factory: FactoryType = {
  Object: ObjectRenderer,
  Array: ArrayRenderer,
  String: StringRenderer,
  Number: NumberRenderer,
  Boolean: BooleanRenderer,
  Null: NullRenderer,
};
