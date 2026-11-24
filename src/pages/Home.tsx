import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { projects } from '../data/projects'
import { posts } from '../lib/posts'
import { Wave } from '../components/Wave'
import { ProjectCard } from '../components/ProjectCard'
import { PostList } from '../components/PostList'
import { SectionHeader } from '../components/SectionHeader'
import { useTitle } from '../hooks/useTitle'

export default function Home() {
  useTitle()
  const featured = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <>
      <section className="hero">
        <div className="container hero-text">
          <div className="tag fade-up">// {site.role.toLowerCase()}</div>
          <h1 className="fade-up" style={{ animationDelay: '80ms' }}>{site.name}</h1>
          <p className="lead fade-up" style={{ animationDelay: '160ms' }}>
            Entre linhas de código, ideias e alguns bugs pelo caminho, gosto de criar coisas que funcionem bem e tenham propósito.{' '}
            Curto explorar novas possibilidades, experimentar tecnologias e transformar ideias em projetos reais.{' '}
            Quando não estou programando, provavelmente estou <em>ouvindo música</em>, jogando alguma coisa <em>online</em> ou mergulhado em algum universo de <em> ficção científica</em>.
          </p>
          <div className="hero-cta fade-up" style={{ animationDelay: '240ms' }}>
            <Link to="/projetos" className="btn btn-primary">Ver projetos</Link>
            <Link to="/sobre" className="btn">Sobre mim</Link>
          </div>
        </div>
        {/* A onda ocupa só a largura do conteúdo (mesmo alinhamento do header) */}
        <div className="container hero-wave">
          <div className="hero-wave-inner"><Wave /></div>
        </div>
        <div className="container">
          <div className="hero-foot">
            <span><span className="pulse-dot" />ouvindo agora — <b>{site.now.music}</b></span>
            <span>{site.location} · {new Date().getFullYear()}</span>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeader tag="projetos" title="Em destaque">
          <Link to="/projetos" className="link-arrow">Todos os projetos →</Link>
        </SectionHeader>
        <div className="projects-grid">
          {featured.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </div>
      </section>

      {site.blogEnabled && posts.length > 0 && (
        <section className="section container">
          <SectionHeader tag="blog" title="Últimos posts">
            <Link to="/blog" className="link-arrow">Ver o blog →</Link>
          </SectionHeader>
          <PostList posts={posts.slice(0, 3)} />
        </section>
      )}
    </>
  )
}
