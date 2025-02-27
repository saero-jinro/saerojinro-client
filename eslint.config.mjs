import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const ignoreConfig = {
  ignores: ["**/.next/**", "**/node_modules/**", "**/public/**", "**/dist/**"],
};

const eslintConfig = [
  ignoreConfig,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      prettier: prettierPlugin,
    },

    files: ["src/**/*.{ts,tsx}"],

    rules: {
      semi: ["error", "always"],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      indent: ["error", 2, { SwitchCase: 1 }],
      "prettier/prettier": ["error", 
        { 
          printWidth: 100,
        }],
    },
  },
];

export default eslintConfig;
