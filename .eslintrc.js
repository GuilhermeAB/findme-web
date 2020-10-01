const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  plugins: [
    'import',
  ],
  extends: [
    'airbnb-base',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
  },
  settings: {
    'import/resolver': {
        node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        },
        webpack: {
            config: require.resolve('@vue/cli-service/webpack.config.js'),
        },
    },
  },
  rules: {
    'no-console': isProduction ? 'error' : 'off',
    'no-debugger': isProduction ? 'error' : 'off',
    'prettier/prettier': 0,
    'generator-star-spacing': 0,
    'space-before-function-paren': ['error', 'always'],
    'no-undef': 0,
    'object-shorthand': ['error', 'never'],
    'func-names': ['error', 'never'],
    indent: ['error', 2],
    semi: [2, 'always'],
    'no-plusplus': ['off'],
    'import/no-unresolved': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'linebreak-style': ['error', 'unix'],
    'eslint-comments/no-unlimited-disable': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': 0,
    'react-native/no-raw-text': 0,
    'global-require': 0,
    'react-native/no-inline-styles': 0,
    'no-param-reassign': 0,

  },
  overrides: [
    // VUE
    {
      files: ['*.vue', '**/*.vue', '**/*.js', '*.js'],
      extends: [
        'plugin:vue/strongly-recommended',
      ],
      rules: {
          '@typescript-eslint/**': 0,
          indent: 0,
          'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
          'vue/html-indent': ['error', 2, { baseIndent: 1 }],
          'vue/html-quotes': ['error', 'single'],
          'vue/singleline-html-element-content-newline': 2,
          'vue/max-attributes-per-line': ['error', { singleline: 5, multiline: { max: 1 } }],
          'vue/html-closing-bracket-newline': 2,
          'vue/attributes-order': ['error', { order: ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'EVENTS', 'CONTENT'] }],
          'vue/prop-name-casing': 0,
          'vue/require-prop-types': 'error',
          'vue/require-default-prop': 'error',
          'vue/no-multi-spaces': 'error',
          'vue/attribute-hyphenation': 'error',
          'vue/no-template-shadow': 'error',
          'vue/name-property-casing': 'error',
          'vue/mustache-interpolation-spacing': ['error', 'never'],
          'vue/html-end-tags': 'error',
          'vue/html-closing-bracket-spacing': 'error',
          'vue/this-in-template': 'error',
          'vue/no-spaces-around-equal-signs-in-attribute': 'error',
      },
    },
    // Typescript
    {
      files: ['**/*.ts', '**/*.tsx', '*.ts', '*.tsx'],
      extends: [
          'plugin:@typescript-eslint/all',
          'plugin:vue/strongly-recommended',
      ],
      plugins: [
          '@typescript-eslint',
      ],
      parserOptions: {
          parser: '@typescript-eslint/parser',
          ecmaVersion: 2020,
          project: './tsconfig.json',
          sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/indent': ['error', 2],
        '@typescript-eslint/**': 0,
        indent: 0,
        'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
        'vue/html-indent': ['error', 2, { baseIndent: 1 }],
        'vue/html-quotes': ['error', 'single'],
        'vue/singleline-html-element-content-newline': 2,
        'vue/max-attributes-per-line': ['error', { singleline: 5, multiline: { max: 1 } }],
        'vue/html-closing-bracket-newline': 2,
        'vue/attributes-order': ['error', { order: ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'EVENTS', 'CONTENT'] }],
        'vue/prop-name-casing': 0,
        'vue/require-prop-types': 'error',
        'vue/require-default-prop': 'error',
        'vue/no-multi-spaces': 'error',
        'vue/attribute-hyphenation': 'error',
        'vue/no-template-shadow': 'error',
        'vue/name-property-casing': 'error',
        'vue/mustache-interpolation-spacing': ['error', 'never'],
        'vue/html-end-tags': 'error',
        'vue/html-closing-bracket-spacing': 'error',
        'vue/this-in-template': 'error',
        'vue/no-spaces-around-equal-signs-in-attribute': 'error',
      },
    },
  ],
};
