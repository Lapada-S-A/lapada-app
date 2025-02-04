// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
  },
  ignores: [
    "presets",
    "dist",
    "coverage",
    "ship.config.js",
    "packages/playground",
    ".output",
    ".nuxt",
  ],
  languageOptions: {
    ecmaVersion: "latest",
  },
});
