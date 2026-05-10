import type { SVGProps } from 'react'
import {
  ArrowUpRight,
  ArrowRight,
  GitPullRequest,
  GitMerge,
  GitPullRequestClosed,
  Package,
  Plus,
  Minus,
  FileCode2,
  Calendar,
  TrendingUp,
  Boxes,
  Hammer,
  Sparkles,
  Network,
  Layers,
  Shapes,
  CircleDot,
} from 'lucide-react'

function CloudpadMark({ size = 22, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      {...rest}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="12" y="12" width="18" height="18" rx="3" fill="currentColor" />
    </svg>
  )
}
import { Github } from '@/components/brand-icons'
import { SiteHeader } from '@/components/site-header'
import { Card, Section, SectionHeader, Tag, Pill } from '@/components/ui/fluent'

// TODO: replace illustrative PRS / NUGETS entries with real data before launch.

type PRState = 'merged' | 'open' | 'closed'

interface PRItem {
  repo: string
  repoUrl: string
  prNumber: number
  prUrl: string
  title: string
  description: string
  state: PRState
  additions: number
  deletions: number
  filesChanged: number
  date: string
  labels: string[]
}

interface NuGetItem {
  name: string
  url: string
  version: string
  description: string
  totalDownloads: number
  publishedAt: string
  targetFrameworks: string[]
  tags: string[]
  highlight?: string
}

const PRS: PRItem[] = [
  {
    repo: 'dotnet/efcore',
    repoUrl: 'https://github.com/dotnet/efcore',
    prNumber: 33421,
    prUrl: 'https://github.com/dotnet/efcore',
    title: 'Surface tenant-scope hint in Migrate() for multi-tenant providers',
    description:
      'Adds an opt-in scoped-context overload so multi-tenant migration runners can pin a tenant id into the migration history table without carrying it through ambient state.',
    state: 'merged',
    additions: 248,
    deletions: 31,
    filesChanged: 9,
    date: '2025-09-14',
    labels: ['area-migrations', 'community'],
  },
  {
    repo: 'Azure/azure-functions-host',
    repoUrl: 'https://github.com/Azure/azure-functions-host',
    prNumber: 10142,
    prUrl: 'https://github.com/Azure/azure-functions-host',
    title: 'Fix cold-start regression with isolated worker assembly resolution',
    description:
      'Restores deterministic load order after a regression where the host briefly preferred the deps.json from a sibling extension bundle, causing intermittent type load exceptions on warm-up.',
    state: 'open',
    additions: 41,
    deletions: 8,
    filesChanged: 3,
    date: '2025-11-02',
    labels: ['bug', 'cold-start'],
  },
]

const NUGETS: NuGetItem[] = [
  {
    name: 'Dzhukovsky.Bootstrap.Web',
    url: 'https://www.nuget.org/packages',
    version: '2.4.1',
    description:
      'Opinionated baseline for ASP.NET Core microservices: Serilog, OpenTelemetry, problem-details, health checks, auth wiring and Service Bus background workers — one AddBootstrap() call.',
    totalDownloads: 14_280,
    publishedAt: '2025-10-20',
    targetFrameworks: ['net8.0', 'net9.0'],
    tags: ['microservices', 'aspnetcore', 'opinionated', 'observability'],
    highlight: 'Standard for new services across the platform.',
  },
  {
    name: 'Dzhukovsky.EfCore.MigrationsTool',
    url: 'https://www.nuget.org/packages',
    version: '1.3.0',
    description:
      'Standalone CLI to plan, apply and roll-back EF Core migrations from CI/CD without coupling to the application image — schema changes ship on their own pipeline.',
    totalDownloads: 7_140,
    publishedAt: '2025-08-04',
    targetFrameworks: ['net8.0'],
    tags: ['ef-core', 'cli', 'cicd', 'devops'],
    highlight: 'Decouples schema rollouts from app deploys.',
  },
]

export default function Work() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteHeader />

      <Hero />

      <main className="mx-auto max-w-[1180px] px-5 md:px-8">
        <FeaturedProject />
        <PullRequests />
        <Packages />
        <MoreContributions />
      </main>

      <Footer />
    </div>
  )
}

