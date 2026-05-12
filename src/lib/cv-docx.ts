import {
	AlignmentType,
	Document,
	ExternalHyperlink,
	Footer,
	HeadingLevel,
	LevelFormat,
	Packer,
	PageNumber,
	Paragraph,
	type ParagraphChild,
	TabStopType,
	TextRun,
} from "docx";
import {
	type CV,
	cv as defaultCv,
	type Project,
	yearsOfExperience,
} from "@/data/cv";

const FONT = "Roboto";
const SEMIBOLD = "Roboto Medium";
const BULLET = "–";
const RECENT_YEARS = 3;
const PAGE_MARGIN = { top: 720, right: 900, bottom: 720, left: 900 };
// US Letter (12240 twips wide) minus left + right margins.
const RIGHT_TAB = 12240 - PAGE_MARGIN.left - PAGE_MARGIN.right;

const SPACING = {
	HALF: 6 * 20,
	SINGLE: 12 * 20,
	ONE_AND_HALF: 18 * 20,
	DOUBLE: 24 * 20,
};

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

export function buildResumeBlob(cv: CV = defaultCv): Promise<Blob> {
	const doc = new Document({
		creator: cv.fullName,
		title: `${cv.fullName} — ${cv.position}`,
		subject: "Curriculum Vitae",
		styles: {
			default: {
				document: {
					run: { font: FONT },
					paragraph: {
						spacing: { after: SPACING.HALF },
						alignment: AlignmentType.JUSTIFIED,
					},
				},
				heading1: {
					run: { bold: true, allCaps: true, size: 16 * 2 },
					paragraph: {
						spacing: { before: SPACING.DOUBLE },
						keepNext: true,
						alignment: AlignmentType.LEFT,
					},
				},
				heading2: {
					run: { bold: true, size: 12 * 2 },
					paragraph: {
						spacing: { before: SPACING.ONE_AND_HALF },
						alignment: AlignmentType.LEFT,
						keepNext: true,
					},
				},
				heading3: {
					run: { font: SEMIBOLD, size: 10 * 2 },
					paragraph: {
						spacing: { before: SPACING.SINGLE },
						alignment: AlignmentType.LEFT,
						keepNext: true,
					},
				},
			},
		},
		numbering: {
			config: [
				{
					reference: "dashed-numbering",
					levels: [
						{
							level: 0,
							format: LevelFormat.BULLET,
							text: BULLET,
							alignment: AlignmentType.LEFT,
							style: { paragraph: { indent: { left: 720, hanging: 360 } } },
						},
					],
				},
			],
		},
		sections: [
			{
				properties: { page: { margin: PAGE_MARGIN } },
				children: [
					new Paragraph({
						tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
						children: [
							new TextRun({
								text: cv.fullName,
								bold: true,
								allCaps: true,
								size: 14 * 2,
							}),
							new TextRun({ text: `\t${cv.position}`, size: 14 * 2 }),
						],
					}),
					buildContactInfo(cv),
					...buildSummary(cv),
					...buildTechnologies(cv),
					...buildExperience(cv),
					...buildLanguages(cv),
					...buildCertifications(cv),
					...buildEducation(cv),
					...buildStrengths(cv),
				],
				footers: {
					default: new Footer({
						children: [
							new Paragraph({
								tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
								children: [
									new TextRun({ text: "Online version at ", italics: true }),
									hyperlink(formatUrl(cv.portfolio), cv.portfolio, true),
									new TextRun({ italics: true, text: ".\t" }),
									new TextRun({ children: [PageNumber.CURRENT] }),
								],
							}),
						],
					}),
				},
			},
		],
	});

	return Packer.toBlob(doc);
}

