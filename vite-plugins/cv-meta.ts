import fs from 'node:fs'
import path from 'node:path'
import type { HtmlTagDescriptor, Plugin } from 'vite'
import YAML from 'yaml'
import type { CV } from './cv-export'

function yearsOfExperience(cv: CV, now = Date.now()): number {
  const projectStarts = cv.projects.map((p) => Date.parse(`${p.start}-01T00:00:00Z`))
  const skillStarts = Object.values(cv.skills ?? {})
    .flat()
    .map((s) => (typeof s === 'object' && s.since ? Date.parse(`${s.since}-01T00:00:00Z`) : NaN))
    .filter((n) => !Number.isNaN(n))
  const earliest = Math.min(...projectStarts, ...skillStarts)
  return Math.floor((now - earliest) / (1000 * 60 * 60 * 24 * 365.25))
}

// Injects SEO meta, OG/Twitter cards, and a Person JSON-LD block into index.html from src/data/cv.yml.
export function cvMetaPlugin(): Plugin {
  const cvPath = path.resolve(process.cwd(), 'src/data/cv.yml')
  return {
    name: 'cv-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(): HtmlTagDescriptor[] {
        const cv = YAML.parse(fs.readFileSync(cvPath, 'utf-8')) as CV
        const origin = `https://${cv.portfolio}`
        const url = `${origin}/`
        const image = `${origin}${cv.photo}`
        const title = `${cv.fullName} — ${cv.position}`
        const years = yearsOfExperience(cv)
        const description = cv.tagline.trim().replace(/\s+/g, ' ').replace('{years}', String(years))

        const person = {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: cv.fullName,
          jobTitle: cv.position,
          description,
          email: `mailto:${cv.email}`,
          url,
          image,
          address: {
            '@type': 'PostalAddress',
            addressLocality: cv.location.city,
            addressCountry: cv.location.country,
          },
          sameAs: [`https://${cv.linkedIn}`, `https://${cv.github}`],
        }

        const tags: HtmlTagDescriptor[] = [
          { tag: 'title', children: title },
          { tag: 'meta', attrs: { name: 'description', content: description } },
          { tag: 'link', attrs: { rel: 'canonical', href: url } },
          { tag: 'link', attrs: { rel: 'alternate', type: 'text/markdown', href: '/cv.md' } },
          { tag: 'link', attrs: { rel: 'alternate', type: 'text/plain', href: '/llms.txt' } },
          { tag: 'link', attrs: { rel: 'alternate', type: 'text/plain', href: '/llms-full.txt' } },
          { tag: 'meta', attrs: { property: 'og:type', content: 'profile' } },
          { tag: 'meta', attrs: { property: 'og:url', content: url } },
          { tag: 'meta', attrs: { property: 'og:title', content: title } },
          { tag: 'meta', attrs: { property: 'og:description', content: description } },
          { tag: 'meta', attrs: { property: 'og:image', content: image } },
          { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' } },
          { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
          { tag: 'meta', attrs: { name: 'twitter:description', content: description } },
          { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: JSON.stringify(person),
          },
        ]
        return tags.map((t) => ({ ...t, injectTo: 'head' }))
      },
    },
  }
}
