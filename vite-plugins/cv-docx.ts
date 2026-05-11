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
} from 'docx'
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
  credentialId?: string
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
type CV = {
  fullName: string
  position: string
  location: { city: string; country: string }
  contractType: string
  email: string
  linkedIn: string
  github: string
  portfolio: string
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

const NBSP = ' '
const FONT = 'Segoe UI, Calibri, Arial, Tahoma, Verdana'
const SEMIBOLD = 'Segoe UI Semibold'
const BULLET = '–'
const RECENT_YEARS = 3
const PAGE_MARGIN = { top: 720, right: 900, bottom: 720, left: 900 }
// US Letter (12240 twips wide) minus left + right margins.
const RIGHT_TAB = 12240 - PAGE_MARGIN.left - PAGE_MARGIN.right

const SPACING = {
  HALF: 6 * 20,
  SINGLE: 12 * 20,
  ONE_AND_HALF: 18 * 20,
  DOUBLE: 24 * 20,
}

const skillName = (s: SkillRef) => (typeof s === 'string' ? s : s.name)
const ymToOrd = (ym: string): number => {
  const [y, m = '1'] = ym.split('-')
  return Number(y) * 12 + (Number(m) - 1)
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

type AggSkill = {
  name: string
  group: string
  months: number
  lastUsed: number
  source: 'production' | 'self-taught'
  order: number
}

function aggregateSkills(cv: CV): AggSkill[] {
  type Bucket = {
    group: string
    intervals: { s: number; e: number }[]
    lastUsed: number
    source: 'production' | 'self-taught'
    order: number
  }
  const map = new Map<string, Bucket>()
  const curOrd = currentOrd()

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
    months: coverageMonths(b.intervals),
    lastUsed: Math.floor(b.lastUsed / 12),
    source: b.source,
    order: b.order,
  }))
}

const srcRank = (s: 'production' | 'self-taught') => (s === 'production' ? 0 : 1)
const displayedYears = (y: number) =>
  y < 1 ? Math.round(y * 12) / 12 : Math.round(y)

function formatExp(months: number): string {
  return months < 12
    ? `${Math.max(1, Math.round(months))}m`
    : `${Math.round(months / 12)}y`
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

const formatUrl = (url: string) => (url.startsWith('http') ? url : `https://${url}`)
const formatPeriod = (start: string, end?: string) =>
  `${start}${NBSP}–${NBSP}${end ?? 'present'}`

function buildDocx(cv: CV): Promise<Buffer> {
  const portfolio = cv.portfolio

  const doc = new Document({
    creator: cv.fullName,
    title: `${cv.fullName} — ${cv.position}`,
    subject: 'Curriculum Vitae',
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
          reference: 'dashed-numbering',
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
              new TextRun({ text: cv.fullName, bold: true, allCaps: true, size: 14 * 2 }),
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
                  new TextRun({ text: 'Online version at ', italics: true }),
                  hyperlink(formatUrl(portfolio), portfolio, true),
                  new TextRun({ italics: true, text: '.\t' }),
                  new TextRun({ children: [PageNumber.CURRENT] }),
                ],
              }),
            ],
          }),
        },
      },
    ],
  })

  return Packer.toBuffer(doc)
}

function buildContactInfo(cv: CV): Paragraph {
  const location = `${cv.location.city}, ${cv.location.country}`
  const items: ParagraphChild[][] = [
    [new TextRun({ text: location })],
    [hyperlink(`mailto:${cv.email}`, cv.email)],
    [hyperlink(formatUrl(cv.linkedIn), cv.linkedIn)],
  ]

  const children: ParagraphChild[] = []
  items.forEach((run, i) => {
    children.push(...run)
    if (i < items.length - 1) children.push(new TextRun({ text: ' | ' }))
  })
  return new Paragraph({ alignment: AlignmentType.CENTER, children })
}

function buildSummary(cv: CV): Paragraph[] {
  const years = yearsOfExperience(cv)
  const tagline = cv.tagline.trim().replace('{years}', String(years))
  const summaryParas = cv.summary
    .trim()
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
  return [
    heading1('Summary'),
    new Paragraph({ text: tagline }),
    ...summaryParas.map((t) => new Paragraph({ text: t })),
  ]
}

function buildTechnologies(cv: CV): Paragraph[] {
  const all = aggregateSkills(cv)
  const cutoff = new Date().getFullYear() - RECENT_YEARS
  const recent = all.filter((t) => t.months > 0 && t.lastUsed >= cutoff)
  const out: Paragraph[] = [heading1('Technologies')]
  for (const [group, label] of Object.entries(cv.techGroups)) {
    const techs = recent
      .filter((t) => t.group === group)
      .sort(
        (a, b) =>
          displayedYears(b.months / 12) - displayedYears(a.months / 12) ||
          b.lastUsed - a.lastUsed ||
          srcRank(a.source) - srcRank(b.source) ||
          a.order - b.order,
      )
    if (!techs.length) continue
    const children: ParagraphChild[] = [
      new TextRun({ font: SEMIBOLD, text: `${label}: ` }),
    ]
    techs.forEach((t, i) => {
      children.push(new TextRun({ text: t.name }))
      children.push(new TextRun({ text: ' ' }))
      children.push(new TextRun({ text: `(${formatExp(t.months)})`, italics: true }))
      if (i < techs.length - 1) children.push(new TextRun({ text: ', ' }))
    })
    children.push(new TextRun({ text: '.' }))
    out.push(new Paragraph({ children }))
  }
  return out
}

