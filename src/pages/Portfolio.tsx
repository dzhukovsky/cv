import {
	ArrowRight,
	ArrowUpRight,
	Award,
	Briefcase,
	ChevronDown,
	Clock,
	Cloud,
	Code2,
	Cpu,
	Database,
	Download,
	Globe,
	GraduationCap,
	HeartHandshake,
	Info,
	Languages as LanguagesIcon,
	Layers,
	Mail,
	MapPin,
	Radar,
	Sparkles,
	Workflow,
	Wrench,
	Zap,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Github, Linkedin } from "@/components/brand-icons";
import { SiteHeader } from "@/components/site-header";
import {
	Card,
	Persona,
	Pill,
	PrimaryButton,
	ProgressBar,
	Section,
	SectionHeader,
	Stat,
	SubtleButton,
	Tag,
} from "@/components/ui/fluent";
import {
	cv,
	formatDuration,
	formatMonths,
	formatPeriod,
	formatYearMonth,
	formatYears,
	pickLogo,
	yearsOfExperience,
} from "@/data/cv";
import {
	applyTemplate,
	type ExpertiseIcon,
	sections,
} from "@/data/sections";
import { useNow, useScrollSpy, useThemeMode } from "@/lib/hooks";

const ABOUT_EXPERTISE_ICONS: Record<ExpertiseIcon, typeof Cpu> = {
	cpu: Cpu,
	cloud: Cloud,
	database: Database,
	workflow: Workflow,
};

const ALL_TECHNOLOGIES = cv.allSkills;
const MAX_PRODUCTION_YEARS = Math.floor(
	Math.max(
		...ALL_TECHNOLOGIES.filter((t) => t.source === "production").map(
			(t) => t.years,
		),
	),
);

const SECTIONS = [
	{ id: "top", label: "Overview", icon: Sparkles },
	{ id: "about", label: "About", icon: Info },
	{ id: "experience", label: "Experience", icon: Briefcase },
	{ id: "skills", label: "Technologies", icon: Layers },
	{ id: "certifications", label: "Certifications", icon: Award },
	{ id: "education", label: "Education", icon: GraduationCap },
	{ id: "soft", label: "Strengths", icon: HeartHandshake },
] as const;

export default function Portfolio() {
	return (
		<div className="min-h-svh">
			<SiteHeader />
			<Hero />
			<main className="mx-auto max-w-[1180px] px-5 md:px-8">
				<SideRail />
				<About />
				<Experience />
				<Skills />
				<Certifications />
				<EducationLanguages />
				<SoftSkills />
				<CTA />
			</main>
			<Footer />
		</div>
	);
}

function Hero() {
	const now = useNow(60_000);
	const warsawTime = useMemo(
		() =>
			new Intl.DateTimeFormat("en-GB", {
				timeZone: "Europe/Warsaw",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			}).format(now),
		[now],
	);

	const yearsTotal = yearsOfExperience();
	const tagline = applyTemplate(cv.tagline);
	const certCodes = cv.certifications.map((c) => c.code).join(" · ");

	return (
		<section id="top" className="fl-mica relative no-print -mt-14 pt-14">
			<div className="absolute inset-0 fl-grid-bg pointer-events-none" />
			<div className="relative mx-auto max-w-[1180px] px-5 md:px-8 pt-10 pb-14 md:pt-16 md:pb-20">
				<div className="grid grid-cols-12 gap-8 items-end">
					<div className="col-span-12 md:col-span-7">
						<Pill icon={Sparkles} variant="brand" className="mb-5">
							<span
								className="h-1.5 w-1.5 rounded-full fl-pulse-dot"
								style={{ background: "var(--fl-success)" }}
							/>
							{cv.availability} · {cv.contractType}
						</Pill>
						<h1
							className="text-[44px] md:text-[68px] font-semibold tracking-tight leading-[1.02]"
							style={{ letterSpacing: "-0.025em" }}
						>
							{cv.fullName}
						</h1>
						<div
							className="mt-2 flex items-center flex-wrap gap-x-3 gap-y-1.5 text-[15px] md:text-[17px]"
							style={{ color: "var(--fl-fg-muted)" }}
						>
							<span className="font-medium" style={{ color: "var(--fl-fg)" }}>
								{cv.position}
							</span>
							<span style={{ color: "var(--fl-stroke)" }}>·</span>
							<span className="inline-flex items-center gap-1">
								<MapPin size={14} /> {cv.location.city}, {cv.location.country}
							</span>
							<span style={{ color: "var(--fl-stroke)" }}>·</span>
							<span className="inline-flex items-center gap-1 tabular-nums">
								<Clock size={14} /> {warsawTime} CET
							</span>
						</div>

						<p
							className="mt-5 max-w-[640px] text-[15px] leading-[1.7]"
							style={{ color: "var(--fl-fg-muted)" }}
						>
							{tagline}
						</p>

						<div className="mt-6 flex flex-wrap items-center gap-2">
							<PrimaryButton icon={Mail} size="lg" href={`mailto:${cv.email}`}>
								{cv.email}
							</PrimaryButton>
							<SubtleButton
								icon={Linkedin}
								size="lg"
								href={`https://${cv.linkedIn}`}
								target="_blank"
								rel="noreferrer"
							>
								LinkedIn
							</SubtleButton>
							<SubtleButton
								icon={Github}
								size="lg"
								href={`https://${cv.github}`}
								target="_blank"
								rel="noreferrer"
							>
								GitHub
							</SubtleButton>
							<SubtleButton
								icon={Download}
								size="lg"
								href={cv.resumePdf}
								target="_blank"
								rel="noreferrer"
							>
								Resume
							</SubtleButton>
						</div>
					</div>

					<div className="col-span-12 md:col-span-5 flex md:justify-end">
						<div className="relative">
							<div
								aria-hidden
								className="absolute -inset-6 rounded-full blur-3xl opacity-30"
								style={{
									background:
										"radial-gradient(closest-side, var(--fl-brand) 0%, transparent 70%)",
								}}
							/>
							<div className="relative fl-photo-frame">
								<img
									src={cv.photo}
									alt={cv.fullName}
									className="block h-44 w-44 md:h-64 md:w-64 rounded-full object-cover"
									style={{ background: "var(--fl-card)" }}
								/>
							</div>
							<div
								className="absolute bottom-1 right-1 grid place-items-center h-10 w-10 rounded-full"
								style={{
									background: "var(--fl-card)",
									boxShadow: "var(--fl-elev-4)",
								}}
								title={sections.hero.availableTooltip}
							>
								<span
									className="h-3 w-3 rounded-full fl-pulse-dot"
									style={{ background: "var(--fl-success)" }}
								/>
							</div>
						</div>
					</div>
				</div>

				<Card
					className="mt-10 md:mt-14 px-5 md:px-7 py-5 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5"
					elevation={4}
				>
					<Stat
						icon={Briefcase}
						label={sections.hero.stats.experience.label}
						value={String(yearsTotal)}
						suffix={sections.hero.stats.experience.suffix}
						caption={`${MAX_PRODUCTION_YEARS}+ yrs in production`}
					/>
					<Stat
						icon={Zap}
						label={sections.hero.stats.platforms.label}
						value={String(cv.projects.length)}
						caption={`${cv.projects.filter((p) => !p.end).length} active`}
					/>
					<Stat
						icon={Layers}
						label={sections.hero.stats.technologies.label}
						value={String(ALL_TECHNOLOGIES.length)}
						caption={`${ALL_TECHNOLOGIES.filter((t) => t.source === "production").length} in production`}
					/>
					<Stat
						icon={Award}
						label={sections.hero.stats.certifications.label}
						value={String(cv.certifications.length)}
						caption={certCodes}
					/>
				</Card>
			</div>
		</section>
	);
}

