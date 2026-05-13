import { useEffect, useState } from 'react'
import MatchJob from '@/pages/MatchJob'
import Portfolio from '@/pages/Portfolio'

type Route = 'portfolio' | 'match'

const GATED: ReadonlySet<Route> = new Set(['match'])

function getRoute(): Route {
  if (typeof window === 'undefined') return 'portfolio'
  const p = window.location.pathname.replace(/\/$/, '')
  if (p === '/match') return 'match'
  return 'portfolio'
}

function applyRouteMeta(route: Route) {
  if (typeof document === 'undefined') return
  const content = GATED.has(route) ? 'noindex, noarchive, nofollow' : 'index, follow'
  let tag = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = 'robots'
    document.head.appendChild(tag)
  }
  tag.content = content
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute)

  useEffect(() => {
    applyRouteMeta(route)
  }, [route])

  useEffect(() => {
    const onPop = () => {
      setRoute(getRoute())
      window.dispatchEvent(new Event('cv:routechange'))
    }
    window.addEventListener('popstate', onPop)

    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      const target = e.target as HTMLElement | null
      const link = target?.closest('a[data-route]') as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute('href')
      if (!href?.startsWith('/')) return
      e.preventDefault()
      if (href !== window.location.pathname) {
        window.history.pushState({}, '', href)
        setRoute(getRoute())
        window.dispatchEvent(new Event('cv:routechange'))
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('popstate', onPop)
      document.removeEventListener('click', onClick)
    }
  }, [])

  if (route === 'match') return <MatchJob />
  return <Portfolio />
}
