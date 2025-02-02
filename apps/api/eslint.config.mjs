import pkg from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    {
        languageOptions: {
            globals: {
                ...pkg.browser,
                ...pkg.es2020,
                ...pkg.node,
                ...pkg.worker,
            },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        env: {
            node: true,
            jest: true
        },
        rules: {
            'no-console': 'error',
            'no-debugger': 'error',
            'no-extra-semi': 'error',
            'no-unsafe-finally': 'error',
            curly: ['error', 'all'],
            eqeqeq: ['error', 'always'],
            'no-eval': 'error',
            'no-implicit-globals': 'error',
            'no-multi-spaces': 'error',
            'no-new-wrappers': 'error',
            'no-unused-expressions': 'error',
            'no-useless-call': 'error',
            'no-useless-concat': 'error',
            'no-useless-return': 'error',
            yoda: 'error',
            'no-undef': 'error',
            'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
            'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
            'array-bracket-spacing': ['error', 'never'],
            'block-spacing': ['error', 'always'],
            'brace-style': ['error', '1tbs', { allowSingleLine: true }],
            camelcase: ['error', { properties: 'never' }],
            'comma-dangle': ['error', 'always-multiline'],
            'comma-spacing': ['error', { before: false, after: true }],
            'comma-style': ['error', 'last'],
            'computed-property-spacing': ['error', 'never'],
            'eol-last': ['error', 'always'],
            'func-call-spacing': ['error', 'never'],
            'key-spacing': ['error', { beforeColon: false, afterColon: true }],
            'keyword-spacing': ['error', { before: true, after: true }],
            'linebreak-style': ['error', 'unix'],
            'new-cap': ['error', { newIsCap: true, capIsNew: false }],
            'no-array-constructor': 'error',
            'no-mixed-spaces-and-tabs': 'error',
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'no-new-object': 'error',
            'no-trailing-spaces': 'error',
            'no-unneeded-ternary': 'error',
            'object-curly-spacing': ['error', 'always'],
            'one-var': ['error', 'never'],
            'padded-blocks': ['error', 'never'],
            'quote-props': ['error', 'as-needed'],
            semi: ['error', 'always'],
            'semi-spacing': ['error', { before: false, after: true }],
            'space-before-blocks': ['error', 'always'],
            'space-in-parens': ['error', 'never'],
            'space-infix-ops': 'error',
            'spaced-comment': ['error', 'always', { exceptions: ['-'] }],
            'arrow-body-style': ['error', 'as-needed'],
            'arrow-spacing': ['error', { before: true, after: true }],
            'no-duplicate-imports': 'error',
            'no-useless-computed-key': 'error',
            'no-useless-constructor': 'error',
            'no-useless-rename': 'error',
            'no-var': 'error',
            'object-shorthand': ['error', 'always'],
            'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
            'prefer-const': ['error', { destructuring: 'all' }],
            'prefer-destructuring': ['error', { object: true, array: false }],
            'prefer-numeric-literals': 'error',
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
            'prefer-template': 'error',
            'rest-spread-spacing': ['error', 'never'],
            'template-curly-spacing': ['error', 'never'],
        },
    },
];
