module.exports = {
  root: true,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:@next/next/recommended",
  ],
  rules: {
    curly: "off",
    "no-console": "warn",
    "no-undef": "error",
    "no-useless-escape": "off",
    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@next/next/no-img-element": "off",
    "no-fallthrough": "off",
    "no-useless-catch": "off",
    "no-unsafe-optional-chaining": "off"
  },
  globals: {
    window: true,
    document: true,
    localStorage: true,
    setTimeout: true,
    FormData: true,
    process: true,
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
};
