import { Link, useParams } from 'react-router-dom'
import { formatDate, getPost, renderMarkdown } from '../lib/posts'
import { useTitle } from '../hooks/useTitle'
import { PostSignature } from '../components/PostSignature'
import NotFound from './NotFound'
import '../styles/blog.css'

export default function Post() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  useTitle(post?.title)
  if (!post) return <NotFound />

  return (
    <article className="container narrow post">
      <Link to="/blog" className="link-arrow back">← Blog</Link>
      <header className="post-head">
        <div className="tag">// {formatDate(post.date)} · {post.readingTime} min de leitura</div>
        <h1>{post.title}</h1>
        {post.description && <p className="lead">{post.description}</p>}
        {post.tags.length > 0 && <div className="chips">{post.tags.map((t) => <span key={t}>#{t}</span>)}</div>}
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      {post.signature && <PostSignature />}
    </article>
  )
}
