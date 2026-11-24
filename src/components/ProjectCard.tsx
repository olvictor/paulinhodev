import type { Project } from '../data/projects'
import { Reveal } from './Reveal'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal className="project" delay={index * 80}>
      <div className="project-top">
        <span className="mono muted">{String(index + 1).padStart(2, '0')}</span>
        <span className="mono muted">{project.year}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="chips">
        {project.stack.map((s) => <span key={s}>{s}</span>)}
      </div>
      <div className="project-links">
        {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Ver online ↗</a>}
        {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">Código ↗</a>}
      </div>
    </Reveal>
  )
}
