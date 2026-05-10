// UI text for portfolio page sections — separate from cv.ts (which holds CV
// data). Strings in sections.yml may contain `{path.to.value}` tokens;
// applyTemplate() resolves them. Use applyTemplate() on any string read from
// `sections` that might contain tokens (titles, descriptions).

import { cv, yearsOfExperience } from "./cv";
import rawSections from "./sections.yml";

// =============================================================================
// Public types
// =============================================================================

type TitleDescription = { title: string; description: string };

export type ExpertiseIcon = "cpu" | "cloud" | "database" | "workflow";

export type ExpertiseCard = {
	title: string;
	description: string;
	icon: ExpertiseIcon;
};

type StatLabel = { label: string; suffix?: string };

export type Sections = {
	hero: {
		availableTooltip: string;
		stats: {
			experience: StatLabel;
			platforms: StatLabel;
			technologies: StatLabel;
			certifications: StatLabel;
		};
	};
	about: TitleDescription & { expertise: ExpertiseCard[] };
	experience: TitleDescription;
	technologies: TitleDescription & { preferred: TitleDescription };
	certifications: TitleDescription;
	education: { title: string };
	strengths: TitleDescription;
	cta: { eyebrow: string; title: string; description: string };
};

export const sections: Sections = rawSections as Sections;

// =============================================================================
// Template engine
// =============================================================================

// Naturally-joined English list: "a", "a and b", "a, b, and c".
const joinNatural = (items: string[]): string => {
	if (items.length === 0) return "";
	if (items.length === 1) return items[0];
	if (items.length === 2) return `${items[0]} and ${items[1]}`;
	return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
};

// Unique-preserving flat list of all project `areas`, in original order
// (first occurrence wins; comparison is case-insensitive).
const uniqueProjectAreas = (): string[] => {
	const seen = new Set<string>();
	const out: string[] = [];
	for (const p of cv.projects) {
		for (const a of p.areas) {
			const k = a.toLowerCase();
			if (seen.has(k)) continue;
			seen.add(k);
			out.push(a);
		}
	}
	return out;
};

// Token registry — each entry resolves a `{path.to.value}` token from
// sections.yml to a runtime string. Add tokens here as new placeholders are
// introduced; keep names descriptive (prefer `projects.count` over `count`).
const tokens: Record<string, () => string> = {
	years: () => String(yearsOfExperience()),
	"projects.count": () => String(cv.projects.length),
	"projects.areas": () => joinNatural(uniqueProjectAreas()),
};

/** Replace `{token}` placeholders in a template string. Unknown tokens pass through. */
export const applyTemplate = (template: string): string =>
	template.replace(/\{([^}]+)\}/g, (_match, key) => tokens[key]?.() ?? `{${key}}`);
