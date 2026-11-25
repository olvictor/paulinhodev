export interface Project {
  slug: string
  title: string
  year: string
  description: string
  stack: string[]
  repo?: string
  demo?: string
  /** Aparece na home. */
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'projeto-um',
    title: 'Wiki latam',
    year: '2025',
    description: 'Uma frase sobre o problema que o projeto resolve e o que ele tem de interessante.',
    stack: ['python', 'flask', 'Pandas'],
    repo: 'https://github.com/olvictor/wiki-latam/',
    demo: 'https://www.rolaguiada.com.br/',
    featured: true,
  }
  // {
  //   slug: 'projeto-dois',
  //   title: 'Dashboard de Jogos',
  //   year: '2025',
  //   description: 'Exemplo: estatísticas de partidas online em tempo real, com WebSockets.',
  //   stack: ['Next.js', 'WebSocket', 'PostgreSQL'],
  //   repo: 'https://github.com/seu-usuario/projeto',
  //   featured: true,
  // },
  // {
  //   slug: 'projeto-tres',
  //   title: 'Visualizador de Áudio',
  //   year: '2025',
  //   description: 'Exemplo: experimento com Web Audio API e Canvas que reage à música.',
  //   stack: ['Canvas', 'Web Audio API'],
  //   demo: 'https://projeto.exemplo.com',
  //   featured: true,
  // },
  // {
  //   slug: 'projeto-quatro',
  //   title: 'API de Catálogo Sci-Fi',
  //   year: '2024',
  //   description: 'Exemplo: API REST com catálogo de filmes de ficção científica e busca por tags.',
  //   stack: ['Node', 'Express', 'MongoDB'],
  //   repo: 'https://github.com/seu-usuario/projeto',
  // },
]
