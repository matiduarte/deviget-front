module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'airbnb-base'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'import/extensions': [0],
    'import/no-unresolved': [0],
    'import/no-extraneous-dependencies': [0],
    'no-param-reassign': ['error', { 'props': false }],
    'arrow-body-style': [0, "as-needed"],
    'prefer-destructuring': [0],
    'global-require': [0],
    'no-use-before-define': [0],
    'max-len': [0],
    'camelcase': [0],
    'no-underscore-dangle': [0],
    'no-console': 'off',
    'no-debugger': 'off'
  }
}
