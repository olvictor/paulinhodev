import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { site } from '../config/site'

const items = [
  { to: '/projetos', label: 'Projetos' },
  { to: '/blog', label: 'Blog' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="logo" aria-label="Início">
          {site.handle}<span className="logo-cursor">_</span>
        </Link>
        <nav className="nav-links" aria-label="Principal">
          {items.map((it) => (
            <NavLink key={it.to} to={it.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {it.label}
              {it.to === '/blog' && !site.blogEnabled && <span className="soon">em breve</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
