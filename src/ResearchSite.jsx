import { useState } from 'react'
import { evaluation, findings, limitations, overviewDemonstration, person, project, rendererDemonstration, sections } from './data/siteData'

const Arrow = () => <span aria-hidden="true">↗</span>

function MathFormula({ tex, block = false }) {
  return <span data-math-tex={tex} data-math-block={block ? 'true' : 'false'} className={block ? 'math-display' : 'math-inline'}>{block ? `\\[${tex}\\]` : `\\(${tex}\\)`}</span>
}

function SectionHead({ number, title, note }) {
  return <header className="section-head"><span>{number}</span><div><h2>{title}</h2>{note && <p>{note}</p>}</div></header>
}

function ComparisonPair({ pair }) {
  return (
    <figure className="comparison-pair">
      <header className="pair-view-head"><strong>{pair.view} view</strong><span>Input → Output → Reference</span></header>
      <div className={`pair-images${pair.gt ? ' has-gt' : ''}`}>
        <div><span>Input</span><img src={pair.before} alt={`${pair.view}: weak-card input before refinement`} /></div>
        <div><span>Output</span><img src={pair.after} alt={`${pair.view}: best-valid refined-card output`} /></div>
        {pair.gt && <div><span>Reference</span><img src={pair.gt} alt={`${pair.view}: reference target render from the same camera`} /></div>}
      </div>
      <div className="view-metrics">{pair.metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.before} → {metric.after}{metric.unit || ''}</strong></div>)}</div>
      <figcaption>{pair.gt ? 'Input and output are measured against the reference shown above · ' : ''}source Blender output · white background presentation copy · mesh RGB preserved</figcaption>
    </figure>
  )
}

function ContractColumn({ label, items }) {
  return <div><small>{label}</small>{items.map((item) => <strong key={item}>{item}</strong>)}</div>
}

function OverviewDemonstration() {
  return (
    <div className="overview-demonstration" aria-labelledby="overview-demo-title">
      <header><h3 id="overview-demo-title">{overviewDemonstration.title}</h3><p>{overviewDemonstration.note}</p></header>
      <div className="overview-demo-flow">
        {overviewDemonstration.stages.map((stage, index) => (
          <div className="overview-demo-step" key={stage.label}>
            <figure className="overview-demo-stage">
              <img src={stage.image} alt={stage.alt} />
              <figcaption><strong>{stage.label}</strong><span>{stage.detail}</span></figcaption>
            </figure>
            {index < overviewDemonstration.stages.length - 1 && <i aria-hidden="true">→</i>}
          </div>
        ))}
      </div>
    </div>
  )
}

function RefinerVisualResults() {
  const [activeDemo, setActiveDemo] = useState(0)
  const demo = evaluation.demonstrations[activeDemo]
  const moveDemo = (direction) => setActiveDemo((current) => (current + direction + evaluation.demonstrations.length) % evaluation.demonstrations.length)
  return (
    <div className="refiner-visual-results" id="demonstrations">
      <h3 className="subsection-title">Visual results</h3>
      <p className="subsection-note">Each example uses the same two input cameras—Front and Side (right)—for a direct, consistent comparison.</p>
      <div className="input-output-key"><span><i className="weak-dot" /> Input = weak coarse K12 card set</span><span><i className="refined-dot" /> Output = selected best-valid refined K12 card set</span><span><i className="gt-dot" /> Reference = source asset rendered from the same view camera</span></div>
      <p className="demonstration-selection"><strong>Case selection.</strong> {evaluation.demonstrationSelection}</p>
      <div className="demo-carousel">
        <div className="carousel-toolbar">
          <div className="carousel-tabs" role="tablist" aria-label="Select a visual result case">
            {evaluation.demonstrations.map((item, index) => <button type="button" role="tab" aria-selected={index === activeDemo} className={index === activeDemo ? 'active' : ''} onClick={() => setActiveDemo(index)} key={item.caseId}><b>{String(index + 1).padStart(2, '0')}</b><span>Rank {index + 1}</span></button>)}
          </div>
          <div className="carousel-controls"><span>{activeDemo + 1} / {evaluation.demonstrations.length}</span><button type="button" onClick={() => moveDemo(-1)} aria-label="Previous visual result">←</button><button type="button" onClick={() => moveDemo(1)} aria-label="Next visual result">→</button></div>
        </div>
        <article className="demo-case" key={demo.caseId} aria-live="polite"><header><div><h3>{demo.label}</h3><span className="card-count">{demo.cards} · case {demo.caseId}</span></div><div className="case-reductions"><div><strong>↓ {demo.reductions.input}</strong><span>Input-view composite error reduction</span></div><div><strong>↓ {demo.reductions.heldout}</strong><span>Held-out composite error reduction</span></div><div><strong>{demo.reductions.combined}</strong><span>Two-split arithmetic mean · ranking score</span></div></div></header><div className="pair-grid">{demo.pairs.map((pair) => <ComparisonPair key={pair.view} pair={pair} />)}</div></article>
      </div>
      <div className="metric-guide metric-guide--compact">
        <header><strong>Metrics</strong><span>Input → refined · ↑ higher / ↓ lower is better</span></header>
        <div>{evaluation.metricDefinitions.map((metric) => <article key={metric.name}><strong>{metric.name}</strong><p>{metric.description}</p><span>{metric.direction}</span></article>)}</div>
      </div>
      <p className="render-caveat"><strong>Note.</strong> Front and Side are representative input views. Reduction percentages aggregate all six input cameras or three unseen held-out cameras; they are not changes in one displayed metric.</p>
    </div>
  )
}

