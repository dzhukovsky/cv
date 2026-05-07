import { useEffect, useState } from 'react'
import Portfolio from '@/pages/Portfolio'
import Work from '@/pages/Work'
import MatchJob from '@/pages/MatchJob'

type Route = 'portfolio' | 'work' | 'match'

function getRoute(): Route {
  if (typeof window === 'undefined') return 'portfolio'
  const p = window.location.pathname.replace(/\/$/, '')
  if (p === '/work') return 'work'
  if (p === '/match') return 'match'
  return 'portfolio'
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute)

  useEffect(() => {
    const onPop = () => {
      setRoute(getRoute())
      window.dispatchEvent(new Event('cv:routechange'))
    }
    window.addEventListener('popstate', onPop)

    // Internal link clicks: any <a data-route> navigates without full reload.
    const onClick = (e: MouseEvent) => {
      // Ignore modifier-clicks (open in new tab etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      const target = e.target as HTMLElement | null
      const link = target?.closest('a[data-route]') as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || !href.startsWith('/')) return
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

  if (route === 'work') return <Work />
  if (route === 'match') return <MatchJob />
  return <Portfolio />
}
