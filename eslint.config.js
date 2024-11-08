import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import jsdocConfig from "eslint-plugin-jsdoc";

export default tseslint.config(
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: ["**/dist/**", "**/node_modules/**", ".github/**", ".idea/**", ".vscode/**"],
  },
  // extends ...
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // base config
  {
    languageOptions: {
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        cacheLifetime: {
          // we pretty well never create/change tsconfig structure - so no need to ever evict the cache
          // in the rare case that we do - just need to manually restart their IDE.
          glob: "Infinity",
        },
        project: true,
        sourceType: "module",
        tsconfigRootDir: import.meta.dirname,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["eslint.config.js", "prettier.config.mjs"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // turn off other type-aware rules
      "deprecation/deprecation": "off",
      "@typescript-eslint/internal/no-poorly-typed-ts-props": "off",
      // turn off rules that don't apply to JS code
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    plugins: {
      jsdoc: jsdocConfig,
    },
    rules: {
      "jsdoc/check-values": "error",
      "jsdoc/require-description": "error",
    },
  },
  { ...prettierConfig },
);