function RendererLossChart() {
  return (
    <figure className="renderer-chart" id="renderer-chart">
      <header className="renderer-chart-head">
        <div><span>Frozen supervision route</span><h3>{rendererDemonstration.title}</h3></div>
        <p>{rendererDemonstration.subtitle}</p>
      </header>
      <div className="renderer-flow">
        {rendererDemonstration.stages.map((stage, index) => (
          <div className="renderer-flow-step" key={stage.title}>
            <article><h4>{stage.title}</h4><img src={stage.image} alt={stage.alt} /><p>{stage.detail}</p></article>
            {index < rendererDemonstration.stages.length - 1 && <i aria-hidden="true">→</i>}
          </div>
        ))}
      </div>
      <div className="renderer-chart-detail">
        <section className="loss-map-panel">
          <header><h4>Four geometry losses</h4><span>Frozen composite weights</span></header>
          <div>{rendererDemonstration.losses.map((loss) => <article key={loss.title}><div><h5>{loss.title}</h5><strong>{loss.weight}</strong></div><img src={loss.image} alt={loss.alt} /><p>{loss.detail}</p></article>)}</div>
        </section>
        <section className="route-panel">
          <header><h4>Why this route?</h4></header>
          <ol>{rendererDemonstration.routeReasons.map((reason) => <li key={reason}>{reason}</li>)}</ol>
        </section>
      </div>
      <section className="renderer-safeguards">
        <header><h4>Safeguards</h4></header>
        <div>{rendererDemonstration.safeguards.map((item) => <article key={item.title}><span aria-hidden="true">✓</span><p><strong>{item.title}.</strong> {item.body}</p></article>)}</div>
      </section>
      <figcaption>{rendererDemonstration.provenance}</figcaption>
    </figure>
  )
}

function ResultsCharts() {
  return (
    <section className="results-charts" aria-labelledby="results-charts-title">
      <header><div><span>Visual summary</span><h3 id="results-charts-title">Population performance at a glance</h3></div><p>Complete 49-case card-bearing Validation population · higher is better</p></header>
      <div className="chart-grid">
        <figure className="heldout-chart">
          <figcaption><strong>Held-out error: initial vs. refined</strong><span>Per-case composite error normalized to initial = 1.00 · lower is better</span></figcaption>
          <div className="chart-legend"><span><i className="initial-swatch" />Initial</span><span><i className="refined-swatch" />Refined</span></div>
          <div className="vertical-comparison">{evaluation.heldoutComparison.map((row) => <div className="comparison-group" key={row.label}><div className="comparison-columns"><div className="comparison-column initial-bar" style={{ height: `${row.initial * 100}%` }}><b>{row.initial.toFixed(2)}</b></div><div className="comparison-column refined-bar" style={{ height: `${row.refined * 100}%` }}><b>{row.refined.toFixed(2)}</b></div></div><strong>{row.label}</strong><span>{row.detail}</span></div>)}</div>
          <div className="vertical-axis"><span>1.00</span><span>.75</span><span>.50</span><span>.25</span><span>0</span></div>
        </figure>

        <figure className="coverage-chart">
          <figcaption><strong>Population coverage</strong><span>Valid and improved outputs across all card-bearing cases</span></figcaption>
          <div className="coverage-stat"><div><strong>98.0%</strong><span>Improved on both splits</span></div><div className="coverage-track"><i style={{ width: `${48 / 49 * 100}%` }} /></div><small>48 of 49 cases</small></div>
          <div className="coverage-stat"><div><strong>100%</strong><span>H1-valid selected outputs</span></div><div className="coverage-track validity"><i /></div><small>49 of 49 cases</small></div>
          <p>48 of 49 cases improve on both input and held-out views; every selected output remains H1-valid.</p>
        </figure>
      </div>
    </section>
  )
}

