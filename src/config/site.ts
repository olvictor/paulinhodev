export const site = {
  name: 'P.victor',
  handle: 'Paulinho.dev',
  role: 'Desenvolvedor ABAP Cloud',
  location: 'Rio de Janeiro, BR',
  email: 'victorolvdev@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/olvictor' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/victorolvdev/' },
  ],
  now: {
    music: 'Tycho · Awake',
    game: 'Valorant',
    movie: 'Interestelar',
  },


  blogEnabled: import.meta.env.VITE_BLOG_ENABLED === 'true' || true,
}
