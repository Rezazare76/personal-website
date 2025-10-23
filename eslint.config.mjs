import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwindRules from "eslint-plugin-tailwind-rules";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:security/recommended-legacy",
    "plugin:react/recommended",
  ),
  {
    plugins: {
      "tailwind-rules": tailwindRules,
    },
    rules: {
      "@next/next/no-img-element": "off",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/ban-ts-comment": "off",
      "security/detect-object-injection": "off",
      "jsx-a11y/no-static-element-interactions": [
        "warn",
        {
          handlers: ["onClick"],
        },
      ],
      "jsx-a11y/interactive-supports-focus": "warn",
      "react-hooks/exhaustive-deps": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "tailwind-rules/no-px-font-size": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;
