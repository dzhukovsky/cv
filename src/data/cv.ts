// CV data — single normalized source for all consumers (React page, PDF,
// LLMs file, page metadata). The YAML is the authoring format; this module
// loads it through the Vite YAML plugin, resolves anchors, normalizes the
// shape (plain-string skills → objects, since/duration → start/end as Date,
// summary `|` block → paragraph array), and pre-computes aggregates.
//
// Shape highlights vs the raw YAML:
//   - All periods are `Date` / `Date | null` (not YYYY-MM strings)
//   - `cv.projects[].skills` is a flat `Skill[]`, each carrying `group: <id>`
//   - Tech-group display names live only in `cv.techGroups` (id → name) —
//     skills/aggregates carry the id, consumers look up the name when needed
//   - `cv.summary` is `string[]` (paragraphs from the `|` block)
//   - `cv.allSkills` is the aggregated skills list
//   - `cv.initials` is computed from `fullName`

import rawData from "./cv.yml";

// =============================================================================
// Public types (normalized)
// =============================================================================

export type LogoSrc = string | { light: string; dark: string };

export type LanguageLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";

export type SkillSource = "production" | "self-taught";

export type Org = { name: string; url?: string; logo: LogoSrc };

export type Language = { name: string; level: LanguageLevel };

export type Skill = {
	name: string;
	/** Tech-group id (lowercase, e.g. `"backend"`); look up display name via `cv.techGroups[id]`. */
	group: string;
	source: SkillSource;
	start: Date;
	end: Date | null;
	/** Inclusive month count covered by this skill instance. */
	months: number;
};

export type Project = {
	name: string;
	company: Org;
	position: string;
	start: Date;
	end: Date | null;
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
	issued: Date;
	expires: Date | null;
	credentialId: string;
	credentialUrl: string;
};

export type Education = {
	school: Org;
	degree: string;
	field: string;
	start: Date;
	end: Date | null;
	months: number;
};

export type Strength = { name: string; description: string };

export type AggregatedSkill = {
	name: string;
	group: string;
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
	careerStart: Date;
	photo: string;
	resumePdf: string;
	availability: string;
	tagline: string;
	summary: string[];
	languages: Language[];
	orgs: Org[];
	/** Lookup: tech-group id (e.g. `"backend"`) → display name (e.g. `"Backend"`). */
	techGroups: Record<string, string>;
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

type YearMonth = `${number}-${number}`;

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
	photo: string;
	availability: string;
	tagline: string;
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
// Date arithmetic
// =============================================================================

const parseYM = (ym: YearMonth): Date => {
	const [y, m] = ym.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, 1);
};

const addMonths = (d: Date, months: number): Date =>
	new Date(d.getFullYear(), d.getMonth() + months, 1);

/** Inclusive month count between two dates (null end = present). */
export const monthsBetween = (start: Date, end: Date | null): number => {
	const e = end ?? new Date();
	const months =
		(e.getFullYear() - start.getFullYear()) * 12 +
		(e.getMonth() - start.getMonth());
	return Math.max(0, months + 1);
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
	source: SkillSource;
	defaultStart?: Date;
	defaultEnd?: Date | null;
};

const normalizeSkill = (item: RawSkillItem, ctx: SkillContext): Skill => {
	const obj = typeof item === "string" ? { name: item } : item;
	const start = obj.since ? parseYM(obj.since) : ctx.defaultStart;
	if (!start) {
		throw new Error(
			`Skill "${obj.name}" in group "${ctx.groupId}" needs a 'since' (or a project start to inherit from)`,
		);
	}
	let end: Date | null;
	if (obj.duration) {
		end = addMonths(start, parseDuration(obj.duration) - 1);
	} else {
		end = ctx.defaultEnd ?? null;
	}
	return {
		name: obj.name,
		group: ctx.groupId,
		source: ctx.source,
		start,
		end,
		months: monthsBetween(start, end),
	};
};

