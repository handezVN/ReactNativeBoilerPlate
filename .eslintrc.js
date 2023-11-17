module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        "quotes": ["warning", "double"],
        "react/react-in-jsx-scope": "off",
        "react/no-unstable-nested-components": "off",
      },
    },
  ],
};
