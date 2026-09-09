import { PageIntro, ProjectCard } from '../components/UI'
import { pageCopy, project, upcomingProject } from '../data/siteData'

export default function Projects() {
  return (
    <>
      <PageIntro eyebrow="Projects" title="Research projects and working investigations.">
        <p>{pageCopy.projects.intro}</p>
      </PageIntro>
      <section className="section compact-top">
        <div className="content-wrap project-grid">
          <ProjectCard project={project} featured />
          <ProjectCard project={upcomingProject} />
        </div>
      </section>
    </>
  )
}
