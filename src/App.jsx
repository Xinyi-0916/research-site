import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { project } from './data/siteData'
import About from './pages/About'
import CV from './pages/CV'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Project from './pages/Project'
import Projects from './pages/Projects'
import Publications from './pages/Publications'
import Research from './pages/Research'

const routes = {
  '/': Home,
  '/research': Research,
  '/projects': Projects,
  [`/projects/${project.slug}`]: Project,
  '/publications': Publications,
  '/about': About,
  '/cv': CV,
}

const pageTitles = {
  '/': 'Xinyi Tang — 3D AI & Graphics Research',
  '/research': 'Research — Xinyi Tang',
  '/projects': 'Projects — Xinyi Tang',
  [`/projects/${project.slug}`]: `${project.title} — Xinyi Tang`,
  '/publications': 'Publications — Xinyi Tang',
  '/about': 'About — Xinyi Tang',
  '/cv': 'CV — Xinyi Tang',
}

const pageDescriptions = {
  '/': 'Xinyi Tang researches production-ready generative 3D, structured character assets, and animation-aware representations.',
  '/research': 'Research interests in production-ready generative 3D, animation-ready character generation, and structured 3D representations.',
  '/projects': 'Research projects in 3D AI and graphics, with current evidence, limitations, and process.',
  [`/projects/${project.slug}`]: project.subtitle,
  '/publications': 'Manuscripts and public research artifacts by Xinyi Tang.',
  '/about': 'Xinyi Tang brings an animation and CGT production perspective to 3D AI research.',
  '/cv': 'Curriculum vitae for Xinyi Tang.',
}

function cleanPath(pathname) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const path = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname
  return path.replace(/\/$/, '') || '/'
}

export default function App() {
  const [path, setPath] = useState(() => cleanPath(window.location.pathname))

  useEffect(() => {
    const updatePath = () => setPath(cleanPath(window.location.pathname))
    window.addEventListener('popstate', updatePath)
    return () => window.removeEventListener('popstate', updatePath)
  }, [])

  useEffect(() => {
    document.title = pageTitles[path] || 'Page not found — Xinyi Tang'
    const description = pageDescriptions[path] || 'Xinyi Tang — 3D AI and graphics research.'
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [path])

  const Page = routes[path] || NotFound
  return <Layout path={path}><Page /></Layout>
}
