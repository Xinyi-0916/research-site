import { BeforeAfter, LinkButtons, MediaPlaceholder, StatusPill } from '../components/UI'
import { project } from '../data/siteData'

function NumberedHeading({ number, title, children }) {
  return (
    <div className="project-section-heading">
      <span>{String(number).padStart(2, '0')}</span>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}

function Flow({ items, label }) {
  return (
    <div className="flow" aria-label={label}>
      {items.map((item, index) => (
        <div className="flow-part" key={item}>
          <span>{item}</span>
          {index < items.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </div>
  )
}

export default function Project() {
  return (
    <article className="project-page">
      <header className="project-hero">
        <div className="content-wrap">
          <div className="project-hero-copy">
            <div className="project-meta-row">
              <StatusPill tone="active">{project.status}</StatusPill>
              <span>{project.year}</span>
            </div>
            <h1>{project.title}</h1>
            <p>{project.subtitle}</p>
            <ul className="tag-list">
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <LinkButtons projectPath={`/projects/${project.slug}`} links={project.links} />
          </div>
          <BeforeAfter {...project.hero} />
        </div>
      </header>

      <nav className="project-subnav" aria-label="On this page">
        <div className="content-wrap">
          <a href="#motivation">Motivation</a>
          <a href="#method">Method</a>
          <a href="#results">Results</a>
          <a href="#process">Research process</a>
          <a href="#limitations">Limitations</a>
        </div>
      </nav>

      <section className="project-section" id="motivation">
        <div className="content-wrap project-reading-grid">
          <NumberedHeading number={1} title="Motivation" />
          <div className="project-content">
            <p className="lead-copy">{project.motivation.intro}</p>
            <ul className="requirement-grid">
              {project.motivation.requirements.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <blockquote className="finding-quote">{project.motivation.finding}</blockquote>
          </div>
        </div>
      </section>

      <section className="project-section tinted">
        <div className="content-wrap project-reading-grid">
          <NumberedHeading number={2} title="Problem" />
          <div className="project-content">
            <div className="io-diagram">
              <div>
                <small>Input</small>
                {project.problem.inputs.map((item) => <strong key={item}>{item}</strong>)}
              </div>
              <span aria-hidden="true">→</span>
              <div>
                <small>Output</small>
                <strong>{project.problem.output}</strong>
              </div>
            </div>
            <div className="objective-row" aria-label="Research objectives">
              {project.problem.objectives.map((item, index) => (
                <span key={item}>{index > 0 && <i>+</i>}{item}</span>
              ))}
            </div>
            <p className="caveat-note"><strong>Problem boundary.</strong> {project.problem.caveat}</p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <div className="content-wrap">
          <NumberedHeading number={3} title="Key research finding">
            <p>Optimization can improve the image metric while quietly breaking the asset.</p>
          </NumberedHeading>
          <div className="finding-grid">
            {[project.keyFinding.appearanceOnly, project.keyFinding.constrained].map((finding, index) => (
              <figure className="finding-card" key={finding.title}>
                <div className="finding-image-wrap">
                  <img src={finding.image} alt={finding.alt} />
                  <span>{index === 0 ? 'Observed failure mode' : 'Current formulation'}</span>
                </div>
                <figcaption>
                  <h3>{finding.title}</h3>
                  <strong>{finding.result}</strong>
                  <p>{finding.failure}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="project-section method-section" id="method">
        <div className="content-wrap">
          <NumberedHeading number={4} title="Current method">
            <p>An explicit-card pipeline with a deliberate split between guidance and validity.</p>
          </NumberedHeading>
          <Flow items={project.pipeline} label="Hair-card refinement pipeline" />
          <div className="formulation-grid">
            {project.formulation.map((item) => (
              <div key={item.label}>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <div className="validity-panel">
            <div>
              <p className="eyebrow">Hard validity currently covers</p>
              <h3>Intrinsic rules that keep cards usable</h3>
            </div>
            <ul>
              {project.hardValidity.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="project-section results-section" id="results">
        <div className="content-wrap">
          <NumberedHeading number={5} title="Current results">
            <p>Only the repaired 12-case oracle result is presented as validated evidence.</p>
          </NumberedHeading>
          <div className="result-label"><StatusPill tone="validated">{project.results.label}</StatusPill></div>
          <div className="metrics-grid">
            {project.results.metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="results-copy-grid">
            <p className="lead-copy">{project.results.note}</p>
            <p>{project.results.populationStatus}</p>
          </div>
          <MediaPlaceholder title="Result gallery placeholder">
            Add matched input-view and held-out-view comparisons here. The page already supports captioned images, GIFs, MP4, and the before/after component.
          </MediaPlaceholder>
        </div>
      </section>

      <section className="project-section comparison-section">
        <div className="content-wrap">
          <NumberedHeading number={6} title="Why this matters" />
          <div className="pipeline-comparison">
            <div>
              <p className="eyebrow">Strand-first pipeline</p>
              <Flow items={project.comparison.strandFirst} label="Strand-first pipeline" />
            </div>
            <div className="ours-flow">
              <p className="eyebrow">This project</p>
              <Flow items={project.comparison.ours} label="Direct explicit-card pipeline" />
            </div>
          </div>
          <p className="large-copy comparison-statement">{project.comparison.statement}</p>
          <p className="evidence-note">Runtime and memory advantages are a planned evaluation, not a current claim.</p>
        </div>
      </section>

      <section className="project-section process-section" id="process">
        <div className="content-wrap">
          <NumberedHeading number={7} title="Failure analysis & research process">
            <p>The formulation changed as each experiment made a different ambiguity visible.</p>
          </NumberedHeading>
          <ol className="research-timeline">
            {project.researchTimeline.map((item, index) => (
              <li key={item.phase}>
                <span className="timeline-number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <StatusPill tone={item.status === 'Ongoing' ? 'active' : 'neutral'}>{item.status}</StatusPill>
                  <h3>{item.phase}</h3>
                  <p>{item.insight}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="project-section limitations-section" id="limitations">
        <div className="content-wrap two-column-sections">
          <div>
            <NumberedHeading number={8} title="Current limitations" />
            <ul className="check-list limitation-list">
              {project.limitations.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <NumberedHeading number={9} title="Next steps" />
            <ol className="next-list">
              {project.nextSteps.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </div>
        </div>
      </section>
    </article>
  )
}
