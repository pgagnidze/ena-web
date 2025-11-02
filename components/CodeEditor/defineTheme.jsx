import { loader } from "@monaco-editor/react";

const defineTheme = (theme) => {
  return new Promise((res) => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("nord", {
        base: "vs-dark",
        inherit: false,
        rules: [
          { token: "comment", foreground: "4C566A", fontStyle: "italic" },
          { token: "keyword", foreground: "81A1C1" },
          { token: "entity.name.function", foreground: "88C0D0" },
          { token: "variable", foreground: "D8DEE9" },
          { token: "constant.language", foreground: "5E81AC" },
          { token: "string", foreground: "A3BE8C" },
          { token: "string.quote", foreground: "A3BE8C" },
          { token: "constant.character.escape", foreground: "EBCB8B" },
          { token: "string.escape.invalid", foreground: "BF616A" },
          { token: "number", foreground: "B48EAD" },
          { token: "operator", foreground: "81A1C1" },
          { token: "delimiter", foreground: "D8DEE9" },
          { token: "delimiter.bracket", foreground: "ECEFF4" },
        ],
        colors: {
          "editor.background": "#2E3440",
          "editor.foreground": "#D8DEE9",
          "editorLineNumber.foreground": "#4C566A",
          "editorLineNumber.activeForeground": "#D8DEE9",
          "editor.selectionBackground": "#434C5E",
          "editor.inactiveSelectionBackground": "#3B4252",
          "editor.lineHighlightBackground": "#3B4252",
          "editorCursor.foreground": "#D8DEE9",
          "editorWhitespace.foreground": "#4C566A80",
          "editorIndentGuide.background": "#434C5E",
          "editorIndentGuide.activeBackground": "#4C566A",
          "editor.selectionHighlightBackground": "#434C5E80",
          "editor.wordHighlightBackground": "#434C5E80",
          "editor.wordHighlightStrongBackground": "#434C5E80",
          "editorBracketMatch.background": "#434C5E",
          "editorBracketMatch.border": "#88C0D0",
        },
      });
      res();
    });
  });
};

export { defineTheme };
