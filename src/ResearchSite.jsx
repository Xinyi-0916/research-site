import { evaluation, findings, generatorBoundary, limitations, person, process, project, sections } from './data/siteData'

const Arrow = () => <span aria-hidden="true">↗</span>

function SectionHead({ number, title, note }) {
  return <header className="section-head"><span>{number}</span><div><h2>{title}</h2>{note && <p>{note}</p>}</div></header>
}

function ComparisonPair({ pair }) {
  return (
    <figure className="comparison-pair">
      <div className="pair-images">
        <div><span>Input</span><img src={pair.before} alt={`${pair.view}: weak-card input before refinement`} /></div>
        <div><span>Output</span><img src={pair.after} alt={`${pair.view}: best-valid refined-card output`} /></div>
      </div>
      <div className="view-metrics">{pair.metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.before} → {metric.after}{metric.unit || ''}</strong></div>)}</div>
      <figcaption>{pair.view} · source Blender output · white background presentation copy · mesh RGB preserved</figcaption>
    </figure>
  )
}

function ContractColumn({ label, items }) {
  return <div><small>{label}</small>{items.map((item) => <strong key={item}>{item}</strong>)}</div>
}

export default function ResearchSite() {
  return (
    <div className="research-shell">
      <aside className="sidebar">
        <div className="identity">
          <div><h1>{person.name}</h1><p>{person.role}</p></div>
        </div>
        <p className="side-bio">{person.background}</p>
        <a className="portfolio-cta" href={person.portfolio} target="_blank" rel="noreferrer">
          <span>Animation / Art</span><strong>View Portfolio</strong><Arrow />
        </a>
        <div className="side-links">
          <a href={person.code} target="_blank" rel="noreferrer">Research GitHub <Arrow /></a>
          <a href={person.github} target="_blank" rel="noreferrer">GitHub profile <Arrow /></a>
        </div>
        <nav className="project-index" aria-label="Project sections">
          <p>On this page</p>
          {sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.label}</a>)}
        </nav>
        <p className="side-status"><i /> {project.status}</p>
      </aside>

      <main className="research-main" id="main-content">
        <section className="project-intro" id="overview">
          <p className="kicker">Research project · Generative 3D / Production graphics</p>
          <h2>{project.title}</h2>
          <a className="research-repo-link" href={person.code} target="_blank" rel="noreferrer">
            <span>Research GitHub</span><strong>github.com/Xinyi-0916/3D_Generation_refinement</strong><Arrow />
          </a>
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
          <div className="target-definition"><span>Research target</span><strong>Production-equivalent explicit asset reconstruction</strong><p>{project.targetDefinition}</p></div>
        </section>

        <section className="content-section" id="methodology">
          <SectionHead number="02" title="Methodology" note={project.methodology.status} />
          <div className="method-pipeline">{project.methodology.steps.map((step, index) => <div className="method-stage" key={step.label}><article><span>{String(index + 1).padStart(2, '0')} · {step.label}</span><strong>{step.title}</strong></article>{index < project.methodology.steps.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>
          <div className="method-roles">{project.methodology.roles.map((role) => <article key={role.label}><span>{role.label}</span><h3>{role.title}</h3><p>{role.body}</p></article>)}</div>
          <p className="method-evidence"><strong>Evidence boundary.</strong> {project.methodology.evidenceBoundary}</p>
          <h3 className="subsection-title">Refiner contract and supervision boundary</h3>
          <div className="refiner-contract">
            <ContractColumn label="Card-state input" items={project.refiner.input} />
            <div className="io-arrow" aria-hidden="true">→</div>
            <ContractColumn label="Optimization + GT-only supervision" items={project.refiner.optimization} />
            <div className="io-arrow" aria-hidden="true">→</div>
            <ContractColumn label="Output" items={project.refiner.output} />
          </div>
          <p className="method-evidence refiner-depth-note"><strong>Depth boundary.</strong> {project.refiner.supervisionBoundary}</p>
          <div className="validity-block"><h3>Hard validity boundary</h3><ul>{project.validity.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </section>

        <section className="content-section" id="results">
          <SectionHead number="03" title="Experimental results" note={`${evaluation.scope} · frozen refiner`} />
          <div className="artifact-bar"><span>Source artifact</span><code>{evaluation.artifact}</code><span>Runtime {evaluation.elapsed}</span></div>
          <div className="metrics">{evaluation.aggregate.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
          <div className="result-tables">
            <div><h3>Error-reduction distribution</h3><table><thead><tr><th>Views</th><th>Mean</th><th>P10</th><th>Median</th><th>P90</th></tr></thead><tbody><tr><th>Input</th><td>{evaluation.distribution.input.mean}</td><td>{evaluation.distribution.input.p10}</td><td>{evaluation.distribution.input.median}</td><td>{evaluation.distribution.input.p90}</td></tr><tr><th>Held-out</th><td>{evaluation.distribution.heldout.mean}</td><td>{evaluation.distribution.heldout.p10}</td><td>{evaluation.distribution.heldout.median}</td><td>{evaluation.distribution.heldout.p90}</td></tr></tbody></table></div>
            <div><h3>Frozen checks</h3><table className="check-table"><tbody>{evaluation.checks.map(([check, value]) => <tr key={check}><th>{check}</th><td className={value === 'Pass' ? 'pass' : ''}>{value}</td></tr>)}</tbody></table></div>
          </div>
          <div className="production-audit">
            <header><span>Absolute production-distribution audit</span><strong>{evaluation.production.decision}</strong></header>
            <p>{evaluation.production.summary}</p>
            <table><tbody>{evaluation.production.rows.map(([metric, value]) => <tr key={metric}><th>{metric}</th><td>{value}</td></tr>)}</tbody></table>
          </div>
          <p className="source-note">All values are transcribed from <code>{evaluation.source}</code> and <code>{evaluation.productionSource}</code>.</p>
        </section>

        <section className="content-section" id="demonstrations">
          <SectionHead number="04" title="Refiner input / output" note="Each example uses the same two input cameras—Front and Side (right)—for a direct, consistent comparison." />
          <div className="input-output-key"><span><i className="weak-dot" /> Input = weak coarse K12 card set</span><span><i className="refined-dot" /> Output = selected best-valid refined K12 card set</span></div>
          <div className="metric-guide">
            <header><strong>How to read the view metrics</strong><span>Input → refined output</span></header>
            <div>{evaluation.metricDefinitions.map((metric) => <article key={metric.name}><strong>{metric.name}</strong><p>{metric.description}</p><span>{metric.direction}</span></article>)}</div>
          </div>
          <p className="reduction-definition"><strong>What does “input-view error reduction” mean?</strong> It is the case-level relative drop in the frozen composite render error across all six input cameras: <code>1 − refined error / coarse error</code>. The composite combines alpha/silhouette (4×), edge (2×), metric depth (2×), and surface-normal error (0.25×). “Held-out” reports the same calculation on three unseen evaluation cameras. It is not the percentage change of Alpha IoU.</p>
          <div className="demo-list">
            {evaluation.demonstrations.map((demo) => <article className="demo-case" key={demo.caseId}><header><div><h3>{demo.label}</h3><span className="card-count">{demo.cards}</span></div><div className="case-reductions"><div><strong>↓ {demo.reductions.input}</strong><span>Input-view composite error reduction</span></div><div><strong>↓ {demo.reductions.heldout}</strong><span>Held-out composite error reduction</span></div></div></header><div className="pair-grid">{demo.pairs.map((pair) => <ComparisonPair key={pair.view} pair={pair} />)}</div></article>)}
          </div>
          <p className="render-caveat">The displayed Front and Side images are two of the six input views; the percentages summarize all six input views or all three held-out views. Source Blender renders are unchanged except for replacing the uniform background with white; mesh RGB is preserved.</p>
        </section>

        <section className="content-section" id="generator-boundary">
          <SectionHead number="05" title="Generator: validated evidence" note={generatorBoundary.status} />
          <p className="section-lead">{generatorBoundary.summary}</p>
          <div className="generator-contract">
            <div><small>Deployable F1 input</small><strong>{generatorBoundary.f1.input}</strong></div>
            <div><small>Audited geometry probe</small><strong>{generatorBoundary.f1.output}</strong><p>{generatorBoundary.f1.variables}</p></div>
            <div><small>Validated geometry result</small><strong>{generatorBoundary.f1.validated}</strong></div>
          </div>
          <p className="depth-rule"><strong>Depth rule.</strong> {generatorBoundary.f1.depth}</p>

          <h3 className="subsection-title generator-subtitle">Validated milestones</h3>
          <div className="table-scroll">
            <table className="generator-milestone-table">
              <thead><tr><th>Stage</th><th>Status</th><th>Measured evidence</th><th>Method decision</th></tr></thead>
              <tbody>{generatorBoundary.milestones.map((row) => <tr key={row.stage}><th>{row.stage}</th><td><span className={`status-chip ${row.tone}`}>{row.status}</span></td><td>{row.evidence}</td><td>{row.decision}</td></tr>)}</tbody>
            </table>
          </div>

          <div className="generator-budget">
            <div>
              <span>Dataset and probe capacity</span>
              <h3>128 cards isolate geometry; the 320-query ceiling covers the observed data.</h3>
              <p>The fixed 128-card probe removes count and topology changes from the controlled geometry experiments. Separately, the audited 320-query ceiling covers the Train maximum of 293 cards without truncation.</p>
            </div>
            <div className="table-scroll"><table><thead><tr><th>Card-bearing split</th><th>Cases</th><th>Median</th><th>P90</th><th>P95</th><th>Max</th></tr></thead><tbody>{generatorBoundary.cardCounts.map((row) => <tr key={row.split}><th>{row.split}</th><td>{row.cases}</td><td>{row.median}</td><td>{row.p90}</td><td>{row.p95}</td><td>{row.max}</td></tr>)}</tbody></table></div>
          </div>

          <h3 className="subsection-title generator-subtitle">Visual evidence from the evaluation site</h3>
          <figure className="generator-depth-visual">
            <header><h3>{generatorBoundary.visuals.depth.title}</h3><span>Same case · same seed · two loss variants</span></header>
            <div><div><span>Normal + alpha</span><img src={generatorBoundary.visuals.depth.baseline} alt="Generator depth utility eval sheet using normal and alpha supervision" /></div><div><span>Normal + alpha + GT depth</span><img src={generatorBoundary.visuals.depth.treatment} alt="Generator depth utility eval sheet adding training-only GT depth supervision" /></div></div>
            <figcaption>{generatorBoundary.visuals.depth.caption}</figcaption>
          </figure>
          <div className="generator-diagnostic-grid">
            {generatorBoundary.visuals.diagnostics.map((visual) => <figure key={visual.title}><h3>{visual.title}</h3><img src={visual.image} alt={visual.title} /><figcaption>{visual.caption}</figcaption></figure>)}
          </div>
          <p className="source-note">All displayed generator visuals are unmodified copies from <code>evals/hair_target500_g1_depth_utility_study</code>. Table values are transcribed from: {generatorBoundary.sources.map((source, index) => <span key={source}><code>{source}</code>{index < generatorBoundary.sources.length - 1 ? '; ' : '.'}</span>)}</p>
        </section>

        <section className="content-section" id="findings">
          <SectionHead number="06" title="Current findings" />
          <div className="findings-list">{findings.map((finding) => <article key={finding.title}><span>{finding.label}</span><h3>{finding.title}</h3><p>{finding.body}</p></article>)}</div>
          <h3 className="process-title">Generator evidence established so far</h3>
          <ol className="process-list">{process.map(([phase, insight], index) => <li key={phase}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{phase}</strong><p>{insight}</p></div></li>)}</ol>
        </section>

        <section className="content-section final-section" id="limitations">
          <SectionHead number="07" title="Current limitations" note="Refiner and generator claims are deliberately separated." />
          <ul className="limitations">{limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <footer>© {new Date().getFullYear()} {person.name} · Research website</footer>
      </main>
    </div>
  )
}