export async function downloadResume(cv: CV = defaultCv): Promise<void> {
	const blob = await buildResumeBlob(cv);
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${cv.fullName} - ${cv.position}.docx`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	// Revoke after a tick so the browser has time to start the download.
	setTimeout(() => URL.revokeObjectURL(url), 0);
}

function buildContactInfo(cv: CV): Paragraph {
	const items: ParagraphChild[][] = [
		[new TextRun({ text: `${cv.location.city}, ${cv.location.country}` })],
		[hyperlink(`mailto:${cv.email}`, cv.email)],
		[hyperlink(formatUrl(cv.linkedIn), cv.linkedIn)],
	];
	const children: ParagraphChild[] = [];
	items.forEach((run, i) => {
		children.push(...run);
		if (i < items.length - 1) children.push(new TextRun({ text: " | " }));
	});
	return new Paragraph({ alignment: AlignmentType.CENTER, children });
}

function buildSummary(cv: CV): Paragraph[] {
	const tagline = cv.tagline.replace("{years}", String(yearsOfExperience()));
	return [
		heading1("Summary"),
		new Paragraph({ text: tagline }),
		...cv.summary.map((t) => new Paragraph({ text: t })),
	];
}

function buildTechnologies(cv: CV): Paragraph[] {
	const cutoff = new Date().getFullYear() - RECENT_YEARS;
	const recent = cv.allSkills.filter(
		(t) => t.years > 0 && t.lastUsed >= cutoff,
	);
	const out: Paragraph[] = [heading1("Technologies")];
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
		const children: ParagraphChild[] = [
			new TextRun({ font: SEMIBOLD, text: `${label}: ` }),
		];
		techs.forEach((t, i) => {
			children.push(new TextRun({ text: `${t.name} · ` }));
			children.push(
				new TextRun({ text: formatExp(t.years), italics: true }),
			);
			if (i < techs.length - 1) children.push(new TextRun({ text: ", " }));
		});
		children.push(new TextRun({ text: "." }));
		out.push(new Paragraph({ children }));
	}
	return out;
}

function projectTechs(cv: CV, p: Project): string[] {
	const groupOrder = Object.keys(cv.techGroups);
	return groupOrder.flatMap((group) =>
		p.skills.filter((s) => s.group === group).map((s) => s.name),
	);
}

function buildExperience(cv: CV): Paragraph[] {
	const out: Paragraph[] = [heading1("Experience")];
	const recentIdx = new Set(
		cv.projects
			.map((_, i) => i)
			.sort(
				(a, b) =>
					cv.projects[b].start.getTime() - cv.projects[a].start.getTime(),
			)
			.slice(0, 3),
	);
	for (const [idx, p] of cv.projects.entries()) {
		const role = [p.seniority, p.position].filter(Boolean).join(" ");
		out.push(heading2(`${p.company.name} | ${p.name}`));
		out.push(heading3WithRightText(role, formatPeriod(p.start, p.end)));
		if (p.areas?.length) {
			out.push(
				new Paragraph({
					children: [new TextRun({ text: p.areas.join(", "), italics: true })],
				}),
			);
		}
		if (recentIdx.has(idx)) {
			for (const c of p.contributions) {
				out.push(
					new Paragraph({
						text: c,
						numbering: { reference: "dashed-numbering", level: 0 },
					}),
				);
			}
		}
		const techs = projectTechs(cv, p);
		if (techs.length) {
			out.push(
				new Paragraph({
					children: [
						new TextRun({ font: SEMIBOLD, text: "Technologies: " }),
						new TextRun({ text: techs.join(", ") }),
						new TextRun({ text: "." }),
					],
				}),
			);
		}
	}
	return out;
}

function buildLanguages(cv: CV): Paragraph[] {
	if (!cv.languages.length) return [];
	return [
		heading1("Languages"),
		new Paragraph({
			text: cv.languages.map((l) => `${l.name}: ${l.level}`).join(" | "),
		}),
	];
}

function buildCertifications(cv: CV): Paragraph[] {
	if (!cv.certifications.length) return [];
	const out: Paragraph[] = [heading1("Licenses & certifications")];
	for (const c of cv.certifications) {
		const code = c.code ? ` (${c.code})` : "";
		const period = c.expires
			? formatPeriod(c.issued, c.expires)
			: formatYM(c.issued);
		out.push(heading3WithRightText(`${c.name}${code}`, period));
		const issuerLine: ParagraphChild[] = [new TextRun({ text: c.issuer.name })];
		if (c.credentialId) {
			issuerLine.push(
				new TextRun({ text: ` | Credential ID: ${c.credentialId}` }),
			);
		}
		if (c.credentialUrl) {
			issuerLine.push(new TextRun({ text: " | " }));
			issuerLine.push(hyperlink(c.credentialUrl, "Verify"));
		}
		out.push(new Paragraph({ children: issuerLine }));
	}
	return out;
}

function buildEducation(cv: CV): Paragraph[] {
	if (!cv.education.length) return [];
	const out: Paragraph[] = [heading1("Education")];
	for (const e of cv.education) {
		out.push(
			heading3WithRightText(e.school.name, formatPeriod(e.start, e.end)),
		);
		out.push(new Paragraph({ text: `${e.degree} | ${e.field}` }));
	}
	return out;
}

function buildStrengths(cv: CV): Paragraph[] {
	if (!cv.strengths.length) return [];
	const out: Paragraph[] = [heading1("Strengths")];
	for (const s of cv.strengths) {
		out.push(heading2(s.name));
		out.push(
			new Paragraph({ text: s.description.trim().replace(/\s+/g, " ") }),
		);
	}
	return out;
}

const heading1 = (text: string) =>
	new Paragraph({ text, heading: HeadingLevel.HEADING_1 });

const heading2 = (text: string) =>
	new Paragraph({ text, heading: HeadingLevel.HEADING_2 });

const heading3WithRightText = (text: string, rightText: string) =>
	new Paragraph({
		heading: HeadingLevel.HEADING_3,
		tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
		children: [new TextRun({ text }), new TextRun({ text: `\t${rightText}` })],
	});

function hyperlink(
	url: string,
	text: string,
	italics = false,
): ExternalHyperlink {
	return new ExternalHyperlink({
		link: url,
		children: [new TextRun({ text, style: "Hyperlink", italics })],
	});
}