export default function ResearchSite() {
  return (
    <div className="research-shell">
      <header className="site-header">
        <a className="site-brand" href="#overview"><strong>{person.name}</strong><span>{person.role}</span></a>
        <nav className="project-index" aria-label="Project sections">
          {sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}
        </nav>
        <div className="header-links">
          <a href={person.portfolio} target="_blank" rel="noreferrer">Portfolio <Arrow /></a>
          <a href={person.code} target="_blank" rel="noreferrer">Code <Arrow /></a>
        </div>
      </header>

      <main className="research-main" id="main-content">
        <section className="project-intro" id="overview">
          <p className="kicker">Research project · 3D geometry / Production graphics</p>
          <h2>{project.title}</h2>
          <p className="hero-author"><a href={person.github} target="_blank" rel="noreferrer">{person.name}</a></p>
          <p className="hero-affiliation">3D AI &amp; Graphics Research · Animation / CGT Production</p>
          <a className="research-repo-link" href={person.code} target="_blank" rel="noreferrer">
            <span>Code</span><strong>Research GitHub</strong><Arrow />
          </a>
          <OverviewDemonstration />
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="research-identity">{person.identity}</p>
          <div className="intro-meta"><span>{project.manuscript}</span><span>{project.status}</span></div>
          <blockquote><span>Research goal</span>{project.centralObservation}</blockquote>
          <p className="lead">{project.motivation}</p>
        </section>

        <section className="content-section" id="motivation">
          <SectionHead number="01" title="Motivation" note="Why appearance alone is not an adequate objective for production hair assets." />
          <p className="motivation-lead">{project.motivationLead}</p>
          <div className="motivation-grid">{project.motivationPoints.map((point) => <article key={point.label}><span>{point.label}</span><h3>{point.title}</h3><p>{point.body}</p></article>)}</div>
          <div className="target-definition"><span>Research target</span><strong>Production-equivalent explicit asset refinement</strong><p>{project.targetDefinition}</p></div>
        </section>

        <section className="content-section" id="methodology">
          <SectionHead number="02" title="Methodology" note={project.methodology.status} />
          <div className="method-pipeline">{project.methodology.steps.map((step, index) => <div className="method-stage" key={step.label}><article><span>{String(index + 1).padStart(2, '0')} · {step.label}</span><strong>{step.title}</strong></article>{index < project.methodology.steps.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>
          <aside className="k12-explainer" aria-labelledby="k12-title">
            <div className="k12-copy"><span>{project.methodology.k12.label}</span><h3 id="k12-title">{project.methodology.k12.title}</h3><p>{project.methodology.k12.body}</p></div>
            <div className="k12-visual">
              <div className="k12-knot-track" role="img" aria-label="Twelve ordered knots from fixed root q0 to tip q11">
                {Array.from({ length: 12 }, (_, index) => <span className={index === 0 ? 'root-knot' : index === 11 ? 'tip-knot' : ''} key={index}><i />{index === 0 || index === 11 ? <b>q{index}</b> : <small>q{index}</small>}</span>)}
              </div>
              <div className="k12-axis"><span>Fixed root</span><span>Ordered root-to-tip flow</span><span>Tip</span></div>
              <strong>{project.methodology.k12.summary}</strong>
            </div>
          </aside>
          <div className="method-roles">{project.methodology.roles.map((role) => <article key={role.label}><span>{role.label}</span><h3>{role.title}</h3><p>{role.body}</p></article>)}</div>
          <p className="method-evidence"><strong>Evidence boundary.</strong> {project.methodology.evidenceBoundary}</p>
          <RendererLossChart />
        </section>

        <section className="content-section" id="refiner">
          <SectionHead number="03" title="Refiner" note={`${evaluation.scope} · frozen B1/H1`} />
          <RefinerVisualResults />
          <h3 className="subsection-title">Refiner contract and supervision boundary</h3>
          <div className="refiner-contract">
            <ContractColumn label="Card-state input" items={project.refiner.input} />
            <div className="io-arrow" aria-hidden="true">→</div>
            <ContractColumn label="Optimization + GT-only supervision" items={project.refiner.optimization} />
            <div className="io-arrow" aria-hidden="true">→</div>
            <ContractColumn label="Output" items={project.refiner.output} />
          </div>
          <p className="method-evidence refiner-depth-note"><strong>Depth boundary.</strong> {project.refiner.supervisionBoundary}</p>
          <div className="refiner-loss">
            <header><span>Frozen refiner objective</span><div><MathFormula tex={project.refiner.objective.formula} block /><MathFormula tex={project.refiner.objective.renderFormula} block /></div></header>
            <div className="loss-terms">{project.refiner.objective.terms.map((term) => <article key={term.label}><span>{term.label}</span><MathFormula tex={term.symbol} block /><p>{term.effect}</p></article>)}</div>
            <p><strong>Hard boundary.</strong> {project.refiner.objective.hardBoundary}</p>
          </div>
          <h3 className="subsection-title" id="results">Population results</h3>
          <div className="artifact-bar"><span>Source artifact</span><code>{evaluation.artifact}</code><span>Runtime {evaluation.elapsed}</span></div>
          <div className="metrics">{evaluation.aggregate.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
          <ResultsCharts />
          <div className="result-tables">
            <div><h3>Error-reduction distribution</h3><table><thead><tr><th>Views</th><th>Mean</th><th>P10</th><th>Median</th><th>P90</th></tr></thead><tbody><tr><th>Input</th><td>{evaluation.distribution.input.mean}</td><td>{evaluation.distribution.input.p10}</td><td>{evaluation.distribution.input.median}</td><td>{evaluation.distribution.input.p90}</td></tr><tr><th>Held-out</th><td>{evaluation.distribution.heldout.mean}</td><td>{evaluation.distribution.heldout.p10}</td><td>{evaluation.distribution.heldout.median}</td><td>{evaluation.distribution.heldout.p90}</td></tr></tbody></table><p className="table-explainer">{evaluation.distributionGuide}</p></div>
            <div><h3>Frozen checks</h3><table className="check-table"><tbody>{evaluation.checks.map(([check, value]) => <tr key={check}><th>{check}</th><td className={value === 'Pass' ? 'pass' : ''}>{value}</td></tr>)}</tbody></table></div>
          </div>
          <div className="production-audit">
            <header><span>Absolute production-distribution audit</span><strong>{evaluation.production.decision}</strong></header>
            <p>{evaluation.production.summary}</p>
            <table><tbody>{evaluation.production.rows.map(([metric, value]) => <tr key={metric}><th>{metric}</th><td>{value}</td></tr>)}</tbody></table>
          </div>
          <p className="source-note">All values are transcribed from <code>{evaluation.source}</code> and <code>{evaluation.productionSource}</code>.</p>
        </section>

        <section className="content-section" id="findings">
          <SectionHead number="04" title="Current findings" />
          <div className="findings-list">{findings.map((finding) => <article key={finding.title}><span>{finding.label}</span><h3>{finding.title}</h3><p>{finding.body}</p></article>)}</div>
        </section>

        <section className="content-section resources-section" id="resources">
          <SectionHead number="05" title="Code & data" note="Frozen refiner implementation, contracts, evaluation material, and the VRoid preprocessing route." />
          <div className="resource-grid">
            <article><span>Code release</span><h3>Known-layout B1/H1 refiner</h3><p>The recovered frozen implementation includes the K12 representation, joint renderer, constrained optimizer, H1 validity checks, contracts, and evaluation protocol.</p><a href="https://github.com/Xinyi-0916/3D_Generation_refinement/tree/main/refiner" target="_blank" rel="noreferrer">Browse refiner code <Arrow /></a></article>
            <article><span>Data preparation</span><h3>VRoid to research assets</h3><p>Raw VRM files are not redistributed. Follow the PAniC-3D downloader, then use the released Blender/VRM add-on scripts and hair-card extraction utilities.</p><a href="https://github.com/Xinyi-0916/3D_Generation_refinement/tree/main/data_pipeline" target="_blank" rel="noreferrer">View preprocessing code <Arrow /></a></article>
          </div>
          <p className="dataset-note"><strong>Dataset policy.</strong> This project uses character models from VRoid Hub. Raw VRM files remain subject to their original asset licenses and platform terms, so the repository provides processing code, metadata contracts, and split information rather than redistributing source models.</p>
        </section>

        <section className="content-section final-section" id="limitations">
          <SectionHead number="06" title="Current limitations" note="Scope of the frozen refiner evidence." />
          <ul className="limitations">{limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <footer>© {new Date().getFullYear()} {person.name} · Research website</footer>
      </main>
    </div>
  )
}
