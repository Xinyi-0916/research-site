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
          <h3 className="subsection-title">Frozen refiner contract</h3>
          <div className="refiner-contract">
            <ContractColumn label="Input" items={project.refiner.input} />
            <div className="io-arrow" aria-hidden="true">→</div>
            <ContractColumn label="Joint optimization" items={project.refiner.optimization} />
            <div className="io-arrow" aria-hidden="true">→</div>
            <ContractColumn label="Output" items={project.refiner.output} />
          </div>
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
          <SectionHead number="05" title="Generator target boundary" note={generatorBoundary.status} />
          <p className="section-lead">{generatorBoundary.summary}</p>
          <div className="generator-contract">
            <div><small>Deployable F1 input</small><strong>{generatorBoundary.f1.input}</strong></div>
            <div><small>Coarse generator output</small><strong>{generatorBoundary.f1.output}</strong><p>{generatorBoundary.f1.variables}</p></div>
            <div><small>Next handoff gate</small><strong>{generatorBoundary.f1.nextGate}</strong></div>
          </div>
          <p className="depth-rule"><strong>Depth rule.</strong> {generatorBoundary.f1.depth}</p>
          <div className="basin-callout">
            <div><span>Measured correction-entry boundary</span><strong>{generatorBoundary.largestSupported}</strong></div>
            <code>{generatorBoundary.formula}</code>
            <p>{generatorBoundary.scope}</p>
          </div>
          <div className="boundary-grid">
            <div className="table-scroll"><table className="boundary-table"><thead><tr><th>Start error</th><th>Status</th><th>Input Δ</th><th>Held-out Δ</th><th>Terminal input</th><th>Terminal held-out</th></tr></thead><tbody>{generatorBoundary.levels.map((row) => <tr key={row.factor} className={row.status === 'Pass' ? 'boundary-pass' : 'boundary-fail'}><th>{row.factor}</th><td>{row.status}</td><td>{row.input}</td><td>{row.heldout}</td><td>{row.terminalInput}</td><td>{row.terminalHeldout}</td></tr>)}</tbody></table></div>
            <div className="gate-list"><h3>Pass requires all four</h3><ul>{generatorBoundary.gates.map((gate) => <li key={gate}>{gate}</li>)}</ul></div>
          </div>
          <p className="boundary-note"><strong>Interpretation.</strong> Starts at 1.5×–4× still reduce their own larger errors, but finish worse than the accepted 1× endpoint and therefore fail. The measured <em>f ≤ 1</em> limit applies to the later K12 refiner handoff; the active F1 generator must first establish stable coarse-card 3D layout.</p>
          <p className="source-note">Boundary values are transcribed from <code>{generatorBoundary.artifact}</code>.</p>
        </section>

        <section className="content-section" id="findings">
          <SectionHead number="06" title="Current findings" />
          <div className="findings-list">{findings.map((finding) => <article key={finding.title}><span>{finding.label}</span><h3>{finding.title}</h3><p>{finding.body}</p></article>)}</div>
          <h3 className="process-title">Why the generator changed</h3>
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
