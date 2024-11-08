/** @type {import("prettier").Options} */
const config = {
  bracketSpacing: true,
  experimentalTernaries: true,
  overrides: [
    {
      files: ["tsconfig.json"],
      options: {
        parser: "jsonc",
      },
    },
  ],
  printWidth: 120,
  quoteProps: "consistent",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
};

export default config;
