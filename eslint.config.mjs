import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginNext from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default [
	...compat.extends("next/core-web-vitals", "next/typescript"),

	{
		plugins: {
			next: eslintPluginNext,
		},
		rules: {
			// ✅ Optional: adjust for production or Vercel compatibility
			"@typescript-eslint/no-explicit-any": "off",
			"@next/next/no-html-link-for-pages": "warn",
			"@next/next/no-img-element": "warn",
		},
	},
];
