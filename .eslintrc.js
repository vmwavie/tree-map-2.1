module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vuejs-accessibility/label-has-for': 'off',
    // prettier config overrides this
    'vuejs-accessibility/form-control-has-label': 'off',
    'implicit-arrow-linebreak': 'off',
    'comma-dangle': 'off',
    'function-paren-newline': 'off',
    'max-len': 'off',
    'no-confusing-arrow': 'off',
    'operator-linebreak': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
