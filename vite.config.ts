import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import YAML from "yaml";
import { cvExportPlugin } from "./vite-plugins/cv-export";
import { cvMetaPlugin } from "./vite-plugins/cv-meta";

// `import data from './foo.yml'` → parsed object, anchors/aliases resolved at build time.
function yamlPlugin(): Plugin {
	return {
		name: "yaml-loader",
		transform(code, id) {
			if (!/\.ya?ml$/.test(id)) return null;
			const data = YAML.parse(code);
			return {
				code: `export default ${JSON.stringify(data)}`,
				map: { mappings: "" },
			};
		},
	};
}

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		yamlPlugin(),
		cvMetaPlugin(),
		cvExportPlugin(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
