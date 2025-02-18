import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import pluginReact from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    // files,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        projectService: true,
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...pluginReact.configs.flat.recommended.languageOptions.globals,
        ...pluginReact.configs.flat['jsx-runtime'].languageOptions.globals,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'ESLint Config',
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@stylistic': stylistic,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      'unused-imports': unusedImportsPlugin,
      'react-hooks': reactHooksPlugin,
    },
    // files,
    // files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}', 'app/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'no-console': 'warn',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/interactive-supports-focus': 'warn',
      'prettier/prettier': 'warn',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_.*?$',
          varsIgnorePattern: '^_.*?$',
        },
      ],
      'react/self-closing-comp': 'warn',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      ],
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/consistent-indexed-object-style': ['off'],
      '@typescript-eslint/consistent-type-definitions': ['off'],
      'react/jsx-uses-vars': 'error',
      '@typescript-eslint/consistent-type-imports': ['error'],
    },
  },
  {
    ignores: [
      '.now/*',
      '*.css',
      '.changeset',
      'dist',
      'esm/*',
      'public/*',
      'tests/*',
      'scripts/*',
      '*.config.js',
      '.DS_Store',
      'node_modules',
      'coverage',
      '.next',
      'build',
      '!.commitlintrc.cjs',
      '!.lintstagedrc.cjs',
      '!.lintstagedrc.mjs',
      '!jest.config.js',
      '!plopfile.js',
      '!react-shim.js',
      '!tsup.config.ts',
      '*.md',
      '_slice',
    ],
  }
);
