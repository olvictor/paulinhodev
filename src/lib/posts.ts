import { marked } from 'marked'

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  draft: boolean
  content: string
  readingTime: number
  /** Mostra a assinatura padrão no fim do post (padrão: true). */
  signature: boolean
}

/** Gera ids no mesmo formato do GitHub, para os links do sumário (#1-titulo) funcionarem. */
const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s/g, '-')

marked.use({
  gfm: true,
  renderer: {
    heading({ tokens, depth, text }) {
      const id = slugify(text)
      const html = this.parser.parseInline(tokens)
      return `<h${depth} id="${id}"><a class="heading-anchor" href="#${id}" aria-hidden="true">#</a>${html}</h${depth}>\n`
    },
  },
})

// Lê todos os .md de src/content/posts no momento do build.
const files = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

type FrontValue = string | boolean | string[]

/** Frontmatter simples: `chave: valor`, listas em [a, b] e true/false. */
function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {} as Record<string, FrontValue>, body: raw }
  const data: Record<string, FrontValue> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i < 0) continue
    const key = line.slice(0, i).trim()
    const value = line.slice(i + 1).trim()
    const unquote = (s: string) => s.trim().replace(/^["']|["']$/g, '')
    if (/^\[.*\]$/.test(value)) {
      data[key] = value.slice(1, -1).split(',').map(unquote).filter(Boolean)
    } else if (value === 'true' || value === 'false') {
      data[key] = value === 'true'
    } else {
      data[key] = unquote(value)
    }
  }
  return { data, body: match[2] }
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, body } = parseFrontmatter(raw)
    const words = body.split(/\s+/).filter(Boolean).length
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? '',
      description: (data.description as string) ?? '',
      tags: (data.tags as string[]) ?? [],
      draft: data.draft === true,
      content: body,
      readingTime: Math.max(1, Math.round(words / 200)),
      signature: data.signature !== false,
    }
  })
  // Rascunhos só aparecem em desenvolvimento
  .filter((p) => import.meta.env.DEV || !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)

export const renderMarkdown = (md: string) => marked.parse(md, { async: false }) as string

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }) =>
  iso ? new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', opts).replace('.', '') : ''