function SideRail() {
	const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
	const active = useScrollSpy(ids);
	return (
		<nav
			aria-label="Sections"
			className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-1 fl-acrylic rounded-xl p-1.5 no-print"
			style={{
				border: "1px solid var(--fl-stroke)",
				boxShadow: "var(--fl-elev-4)",
			}}
		>
			{SECTIONS.map((s) => {
				const Icon = s.icon;
				const isActive = active === s.id;
				return (
					<a
						key={s.id}
						href={`#${s.id}`}
						className="group relative flex items-center"
					>
						<div
							className="grid place-items-center h-9 w-9 rounded-lg transition-colors"
							style={{
								background: isActive ? "var(--fl-brand-subtle)" : "transparent",
								color: isActive
									? "var(--fl-brand-hover)"
									: "var(--fl-fg-muted)",
							}}
							onMouseEnter={(e) => {
								if (isActive) return;
								e.currentTarget.style.background = "var(--fl-stroke-subtle)";
							}}
							onMouseLeave={(e) => {
								if (isActive) return;
								e.currentTarget.style.background = "transparent";
							}}
						>
							<Icon size={15} />
						</div>
						<span
							className="absolute left-12 px-2.5 py-1 rounded-md whitespace-nowrap text-[12px] font-medium opacity-0 -translate-x-1 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all"
							style={{
								background: "var(--fl-card)",
								color: "var(--fl-fg)",
								border: "1px solid var(--fl-stroke)",
								boxShadow: "var(--fl-elev-4)",
							}}
						>
							{s.label}
						</span>
					</a>
				);
			})}
		</nav>
	);
}

