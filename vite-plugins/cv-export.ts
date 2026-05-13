import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import YAML from 'yaml'

type Org = { name: string; url?: string }
type SkillRef = string | { name: string; since?: string; duration?: string }
type Project = {
  name: string
  company: Org
  position: string
  seniority?: string
  start: string
  end?: string
  areas?: string[]
  description: string
  contributions: string[]
  skills: Record<string, SkillRef[]>
}
type Certification = {
  name: string
  code?: string
  issuer: Org
  about: string
  issued: string
  expires?: string
  credentialUrl?: string
}
type Education = {
  school: Org
  degree: string
  field: string
  start: string
  end?: string
}
type Strength = { name: string; description: string }
type Language = { name: string; level: string }
export type CV = {
  fullName: string
  position: string
  location: { city: string; country: string }
  contractType: string
  email: string
  linkedIn: string
  github: string
  portfolio: string
  photo: string
  availability: string
  tagline: string
  summary: string
  preferredStack: Record<string, string[]>
  techGroups: Record<string, string>
  languages: Language[]
  projects: Project[]
  certifications: Certification[]
  education: Education[]
  strengths: Strength[]
  skills?: Record<string, SkillRef[]>
}

// Last N years window used for the "recent" filter — matches Portfolio's RECENT_YEARS.
const RECENT_YEARS = 3

const skillName = (s: SkillRef) => (typeof s === 'string' ? s : s.name)

const orgLink = (o: Org) => (o.url ? `[${o.name}](${o.url})` : o.name)

const parseYM = (ym: string): { year: number; month: number } => {
  const [y, m = '1'] = ym.split('-')
  return { year: Number(y), month: Number(m) }
}
const ymToOrd = (ym: string): number => {
  const { year, month } = parseYM(ym)
  return year * 12 + (month - 1)
}
const currentOrd = (now = new Date()) => now.getFullYear() * 12 + now.getMonth()

const parseDuration = (d: string): number => {
  let months = 0
  const y = /(\d+)\s*y/.exec(d)
  const m = /(\d+)\s*m/.exec(d)
  if (y) months += +y[1] * 12
  if (m) months += +m[1]
  return months
}

// Union of inclusive month intervals — overlapping runs across parallel projects count once.
function coverageMonths(intervals: { s: number; e: number }[]): number {
  if (!intervals.length) return 0
  const sorted = [...intervals].sort((a, b) => a.s - b.s)
  let total = 0
  let curS = sorted[0].s
  let curE = sorted[0].e
  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i]
    if (next.s <= curE + 1) curE = Math.max(curE, next.e)
    else {
      total += curE - curS + 1
      curS = next.s
      curE = next.e
    }
  }
  total += curE - curS + 1
  return total
}

const srcRank = (s: 'production' | 'self-taught') => (s === 'production' ? 0 : 1)

// Years as they appear on screen — sub-year values stay precise (months), full
// years round to ints. Two skills that display the same string sort as tied.
const displayedYears = (y: number) =>
  y < 1 ? Math.round(y * 12) / 12 : Math.round(y)

type AggSkill = {
  name: string
  group: string
  source: 'production' | 'self-taught'
  years: number
  lastUsed: number
  order: number
}

function aggregateSkills(cv: CV, now = new Date()): AggSkill[] {
  type Bucket = {
    group: string
    source: 'production' | 'self-taught'
    intervals: { s: number; e: number }[]
    lastUsed: number
    order: number
  }
  const map = new Map<string, Bucket>()
  const curOrd = currentOrd(now)

  const add = (
    name: string,
    group: string,
    source: 'production' | 'self-taught',
    s: number,
    e: number,
  ) => {
    const existing = map.get(name)
    if (existing) {
      if (source === 'production') existing.source = 'production'
      existing.intervals.push({ s, e })
      if (e > existing.lastUsed) existing.lastUsed = e
    } else {
      map.set(name, { group, source, intervals: [{ s, e }], lastUsed: e, order: map.size })
    }
  }

  for (const p of cv.projects) {
    const projStart = ymToOrd(p.start)
    const projEnd = p.end ? ymToOrd(p.end) : curOrd
    for (const [group, items] of Object.entries(p.skills ?? {})) {
      for (const item of items) {
        const obj = typeof item === 'string' ? { name: item } : item
        const s = obj.since ? ymToOrd(obj.since) : projStart
        const e = obj.duration ? s + parseDuration(obj.duration) - 1 : projEnd
        add(obj.name, group, 'production', s, e)
      }
    }
  }

  for (const [group, items] of Object.entries(cv.skills ?? {})) {
    for (const item of items) {
      const obj = typeof item === 'string' ? { name: item } : item
      if (!obj.since) continue
      const s = ymToOrd(obj.since)
      const e = obj.duration ? s + parseDuration(obj.duration) - 1 : curOrd
      add(obj.name, group, 'self-taught', s, e)
    }
  }

  return Array.from(map.entries()).map(([name, b]) => ({
    name,
    group: b.group,
    source: b.source,
    years: +(coverageMonths(b.intervals) / 12).toFixed(1),
    lastUsed: Math.floor(b.lastUsed / 12),
    order: b.order,
  }))
}