function Hero() {
  return (
    <section className="fl-mica relative no-print -mt-14 pt-14">
      <div className="absolute inset-0 fl-grid-bg pointer-events-none" />
      <div className="relative mx-auto max-w-[1180px] px-5 md:px-8 pt-10 pb-10 md:pt-16 md:pb-14">
        <Pill icon={Hammer} variant="brand" className="mb-4">
          Work · open source · contributions
        </Pill>
        <h1
          className="text-[34px] md:text-[52px] font-semibold tracking-tight leading-[1.05]"
          style={{ letterSpacing: '-0.025em' }}
        >
          Things I&rsquo;ve shipped <br className="hidden md:block" />
          <span style={{ color: 'var(--fl-fg-muted)' }}>outside the day job.</span>
        </h1>
        <p
          className="mt-4 max-w-2xl text-[14.5px] leading-relaxed"
          style={{ color: 'var(--fl-fg-muted)' }}
        >
          A running log of pull requests to .NET / Azure ecosystem projects and the NuGet
          packages I publish. Click any card to open the source.
        </p>
      </div>
    </section>
  )
}

const CLOUDPAD_TECH = [
  'React 19',
  'TypeScript',
  'Vite 8',
  'TanStack Router',
  'Zustand',
  'React Flow',
  'Tailwind 4',
  'shadcn/ui',
  'Azure Functions',
  'Azure EasyAuth',
  'Azure Static Web Apps',
]

const CLOUDPAD_HIGHLIGHTS: { icon: typeof Shapes; title: string; desc: string }[] = [
  {
    icon: Shapes,
    title: 'Diagram editor',
    desc: 'React Flow canvas — pan/zoom, undo/redo, keyboard shortcuts, auto-save, custom node + edge types.',
  },
  {
    icon: Layers,
    title: 'Native cloud icons',
    desc: 'Bundled Azure & Microsoft Fabric icon packs with searchable picker. AWS / GCP / custom packs on the way.',
  },
  {
    icon: Network,
    title: 'Embeds anywhere',
    desc: 'Server-side SVG and read-only iframes for Azure DevOps wiki, Microsoft Teams, Loop, plus Adaptive Cards.',
  },
]

const CLOUDPAD_ROADMAP: { ver: string; scope: string }[] = [
  { ver: 'v0.1', scope: 'Editor, icon packs, custom nodes' },
  { ver: 'v0.2', scope: 'Workspaces, Azure EasyAuth, API' },
  { ver: 'v0.3', scope: 'Server-side SVG export, sanitization' },
  { ver: 'v0.4', scope: 'Secure share links, audit log' },
  { ver: 'v0.5', scope: 'Teams / Loop / DevOps embeds' },
  { ver: 'v0.6', scope: 'Plans, billing, feature gating' },
]

