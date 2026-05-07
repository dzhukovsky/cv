import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Mail,
  MapPin,
  Download,
  ArrowUpRight,
  ArrowRight,
  Globe,
  ChevronDown,
  Sun,
  Moon,
  Sparkles,
  Cpu,
  Cloud,
  Database,
  Wrench,
  TestTube2,
  GitBranch,
  Code2,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Languages as LanguagesIcon,
  HeartHandshake,
  Award,
  Info,
  Clock,
  Layers,
  Zap,
} from 'lucide-react'
import { Linkedin, Github } from '@/components/brand-icons'
import { cv, formatPeriod, formatDuration, monthsBetween } from '@/data/cv'
import {
  Card,
  PrimaryButton,
  SubtleButton,
  IconButton,
  Tag,
  Pill,
  Section,
  SectionHeader,
  ProgressBar,
  Stat,
  Persona,
} from '@/components/ui/fluent'
import { useNow, useScrollSpy, useTheme } from '@/lib/hooks'

const SECTIONS = [
  { id: 'top', label: 'Overview', icon: Sparkles },
  { id: 'about', label: 'About', icon: Info },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Technologies', icon: Layers },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'soft', label: 'Strengths', icon: HeartHandshake },
] as const

export default function App() {
  return (
    <div className="min-h-svh">
      <Header />
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
  )
}

