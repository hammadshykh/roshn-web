import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
 baseDirectory: __dirname,
});

const eslintConfig = [
 js.configs.recommended,
 ...compat.extends("next/core-web-vitals"),
 {
  ignores: [
   "node_modules/**",
   ".next/**",
   "out/**",
   "build/**",
   "next-env.d.ts",
  ],
 },
 {
  rules: {
   // Disable all TypeScript rules
   "@typescript-eslint/no-unused-vars": "off",
   "@typescript-eslint/no-explicit-any": "off",

   // Basic JavaScript rules
   "no-unused-vars": "warn",
   "no-console": "warn",
  },
 },
];

export default eslintConfig;
