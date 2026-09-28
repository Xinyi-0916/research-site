import { evaluation, findings, limitations, overviewDemonstration, person, project, sections } from './data/siteData'

const Arrow = () => <span aria-hidden="true">↗</span>

function SectionHead({ number, title, note }) {
  return <header className="section-head"><span>{number}</span><div><h2>{title}</h2>{note && <p>{note}</p>}</div></header>
}

function ContractColumn({ label, items }) {
  return <div><small>{label}</small>{items.map((item) => <strong key={item}>{item}</strong>)}</div>
}

function OverviewDemonstration() {
  return (
    <div className="overview-demonstration">
      <header><span>Visual target</span><div><h3>{overviewDemonstration.title}</h3><p>{overviewDemonstration.note}</p></div></header>
      <div className="overview-demo-flow">
        {overviewDemonstration.stages.map((stage, index) => (
          <div className="overview-demo-stage" key={stage.label}>
            <figure><img src={stage.image} alt={stage.alt} /><figcaption><strong>{stage.label}</strong><span>{stage.detail}</span></figcaption></figure>
            {index < overviewDemonstration.stages.length - 1 && <i aria-hidden="true">→</i>}
          </div>
        ))}
      </div>
    </div>
  )
}

function BestCaseResults() {
  return (
    <div className="best-case-results">
      <header className="best-case-intro"><div><span>Representative validation results</span><h3>Three strongest cases under the current 3D metric</h3></div><p>Ranked by per-case 3D curve F1 at 0.03H. Orange is the R3.4 prediction, pale blue is the matching GT centerline set, and the adjacent image is the GT hair-card render.</p></header>
      <div className="result-legend"><span><i className="predicted-line" />R3.4 prediction</span><span><i className="target-line" />GT centerlines</span><span><i className="target-render" />GT card render</span></div>
      <div className="best-case-list">
        {evaluation.bestCases.map((item) => (
          <article className="best-case" key={item.rank}>
            <header><div><span>Validation rank {item.rank}</span><strong>{item.f1_3d}</strong><small>3D curve F1 @ 0.03H</small></div><p>{item.cards} GT cards</p></header>
            <div className="best-case-views">
              {item.views.map((view) => (
                <figure key={view.label}>
                  <figcaption>{view.label} view</figcaption>
                  <div className="best-case-images"><div><span>Prediction + GT</span><img src={view.prediction} alt={`${view.label} view of R3.4 predicted centerlines over the GT centerline set`} /></div><div><span>GT hair cards</span><img src={view.target} alt={`${view.label} view of the ground-truth hair-card render`} /></div></div>
                </figure>
              ))}
            </div>
            <div className="best-case-metrics"><div><span>3D curve F1</span><strong>{item.f1_3d}</strong></div><div><span>Input-view 2D F1</span><strong>{item.f1_input}</strong></div><div><span>Held-out 2D F1</span><strong>{item.f1_heldout}</strong></div><div><span>Predicted / GT arc length</span><strong>{item.arcRatio}</strong></div></div>
          </article>
        ))}
      </div>
      <p className="result-definition"><strong>Metric scope.</strong> 3D F1 is arc-length-weighted distance-tube coverage at 0.03 head heights; both 2D values use the 8 px operating point. Input-view uses cameras seen by the model, while held-out uses unseen cameras. An arc-length ratio of 1.0 means predicted and GT total centerline lengths match.</p>
    </div>
  )
}

function C1Results() {
  return (
    <div className="refiner-visual-results" id="results">
      <h3 className="subsection-title">Promoted C1 result</h3>
      <p className="subsection-note">R3.4 is the current route. The separate <a href={evaluation.links[0].href} target="_blank" rel="noreferrer">head-focused evaluation page</a> contains the visual check, audit files, and the R3.5 diagnosis.</p>
      <div className="metrics">{evaluation.aggregate.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
      <BestCaseResults />
      <div className="result-tables">
        <div><h3>R3.4 versus R3.5</h3><table><thead><tr><th>Validation measure</th><th>R3.4 promoted</th><th>R3.5 diagnostic</th></tr></thead><tbody>{evaluation.comparison.map(([label, r34, r35]) => <tr key={label}><th>{label}</th><td>{r34}</td><td>{r35}</td></tr>)}</tbody></table><p className="table-explainer">{evaluation.r35.body}</p></div>
        <div><h3>Contract checks</h3><table className="check-table"><tbody>{evaluation.checks.map(([check, value]) => <tr key={check}><th>{check}</th><td className={value.startsWith('Pass') ? 'pass' : ''}>{value}</td></tr>)}</tbody></table></div>
      </div>
      <div className="production-audit"><header><span>Current decision</span><strong>R3.4 PROMOTED</strong></header><p>R3.5 is retained as a paired diagnostic only. The next C1 work should address trajectory, depth, and arc-length tails without changing the frozen root contract.</p><div className="links">{evaluation.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <Arrow /></a>)}</div></div>
      <p className="source-note">Source artifact: <code>{evaluation.artifact}</code> · {evaluation.scope} · {evaluation.elapsed}</p>
    </div>
  )
}

