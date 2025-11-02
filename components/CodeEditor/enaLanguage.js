export const enaLanguageConfig = {
  comments: {
    lineComment: "#",
    blockComment: ["#{", "#}"],
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
};

export const enaLanguageTokens = {
  defaultToken: "",
  tokenPostfix: ".ena",

  keywords: [
    "თუ პირობა სრულდება",
    "თუ",
    "სხვა შემთხვევაში შეამოწმე თუ",
    "თუარადა",
    "სხვა შემთხვევაში",
    "თუარა",
    "სანამ პირობა სრულდება გაიმეორე",
    "სანამ",
    "ახალი",
    "ფუნქცია სახელად",
    "ფუნქცია",
    "ლოკალური ცვლადი",
    "ლოკალური",
    "ცვლადი",
    "დააბრუნე მნიშვნელობა",
    "დააბრუნე",
    "მაჩვენე მნიშვნელობა ეკრანზე",
    "მაჩვენე",
    "დაბეჭდე",
    "გაუშვი ბრძანება",
    "ბრძანება",
    "if",
    "elseif",
    "else",
    "while",
    "new",
    "function",
    "local",
    "return",
  ],

  builtins: [
    "true",
    "false",
    "nil",
    "ჭეშმარიტი მნიშვნელობა",
    "ჭეშმარიტი",
    "მცდარი მნიშვნელობა",
    "მცდარი",
    "ცარიელი მნიშვნელობა",
    "ცარიელი",
  ],

  operators: [
    "=",
    "+",
    "-",
    "*",
    "/",
    "%",
    "^",
    "<",
    ">",
    "<=",
    ">=",
    "==",
    "!=",
    "&",
    "|",
    "!",
    "@",
  ],

  symbols: /[=><!~?:&|+\-*\/\^%@]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  tokenizer: {
    root: [
      [/#\{/, "comment", "@comment"],
      [/#.*$/, "comment"],

      [
        /[a-zA-Zა-ჰ_][a-zA-Z0-9ა-ჰ_]*(?=\s*\()/,
        "entity.name.function",
      ],

      [
        /[a-zA-Zა-ჰ_][a-zA-Z0-9ა-ჰ_]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@builtins": "constant.language",
            "@default": "variable",
          },
        },
      ],

      { include: "@whitespace" },

      [/[{}()\[\]]/, "@brackets"],
      [/[,.:;]/, "delimiter"],

      [
        /@symbols/,
        {
          cases: {
            "@operators": "operator",
            "@default": "",
          },
        },
      ],

      [/\d+(\.\d+)?/, "number"],

      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/'/, { token: "string.quote", bracket: "@open", next: "@stringsingle" }],
    ],

    comment: [
      [/[^#]+/, "comment"],
      [/#\}/, "comment", "@pop"],
      [/#/, "comment"],
    ],

    string: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "constant.character.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],

    stringsingle: [
      [/[^\\']+/, "string"],
      [/@escapes/, "constant.character.escape"],
      [/\\./, "string.escape.invalid"],
      [/'/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],

    whitespace: [[/[ \t\r\n]+/, ""]],
  },
};
