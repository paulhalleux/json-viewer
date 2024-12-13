import { AST } from "@phal/json-ast";
import { Factory, NodeProps } from "./Factory.ts";
import { BaseNode } from "../../BaseNode";
import { useState } from "react";
import { ToggleButton } from "../../ToggleButton";

export function ObjectRenderer({
  node,
  name,
  isLast,
}: NodeProps<AST.ObjectNode>) {
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
            {expanded ? "{" : <span className="expandable">{"{...}"}</span>}
            {isLast || expanded ? "" : ","}
          </span>
        </div>
      </BaseNode>
      {expanded && (
        <>
          <ul className="object-properties">
            {node.properties.map((property, index) => (
              <li key={index} className="object-property">
                <ObjectPropertyRenderer
                  property={property}
                  isLast={index === node.properties.length - 1}
                />
              </li>
            ))}
          </ul>
          <span>
            {"}"}
            {isLast ? "" : ","}
          </span>
        </>
      )}
    </div>
  );
}

type ObjectPropertyRendererProps = {
  property: AST.PropertyNode;
  isLast?: boolean;
};

function ObjectPropertyRenderer({
  property,
  isLast,
}: ObjectPropertyRendererProps) {
  const NodeRenderer = Factory[property.value.type];
  return (
    <NodeRenderer name={property.key} node={property.value} isLast={isLast} />
  );
}
