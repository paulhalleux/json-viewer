import { AST, Lexer } from "./types";

const CharToTypeMap: { [key: string]: Lexer.TokenType } = {
  "{": "LeftBrace",
  "}": "RightBrace",
  "[": "LeftBracket",
  "]": "RightBracket",
  ":": "Colon",
  ",": "Comma",
};

export function jsonToAst(json: string): AST.Node {
  function tokenize(input: string): Lexer.Token[] {
    let index = 0;
    let line = 1;
    let column = 0;
    let tokens: Lexer.Token[] = [];

    while (index < input.length) {
      if (input[index] === "\n") {
        line++;
        column = 0;
      }

      const position: Lexer.TokenPosition = { line, column, index };

      const char = input[index];
      const type = CharToTypeMap[char];

      if (type) {
        tokens.push({ type, value: char, position });
        index++;
        column++;
        continue;
      }

      if (char === " " || char === "\n") {
        index++;
        column++;
        continue;
      }

      if (char === '"') {
        let value = "";
        index++;
        column++;

        while (input[index] !== '"') {
          value += input[index];
          index++;
          column++;
        }

        tokens.push({ type: "String", value, position });
        index++;
        column++;
        continue;
      }

      if (char === "t" && input.slice(index, index + 4) === "true") {
        tokens.push({ type: "True", value: "true", position });
        index += 4;
        column += 4;
        continue;
      }

      if (char === "f" && input.slice(index, index + 5) === "false") {
        tokens.push({ type: "False", value: "false", position });
        index += 5;
        column += 5;
        continue;
      }

      if (char === "n" && input.slice(index, index + 4) === "null") {
        tokens.push({ type: "Null", value: "null", position });
        index += 4;
        column += 4;
        continue;
      }

      if (char.match(/[0-9]/)) {
        let value = "";

        while (input[index].match(/[0-9]/)) {
          value += input[index];
          index++;
          column++;
        }

        tokens.push({ type: "Number", value, position });
        continue;
      }

      if (char === "\r") {
        index++;
        continue;
      }

      throw new Error(
        `Unexpected character "${char}" at line ${line}, column ${column}`,
      );
    }

    return tokens;
  }

  function parseTokens(tokens: Lexer.Token[]): AST.Node {
    let index = 0;

    function consume() {
      return tokens[index++];
    }

    function peek() {
      return tokens[index];
    }

    function parseNode(): AST.Node {
      const token = consume();

      switch (token.type) {
        case "LeftBrace":
          return parseObjectNode();
        case "LeftBracket":
          return parseArrayNode();
        case "String":
          return parseStringNode(token);
        case "Number":
          return parseNumberNode(token);
        case "True":
          return parseBooleanNode(true);
        case "False":
          return parseBooleanNode(false);
        case "Null":
          return parseNullNode();
        default:
          throw new Error(`Unexpected token: ${token.value}`);
      }
    }

    function parseObjectNode(): AST.ObjectNode {
      const properties: AST.PropertyNode[] = [];

      while (peek().type !== "RightBrace") {
        const key = consume();
        if (key.type !== "String") {
          throw new Error(`Unexpected token: ${key.value}`);
        }

        if (consume().type !== "Colon") {
          throw new Error(`Unexpected token: ${key.value}`);
        }

        const value = parseNode();

        // consume the comma if there is one after the property
        if (peek().type === "Comma") {
          consume();
        }

        properties.push({ key: key.value, value });
      }

      // consume the right brace
      consume();

      return { type: "Object", properties };
    }

    function parseArrayNode(): AST.ArrayNode {
      const elements: AST.Node[] = [];

      while (peek().type !== "RightBracket") {
        const element = parseNode();

        // consume the comma if there is one after the element
        if (peek().type === "Comma") {
          consume();
        }

        elements.push(element);
      }

      // consume the right bracket
      consume();

      return { type: "Array", elements };
    }

    function parseStringNode(token: Lexer.Token): AST.StringNode {
      return { type: "String", value: token.value };
    }

    function parseNumberNode(token: Lexer.Token): AST.NumberNode {
      return { type: "Number", value: parseFloat(token.value) };
    }

    function parseBooleanNode(value: boolean): AST.BooleanNode {
      return { type: "Boolean", value };
    }

    function parseNullNode(): AST.NullNode {
      return { type: "Null" };
    }

    return parseNode();
  }

  const tokens = tokenize(json);
  return parseTokens(tokens);
}
