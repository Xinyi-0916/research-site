import { useEffect } from 'react'
import ResearchSite from './ResearchSite'

export default function App() {
  useEffect(() => {
    const title = 'Production-Ready Hair-Card Refinement — Xinyi Tang'
    const description = 'Direct explicit hair-card reconstruction and production-constrained refinement from coarse geometry and multiview observations.'
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    const target = window.location.hash.slice(1)
    if (target) requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView())
  }, [])

  return <ResearchSite />
}
