import { useEffect, useState } from 'react'
import { navigation, site } from '../data/siteData'
import { AppLink } from './Link'
import { ArrowIcon, MenuIcon } from './Icons'

export function Layout({ children, path }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [path])

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <AppLink to="/" className="brand" aria-label={`${site.name}, research home`}>
            <span className="brand-mark" aria-hidden="true">{site.shortName}</span>
            <span className="brand-copy">
              <strong>{site.name}</strong>
              <small>{site.role}</small>
            </span>
          </AppLink>

          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <MenuIcon open={menuOpen} />
          </button>

          <nav id="site-navigation" className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
            {navigation.map((item) => (
              <AppLink
                key={item.path}
                to={item.path}
                className={path === item.path ? 'active' : ''}
                aria-current={path === item.path ? 'page' : undefined}
              >
                {item.label}
              </AppLink>
            ))}
            <AppLink to={site.portfolioUrl} className="portfolio-link">
              Portfolio <ArrowIcon diagonal />
            </AppLink>
          </nav>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <p className="footer-name">{site.name}</p>
            <p>Research in production-ready 3D generation and animation-aware representations.</p>
          </div>
          <div className="footer-links">
            <AppLink to="/research">Research</AppLink>
            <AppLink to="/projects">Projects</AppLink>
            {site.social.github && <AppLink to={site.social.github}>GitHub ↗</AppLink>}
            <AppLink to={site.portfolioUrl}>Portfolio ↗</AppLink>
          </div>
          <p className="footer-meta">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </footer>
    </div>
  )
}