/* ============================== Header ============================== */

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [, , toggleTheme] = useTheme()
  const [theme] = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fl-acrylic sticky top-0 z-40 transition-all no-print ${
        scrolled ? 'shadow-[0_1px_0_var(--fl-stroke)]' : ''
      }`}
    >
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 h-14 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5">
          <div
            className="grid h-8 w-8 place-items-center rounded-md text-[12px] font-semibold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, var(--fl-brand) 0%, var(--fl-brand-hover) 100%)',
              color: 'white',
              boxShadow: 'var(--fl-elev-2)',
            }}
          >
            DZ
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="text-[13px] font-semibold tracking-tight">{cv.fullName}</div>
            <div className="text-[11px] -mt-0.5" style={{ color: 'var(--fl-fg-muted)' }}>
              {cv.position}
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-0.5 text-[13px]">
          {SECTIONS.slice(1, 6).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 h-8 inline-flex items-center rounded-md transition-colors"
              style={{ color: 'var(--fl-fg-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--fl-stroke-subtle)'
                e.currentTarget.style.color = 'var(--fl-fg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--fl-fg-muted)'
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <IconButton
            icon={theme === 'dark' ? Sun : Moon}
            ariaLabel="Toggle theme"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              toggleTheme()
            }}
            href="#"
          />
          <SubtleButton
            icon={Download}
            href="/Dmitry Zhukovsky - .NET Software Engineer.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
          >
            Resume
          </SubtleButton>
          <PrimaryButton icon={Mail} href={`mailto:${cv.email}`}>
            Contact
          </PrimaryButton>
        </div>
      </div>
    </header>
  )
}

/* ============================== Hero ============================== */

function Hero() {
  const now = useNow(60_000)
  const warsawTime = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Warsaw',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now),
    [now],
  )

  const yearsTotal = 9

  return (
    <section id="top" className="fl-mica relative no-print">
      <div className="absolute inset-0 fl-grid-bg pointer-events-none" />
      <div className="relative mx-auto max-w-[1180px] px-5 md:px-8 pt-10 pb-14 md:pt-16 md:pb-20">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <Pill icon={Sparkles} variant="brand" className="mb-5">
              <span
                className="h-1.5 w-1.5 rounded-full fl-pulse-dot"
                style={{ background: 'var(--fl-success)' }}
              />
              Open to Senior .NET roles · {cv.contractTypes.join(' / ')}
            </Pill>
            <h1
              className="text-[44px] md:text-[68px] font-semibold tracking-tight leading-[1.02]"
              style={{ letterSpacing: '-0.025em' }}
            >
              {cv.fullName}
            </h1>
            <div className="mt-2 flex items-center flex-wrap gap-x-3 gap-y-1.5 text-[15px] md:text-[17px]" style={{ color: 'var(--fl-fg-muted)' }}>
              <span className="font-medium" style={{ color: 'var(--fl-fg)' }}>
                {cv.position}
              </span>
              <span style={{ color: 'var(--fl-stroke)' }}>·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={14} /> {cv.location.city}, {cv.location.country}
              </span>
              <span style={{ color: 'var(--fl-stroke)' }}>·</span>
              <span className="inline-flex items-center gap-1 tabular-nums">
                <Clock size={14} /> {warsawTime} CET
              </span>
            </div>

            <p
              className="mt-5 max-w-[640px] text-[15px] leading-[1.7]"
              style={{ color: 'var(--fl-fg-muted)' }}
            >
              {yearsTotal}+ years engineering .NET systems — production-grade web apps with
              C#, ASP.NET Core, Entity Framework, and Azure. Currently shipping enterprise
              telephony at <strong style={{ color: 'var(--fl-fg)', fontWeight: 600 }}>Fotando Global</strong> and a
              tax-allocation backend at <strong style={{ color: 'var(--fl-fg)', fontWeight: 600 }}>Exadel</strong>.
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
                style={{ background: 'radial-gradient(closest-side, var(--fl-brand) 0%, transparent 70%)' }}
              />
              <div className="relative fl-photo-frame">
                <img
                  src="/me.jpg"
                  alt={cv.fullName}
                  className="block h-44 w-44 md:h-64 md:w-64 rounded-full object-cover"
                  style={{ background: 'var(--fl-card)' }}
                />
              </div>
              <div
                className="absolute bottom-1 right-1 grid place-items-center h-10 w-10 rounded-full"
                style={{ background: 'var(--fl-card)', boxShadow: 'var(--fl-elev-4)' }}
                title="Available"
              >
                <span
                  className="h-3 w-3 rounded-full fl-pulse-dot"
                  style={{ background: 'var(--fl-success)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <Card className="mt-10 md:mt-14 px-5 md:px-7 py-5 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5" elevation={4}>
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
            caption={`${cv.technologies.filter((t) => t.source === 'production').length} in production`}
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
  )
}

/* ============================== Side Rail (Scroll Spy) ============================== */

function SideRail() {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), [])
  const active = useScrollSpy(ids)
  return (
    <nav
      aria-label="Sections"
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-1 fl-acrylic rounded-xl p-1.5 no-print"
      style={{ border: '1px solid var(--fl-stroke)', boxShadow: 'var(--fl-elev-4)' }}
    >
      {SECTIONS.map((s) => {
        const Icon = s.icon
        const isActive = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative flex items-center"
          >
            <div
              className="grid place-items-center h-9 w-9 rounded-lg transition-colors"
              style={{
                background: isActive ? 'var(--fl-brand-subtle)' : 'transparent',
                color: isActive ? 'var(--fl-brand-hover)' : 'var(--fl-fg-muted)',
              }}
              onMouseEnter={(e) => {
                if (isActive) return
                e.currentTarget.style.background = 'var(--fl-stroke-subtle)'
              }}
              onMouseLeave={(e) => {
                if (isActive) return
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <Icon size={15} />
            </div>
            <span
              className="absolute left-12 px-2.5 py-1 rounded-md whitespace-nowrap text-[12px] font-medium opacity-0 -translate-x-1 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all"
              style={{
                background: 'var(--fl-card)',
                color: 'var(--fl-fg)',
                border: '1px solid var(--fl-stroke)',
                boxShadow: 'var(--fl-elev-4)',
              }}
            >
              {s.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}

/* ============================== About ============================== */

function About() {
  const strengths: { title: string; description: string; icon: typeof Cpu }[] = [
    {
      title: 'Backend architecture',
      description: 'C#, ASP.NET Core, EF Core. Modular monoliths and microservices that survive production.',
      icon: Cpu,
    },
    {
      title: 'Cloud & DevOps',
      description: 'Azure App Service, AKS, Service Bus, Functions. Helm, Azure DevOps, GitHub Actions.',
      icon: Cloud,
    },
    {
      title: 'Data & integrations',
      description: 'MS-SQL, Redis, KQL, Microsoft Fabric. Banks, payment providers, SAP, Salesforce.',
      icon: Database,
    },
    {
      title: 'Reliability mindset',
      description: 'xUnit, integration tests, performance work with JMeter, observability with App Insights.',
      icon: ShieldCheck,
    },
    {
      title: 'CI/CD ownership',
      description: 'Helm templates, Azure DevOps pipelines, secret/config maps, EF migrations as code.',
      icon: Wrench,
    },
    {
      title: 'Collaboration',
      description: 'Production-deployment ownership, code reviews, support across cross-functional teams.',
      icon: HeartHandshake,
    },
  ]

  return (
    <Section id="about">
      <SectionHeader
        eyebrow="01 — About"
        title="Built quietly. Ships loudly."
        description="Senior .NET engineer with deep production track record across telecom, fintech, publishing, and martech. Strong on backend, comfortable across the stack, ergonomic with operations."
      />

      <div className="grid grid-cols-12 gap-3">
        <Card className="col-span-12 md:col-span-5 p-6 md:p-7" elevation={2}>
          <div className="flex items-center gap-3 mb-3">
            <Persona name={cv.fullName} src="/me.jpg" size={44} presence="available" />
            <div>
              <div className="text-[13px] font-semibold">{cv.fullName}</div>
              <div className="text-[11.5px]" style={{ color: 'var(--fl-fg-muted)' }}>
                {cv.position}
              </div>
            </div>
          </div>
          <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--fl-fg)' }}>
            {cv.summary}
          </p>
          <div
            className="mt-5 pt-4 border-t flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]"
            style={{ borderColor: 'var(--fl-stroke-subtle)', color: 'var(--fl-fg-muted)' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} /> {cv.location.city}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe size={13} /> {cv.contractTypes.join(' / ')}
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
            const Icon = s.icon
            return (
              <Card key={s.title} className="p-5" hoverable reveal>
                <div
                  className="grid place-items-center h-9 w-9 rounded-md mb-3"
                  style={{ background: 'var(--fl-brand-subtle)', color: 'var(--fl-brand-hover)' }}
                >
                  <Icon size={16} />
                </div>
                <div className="text-[14px] font-semibold tracking-tight">{s.title}</div>
                <div className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: 'var(--fl-fg-muted)' }}>
                  {s.description}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

/* ============================== Experience ============================== */

function Experience() {
  const total = cv.projects.length
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
              'linear-gradient(to bottom, var(--fl-stroke) 0%, var(--fl-stroke) 80%, transparent 100%)',
          }}
        />
        <div className="space-y-3">
          {cv.projects.map((p, i) => (
            <ExperienceRow key={`${p.company}-${p.start}-${p.name}`} p={p} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function ExperienceRow({ p, index }: { p: typeof cv.projects[number]; index: number }) {
  const [open, setOpen] = useState(index === 0)
  const seniority = p.position.includes('Senior')
    ? 'Senior'
    : p.position.includes('Middle')
    ? 'Middle'
    : 'Junior'
  const isCurrent = !p.end
  const months = monthsBetween(p.start, p.end)

  return (
    <div className="relative pl-8 md:pl-10">
      <div
        className="absolute left-0 top-5 grid place-items-center h-[30px] w-[30px] md:h-[38px] md:w-[38px] rounded-full"
        style={{
          background: isCurrent ? 'var(--fl-brand)' : 'var(--fl-card)',
          color: isCurrent ? 'white' : 'var(--fl-fg-muted)',
          border: `1px solid ${isCurrent ? 'var(--fl-brand)' : 'var(--fl-stroke)'}`,
          boxShadow: 'var(--fl-elev-2)',
        }}
      >
        <Briefcase size={14} />
      </div>

      <Card hoverable reveal className="overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left px-5 md:px-6 py-4 md:py-5 flex items-start gap-4"
        >
          <img
            src={p.companyLogo}
            alt={p.company}
            className="mt-0.5 h-10 w-10 md:h-11 md:w-11 rounded-md object-cover bg-white border"
            style={{ borderColor: 'var(--fl-stroke-subtle)' }}
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
              <span style={{ color: 'var(--fl-stroke-strong)' }}>·</span>
              <span className="text-[12.5px]" style={{ color: 'var(--fl-fg-muted)' }}>
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
              style={{ color: 'var(--fl-fg-muted)' }}
            >
              <span className="inline-flex items-center gap-1">
                <Clock size={12} /> {formatPeriod(p.start, p.end)}
              </span>
              <span style={{ color: 'var(--fl-stroke)' }}>·</span>
              <span>{formatDuration(p.start, p.end)}</span>
              <span style={{ color: 'var(--fl-stroke)' }}>·</span>
              <span>{months} mo</span>
            </div>
          </div>
          <ChevronDown
            size={18}
            className="mt-2 transition-transform shrink-0"
            style={{
              color: 'var(--fl-fg-muted)',
              transform: open ? 'rotate(180deg)' : 'rotate(0)',
            }}
          />
        </button>

        {open && (
          <div
            className="px-5 md:px-6 pb-5 md:pb-6 pt-1 border-t"
            style={{ borderColor: 'var(--fl-stroke-subtle)' }}
          >
            <p className="mt-4 text-[13.5px] leading-[1.7]" style={{ color: 'var(--fl-fg)' }}>
              {p.description}
            </p>

            <div
              className="mt-5 text-[10.5px] uppercase tracking-[0.16em] font-semibold"
              style={{ color: 'var(--fl-brand-hover)' }}
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
                    style={{ background: 'var(--fl-brand)' }}
                  />
                  <span style={{ color: 'var(--fl-fg)' }}>{c}</span>
                </li>
              ))}
            </ul>

            <div
              className="mt-5 text-[10.5px] uppercase tracking-[0.16em] font-semibold"
              style={{ color: 'var(--fl-brand-hover)' }}
            >
              Stack ({p.tech.length})
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <Tag key={t.name} variant="subtle">
                  {t.name}
                </Tag>
              ))}
            </div>

            <a
              href={p.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-medium hover:underline"
              style={{ color: 'var(--fl-brand-hover)' }}
            >
              Visit {p.company}
              <ArrowUpRight size={13} />
            </a>
          </div>
        )}
      </Card>
    </div>
  )
}

/* ============================== Skills ============================== */

const groupMeta: Record<string, { icon: typeof Cpu; label: string }> = {
  Backend: { icon: Cpu, label: 'Backend' },
  Frontend: { icon: Code2, label: 'Frontend' },
  Database: { icon: Database, label: 'Database' },
  Cloud: { icon: Cloud, label: 'Cloud' },
  DevOps: { icon: Wrench, label: 'DevOps' },
  Testing: { icon: TestTube2, label: 'Testing' },
  'Version Control': { icon: GitBranch, label: 'Version Control' },
}

function Skills() {
  const groups = [
    'Backend',
    'Frontend',
    'Database',
    'Cloud',
    'DevOps',
    'Testing',
    'Version Control',
  ] as const

  const top = useMemo(
    () =>
      cv.technologies
        .filter((x) => x.source === 'production' && (x.years ?? 0) >= 2)
        .sort((a, b) => (b.years ?? 0) - (a.years ?? 0))
        .slice(0, 8),
    [],
  )

  return (
    <Section id="skills">
      <SectionHeader
        eyebrow="03 — Technologies"
        title="The toolkit, with proficiency"
        description="Top tools by years in production, plus a full grouped index. Production stack is filled; self-taught is outlined."
      />

      <div className="grid grid-cols-12 gap-3">
        <Card className="col-span-12 lg:col-span-7 p-5 md:p-6" elevation={2}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold tracking-tight inline-flex items-center gap-2">
              <Zap size={15} style={{ color: 'var(--fl-brand)' }} />
              Top technologies
            </h3>
            <span className="text-[11.5px]" style={{ color: 'var(--fl-fg-muted)' }}>
              years in production
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
            {top.map((t) => {
              const pct = Math.min(100, ((t.years ?? 1) / 9) * 100)
              return (
                <div key={t.name}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-[13px] font-medium tracking-tight">{t.name}</span>
                    <span
                      className="text-[11px] tabular-nums font-medium"
                      style={{ color: 'var(--fl-fg-muted)' }}
                    >
                      {t.years} yr
                    </span>
                  </div>
                  <ProgressBar value={pct} />
                </div>
              )
            })}
          </div>
        </Card>

        <div className="col-span-12 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="p-5" reveal hoverable>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="grid place-items-center h-7 w-7 rounded-md"
                style={{ background: 'var(--fl-brand-subtle)', color: 'var(--fl-brand-hover)' }}
              >
                <Cpu size={14} />
              </div>
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--fl-fg-muted)' }}>
                Core
              </div>
            </div>
            <div className="text-[13.5px] leading-relaxed">
              <strong>C#</strong>, <strong>.NET</strong>, <strong>ASP.NET Core</strong>,{' '}
              <strong>Entity Framework</strong>, Dapper, SignalR.
            </div>
          </Card>
          <Card className="p-5" reveal hoverable>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="grid place-items-center h-7 w-7 rounded-md"
                style={{ background: 'var(--fl-brand-subtle)', color: 'var(--fl-brand-hover)' }}
              >
                <Cloud size={14} />
              </div>
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--fl-fg-muted)' }}>
                Azure
              </div>
            </div>
            <div className="text-[13.5px] leading-relaxed">
              App Service, AKS, Service Bus, Functions, App Insights, API Management, Microsoft Fabric.
            </div>
          </Card>
          <Card className="p-5 sm:col-span-2" reveal hoverable>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="grid place-items-center h-7 w-7 rounded-md"
                style={{ background: 'var(--fl-brand-subtle)', color: 'var(--fl-brand-hover)' }}
              >
                <Wrench size={14} />
              </div>
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--fl-fg-muted)' }}>
                Operations
              </div>
            </div>
            <div className="text-[13.5px] leading-relaxed">
              Helm, Kubernetes, Azure DevOps + GitHub Actions, PowerShell, YAML pipelines, EF migrations as code.
            </div>
          </Card>
        </div>

        <Card className="col-span-12 p-5 md:p-6 mt-1" elevation={2}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold tracking-tight inline-flex items-center gap-2">
              <Layers size={15} style={{ color: 'var(--fl-brand)' }} />
              Grouped index
            </h3>
            <div className="flex items-center gap-3 text-[11px]" style={{ color: 'var(--fl-fg-muted)' }}>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded"
                  style={{ background: 'var(--fl-brand-subtle)', border: '1px solid var(--fl-brand)' }}
                />
                Production
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded"
                  style={{ border: '1px solid var(--fl-stroke-strong)' }}
                />
                Self-taught
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
            {groups.map((g) => {
              const items = cv.technologies.filter((t) => t.group === g)
              if (!items.length) return null
              const meta = groupMeta[g]
              const Icon = meta.icon
              return (
                <div key={g}>
                  <div className="flex items-center gap-2 mb-2 pb-1.5 border-b" style={{ borderColor: 'var(--fl-stroke-subtle)' }}>
                    <Icon size={13} style={{ color: 'var(--fl-fg-muted)' }} />
                    <h4 className="text-[12px] font-semibold tracking-tight">{meta.label}</h4>
                    <span className="ml-auto text-[10.5px] tabular-nums" style={{ color: 'var(--fl-fg-subtle)' }}>
                      {items.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((t) => (
                      <Tag key={t.name} variant={t.source === 'production' ? 'brand' : 'outline'}>
                        {t.name}
                      </Tag>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </Section>
  )
}

/* ============================== Certifications ============================== */

function Certifications() {
  const today = new Date()
  return (
    <Section id="certifications">
      <SectionHeader
        eyebrow="04 — Certifications"
        title="Verified by Microsoft"
        description="Active and historical Microsoft credentials. Each card links to the official credential record."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {cv.certifications.map((c) => {
          const issued = parseYM(c.issued)
          const expires = c.expires ? parseYM(c.expires) : null
          const valid = !expires || expires >= today
          let pct = 100
          if (issued && expires) {
            const total = expires.getTime() - issued.getTime()
            const used = today.getTime() - issued.getTime()
            pct = Math.max(0, Math.min(100, ((total - used) / total) * 100))
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
                      src={c.issuerLogo}
                      alt={c.issuer}
                      className="h-9 w-9 rounded object-cover bg-white border"
                      style={{ borderColor: 'var(--fl-stroke-subtle)' }}
                    />
                    <div>
                      <div className="text-[11px]" style={{ color: 'var(--fl-fg-muted)' }}>
                        {c.issuer}
                      </div>
                      <div
                        className="text-[12.5px] font-semibold tabular-nums"
                        style={{ color: 'var(--fl-brand-hover)' }}
                      >
                        {c.code}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: 'var(--fl-fg-subtle)' }}
                  />
                </div>
                <h3 className="mt-3 text-[15px] font-semibold tracking-tight leading-snug">
                  {c.name.replace('Microsoft Certified: ', '')}
                </h3>
                <p
                  className="mt-2 text-[12.5px] leading-relaxed"
                  style={{ color: 'var(--fl-fg-muted)' }}
                >
                  {c.about}
                </p>
                {expires ? (
                  <div className="mt-4">
                    <div
                      className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.12em] mb-1.5 font-medium"
                      style={{ color: 'var(--fl-fg-subtle)' }}
                    >
                      <span>{valid ? 'Validity' : 'Expired'}</span>
                      <span className="tabular-nums">{c.issued} → {c.expires}</span>
                    </div>
                    <ProgressBar
                      value={pct}
                      color={
                        valid
                          ? 'linear-gradient(90deg, var(--fl-brand) 0%, var(--fl-brand-hover) 100%)'
                          : 'var(--fl-stroke-strong)'
                      }
                    />
                  </div>
                ) : (
                  <div
                    className="mt-4 pt-3 border-t flex items-center justify-between text-[11px] tabular-nums"
                    style={{ borderColor: 'var(--fl-stroke-subtle)', color: 'var(--fl-fg-muted)' }}
                  >
                    <span>Issued {c.issued}</span>
                    <Tag variant="success">No expiration</Tag>
                  </div>
                )}
              </Card>
            </a>
          )
        })}
      </div>
    </Section>
  )
}

function parseYM(s: string): Date {
  const [y, m] = s.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, 1)
}

/* ============================== Education + Languages ============================== */

function EducationLanguages() {
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
              style={{ background: 'var(--fl-brand-subtle)', color: 'var(--fl-brand-hover)' }}
            >
              <GraduationCap size={14} />
            </div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--fl-fg-muted)' }}>
              Education
            </h3>
          </div>
          {cv.education.map((e) => (
            <div key={e.school} className="flex items-start gap-4">
              <img
                src={e.schoolLogo}
                alt={e.school}
                className="h-12 w-12 rounded-lg object-cover bg-white border"
                style={{ borderColor: 'var(--fl-stroke-subtle)' }}
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
                  style={{ color: 'var(--fl-fg-muted)' }}
                >
                  {e.degree} · {e.field}
                </div>
                <div
                  className="mt-2 flex items-center flex-wrap gap-2 text-[11.5px] tabular-nums"
                  style={{ color: 'var(--fl-fg-subtle)' }}
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
              style={{ background: 'var(--fl-brand-subtle)', color: 'var(--fl-brand-hover)' }}
            >
              <LanguagesIcon size={14} />
            </div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--fl-fg-muted)' }}>
              Languages
            </h3>
          </div>
          <div className="space-y-3.5">
            {cv.languages.map((l) => {
              const pct = levelPct(l.level)
              return (
                <div key={l.code}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[13.5px] font-medium">{l.name}</span>
                    <Tag variant={l.level === 'Native' ? 'brand' : 'subtle'}>{l.level}</Tag>
                  </div>
                  <ProgressBar value={pct} />
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </Section>
  )
}

function levelPct(level: string): number {
  switch (level) {
    case 'Native':
      return 100
    case 'C2':
      return 92
    case 'C1':
      return 80
    case 'B2':
      return 65
    case 'B1':
      return 48
    case 'A2':
      return 32
    default:
      return 18
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
              style={{ color: 'var(--fl-brand-hover)' }}
            >
              0{i + 1}
            </div>
            <h3 className="mt-2 text-[18px] font-semibold tracking-tight">{s.name}</h3>
            <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: 'var(--fl-fg-muted)' }}>
              {s.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* ============================== CTA ============================== */

function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <Section id="cta" className="!pt-14 md:!pt-20">
      <Card
        className="fl-mica relative overflow-hidden p-7 md:p-12"
        elevation={8}
      >
        <div className="absolute inset-0 fl-grid-bg pointer-events-none" />
        <div ref={ref} className="relative grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 lg:col-span-8">
            <div
              className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-3"
              style={{ color: 'var(--fl-brand-hover)' }}
            >
              Let's talk
            </div>
            <h2
              className="text-[34px] md:text-[48px] font-semibold tracking-tight leading-[1.05]"
              style={{ letterSpacing: '-0.025em' }}
            >
              Got a backend that needs an extra pair of hands?
            </h2>
            <p
              className="mt-3 max-w-xl text-[14px] leading-relaxed"
              style={{ color: 'var(--fl-fg-muted)' }}
            >
              Currently open to senior backend / staff engineering roles, fully remote.
              Quickest reply via email; LinkedIn works too.
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
  )
}

/* ============================== Footer ============================== */

function Footer() {
  return (
    <footer
      className="mt-16 border-t no-print"
      style={{ borderColor: 'var(--fl-stroke)', background: 'var(--fl-canvas-2)' }}
    >
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-10 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-2.5">
            <div
              className="grid h-9 w-9 place-items-center rounded-md text-[12px] font-semibold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, var(--fl-brand) 0%, var(--fl-brand-hover) 100%)',
                color: 'white',
              }}
            >
              DZ
            </div>
            <div>
              <div className="text-[14px] font-semibold tracking-tight">{cv.fullName}</div>
              <div className="text-[12px]" style={{ color: 'var(--fl-fg-muted)' }}>
                {cv.position}
              </div>
            </div>
          </div>
          <p
            className="mt-4 text-[13px] leading-relaxed max-w-md"
            style={{ color: 'var(--fl-fg-muted)' }}
          >
            Designed and built with React, Tailwind, and the Microsoft Fluent design language.
          </p>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-3"
            style={{ color: 'var(--fl-fg-subtle)' }}
          >
            Sections
          </div>
          <ul className="space-y-1.5 text-[13px]">
            {SECTIONS.slice(1).map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:underline" style={{ color: 'var(--fl-fg-muted)' }}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-4">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-3"
            style={{ color: 'var(--fl-fg-subtle)' }}
          >
            Connect
          </div>
          <ul className="space-y-1.5 text-[13px]">
            <li>
              <a
                href={`mailto:${cv.email}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground"
                style={{ color: 'var(--fl-fg-muted)' }}
              >
                <Mail size={13} /> {cv.email}
              </a>
            </li>
            <li>
              <a
                href={`https://${cv.linkedIn}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground"
                style={{ color: 'var(--fl-fg-muted)' }}
              >
                <Linkedin size={13} /> {cv.linkedIn}
              </a>
            </li>
            <li>
              <a
                href={`https://${cv.github}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground"
                style={{ color: 'var(--fl-fg-muted)' }}
              >
                <Github size={13} /> {cv.github}
              </a>
            </li>
          </ul>
        </div>

        <div
          className="col-span-12 pt-6 border-t flex items-center justify-between text-[11.5px]"
          style={{ borderColor: 'var(--fl-stroke)', color: 'var(--fl-fg-subtle)' }}
        >
          <span>© {new Date().getFullYear()} {cv.fullName}. All rights reserved.</span>
          <span className="tabular-nums">v 2.0 · Made in {cv.location.city}</span>
        </div>
      </div>
    </footer>
  )
}
