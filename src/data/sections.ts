import { cv, yearsOfExperience } from "./cv";
import rawSections from "./sections.yml";

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

// "a", "a and b", "a, b, and c"
const joinNatural = (items: string[]): string => {
	if (items.length === 0) return "";
	if (items.length === 1) return items[0];
	if (items.length === 2) return `${items[0]} and ${items[1]}`;
	return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
};

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

const tokens: Record<string, () => string> = {
	years: () => String(yearsOfExperience()),
	"projects.count": () => String(cv.projects.length),
	"projects.areas": () => joinNatural(uniqueProjectAreas()),
};

export const applyTemplate = (template: string): string =>
	template.replace(/\{([^}]+)\}/g, (_match, key) => tokens[key]?.() ?? `{${key}}`);