type CategoryDensity = {
  group: string
  label: string
  techs: {
    name: string
    years: number
    lastUsed: number
    order: number
    source: 'production' | 'self-taught'
  }[]
}

function computeCategoryDensity(cv: CV, all: AggSkill[]): CategoryDensity[] {
  const cutoff = new Date().getFullYear() - RECENT_YEARS
  const recent = all.filter((t) => t.lastUsed >= cutoff)
  return Object.entries(cv.techGroups)
    .map(([group, label]) => {
      const techs = recent
        .filter((t) => t.group === group)
        .map((t) => ({
          name: t.name,
          years: t.years,
          lastUsed: t.lastUsed,
          order: t.order,
          source: t.source,
        }))
        .sort(
          (a, b) =>
            displayedYears(b.years) - displayedYears(a.years) ||
            b.lastUsed - a.lastUsed ||
            srcRank(a.source) - srcRank(b.source) ||
            a.order - b.order,
        )
      return { group, label, techs }
    })
    .filter((c) => c.techs.length > 0)
    .sort((a, b) => b.techs.length - a.techs.length)
}

function formatYears(y: number): string {
  return y < 1 ? `${Math.max(1, Math.round(y * 12))}m` : `${Math.round(y)}y`
}

function renderHeader(cv: CV, years: number): string[] {
  return [
    `# ${cv.fullName}`,
    '',
    `- Position: ${cv.position}`,
    `- Location: ${cv.location.city}, ${cv.location.country}`,
    `- Contract: ${cv.contractType}`,
    `- Availability: ${cv.availability}`,
    `- Email: ${cv.email}`,
    `- LinkedIn: https://${cv.linkedIn}`,
    `- GitHub: https://${cv.github}`,
    `- Portfolio: https://${cv.portfolio}`,
    '',
    '## About',
    '',
    cv.tagline.trim().replace('{years}', String(years)),
    '',
    cv.summary.trim().split('\n').map((s) => s.trim()).filter(Boolean).join('\n'),
    '',
  ]
}

function renderPreferredStack(cv: CV): string[] {
  const out: string[] = ['## Preferred Stack', '']
  for (const [group, label] of Object.entries(cv.techGroups)) {
    const items = cv.preferredStack[group]
    if (items?.length) out.push(`- ${label}: ${items.join(', ')}`)
  }
  out.push('')
  return out
}

function renderLanguages(cv: CV): string[] {
  return ['## Languages', '', ...cv.languages.map((l) => `- ${l.name}: ${l.level}`), '']
}

function renderExperience(cv: CV): string[] {
  const out: string[] = ['## Experience', '']
  for (const p of cv.projects) {
    const role = [p.seniority, p.position].filter(Boolean).join(' ')
    out.push(`### ${p.name}`, '')
    out.push(`- Position: ${role}`)
    out.push(`- Company: ${orgLink(p.company)}`)
    out.push(`- Period: ${p.start} to ${p.end ?? 'present'}`)
    if (p.areas?.length) out.push(`- Areas: ${p.areas.join(', ')}`)
    out.push('', p.description.trim().replace(/\s+/g, ' '), '')
    out.push('Highlights:', '')
    for (const c of p.contributions) out.push(`- ${c}`)
    out.push('')
    const stack = Object.entries(cv.techGroups).flatMap(([group, label]) => {
      const items = p.skills[group]
      return items?.length ? [`- ${label}: ${items.map(skillName).join(', ')}`] : []
    })
    if (stack.length) out.push('Stack:', '', ...stack, '')
  }
  return out
}

