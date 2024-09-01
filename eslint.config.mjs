import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginScss from "eslint-plugin-css";
import prettierPlugin from "eslint-plugin-prettier";
import eslintReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import eslintReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginImports from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: eslintReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": eslintReactRefresh,
      prettier: prettierPlugin,
      scss: eslintPluginScss,
      eslintImports: eslintPluginImports,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.es2020 },
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
  },
  {
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "eslintImports/imports": [
        "warn",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^shared", "^assets", "^router", "^services", "^stores"],
            ["^pages", "^components"],
            ["^\\u0000"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "max-len": ["warn", { code: 120 }],
    },
  },
  {
    ignores: ["eslint.config.mjs"],
  },
];
