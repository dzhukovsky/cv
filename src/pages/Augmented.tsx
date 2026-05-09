import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Check,
  Code2,
  Compass,
  FileSearch,
  GitPullRequest,
  Lightbulb,
  Notebook,
  Quote,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { Card, Pill, Section, SectionHeader, Tag } from '@/components/ui/fluent'

/* ----------------------------- Page ----------------------------- */

export default function Augmented() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteHeader />

      <Hero />

      <main className="mx-auto max-w-[1080px] px-5 md:px-8">
        <Stance />
        <UseCases />
        <Tools />
        <Boundaries />
      </main>

      <Footer />
    </div>
  )
}

/* ----------------------------- Hero ----------------------------- */

function Hero() {
  return (
    <section className="fl-mica relative no-print -mt-14 pt-14">
      <div className="absolute inset-0 fl-grid-bg pointer-events-none" />
      <div className="relative mx-auto max-w-[1080px] px-5 md:px-8 pt-10 pb-10 md:pt-16 md:pb-14">
        <Pill icon={Sparkles} variant="brand" className="mb-4">
          Augmented · how I work with AI
        </Pill>
        <h1
          className="text-[34px] md:text-[52px] font-semibold tracking-tight leading-[1.05]"
          style={{ letterSpacing: '-0.025em' }}
        >
          A sharper tool, <br className="hidden md:block" />
          <span style={{ color: 'var(--fl-fg-muted)' }}>not a different craft.</span>
        </h1>
        <p
          className="mt-4 max-w-2xl text-[14.5px] leading-relaxed"
          style={{ color: 'var(--fl-fg-muted)' }}
        >
          AI is part of my day. It speeds up the parts that don&rsquo;t need a senior engineer&rsquo;s
          attention so the parts that do can get more of it. No hype, no replacing
          fundamentals — just an honest look at where it earns its keep and where I keep my
          hands on the wheel.
        </p>
      </div>
    </section>
  )
}

/* ----------------------------- Stance ----------------------------- */

function Stance() {
  return (
    <Section id="stance">
      <Card className="p-6 md:p-8" elevation={4} reveal>
        <div className="flex items-start gap-4">
          <div
            className="grid place-items-center h-10 w-10 rounded-md shrink-0"
            style={{
              background: 'var(--fl-brand-subtle)',
              color: 'var(--fl-brand-hover)',
            }}
            aria-hidden
          >
            <Quote size={18} />
          </div>
          <div>
            <p className="text-[16px] md:text-[17px] leading-[1.65] font-medium tracking-tight">
              I treat AI like a fast, eager intern: brilliant at first drafts, useful for
              sanity-checks, and absolutely not the person who signs off the production
              deploy. The judgement, the architecture, the trade-offs — those still belong
              to the engineer.
            </p>
          </div>
        </div>
      </Card>
    </Section>
  )
}

/* ----------------------------- Use cases ----------------------------- */

interface UseCase {
  icon: LucideIcon
  title: string
  desc: string
  example: string
}

const USE_CASES: UseCase[] = [
  {
    icon: Code2,
    title: 'First-draft scaffolding',
    desc: 'DTOs, mappers, EF Core configurations, test fixtures — the mechanical parts where the shape is obvious and typing it out is just friction.',
    example: 'Generate a Result<T> mapper between domain and contract layers.',
  },
  {
    icon: FileSearch,
    title: 'Reading unfamiliar code',
    desc: 'Quickly map out a foreign codebase or framework — call graphs, lifecycle hooks, where state is mutated. Faster than spelunking through files cold.',
    example: 'Trace how a request flows through a legacy ASP.NET pipeline.',
  },
  {
    icon: GitPullRequest,
    title: 'Pre-PR sanity checks',
    desc: 'A second pair of eyes before opening a PR. Spots silly bugs, missing null-checks, inconsistent error handling — the things that waste reviewer time.',
    example: 'Review a diff for race conditions and obvious edge cases.',
  },
  {
    icon: Notebook,
    title: 'Documentation that ages well',
    desc: 'Drafting ADRs, runbooks, and onboarding notes from a rough outline. I edit heavily — the model gets structure right, I get the nuance right.',
    example: 'Turn meeting notes into an ADR with options and trade-offs.',
  },
  {
    icon: Workflow,
    title: 'Refactor exploration',
    desc: 'Trying out a refactor before committing to it. Cheap to ask "what would this look like as X" and discard the answer if it&rsquo;s the wrong shape.',
    example: 'Sketch a state-machine version of a tangled flow.',
  },
  {
    icon: Lightbulb,
    title: 'Rubber-ducking, but talkative',
    desc: 'Think out loud at it. The act of explaining the problem clearly already solves half the bugs — the model occasionally surfaces the other half.',
    example: 'Walk through an integration bug step by step until it clicks.',
  },
]

