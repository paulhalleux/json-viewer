import { useMemo } from "react";
import { jsonToAst } from "@phal/json-ast";
import { Factory } from "./Renderers/Factory.ts";

type JsonViewerProps = {
  json: string;
};

export function JsonViewer({ json }: JsonViewerProps) {
  const ast = useMemo(() => {
    return jsonToAst(json);
  }, [json]);

  const NodeRenderer = Factory[ast.type];

  return (
    <div className="viewer">
      <NodeRenderer node={ast} name="root" isLast />
    </div>
  );
}
