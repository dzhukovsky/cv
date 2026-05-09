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
	GitBranch,
	Globe,
	GraduationCap,
	HeartHandshake,
	Info,
	Languages as LanguagesIcon,
	Layers,
	Mail,
	MapPin,
	Radar,
	ShieldCheck,
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
	formatPeriod,
	formatYears,
	pickLogo,
} from "@/data/cv";
import { useNow, useScrollSpy, useThemeMode } from "@/lib/hooks";

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

/* ============================== Hero ============================== */

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

	const yearsTotal = 9;

	return (
		// Pull the hero up under the sticky header (h-14 = 56px) so its mica
		// gradient extends behind the header — the acrylic blur has tinted
		// content to sample at scroll = 0, no visible cut line.
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
							Open to Senior .NET roles · {cv.contractTypes.join(" / ")}
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
							{yearsTotal}+ years engineering .NET systems — distributed
							architectures, multi-tenant SaaS, and platform engineering.
							Pragmatic over clever, written down over discussed. Currently
							focused on cloud-native data platforms.
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
								href="/Dmitry Zhukovsky - .NET Software Engineer.pdf"
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
									src="/me.jpg"
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
								title="Available"
							>
								<span
									className="h-3 w-3 rounded-full fl-pulse-dot"
									style={{ background: "var(--fl-success)" }}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Stats strip */}
				<Card
					className="mt-10 md:mt-14 px-5 md:px-7 py-5 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5"
					elevation={4}
				>
					<Stat
						icon={Briefcase}
						label="Experience"
						value={String(yearsTotal)}
						suffix="+ yrs"
						caption="6+ in production"
					/>
					<Stat
						icon={Zap}
						label="Platforms shipped"
						value={String(cv.projects.length)}
						caption={`${cv.projects.filter((p) => !p.end).length} active`}
					/>
					<Stat
						icon={Layers}
						label="Technologies"
						value={String(cv.technologies.length)}
						caption={`${cv.technologies.filter((t) => t.source === "production").length} in production`}
					/>
					<Stat
						icon={Award}
						label="Microsoft certs"
						value={String(cv.certifications.length)}
						caption="AZ-204 · AZ-900 · AI-900"
					/>
				</Card>
			</div>
		</section>
	);
}

/* ============================== Side Rail (Scroll Spy) ============================== */

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

/* ============================== About ============================== */

