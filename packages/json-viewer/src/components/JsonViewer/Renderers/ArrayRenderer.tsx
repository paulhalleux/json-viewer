import { Factory, NodeProps } from "./Factory.ts";
import { AST } from "@phal/json-ast";
import { BaseNode } from "../../BaseNode";
import { useState } from "react";
import { ToggleButton } from "../../ToggleButton";

export function ArrayRenderer({
  node,
  name,
  isLast,
}: NodeProps<AST.ArrayNode>) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="toggleable">
      <BaseNode name={name} isLast={true}>
        <div className="flex gap">
          <ToggleButton
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          />
          <span onClick={() => setExpanded(!expanded)}>
            {expanded ? "[" : <span className="expandable">[...]</span>}
            {isLast || expanded ? "" : ","}
          </span>
        </div>
      </BaseNode>
      {expanded && (
        <>
          <ul className="array-elements">
            {node.elements.map((element, index) => (
              <li key={index} className="array-element">
                <ArrayElementNode
                  element={element}
                  isLast={index === node.elements.length - 1}
                  index={index}
                />
              </li>
            ))}
          </ul>
          <span>
            {"]"}
            {isLast ? "" : ","}
          </span>
        </>
      )}
    </div>
  );
}

type ArrayElementNodeProps = {
  element: AST.Node;
  index: number;
  isLast?: boolean;
};

export function ArrayElementNode({
  element,
  isLast,
  index,
}: ArrayElementNodeProps) {
  const NodeRenderer = Factory[element.type];
  return (
    <NodeRenderer name={index.toString()} node={element} isLast={isLast} />
  );
}
