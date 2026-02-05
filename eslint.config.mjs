import { defineConfig, globalIgnores } from "eslint/config";
import eslintJs from "@eslint/js";
import globals from "globals";

// Plugins
import tsEslint from "typescript-eslint";
import pluginNode from "eslint-plugin-n";
import turboPlugin from "eslint-plugin-turbo";
import reactCompilerPlugin from "eslint-plugin-react-compiler";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

// Next.js Configs (These already include react, react-hooks, jsx-a11y, and next plugins)
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** * Centralized Rules to Disable for Config/JS files
 */
const disabledTypeScriptRules = {
  "@typescript-eslint/no-require-imports": "off",
  "@typescript-eslint/no-var-requires": "off",
  "@typescript-eslint/explicit-function-return-type": "off",
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unsafe-return": "off",
  "@typescript-eslint/no-unsafe-argument": "off",
  "@typescript-eslint/no-floating-promises": "off",
  "@typescript-eslint/await-thenable": "off",
  "@typescript-eslint/no-misused-promises": "off",
  "@typescript-eslint/restrict-template-expressions": "off",
  "@typescript-eslint/unbound-method": "off",
  "@typescript-eslint/require-await": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "no-undef": "off",
};

export default defineConfig([
  // 1. Global Ignores
  globalIgnores([
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.turbo/**",
    "**/coverage/**",
    "**/.next/**",
    "**/out/**",
    "**/.vercel/**",
    "**/*.json",
    "next-env.d.ts",
    "public/**",
  ]),

  // 2. Base Configurations
  eslintJs.configs.recommended,
  ...tsEslint.configs.recommended,
  ...nextVitals, // Provides: react, react-hooks, jsx-a11y, next, import
  ...nextTs,
  eslintConfigPrettier,

  // 3. Shared Settings & Globals
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
        JSX: "readonly",
      },
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
        },
        node: true,
      },
    },
    // Only define plugins NOT provided by Next.js presets
    plugins: {
      n: pluginNode,
      turbo: turboPlugin,
      prettier: prettierPlugin,
      "react-compiler": reactCompilerPlugin,
    },
  },

  // 4. TypeScript Source Files (.ts, .tsx)
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs", "*.cjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript Specifics
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-explicit-any": "off",

      // Turbo
      "turbo/no-undeclared-env-vars": "error",

      // Imports (plugin provided by Next.js, rules configured here)
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/*.test.*", "**/*.spec.*", "**/*.config.*", "**/scripts/**"],
        },
      ],
      "import/no-anonymous-default-export": ["warn", { allowArray: true, allowObject: true }],

      // Prettier
      "prettier/prettier": ["warn", { endOfLine: "auto" }],
    },
  },

  // 5. React & Next.js Components
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      // React Compiler
      "react-compiler/react-compiler": "error",

      // Accessibility & Hooks (Plugins loaded by Next, just tweaking rules)
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",

      // Next.js
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "warn",
    },
  },

  // 6. Configuration Files (JS/MJS/CJS)
  {
    files: [
      "**/*.config.{js,mjs,cjs}",
      "**/eslint.config.{js,mjs,cjs}",
      "**/next.config.{js,mjs}",
      "**/postcss.config.{js,mjs}",
      "**/tailwind.config.{js,mjs,ts}",
    ],
    languageOptions: {
      parserOptions: { project: null },
    },
    rules: {
      ...disabledTypeScriptRules,
      "import/no-extraneous-dependencies": "off",
      "import/no-anonymous-default-export": "off",
      "turbo/no-undeclared-env-vars": "off",
      "no-console": "off",
    },
  },

  // 7. Type Declaration Files
  {
    files: ["**/*.d.ts"],
    rules: {
      "import/no-duplicates": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      ...disabledTypeScriptRules,
    },
  },
]);