const normalizeProject = (p: RawProject): Project => {
	const start = parseYM(p.start);
	const end = p.end ? parseYM(p.end) : null;
	const skills: Skill[] = [];
	for (const [groupId, items] of Object.entries(p.skills)) {
		for (const item of items) {
			skills.push(
				normalizeSkill(item, {
					groupId,
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

const normalizeSelfTaughtSkills = (bygroup: RawSkillsByGroup): Skill[] => {
	const out: Skill[] = [];
	for (const [groupId, items] of Object.entries(bygroup)) {
		for (const item of items) {
			out.push(normalizeSkill(item, { groupId, source: "self-taught" }));
		}
	}
	return out;
};

// Union of inclusive monthly intervals — sorts, merges adjacent/overlapping
// runs, returns total months covered. Two parallel projects sharing a tech
// over the same window count once, not twice. Operates on month ordinals
// (year * 12 + month) so the math stays integer.
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

const dateToOrd = (d: Date): number => d.getFullYear() * 12 + d.getMonth();

const buildAggregatedSkills = (
	projects: Project[],
	selfTaught: Skill[],
): AggregatedSkill[] => {
	const now = new Date();
	const curOrd = dateToOrd(now);
	type Bucket = {
		group: string;
		source: SkillSource;
		intervals: { s: number; e: number }[];
		lastUsed: number;
	};
	const map = new Map<string, Bucket>();

	const add = (s: Skill) => {
		const sOrd = dateToOrd(s.start);
		const eOrd = s.end ? dateToOrd(s.end) : curOrd;
		const existing = map.get(s.name);
		if (existing) {
			// Production wins over self-taught for the bucket's source label.
			if (s.source === "production") existing.source = "production";
			existing.intervals.push({ s: sOrd, e: eOrd });
			if (eOrd > existing.lastUsed) existing.lastUsed = eOrd;
		} else {
			map.set(s.name, {
				group: s.group,
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
		source: b.source,
		years: +(coverageMonths(b.intervals) / 12).toFixed(1),
		lastUsed: Math.floor(b.lastUsed / 12),
	}));
};

// =============================================================================
// Build & export the normalized CV
// =============================================================================

const projects: Project[] = raw.projects.map(normalizeProject);
const selfTaughtSkills: Skill[] = normalizeSelfTaughtSkills(raw.skills);

// Earliest start across all skills (production + self-taught) — single source
// for total years-of-experience. Project-skills inherit project start, so
// they're covered by `projects[].start`; self-taught skills can predate the
// earliest project (e.g. WPF in 2018 vs first project in 2019).
const careerStart = new Date(
	Math.min(
		...projects.map((p) => p.start.getTime()),
		...selfTaughtSkills.map((s) => s.start.getTime()),
	),
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
	careerStart,
	photo: raw.photo,
	resumePdf: `/${raw.fullName} - ${raw.position}.pdf`,
	availability: raw.availability,
	tagline: raw.tagline.trim(),
	summary: raw.summary
		.split("\n")
		.map((s) => s.trim())
		.filter(Boolean),
	languages: raw.languages,
	orgs: raw.orgs,
	techGroups: raw.techGroups,
	selfTaughtSkills,
	projects,
	certifications: raw.certifications.map((c) => ({
		name: c.name,
		code: c.code,
		issuer: c.issuer,
		about: c.about,
		issued: parseYM(c.issued),
		expires: c.expires ? parseYM(c.expires) : null,
		credentialId: c.credentialId,
		credentialUrl: c.credentialUrl,
	})),
	education: raw.education.map((e) => {
		const start = parseYM(e.start);
		const end = e.end ? parseYM(e.end) : null;
		return {
			school: e.school,
			degree: e.degree,
			field: e.field,
			start,
			end,
			months: monthsBetween(start, end),
		};
	}),
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
	const ms = Date.now() - cv.careerStart.getTime();
	return Math.floor(ms / (1000 * 60 * 60 * 24 * 365.25));
};

/** "Nov 2024" — month-year for display. */
export const formatYearMonth = (d: Date): string =>
	d.toLocaleDateString("en-US", { year: "numeric", month: "short" });

export const formatPeriod = (start: Date, end: Date | null): string =>
	`${formatYearMonth(start)} — ${end ? formatYearMonth(end) : "Present"}`;

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
	start: Date,
	end: Date | null,
	format: DurationFormat = "long",
): string => {
	const m = monthsBetween(start, end);
	const y = Math.floor(m / 12);
	const mm = m % 12;
	if (y === 0) return formatMonths(mm, format);
	if (mm === 0) return formatYears(y, format);
	return `${formatYears(y, format)} ${formatMonths(mm, format)}`;
};