function About() {
	return (
		<Section id="about">
			<SectionHeader
				eyebrow="01 — About"
				title={sections.about.title}
				description={sections.about.description}
			/>

			<div className="grid grid-cols-12 gap-3">
				<Card className="col-span-12 md:col-span-5 p-6 md:p-7" elevation={2}>
					<div className="flex items-center gap-3 mb-3">
						<Persona
							name={cv.fullName}
							src={cv.photo}
							size={44}
							presence="available"
						/>
						<div>
							<div className="text-[13px] font-semibold">{cv.fullName}</div>
							<div
								className="text-[11.5px]"
								style={{ color: "var(--fl-fg-muted)" }}
							>
								{cv.position}
							</div>
						</div>
					</div>
					<div
						className="text-[14px] leading-[1.7] space-y-3"
						style={{ color: "var(--fl-fg)" }}
					>
						{cv.summary.map((p) => (
							<p key={p}>{p}</p>
						))}
					</div>
					<div
						className="mt-5 pt-4 border-t flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]"
						style={{
							borderColor: "var(--fl-stroke-subtle)",
							color: "var(--fl-fg-muted)",
						}}
					>
						<span className="inline-flex items-center gap-1.5">
							<MapPin size={13} /> {cv.location.city}
						</span>
						<span className="inline-flex items-center gap-1.5">
							<Globe size={13} /> {cv.contractType}
						</span>
						<a
							href={`mailto:${cv.email}`}
							className="inline-flex items-center gap-1.5 hover:text-foreground"
						>
							<Mail size={13} /> Email
						</a>
					</div>
				</Card>

				<div className="col-span-12 md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
					{sections.about.expertise.map((s) => {
						const Icon = ABOUT_EXPERTISE_ICONS[s.icon];
						return (
							<Card key={s.title} className="p-5" hoverable reveal>
								<Icon
									size={22}
									className="mb-3"
									style={{ color: "var(--fl-brand)" }}
								/>
								<h3 className="text-[14px] font-semibold tracking-tight">
									{s.title}
								</h3>
								<div
									className="mt-1.5 text-[12.5px] leading-relaxed"
									style={{ color: "var(--fl-fg-muted)" }}
								>
									{s.description}
								</div>
							</Card>
						);
					})}
				</div>
			</div>
		</Section>
	);
}

function Experience() {
	return (
		<Section id="experience">
			<SectionHeader
				eyebrow="02 — Experience"
				title={sections.experience.title}
				description={applyTemplate(sections.experience.description)}
			/>

			<div className="relative">
				<div
					aria-hidden
					className="absolute left-[15px] md:left-[19px] top-[30px] md:top-[34px] bottom-2 w-px"
					style={{
						background:
							"linear-gradient(to bottom, var(--fl-stroke) 0%, var(--fl-stroke) 70%, transparent 100%)",
					}}
				/>
				<div className="space-y-3">
					{cv.projects.map((p, i) => (
						<ExperienceRow
							key={`${p.company.name}-${p.start}-${p.name}`}
							p={p}
							index={i}
						/>
					))}
				</div>
			</div>
		</Section>
	);
}

function ExperienceRow({
	p,
	index,
}: {
	p: (typeof cv.projects)[number];
	index: number;
}) {
	const [open, setOpen] = useState(index === 0);
	const theme = useThemeMode();
	const isCurrent = !p.end;

	return (
		<div className="relative pl-9 md:pl-11">
			<div className="absolute left-0 top-[15px] grid place-items-center h-[30px] w-[30px] md:h-[38px] md:w-[38px]">
				<span
					className="rounded-full"
					style={{
						width: isCurrent ? 10 : 6,
						height: isCurrent ? 10 : 6,
						background: isCurrent ? "var(--fl-brand)" : "var(--fl-fg-disabled)",
						boxShadow: isCurrent
							? "0 0 0 4px var(--fl-brand-subtle)"
							: undefined,
					}}
				/>
			</div>

			<Card hoverable reveal className="overflow-hidden">
				<button
					type="button"
					onClick={() => setOpen((v) => !v)}
					className="w-full text-left px-5 md:px-6 py-4 md:py-5 flex items-center gap-4 cursor-pointer"
				>
					<img
						src={pickLogo(p.company.logo, theme)}
						alt={p.company.name}
						className="h-10 w-10 md:h-11 md:w-11 rounded-md object-cover"
					/>
					<div className="flex-1 min-w-0 flex flex-col">
						<div className="flex items-baseline flex-wrap gap-x-2 gap-y-1.5">
							<a
								href={p.company.url}
								target="_blank"
								rel="noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="text-[13px] font-semibold hover:underline"
							>
								{p.company.name}
							</a>
							<span
								className="text-[12.5px]"
								style={{ color: "var(--fl-fg-muted)" }}
							>
								·
							</span>
							<span
								className="text-[12.5px]"
								style={{ color: "var(--fl-fg-muted)" }}
							>
								{p.position}
							</span>
							<Tag variant="brand">{p.seniority}</Tag>
							{isCurrent && <Tag variant="success">Current</Tag>}
							{p.areas.map((a) => (
								<Tag key={a} variant="outline">
									{a}
								</Tag>
							))}
						</div>
						<h3 className="mt-1.5 text-[16.5px] md:text-[18px] font-semibold tracking-tight leading-snug">
							{p.name}
						</h3>
						<div
							className="mt-1 flex items-center flex-wrap gap-x-3 gap-y-1 text-[12px] tabular-nums"
							style={{ color: "var(--fl-fg-muted)" }}
						>
							<span className="inline-flex items-center gap-1">
								<Clock size={12} /> {formatPeriod(p.start, p.end)}
							</span>
							<span style={{ color: "var(--fl-fg-muted)" }}>·</span>
							<span>{formatDuration(p.start, p.end)}</span>
						</div>
					</div>
					<ChevronDown
						size={18}
						className="transition-transform shrink-0"
						style={{
							color: "var(--fl-fg-muted)",
							transform: open ? "rotate(180deg)" : "rotate(0)",
						}}
					/>
				</button>

				{open && (
					<div
						className="px-5 md:px-6 pb-5 md:pb-6 pt-1 border-t"
						style={{ borderColor: "var(--fl-stroke-subtle)" }}
					>
						<p
							className="mt-4 text-[13.5px] leading-[1.7]"
							style={{ color: "var(--fl-fg)" }}
						>
							{p.description}
						</p>

						<div
							className="mt-5 text-[10.5px] uppercase tracking-[0.16em] font-semibold"
							style={{ color: "var(--fl-brand-hover)" }}
						>
							Key contributions
						</div>
						<ul className="mt-2.5 space-y-2">
							{p.contributions.map((c) => (
								<li
									key={c}
									className="grid grid-cols-[18px_1fr] gap-2.5 text-[13px] leading-[1.65]"
								>
									<span
										className="mt-[7px] h-[6px] w-[6px] rounded-full"
										style={{ background: "var(--fl-brand)" }}
									/>
									<span style={{ color: "var(--fl-fg)" }}>{c}</span>
								</li>
							))}
						</ul>

						<div
							className="mt-5 text-[10.5px] uppercase tracking-[0.16em] font-semibold"
							style={{ color: "var(--fl-brand-hover)" }}
						>
							Stack ({p.skills.length})
						</div>
						<div className="mt-2.5 flex flex-wrap gap-1.5">
							{p.skills.map((s) => (
								<Tag key={s.name} variant="outline">
									{s.name}
								</Tag>
							))}
						</div>

						<a
							href={p.company.url}
							target="_blank"
							rel="noreferrer"
							className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-medium hover:underline"
							style={{ color: "var(--fl-brand-hover)" }}
						>
							Visit {p.company.name}
							<ArrowUpRight size={13} />
						</a>
					</div>
				)}
			</Card>
		</div>
	);
}