function FeaturedProject() {
  return (
    <Section id="featured">
      <SectionHeader
        eyebrow="01 — Featured project"
        title="Currently building"
        description="A side project I'm building in the open — keeping the day-job's Microsoft / Azure muscle memory sharp."
      />

      <Card className="overflow-hidden" elevation={4} reveal>
        <div
          className="relative px-6 md:px-8 pt-6 pb-7 md:pt-8 md:pb-9 fl-mica"
          style={{ borderBottom: '1px solid var(--fl-stroke)' }}
        >
          <div className="absolute inset-0 fl-grid-bg pointer-events-none" />
          <div className="relative flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div
                className="grid place-items-center h-12 w-12 rounded-xl"
                style={{
                  background:
                    'linear-gradient(135deg, var(--fl-brand) 0%, var(--fl-brand-hover) 100%)',
                  color: 'white',
                  boxShadow: 'var(--fl-elev-4)',
                }}
                aria-hidden
              >
                <CloudpadMark size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className="text-[24px] md:text-[28px] font-semibold tracking-tight leading-none"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    cloudpad
                    <span style={{ color: 'var(--fl-brand)' }}>.dev</span>
                  </h3>
                  <Tag variant="brand">v0.1 · pre-release</Tag>
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium"
                    style={{ color: 'var(--fl-success)' }}
                  >
                    <CircleDot size={11} className="animate-pulse" />
                    Active development
                  </span>
                </div>
                <p
                  className="mt-1 text-[13.5px] md:text-[14.5px]"
                  style={{ color: 'var(--fl-fg-muted)' }}
                >
                  Modern architectural diagram builder with native cloud icon support and
                  embeddable exports.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://cloudpad.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-md text-[13px] font-semibold tracking-tight transition-colors"
                style={{
                  background: 'var(--fl-brand)',
                  color: 'white',
                  boxShadow:
                    'inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 1px 2px rgba(15, 108, 189, 0.18)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--fl-brand-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--fl-brand)')}
              >
                Open <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 px-6 md:px-8 py-6 md:py-7">
          <div className="lg:col-span-7">
            <div
              className="text-[10.5px] uppercase tracking-[0.16em] font-semibold mb-3"
              style={{ color: 'var(--fl-brand-hover)' }}
            >
              What it does
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CLOUDPAD_HIGHLIGHTS.map((h) => {
                const Icon = h.icon
                return (
                  <div
                    key={h.title}
                    className="rounded-md p-3"
                    style={{
                      background: 'var(--fl-canvas-2)',
                      border: '1px solid var(--fl-stroke-subtle)',
                    }}
                  >
                    <div
                      className="grid place-items-center h-7 w-7 rounded-md mb-2"
                      style={{
                        background: 'var(--fl-brand-subtle)',
                        color: 'var(--fl-brand-hover)',
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <div className="text-[13px] font-semibold tracking-tight">{h.title}</div>
                    <div
                      className="mt-1 text-[12px] leading-[1.55]"
                      style={{ color: 'var(--fl-fg-muted)' }}
                    >
                      {h.desc}
                    </div>
                  </div>
                )
              })}
            </div>

            <div
              className="text-[10.5px] uppercase tracking-[0.16em] font-semibold mt-6 mb-3"
              style={{ color: 'var(--fl-brand-hover)' }}
            >
              Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CLOUDPAD_TECH.map((t) => (
                <Tag key={t} variant="outline">
                  {t}
                </Tag>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="text-[10.5px] uppercase tracking-[0.16em] font-semibold mb-3"
              style={{ color: 'var(--fl-brand-hover)' }}
            >
              Roadmap
            </div>
            <ol
              className="rounded-md overflow-hidden"
              style={{ border: '1px solid var(--fl-stroke-subtle)' }}
            >
              {CLOUDPAD_ROADMAP.map((r, i) => {
                const current = i === 0
                return (
                  <li
                    key={r.ver}
                    className="grid grid-cols-[64px_1fr_18px] gap-3 items-center px-3 py-2.5 text-[12.5px]"
                    style={{
                      borderBottom:
                        i < CLOUDPAD_ROADMAP.length - 1
                          ? '1px solid var(--fl-stroke-subtle)'
                          : 'none',
                      background: current ? 'var(--fl-brand-subtle)' : 'transparent',
                    }}
                  >
                    <span
                      className="font-mono tabular-nums"
                      style={{
                        color: current ? 'var(--fl-brand-hover)' : 'var(--fl-fg-muted)',
                        fontWeight: current ? 600 : 500,
                      }}
                    >
                      {r.ver}
                    </span>
                    <span
                      style={{
                        color: current ? 'var(--fl-fg)' : 'var(--fl-fg-muted)',
                      }}
                    >
                      {r.scope}
                    </span>
                    {current ? (
                      <Sparkles size={13} style={{ color: 'var(--fl-brand-hover)' }} />
                    ) : (
                      <span
                        className="h-1.5 w-1.5 rounded-full justify-self-center"
                        style={{ background: 'var(--fl-stroke-strong)' }}
                      />
                    )}
                  </li>
                )
              })}
            </ol>

            <a
              href="https://cloudpad.dev"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold hover:underline"
              style={{ color: 'var(--fl-brand-hover)' }}
            >
              Visit cloudpad.dev
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </Card>
    </Section>
  )
}

function PullRequests() {
  return (
    <Section id="prs">
      <SectionHeader
        eyebrow="02 — Pull requests"
        title="Upstream contributions"
        description="Patches sent to .NET, Azure and adjacent OSS. Status, diff size, area labels."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PRS.map((pr) => (
          <PRCard key={pr.prUrl} pr={pr} />
        ))}
      </div>
    </Section>
  )
}

function PRCard({ pr }: { pr: PRItem }) {
  const stateMeta = stateInfo(pr.state)
  const StateIcon = stateMeta.icon

  return (
    <a href={pr.prUrl} target="_blank" rel="noreferrer" className="block group">
      <Card hoverable reveal className="p-5 md:p-6 h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="grid place-items-center h-9 w-9 rounded-lg"
              style={{
                background: stateMeta.bg,
                color: stateMeta.fg,
              }}
            >
              <StateIcon size={16} />
            </div>
            <div>
              <div
                className="text-[10.5px] uppercase tracking-[0.16em] font-semibold"
                style={{ color: stateMeta.fg }}
              >
                {stateMeta.label}
              </div>
              <a
                href={pr.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[12.5px] font-mono hover:underline"
                style={{ color: 'var(--fl-fg-muted)' }}
              >
                {pr.repo}
              </a>
            </div>
          </div>
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            style={{ color: 'var(--fl-fg-subtle)' }}
          />
        </div>

        <h3 className="mt-4 text-[16px] md:text-[17px] font-semibold leading-snug tracking-tight">
          {pr.title}{' '}
          <span
            className="text-[13px] font-mono font-normal align-middle"
            style={{ color: 'var(--fl-fg-subtle)' }}
          >
            #{pr.prNumber}
          </span>
        </h3>

        <p
          className="mt-2 text-[13.5px] leading-[1.65]"
          style={{ color: 'var(--fl-fg-muted)' }}
        >
          {pr.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-center gap-1.5 text-[12px] tabular-nums">
            <Plus size={12} className="text-emerald-600" />
            <span style={{ color: 'var(--fl-fg)' }}>{pr.additions.toLocaleString()}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] tabular-nums">
            <Minus size={12} className="text-rose-600" />
            <span style={{ color: 'var(--fl-fg)' }}>{pr.deletions.toLocaleString()}</span>
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-[12px] tabular-nums"
            style={{ color: 'var(--fl-fg-muted)' }}
          >
            <FileCode2 size={12} />
            {pr.filesChanged} files
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-[12px]"
            style={{ color: 'var(--fl-fg-muted)' }}
          >
            <Calendar size={12} />
            {formatDate(pr.date)}
          </span>
        </div>

        {pr.labels.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {pr.labels.map((l) => (
              <Tag key={l} variant="outline">
                {l}
              </Tag>
            ))}
          </div>
        )}
      </Card>
    </a>
  )
}

function stateInfo(s: PRState) {
  switch (s) {
    case 'merged':
      return {
        label: 'Merged',
        icon: GitMerge,
        bg: 'rgba(147, 51, 234, 0.10)',
        fg: '#7E22CE',
      }
    case 'open':
      return {
        label: 'Open',
        icon: GitPullRequest,
        bg: 'rgba(16, 185, 129, 0.10)',
        fg: '#047857',
      }
    case 'closed':
      return {
        label: 'Closed',
        icon: GitPullRequestClosed,
        bg: 'rgba(220, 38, 38, 0.10)',
        fg: '#B91C1C',
      }
  }
}

function Packages() {
  return (
    <Section id="nugets">
      <SectionHeader
        eyebrow="03 — NuGet packages"
        title="Published libraries"
        description="Internal-tooling shaped into reusable packages. Stable APIs, semver, target frameworks listed."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {NUGETS.map((p) => (
          <NuGetCard key={p.name} p={p} />
        ))}
      </div>
    </Section>
  )
}

function NuGetCard({ p }: { p: NuGetItem }) {
  return (
    <a href={p.url} target="_blank" rel="noreferrer" className="block group">
      <Card hoverable reveal className="p-5 md:p-6 h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="grid place-items-center h-9 w-9 rounded-lg"
              style={{
                background: 'var(--fl-brand-subtle)',
                color: 'var(--fl-brand-hover)',
              }}
            >
              <Package size={16} />
            </div>
            <div>
              <div
                className="text-[10.5px] uppercase tracking-[0.16em] font-semibold"
                style={{ color: 'var(--fl-brand-hover)' }}
              >
                NuGet
              </div>
              <div
                className="text-[12.5px] font-mono"
                style={{ color: 'var(--fl-fg-muted)' }}
              >
                v{p.version}
              </div>
            </div>
          </div>
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            style={{ color: 'var(--fl-fg-subtle)' }}
          />
        </div>

        <h3 className="mt-4 text-[15.5px] md:text-[16.5px] font-semibold leading-snug tracking-tight font-mono">
          {p.name}
        </h3>

        <p
          className="mt-2 text-[13.5px] leading-[1.65]"
          style={{ color: 'var(--fl-fg-muted)' }}
        >
          {p.description}
        </p>

        {p.highlight && (
          <div
            className="mt-3 text-[12.5px] italic"
            style={{ color: 'var(--fl-brand-hover)' }}
          >
            “{p.highlight}”
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-center gap-1.5 text-[12px] tabular-nums">
            <TrendingUp size={12} style={{ color: 'var(--fl-brand)' }} />
            <span style={{ color: 'var(--fl-fg)' }}>
              {p.totalDownloads.toLocaleString()}
            </span>
            <span style={{ color: 'var(--fl-fg-muted)' }}>downloads</span>
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-[12px]"
            style={{ color: 'var(--fl-fg-muted)' }}
          >
            <Calendar size={12} />
            {formatDate(p.publishedAt)}
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-[12px]"
            style={{ color: 'var(--fl-fg-muted)' }}
          >
            <Boxes size={12} />
            {p.targetFrameworks.join(', ')}
          </span>
        </div>

        {p.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <Tag key={t} variant="outline">
                {t}
              </Tag>
            ))}
          </div>
        )}
      </Card>
    </a>
  )
}

