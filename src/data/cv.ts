import rawData from "./cv.yml";

export type LogoSrc = string | { light: string; dark: string };

export type LanguageLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";

export type SkillSource = "production" | "self-taught";

export type Org = { name: string; url?: string; logo: LogoSrc };

export type Language = { name: string; level: LanguageLevel };

export type Skill = {
	name: string;
	group: string;
	source: SkillSource;
	start: Date;
	end: Date | null;
	months: number;
};

export type Project = {
	name: string;
	company: Org;
	position: string;
	seniority: Seniority;
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

export type Seniority = "Junior" | "Middle" | "Senior";

export type PreferredStack = Record<string, string[]>;

export type AggregatedSkill = {
	name: string;
	group: string;
	source: SkillSource;
	years: number;
	lastUsed: number;
	order: number;
};

export type CV = {
	fullName: string;
	initials: string;
	position: string;
	location: { city: string; country: string };
	contractType: string;
	email: string;
	linkedIn: string;
	github: string;
	portfolio: string;
	careerStart: Date;
	productionStart: Date;
	photo: string;
	availability: string;
	tagline: string;
	summary: string[];
	preferredStack: PreferredStack;
	languages: Language[];
	orgs: Org[];
	techGroups: Record<string, string>;
	selfTaughtSkills: Skill[];
	projects: Project[];
	certifications: Certification[];
	education: Education[];
	strengths: Strength[];
	allSkills: AggregatedSkill[];
};

type YearMonth = `${number}-${number}`;

type RawSkillItem =
	| string
	| { name: string; since?: YearMonth; duration?: string };

type RawSkillsByGroup = Record<string, RawSkillItem[]>;

type RawProject = {
	name: string;
	company: Org;
	position: string;
	seniority: Seniority;
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
	contractType: string;
	email: string;
	linkedIn: string;
	github: string;
	portfolio: string;
	photo: string;
	availability: string;
	tagline: string;
	summary: string;
	preferredStack: PreferredStack;
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

const parseYM = (ym: YearMonth): Date => {
	const [y, m] = ym.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, 1);
};

const addMonths = (d: Date, months: number): Date =>
	new Date(d.getFullYear(), d.getMonth() + months, 1);

export const monthsBetween = (start: Date, end: Date | null): number => {
	const e = end ?? new Date();
	const months =
		(e.getFullYear() - start.getFullYear()) * 12 +
		(e.getMonth() - start.getMonth());
	return Math.max(0, months + 1);
};

const parseDuration = (d: string): number => {
	let months = 0;
	const y = d.match(/(\d+)\s*y/);
	const m = d.match(/(\d+)\s*m/);
	if (y) months += +y[1] * 12;
	if (m) months += +m[1];
	return months;
};

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
		seniority: p.seniority,
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

// Union of inclusive monthly intervals — overlapping runs across parallel
// projects count once. Operates on month ordinals (year * 12 + month).
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
		order: number;
	};
	const map = new Map<string, Bucket>();

	const add = (s: Skill) => {
		const sOrd = dateToOrd(s.start);
		const eOrd = s.end ? dateToOrd(s.end) : curOrd;
		const existing = map.get(s.name);
		if (existing) {
			if (s.source === "production") existing.source = "production";
			existing.intervals.push({ s: sOrd, e: eOrd });
			if (eOrd > existing.lastUsed) existing.lastUsed = eOrd;
		} else {
			map.set(s.name, {
				group: s.group,
				source: s.source,
				intervals: [{ s: sOrd, e: eOrd }],
				lastUsed: eOrd,
				order: map.size,
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
		order: b.order,
	}));
};

const projects: Project[] = raw.projects.map(normalizeProject);
const selfTaughtSkills: Skill[] = normalizeSelfTaughtSkills(raw.skills);

// productionStart = first paid project. careerStart includes self-taught time
// that may predate the first project (e.g. WPF in 2018 vs first project in 2019).
const productionStart = new Date(
	Math.min(...projects.map((p) => p.start.getTime())),
);
const careerStart = new Date(
	Math.min(
		productionStart.getTime(),
		...selfTaughtSkills.map((s) => s.start.getTime()),
	),
);

export const cv: CV = {
	fullName: raw.fullName,
	initials: initialsOf(raw.fullName),
	position: raw.position,
	location: raw.location,
	contractType: raw.contractType,
	email: raw.email,
	linkedIn: raw.linkedIn,
	github: raw.github,
	portfolio: raw.portfolio,
	careerStart,
	productionStart,
	photo: raw.photo,
	availability: raw.availability,
	tagline: raw.tagline.trim(),
	summary: raw.summary
		.split("\n")
		.map((s) => s.trim())
		.filter(Boolean),
	preferredStack: raw.preferredStack,
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

export type DurationFormat = "short" | "long";

export const pickLogo = (logo: LogoSrc, theme: "light" | "dark"): string =>
	typeof logo === "string" ? logo : logo[theme];

const yearsSince = (d: Date) =>
	Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

export const yearsOfExperience = (): number => yearsSince(cv.careerStart);
export const productionYearsOfExperience = (): number => yearsSince(cv.productionStart);

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
