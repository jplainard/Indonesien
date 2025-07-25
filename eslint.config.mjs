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
  {
    // Ignorer les fichiers générés par Prisma
    ignores: [
      "src/generated/**/*",
      ".next/**/*",
      "node_modules/**/*",
      "dist/**/*",
      "build/**/*"
    ]
  },
  {
    rules: {
      // Autoriser les variables non utilisées qui commencent par _
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      // Permettre les apostrophes et guillemets dans le texte React
      "react/no-unescaped-entities": "off"
    }
  }
];

export default eslintConfig;
