// CV data — single normalized source for all consumers (React page, PDF,
// LLMs file, page metadata). The YAML is the authoring format; this module
// loads it through the Vite YAML plugin, resolves anchors, normalizes the
// shape (plain-string skills → objects, since/duration → start/end, summary
// `|` block → paragraph array), and pre-computes aggregates.
//
// Shape highlights vs the raw YAML:
//   - `cv.projects[].skills` is a flat `Skill[]` (group resolved per item),
//     not an object map of arrays
//   - `cv.selfTaughtSkills` is a flat `Skill[]` from the top-level YAML map
//   - All periods use `start: YearMonth`, `end: YearMonth | null`
//   - `cv.summary` is `string[]` (paragraphs, split from the `|` block)
//   - `cv.allSkills` is the aggregated tech list (was `aggregateTechnologies()`)
//   - `cv.initials` is computed from `fullName`

import rawData from "./cv.yml";

// =============================================================================
// Public types (normalized)
// =============================================================================

export type LogoSrc = string | { light: string; dark: string };

export type LanguageLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";

export type SkillSource = "production" | "self-taught";

export type YearMonth = `${number}-${number}`;

export type Org = { name: string; url?: string; logo: LogoSrc };

export type Language = { name: string; level: LanguageLevel };

export type Skill = {
	name: string;
	/** Display name (e.g. `"Backend"`). */
	group: string;
	/** Lowercase id (e.g. `"backend"`). */
	groupId: string;
	source: SkillSource;
	start: YearMonth;
	end: YearMonth | null;
	/** Inclusive month count covered by this skill instance. */
	months: number;
};

export type Project = {
	name: string;
	company: Org;
	position: string;
	start: YearMonth;
	end: YearMonth | null;
	months: number;
	areas: string[];
	description: string;
	contributions: string[];
	skills: Skill[];
};

export type Certification = {
	name: string;
	code: string;
	issuer: Org;
	about: string;
	issued: YearMonth;
	expires: YearMonth | null;
	credentialId: string;
	credentialUrl: string;
};

export type Education = {
	school: Org;
	degree: string;
	field: string;
	start: YearMonth;
	end: YearMonth | null;
	months: number;
};

export type Strength = { name: string; description: string };

export type TechGroup = { id: string; name: string };

export type AggregatedSkill = {
	name: string;
	group: string;
	groupId: string;
	source: SkillSource;
	/** Total years (deduped union of intervals across projects + self-taught). */
	years: number;
	/** Calendar year the skill was last used. */
	lastUsed: number;
};

export type CV = {
	fullName: string;
	initials: string;
	position: string;
	location: { city: string; country: string };
	contractTypes: string[];
	email: string;
	linkedIn: string;
	github: string;
	portfolio: string;
	summary: string[];
	languages: Language[];
	orgs: Org[];
	techGroups: TechGroup[];
	selfTaughtSkills: Skill[];
	projects: Project[];
	certifications: Certification[];
	education: Education[];
	strengths: Strength[];
	allSkills: AggregatedSkill[];
};

// =============================================================================
// Raw types (mirror the YAML shape after anchor resolution)
// =============================================================================

type RawSkillItem =
	| string
	| { name: string; since?: YearMonth; duration?: string };

type RawSkillsByGroup = Record<string, RawSkillItem[]>;

type RawProject = {
	name: string;
	company: Org;
	position: string;
	start: YearMonth;
	end?: YearMonth;
	areas: string[];
	description: string;
	contributions: string[];
	skills: RawSkillsByGroup;
};

type RawCertification = {
	name: string;
	code: string;
	issuer: Org;
	about: string;
	issued: YearMonth;
	expires?: YearMonth;
	credentialId: string;
	credentialUrl: string;
};

type RawEducation = {
	school: Org;
	degree: string;
	field: string;
	start: YearMonth;
	end?: YearMonth;
};

type RawCV = {
	fullName: string;
	position: string;
	location: { city: string; country: string };
	contractTypes: string[];
	email: string;
	linkedIn: string;
	github: string;
	portfolio: string;
	summary: string;
	languages: Language[];
	orgs: Org[];
	techGroups: Record<string, string>;
	skills: RawSkillsByGroup;
	projects: RawProject[];
	certifications: RawCertification[];
	education: RawEducation[];
	strengths: Strength[];
};

const raw = rawData as RawCV;

// =============================================================================
// Date arithmetic (year-month is a month-granular ordinal: y * 12 + m)
// =============================================================================

const ymToOrd = (ym: YearMonth): number => {
	const [y, m] = ym.split("-").map(Number);
	return y * 12 + (m ?? 1) - 1;
};

