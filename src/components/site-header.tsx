import { useEffect, useState } from 'react'
import { Mail, Download, Sun, Moon, Briefcase, Wand2 } from 'lucide-react'
import { cv } from '@/data/cv'
import {
  PrimaryButton,
  SubtleButton,
  IconButton,
} from '@/components/ui/fluent'
import { useTheme } from '@/lib/hooks'

const NAV: { href: string; label: string; icon: typeof Briefcase }[] = [
  { href: '/work', label: 'Work', icon: Briefcase },
  { href: '/match', label: 'Match a job', icon: Wand2 },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, , toggleTheme] = useTheme()
  const [path, setPath] = useState(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/',
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const onPop = () => setPath(normalizePath(window.location.pathname))
    window.addEventListener('popstate', onPop)

    // Internal route changes don't fire popstate — we listen to a custom event
    // emitted by the router in App.tsx.
    const onRouteChange = () => setPath(normalizePath(window.location.pathname))
    window.addEventListener('cv:routechange', onRouteChange)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('cv:routechange', onRouteChange)
    }
  }, [])

  return (
    <header
      className={`fl-acrylic sticky top-0 z-40 transition-all no-print ${
        scrolled ? 'shadow-[0_1px_0_var(--fl-stroke)]' : ''
      }`}
    >
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 h-14 flex items-center justify-between gap-4">
        <a href="/" data-route className="flex items-center gap-2.5">
          <div
            className="grid h-8 w-8 place-items-center rounded-md text-[12px] font-semibold tracking-tight"
            style={{
              background:
                'linear-gradient(135deg, var(--fl-brand) 0%, var(--fl-brand-hover) 100%)',
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

        <nav className="hidden md:flex items-center gap-0.5 text-[13px]">
          {NAV.map((l) => {
            const active = path === l.href
            const Icon = l.icon
            return (
              <a
                key={l.href}
                href={l.href}
                data-route
                className="px-3 h-8 inline-flex items-center gap-1.5 rounded-md transition-colors"
                style={{
                  background: active ? 'var(--fl-brand-subtle)' : 'transparent',
                  color: active ? 'var(--fl-brand-hover)' : 'var(--fl-fg-muted)',
                  fontWeight: active ? 600 : 500,
                }}
                onMouseEnter={(e) => {
                  if (active) return
                  e.currentTarget.style.background = 'var(--fl-stroke-subtle)'
                  e.currentTarget.style.color = 'var(--fl-fg)'
                }}
                onMouseLeave={(e) => {
                  if (active) return
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--fl-fg-muted)'
                }}
              >
                <Icon size={13} strokeWidth={1.8} />
                {l.label}
              </a>
            )
          })}
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

function normalizePath(p: string): string {
  const trimmed = p.replace(/\/$/, '')
  return trimmed === '' ? '/' : trimmed
}