const groupMeta: Record<string, { icon: typeof Cpu }> = {
	backend: { icon: Cpu },
	frontend: { icon: Code2 },
	data: { icon: Database },
	cloud: { icon: Cloud },
	devops: { icon: Wrench },
};

function Skills() {
	const densities = useMemo(
		() => computeCategoryDensity().sort((a, b) => b.totalYears - a.totalYears),
		[],
	);
	const maxYears = useMemo(
		() => Math.max(...densities.map((c) => c.totalYears)),
		[densities],
	);

	return (
		<Section id="skills">
			<SectionHeader
				eyebrow="03 — Technologies"
				title={sections.technologies.title}
				description={sections.technologies.description}
			/>

			<div className="grid grid-cols-12 gap-3">
				<Card className="col-span-12 lg:col-span-7 p-5 md:p-6" elevation={2}>
					<div className="flex items-baseline justify-between mb-5">
						<h3 className="text-[14px] font-semibold tracking-tight inline-flex items-center gap-2">
							<Layers size={15} style={{ color: "var(--fl-brand)" }} />
							Toolkit density
						</h3>
						<span
							className="text-[10.5px]"
							style={{
								color: "var(--fl-fg-subtle)",
								fontFamily: "var(--font-mono)",
							}}
						>
							years × breadth
						</span>
					</div>
					<div className="space-y-5">
						{densities.map((cat) => (
							<CategoryRow key={cat.name} cat={cat} max={maxYears} />
						))}
					</div>
				</Card>

				<Card className="col-span-12 lg:col-span-5 p-5 md:p-6" elevation={2}>
					<div className="flex items-baseline justify-between mb-3">
						<h3 className="text-[14px] font-semibold tracking-tight inline-flex items-center gap-2">
							<Radar size={15} style={{ color: "var(--fl-brand)" }} />
							Profile balance
						</h3>
						<span
							className="text-[10.5px]"
							style={{
								color: "var(--fl-fg-subtle)",
								fontFamily: "var(--font-mono)",
							}}
						>
							years × recency
						</span>
					</div>
					<TechRadar />
				</Card>

				<PreferredStack />
			</div>
		</Section>
	);
}

