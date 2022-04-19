/* eslint-disable sort-keys-fix/sort-keys-fix */

// This allows eslint-config-rainbow to manage its own ESLint plugins as dependencies
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['rainbow', 'plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y'],
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'import/no-unresolved': [
      'error',
      {
        ignore: [
          '^@rainbow-me\\/rainbowkit\\/?', // Workspace packages aren't able to be resolved correctly
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.cjs'],
      rules: {
        'import/no-commonjs': 'off',
      },
    },
    {
      files: ['*.js', '*.mjs'],
      rules: {
        'import/extensions': ['error', 'always'],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/extensions': [
          'error',
          {
            css: 'always',
            js: 'never',
          },
        ],
        'import/no-unresolved': 'off',
      },
    },
  ],
};
