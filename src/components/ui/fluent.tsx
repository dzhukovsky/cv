import type { ReactNode, ComponentType, AnchorHTMLAttributes } from 'react'
import { useReveal } from '@/lib/hooks'

type IconC = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>

/* ---------------- Card ---------------- */

export function Card({
  children,
  className = '',
  hoverable = false,
  elevation = 2,
  reveal = false,
  bare = false,
}: {
  children: ReactNode
  className?: string
  hoverable?: boolean
  elevation?: 2 | 4 | 8 | 16
  reveal?: boolean
  bare?: boolean
}) {
  return (
    <div
      className={`relative rounded-lg ${reveal ? 'fl-reveal' : ''} ${className}`}
      style={{
        background: bare ? 'transparent' : 'var(--fl-card)',
        border: bare ? 'none' : '1px solid var(--fl-stroke)',
        boxShadow: bare
          ? undefined
          : elevation === 16
          ? 'var(--fl-elev-16)'
          : elevation === 8
          ? 'var(--fl-elev-8)'
          : elevation === 4
          ? 'var(--fl-elev-4)'
          : 'var(--fl-elev-2)',
        transition: 'box-shadow 200ms ease, transform 200ms ease, border-color 200ms ease',
      }}
      onMouseEnter={(e) => {
        if (!hoverable) return
        e.currentTarget.style.boxShadow = 'var(--fl-elev-16)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        if (!hoverable) return
        e.currentTarget.style.boxShadow =
          elevation === 16 ? 'var(--fl-elev-16)' : elevation === 8 ? 'var(--fl-elev-8)' : elevation === 4 ? 'var(--fl-elev-4)' : 'var(--fl-elev-2)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {children}
    </div>
  )
}

/* ---------------- Buttons ---------------- */

type BtnProps = {
  children: ReactNode
  icon?: IconC
  iconRight?: IconC
  size?: 'sm' | 'md' | 'lg'
  className?: string
  ariaLabel?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'aria-label'>

const sizeCls: Record<NonNullable<BtnProps['size']>, string> = {
  sm: 'h-7 px-2.5 text-[12px]',
  md: 'h-8 px-3 text-[13px]',
  lg: 'h-10 px-4 text-[14px]',
}
const iconSize: Record<NonNullable<BtnProps['size']>, number> = {
  sm: 13,
  md: 14,
  lg: 16,
}

export function PrimaryButton({
  children,
  icon: Icon,
  iconRight: IconRight,
  size = 'md',
  className = '',
  ariaLabel,
  ...a
}: BtnProps) {
  const Sz = iconSize[size]
  return (
    <a
      {...a}
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-1.5 rounded-md font-semibold tracking-tight transition-colors ${sizeCls[size]} ${className}`}
      style={{
        background: 'var(--fl-brand)',
        color: 'white',
        boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 1px 2px rgba(15, 108, 189, 0.18)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--fl-brand-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--fl-brand)')}
    >
      {Icon && <Icon size={Sz} />}
      {children}
      {IconRight && <IconRight size={Sz} />}
    </a>
  )
}

export function SubtleButton({
  children,
  icon: Icon,
  iconRight: IconRight,
  size = 'md',
  className = '',
  ariaLabel,
  ...a
}: BtnProps) {
  const Sz = iconSize[size]
  return (
    <a
      {...a}
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-1.5 rounded-md font-medium border transition-colors ${sizeCls[size]} ${className}`}
      style={{
        background: 'var(--fl-card)',
        color: 'var(--fl-fg)',
        borderColor: 'var(--fl-stroke)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--fl-canvas-2)'
        e.currentTarget.style.borderColor = 'var(--fl-stroke-strong)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--fl-card)'
        e.currentTarget.style.borderColor = 'var(--fl-stroke)'
      }}
    >
      {Icon && <Icon size={Sz} className="text-[color:var(--fl-fg-muted)]" />}
      {children}
      {IconRight && <IconRight size={Sz} className="text-[color:var(--fl-fg-muted)]" />}
    </a>
  )
}

export function IconButton({
  icon: Icon,
  ariaLabel,
  size = 'md',
  className = '',
  active,
  ...a
}: Omit<BtnProps, 'children'> & { icon: IconC; active?: boolean }) {
  const dim = size === 'sm' ? 28 : size === 'lg' ? 40 : 32
  const Sz = iconSize[size]
  return (
    <a
      {...a}
      aria-label={ariaLabel}
      className={`grid place-items-center rounded-md transition-colors ${className}`}
      style={{
        height: dim,
        width: dim,
        background: active ? 'var(--fl-brand-subtle)' : 'transparent',
        color: active ? 'var(--fl-brand-hover)' : 'var(--fl-fg-muted)',
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
      <Icon size={Sz} />
    </a>
  )
}

/* ---------------- Tags / Pills ---------------- */

export function Tag({
  children,
  variant = 'subtle',
  className = '',
}: {
  children: ReactNode
  variant?: 'subtle' | 'brand' | 'outline' | 'success' | 'warning'
  className?: string
}) {
  const styles: Record<typeof variant, React.CSSProperties> = {
    subtle: {
      background: 'var(--fl-canvas-2)',
      color: 'var(--fl-fg)',
    },
    brand: {
      background: 'var(--fl-brand-subtle)',
      color: 'var(--fl-brand-hover)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--fl-fg-muted)',
      border: '1px solid var(--fl-stroke)',
    },
    success: {
      background: 'var(--fl-success-subtle)',
      color: 'var(--fl-success)',
    },
    warning: {
      background: 'var(--fl-warning-subtle)',
      color: 'var(--fl-warning)',
    },
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-1.5 rounded text-[11.5px] font-medium leading-3 ${className}`}
      style={styles[variant]}
    >
      {children}
    </span>
  )
}

export function Pill({
  children,
  icon: Icon,
  variant = 'subtle',
  className = '',
}: {
  children: ReactNode
  icon?: IconC
  variant?: 'subtle' | 'brand' | 'outline' | 'success'
  className?: string
}) {
  const styles: Record<typeof variant, React.CSSProperties> = {
    subtle: {
      background: 'var(--fl-canvas-2)',
      color: 'var(--fl-fg)',
    },
    brand: {
      background: 'var(--fl-brand-subtle)',
      color: 'var(--fl-brand-hover)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--fl-fg-muted)',
      border: '1px solid var(--fl-stroke)',
    },
    success: {
      background: 'var(--fl-success-subtle)',
      color: 'var(--fl-success)',
    },
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[12px] font-medium ${className}`}
      style={styles[variant]}
    >
      {Icon && <Icon size={12} />}
      {children}
    </span>
  )
}

/* ---------------- Section ---------------- */

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-6">
      <div>
        <div
          className="text-[11px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: 'var(--fl-brand-hover)' }}
        >
          {eyebrow}
        </div>
        <h2 className="mt-1 text-[26px] md:text-[32px] font-semibold tracking-tight leading-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-xl text-[13.5px] text-[color:var(--fl-fg-muted)] leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      id={id}
      ref={ref}
      className={`fl-anchor fl-rise pt-14 md:pt-20 ${className}`}
    >
      {children}
    </section>
  )
}

/* ---------------- Progress ---------------- */

export function ProgressBar({
  value,
  max = 100,
  color,
  height = 4,
}: {
  value: number
  max?: number
  color?: string
  height?: number
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div
      className="w-full rounded-full overflow-hidden"
      style={{ background: 'var(--fl-stroke-subtle)', height }}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${pct}%`,
          background:
            color ?? 'linear-gradient(90deg, var(--fl-brand) 0%, var(--fl-brand-hover) 100%)',
          transition: 'width 800ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      />
    </div>
  )
}

/* ---------------- Stat ---------------- */

export function Stat({
  label,
  value,
  suffix,
  caption,
  icon: Icon,
}: {
  label: string
  value: string
  suffix?: string
  caption?: string
  icon?: IconC
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.12em] uppercase text-[color:var(--fl-fg-subtle)]">
        {Icon && <Icon size={13} />}
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span
          className="text-[40px] md:text-[44px] tabular-nums font-semibold tracking-tight leading-none"
          style={{ letterSpacing: '-0.02em' }}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-[20px] font-semibold" style={{ color: 'var(--fl-brand-hover)' }}>
            {suffix}
          </span>
        )}
      </div>
      {caption && (
        <div className="mt-1 text-[12px] text-[color:var(--fl-fg-muted)]">{caption}</div>
      )}
    </div>
  )
}

/* ---------------- Persona Avatar ---------------- */

export function Persona({
  name,
  src,
  size = 40,
  presence,
}: {
  name: string
  src?: string
  size?: number
  presence?: 'available' | 'away' | 'offline'
}) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const presenceColor =
    presence === 'available' ? 'var(--fl-success)' : presence === 'away' ? '#ca5010' : 'var(--fl-fg-disabled)'
  const dim = size
  return (
    <div className="relative inline-block" style={{ width: dim, height: dim }}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="rounded-full object-cover"
          style={{
            width: dim,
            height: dim,
            boxShadow: 'inset 0 0 0 1px var(--fl-stroke)',
          }}
        />
      ) : (
        <div
          className="grid place-items-center rounded-full text-[12px] font-semibold"
          style={{
            width: dim,
            height: dim,
            background: 'var(--fl-brand-subtle)',
            color: 'var(--fl-brand-hover)',
          }}
        >
          {initials}
        </div>
      )}
      {presence && (
        <span
          className="absolute bottom-0 right-0 rounded-full"
          style={{
            width: Math.max(8, dim * 0.22),
            height: Math.max(8, dim * 0.22),
            background: presenceColor,
            boxShadow: '0 0 0 2px var(--fl-card)',
          }}
        />
      )}
    </div>
  )
}
