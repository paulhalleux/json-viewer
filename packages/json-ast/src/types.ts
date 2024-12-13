export namespace Lexer {
  export type Token = {
    type: TokenType;
    value: string;
    position: TokenPosition;
  };

  export type TokenPosition = {
    line: number;
    column: number;
    index: number;
  };

  export type TokenType =
    | "LeftBrace"
    | "RightBrace"
    | "LeftBracket"
    | "RightBracket"
    | "Colon"
    | "Comma"
    | "DoubleQuote"
    | "String"
    | "Number"
    | "True"
    | "False"
    | "Null"
    | "EOF";
}

export namespace AST {
  export type Node =
    | ObjectNode
    | ArrayNode
    | StringNode
    | NumberNode
    | BooleanNode
    | NullNode;

  export type ObjectNode = {
    type: "Object";
    properties: PropertyNode[];
  };

  export type ArrayNode = {
    type: "Array";
    elements: Node[];
  };

  export type PropertyNode = {
    key: string;
    value: Node;
  };

  export type StringNode = {
    type: "String";
    value: string;
  };

  export type NumberNode = {
    type: "Number";
    value: number;
  };

  export type BooleanNode = {
    type: "Boolean";
    value: boolean;
  };

  export type NullNode = {
    type: "Null";
  };

  export type NodeType = Node["type"];
}
