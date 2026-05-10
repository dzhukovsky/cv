// Regenerates dynamic enums/properties in cv.schema.json from cv.yml.
// Auto-runs via `predev` / `prebuild`; manual: `bun run gen:schema`.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

type TechGroups = Record<string, string>;
type CV = { techGroups: TechGroups };
type Schema = {
	$defs: {
		TechGroupId: { enum: string[] };
		SelfTaughtTechGroup: { properties: Record<string, unknown> };
		ProjectTechGroup: { properties: Record<string, unknown> };
		PreferredStackGroup: { properties: Record<string, unknown> };
	};
	properties: {
		techGroups: { required: string[]; properties: Record<string, unknown> };
	};
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const yamlPath = join(root, "src/data/cv.yml");
const schemaPath = join(root, "src/data/cv.schema.json");

const cv = YAML.parse(readFileSync(yamlPath, "utf8")) as CV;
const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as Schema;

if (!cv.techGroups || typeof cv.techGroups !== "object" || Array.isArray(cv.techGroups)) {
	throw new Error("cv.yml: `techGroups` must be an object map");
}
const groupEntries = Object.entries(cv.techGroups);
const groupIds = groupEntries.map(([id]) => id);

const arrayOf = (refName: string) => ({
	type: "array",
	items: { $ref: `#/$defs/${refName}` },
	minItems: 1,
});
const arrayOfStrings = () => ({
	type: "array",
	items: { type: "string", minLength: 1 },
	minItems: 1,
});

schema.$defs.TechGroupId.enum = groupIds;

schema.properties.techGroups.required = groupIds;
schema.properties.techGroups.properties = Object.fromEntries(
	groupEntries.map(([id, name]) => [id, { const: name }]),
);

schema.$defs.SelfTaughtTechGroup.properties = Object.fromEntries(
	groupIds.map((id) => [id, arrayOf("SelfTaughtTechItem")]),
);
schema.$defs.ProjectTechGroup.properties = Object.fromEntries(
	groupIds.map((id) => [id, arrayOf("ProjectTechItem")]),
);
schema.$defs.PreferredStackGroup.properties = Object.fromEntries(
	groupIds.map((id) => [id, arrayOfStrings()]),
);

writeFileSync(schemaPath, `${JSON.stringify(schema, null, 2)}\n`);

console.log(`Synced cv.schema.json: ${groupIds.length} tech groups [${groupIds.join(", ")}]`);