const ordToYm = (ord: number): YearMonth => {
	const y = Math.floor(ord / 12);
	const m = (ord % 12) + 1;
	return `${y}-${String(m).padStart(2, "0")}` as YearMonth;
};

const currentOrd = (): number => {
	const d = new Date();
	return d.getFullYear() * 12 + d.getMonth();
};

/** Inclusive month count between two YYYY-MM (null end = present). */
export const monthsBetween = (
	start: YearMonth,
	end: YearMonth | null,
): number => {
	const so = ymToOrd(start);
	const eo = end ? ymToOrd(end) : currentOrd();
	return Math.max(0, eo - so + 1);
};

/** Parses `1y6m`, `1y`, `6m`, `2y 3m` → total months. Whitespace ignored. */
const parseDuration = (d: string): number => {
	let months = 0;
	const y = d.match(/(\d+)\s*y/);
	const m = d.match(/(\d+)\s*m/);
	if (y) months += +y[1] * 12;
	if (m) months += +m[1];
	return months;
};

// =============================================================================
// Normalization
// =============================================================================

const initialsOf = (name: string): string =>
	name
		.split(/\s+/)
		.filter(Boolean)
		.map((w) => w[0])
		.join("")
		.toUpperCase();

type SkillContext = {
	groupId: string;
	groupName: string;
	source: SkillSource;
	defaultStart?: YearMonth;
	defaultEnd?: YearMonth | null;
};

const normalizeSkill = (item: RawSkillItem, ctx: SkillContext): Skill => {
	const obj = typeof item === "string" ? { name: item } : item;
	const since = obj.since ?? ctx.defaultStart;
	if (!since) {
		throw new Error(
			`Skill "${obj.name}" in group "${ctx.groupId}" needs a 'since' (or a project start to inherit from)`,
		);
	}
	let end: YearMonth | null;
	if (obj.duration) {
		const months = parseDuration(obj.duration);
		end = ordToYm(ymToOrd(since) + months - 1);
	} else {
		end = ctx.defaultEnd ?? null;
	}
	return {
		name: obj.name,
		group: ctx.groupName,
		groupId: ctx.groupId,
		source: ctx.source,
		start: since,
		end,
		months: monthsBetween(since, end),
	};
};

const normalizeProject = (
	p: RawProject,
	techGroups: Record<string, string>,
): Project => {
	const start = p.start;
	const end = p.end ?? null;
	const skills: Skill[] = [];
	for (const [groupId, items] of Object.entries(p.skills)) {
		const groupName = techGroups[groupId] ?? groupId;
		for (const item of items) {
			skills.push(
				normalizeSkill(item, {
					groupId,
					groupName,
					source: "production",
					defaultStart: start,
					defaultEnd: end,
				}),
			);
		}
	}
	return {
		name: p.name,
		company: p.company,
		position: p.position,
		start,
		end,
		months: monthsBetween(start, end),
		areas: p.areas,
		description: p.description,
		contributions: p.contributions,
		skills,
	};
};

const normalizeSelfTaughtSkills = (
	bygroup: RawSkillsByGroup,
	techGroups: Record<string, string>,
): Skill[] => {
	const out: Skill[] = [];
	for (const [groupId, items] of Object.entries(bygroup)) {
		const groupName = techGroups[groupId] ?? groupId;
		for (const item of items) {
			out.push(
				normalizeSkill(item, { groupId, groupName, source: "self-taught" }),
			);
		}
	}
	return out;
};

// Union of inclusive monthly intervals — sorts, merges adjacent/overlapping
// runs, returns total months covered. Two parallel projects sharing a tech
// over the same window count once, not twice.
const coverageMonths = (intervals: { s: number; e: number }[]): number => {
	if (!intervals.length) return 0;
	const sorted = [...intervals].sort((a, b) => a.s - b.s);
	let total = 0;
	let curS = sorted[0].s;
	let curE = sorted[0].e;
	for (let i = 1; i < sorted.length; i++) {
		const next = sorted[i];
		if (next.s <= curE + 1) curE = Math.max(curE, next.e);
		else {
			total += curE - curS + 1;
			curS = next.s;
			curE = next.e;
		}
	}
	total += curE - curS + 1;
	return total;
};

