import { ArrowIcon } from '../components/Icons'
import { AppLink, TextLink } from '../components/Link'
import { BeforeAfter, ProjectCard, SectionHeading, StatusPill } from '../components/UI'
import { pageCopy, project, researchInterests, site, upcomingProject, updates } from '../data/siteData'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="content-wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Independent researcher · Graphics / 3D AI</p>
            <h1>{site.name}</h1>
            <p className="hero-identity">{site.identity}</p>
            <div className="hero-actions">
              <AppLink to={`/projects/${project.slug}`} className="primary-button">
                Explore current research <ArrowIcon />
              </AppLink>
              <AppLink to="/about" className="secondary-button">About my background</AppLink>
            </div>
            <ul className="interest-chips" aria-label="Research interests">
              <li>Production-ready 3D generation</li>
              <li>Structured / animatable character assets</li>
              <li>3D graphics + generative models for animation pipelines</li>
            </ul>
          </div>
          <BeforeAfter {...project.hero} />
        </div>
      </section>

      <section className="section context-section">
        <div className="content-wrap statement-grid">
          <div>
            <p className="eyebrow">Research perspective</p>
            <h2>{pageCopy.home.perspectiveTitle}</h2>
          </div>
          <div className="large-copy">
            <p>
              {pageCopy.home.background}
            </p>
            <blockquote>
              “{pageCopy.home.centralProblem}”
            </blockquote>
            <p>
              {pageCopy.home.domainAdvantage}
            </p>
          </div>
        </div>
      </section>

      <section className="section selected-section">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Selected research"
            title="Work shaped by production constraints"
            action={{ to: '/projects', label: 'All projects' }}
          >
            Current and planned work at the intersection of generative 3D and animation pipelines.
          </SectionHeading>
          <div className="project-grid">
            <ProjectCard project={project} featured />
            <ProjectCard project={upcomingProject} />
          </div>
        </div>
      </section>

      <section className="section interests-preview">
        <div className="content-wrap">
          <SectionHeading eyebrow="Research agenda" title="What I am investigating" action={{ to: '/research', label: 'Research interests' }} />
          <div className="interest-preview-grid">
            {researchInterests.slice(0, 3).map((interest) => (
              <article key={interest.index}>
                <span>{interest.index}</span>
                <h3>{interest.title}</h3>
                <p>{interest.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section updates-section">
        <div className="content-wrap updates-grid">
          <SectionHeading eyebrow="Research updates" title="In progress" />
          <div className="updates-list">
            {updates.map((update) => (
              <div key={update.text} className="update-item">
                <StatusPill tone="active">{update.date}</StatusPill>
                <p>{update.text}</p>
              </div>
            ))}
            <p className="updates-note">Status language is intentionally conservative and will be updated when public artifacts are available.</p>
          </div>
        </div>
      </section>
    </>
  )
}
