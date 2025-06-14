import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // custom rules
  {
    rules:{
       "@typescript-eslint/no-explicit-any": "warn", // or "off" if you want to allow it
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/no-unescaped-entities": "warn", // escape quotes/apostrophes
      "no-console": "warn", // optional
    }
  }
];

export default eslintConfig;
