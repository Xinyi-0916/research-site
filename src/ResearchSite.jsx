import { evaluation, findings, limitations, person, process, project, sections } from './data/siteData'

const Arrow = () => <span aria-hidden="true">↗</span>

function SectionHead({ number, title, note }) {
  return <header className="section-head"><span>{number}</span><div><h2>{title}</h2>{note && <p>{note}</p>}</div></header>
}

function ComparisonPair({ pair, caseId }) {
  return (
    <figure className="comparison-pair">
      <div className="pair-images">
        <div><span>Before</span><img src={pair.before} alt={`Case ${caseId}, ${pair.view}: Blender render before refinement`} loading="lazy" /></div>
        <div><span>Refined</span><img src={pair.after} alt={`Case ${caseId}, ${pair.view}: Blender render after refinement`} loading="lazy" /></div>
      </div>
      <figcaption>{pair.view} · direct output from the frozen evaluation render directory</figcaption>
    </figure>
  )
}

export default function ResearchSite() {
  return (
    <div className="research-shell">
      <aside className="sidebar">
        <div className="identity">
          <span className="initials" aria-hidden="true">{person.initials}</span>
          <div><h1>{person.name}</h1><p>{person.role}</p></div>
        </div>
        <p className="side-bio">{person.background}</p>
        <a className="portfolio-cta" href={person.portfolio} target="_blank" rel="noreferrer">
          <span>Animation / Art</span><strong>View Portfolio</strong><Arrow />
        </a>
        <div className="side-links">
          <a href={person.code} target="_blank" rel="noreferrer">Project code <Arrow /></a>
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
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="research-identity">{person.identity}</p>
          <div className="intro-links"><a href={person.code} target="_blank" rel="noreferrer">Code repository <Arrow /></a><span>{project.manuscript}</span></div>
          <blockquote>{project.centralObservation}</blockquote>
          <p className="lead">{project.motivation}</p>
        </section>

        <section className="content-section" id="problem">
          <SectionHead number="01" title="Problem formulation" />
          <div className="io-grid">
            <div><small>Input</small>{project.problem.input.map((item) => <strong key={item}>{item}</strong>)}</div>
            <div className="io-arrow" aria-hidden="true">→</div>
            <div><small>Output</small><strong>{project.problem.output}</strong></div>
          </div>
          <div className="objective-list">{project.problem.objectives.map((objective) => <span key={objective}>{objective}</span>)}</div>
          <p className="boundary-note"><strong>Scope boundary.</strong> {project.problem.boundary}</p>
        </section>

        <section className="content-section" id="method">
          <SectionHead number="02" title="Current method" note="Weak geometry is a soft prior; production validity is enforced as a hard constraint." />
          <div className="pipeline" aria-label="Method pipeline">
            {project.pipeline.map((step, index) => <div key={step}><span>{step}</span>{index < project.pipeline.length - 1 && <i aria-hidden="true">→</i>}</div>)}
          </div>
          <div className="validity-block"><h3>Hard validity checks</h3><ul>{project.validity.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </section>

        <section className="content-section" id="results">
          <SectionHead number="03" title="Current validated result" note={evaluation.scope} />
          <div className="artifact-bar"><span>Source artifact</span><code>{evaluation.artifact}</code><span>Runtime {evaluation.elapsed}</span></div>
          <div className="metrics">{evaluation.aggregate.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
          <div className="result-tables">
            <div><h3>Error-reduction distribution</h3><table><thead><tr><th>Split</th><th>Mean</th><th>P10</th><th>Median</th><th>P90</th></tr></thead><tbody><tr><th>Input</th><td>{evaluation.distribution.input.mean}</td><td>{evaluation.distribution.input.p10}</td><td>{evaluation.distribution.input.median}</td><td>{evaluation.distribution.input.p90}</td></tr><tr><th>Held-out</th><td>{evaluation.distribution.heldout.mean}</td><td>{evaluation.distribution.heldout.p10}</td><td>{evaluation.distribution.heldout.median}</td><td>{evaluation.distribution.heldout.p90}</td></tr></tbody></table></div>
            <div><h3>Frozen evaluation checks</h3><table className="check-table"><tbody>{evaluation.checks.map(([check, value]) => <tr key={check}><th>{check}</th><td className={value === 'Pass' ? 'pass' : ''}>{value}</td></tr>)}</tbody></table></div>
          </div>
          <p className="source-note">Values above are transcribed from <code>{evaluation.source}</code>; they are not presentation-only estimates.</p>
        </section>

        <section className="content-section" id="demonstrations">
          <SectionHead number="04" title="Evaluation demonstrations" note="Unedited Blender PNG outputs copied directly from the frozen evaluation directories." />
          <div className="demo-list">
            {evaluation.demonstrations.map((demo) => <article className="demo-case" key={demo.caseId}><header><div><h3>{demo.label}</h3><code>{demo.caseId}</code></div><p>{demo.note}</p></header><div className="pair-grid">{demo.pairs.map((pair) => <ComparisonPair key={pair.view} pair={pair} caseId={demo.caseId} />)}</div></article>)}
          </div>
          <p className="render-caveat">The percentage beside each case is aggregated over its full evaluation split; each displayed image is one named view. Visual improvement and production validity are evaluated separately.</p>
        </section>

        <section className="content-section" id="case-table">
          <SectionHead number="05" title="Complete 12-case results" note="No cases omitted, including the unchanged case." />
          <div className="table-scroll"><table className="case-table"><thead><tr><th>Case ID</th><th>Cards</th><th>Input before</th><th>Input after</th><th>Input Δ</th><th>Held-out before</th><th>Held-out after</th><th>Held-out Δ</th><th>H1</th></tr></thead><tbody>{evaluation.cases.map((row) => <tr key={row.id} className={row.inputReduction === 0 ? 'unchanged' : ''}><th>{row.id}</th><td>{row.cards}</td><td>{row.inputBefore.toFixed(4)}</td><td>{row.inputAfter.toFixed(4)}</td><td>{row.inputReduction.toFixed(2)}%</td><td>{row.heldoutBefore.toFixed(4)}</td><td>{row.heldoutAfter.toFixed(4)}</td><td>{row.heldoutReduction.toFixed(2)}%</td><td>{row.feasible ? 'Valid' : 'Fail'}</td></tr>)}</tbody></table></div>
        </section>

        <section className="content-section" id="findings">
          <SectionHead number="06" title="Research findings" />
          <div className="findings-list">{findings.map((finding) => <article key={finding.title}><span>{finding.label}</span><h3>{finding.title}</h3><p>{finding.body}</p></article>)}</div>
          <h3 className="process-title">How the formulation changed</h3>
          <ol className="process-list">{process.map(([phase, insight], index) => <li key={phase}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{phase}</strong><p>{insight}</p></div></li>)}</ol>
        </section>

        <section className="content-section final-section" id="limitations">
          <SectionHead number="07" title="Current limitations" note="The result above is evidence for the current oracle refinement setting, not a completed end-to-end production system." />
          <ul className="limitations">{limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="bottom-links"><a href={person.code} target="_blank" rel="noreferrer">Project code <Arrow /></a><a className="bottom-portfolio" href={person.portfolio} target="_blank" rel="noreferrer">Animation / Art Portfolio <Arrow /></a></div>
        </section>
        <footer>© {new Date().getFullYear()} {person.name} · Research website</footer>
      </main>
    </div>
  )
}
