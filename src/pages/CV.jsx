import { DownloadIcon } from '../components/Icons'
import { PageIntro } from '../components/UI'
import { site } from '../data/siteData'

export default function CV() {
  return (
    <>
      <PageIntro eyebrow="Curriculum vitae" title="Research, education, and production experience.">
        <p>The CV file is ready to be connected when the final PDF is added.</p>
      </PageIntro>
      <section className="section compact-top">
        <div className="content-wrap cv-panel">
          <div className="cv-preview" aria-hidden="true">
            <span>CV</span>
            <div><i /><i /><i /><i /></div>
          </div>
          <div className="cv-copy">
            <p className="eyebrow">PDF placeholder</p>
            <h2>{site.name}</h2>
            <p>Replace <code>public/cv/xinyi-tang-cv.pdf</code> with the final CV, then set <code>available</code> to <code>true</code> in the site data file.</p>
            <div className="cv-actions">
              {site.cv.available ? (
                <>
                  <a className="primary-button" href={site.cv.path} target="_blank" rel="noreferrer">View CV</a>
                  <a className="secondary-button" href={site.cv.path} download><DownloadIcon /> Download CV</a>
                </>
              ) : (
                <>
                  <span className="primary-button disabled" aria-disabled="true">View CV · coming soon</span>
                  <span className="secondary-button disabled" aria-disabled="true"><DownloadIcon /> Download CV</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
