import { useEffect } from 'react'
import ResearchSite from './ResearchSite'

export default function App() {
  useEffect(() => {
    const title = 'Fixed-layout 3D Hair Centerline Generation — Xinyi Tang'
    const description = 'Fixed-layout 3D hair centerline generation with a 128-slot geometry contract and arc-length curve coverage.'
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    const target = window.location.hash.slice(1)
    if (target) requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView())
  }, [])

  return <ResearchSite />
}
