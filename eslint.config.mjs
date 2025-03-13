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
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier','plugin:jsx-a11y/recommended'),
  {
    plugins: {
      prettier: prettierPlugin,
    },

    files: ['src/**/*.{ts,tsx}'],

    rules: {
      'no-var': 'error',
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

      'jsx-a11y/click-events-have-key-events': 'warn',  // 클릭 이벤트가 있는 요소에 키보드 이벤트 요구 
      'jsx-a11y/no-static-element-interactions': 'off',  // span, div 요소에서 이벤트 사용시 오류
      'jsx-a11y/no-noninteractive-element-interactions': 'off',  // 비대화 요소에서 이벤트 사용시 오류
      'jsx-a11y/interactive-supports-focus': 'off', // 포커스 지원 요구

      'jsx-a11y/control-has-associated-label': [
        'warn', 
        {
          controlComponents: ['button', 'input'], 
          ignoreElements: ['textarea'], 
        },
      ],
    },
  },
];

export default eslintConfig;