export default function ResearchSite() {
  return (
    <div className="research-shell">
      <aside className="sidebar">
        <div className="identity"><div><h1>{person.name}</h1><p>{person.role}</p></div></div>
        <p className="side-bio">{person.background}</p>
        <a className="portfolio-cta" href={person.portfolio} target="_blank" rel="noreferrer"><span>Animation / Art</span><strong>View Portfolio</strong><Arrow /></a>
        <div className="side-links"><a href={person.code} target="_blank" rel="noreferrer">Research GitHub <Arrow /></a><a href={person.github} target="_blank" rel="noreferrer">GitHub profile <Arrow /></a></div>
        <nav className="project-index" aria-label="Project sections"><p>On this page</p>{sections.map((section) => <a key={section.id} href={`#${section.id}`}><span>{section.number}</span>{section.label}</a>)}</nav>
        <p className="side-status"><i /> {project.status}</p>
      </aside>

      <main className="research-main" id="main-content">
        <section className="project-intro" id="overview">
          <p className="kicker">Research project · Generative 3D / Production graphics</p>
          <h2>{project.title}</h2>
          <a className="research-repo-link" href={person.code} target="_blank" rel="noreferrer"><span>Research GitHub</span><strong>github.com/Xinyi-0916/3D_Generation_refinement</strong><Arrow /></a>
          <p className="project-subtitle">{project.subtitle}</p><p className="research-identity">{person.identity}</p>
          <div className="intro-meta"><span>{project.manuscript}</span><span>{project.status}</span></div>
          <blockquote><span>Research goal</span>{project.centralObservation}</blockquote><p className="lead">{project.motivation}</p>
          <OverviewDemonstration />
        </section>

        <section className="content-section" id="motivation"><SectionHead number="01" title="Problem" note="Why fixed geometry and 3D curve evidence are necessary." /><p className="motivation-lead">{project.motivationLead}</p><div className="motivation-grid">{project.motivationPoints.map((point) => <article key={point.label}><span>{point.label}</span><h3>{point.title}</h3><p>{point.body}</p></article>)}</div><div className="target-definition"><span>Research target</span><strong>Auditable fixed-layout centerlines</strong><p>{project.targetDefinition}</p></div></section>

        <section className="content-section" id="methodology"><SectionHead number="02" title="Methodology" note={project.methodology.status} /><div className="method-pipeline">{project.methodology.steps.map((step, index) => <div className="method-stage" key={step.label}><article><span>{String(index + 1).padStart(2, '0')} · {step.label}</span><strong>{step.title}</strong></article>{index < project.methodology.steps.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div><div className="method-roles">{project.methodology.roles.map((role) => <article key={role.label}><span>{role.label}</span><h3>{role.title}</h3><p>{role.body}</p></article>)}</div><p className="method-evidence"><strong>Evidence boundary.</strong> {project.methodology.evidenceBoundary}</p></section>

        <section className="content-section" id="refiner"><SectionHead number="03" title="C1 evaluation" note={evaluation.scope} /><C1Results /><h3 className="subsection-title">Fixed C1 contract</h3><div className="refiner-contract"><ContractColumn label="Input" items={project.refiner.input} /><div className="io-arrow" aria-hidden="true">→</div><ContractColumn label="Optimization" items={project.refiner.optimization} /><div className="io-arrow" aria-hidden="true">→</div><ContractColumn label="Output" items={project.refiner.output} /></div><p className="method-evidence refiner-depth-note"><strong>Supervision boundary.</strong> {project.refiner.supervisionBoundary}</p><div className="refiner-loss"><header><span>Coverage objective</span><div><code>{project.refiner.objective.formula}</code><code>{project.refiner.objective.renderFormula}</code></div></header><div className="loss-terms">{project.refiner.objective.terms.map((term) => <article key={term.label}><span>{term.label}</span><code>{term.symbol}</code><p>{term.effect}</p></article>)}</div><p><strong>Hard boundary.</strong> {project.refiner.objective.hardBoundary}</p></div></section>

        <section className="content-section" id="findings"><SectionHead number="04" title="Findings" /><div className="findings-list">{findings.map((finding) => <article key={finding.title}><span>{finding.label}</span><h3>{finding.title}</h3><p>{finding.body}</p></article>)}</div></section>
        <section className="content-section final-section" id="limitations"><SectionHead number="05" title="Limitations" note="Scope of the current C1 evidence." /><ul className="limitations">{limitations.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <footer>© {new Date().getFullYear()} {person.name} · Research website</footer>
      </main>
    </div>
  )
}
