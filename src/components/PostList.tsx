import { Link } from 'react-router-dom'
import { formatDate, type Post } from '../lib/posts'

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="post-list">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link to={`/blog/${p.slug}`}>
            <div>
              <h3>{p.title}{p.draft && <span className="draft">rascunho</span>}</h3>
              {p.description && <p>{p.description}</p>}
            </div>
            <span className="mono muted">{formatDate(p.date, { day: '2-digit', month: 'short' })}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
