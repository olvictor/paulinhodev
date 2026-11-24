import { site } from '../config/site'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="footer-links">
          {site.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
          <a href={`mailto:${site.email}`}>E-mail</a>
        </span>
      </div>
    </footer>
  )
}
