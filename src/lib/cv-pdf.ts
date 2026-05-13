import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import type {
	Content,
	ContentColumns,
	ContentStack,
	ContentText,
	Margins,
	TDocumentDefinitions,
} from "pdfmake/interfaces";
import {
	type CV,
	cv as defaultCv,
	type Project,
	yearsOfExperience,
} from "@/data/cv";

// pdfmake ships its default Roboto fonts as a vfs blob — register once per module load.
(
	pdfMake as unknown as {
		addVirtualFileSystem: (vfs: Record<string, string>) => void;
	}
).addVirtualFileSystem(pdfFonts as unknown as Record<string, string>);

const RECENT_YEARS = 3;
const LINK_COLOR = "#0563C1";
const MUTED = "#444444";

// Match docx PAGE_MARGIN (720/900 twips → 36/45pt; 1pt = 1/72"). [L, T, R, B].
const PAGE_MARGINS = [45, 36, 45, 36] as [number, number, number, number];

// Match docx spacing constants: HALF=6pt, SINGLE=12pt, ONE_AND_HALF=18pt, DOUBLE=24pt.
// Every body paragraph gets BODY_MARGIN below (= docx's default `spacing.after`).
// Headings get a named style with their own `before + after` margin pair.
const BODY_MARGIN: Margins = [0, 0, 0, 6];
const BULLET_INDENT = 18; // matches docx `left: 720, hanging: 360` → dash at 18pt, text at 36pt.

const formatYM = (d: Date): string =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
const formatPeriod = (start: Date, end: Date | null) =>
	`${formatYM(start)} – ${end ? formatYM(end) : "present"}`;
const formatUrl = (url: string) =>
	url.startsWith("http") ? url : `https://${url}`;

const srcRank = (s: "production" | "self-taught") =>
	s === "production" ? 0 : 1;
const displayedYears = (y: number) =>
	y < 1 ? Math.round(y * 12) / 12 : Math.round(y);
const formatExp = (years: number): string =>
	years < 1
		? `${Math.max(1, Math.round(years * 12))}m`
		: `${Math.round(years)}y`;

const link = (text: string, href: string, italics = false) => ({
	text,
	link: href,
	color: LINK_COLOR,
	decoration: "underline" as const,
	italics,
});

// Body paragraph wrappers — every content node passes through one of these so it
// inherits the docx-equivalent `spacing.after: 6pt`.
const para = (
	text: ContentText["text"],
	extra: Partial<ContentText> = {},
): ContentText => ({ text, margin: BODY_MARGIN, ...extra });
const paraCols = (
	columns: ContentColumns["columns"],
	extra: Partial<ContentColumns> = {},
): ContentColumns => ({ columns, margin: BODY_MARGIN, ...extra });

// PDF equivalent of docx's `keepNext: true` — wrap [heading, ...glued content]
// in an unbreakable stack so the heading never orphans at the bottom of a page.
const keepTogether = (items: Content[]): ContentStack => ({
	stack: items,
	unbreakable: true,
});

export function buildResumePdf(cv: CV = defaultCv): Promise<Blob> {
	const docDefinition: TDocumentDefinitions = {
		info: {
			title: `${cv.fullName} — ${cv.position}`,
			author: cv.fullName,
			subject: "Curriculum Vitae",
		},
		pageSize: "LETTER",
		pageMargins: PAGE_MARGINS,
		defaultStyle: { fontSize: 10, lineHeight: 1.0, alignment: "justify" },
		styles: {
			// pdfmake stacks margins (Word collapses), so we subtract the body-after
			// (6pt) from each heading's `before` to land on the docx visual:
			// h1 = 18+6 ≈ docx 24, h2 = 12+6 ≈ docx 18, h3 = 6+6 ≈ docx 12.
			h1: { fontSize: 16, bold: true, margin: [0, 14, 0, 6] },
			h2: { fontSize: 12, bold: true, margin: [0, 12, 0, 6] },
			h3: { fontSize: 10, bold: true, margin: [0, 6, 0, 6] },
		},
		footer: (currentPage) => ({
			columns: [
				{
					text: [
						{ text: "Online version at ", italics: true },
						link(cv.portfolio, formatUrl(cv.portfolio), true),
						{ text: ".", italics: true },
					],
				},
				{ text: String(currentPage), alignment: "right" },
			],
			margin: [PAGE_MARGINS[0], 0, PAGE_MARGINS[2], 0],
			fontSize: 9,
		}),
		content: [
			buildHeader(cv),
			buildContactInfo(cv),
			...buildSummary(cv),
			...buildTechnologies(cv),
			...buildExperience(cv),
			...buildLanguages(cv),
			...buildCertifications(cv),
			...buildEducation(cv),
			...buildStrengths(cv),
		],
	};
	return pdfMake.createPdf(docDefinition).getBlob();
}

