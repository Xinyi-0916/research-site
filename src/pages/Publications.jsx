import { LinkButtons, PageIntro, StatusPill } from '../components/UI'
import { pageCopy, publications } from '../data/siteData'

export default function Publications() {
  return (
    <>
      <PageIntro eyebrow="Publications" title="Manuscripts and public research artifacts.">
        <p>{pageCopy.publications.intro}</p>
      </PageIntro>
      <section className="section compact-top">
        <div className="content-wrap publication-list">
          {publications.map((publication) => (
            <article className="publication" key={publication.title}>
              <div className="publication-year">{publication.year}</div>
              <div>
                <StatusPill tone="active">{publication.venue}</StatusPill>
                <h2>{publication.title}</h2>
                <p>{publication.authors}</p>
                <LinkButtons projectPath={publication.projectPath} links={publication.links} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
