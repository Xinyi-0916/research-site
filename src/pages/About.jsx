import { PageIntro, SectionHeading } from '../components/UI'
import { about } from '../data/siteData'

export default function About() {
  return (
    <>
      <PageIntro eyebrow="About" title="An animation-production perspective on 3D AI research.">
        <p>{about.lead}</p>
      </PageIntro>
      <section className="section about-statement-section">
        <div className="content-wrap statement-grid">
          <div>
            <p className="eyebrow">Why this background matters</p>
            <h2>Production questions are research questions.</h2>
          </div>
          <blockquote className="large-quote">“{about.statement}”</blockquote>
        </div>
      </section>
      <section className="section">
        <div className="content-wrap about-detail-grid">
          <div>
            <SectionHeading eyebrow="Education" title="Background" />
            {about.education.map((item) => (
              <article className="detail-row" key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                <span>{item.status}</span>
              </article>
            ))}
          </div>
          <div>
            <SectionHeading eyebrow="Coursework" title="Current preparation" />
            {about.coursework.map((item) => (
              <article className="detail-row" key={item.title}>
                <h3>{item.title}</h3>
                <span>{item.status}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