function PreferredStack() {
	return (
		<Card className="col-span-12 p-5 md:p-6 mt-1" elevation={2}>
			<div className="mb-4">
				<h3 className="text-[14px] font-semibold tracking-tight inline-flex items-center gap-2">
					<Sparkles size={15} style={{ color: "var(--fl-brand)" }} />
					{sections.technologies.preferred.title}
				</h3>
				<p
					className="mt-1 text-[12.5px] leading-relaxed"
					style={{ color: "var(--fl-fg-muted)" }}
				>
					{sections.technologies.preferred.description}
				</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5">
				{Object.entries(cv.preferredStack).map(([group, items]) => {
					const Icon = groupMeta[group]?.icon ?? Cpu;
					return (
						<div key={group}>
							<div
								className="flex items-center gap-2 mb-2 pb-1.5 border-b"
								style={{ borderColor: "var(--fl-stroke-subtle)" }}
							>
								<Icon size={13} style={{ color: "var(--fl-fg-muted)" }} />
								<h4 className="text-[12px] font-semibold tracking-tight">
									{cv.techGroups[group] ?? group}
								</h4>
							</div>
							<div className="flex flex-wrap gap-1.5">
								{items.map((it) => (
									<Tag key={it} variant="brand">
										{it}
									</Tag>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</Card>
	);
}

const CATEGORY_COLORS: Record<string, string> = {
	backend: "#0F6CBD",
	data: "#059669",
	cloud: "#9333EA",
	devops: "#EA580C",
	frontend: "#0891B2",
};

type CategoryDensity = {
	name: string;
	color: string;
	techs: {
		name: string;
		years: number;
		source: "production" | "self-taught";
	}[];
	totalYears: number;
	count: number;
};

// Density and radar are filter-then-score: only techs touched within the last
// RECENT_YEARS years count. The two charts then split angles: bars sum
// lifetime years (breadth × depth of the toolkit), the radar weights by
// recency (years / (gap + 1)) to show current focus. Same source data, two
// different lenses — that's why both are kept.
const RECENT_YEARS = 3;

// Shared shaping for the toolkit bars and the radar polygon: compress with the
// caller's curve, normalize against the strongest sample, floor so weak vectors
// stay visible, and divide by HEADROOM so the strongest never kisses the outer
// bound. Keeping FLOOR in the data layer means callers don't need a CSS guard.
const SHAPE_FLOOR = 0.06;
const SHAPE_HEADROOM = 1.15;
function shapeRatio(
	value: number,
	max: number,
	compress: (n: number) => number,
): number {
	const cMax = compress(max) || 1;
	return Math.max(compress(value) / (cMax * SHAPE_HEADROOM), SHAPE_FLOOR);
}

function isRecent(t: { lastUsed: number }): boolean {
	const cutoff = new Date().getFullYear() - RECENT_YEARS;
	return t.lastUsed >= cutoff;
}

function computeCategoryDensity(): CategoryDensity[] {
	return RADAR_ORDER.map((name) => {
		const techs = ALL_TECHNOLOGIES.filter(
			(t) => t.group === name && isRecent(t),
		)
			.map((t) => ({
				name: t.name,
				years: t.years,
				source: t.source,
			}))
			.sort((a, b) => {
				// Production first, self-taught after; then years desc within each group.
				const ap = a.source === "production" ? 0 : 1;
				const bp = b.source === "production" ? 0 : 1;
				if (ap !== bp) return ap - bp;
				return b.years - a.years;
			});
		const totalYears = techs.reduce((acc, t) => acc + t.years, 0);
		return {
			name,
			color: CATEGORY_COLORS[name] ?? "#0F6CBD",
			techs,
			totalYears: +totalYears.toFixed(1),
			count: techs.length,
		};
	});
}

function CategoryRow({ cat, max }: { cat: CategoryDensity; max: number }) {
	// Shaped via the shared helper so density bars and the radar polygon use the
	// same floor/headroom mechanism; sqrt is gentler than the radar's pow(0.7)
	// because bars don't carry a polygon shape that needs extra compression.
	const barPct = shapeRatio(cat.totalYears, max, Math.sqrt) * 100;
	// At most two segments per row: one solid block for production years, one
	// striped block for self-taught years. Adjacent same-source techs collapse
	// into a single segment — no internal seams.
	const prodYears = cat.techs
		.filter((t) => t.source === "production")
		.reduce((acc, t) => acc + t.years, 0);
	const selfYears = cat.totalYears - prodYears;
	const prodPct = (prodYears / cat.totalYears) * 100;
	const selfPct = (selfYears / cat.totalYears) * 100;
	return (
		<div>
			<div className="flex items-baseline justify-between mb-1.5">
				<span className="text-[13.5px] font-semibold tracking-tight inline-flex items-center gap-2">
					<span
						className="inline-block h-2 w-2 rounded-full"
						style={{ background: cat.color }}
					/>
					{cv.techGroups[cat.name] ?? cat.name}
				</span>
				<span
					className="text-[10.5px] tabular-nums"
					style={{
						fontFamily: "var(--font-mono)",
						color: "var(--fl-fg-muted)",
					}}
				>
					{cat.count} techs
				</span>
			</div>
			<div
				className="flex h-3.5 rounded-sm overflow-hidden"
				style={{ width: `${barPct}%` }}
			>
				{prodPct > 0 && (
					<div
						title="Production"
						style={{ width: `${prodPct}%`, background: cat.color }}
					/>
				)}
				{selfPct > 0 && (
					<div
						title="Self-taught"
						style={{
							width: `${selfPct}%`,
							background: cat.color,
							backgroundImage:
								"repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0 3px, transparent 3px 6px)",
						}}
					/>
				)}
			</div>
			<div
				className="mt-2 text-[10.5px] leading-[1.65] flex flex-wrap gap-x-2 gap-y-0.5"
				style={{ fontFamily: "var(--font-mono)", color: "var(--fl-fg-muted)" }}
			>
				{cat.techs.map((t, i) => (
					<span key={t.name} className="whitespace-nowrap">
						<span style={{ color: "var(--fl-fg)" }}>{t.name}</span>{" "}
						<span className="tabular-nums">
							{t.years < 1
								? formatMonths(Math.max(1, Math.round(t.years * 12)), "short")
								: formatYears(Math.round(t.years), "short")}
						</span>
						{!isProdSrc(t.source) && (
							<span style={{ color: cat.color }}>*</span>
						)}
						{i < cat.techs.length - 1 && (
							<span style={{ color: "var(--fl-fg-muted)" }}> ·</span>
						)}
					</span>
				))}
			</div>
		</div>
	);
}

function isProdSrc(s: "production" | "self-taught") {
	return s === "production";
}

type RadarPoint = {
	name: string;
	shortName: string;
	rate: number;
	rawYears: number;
	count: number;
};

// Sorted so the two strongest vectors (Backend, DevOps) sit adjacent at top —
// the polygon leans into one quadrant instead of forming a symmetric pentagon.
// Frontend goes at lower-left (more horizontal room) and Data at upper-left
// (cramped — short label fits there). Tech-group ids; display names come
// from `cv.techGroups[id]`.
const RADAR_ORDER = ["backend", "devops", "cloud", "frontend", "data"];

function computeGroupRates(): RadarPoint[] {
	const currentYear = new Date().getFullYear();
	const groups = new Map<
		string,
		{ sum: number; years: number; count: number }
	>();

	for (const t of ALL_TECHNOLOGIES) {
		if (!isRecent(t)) continue;
		const yearsExp = t.years;
		const yearsSinceUse = Math.max(0, currentYear - t.lastUsed);
		// Legacy formula: years / (gap + 1) — recent + long-used tech weighs more.
		const rate = yearsExp / (yearsSinceUse + 1);
		const prev = groups.get(t.group) ?? { sum: 0, years: 0, count: 0 };
		groups.set(t.group, {
			sum: prev.sum + rate,
			years: prev.years + yearsExp,
			count: prev.count + 1,
		});
	}

	const total =
		Array.from(groups.values()).reduce((acc, g) => acc + g.sum, 0) || 1;
	return Array.from(groups.entries())
		.map(([name, g]) => ({
			name,
			shortName: cv.techGroups[name] ?? name,
			rate: +((g.sum / total) * 100).toFixed(1),
			rawYears: +g.years.toFixed(1),
			count: g.count,
		}))
		.sort((a, b) => RADAR_ORDER.indexOf(a.name) - RADAR_ORDER.indexOf(b.name));
}

function TechRadar() {
	const data = useMemo(() => computeGroupRates(), []);
	return <RadarChart data={data} />;
}

function RadarChart({
	data,
	size = 320,
}: {
	data: RadarPoint[];
	size?: number;
}) {
	const cx = size / 2;
	const cy = size / 2;
	const r = size / 2 - 56;
	const N = data.length;
	const angleFor = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / N;
	const point = (i: number, ratio: number): [number, number] => {
		const a = angleFor(i);
		return [cx + Math.cos(a) * r * ratio, cy + Math.sin(a) * r * ratio];
	};
	const labelPoint = (i: number, gap = 18): [number, number] => {
		const a = angleFor(i);
		return [cx + Math.cos(a) * (r + gap), cy + Math.sin(a) * (r + gap)];
	};
	const layoutFor = (i: number) => {
		const a = angleFor(i);
		const x = Math.cos(a);
		const y = Math.sin(a);
		const textAnchor: "start" | "middle" | "end" =
			Math.abs(x) < 0.2 ? "middle" : x > 0 ? "start" : "end";
		const baseline: "auto" | "middle" | "hanging" =
			Math.abs(y) < 0.2 ? "middle" : y > 0 ? "hanging" : "auto";
		return { textAnchor, baseline };
	};

	const grid = [0.25, 0.5, 0.75, 1];
	const polygonAt = (ratio: number) =>
		data.map((_, i) => point(i, ratio).join(",")).join(" ");

	// Same shaping helper as the toolkit bars. pow(0.7) is gentler than sqrt:
	// the polygon has 5 vertices, so weak ones already inflate the visual area
	// quadratically — we need less compression here than for linear bars.
	const compress = (r: number) => r ** 0.7;
	const maxRate = Math.max(...data.map((d) => d.rate)) || 1;
	const dataPoints = data.map((d, i) =>
		point(i, shapeRatio(d.rate, maxRate, compress)),
	);
	const dataPath =
		dataPoints
			.map(
				([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`,
			)
			.join(" ") + " Z";

	return (
		<div className="flex flex-col">
			<svg
				viewBox={`0 0 ${size} ${size}`}
				className="w-full h-auto"
				role="img"
				aria-label="Technology profile radar by group"
			>
				<defs>
					<linearGradient id="radar-fill" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="var(--fl-brand)" stopOpacity="0.32" />
						<stop
							offset="100%"
							stopColor="var(--fl-brand-hover)"
							stopOpacity="0.08"
						/>
					</linearGradient>
				</defs>

				{grid.map((g) => (
					<polygon
						key={g}
						points={polygonAt(g)}
						fill="none"
						stroke="var(--fl-stroke)"
						strokeOpacity={g === 1 ? 0.7 : 0.35}
					/>
				))}

				{data.map((d, i) => {
					const [x, y] = point(i, 1);
					return (
						<line
							key={d.name}
							x1={cx}
							y1={cy}
							x2={x}
							y2={y}
							stroke="var(--fl-stroke)"
							strokeOpacity={0.35}
						/>
					);
				})}

				<path
					d={dataPath}
					fill="url(#radar-fill)"
					stroke="var(--fl-brand)"
					strokeWidth={1.75}
					strokeLinejoin="round"
				/>

				{dataPoints.map(([x, y], i) => (
					<circle
						key={data[i].name}
						cx={x}
						cy={y}
						r={4}
						fill={CATEGORY_COLORS[data[i].name] ?? "var(--fl-brand)"}
						stroke="var(--fl-card)"
						strokeWidth={2}
					/>
				))}

				{data.map((d, i) => {
					const [lx, ly] = labelPoint(i);
					const { textAnchor, baseline } = layoutFor(i);
					return (
						<text
							key={`l-${d.name}`}
							x={lx}
							y={ly}
							textAnchor={textAnchor}
							dominantBaseline={baseline}
							style={{ fontSize: 11, fontWeight: 600, fill: "var(--fl-fg)" }}
						>
							{d.shortName}
						</text>
					);
				})}
			</svg>

			<div
				className="mt-3 pt-3 border-t grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]"
				style={{
					borderColor: "var(--fl-stroke-subtle)",
					color: "var(--fl-fg-muted)",
				}}
			>
				{data.map((d) => (
					<div
						key={`row-${d.name}`}
						className="flex items-center justify-between tabular-nums"
					>
						<span className="inline-flex items-center gap-1.5 truncate">
							<span
								className="h-1.5 w-1.5 rounded-full shrink-0"
								style={{
									background: CATEGORY_COLORS[d.name] ?? "var(--fl-brand)",
								}}
							/>
							<span className="truncate">{d.shortName}</span>
						</span>
						<span
							className="tabular-nums"
							style={{ color: "var(--fl-fg-muted)" }}
						>
							{d.rate.toFixed(0)}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function Certifications() {
	const today = new Date();
	const theme = useThemeMode();
	return (
		<Section id="certifications">
			<SectionHeader
				eyebrow="04 — Certifications"
				title={sections.certifications.title}
				description={sections.certifications.description}
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				{cv.certifications.map((c) => {
					const valid = !c.expires || c.expires >= today;
					let pct = 100;
					if (c.expires) {
						const total = c.expires.getTime() - c.issued.getTime();
						const used = today.getTime() - c.issued.getTime();
						pct = Math.max(0, Math.min(100, ((total - used) / total) * 100));
					}
					return (
						<a
							key={c.credentialId}
							href={c.credentialUrl}
							target="_blank"
							rel="noreferrer"
							className="block group"
						>
							<Card hoverable reveal className="p-5 h-full">
								<div className="flex items-start justify-between">
									<div className="flex items-center gap-2.5">
										<img
											src={pickLogo(c.issuer.logo, theme)}
											alt={c.issuer.name}
											className="h-8 w-8 rounded object-cover"
										/>
										<div>
											<div
												className="text-[11px]"
												style={{ color: "var(--fl-fg-muted)" }}
											>
												{c.issuer.name}
											</div>
											<div
												className="text-[12.5px] font-semibold tabular-nums"
												style={{ color: "var(--fl-brand-hover)" }}
											>
												{c.code}
											</div>
										</div>
									</div>
									<ArrowUpRight
										size={15}
										className="transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
										style={{ color: "var(--fl-fg-subtle)" }}
									/>
								</div>
								<h3 className="mt-3 text-[15px] font-semibold tracking-tight leading-snug">
									{c.name.replace("Microsoft Certified: ", "")}
								</h3>
								<p
									className="mt-2 text-[12.5px] leading-relaxed"
									style={{ color: "var(--fl-fg-muted)" }}
								>
									{c.about}
								</p>
								{c.expires ? (
									<div className="mt-4">
										<div
											className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.12em] mb-1.5 font-medium"
											style={{ color: "var(--fl-fg-subtle)" }}
										>
											<span>{valid ? "Validity" : "Expired"}</span>
											<span className="tabular-nums">
												{formatYearMonth(c.issued)} →{" "}
												{formatYearMonth(c.expires)}
											</span>
										</div>
										<ProgressBar
											value={pct}
											color={
												valid
													? "linear-gradient(90deg, var(--fl-brand) 0%, var(--fl-brand-hover) 100%)"
													: "var(--fl-stroke-strong)"
											}
										/>
									</div>
								) : (
									<div
										className="mt-4 pt-3 border-t flex items-baseline justify-between text-[11px] tabular-nums"
										style={{
											borderColor: "var(--fl-stroke-subtle)",
											color: "var(--fl-fg-muted)",
										}}
									>
										<span>Issued {formatYearMonth(c.issued)}</span>
										<Tag variant="success">No expiration</Tag>
									</div>
								)}
							</Card>
						</a>
					);
				})}
			</div>
		</Section>
	);
}

function EducationLanguages() {
	const theme = useThemeMode();
	return (
		<Section id="education">
			<SectionHeader
				eyebrow="05 — Education & Languages"
				title={sections.education.title}
			/>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
				<Card className="lg:col-span-2 p-5 md:p-6" reveal>
					<h3 className="text-[14px] font-semibold tracking-tight inline-flex items-center gap-2 mb-4">
						<GraduationCap size={15} style={{ color: "var(--fl-brand)" }} />
						Education
					</h3>
					{cv.education.map((e) => {
						// "Bachelor's degree" → "Bachelor"; "PhD" → "PhD".
						const level = e.degree.split(/\s+/)[0].replace(/['']s$/, "");
						return (
							<div key={e.school.name} className="flex items-start gap-4">
								<img
									src={pickLogo(e.school.logo, theme)}
									alt={e.school.name}
									className="h-10 w-10 md:h-11 md:w-11 rounded-md object-cover"
								/>
								<div className="flex-1 min-w-0 flex flex-col items-start">
									<a
										href={e.school.url}
										target="_blank"
										rel="noreferrer"
										className="text-[15px] font-semibold tracking-tight hover:underline"
									>
										{e.school.name}
									</a>
									<div
										className="text-[13px] mt-0.5"
										style={{ color: "var(--fl-fg-muted)" }}
									>
										{e.degree} · {e.field}
									</div>
									<div className="mt-2 flex items-center flex-wrap gap-2">
										<Tag variant="outline">{formatPeriod(e.start, e.end)}</Tag>
										<Tag variant="outline">{formatDuration(e.start, e.end)}</Tag>
										<Tag variant="brand">{level}</Tag>
									</div>
								</div>
							</div>
						);
					})}
				</Card>

				<Card className="p-5 md:p-6" reveal>
					<h3 className="text-[14px] font-semibold tracking-tight inline-flex items-center gap-2 mb-4">
						<LanguagesIcon size={15} style={{ color: "var(--fl-brand)" }} />
						Languages
					</h3>
					<div className="space-y-3.5">
						{cv.languages.map((l) => {
							const pct = levelPct(l.level);
							return (
								<div key={l.name}>
									<div className="flex items-baseline justify-between mb-1">
										<span className="text-[13.5px] font-medium">{l.name}</span>
										<Tag variant={l.level === "Native" ? "brand" : "outline"}>
											{l.level}
										</Tag>
									</div>
									<ProgressBar value={pct} />
								</div>
							);
						})}
					</div>
				</Card>
			</div>
		</Section>
	);
}

function levelPct(level: string): number {
	switch (level) {
		case "Native":
			return 100;
		case "C2":
			return 92;
		case "C1":
			return 80;
		case "B2":
			return 65;
		case "B1":
			return 48;
		case "A2":
			return 32;
		default:
			return 18;
	}
}

function SoftSkills() {
	return (
		<Section id="soft">
			<SectionHeader
				eyebrow="06 — Strengths"
				title={sections.strengths.title}
				description={sections.strengths.description}
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				{cv.strengths.map((s, i) => (
					<Card key={s.name} className="p-6 h-full" reveal hoverable>
						<div
							className="text-[11px] font-semibold tracking-[0.18em] uppercase tabular-nums"
							style={{ color: "var(--fl-brand-hover)" }}
						>
							0{i + 1}
						</div>
						<h3 className="mt-2 text-[18px] font-semibold tracking-tight">
							{s.name}
						</h3>
						<p
							className="mt-3 text-[13px] leading-[1.7]"
							style={{ color: "var(--fl-fg-muted)" }}
						>
							{s.description}
						</p>
					</Card>
				))}
			</div>
		</Section>
	);
}

function CTA() {
	const ref = useRef<HTMLDivElement>(null);
	const { eyebrow, title, description } = sections.cta;
	const titleLines = title.trim().split("\n");
	return (
		<Section id="cta" className="!pt-14 md:!pt-20">
			<Card
				className="fl-mica relative overflow-hidden p-7 md:p-12"
				elevation={8}
			>
				<div className="absolute inset-0 fl-grid-bg pointer-events-none" />
				<div
					ref={ref}
					className="relative grid grid-cols-12 gap-6 items-center"
				>
					<div className="col-span-12 lg:col-span-8">
						<div
							className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-3"
							style={{ color: "var(--fl-brand-hover)" }}
						>
							{eyebrow}
						</div>
						<h2
							className="text-[34px] md:text-[48px] font-semibold tracking-tight leading-[1.05]"
							style={{ letterSpacing: "-0.025em" }}
						>
							{titleLines.map((line, i) => (
								<span key={line}>
									{line}
									{i < titleLines.length - 1 && <br />}
								</span>
							))}
						</h2>
						<p
							className="mt-3 max-w-xl text-[14px] leading-relaxed"
							style={{ color: "var(--fl-fg-muted)" }}
						>
							{description}
						</p>
					</div>
					<div className="col-span-12 lg:col-span-4 flex flex-col gap-2">
						<PrimaryButton
							icon={Mail}
							iconRight={ArrowRight}
							size="lg"
							href={`mailto:${cv.email}`}
							className="justify-between"
						>
							{cv.email}
						</PrimaryButton>
						<div className="grid grid-cols-2 gap-2">
							<SubtleButton
								icon={Linkedin}
								href={`https://${cv.linkedIn}`}
								target="_blank"
								rel="noreferrer"
								className="justify-center"
							>
								LinkedIn
							</SubtleButton>
							<SubtleButton
								icon={Github}
								href={`https://${cv.github}`}
								target="_blank"
								rel="noreferrer"
								className="justify-center"
							>
								GitHub
							</SubtleButton>
						</div>
					</div>
				</div>
			</Card>
		</Section>
	);
}

function Footer() {
	return (
		<footer
			className="mt-16 border-t no-print"
			style={{
				borderColor: "var(--fl-stroke)",
				background: "var(--fl-canvas-2)",
			}}
		>
			<div
				className="mx-auto max-w-[1180px] px-5 md:px-8 py-6 flex items-center justify-between text-[11.5px]"
				style={{ color: "var(--fl-fg-subtle)" }}
			>
				<span>
					© {new Date().getFullYear()} {cv.fullName}
				</span>
				<a
					href="#top"
					className="inline-flex items-center gap-1 hover:text-foreground"
				>
					↑ Back to top
				</a>
			</div>
		</footer>
	);
}
