// eslint.config.ts
import js from '@eslint/js';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react/configs/recommended.js';
import reactJsx from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import-x';
import a11y from 'eslint-plugin-jsx-a11y';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintComments from 'eslint-plugin-eslint-comments';
import promise from 'eslint-plugin-promise';
import globals from 'globals';
import { fixupConfigRules } from '@eslint/compat';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: ts.parser,
      parserOptions: {
        project: true
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,

  ...fixupConfigRules([
    {
      ...react,
      settings: {
        react: { version: 'detect' }
      }
    },
    reactJsx
  ]),

  {
    plugins: {
      'react-hooks': reactHooks,
      import: importPlugin,
      'jsx-a11y': a11y,
      'unused-imports': unusedImports,
      'eslint-comments': eslintComments,
      promise: promise
    },
    rules: {
      // ✅ React Hooks
      ...reactHooks.configs.recommended.rules,

      // ✅ Accessibility
      ...a11y.configs.recommended.rules,

      // ✅ Import management
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'import/no-unresolved': 'error',
      'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.tsx', '**/*.stories.tsx'] }],

      // ✅ Promise best practices
      ...promise.configs.recommended.rules,

      // ✅ ESLint comments
      ...eslintComments.configs.recommended.rules,

      // ✅ Unused imports
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],

      // ✅ General code quality
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-empty-function': 'off', // ts handles this better
      '@typescript-eslint/no-empty-function': ['warn'],

      // ✅ Formatting (defer to Prettier)
      'prettier/prettier': 'off'
    }
  },

  // Ignore built files
  { ignores: ['dist/', 'build/', 'node_modules/'] }
];