function About() {
	const strengths: { title: string; description: string; icon: typeof Cpu }[] =
		[
			{
				title: "Backend architecture",
				description:
					"C#, ASP.NET Core, EF Core. Modular monoliths and microservices that survive production.",
				icon: Cpu,
			},
			{
				title: "Cloud & DevOps",
				description:
					"Azure App Service, AKS, Service Bus, Functions. Helm, Azure DevOps, GitHub Actions.",
				icon: Cloud,
			},
			{
				title: "Data & integrations",
				description:
					"MS-SQL, Redis, KQL, Microsoft Fabric. Banks, payment providers, SAP, Salesforce.",
				icon: Database,
			},
			{
				title: "CI/CD & deployment ownership",
				description: "Pipelines, automation, production-deployment ownership.",
				icon: Workflow,
			},
		];

	return (
		<Section id="about">
			<SectionHeader
				eyebrow="01 — About"
				title="Built quietly. Ships loudly."
				description="Engineer for the kind of backend that runs on a Sunday morning."
			/>

			<div className="grid grid-cols-12 gap-3">
				<Card className="col-span-12 md:col-span-5 p-6 md:p-7" elevation={2}>
					<div className="flex items-center gap-3 mb-3">
						<Persona
							name={cv.fullName}
							src="/me.jpg"
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
							<Globe size={13} /> {cv.contractTypes.join(" / ")}
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
					{strengths.map((s) => {
						const Icon = s.icon;
						return (
							<Card key={s.title} className="p-5" hoverable reveal>
								<div
									className="grid place-items-center h-9 w-9 rounded-md mb-3"
									style={{
										background: "var(--fl-brand-subtle)",
										color: "var(--fl-brand-hover)",
									}}
								>
									<Icon size={16} />
								</div>
								<div className="text-[14px] font-semibold tracking-tight">
									{s.title}
								</div>
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

/* ============================== Experience ============================== */

function Experience() {
	const total = cv.projects.length;
	return (
		<Section id="experience">
			<SectionHeader
				eyebrow="02 — Experience"
				title="A timeline of platforms"
				description={`${total} production projects across telecom, fintech, digital publishing, and martech. Click any role to expand the contributions and stack.`}
			/>

			<div className="relative">
				<div
					aria-hidden
					className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px"
					style={{
						background:
							"linear-gradient(to bottom, var(--fl-stroke) 0%, var(--fl-stroke) 80%, transparent 100%)",
					}}
				/>
				<div className="space-y-3">
					{cv.projects.map((p, i) => (
						<ExperienceRow
							key={`${p.company}-${p.start}-${p.name}`}
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
	const seniority = p.position.includes("Senior")
		? "Senior"
		: p.position.includes("Middle")
			? "Middle"
			: "Junior";
	const isCurrent = !p.end;

	return (
		<div className="relative pl-12 md:pl-14">
			<div
				className="absolute left-0 top-5 grid place-items-center h-[30px] w-[30px] md:h-[38px] md:w-[38px] rounded-full"
				style={{
					background: isCurrent ? "var(--fl-brand)" : "var(--fl-card)",
					color: isCurrent ? "white" : "var(--fl-fg-muted)",
					border: `1px solid ${isCurrent ? "var(--fl-brand)" : "var(--fl-stroke)"}`,
					boxShadow: "var(--fl-elev-2)",
				}}
			>
				<Briefcase size={14} />
			</div>

			<Card hoverable reveal className="overflow-hidden">
				<button
					type="button"
					onClick={() => setOpen((v) => !v)}
					className="w-full text-left px-5 md:px-6 py-4 md:py-5 flex items-start gap-4 cursor-pointer"
				>
					<img
						src={pickLogo(p.companyLogo, theme)}
						alt={p.company}
						className="mt-0.5 h-10 w-10 md:h-11 md:w-11 rounded-md object-cover"
					/>
					<div className="flex-1 min-w-0">
						<div className="flex items-center flex-wrap gap-x-2 gap-y-1.5">
							<a
								href={p.companyUrl}
								target="_blank"
								rel="noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="text-[13px] font-semibold hover:underline"
							>
								{p.company}
							</a>
							<span style={{ color: "var(--fl-fg-muted)" }}>·</span>
							<span
								className="text-[12.5px]"
								style={{ color: "var(--fl-fg-muted)" }}
							>
								{p.position}
							</span>
							<Tag variant="brand">{seniority}</Tag>
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
						className="mt-2 transition-transform shrink-0"
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
							Stack ({p.tech.length})
						</div>
						<div className="mt-2.5 flex flex-wrap gap-1.5">
							{p.tech.map((t) => (
								<Tag key={t.name} variant="outline">
									{t.name}
								</Tag>
							))}
						</div>

						<a
							href={p.companyUrl}
							target="_blank"
							rel="noreferrer"
							className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-medium hover:underline"
							style={{ color: "var(--fl-brand-hover)" }}
						>
							Visit {p.company}
							<ArrowUpRight size={13} />
						</a>
					</div>
				)}
			</Card>
		</div>
	);
}

/* ============================== Skills ============================== */

const groupMeta: Record<string, { icon: typeof Cpu; label: string }> = {
	Backend: { icon: Cpu, label: "Backend" },
	Frontend: { icon: Code2, label: "Frontend" },
	Data: { icon: Database, label: "Data" },
	Cloud: { icon: Cloud, label: "Cloud" },
	DevOps: { icon: Wrench, label: "DevOps" },
};

// VCS noise — Git is universal, SVN/TfVC are historical. Bars still sum their
// years, but the chip-cloud index hides them so DevOps doesn't read inflated.
const VCS_NAMES = new Set(["Git", "SVN", "TfVC"]);

function Skills() {
	const densities = useMemo(
		() => computeCategoryDensity().sort((a, b) => b.totalYears - a.totalYears),
		[],
	);
	const groups = useMemo(() => densities.map((d) => d.name), [densities]);
	const maxYears = useMemo(
		() => Math.max(...densities.map((c) => c.totalYears)),
		[densities],
	);

	return (
		<Section id="skills">
			<SectionHeader
				eyebrow="03 — Technologies"
				title="The toolkit"
				description="Active toolkit (last 3 years) with full historical depth. Filled = production, striped = self-taught."
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

				<Card className="col-span-12 p-5 md:p-6 mt-1" elevation={2}>
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-[14px] font-semibold tracking-tight inline-flex items-center gap-2">
							<Layers size={15} style={{ color: "var(--fl-brand)" }} />
							Grouped index
						</h3>
						<div
							className="flex items-center gap-3 text-[11px]"
							style={{ color: "var(--fl-fg-muted)" }}
						>
							<span className="inline-flex items-center gap-1.5">
								<span
									className="inline-block h-2.5 w-2.5 rounded"
									style={{
										background: "var(--fl-brand-subtle)",
										border: "1px solid var(--fl-brand)",
									}}
								/>
								Active · last {RECENT_YEARS}y
							</span>
							<span className="inline-flex items-center gap-1.5">
								<span
									className="inline-block h-2.5 w-2.5 rounded"
									style={{ border: "1px solid var(--fl-stroke-strong)" }}
								/>
								Historical
							</span>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
						{groups.map((g) => {
							const items = cv.technologies.filter(
								(t) => t.group === g && !VCS_NAMES.has(t.name),
							);
							if (!items.length) return null;
							const meta = groupMeta[g];
							const Icon = meta.icon;
							return (
								<div key={g}>
									<div
										className="flex items-center gap-2 mb-2 pb-1.5 border-b"
										style={{ borderColor: "var(--fl-stroke-subtle)" }}
									>
										<Icon size={13} style={{ color: "var(--fl-fg-muted)" }} />
										<h4 className="text-[12px] font-semibold tracking-tight">
											{meta.label}
										</h4>
										<span
											className="ml-auto text-[10.5px] tabular-nums"
											style={{ color: "var(--fl-fg-subtle)" }}
										>
											{items.length}
										</span>
									</div>
									<div className="flex flex-wrap gap-1.5">
										{items.map((t) => (
											<Tag
												key={t.name}
												variant={isRecent(t) ? "brand" : "outline"}
											>
												{t.name}
											</Tag>
										))}
									</div>
								</div>
							);
						})}
					</div>
				</Card>

				<PreferredStack />
			</div>
		</Section>
	);
}

const PREFERRED_STACK: { group: string; items: string[] }[] = [
	{ group: "Backend", items: [".NET", "ASP.NET Core", "Aspire"] },
	{ group: "Cloud", items: ["Azure-native", "Microsoft Fabric"] },
	{ group: "Data", items: ["MS-SQL", "Cosmos DB", "Redis", "Kusto"] },
	{ group: "DevOps", items: ["Azure DevOps", "GitHub", "Helm", "Bicep"] },
	{
		group: "Frontend",
		items: ["React", "TypeScript", "Vite", "Bun"],
	},
];

function PreferredStack() {
	return (
		<Card className="col-span-12 p-5 md:p-6 mt-1" elevation={2}>
			<div className="mb-4">
				<h3 className="text-[14px] font-semibold tracking-tight inline-flex items-center gap-2">
					<Sparkles size={15} style={{ color: "var(--fl-brand)" }} />
					Preferred stack
				</h3>
				<p
					className="mt-1 text-[12.5px] leading-relaxed"
					style={{ color: "var(--fl-fg-muted)" }}
				>
					What I reach for when I get to choose.
				</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5">
				{PREFERRED_STACK.map(({ group, items }) => {
					const meta = groupMeta[group];
					const Icon = meta?.icon ?? Cpu;
					return (
						<div key={group}>
							<div
								className="flex items-center gap-2 mb-2 pb-1.5 border-b"
								style={{ borderColor: "var(--fl-stroke-subtle)" }}
							>
								<Icon size={13} style={{ color: "var(--fl-fg-muted)" }} />
								<h4 className="text-[12px] font-semibold tracking-tight">
									{group}
								</h4>
							</div>
							<div className="flex flex-wrap gap-1.5">
								{items.map((it) => (
									<Tag key={it} variant="outline">
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

/* ============================== Tech Radar + Density ============================== */

const CATEGORY_COLORS: Record<string, string> = {
	Backend: "#0F6CBD",
	Data: "#059669",
	Cloud: "#9333EA",
	DevOps: "#EA580C",
	Frontend: "#0891B2",
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
// RECENT_YEARS years count, but their full lifetime years are used for sizing.
// Older tools (e.g. WPF, SSRS) live on in the Grouped index but don't pad the
// shape of the toolkit.
const RECENT_YEARS = 3;

function isRecent(t: { lastUsed?: number }): boolean {
	const cutoff = new Date().getFullYear() - RECENT_YEARS;
	return (t.lastUsed ?? 0) >= cutoff;
}

function computeCategoryDensity(): CategoryDensity[] {
	return RADAR_ORDER.map((name) => {
		const techs = cv.technologies
			.filter((t) => t.group === name && isRecent(t))
			.map((t) => ({
				name: t.name,
				years: t.years ?? 0.5,
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
	const barPct = (cat.totalYears / max) * 100;
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
					{cat.name}
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
				style={{ width: `${barPct}%`, minWidth: 24 }}
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
							{formatYears(t.years, "short")}
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

const RADAR_SHORT_NAMES: Record<string, string> = {
	Backend: "Backend",
	Frontend: "Frontend",
	Data: "Data",
	Cloud: "Cloud",
	DevOps: "DevOps",
};

// Sorted so the two strongest vectors (Backend, DevOps) sit adjacent at top —
// the polygon leans into one quadrant instead of forming a symmetric pentagon.
// Frontend goes at lower-left (more horizontal room) and Data at upper-left
// (cramped — short label fits there).
const RADAR_ORDER = ["Backend", "DevOps", "Cloud", "Frontend", "Data"];

function computeGroupRates(): RadarPoint[] {
	const currentYear = new Date().getFullYear();
	const groups = new Map<
		string,
		{ sum: number; years: number; count: number }
	>();

	for (const t of cv.technologies) {
		if (!isRecent(t)) continue;
		const yearsExp = t.years ?? 0.5;
		const yearsSinceUse = Math.max(
			0,
			currentYear - (t.lastUsed ?? currentYear),
		);
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
			shortName: RADAR_SHORT_NAMES[name] ?? name,
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

	// Logarithmic-like compression: never show below 4% so vertices are visible
	const max = Math.max(...data.map((d) => d.rate)) || 1;
	const dataPoints = data.map((d, i) => point(i, Math.max(0.06, d.rate / max)));
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

				{/* Concentric grid polygons */}
				{grid.map((g) => (
					<polygon
						key={g}
						points={polygonAt(g)}
						fill="none"
						stroke="var(--fl-stroke)"
						strokeOpacity={g === 1 ? 0.7 : 0.35}
					/>
				))}

				{/* Axis lines */}
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

				{/* Data polygon */}
				<path
					d={dataPath}
					fill="url(#radar-fill)"
					stroke="var(--fl-brand)"
					strokeWidth={1.75}
					strokeLinejoin="round"
				/>

				{/* Vertices */}
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

				{/* Labels — names only; percentages live in the legend */}
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
							<span className="truncate">{d.name}</span>
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

/* ============================== Certifications ============================== */

function Certifications() {
	const today = new Date();
	const theme = useThemeMode();
	return (
		<Section id="certifications">
			<SectionHeader
				eyebrow="04 — Certifications"
				title="Verified by Microsoft"
				description="Active and historical Microsoft credentials. Each card links to the official credential record."
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				{cv.certifications.map((c) => {
					const issued = parseYM(c.issued);
					const expires = c.expires ? parseYM(c.expires) : null;
					const valid = !expires || expires >= today;
					let pct = 100;
					if (issued && expires) {
						const total = expires.getTime() - issued.getTime();
						const used = today.getTime() - issued.getTime();
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
											src={pickLogo(c.issuerLogo, theme)}
											alt={c.issuer}
											className="h-8 w-8 rounded object-cover"
										/>
										<div>
											<div
												className="text-[11px]"
												style={{ color: "var(--fl-fg-muted)" }}
											>
												{c.issuer}
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
								{expires ? (
									<div className="mt-4">
										<div
											className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.12em] mb-1.5 font-medium"
											style={{ color: "var(--fl-fg-subtle)" }}
										>
											<span>{valid ? "Validity" : "Expired"}</span>
											<span className="tabular-nums">
												{c.issued} → {c.expires}
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
										className="mt-4 pt-3 border-t flex items-center justify-between text-[11px] tabular-nums"
										style={{
											borderColor: "var(--fl-stroke-subtle)",
											color: "var(--fl-fg-muted)",
										}}
									>
										<span>Issued {c.issued}</span>
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

function parseYM(s: string): Date {
	const [y, m] = s.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, 1);
}

/* ============================== Education + Languages ============================== */

function EducationLanguages() {
	const theme = useThemeMode();
	return (
		<Section id="education">
			<SectionHeader
				eyebrow="05 — Education & Languages"
				title="Schooling, plus three languages"
			/>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
				<Card className="lg:col-span-2 p-5 md:p-6" reveal>
					<div className="flex items-center gap-2 mb-4">
						<div
							className="grid place-items-center h-7 w-7 rounded-md"
							style={{
								background: "var(--fl-brand-subtle)",
								color: "var(--fl-brand-hover)",
							}}
						>
							<GraduationCap size={14} />
						</div>
						<h3
							className="text-[12px] font-semibold uppercase tracking-[0.14em]"
							style={{ color: "var(--fl-fg-muted)" }}
						>
							Education
						</h3>
					</div>
					{cv.education.map((e) => (
						<div key={e.school} className="flex items-start gap-4">
							<img
								src={pickLogo(e.schoolLogo, theme)}
								alt={e.school}
								className="h-10 w-10 md:h-11 md:w-11 rounded-md object-cover"
							/>
							<div className="flex-1 min-w-0">
								<a
									href={e.schoolUrl}
									target="_blank"
									rel="noreferrer"
									className="text-[15px] font-semibold tracking-tight hover:underline"
								>
									{e.school}
								</a>
								<div
									className="text-[13px] mt-0.5"
									style={{ color: "var(--fl-fg-muted)" }}
								>
									{e.degree} · {e.field}
								</div>
								<div
									className="mt-2 flex items-center flex-wrap gap-2 text-[11.5px] tabular-nums"
									style={{ color: "var(--fl-fg-subtle)" }}
								>
									<Tag variant="outline">{formatPeriod(e.start, e.end)}</Tag>
									<Tag variant="outline">{formatDuration(e.start, e.end)}</Tag>
									<Tag variant="brand">Bachelor</Tag>
								</div>
							</div>
						</div>
					))}
				</Card>

				<Card className="p-5 md:p-6" reveal>
					<div className="flex items-center gap-2 mb-4">
						<div
							className="grid place-items-center h-7 w-7 rounded-md"
							style={{
								background: "var(--fl-brand-subtle)",
								color: "var(--fl-brand-hover)",
							}}
						>
							<LanguagesIcon size={14} />
						</div>
						<h3
							className="text-[12px] font-semibold uppercase tracking-[0.14em]"
							style={{ color: "var(--fl-fg-muted)" }}
						>
							Languages
						</h3>
					</div>
					<div className="space-y-3.5">
						{cv.languages.map((l) => {
							const pct = levelPct(l.level);
							return (
								<div key={l.code}>
									<div className="flex items-baseline justify-between mb-1">
										<span className="text-[13.5px] font-medium">{l.name}</span>
										<Tag variant={l.level === "Native" ? "brand" : "subtle"}>
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

/* ============================== Soft Skills ============================== */

function SoftSkills() {
	return (
		<Section id="soft">
			<SectionHeader
				eyebrow="06 — Strengths"
				title="How I work, off the clock"
				description="Three traits I rely on, illustrated with stories from real projects."
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				{cv.softSkills.map((s, i) => (
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

/* ============================== CTA ============================== */

function CTA() {
	const ref = useRef<HTMLDivElement>(null);
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
							Let's talk
						</div>
						<h2
							className="text-[34px] md:text-[48px] font-semibold tracking-tight leading-[1.05]"
							style={{ letterSpacing: "-0.025em" }}
						>
							Got a backend that needs an extra pair of hands?
						</h2>
						<p
							className="mt-3 max-w-xl text-[14px] leading-relaxed"
							style={{ color: "var(--fl-fg-muted)" }}
						>
							{/* TODO: Not extra pair of hands but have a business problem that needs solving, or a project that needs ownership.  */}
							Currently open to senior backend / staff engineering roles, fully
							remote. Quickest reply via email; LinkedIn works too.
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

/* ============================== Footer ============================== */

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