export async function downloadResumePdf(cv: CV = defaultCv): Promise<void> {
	const blob = await buildResumePdf(cv);
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${cv.fullName} - ${cv.position}.pdf`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 0);
}

function heading1(text: string): Content {
	return { text: text.toUpperCase(), style: "h1" };
}

function buildHeader(cv: CV): ContentColumns {
	return paraCols([
		{
			text: cv.fullName.toUpperCase(),
			bold: true,
			characterSpacing: 1,
			fontSize: 14,
		},
		{ text: cv.position, fontSize: 14, alignment: "right" },
	]);
}

function buildContactInfo(cv: CV): ContentText {
	return para(
		[
			`${cv.location.city}, ${cv.location.country}  |  `,
			link(cv.email, `mailto:${cv.email}`),
			"  |  ",
			link(cv.linkedIn, formatUrl(cv.linkedIn)),
		],
		{ alignment: "center" },
	);
}

function buildSummary(cv: CV): Content[] {
	const tagline = cv.tagline.replace("{years}", String(yearsOfExperience()));
	return [
		keepTogether([heading1("Summary"), para(tagline)]),
		...cv.summary.map((t) => para(t)),
	];
}

function buildTechnologies(cv: CV): Content[] {
	const cutoff = new Date().getFullYear() - RECENT_YEARS;
	const recent = cv.allSkills.filter(
		(t) => t.years > 0 && t.lastUsed >= cutoff,
	);
	const groups: ContentText[] = [];
	for (const [group, label] of Object.entries(cv.techGroups)) {
		const techs = recent
			.filter((t) => t.group === group)
			.sort(
				(a, b) =>
					displayedYears(b.years) - displayedYears(a.years) ||
					b.lastUsed - a.lastUsed ||
					srcRank(a.source) - srcRank(b.source) ||
					a.order - b.order,
			);
		if (!techs.length) continue;
		const inlines: ContentText["text"] = [{ text: `${label}: `, bold: true }];
		techs.forEach((t, i) => {
			inlines.push(`${t.name} · `);
			inlines.push({ text: formatExp(t.years), italics: true });
			inlines.push(i < techs.length - 1 ? ", " : ".");
		});
		groups.push(para(inlines));
	}
	if (!groups.length) return [heading1("Technologies")];
	return [keepTogether([heading1("Technologies"), groups[0]]), ...groups.slice(1)];
}

function projectTechs(cv: CV, p: Project): string[] {
	const groupOrder = Object.keys(cv.techGroups);
	return groupOrder.flatMap((group) =>
		p.skills.filter((s) => s.group === group).map((s) => s.name),
	);
}

// Mirror docx's numbered list: '–' hangs at 18pt, content at 36pt, 6pt gap per item.
function dashList(items: string[]): ContentStack {
	return {
		stack: items.map((text) => ({
			columns: [
				{ text: "–", width: 12 },
				{ text, width: "*" },
			],
			columnGap: 6,
			margin: [BULLET_INDENT, 0, 0, 6] as Margins,
		})),
	};
}

function buildExperience(cv: CV): Content[] {
	const out: Content[] = [];
	const recentIdx = new Set(
		cv.projects
			.map((_, i) => i)
			.sort(
				(a, b) =>
					cv.projects[b].start.getTime() - cv.projects[a].start.getTime(),
			)
			.slice(0, 3),
	);
	cv.projects.forEach((p, idx) => {
		const role = [p.seniority, p.position].filter(Boolean).join(" ");
		const header: Content[] = [
			{ text: `${p.company.name} | ${p.name}`, style: "h2" },
			{
				columns: [
					{ text: role, width: "*" },
					{
						text: formatPeriod(p.start, p.end),
						width: "auto",
						alignment: "right",
					},
				],
				style: "h3",
			},
		];
		if (p.areas?.length) {
			header.push(para(p.areas.join(", "), { italics: true, color: MUTED }));
		}
		out.push(
			keepTogether(idx === 0 ? [heading1("Experience"), ...header] : header),
		);
		if (recentIdx.has(idx)) out.push(dashList(p.contributions));
		const techs = projectTechs(cv, p);
		if (techs.length) {
			out.push(
				para([{ text: "Technologies: ", bold: true }, `${techs.join(", ")}.`]),
			);
		}
	});
	return out;
}

function buildLanguages(cv: CV): Content[] {
	if (!cv.languages.length) return [];
	return [
		keepTogether([
			heading1("Languages"),
			para(cv.languages.map((l) => `${l.name}: ${l.level}`).join("  |  ")),
		]),
	];
}

function buildCertifications(cv: CV): Content[] {
	if (!cv.certifications.length) return [];
	const out: Content[] = [];
	cv.certifications.forEach((c, idx) => {
		const code = c.code ? ` (${c.code})` : "";
		const period = c.expires
			? formatPeriod(c.issued, c.expires)
			: formatYM(c.issued);
		const head: Content = {
			columns: [
				{ text: `${c.name}${code}`, width: "*" },
				{ text: period, width: "auto", alignment: "right" },
			],
			style: "h3",
		};
		const issuer: ContentText["text"] = [c.issuer.name];
		if (c.credentialId) issuer.push(` | Credential ID: ${c.credentialId}`);
		if (c.credentialUrl) {
			issuer.push(" | ");
			issuer.push(link("Verify", c.credentialUrl));
		}
		const block: Content[] = [head, para(issuer)];
		out.push(
			keepTogether(
				idx === 0
					? [heading1("Licenses & certifications"), ...block]
					: block,
			),
		);
	});
	return out;
}

function buildEducation(cv: CV): Content[] {
	if (!cv.education.length) return [];
	const out: Content[] = [];
	cv.education.forEach((e, idx) => {
		const block: Content[] = [
			{
				columns: [
					{ text: e.school.name, width: "*" },
					{
						text: formatPeriod(e.start, e.end),
						width: "auto",
						alignment: "right",
					},
				],
				style: "h3",
			},
			para(`${e.degree} | ${e.field}`),
		];
		out.push(
			keepTogether(idx === 0 ? [heading1("Education"), ...block] : block),
		);
	});
	return out;
}

function buildStrengths(cv: CV): Content[] {
	if (!cv.strengths.length) return [];
	const out: Content[] = [];
	cv.strengths.forEach((s, idx) => {
		const block: Content[] = [
			{ text: s.name, style: "h2" },
			para(s.description.trim().replace(/\s+/g, " ")),
		];
		out.push(
			keepTogether(idx === 0 ? [heading1("Strengths"), ...block] : block),
		);
	});
	return out;
}
