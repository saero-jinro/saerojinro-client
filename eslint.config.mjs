import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from './prettier.config.cjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const ignoreConfig = {
  ignores: ['**/.next/**', '**/node_modules/**', '**/public/**', '**/dist/**'],
};

const eslintConfig = [
  ignoreConfig,
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    plugins: {
      prettier: prettierPlugin,
    },

    files: ['src/**/*.{ts,tsx}'],

    rules: {
      "no-var": error,
      semi: 'off',
      indent: 'off',
      quotes: 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      'array-element-newline': 'off',
      'array-bracket-newline': 'off',

      'prettier/prettier': ['error', prettierConfig],
    },
  },
];

export default eslintConfig;