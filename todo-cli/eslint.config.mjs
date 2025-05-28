// todo-cli/eslint.config.mjs
export default [
  {
    files: ['**/*.js'],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-unused-vars': ['warn'],
    },
  },
];