function UseCases() {
  return (
    <Section id="use-cases">
      <SectionHeader
        eyebrow="01 — What I actually use it for"
        title="Where AI earns its keep"
        description="Six honest, day-to-day uses. Not a prediction of the future — what shipped code looks like this week."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {USE_CASES.map((u) => {
          const Icon = u.icon
          return (
            <Card key={u.title} className="p-5 h-full" reveal hoverable>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="grid place-items-center h-8 w-8 rounded-md"
                  style={{
                    background: 'var(--fl-brand-subtle)',
                    color: 'var(--fl-brand-hover)',
                  }}
                >
                  <Icon size={15} />
                </div>
              </div>
              <div className="text-[14.5px] font-semibold tracking-tight">{u.title}</div>
              <p
                className="mt-1.5 text-[13px] leading-[1.6]"
                style={{ color: 'var(--fl-fg-muted)' }}
              >
                {u.desc}
              </p>
              <div
                className="mt-4 pt-3 text-[12px] italic leading-[1.55]"
                style={{
                  color: 'var(--fl-fg-subtle)',
                  borderTop: '1px solid var(--fl-stroke-subtle)',
                }}
              >
                e.g. {u.example}
              </div>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}

/* ----------------------------- Tools ----------------------------- */

interface Tool {
  name: string
  role: string
  desc: string
  url: string
  cadence: 'daily' | 'weekly' | 'occasional'
}

const TOOLS: Tool[] = [
  {
    name: 'Claude Code',
    role: 'Agent in the terminal',
    desc: 'Multi-step tasks across the repo: rename, refactor, port, write tests against existing code. Lives in the project, reads the code, runs the build.',
    url: 'https://claude.com/claude-code',
    cadence: 'daily',
  },
  {
    name: 'GitHub Copilot',
    role: 'Inline completions',
    desc: 'Tab-completion in Rider and VS Code. Best at the boring middle of a function — argument lists, well-named one-liners, predictable boilerplate.',
    url: 'https://github.com/features/copilot',
    cadence: 'daily',
  },
  {
    name: 'Claude · ChatGPT',
    role: 'Web chat',
    desc: 'Open-ended thinking with diagrams, longer reasoning, comparing options. Used when I want a conversation, not a code edit.',
    url: 'https://claude.ai',
    cadence: 'daily',
  },
  {
    name: 'Cursor',
    role: 'AI-native editor',
    desc: 'Tried it for greenfield work. Strong inline diff UX. I keep coming back to Rider for .NET, but Cursor stays installed for fast prototypes.',
    url: 'https://cursor.com',
    cadence: 'occasional',
  },
  {
    name: 'JetBrains AI Assistant',
    role: 'Rider integration',
    desc: 'Native to my main IDE. Useful for in-context refactors and explanations without leaving the editor. Quality is improving release-by-release.',
    url: 'https://www.jetbrains.com/ai/',
    cadence: 'weekly',
  },
  {
    name: 'MCP servers',
    role: 'Custom tooling',
    desc: 'Wired Claude Code into project-specific context — internal docs, ticket systems, the codebase index. Where the productivity ceiling actually moves.',
    url: 'https://modelcontextprotocol.io',
    cadence: 'weekly',
  },
]

const CADENCE_META: Record<
  Tool['cadence'],
  { label: string; bg: string; fg: string }
> = {
  daily: {
    label: 'Daily',
    bg: 'rgba(16, 185, 129, 0.12)',
    fg: '#047857',
  },
  weekly: {
    label: 'Weekly',
    bg: 'var(--fl-brand-subtle)',
    fg: 'var(--fl-brand-hover)',
  },
  occasional: {
    label: 'Occasional',
    bg: 'var(--fl-canvas-2)',
    fg: 'var(--fl-fg-muted)',
  },
}

function Tools() {
  return (
    <Section id="tools">
      <SectionHeader
        eyebrow="02 — Tools in rotation"
        title="What&rsquo;s installed, what gets used"
        description="The list moves. Tools come and go faster than frameworks did. These are the ones currently earning a place on the dock."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TOOLS.map((t) => {
          const meta = CADENCE_META[t.cadence]
          return (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noreferrer"
              className="block group"
            >
              <Card hoverable reveal className="p-5 h-full">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="grid place-items-center h-9 w-9 rounded-lg"
                      style={{
                        background: 'var(--fl-brand-subtle)',
                        color: 'var(--fl-brand-hover)',
                      }}
                    >
                      <Bot size={16} />
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold tracking-tight">
                        {t.name}
                      </div>
                      <div
                        className="text-[12px]"
                        style={{ color: 'var(--fl-fg-muted)' }}
                      >
                        {t.role}
                      </div>
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center h-6 px-2 rounded text-[11px] font-medium shrink-0"
                    style={{ background: meta.bg, color: meta.fg }}
                  >
                    {meta.label}
                  </span>
                </div>

                <p
                  className="mt-4 text-[13px] leading-[1.6]"
                  style={{ color: 'var(--fl-fg-muted)' }}
                >
                  {t.desc}
                </p>
              </Card>
            </a>
          )
        })}
      </div>
    </Section>
  )
}

/* ----------------------------- Boundaries ----------------------------- */

interface Rule {
  text: string
  why: string
}

const DOES: Rule[] = [
  {
    text: 'Read every diff before it lands',
    why: 'AI authorship doesn’t bypass code review — mine or anyone else’s.',
  },
  {
    text: 'Keep ownership of architecture',
    why: 'Trade-off decisions need context the model doesn’t have.',
  },
  {
    text: 'Treat tests as the spec',
    why: 'Generated tests are great drafts, but I write the assertions that matter.',
  },
  {
    text: 'Use it most where stakes are lowest',
    why: 'Scaffolding, exploration, drafts. Highest leverage, smallest blast radius.',
  },
]

const DOESNT: Rule[] = [
  {
    text: 'Auto-merge agent output',
    why: 'Speed without review is just faster bugs.',
  },
  {
    text: 'Paste proprietary code into public chats',
    why: 'Use enterprise-policied tools or local models for anything sensitive.',
  },
  {
    text: 'Skip learning the fundamentals',
    why: 'You can’t review code you don’t understand. The reps still matter.',
  },
  {
    text: 'Outsource taste',
    why: 'A model averages the corpus. Good code design is a deliberate choice.',
  },
]

function Boundaries() {
  return (
    <Section id="boundaries">
      <SectionHeader
        eyebrow="03 — Where I draw the line"
        title="Calibrated, not converted"
        description="Following the trend is easy. Knowing where it stops paying off is the part that takes practice."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <RulesCard
          icon={ShieldCheck}
          title="What I do"
          tone="success"
          rules={DOES}
        />
        <RulesCard icon={Compass} title="What I don’t" tone="warning" rules={DOESNT} />
      </div>
    </Section>
  )
}

function RulesCard({
  icon: Icon,
  title,
  tone,
  rules,
}: {
  icon: LucideIcon
  title: string
  tone: 'success' | 'warning'
  rules: Rule[]
}) {
  const isOk = tone === 'success'
  const accent = isOk ? '#047857' : '#B45309'
  const accentBg = isOk ? 'rgba(16, 185, 129, 0.10)' : 'rgba(245, 158, 11, 0.10)'
  const Mark = isOk ? Check : X

  return (
    <Card className="p-5 md:p-6 h-full" reveal>
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="grid place-items-center h-9 w-9 rounded-lg"
          style={{ background: accentBg, color: accent }}
        >
          <Icon size={16} />
        </div>
        <div>
          <div
            className="text-[10.5px] uppercase tracking-[0.16em] font-semibold"
            style={{ color: accent }}
          >
            {isOk ? 'Practices' : 'Anti-patterns'}
          </div>
          <div className="text-[15px] font-semibold tracking-tight">{title}</div>
        </div>
      </div>

      <ul className="space-y-3.5">
        {rules.map((r) => (
          <li key={r.text} className="flex items-start gap-2.5">
            <Mark
              size={14}
              className="mt-0.5 shrink-0"
              style={{ color: accent }}
              strokeWidth={2.5}
            />
            <div>
              <div className="text-[13.5px] font-medium leading-snug">{r.text}</div>
              <div
                className="mt-0.5 text-[12px] leading-[1.55]"
                style={{ color: 'var(--fl-fg-muted)' }}
              >
                {r.why}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* ----------------------------- Footer ----------------------------- */

function Footer() {
  return (
    <footer
      className="mt-16 border-t no-print"
      style={{ borderColor: 'var(--fl-stroke)', background: 'var(--fl-canvas-2)' }}
    >
      <div className="mx-auto max-w-[1080px] px-5 md:px-8 py-8 flex items-center justify-between gap-4 flex-wrap text-[12px]">
        <span style={{ color: 'var(--fl-fg-muted)' }}>
          © {new Date().getFullYear()} Dmitry Zhukovsky
        </span>
        <span
          className="inline-flex items-center gap-1.5"
          style={{ color: 'var(--fl-fg-subtle)' }}
        >
          <Tag variant="outline">This page is honest, not exhaustive</Tag>
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