function MoreContributions() {
  return (
    <Section id="more">
      <SectionHeader
        eyebrow="04 — Beyond"
        title="Other artefacts"
      />
      <Card className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-[16px] font-semibold tracking-tight">
              Talks, write-ups, sample apps
            </h3>
            <p
              className="mt-2 text-[13.5px] leading-[1.7] max-w-xl"
              style={{ color: 'var(--fl-fg-muted)' }}
            >
              Internal tech talks on EF Core migrations strategy and Azure DevOps Helm
              templates, plus a few demo repositories showing the patterns in isolation.
              Coming soon to this page.
            </p>
          </div>
          <a
            href="https://github.com/dzhukovsky"
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg p-4 transition-colors"
            style={{
              background: 'var(--fl-canvas-2)',
              border: '1px solid var(--fl-stroke)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <Github size={16} style={{ color: 'var(--fl-fg)' }} />
              <ArrowUpRight size={14} style={{ color: 'var(--fl-fg-subtle)' }} />
            </div>
            <div className="text-[13px] font-semibold">github.com/dzhukovsky</div>
            <div className="text-[12px] mt-1" style={{ color: 'var(--fl-fg-muted)' }}>
              Full activity feed and demo repos.
            </div>
          </a>
        </div>
      </Card>
    </Section>
  )
}

function Footer() {
  return (
    <footer
      className="mt-16 border-t no-print"
      style={{ borderColor: 'var(--fl-stroke)', background: 'var(--fl-canvas-2)' }}
    >
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-8 flex items-center justify-between text-[12px]">
        <span style={{ color: 'var(--fl-fg-muted)' }}>
          © {new Date().getFullYear()} Dmitry Zhukovsky
        </span>
        <a
          href="/"
          data-route
          className="font-medium hover:underline"
          style={{ color: 'var(--fl-brand-hover)' }}
        >
          ← Back to portfolio
        </a>
      </div>
    </footer>
  )
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
