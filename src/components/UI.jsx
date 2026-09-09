import { useId, useState } from 'react'
import { AppLink, TextLink } from './Link'

export function PageIntro({ eyebrow, title, children, narrow = false }) {
  return (
    <section className={`page-intro ${narrow ? 'narrow' : ''}`}>
      <div className="content-wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <div className="intro-copy">{children}</div>}
      </div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, children, action }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
      {action && <TextLink to={action.to}>{action.label}</TextLink>}
    </div>
  )
}

export function StatusPill({ children, tone = 'neutral' }) {
  return <span className={`status-pill ${tone}`}>{children}</span>
}

export function BeforeAfter({ before, after, beforeAlt, afterAlt, caption }) {
  const [position, setPosition] = useState(50)
  const id = useId()
  return (
    <figure className="before-after">
      <div className="compare-frame" style={{ '--position': `${position}%` }}>
        <img src={before} alt={beforeAlt} className="compare-image" />
        <div className="compare-after" aria-hidden="true">
          <img src={after} alt="" className="compare-image" />
        </div>
        <span className="compare-tag before-tag">Coarse</span>
        <span className="compare-tag after-tag">Refined</span>
        <span className="compare-divider" aria-hidden="true"><i /></span>
        <input
          id={id}
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(event.target.value)}
          aria-label="Drag to compare coarse and refined hair-card renders"
        />
        <span className="sr-only">{afterAlt}</span>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export function ProjectCard({ project, featured = false }) {
  const href = project.slug ? `/projects/${project.slug}` : ''
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`}>
      <div className="project-card-media">
        {project.hero ? (
          <img src={project.hero.after} alt={project.hero.afterAlt} />
        ) : (
          <img src={project.image} alt="Abstract placeholder for a future animation-aware 3D research project" />
        )}
      </div>
      <div className="project-card-body">
        <div className="project-card-meta">
          <StatusPill tone={project.slug ? 'active' : 'planned'}>{project.status}</StatusPill>
          {project.year && <span>{project.year}</span>}
        </div>
        <h3>{project.title}</h3>
        <p>{project.subtitle || project.summary}</p>
        {href ? <TextLink to={href}>View project</TextLink> : <span className="coming-label">Project details coming later</span>}
      </div>
    </article>
  )
}

export function LinkButtons({ projectPath, links = {} }) {
  const items = [
    { label: 'Project', href: projectPath },
    { label: 'Paper', href: links.paper },
    { label: 'arXiv', href: links.arxiv },
    { label: 'Code', href: links.code },
    { label: 'Video', href: links.video },
  ]
  return (
    <div className="link-buttons" aria-label="Publication resources">
      {items.map((item) => item.href ? (
        <AppLink key={item.label} to={item.href} className="small-button">{item.label}</AppLink>
      ) : (
        <span key={item.label} className="small-button disabled" aria-disabled="true" title="Coming soon">
          {item.label} <small>soon</small>
        </span>
      ))}
    </div>
  )
}

export function MediaPlaceholder({ title = 'Media placeholder', children }) {
  return (
    <div className="media-placeholder">
      <span>{title}</span>
      <p>{children}</p>
      <code>public/media/projects/hair-card-refinement/</code>
    </div>
  )
}

export function MediaFigure({ src, alt, caption, poster, className = '' }) {
  const isVideo = /\.mp4(?:\?|$)/i.test(src)
  return (
    <figure className={`media-figure ${className}`}>
      {isVideo ? (
        <video controls muted playsInline preload="metadata" poster={poster} aria-label={alt}>
          <source src={src} type="video/mp4" />
          Your browser does not support embedded MP4 video.
        </video>
      ) : (
        <img src={src} alt={alt} loading="lazy" />
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
