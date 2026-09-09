import { evaluation, findings, generatorBoundary, limitations, person, process, project, sections } from './data/siteData'

const Arrow = () => <span aria-hidden="true">↗</span>

function SectionHead({ number, title, note }) {
  return <header className="section-head"><span>{number}</span><div><h2>{title}</h2>{note && <p>{note}</p>}</div></header>
}

function ComparisonPair({ pair, caseId }) {
  return (
    <figure className="comparison-pair">
      <div className="pair-images">
        <div><span>Input</span><img src={pair.before} alt={`Case ${caseId}, ${pair.view}: weak-card input before refinement`} /></div>
        <div><span>Output</span><img src={pair.after} alt={`Case ${caseId}, ${pair.view}: best-valid refined-card output`} /></div>
      </div>
      <div className="view-metrics">{pair.metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.before} → {metric.after}{metric.unit || ''}</strong></div>)}</div>
      <figcaption>{pair.view} · source Blender output · display-only white-background inversion</figcaption>
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

      <main className="research-main">
        <section className="project-intro" id="overview">
          <p className="kicker">Research project · Generative 3D / Production graphics</p>
          <h2>{project.title}</h2>
          <a className="research-repo-link" href={person.code} target="_blank" rel="noreferrer">
            <span>Research GitHub</span><strong>github.com/Xinyi-0916/3D_Generation_refinement</strong><Arrow />
          </a>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="research-identity">{person.identity}</p>
          <div className="intro-meta"><span>{project.manuscript}</span><span>{project.status}</span></div>
          <blockquote>{project.centralObservation}</blockquote>
          <p className="lead">{project.motivation}</p>
        </section>

        <section className="content-section" id="refiner">
          <SectionHead number="01" title="Frozen refiner: input → output" note="The current validated component is an optimization-based, known-root / known-slot refiner—not yet an amortized network." />
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
          <SectionHead number="02" title="Population-supported refiner" note={evaluation.scope} />
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
          <SectionHead number="03" title="Refiner input / output" note="Source Blender PNGs from the complete population evaluation; a display-only tonal inversion changes the black background to white." />
          <div className="input-output-key"><span><i className="weak-dot" /> Input = weak coarse K12 card set</span><span><i className="refined-dot" /> Output = selected best-valid refined K12 card set</span></div>
          <div className="demo-list">
            {evaluation.demonstrations.map((demo) => <article className="demo-case" key={demo.caseId}><header><div><h3>{demo.label}</h3><code>{demo.caseId}</code></div><p>{demo.note}</p></header><div className="pair-grid">{demo.pairs.map((pair) => <ComparisonPair key={pair.view} pair={pair} caseId={demo.caseId} />)}</div></article>)}
          </div>
          <p className="render-caveat">Percentages are case-level reductions aggregated over all views in each split; each image above is one named view. The examples include a near-median case, the repaired correctness-closure case, and a strong held-out case.</p>
        </section>

        <section className="content-section" id="generator-boundary">
          <SectionHead number="04" title="Generator target boundary" note={generatorBoundary.status} />
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
          <SectionHead number="05" title="Current findings" />
          <div className="findings-list">{findings.map((finding) => <article key={finding.title}><span>{finding.label}</span><h3>{finding.title}</h3><p>{finding.body}</p></article>)}</div>
          <h3 className="process-title">Why the generator changed</h3>
          <ol className="process-list">{process.map(([phase, insight], index) => <li key={phase}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{phase}</strong><p>{insight}</p></div></li>)}</ol>
        </section>

        <section className="content-section final-section" id="limitations">
          <SectionHead number="06" title="Current limitations" note="Refiner and generator claims are deliberately separated." />
          <ul className="limitations">{limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="bottom-links"><a href={person.code} target="_blank" rel="noreferrer">Research GitHub <Arrow /></a><a className="bottom-portfolio" href={person.portfolio} target="_blank" rel="noreferrer">Animation / Art Portfolio <Arrow /></a></div>
        </section>
        <footer>© {new Date().getFullYear()} {person.name} · Research website</footer>
      </main>
    </div>
  )
}