const buildAggregatedSkills = (
	projects: Project[],
	selfTaught: Skill[],
): AggregatedSkill[] => {
	const cur = currentOrd();
	type Bucket = {
		group: string;
		groupId: string;
		source: SkillSource;
		intervals: { s: number; e: number }[];
		lastUsed: number;
	};
	const map = new Map<string, Bucket>();

	const add = (s: Skill) => {
		const sOrd = ymToOrd(s.start);
		const eOrd = s.end ? ymToOrd(s.end) : cur;
		const existing = map.get(s.name);
		if (existing) {
			// Production wins over self-taught for the bucket's source label.
			if (s.source === "production") existing.source = "production";
			existing.intervals.push({ s: sOrd, e: eOrd });
			if (eOrd > existing.lastUsed) existing.lastUsed = eOrd;
		} else {
			map.set(s.name, {
				group: s.group,
				groupId: s.groupId,
				source: s.source,
				intervals: [{ s: sOrd, e: eOrd }],
				lastUsed: eOrd,
			});
		}
	};

	for (const p of projects) for (const s of p.skills) add(s);
	for (const s of selfTaught) add(s);

	return Array.from(map.entries()).map(([name, b]) => ({
		name,
		group: b.group,
		groupId: b.groupId,
		source: b.source,
		years: +(coverageMonths(b.intervals) / 12).toFixed(1),
		lastUsed: Math.floor(b.lastUsed / 12),
	}));
};

// =============================================================================
// Build & export the normalized CV
// =============================================================================

const techGroups: TechGroup[] = Object.entries(raw.techGroups).map(
	([id, name]) => ({ id, name }),
);

const projects: Project[] = raw.projects.map((p) =>
	normalizeProject(p, raw.techGroups),
);

const selfTaughtSkills: Skill[] = normalizeSelfTaughtSkills(
	raw.skills,
	raw.techGroups,
);

export const cv: CV = {
	fullName: raw.fullName,
	initials: initialsOf(raw.fullName),
	position: raw.position,
	location: raw.location,
	contractTypes: raw.contractTypes,
	email: raw.email,
	linkedIn: raw.linkedIn,
	github: raw.github,
	portfolio: raw.portfolio,
	summary: raw.summary
		.split("\n")
		.map((s) => s.trim())
		.filter(Boolean),
	languages: raw.languages,
	orgs: raw.orgs,
	techGroups,
	selfTaughtSkills,
	projects,
	certifications: raw.certifications.map((c) => ({
		name: c.name,
		code: c.code,
		issuer: c.issuer,
		about: c.about,
		issued: c.issued,
		expires: c.expires ?? null,
		credentialId: c.credentialId,
		credentialUrl: c.credentialUrl,
	})),
	education: raw.education.map((e) => ({
		school: e.school,
		degree: e.degree,
		field: e.field,
		start: e.start,
		end: e.end ?? null,
		months: monthsBetween(e.start, e.end ?? null),
	})),
	strengths: raw.strengths,
	allSkills: buildAggregatedSkills(projects, selfTaughtSkills),
};

// =============================================================================
// Public helpers
// =============================================================================

export type DurationFormat = "short" | "long";

export const pickLogo = (logo: LogoSrc, theme: "light" | "dark"): string =>
	typeof logo === "string" ? logo : logo[theme];

export const yearsOfExperience = (): number => {
	const start = new Date("2016-01-01");
	const ms = Date.now() - start.getTime();
	return Math.floor(ms / (1000 * 60 * 60 * 24 * 365.25));
};

export const formatPeriod = (
	start: YearMonth,
	end: YearMonth | null,
): string => {
	const fmt = (d: string) => {
		const [y, m] = d.split("-").map(Number);
		return new Date(y, (m ?? 1) - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};
	return `${fmt(start)} — ${end ? fmt(end) : "Present"}`;
};

export const formatYears = (
	value: number,
	format: DurationFormat = "long",
): string => {
	if (format === "short") return `${value}y`;
	return `${value} ${value === 1 ? "yr" : "yrs"}`;
};

export const formatMonths = (
	value: number,
	format: DurationFormat = "long",
): string => {
	if (format === "short") return `${value}m`;
	return `${value} ${value === 1 ? "mo" : "mos"}`;
};

export const formatDuration = (
	start: YearMonth,
	end: YearMonth | null,
	format: DurationFormat = "long",
): string => {
	const m = monthsBetween(start, end);
	const y = Math.floor(m / 12);
	const mm = m % 12;
	if (y === 0) return formatMonths(mm, format);
	if (mm === 0) return formatYears(y, format);
	return `${formatYears(y, format)} ${formatMonths(mm, format)}`;
};

/** Backwards-compat alias for the old `aggregateTechnologies(cv)` call site. */
export const aggregateTechnologies = (_cv: CV = cv): AggregatedSkill[] =>
	_cv.allSkills;
