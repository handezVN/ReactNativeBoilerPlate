module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'react-hooks/exhaustive-deps': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react-native/no-inline-styles': 'off',
      },
    },
  ],
};
