import { projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { useTitle } from '../hooks/useTitle'

export default function Projects() {
  useTitle('Projetos')
  return (
    <section className="container page-head-wrap">
      <div className="page-head">
        <div className="tag">// projetos</div>
        <h1>Coisas que construí.</h1>
        <p className="lead">Produtos, experimentos e código aberto. Alguns sérios, outros só por diversão.</p>
      </div>
      <div className="projects-grid">
        {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
      </div>
    </section>
  )
}
