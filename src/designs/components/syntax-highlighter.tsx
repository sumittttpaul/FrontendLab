"use client";

import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { PrismLight } from "react-syntax-highlighter";

PrismLight.registerLanguage("typescript", typescript);

export function SyntaxHighlighter({ code }: { code: string }) {
  return (
    <PrismLight
      showLineNumbers
      style={tomorrow}
      language="typescript"
      lineNumberStyle={{ color: "gray", paddingRight: 20 }}
      customStyle={{ backgroundColor: "transparent", padding: 0, margin: 0 }}
    >
      {code}
    </PrismLight>
  );
}
