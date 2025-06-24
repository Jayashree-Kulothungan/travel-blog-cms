import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import plugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		plugins: {
			next: plugin,
		},
	},
];
