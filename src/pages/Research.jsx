import { PageIntro, SectionHeading } from '../components/UI'
import { pageCopy, researchInterests } from '../data/siteData'

export default function Research() {
  return (
    <>
      <PageIntro eyebrow="Research" title="Graphics research grounded in how assets are actually made and used.">
        <p>{pageCopy.research.intro}</p>
      </PageIntro>
      <section className="section research-list-section">
        <div className="content-wrap">
          <SectionHeading eyebrow="Research interests" title="Four connected directions" />
          <div className="research-list">
            {researchInterests.map((interest) => (
              <article key={interest.index} className="research-item">
                <span className="research-index">{interest.index}</span>
                <div>
                  <h2>{interest.title}</h2>
                  <p>{interest.summary}</p>
                  <ul className="topic-list">
                    {interest.topics.map((topic) => <li key={topic}>{topic}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section research-question-section">
        <div className="content-wrap statement-grid">
          <div>
            <p className="eyebrow">Connecting question</p>
            <h2>What survives after the render?</h2>
          </div>
          <p className="large-copy">{pageCopy.research.connectingQuestion}</p>
        </div>
      </section>
    </>
  )
}
