import { useMemo, useState } from 'react'
import { posts } from '../lib/posts'
import { PostList } from '../components/PostList'
import { useTitle } from '../hooks/useTitle'

export default function Blog() {
  useTitle('Blog')
  const [tag, setTag] = useState<string | null>(null)
  const tags = useMemo(() => [...new Set(posts.flatMap((p) => p.tags))].sort(), [])
  const list = tag ? posts.filter((p) => p.tags.includes(tag)) : posts

  return (
    <section className="container page-head-wrap narrow">
      <div className="page-head">
        <div className="tag">// blog</div>
        <h1>Aprendendo em público.</h1>
        <p className="lead">Registro o que estudo sobre ABAP Cloud, RAP, CDS e BTP. Se te ajudar também, melhor ainda.</p>
      </div>
      {tags.length > 0 && (
        <div className="filters tag-filters">
          <button className={!tag ? 'on' : ''} onClick={() => setTag(null)}>Todos</button>
          {tags.map((t) => (
            <button key={t} className={tag === t ? 'on' : ''} onClick={() => setTag(t)}>#{t}</button>
          ))}
        </div>
      )}
      {list.length ? <PostList posts={list} /> : <p className="muted">Nenhum post ainda.</p>}
    </section>
  )
}
