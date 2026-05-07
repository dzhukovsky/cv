import { useState } from 'react'
import {
  Wand2,
  Sparkles,
  ScanSearch,
  Scissors,
  Lock,
  ArrowRight,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { Card, Pill, Tag } from '@/components/ui/fluent'

const SAMPLE = `Senior Backend Engineer (.NET) — Remote · EU
We're looking for a senior engineer to lead the backend of our payments platform.
Required: C#, ASP.NET Core, EF Core, Azure (App Service, Service Bus), Kubernetes.
Nice to have: Helm, Microsoft Fabric, multi-tenant SaaS background.`

export default function MatchJob() {
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const ready = wordCount >= 20

  const onTrim = () => {
    if (!ready || busy) return
    setBusy(true)
    // No-op for now — this hook will run the real adapter later.
    window.setTimeout(() => setBusy(false), 700)
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteHeader />

      <Hero />

      <main className="mx-auto max-w-[860px] px-5 md:px-8 pt-2 pb-20">
        <Card className="p-5 md:p-7" elevation={4}>
          <div className="flex items-baseline justify-between mb-3">
            <label
              htmlFor="jd"
              className="text-[12px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: 'var(--fl-fg-muted)' }}
            >
              Job description
            </label>
            <button
              type="button"
              onClick={() => setText(SAMPLE)}
              className="text-[11.5px] font-medium hover:underline"
              style={{ color: 'var(--fl-brand-hover)' }}
            >
              Paste sample
            </button>
          </div>

          <textarea
            id="jd"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the role's responsibilities, must-haves, nice-to-haves… anything text-shaped."
            rows={14}
            className="w-full rounded-md p-3 text-[13.5px] leading-[1.6] resize-y outline-none transition-colors"
            style={{
              background: 'var(--fl-canvas-2)',
              border: '1px solid var(--fl-stroke)',
              color: 'var(--fl-fg)',
              fontFamily: 'var(--font-sans)',
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = 'var(--fl-brand)')
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = 'var(--fl-stroke)')
            }
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[12px]" style={{ color: 'var(--fl-fg-muted)' }}>
              <span className="inline-flex items-center gap-1.5">
                <Lock size={12} /> Stays in your browser
              </span>
              <span style={{ color: 'var(--fl-stroke)' }}>·</span>
              <span className="tabular-nums">
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
              </span>
            </div>

            <button
              type="button"
              disabled={!ready || busy}
              onClick={onTrim}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-md text-[13.5px] font-semibold tracking-tight transition-colors disabled:cursor-not-allowed"
              style={{
                background: ready ? 'var(--fl-brand)' : 'var(--fl-stroke-subtle)',
                color: ready ? 'white' : 'var(--fl-fg-disabled)',
                boxShadow: ready
                  ? 'inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 1px 2px rgba(15, 108, 189, 0.18)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (!ready || busy) return
                e.currentTarget.style.background = 'var(--fl-brand-hover)'
              }}
              onMouseLeave={(e) => {
                if (!ready || busy) return
                e.currentTarget.style.background = 'var(--fl-brand)'
              }}
            >
              {busy ? (
                <Sparkles size={14} className="animate-pulse" />
              ) : (
                <Scissors size={14} />
              )}
              {busy ? 'Adapting…' : 'Trim & adapt'}
              {!busy && <ArrowRight size={14} />}
            </button>
          </div>

          {!ready && wordCount > 0 && (
            <div
              className="mt-3 text-[11.5px]"
              style={{ color: 'var(--fl-fg-subtle)' }}
            >
              At least 20 words to get a meaningful match — paste a fuller description.
            </div>
          )}
        </Card>

        <HowItWorks />
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
      <div className="relative mx-auto max-w-[860px] px-5 md:px-8 pt-10 pb-8 md:pt-16 md:pb-10">
        <Pill icon={Wand2} variant="brand" className="mb-4">
          Tailor the CV to your role
        </Pill>
        <h1
          className="text-[34px] md:text-[48px] font-semibold tracking-tight leading-[1.05]"
          style={{ letterSpacing: '-0.025em' }}
        >
          Match a job
        </h1>
        <p
          className="mt-3 max-w-2xl text-[14.5px] leading-relaxed"
          style={{ color: 'var(--fl-fg-muted)' }}
        >
          Paste a job description below and we&rsquo;ll trim the CV to the parts that matter
          for that role — relevant projects, the right slice of the stack, removing the noise.
        </p>
      </div>
    </section>
  )
}

/* ----------------------------- How it works ----------------------------- */

function HowItWorks() {
  const steps: { icon: typeof ScanSearch; title: string; desc: string }[] = [
    {
      icon: ScanSearch,
      title: 'Read the role',
      desc: 'Identify must-have technologies, seniority signals, the domain (fintech, telecom, publishing).',
    },
    {
      icon: Scissors,
      title: 'Trim the CV',
      desc: 'Drop projects and tools that don’t apply. Re-order so the most relevant story comes first.',
    },
    {
      icon: Sparkles,
      title: 'Adapt the wording',
      desc: 'Re-phrase the summary and contributions to mirror the language of the role.',
    },
  ]

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[14px] font-semibold tracking-tight">How it works</h2>
        <Tag variant="outline">Coming soon</Tag>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <Card key={s.title} className="p-5 h-full" reveal hoverable>
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
                <div
                  className="text-[10.5px] uppercase tracking-[0.16em] font-semibold tabular-nums"
                  style={{ color: 'var(--fl-fg-subtle)' }}
                >
                  0{i + 1}
                </div>
              </div>
              <div className="text-[14px] font-semibold tracking-tight">{s.title}</div>
              <div
                className="mt-1.5 text-[12.5px] leading-relaxed"
                style={{ color: 'var(--fl-fg-muted)' }}
              >
                {s.desc}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

/* ----------------------------- Footer ----------------------------- */

function Footer() {
  return (
    <footer
      className="mt-16 border-t no-print"
      style={{ borderColor: 'var(--fl-stroke)', background: 'var(--fl-canvas-2)' }}
    >
      <div className="mx-auto max-w-[860px] px-5 md:px-8 py-8 flex items-center justify-between text-[12px]">
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
