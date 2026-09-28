import { useEffect } from 'react'
import ResearchSite from './ResearchSite'

export default function App() {
  useEffect(() => {
    const title = 'Production-Ready Hair-Card Generation and Refinement — Xinyi Tang'
    const description = 'Production-equivalent explicit hair-card generation from a single design image, without dense-strand reconstruction or exact hidden-topology recovery.'
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    const target = window.location.hash.slice(1)
    if (target) requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView())
  }, [])

  return <ResearchSite />
}
