import { useEffect } from 'react'
import ResearchSite from './ResearchSite'

export default function App() {
  useEffect(() => {
    const title = 'Production-Ready Hair-Card Refinement — Xinyi Tang'
    const description = 'Multiview refinement of explicit hair-card geometry under a fixed production-valid asset contract.'
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    const target = window.location.hash.slice(1)
    if (target) requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView())
  }, [])

  return <ResearchSite />
}