function renderToolkit(density: CategoryDensity[]): string[] {
  const out: string[] = [
    '## Toolkit',
    '',
    `Technologies touched within the last ${RECENT_YEARS} years. Year counts are lifetime totals.`,
    '',
  ]
  for (const c of density) {
    const items = c.techs
      .map((t) => `${t.name} (${formatYears(t.years)})`)
      .join(', ')
    out.push(`### ${c.label}`, '', items, '')
  }
  return out
}

function renderCertifications(cv: CV): string[] {
  const out: string[] = ['## Certifications', '']
  for (const c of cv.certifications) {
    const code = c.code ? ` (${c.code})` : ''
    out.push(`### ${c.name}${code}`, '')
    out.push(`- Issuer: ${orgLink(c.issuer)}`)
    if (c.expires) out.push(`- Valid: ${c.issued} to ${c.expires}`)
    else out.push(`- Issued: ${c.issued}`)
    if (c.credentialUrl) out.push(`- Credential: ${c.credentialUrl}`)
    out.push('', c.about.trim(), '')
  }
  return out
}

function renderEducation(cv: CV): string[] {
  const out: string[] = ['## Education', '']
  for (const e of cv.education) {
    out.push(`### ${e.degree}, ${e.field}`, '')
    out.push(`- School: ${orgLink(e.school)}`)
    out.push(`- Period: ${e.start} to ${e.end ?? 'present'}`)
    out.push('')
  }
  return out
}

function renderStrengths(cv: CV): string[] {
  const out: string[] = ['## Strengths', '']
  for (const s of cv.strengths) {
    out.push(`### ${s.name}`, '', s.description.trim().replace(/\s+/g, ' '), '')
  }
  return out
}

function yearsOfExperience(cv: CV, now = Date.now()): number {
  const projectStarts = cv.projects.map((p) => Date.parse(`${p.start}-01T00:00:00Z`))
  const skillStarts = Object.values(cv.skills ?? {})
    .flat()
    .map((s) => (typeof s === 'object' && s.since ? Date.parse(`${s.since}-01T00:00:00Z`) : NaN))
    .filter((n) => !Number.isNaN(n))
  const earliest = Math.min(...projectStarts, ...skillStarts)
  return Math.floor((now - earliest) / (1000 * 60 * 60 * 24 * 365.25))
}

export function renderCvMarkdown(cv: CV): string {
  const years = yearsOfExperience(cv)
  const all = aggregateSkills(cv)
  const density = computeCategoryDensity(cv, all)

  const lines = [
    ...renderHeader(cv, years),
    ...renderPreferredStack(cv),
    ...renderLanguages(cv),
    ...renderToolkit(density),
    ...renderExperience(cv),
    ...renderCertifications(cv),
    ...renderEducation(cv),
    ...renderStrengths(cv),
  ]
  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd()}\n`
}

function renderLlmsTxt(cv: CV): string {
  // Links stay site-relative so the file works locally and in production without
  // hard-coding the deployed domain.
  return [
    `# ${cv.fullName} — ${cv.position}`,
    '',
    `> ${cv.position} based in ${cv.location.city}, ${cv.location.country}. ${cv.availability}.`,
    '',
    `Personal CV/portfolio site. The primary resource is the Markdown CV — full work history, skills, certifications, education, and strengths.`,
    '',
    '## CV',
    '',
    `- [Resume (Markdown)](/cv.md): full CV in plain markdown`,
    `- [Full content (llms-full.txt)](/llms-full.txt): same CV bundled for llms.txt-aware crawlers`,
    '',
  ].join('\n')
}

// Emits cv.md, llms.txt, and llms-full.txt to the build output, derived from src/data/cv.yml.
export function cvExportPlugin(): Plugin {
  const cvPath = path.resolve(process.cwd(), 'src/data/cv.yml')
  return {
    name: 'cv-export',
    apply: 'build',
    generateBundle() {
      const cv = YAML.parse(fs.readFileSync(cvPath, 'utf-8')) as CV
      const md = renderCvMarkdown(cv)
      this.emitFile({ type: 'asset', fileName: 'cv.md', source: md })
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: renderLlmsTxt(cv) })
      this.emitFile({ type: 'asset', fileName: 'llms-full.txt', source: md })
    },
  }
}
