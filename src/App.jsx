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
    let cancelled = false
    let timer
    let attempts = 0
    const typesetMath = () => {
      if (cancelled) return
      const mathJax = window.MathJax
      const nodes = [...document.querySelectorAll('[data-math-tex]')]
      if (mathJax?.typesetPromise && nodes.length) {
        mathJax.typesetClear?.(nodes)
        nodes.forEach((node) => {
          const tex = node.dataset.mathTex
          node.textContent = node.dataset.mathBlock === 'true' ? `\\[${tex}\\]` : `\\(${tex}\\)`
        })
        mathJax.typesetPromise(nodes)
        return
      }
      if (attempts++ < 40) timer = window.setTimeout(typesetMath, 100)
    }
    timer = window.setTimeout(typesetMath, 50)
    const target = window.location.hash.slice(1)
    if (target) requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView())
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  return <ResearchSite />
}