function buildExperience(cv: CV): Paragraph[] {
  const out: Paragraph[] = [heading1('Experience')]
  const recentIdx = new Set(
    cv.projects
      .map((_, i) => i)
      .sort((a, b) => ymToOrd(cv.projects[b].start) - ymToOrd(cv.projects[a].start))
      .slice(0, 3),
  )
  for (const [idx, p] of cv.projects.entries()) {
    const role = [p.seniority, p.position].filter(Boolean).join(' ')
    out.push(heading2(`${p.company.name} | ${p.name}`))
    out.push(heading3WithRightText(role, formatPeriod(p.start, p.end)))
    if (p.areas?.length) {
      out.push(
        new Paragraph({
          children: [new TextRun({ text: p.areas.join(', '), italics: true })],
        }),
      )
    }
    if (recentIdx.has(idx)) {
      for (const c of p.contributions) {
        out.push(
          new Paragraph({
            text: c,
            numbering: { reference: 'dashed-numbering', level: 0 },
          }),
        )
      }
    }
    const techs = Object.entries(cv.techGroups)
      .flatMap(([group]) => p.skills[group] ?? [])
      .map(skillName)
      .sort()
    if (techs.length) {
      out.push(
        new Paragraph({
          children: [
            new TextRun({ font: SEMIBOLD, text: 'Technologies: ' }),
            new TextRun({ text: techs.join(', ') }),
            new TextRun({ text: '.' }),
          ],
        }),
      )
    }
  }
  return out
}

function buildLanguages(cv: CV): Paragraph[] {
  if (!cv.languages.length) return []
  return [
    heading1('Languages'),
    new Paragraph({ text: cv.languages.map((l) => `${l.name}: ${l.level}`).join(' | ') }),
  ]
}

function buildCertifications(cv: CV): Paragraph[] {
  if (!cv.certifications.length) return []
  const out: Paragraph[] = [heading1('Licenses & certifications')]
  for (const c of cv.certifications) {
    const code = c.code ? ` (${c.code})` : ''
    const period = c.expires ? formatPeriod(c.issued, c.expires) : c.issued
    out.push(heading3WithRightText(`${c.name}${code}`, period))
    const issuerLine: ParagraphChild[] = [new TextRun({ text: c.issuer.name })]
    if (c.credentialId) {
      issuerLine.push(new TextRun({ text: ` | Credential ID: ${c.credentialId}` }))
    }
    if (c.credentialUrl) {
      issuerLine.push(new TextRun({ text: ' | ' }))
      issuerLine.push(hyperlink(c.credentialUrl, 'Verify'))
    }
    out.push(new Paragraph({ children: issuerLine }))
  }
  return out
}

function buildEducation(cv: CV): Paragraph[] {
  if (!cv.education.length) return []
  const out: Paragraph[] = [heading1('Education')]
  for (const e of cv.education) {
    out.push(heading3WithRightText(e.school.name, formatPeriod(e.start, e.end)))
    out.push(new Paragraph({ text: `${e.degree} | ${e.field}` }))
  }
  return out
}

function buildStrengths(cv: CV): Paragraph[] {
  if (!cv.strengths.length) return []
  const out: Paragraph[] = [heading1('Strengths')]
  for (const s of cv.strengths) {
    out.push(heading2(s.name))
    out.push(new Paragraph({ text: s.description.trim().replace(/\s+/g, ' ') }))
  }
  return out
}

const heading1 = (text: string) =>
  new Paragraph({ text, heading: HeadingLevel.HEADING_1 })

const heading2 = (text: string) =>
  new Paragraph({ text, heading: HeadingLevel.HEADING_2 })

const heading3WithRightText = (text: string, rightText: string) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_3,
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    children: [new TextRun({ text }), new TextRun({ text: `\t${rightText}` })],
  })

function hyperlink(url: string, text: string, italics = false): ExternalHyperlink {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text, style: 'Hyperlink', italics })],
  })
}

export function cvDocxPlugin(): Plugin {
  const cvPath = path.resolve(process.cwd(), 'src/data/cv.yml')
  return {
    name: 'cv-docx',
    apply: 'build',
    async generateBundle() {
      const cv = YAML.parse(fs.readFileSync(cvPath, 'utf-8')) as CV
      const buf = await buildDocx(cv)
      const fileName = `${cv.fullName} - ${cv.position}.docx`
      this.emitFile({ type: 'asset', fileName, source: buf })
    },
  }
}
